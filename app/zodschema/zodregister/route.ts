import { z } from "zod";

export const RegisterFormSchema = z.object({
  UserName: z.string().trim().min(2).max(255),
  MatKhau: z
    .string()
    .min(12, { message: "Password phải có ít nhất 8 ký tự" })
    .max(100),
  Hoten: z.string().min(2).max(255),
  phone: z.string().max(11),
  email: z.string().email(),
});
export default RegisterFormSchema;
