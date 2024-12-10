"use client"
import React, { useEffect, useState } from "react";
import clsx from "clsx";

interface TimeSlot {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  price: number;
  status: boolean; // true: còn trống, false: đã đặt hoặc hết hạn
}

interface Field {
  id: number;
  name: string;
  fieldType: string;
  status: string; // "HOATDONG" hoặc "DONGCUA"
  image: string;
  description: string;
  timeslots: TimeSlot[];
}

const SoccerField: React.FC = () => {
  const [fields, setFields] = useState<Field[]>([]); // Danh sách sân bóng
  const [selectedField, setSelectedField] = useState<Field | null>(null); // Sân đang được chọn
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null); // Khung giờ đang được chọn

  // Gọi API để lấy dữ liệu
  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await fetch("/api/soccer"); // Đường dẫn API
        const data = await response.json();
        setFields(data.fields);
        console.log("Dữ liệu lấy từ API Sân Bóng",data.fields)
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchFields();
  }, []);

  return (
    <div className="container flex flex-wrap mx-auto p-4 w-auto h-auto">
      {selectedField ? (
        <div>
          {/* Chi tiết sân */}
          <div className="flex flex-col md:flex-row gap-4">
            <img
              src={selectedField.image}
              alt={selectedField.name}
              className="w-[500px] h-[300px] rounded-lg shadow-lg"
            />
            <div className="flex flex-col gap-14">
              <h2 className="text-6xl font-bold text-green-800">{selectedField.name}</h2>
              <p className="text-xl">
                <strong>Thể loại:</strong> Sân bóng {selectedField.fieldType} người
              </p>
              <p className="text-xl">
                <strong>Trạng thái:</strong>{" "}
                <span
                  className={clsx(
                    "font-semibold",
                    selectedField.status === "HOATDONG"
                      ? "text-green-500"
                      : "text-red-500"
                  )}
                >
                  {selectedField.status}
                </span>
              </p>
              <p className="text-xl">
                <strong>Mô tả:</strong> {selectedField.description}
              </p>
            </div>
          </div>

          {/* Danh sách khung giờ */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold">Khung giờ:</h3>
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedField.timeslots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => setSelectedSlot(slot)}
                  className={clsx(
                    "px-4 py-2 rounded-lg hover:bg-orange-600",
                    slot.status
                      ? "bg-blue-500 hover:bg-blue-600 text-white"
                      : "bg-gray-400 cursor-not-allowed text-gray-700"
                  )}
                  disabled={!slot.status}
                >
                  {slot.name}
                </button>
              ))}
            </div>
          </div>

          {/* Thông tin khung giờ */}
          {selectedSlot && (
            <div className="mt-4 border rounded-lg bg-gray-50 flex flex-col gap-3">
              <h4 className="text-xl font-bold">Thông tin khung giờ</h4>
              <p className="">
                <strong>Khung giờ : </strong> {selectedSlot.name}
              </p>
              <p>
                <strong>Giá :</strong> {selectedSlot.price.toLocaleString()}.000 VNĐ
              </p>
            </div>
          )}

          {/* Nút quay lại */}
          <button
            className="mt-6 ml-[1300px] px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            onClick={() => setSelectedField(null)}
          >
            Quay lại
          </button>
        </div>
      ) : (
        <div className="">
          {/* Danh sách sân */}
          <h1 className="text-4xl font-bold mb-6">Danh sách sân bóng</h1>
          <div className="flex gap-5 flex-wrap">
            {fields.map((field) => (
              <div
                key={field.id}
                className="p-4 hover:bg-gray-100 cursor-pointer flex gap-5 border-4 rounded-xl"
                onClick={() => setSelectedField(field)}
              >
                <img
                  src={field.image}
                  alt={field.name}
                  className="w-[500px] h-[300px] object-cover rounded-lg mb-4"
                />
                <div className="flex flex-col gap-3 items-c">
                    <h3 className="text-6xl font-semibold text-green-800">{field.name}</h3>
                    <p className="text-xl">Loại sân: {field.fieldType} người</p>
                </div>  
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SoccerField;
