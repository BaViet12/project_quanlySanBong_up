"use client";
import React, { useEffect, useState } from "react";
import { Bell, Check } from "lucide-react";
import { pusherClient } from "../lib/pusher";

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

export default function NotificationPanel() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Subscribe to Pusher channel
    const channel = pusherClient.subscribe("notifications");

    channel.bind("new-booking", (data: Notification) => {
      setNotifications((prev) => [data, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    // Cleanup
    return () => {
      pusherClient.unsubscribe("notifications");
    };
  }, []);

  const handleConfirmBooking = async (bookingId: number) => {
    try {
      const response = await fetch(`/api/booking/confirm/${bookingId}`, {
        method: "PUT",
      });

      if (response.ok) {
        // Update notification status locally
        setNotifications((prev) =>
          prev.map((notif) =>
            notif.bookingDetails.id === bookingId
              ? {
                  ...notif,
                  bookingDetails: {
                    ...notif.bookingDetails,
                    status: "DAXACNHAN",
                  },
                }
              : notif
          )
        );
      }
    } catch (error) {
      console.error("Error confirming booking:", error);
    }
  };

  return (
    <div className="fixed right-4 top-4 z-50">
      <div className="relative">
        <Bell className="h-6 w-6 cursor-pointer" />
        {unreadCount > 0 && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {unreadCount}
          </div>
        )}
      </div>

      <div className="mt-2 bg-white rounded-lg shadow-lg p-4 w-80 max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="text-gray-500 text-center">Không có thông báo mới</p>
        ) : (
          notifications.map((notif, index) => (
            <div key={index} className="mb-4 p-3 border rounded-lg">
              <p className="font-medium">{notif.message}</p>
              <div className="mt-2 text-sm text-gray-600">
                <p>Sân: {notif.bookingDetails.fieldName}</p>
                <p>Thời gian: {notif.bookingDetails.timeslot}</p>
                <p>Giá: {notif.bookingDetails.totalPrice.toLocaleString()}đ</p>
              </div>
              {notif.bookingDetails.status === "DANGXULY" && (
                <button
                  onClick={() => handleConfirmBooking(notif.bookingDetails.id)}
                  className="mt-2 flex items-center gap-2 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  <Check className="h-4 w-4" />
                  Xác nhận đặt sân
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
