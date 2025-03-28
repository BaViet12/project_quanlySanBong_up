"use client";
import { usePathname, useRouter } from "next/navigation";
import { TbSoccerField } from "react-icons/tb";
import { IoTimerOutline } from "react-icons/io5";
import { GiReceiveMoney } from "react-icons/gi";
import { IoHome } from "react-icons/io5";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { pusherClient } from "../lib/pusher";
import { toast, ToastContainer } from "react-toastify";

interface SidebarLink {
  icon: React.ReactElement;
  href: string;
  label: string;
}
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
const SidebarAdmin: React.FC = () => {
  const isActivePath = (path: string) => pathname === path;
  const handleNavigation = (href: string) => {
    router.push(href);
  };
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const pathname = usePathname();
  const router = useRouter();
  const sidebarLink: SidebarLink[] = [
    {
      icon: <GiReceiveMoney />,
      href: "/admin/confirmbooking",
      label: "Xác nhận đặt sân",
    },

    {
      icon: <TbSoccerField />,
      href: "/admin/fieldmanagement",
      label: "Quản lý Sân Bóng",
    },
    {
      icon: <IoTimerOutline />,
      href: "/admin/timeslotmanagement",
      label: "Quản lý Giờ",
    },
    {
      icon: <GiReceiveMoney />,
      href: "/admin/pricemanagement",
      label: "Quản lý Giá",
    },
  ];
  useEffect(() => {
    // Subscribe to Pusher channel
    const channel = pusherClient.subscribe("notifications");

    channel.bind("new-booking", (data: Notification) => {
      setNotifications((prev) => [data, ...prev]);
      setUnreadCount((prev) => prev + 1);
      toast.success(
        `Có đặt sân mới từ ${data.bookingDetails.userName} cho sân ${data.bookingDetails.fieldName}`
      );
    });

    // Cleanup
    return () => {
      pusherClient.unsubscribe("notifications");
    };
  }, []);

  return (
    <div className="flex flex-col h-full w-60 fixed items-center">
      <div>
        <p className="w-64 flex justify-center font-medium rounded-xl p-4 my-4 gap-2  text-gray-700">
          <Link className="" href={"/admin"}>
            DashBoard
          </Link>
          <span>
            <IoHome className="text-xl " />
          </span>
        </p>
      </div>

      <div className="collapse collapse-arrow w-64 ">
        <input type="checkbox" name="my-accordion-2" />
        <div className="collapse-title text-gray-700 flex justify-center font-medium ">
          <div>Quản Lý</div>
        </div>
        <div className="collapse-content">
          <ul className="">
            {sidebarLink.map((link) => (
              <li key={link.href} className="my-5 pl-4">
                <button
                  onClick={() => handleNavigation(link.href)}
                  className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                    isActivePath(link.href)
                      ? "bg-gray-800 text-white"
                      : "text-gray-700 hover:bg-green-900 hover:text-white"
                  }`}
                >
                  <div className="text-xs">{link.icon}</div>
                  <div className="">{link.label}</div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <ToastContainer autoClose={5000} position="bottom-right" />
      </div>
    </div>
  );
};

export default SidebarAdmin;
