"use client";
import React, { useEffect, useState } from "react";
interface TimeSlot {
  id: number;
  name: string;
  start_time: string;
  end_time: string;
}

interface TableDashboardProps {
  onEdit: (product: TimeSlot) => void;
  onDelete: (id: number) => void;
  reloadKey: (id: number) => void;
}
const TableTimeSlot: React.FC<TableDashboardProps> = ({
  onDelete,
  onEdit,
  reloadKey,
}) => {
  const [timeslot, setTimeslot] = useState<TimeSlot[]>([]);
  useEffect(() => {
    fetch("/api/timeslot")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Dữ liệu từ API Field", data.TimeslotAPI);
        setTimeslot(data.TimeslotAPI);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [reloadKey]);
  return (
    <div className="overflow-x-auto flex justify-center w-full">
      <table className="table w-full xl:ml-36 border-2 mt-14 text-center">
        <thead className="">
          <tr className="bg-green-800 text-white text-sm">
            <th>Mã khung giờ</th>
            <th>Tên khung giờ</th>
            <th>Giờ bắt đầu</th>
            <th>Giờ kết thúc</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {timeslot.map((timeslot) => (
            <tr key={timeslot.id}>
              <td>{timeslot.id}</td>
              <td>{timeslot.name}</td>
              <td>{timeslot.start_time}</td>
              <td>{timeslot.end_time}</td>
              <td className="flex gap-1 justify-center">
                <button
                  type="submit"
                  className="bg-green-800 rounded-sm px-1 text-white hover:bg-blue-700"
                  onClick={() => onEdit(timeslot)}
                >
                  Sửa
                </button>
                <button
                  className="bg-green-800 rounded-sm px-1 text-white hover:bg-blue-700 "
                  onClick={() => onDelete(timeslot.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableTimeSlot;
