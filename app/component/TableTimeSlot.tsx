"use client";
import React, { useEffect, useState } from "react";
import ExportTS from "../admin/timeslotmanagement/component/ExportTS";
import { GoPencil } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

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
  const [filter, setFilter] = useState("all");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [limitSize, setLimitSize] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);

  const handleCheckboxChange = (id: number) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0)
      return alert("Vui lòng chọn ít nhất 1 khung giờ.");
    fetch("/api/timeslot", {
      method: "DELETE",
      body: JSON.stringify({ ids: selectedIds }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      alert("Xóa thành công");
      setSelectedIds([]);
      reloadKey(Date.now()); // Cập nhật lại bảng
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `/api/timeslot?filter=${filter}&page=${page}&limit_size=${limitSize}`
      );
      if (!response.ok) {
        console.error("Failed to fetch data");
        return;
      }
      const data = await response.json();
      setTimeslot(data.data || []); // Adjust this based on actual API response
      setTotalRecords(data.meta.totalRecords); // Total records for pagination
    };

    fetchData().catch(console.error);
  }, [filter, page, limitSize, reloadKey]);

  const totalPages = Math.ceil(totalRecords / limitSize);
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex flex-col gap-2">
        <div className="w-full flex justify-between items-center">
          <div>
            <select
              id="filter"
              className="border px-2 py-1 rounded bg-gray-300"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Tất cả</option>
              <option value="active">Hoạt động</option>
              <option value="inactive">Ngưng hoạt động</option>
            </select>
          </div>

          <div>
            <button
              onClick={handleDeleteSelected}
              className=" px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Xóa mục đã chọn
            </button>
          </div>
        </div>
        <table className="table w-full border-2 text-center table-auto">
          <thead className="">
            <tr className="bg-slate-200 text-black">
              <th></th>
              <th>ID</th>
              <th>KHUNG GIỜ</th>
              <th>THAO TÁC</th>
            </tr>
          </thead>
          <tbody>
            {timeslot.map((slot) => (
              <tr key={slot.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(slot.id)}
                    onChange={() => handleCheckboxChange(slot.id)}
                  />
                </td>
                <td>{slot.id}</td>
                <td>{slot.name}</td>
                <td className="flex justify-center gap-3">
                  <button
                    className="text-xl rounded-sm   hover:text-red-700"
                    onClick={() => onEdit(slot)}
                  >
                    <GoPencil />
                  </button>
                  <button
                    className="text-xl rounded-sm  text-red-700 hover:text-black"
                    onClick={() => onDelete(slot.id)}
                  >
                    <RiDeleteBin6Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-end gap-5 w-full">
          <button
            onClick={() => setPage(Math.max(page - 1, 1))}
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
          >
            <GrPrevious />
          </button>
          <span>
            Trang {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage(Math.min(page + 1, totalPages))}
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
          >
            <GrNext />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableTimeSlot;
