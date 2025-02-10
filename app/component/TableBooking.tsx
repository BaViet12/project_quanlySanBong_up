"use client";
import { tr } from "date-fns/locale";
import React, { useEffect, useState } from "react";

interface Booking {
  id: number;
  user_id: number;
  price_id: number;
  total_price: number;
  paid_amount: number;
  payment_status: string;
  receipt_image: string;
}
interface TableDashboardProps {
  onEdit: (product: Booking) => void;
  onDelete: (id: number) => void;
  reloadKey: (id: number) => void;
}

const TableBooking = () => {
  const [bookingTable, setBookingTable] = useState<Booking[]>([]);
  useEffect(() => {
    fetch("/api/booking")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Dữ liệu từ API Field", data.BookingAPI);
        setBookingTable(data.BookingAPI);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  return (
    <div className="space-x-4">
      <div className="overflow-x-auto flex justify-center w-full">
        <table className="table w-full xl:ml-36 border-2 mt-14 text-center">
          <thead>
            <tr className="bg-green-800 text-white text-sm">
              <th>Mã đơn hàng</th>
              <th>Mã khách hàng</th>
              <th>Tổng tiền</th>
              <th>Đặt cọc</th>
              <th>Giao dịch</th>
            </tr>
          </thead>
          <tbody>
            {bookingTable.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.user_id}</td>
                <td>{booking.total_price}</td>
                <td>{booking.paid_amount}</td>
                <td className="">
                  <div className="flex justify-center">
                    <img
                      src={booking.receipt_image}
                      className="w-20 h-28 object-cover rounded"
                    />
                  </div>
                </td>
                <td>
                  <button>Xác nhận</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableBooking;
