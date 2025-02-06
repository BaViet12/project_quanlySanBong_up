import React, { useState } from "react";

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
  const [paymentMethod, setPaymentMethod] = useState<"full" | "deposit" | null>(
    null
  );
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [deposit, setDeposit] = useState<number>(0);

  const bankDetails = {
    bankName: "Ngân hàng An Bình",
    accountName: "Văn Bá Việt",
    accountNumber: "0762748624",
    note: "Nội dung CK: đặt sân...;Khung giờ " + timeSlot.name + "",
  };

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
  return (
    <div className="w-[900px] mt-4 rounded-md border-2 flex flex-col gap-10 p-10 mx-auto">
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
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          Đặt sân
        </button>
        <dialog id="my_modal_3" className="modal ">
          <div className="modal-box ">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>

            <div className="flex justify-center">
              <h3 className="font-bold text-lg py-2">
                Chọn phương thức thanh toán
              </h3>
            </div>
            <p className="font-Karla py-2">
              <strong>Khung giờ: </strong>
              {timeSlot.name}
            </p>
            <p className="font-Karla py-2">
              <strong>Giá: </strong> {timeSlot.price * 1} VNĐ
            </p>
            <p className="py-2">Bạn muốn thanh toán 100% hay đặt cọc 30% ?</p>
            <div className="flex justify-center gap-5">
              <button
                className="bg-green-600 rounded-xl w-[100px] p-2"
                onClick={() => handlePayment("full")}
              >
                100%
              </button>
              <button
                className="bg-yellow-400 rounded-xl w-[100px] p-2"
                onClick={() => handlePayment("deposit")}
              >
                30%
              </button>
            </div>
            {paymentMethod && (
              <div className="mt-4">
                <h4 className="text-lg font-bold py-2 text-center">
                  Thông tin chuyển khoản
                </h4>
                <p className="py-2">
                  <strong>Ngân hàng:</strong> {bankDetails.bankName}
                </p>

                <p className="py-2">
                  <strong>Nội dung chuyển khoản:</strong> {bankDetails.note}
                </p>
                <div className="flex justify-center rounded-r-xl">
                  <img
                    src="/QRCode.jpg"
                    alt="anh QR"
                    width={200}
                    height={200}
                  />
                </div>
                <p className="mt-2">
                  <strong>Số tiền cần thanh toán: </strong>
                  {paymentMethod === "full"
                    ? totalPrice.toLocaleString()
                    : deposit.toLocaleString()}{" "}
                  VNĐ
                </p>
                <p className="text-sm text-gray-500 mt-2 py-2">
                  Vui lòng thanh toán theo thông tin trên và đợi 5 phút nhân
                  viên xác nhận.
                </p>
              </div>
            )}
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default TimeSlotDetails;
