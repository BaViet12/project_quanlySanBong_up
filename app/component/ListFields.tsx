"use client";
import React, { useEffect, useState } from "react";
import clsx from "clsx";

interface TimeSlot {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  price: number;
  status: boolean;
}

interface Field {
  id: number;
  name: string;
  fieldType: string;
  status: string;
  image: string;
  description: string;
  timeslots: TimeSlot[];
}

const ListFields: React.FC = () => {
  const [fields, setFields] = useState<Field[]>([]);
  const [selectedField, setSelectedField] = useState<Field | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
    null
  );

  const GiaLapUSER = 1;

  const fetchFields = async () => {
    try {
      const response = await fetch("/api/soccer");
      const data = await response.json();
      setFields(data.fields);
      console.log("Dữ liệu từ API soccer sau fetch:", data.fields);
    } catch (error) {
      console.error("Lỗi khi gọi API :", error);
    }
  };

  const handleBooking = async (
    price_id: number,
    total_price: number,
    status: string
  ) => {
    console.log("Dữ liệu gửi lên API:", {
      user_id: GiaLapUSER,
      price_id,
      total_price,
      status,
    });

    try {
      const respone = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: GiaLapUSER,
          price_id,
          total_price,
          status: "DANGXULY",
        }),
      });
      const data = await respone.json();
      if (respone.ok) {
        alert(data.message || "Đặt sân thành công");
        await fetchFields();
      } else {
        alert(data.message || "Đặt sân thất bại!");
      }
    } catch (error) {
      console.error("Lỗi đặt sân: ", error);
      alert("Lỗi hệ thống, vui lòng thử lại sau");
    }
  };

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await fetch("/api/soccer");
        const data = await response.json();
        console.log("Dữ liệu từ API soccer sau khi đặt sân:", data);
        setFields(data.fields);
      } catch (error) {
        console.error("Lỗi khi gọi API :", error);
      }
    };
    fetchFields();
  }, []);

  return (
    <div className="w-auto h-auto p-4 mx-auto">
      {selectedField ? (
        <div>
          <div className="flex px-[200px] gap-5 md:flex-row">
            <img
              src={selectedField.image}
              alt={selectedField.name}
              className="w-[500px] h-[300px] rounded-xl shadow-lg"
            />
            <div className="flex flex-col gap-10">
              <h1 className="text-7xl font-semi">{selectedField.name}</h1>
              <p>
                <strong>Thể loại:</strong> sân bóng {selectedField.fieldType}{" "}
                người
              </p>
              <p>
                <strong>Trạng thái:</strong>{" "}
                <span
                  className={clsx(
                    "font-semibold",
                    selectedField.status === "HOATDONG"
                      ? "text-green-500"
                      : "text-red-500"
                  )}
                >
                  {selectedField.status === "HOATDONG"
                    ? "Hoạt động"
                    : selectedField.status === "BAOTRI"
                    ? "Bảo trì"
                    : selectedField.status}
                </span>
              </p>
              <p>
                <strong>Mô tả:</strong> {selectedField.description}
              </p>
            </div>
          </div>

          {/* Danh sách khung giờ */}
          <div className="mt-6 px-[200px] w-">
            <h3 className="text-2xl font-bold">Khung giờ</h3>
            <div className="flex flex-wrap gap-2 mt-3">
              {selectedField.timeslots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => setSelectedTimeSlot(slot)}
                  className={clsx(
                    "px-4 py-2 rounded-lg hover:bg-orange-600",
                    selectedTimeSlot?.id === slot.id
                      ? "bg-yellow-500 text-white"
                      : slot.status
                      ? "bg-blue-500 hover:bg-blue-600 text-white"
                      : "bg-gray-400 cursor-not-allowed text-gray-700"
                  )}
                  disabled={!slot.status}
                >
                  {slot.name}
                </button>
              ))}
            </div>
            <button
              className="mt-6 whitespace-nowrap ml-[900px] px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 mr-12"
              onClick={() => setSelectedField(null)}
            >
              Quay lại
            </button>
          </div>
          {/* Thông tin khung giờ */}
          {selectedTimeSlot && (
            <div className="w-[1000px] mt-4 rounded-lg bg-gray-50 flex flex-col gap-10 p-10 mx-auto">
              <h4 className="text-xl font-semibold text-center">
                Thông tin khung giờ
              </h4>
              <p>
                <strong>Khung giờ: </strong>
                {selectedTimeSlot.name}
              </p>
              <p>
                <strong>Giá: </strong> {selectedTimeSlot.price.toLocaleString()}{" "}
                VNĐ
              </p>
              {/* <button
                      onClick={() => {
                        console.log(selectedTimeSlot)
                        handleBooking(
                          selectedTimeSlot.id,
                          selectedTimeSlot.price,
                          "DANGDAT"
                        )
                      }}
                      className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 items-center"
                    >
                      Giữ chỗ
                  </button> */}
              <button
                className="btn bg-green-800 text-white"
                onClick={() =>
                  document.getElementById("my_modal_2").showModal()
                }
              >
                Giữ chỗ
              </button>
              <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-2xl text-center">Thông báo</h3>
                  <p className="py-2">
                    Để đặt sân bóng này, bạn cần phải đặt cọc 30% tiền sân cho
                    chúng tôi :
                  </p>
                  <p className="py-2">Bước 1: Thông tin chuyển khoản</p>
                  <p className="py-2 ml-16">STK: 0762748624</p>
                  <p className="py-2 ml-16">Ngân Hàng An Bình</p>
                  <p className="py-2">Bước 2: Nội dung chuyển khoản</p>
                  <p className="py-2 ml-16">
                    Đặt cọc sân... khung giờ... ngày...{" "}
                  </p>
                  <p className="py-2">
                    Bước 3: Tải lên ảnh giao dịch thành công
                  </p>
                  <p className="py-2">
                    Lưu ý: Trong 30p chưa xác nhận thì sẽ lại sân trống
                  </p>
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>
            </div>
          )}
        </div>
      ) : (
        <div className="w-[1200px] h-auto px-[100px]">
          <h1 className="text-5xl font-bold mb-10">Danh sách sân bóng</h1>
          <div className="flex gap-20 pb-10 flex-wrap pt-10">
            {fields.map((field) => (
              <div
                key={field.id}
                className="flex gap-10 p-10 flex-wrap hover:border-2  w-[1200px]"
                onClick={() => setSelectedField(field)}
              >
                <div>
                  <img
                    src={field.image}
                    alt={field.name}
                    className="w-[600px] h-[400px] rounded-lg"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <h1 className="font-semibold text-6xl">{field.name}</h1>
                  <p className="font-semi text-lg">
                    Sân bóng đá {field.fieldType} người
                  </p>
                  <p
                    className={clsx(
                      "font-semibold",
                      field.status === "HOATDONG"
                        ? "text-green-500"
                        : "text-red-500"
                    )}
                  >
                    {field.status === "HOATDONG"
                      ? "Hoạt động"
                      : field.status === "BAOTRI"
                      ? "Bảo trì"
                      : field.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ListFields;
