import React, { useEffect, useState } from "react";
import { FileUpLoad } from "./FileUpLoad";

import { UserAuth } from "../types/auth";
import { toast, ToastContainer } from "react-toastify";

interface TimeSlot {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  price: number;
  status: boolean;
}

interface TimeSlotDetailsProps {
  timeSlot: TimeSlot;
}

const TimeSlotDetails: React.FC<TimeSlotDetailsProps> = ({ timeSlot }) => {
  const [user, setUser] = useState<UserAuth | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"full" | "deposit" | null>(
    null
  );
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [deposit, setDeposit] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const bankDetails = {
    bankName: "Ngân hàng An Bình",
    accountName: "Văn Bá Việt",
    accountNumber: "0762748624",
    note: "Nội dung CK: đặt sân...;Khung giờ " + timeSlot.name + "",
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
  const handlePayment = (method: "full" | "deposit") => {
    setPaymentMethod(method);
    if (method === "full") {
      setTotalPrice(timeSlot.price * 1);
      setDeposit(0);
    } else if (method === "deposit") {
      setTotalPrice(timeSlot.price);
      setDeposit(timeSlot.price * 0.3);
    }
  };
  const handleBooking = async () => {
    if (!imageUrl) {
      alert("Vui lòng tải lên ảnh biên lai trước khi đặt sân.");
      return;
    }
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user?.id,
          price_id: timeSlot.id,
          total_price: totalPrice,
          paid_amount: paymentMethod === "full" ? totalPrice : deposit,
          receipt_image: imageUrl,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success(result.message);
        setTimeout(() => {
          const modal = document.getElementById(
            "my_modal_3"
          ) as HTMLDialogElement;
          modal?.close(); // Đóng modal sau khi đặt sân thành công
        }); // Đảm bảo thông báo có thời gian hiển thị trước khi đóng modal
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Lỗi khi đặt sân:", error);
      toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  return (
    <div className="w-[900px] mt-4 rounded-md border-2 flex flex-col gap-10 p-10 mx-auto ">
      <h4 className="text-xl font-semibold text-center">Thông tin khung giờ</h4>
      <p className="font-Karla">
        <strong>Khung giờ: </strong>
        {timeSlot.name}
      </p>
      <p className="font-Karla">
        <strong>Giá: </strong> {timeSlot.price.toLocaleString()} VNĐ
      </p>
      <div className="flex justify-center">
        <button
          className="p-2 rounded-lg w-[100px] bg-red-500 hover:bg-gray-600 text-white"
          onClick={() => {
            document.getElementById("my_modal_3").showModal();
          }}
        >
          Đặt sân
        </button>
        <dialog id="my_modal_3" className="modal">
          <div className="w-[1000px] bg-white py-5 h-[600px] rounded-lg">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <div className="flex justify-center p-1">
              <h3 className="text-xl font-bold">Chọn phương thức thanh toán</h3>
            </div>
            <div className="flex justify-center mt-3 px-5">
              <div className="flex flex-col gap-2 w-[600px]">
                <p className="text-xs">
                  <strong>Khung giờ: </strong>
                  {timeSlot.name}
                </p>
                <p className="text-xs">
                  <strong>Giá: </strong>
                  {timeSlot.price}
                </p>
                <p className="text-xs">
                  <strong>Số tiền cần thanh toán: </strong>
                  {paymentMethod === "full"
                    ? totalPrice.toLocaleString()
                    : deposit.toLocaleString()}{" "}
                  VNĐ
                </p>
                <div className="flex flex-col gap-2">
                  <h1 className="text-xs ">Thanh toán 100% hay đặt cọc 30%</h1>
                  <div className="flex gap-5 ml-14">
                    <button
                      onClick={() => handlePayment("full")}
                      className="w-[50px] rounded-lg bg-green-500 text-white hover:bg-gray-400"
                    >
                      100%
                    </button>
                    <button
                      onClick={() => handlePayment("deposit")}
                      className="w-[50px] rounded-lg bg-yellow-500 text-white hover:bg-gray-400"
                    >
                      30%
                    </button>
                  </div>
                </div>
                <div className="mt-2">
                  <h1 className="text-xs">Ảnh giao dịch ngân hàng</h1>
                  <FileUpLoad
                    endpoint="imageUploader"
                    onChange={(url) => setImageUrl(url || "")}
                    showUpload={!imageUrl}
                  />
                  {imageUrl && (
                    <div className="mt-2 flex flex-col items-center">
                      <img
                        src={imageUrl}
                        alt="Uploaded"
                        className="max-w-xs max-h-48"
                      />
                      <button
                        type="button"
                        onClick={() => setImageUrl("")}
                        className="mt-2 px-4 py-1 bg-black text-white rounded hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="gap-2 flex flex-col w-[600px]">
                <p className="text-xs">
                  <strong>Nội dung chuyển khoản:</strong> {bankDetails.note}
                </p>
                <div className="flex justify-center rounded-r-xl">
                  <img src="/QRCode.jpg" alt="anh QR" width={250} height={80} />
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleBooking}
                className="mt-4 bg-blue-600 text-white rounded px-6 py-2"
              >
                Xác nhận đặt sân
              </button>
            </div>
          </div>
        </dialog>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default TimeSlotDetails;
