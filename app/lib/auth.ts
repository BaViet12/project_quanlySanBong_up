import prisma from "@/prisma/client";
import { compare, hash } from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.JWT_SECRET_KEY;
const key = new TextEncoder().encode(secretKey);

export async function signUp(
  email: string,
  UserName: string,
  MatKhau: string,
  Hoten?: string,
  phone?: string
) {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { UserName: UserName }],
      },
    });

    if (existingUser) {
      throw new Error("Email or username already exists");
    }

    // Validate fullname
    if (!Hoten || Hoten.trim() === "") {
      throw new Error("Full name is required");
    }

    // Hash password
    const hashedPassword = await hash(MatKhau, 12);

    // First, ensure the default role exists
    const defaultRole = await prisma.vaiTro.upsert({
      where: { id: 1 },
      update: {},
      create: {
        id: 1,
        Ten: "KhachHang",
      },
    });

    // Create the user with the confirmed default role
    const user = await prisma.user.create({
      data: {
        UserName: UserName,
        email: email,
        MatKhau: hashedPassword,
        Hoten: Hoten ? Hoten.trim() : "", // Ensure fullname is trimmed
        phone: phone || "",
        MaVaiTro: defaultRole.id,
      },
      select: {
        id: true,
        email: true,
        UserName: true,
        Hoten: true,
        phone: true,

        MaVaiTro: true,
        vaitro: {
          select: {
            Ten: true,
          },
        },
      },
    });

    // Log the created user for debugging
    console.log("Created user:", user);

    return user;
  } catch (error: any) {
    console.error("Signup error:", error);

    if (error.code === "P2000") {
      throw new Error("One or more fields exceed maximum length");
    }

    if (error.code === "P2002") {
      if (error.meta?.target?.includes("Email")) {
        throw new Error("Email already in use");
      }
      if (error.meta?.target?.includes("Tentaikhoan")) {
        throw new Error("Username already in use");
      }
      throw new Error("Registration failed: Duplicate value");
    }

    if (error.code === "P2003") {
      throw new Error("Invalid role assignment");
    }

    throw error; // Throw the original error for better debugging
  }
}

export async function login(UserName: string, MatKhau: string) {
  try {
    // Find user by username or email
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ UserName: UserName }],
      },
      include: {
        vaitro: {
          select: {
            Ten: true,
          },
        },
      },
    });

    if (!user || !user.MatKhau) {
      throw new Error("User not found");
    }

    // Verify password
    const isValid = await compare(MatKhau, user.MatKhau);
    if (!isValid) {
      throw new Error("Sai mật khẩu");
    }

    // Create session token
    const token = await new SignJWT({
      idUsers: user.id,
      email: user.email,
      vaitro: user.vaitro?.Ten,
      name: user.Hoten,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .sign(key);

    // Set cookie
    (await cookies()).set("session-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400, // 24 hours
    });

    return {
      idUsers: user.id,
      email: user.email,
      username: user.UserName,
      fullName: user.Hoten,
      vaitro: user.vaitro?.Ten,
    };
  } catch (error) {
    console.error("Login error:", error);
    throw new Error("Authentication failed");
  }
}
export async function logout() {
  (await cookies()).delete("session-token");
}

export async function getSession() {
  try {
    const token = (await cookies()).get("session-token")?.value;
    if (!token) return null;

    const verified = await jwtVerify(token, key);
    return verified.payload as any;
  } catch (error) {
    return null;
  }
}
