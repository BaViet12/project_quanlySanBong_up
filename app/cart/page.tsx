"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../component/Nvarbar";
import Footer from "../component/Footer";

interface CartItem {
  id: number;
  user_id: number;
  booking_id: number;
  quantity: number;
  created_at: string;
  booking: {
    id: number;
    user_id: number;
    price_id: number;
    total_price: number;
    paid_amount: number;
    payment_status: string;
    receipt_image: string;
    created_at: string;
    confirmed_at: string;
    status: string;
    price: {
      id: number;
      name: string;
      price: number;
      field: {
        id: number;
        name: string;
        field_type: number;
      };
    };
  };
}

const pageCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetchCartItems = async () => {
    try {
      const respone = await fetch("/api/cart");
      if (!respone.ok) {
        throw new Error("Failed to fetch cart items");
      }
      const data = await respone.json();
      setCartItems(data.cartItems);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/cart/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("Lỗi khi hủy đặt sân sân");
      } else {
        const responseData = await response.json();
        console.log("Success:", responseData.message);
        alert(responseData.message);
      }
    } catch (error) {
      console.error("Lỗi khi hủy đặt sân", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  return (
    <div className="mx-auto">
      <Navbar></Navbar>
      {cartItems.length > 0 ? (
        <div className="flex flex-col min-h-screen items-center pt-5">
          <h2 className="font-semibold text-3xl ">Giỏ hàng</h2>
          <ul className="flex flex-col  p-2 rounded-lg py-3 space-y-6">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-[800px] border-2 "
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl">{item.booking.price.name}</h3>
                  <p>Giá: {item.booking.price.price} VND</p>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <p>Số lượng: {item.quantity}</p>
                  <p>
                    {item.booking.status === "DAXACNHAN"
                      ? "Đã xác nhận"
                      : item.booking.status === "DANGXULY"
                      ? "Đang xử lý"
                      : item.booking.status === "DAHUY"
                      ? "Đã hủy"
                      : item.booking.status}
                  </p>
                </div>
                <div className="flex justify-end">
                  <button
                    className="btn bg-red-700 text-white "
                    onClick={() => handleDelete(item.id)}
                  >
                    Hủy sân
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Giỏ hàng của bạn đang trống.</p>
      )}
      <Footer></Footer>
    </div>
  );
};

export default pageCart;
