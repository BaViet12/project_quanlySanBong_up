"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { TiThMenuOutline } from "react-icons/ti";
import { UserAuth } from "../types/auth";
import { da } from "date-fns/locale";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<UserAuth | null>(null);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch("api/auth/session");
        if (!response.ok) throw new Error("Failed to fetch session");
        const data = await response.json();
        console.log("Session data:", data);
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch session", error);
        setUser(null);
      }
    };
    fetchSession();
  }, []);
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);

      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="relative py-6 mx-10 ">
      <div className="flex justify-between items-center h-16 w-full pb-5">
        <div className="basic-2/6 ">
          <img
            className="w-52 ml-10 cursor-pointer"
            src="https://cdn0021.imgtaothao.com/media/logo/logo-datsantructuyen.png"
            alt="logo"
          />
        </div>

        <ul className="hidden lg:flex gap-5 font-Karla ">
          {/* Hiển thị thông tin người dùng nếu đã đăng nhập */}
          {user ? (
            <li className="relative">
              <div className="dropdown">
                <div tabIndex={0} role="button" className="btn m-1 bg-white">
                  <FaUserCircle className="text-xl" />
                  <span>{user?.Hoten}</span>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                >
                  <li>
                    <a href="/profile">Profile</a>
                  </li>
                  <li>
                    <a>
                      <a href="/admin">Dashboard</a>
                    </a>
                  </li>
                  <li>
                    <a>
                      <a onClick={handleLogout}>Logout</a>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          ) : (
            <>
              <li className="nav-item whitespace-nowrap font-Karla">
                <Link href="/login">Đăng nhập</Link>
              </li>
              <li className="nav-item whitespace-nowrap font-Karla">
                <Link href="/register">Đăng ký</Link>
              </li>
            </>
          )}
        </ul>
        <div className="lg:hidden" onClick={toggleMenu}>
          <TiThMenuOutline className="size-5" />
        </div>
      </div>
      <div
        className={`lg:flex flex-col lg:flex-row justify-around items-center bg-white text-black z-10 pb-3 pt-3 ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <nav className="">
          <ul className="flex flex-col lg:flex-row items-center flex-wrap gap-10 lg:gap-44  uppercase z-50 tqd-topmenu">
            <li className="nav-item font-Karla">Sân bóng đá 7 người</li>
            <li className="nav-item font-Karla">Sân bóng đá 5 người</li>
            <li className="nav-item font-Karla">
              <Link href={"/shop"}>Mua sắm</Link>
            </li>
            <li className="nav-item font-Karla">Quy định</li>
            <li className="nav-item font-Karla">Liên hệ</li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
