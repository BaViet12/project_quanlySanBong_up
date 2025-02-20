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
const NavbarAdmin = () => {
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

  return (
    <div className="relative pb-2 pt-3 mx-10 ">
      <div className="flex justify-between items-center h-16 w-full pb-2">
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
              <div className="flex justify-center items-center gap-2">
                <div>
                  <div className="dropdown dropdown-bottom">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn m-1 bg-white"
                    >
                      <IoIosNotifications className="text-2xl " />
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow "
                    >
                      {notifications.length === 0 ? (
                        <p className="text-gray-500 text-center">
                          Không có thông báo mới
                        </p>
                      ) : (
                        notifications.map((notif, index) => (
                          <div
                            key={index}
                            className="mb-4 p-3 border rounded-lg "
                          >
                            <p className="font-medium">{notif.message}</p>
                            <div className="mt-2 text-sm text-gray-600">
                              <p>Khách: {notif.bookingDetails.userName}</p>
                              <p>Sân: {notif.bookingDetails.fieldName}</p>

                              <p>
                                Giá:{" "}
                                {notif.bookingDetails.totalPrice.toLocaleString()}
                                đ
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </ul>
                  </div>
                </div>
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
                      <div className="flex justify-around">
                        <a href="/profile" className="text-lg">
                          Profile
                        </a>
                        <CgProfile className="text-xl" />
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
    </div>
  );
};

export default NavbarAdmin;
