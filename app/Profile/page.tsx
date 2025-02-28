"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../types/auth";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import Navbar from "../component/Nvarbar";
import Footer from "../component/Footer";

const Profilepage = () => {
  const [user, setUser] = useState<UserAuth | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null
  );
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    UserName: "",
    Hoten: "",
    phone: "",
  });
  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/auth/session");
      if (!response.ok) throw new Error("Failed to fetch user data");
      const userData = await response.json();
      console.log("User data fetched:", userData);
      setUser(userData);
      setFormData({
        email: userData.email || "",
        UserName: userData.UserName || "",
        Hoten: userData.Hoten || "",
        phone: userData.phone || "",
      });
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      router.push("/login");
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/users/${user?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Cập nhật thành công thông tin cá nhân");
        setMessageType("success");
        setIsEditing(false);
        setUser((prev) => ({
          ...prev!,
          ...formData,
        }));
      } else {
        setMessage(data.error || "Lỗi khi cập nhật thông tin cá nhân");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Đã xảy ra lỗi khi cập nhật hồ sơ");
      setMessageType("error");
    }
    setTimeout(() => {
      setMessage("");
      setMessageType(null);
    }, 3000);
  };

  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar></Navbar>
      <div className="container mx-auto px-4 py-8 h-full">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <div className="flex justify-between items-center mb-7">
            <h1 className="text-2xl font-bold text-gray-800">
              Thông tin cá nhân
            </h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-4 py-2 rounded-md ${
                isEditing
                  ? "bg-gray-500 hover:bg-gray-700"
                  : "bg-blue-500 hover:bg-blue-700"
              } text-white transition-colors`}
            >
              {isEditing ? "Hủy bỏ" : "Chỉnh sửa thông tin"}
            </button>
          </div>
          {message && (
            <div
              className={`mb-4 p-4 rounded-md flex items-center gap-2 ${
                messageType === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {messageType === "success" ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-x-6">
            <div className="flex flex-col gap-5">
              <div className="flex gap-3">
                <div className="flex flex-col gap-1">
                  <h1 className="text-xl text-gray-500">Email</h1>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`mt-1 block w-[300px] rounded-md border ${
                      !isEditing ? "text-black" : "text-white"
                    } text-black border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 `}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h1 className="text-xl text-gray-500">Tên đăng nhập</h1>
                  <input
                    type="UserName"
                    name="UserName"
                    value={formData.UserName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`mt-1 block w-[300px] rounded-md border ${
                      !isEditing ? "text-black" : "text-white"
                    } text-black border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100`}
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex flex-col gap-1">
                  <h1 className="text-xl text-gray-500">Họ và tên</h1>
                  <input
                    type="Hoten"
                    name="Hoten"
                    value={formData.Hoten}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`mt-1 block w-[300px] rounded-md border ${
                      !isEditing ? "text-black" : "text-white"
                    } text-black border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100`}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h1 className="text-xl text-gray-500">Số điện thoại</h1>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`mt-1 block w-[300px] rounded-md border ${
                      !isEditing ? "text-black" : "text-white"
                    } text-black border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100`}
                  />
                </div>
              </div>
            </div>
            {isEditing && (
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 text-white rounded-md  hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Lưu
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Profilepage;
