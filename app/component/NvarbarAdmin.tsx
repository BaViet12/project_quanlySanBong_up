"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { TiThMenuOutline } from "react-icons/ti";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { CgProfile } from "react-icons/cg";
import { GrDashboard } from "react-icons/gr";
import { MdOutlineLogout } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { UserAuth } from "../types/auth";
import Pusher from "pusher-js";
import { toast } from "react-toastify";

interface Notification {
  id: number;
  message: string;
  user_id: number;
  created_at: string;
  booking: {
    id: number;
    status: string;
    user: {
      id: number;
      Hoten: string;
    };
    price: {
      id: number;
      name: string;
      price: string;
    };
  };
}
interface PhanTrang {
  totalRecords: number;
  totalPage: number;
  page: number;
  limit_size: number;
  skip: number;
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

  const fetchNotification = async () => {
    try {
      const response = await fetch("/api/notifications");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log("Dữ liệu từ API thông báo", data.notificationsAPI);

      setNotifications(data.notificationsAPI);

      setUnreadCount(
        data.notificationsAPI.filter(
          (notif: Notification) =>
            notif.booking && notif.booking.status === "DANGXULY"
        ).length
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteNotifications = async () => {
    try {
      const response = await fetch("/api/notifications", {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete notifications");
      }
      setNotifications([]);
      setUnreadCount(0);
      toast.success("Đã xóa tất cả thông báo");
    } catch (error) {
      console.error("Error deleting notifications:", error);
      toast.success("Xóa thông báo thất bại");
    }
  };

  useEffect(() => {
    fetchNotification();
    const pusher = new Pusher("3db545abf1b813cf59a0", {
      cluster: "ap1",
    });
    const channel = pusher.subscribe("notifications");
    channel.bind("new-booking", function (data: any) {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        {
          id: prevNotifications.length + 1,
          message: data.notification.message,
          user_id: data.bookingDetails.user_id,
          created_at: new Date().toISOString(),
          booking: data.bookingDetails,
        },
      ]);
      setUnreadCount((prevCount) => prevCount + 1);
    });
    return () => {
      pusher.unsubscribe("notifications");
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
    <div className="relative mx-5">
      <div className="flex justify-between items-center h-16 w-full">
        <div className="">
          <a href="/" className="text-3xl font-bold hover:text-green-500">
            Dashboard
          </a>
        </div>
        <ul className="hidden lg:flex gap-5 font-Karla">
          {user ? (
            <li className="relative">
              <div className="flex justify-center items-center gap-5">
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="">
                    <IoIosNotifications className="text-2xl hover:text-green-500" />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content bg-white rounded-box z-[1000] w-[280px] p-2 shadow h-[300px] overflow-auto"
                  >
                    <div className="flex justify-between pb-2">
                      <h1 className="text-xl font-semibold">Thông báo</h1>
                      <button
                        className="hover:bg-slate-600 hover:text-white rounded-md px-1"
                        onClick={handleDeleteNotifications}
                      >
                        Xóa
                      </button>
                    </div>
                    {notifications.length === 0 ? (
                      <p className="text-gray-500 text-center">
                        Không có thông báo mới
                      </p>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className="p-2 border rounded-lg bg-slate-50 hover:bg-purple-200"
                        >
                          <div className="text-sm text-gray-600 flex flex-col gap-3 ">
                            <div className="flex justify-between">
                              <p className="font-bold">
                                {notif.booking.user?.Hoten}
                              </p>
                              <p>{notif.booking.price?.price}đ</p>
                            </div>
                            <p className="text-xs">
                              {notif.booking.price?.name}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </ul>
                </div>

                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="">
                    <div className="avatar avatar-online">
                      <div className="w-8 rounded-full">
                        <img src="admin.jpg" />
                      </div>
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                  >
                    <li>
                      <div className="flex justify-around">
                        <a href="/Profile" className="text-lg">
                          Profile
                        </a>
                        <CgProfile className="text-xl" />
                      </div>
                    </li>

                    {user.vaitro?.Ten === "Admin" && (
                      <li>
                        <div className="flex justify-around">
                          <a href="/admin" className="text-lg">
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

{
  /* <div className="dropdown dropdown-bottom">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn m-1 bg-white"
                    >
                      <IoIosNotifications className="text-2xl" />
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content bg-white rounded-box z-[1000] w-[280px] p-2 shadow h-[300px] overflow-auto"
                    >
                      <div className="flex justify-between pb-2">
                        <h1 className="text-xl font-semibold">Thông báo</h1>
                        <button className="hover:bg-slate-600 hover:text-white rounded-md px-1">
                          Xóa
                        </button>
                      </div>
                      {notifications.length === 0 ? (
                        <p className="text-gray-500 text-center">
                          Không có thông báo mới
                        </p>
                      ) : (
                        notifications.map((notif) => (
                          <div
                            key={notif.id}
                            className="p-2 border rounded-lg bg-slate-50 hover:bg-purple-200"
                          >
                            <div className="text-sm text-gray-600 flex flex-col gap-3 ">
                              <div className="flex justify-between">
                                <p className="font-bold">
                                  {notif.booking.user?.Hoten}
                                </p>
                                <p>{notif.booking.price?.price}đ</p>
                              </div>
                              <p className="text-xs">
                                {notif.booking.price?.name}
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </ul>
                  </div> */
}
