"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { pusherClient } from "../lib/pusher";
import { TiThMenuOutline } from "react-icons/ti";
import { UserAuth } from "../types/auth";
import { da } from "date-fns/locale";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { CgProfile } from "react-icons/cg";
import { GrDashboard } from "react-icons/gr";
import { MdOutlineLogout } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { FaCartArrowDown } from "react-icons/fa";

interface Notification {
  id: number;
  message: string;
  bookingDetails: {
    id: number;
    userName: string;
    fieldName: string;
    timeslot: string;
    totalPrice: number;
    status: string;
  };
}
const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<UserAuth | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    const channel = pusherClient.subscribe("notifications");

    channel.bind("new-booking", (data: Notification) => {
      setNotifications((prev) => [data, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    return () => {
      pusherClient.unsubscribe("notifications");
    };
  }, []);
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch("/api/auth/session");
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
  }, [notifications]);
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);

      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleCartClick = () => {
    router.push("/cart");
  };

  return (
    <div className="relative pb-2 pt-3 ">
      <div className="flex justify-between items-center h-16 w-full pb-2">
        <div className="basic-2/6 ">
          <a href="/">
            <img
              className="w-52 ml-10 cursor-pointer"
              src="https://cdn0021.imgtaothao.com/media/logo/logo-datsantructuyen.png"
              alt="logo"
            />
          </a>
        </div>

        <ul className="hidden lg:flex gap-5 font-Karla items-center">
          {/* Hiển thị thông tin người dùng nếu đã đăng nhập */}
          {user ? (
            <li className="relative flex justify-center items-center gap-5">
              <FaCartArrowDown
                className="text-2xl hover:text-green-600"
                onClick={handleCartClick}
              />
              <div className="flex justify-center items-center gap-2">
                <div className="dropdown">
                  <div tabIndex={0} role="button" className="btn m-1 bg-white">
                    <FaUserCircle className="text-2xl" />
                    <span className="text-base">{user?.Hoten}</span>
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                  >
                    <li>
                      <div className="flex justify-around">
                        <a href="/Profile" className="text-lg">
                          Profile
                        </a>
                        <CgProfile className="text-2xl" />
                      </div>
                    </li>
                    {user.vaitro?.Ten === "Admin" && (
                      <li>
                        <div className="flex justify-around">
                          <a href="/admin " className="text-lg">
                            Dashboard
                          </a>
                          <GrDashboard className="text-xl" />
                        </div>
                      </li>
                    )}
                    <li>
                      <div className="flex justify-around">
                        <a onClick={handleLogout} className="text-lg">
                          Logout
                        </a>
                        <MdOutlineLogout className="text-xl" />
                      </div>
                    </li>
                  </ul>
                </div>
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
            <li className="nav-item font-Karla">
              <Link href={"/sanbay"}>Sân bóng đá 7 người</Link>
            </li>
            <li className="nav-item font-Karla">
              <Link href={"/sannam"}>Sân bóng đá 5 người</Link>
            </li>
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
