"use client";
import React, { useState, useEffect } from "react";
import FieldDetails from "../component/FieldDetails";
import FieldCard from "./FieldCard";

interface Field {
  id: number;
  name: string;
  fieldType: string;
  status: string;
  image: string;
  description: string;
  timeslots: { id: number; name: string; status: boolean }[];
}

const ListFields: React.FC = () => {
  const [fields, setFields] = useState<Field[]>([]);
  const [selectedField, setSelectedField] = useState<Field | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<number | null>(null);

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await fetch("/api/soccer"); // Đường dẫn API để lấy dữ liệu
        const data = await response.json();
        setFields(data.fields); // Cập nhật danh sách sân bóng
        console.log("Dữ liệu từ API:", data.fields);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchFields();
  }, []);

  return (
    <div className="w-auto h-auto p-4 mx-auto">
      {selectedField ? (
        <FieldDetails
          field={selectedField}
          selectedTimeSlot={selectedTimeSlot}
          onSelectTimeSlot={setSelectedTimeSlot}
          onBack={() => setSelectedField(null)}
        />
      ) : (
        <div className="w-[1200px] h-auto px-[100px]">
          <h1 className="text-5xl font-bold mb-10">Danh sách sân bóng</h1>
          <div className="flex gap-20 pb-10 flex-wrap pt-10">
            {fields.map((field) => (
              <FieldCard
                key={field.id}
                field={field}
                onClick={() => setSelectedField(field)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ListFields;
