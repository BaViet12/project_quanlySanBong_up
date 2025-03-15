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
interface PhanTrang {
  totalRecords: number;
  totalPage: number;
  page: number;
  limit_size: number;
  skip: number;
}

const TableBooking = () => {
  const [bookingTable, setBookingTable] = useState<Booking[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [phanTrang, setPhanTrang] = useState<PhanTrang | null>(null);
  const [loading, setLoading] = useState(false);
  const fetchBookingData = async () => {
    try {
      const response = await fetch("/api/booking");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log("Dữ liệu từ API Field", data.BookingAPI);
      setBookingTable(data.BookingAPI);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchBookingData(); // Lần đầu tiên tải dữ liệu khi component mount
  }, []);

  const handleConfirm = async (id: number) => {
    try {
      const respone = await fetch(`/api/booking/${id}`, {
        method: "PATCH",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          payment_status: "THANHCONG",
        }),
      });
      const result = await respone.json();
      if (respone.ok) {
        setBookingTable((prevState) =>
          prevState.map((booking) =>
            booking.id === id
              ? { ...booking, payment_status: "THANHCONG", status: "DAXACNHAN" }
              : booking
          )
        );
        alert(result.message);
        fetchBookingData();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/booking/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (response.ok) {
        setBookingTable((prevState) =>
          prevState.filter((booking) => booking.id !== id)
        );
        alert(result.message);
        fetchBookingData();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Lỗi khi xóa booking:", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  return (
    <div className="overflow-x-auto flex justify-center w-full">
      <table className="table w-full xl:ml-36 border-2 mt-14 text-center">
        <thead>
          <tr className="bg-gray-500 text-white text-sm">
            <th>Mã đơn hàng</th>
            <th>Mã khách hàng</th>
            <th>Tổng tiền</th>
            <th>Đặt cọc</th>
            <th>Giao dịch</th>
            <th>Thao tác</th>
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
                    className="w-15 h-12 object-cover rounded"
                  />
                </div>
              </td>
              <td>
                <div className="flex gap-1 justify-center">
                  <button
                    onClick={() => handleConfirm(booking.id)}
                    className="bg-blue-800 rounded-sm p-2 w-[80px]  text-white hover:bg-blue-700"
                  >
                    Xác nhận
                  </button>
                  <button
                    onClick={() => handleDelete(booking.id)}
                    className="bg-red-800 rounded-sm p-2 w-[80px] text-white hover:bg-blue-700"
                  >
                    Xóa
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableBooking;
