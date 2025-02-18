import { z } from "zod";

export const LoginFormSchema = z.object({
  UserName: z
    .string()
    .min(6, { message: "Tên đăng nhập phải có ít nhất 6 ký tự" })
    .trim(),
  MatKhau: z
    .string()
    .min(12, { message: "Password phải có ít nhất 8 ký tự" })
    .max(100),
});
export default LoginFormSchema;
