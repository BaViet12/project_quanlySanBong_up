"use client";
import LoginFormSchema from "@/app/zodschema/zodlogin/route";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const formValues = {
      UserName: formData.get("UserName") as string,
      MatKhau: formData.get("MatKhau") as string,
    };

    const result = LoginFormSchema.safeParse(formValues);
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Đăng nhập thất bại");
      }
      toast.success("Đăng nhập thành công");
      console.log("Login response:", data);

      if (data.user?.vaitro === "Admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Thông tin đăng nhập không hợp lệ");
        toast.error("Thông tin đăng nhập không hợp lệ"); // Show default error message
      }
    }
  }
  return (
    <div className="flex gap-10 bg-gray-200 w-full min-h-screen items-center justify-center">
      <div className="flex items-center justify-center">
        <a href="/" title="Về trang chủ">
          <img
            src="https://cdn0021.imgtaothao.com/media/logo/logo-datsantructuyen.png"
            alt="logo"
            width={400}
            height={400}
          />
        </a>
      </div>

      <div className="flex justify-center items-center  flex-col gap-5 w-[600px]">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl text-blue-900 font-bold">
            ĐĂNG NHẬP TÀI KHOẢN
          </h1>
          <p className="text-green-700">LUÔN LUÔN MIỄN PHÍ</p>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="mb-4">
              <input
                type="text"
                className="w-[400px] rounded-lg p-2"
                placeholder="Tên đăng nhập"
                name="UserName"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                className="w-[400px] rounded-lg p-2"
                placeholder="Password"
                name="MatKhau"
              />
            </div>

            <div className="flex justify-center mt-2">
              <button
                className="btn bg-green-700 text-white w-[400px]"
                type="submit"
              >
                Đăng nhập
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
