"use client";

import React, { useEffect, useState } from "react";
import { GoPencil } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

interface San {
  id: number;
  name: string;
  field_type: number;
  status: string;
  HinhAnh: string;
  MoTa: string;
}
interface TableDashboardProps {
  onEdit: (product: San) => void;
  onDelete: (id: number) => void;
  reloadKey: (id: number) => void;
}

const TableFields: React.FC<TableDashboardProps> = ({
  onDelete,
  onEdit,
  reloadKey,
}) => {
  const [sanTable, setSanTable] = useState<San[]>([]);
  const [filter, setFilter] = useState("all");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [limitSize, setLimitSize] = useState(5);
  const [loading, setLoading] = useState(false);
  const [loadingFields, setLoadingFields] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);

  const handleCheckboxChange = (id: number) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return alert("Vui lòng chọn ít nhất 1 sân");
    fetch("/api/soccer", {
      method: "DELETE",
      body: JSON.stringify({ ids: selectedIds }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      alert("Xóa thành công");
      setSelectedIds([]);
      reloadKey(Date.now());
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `/admin/api/field?filter=${filter}&page=${page}&limit_size=${limitSize}`
      );
      if (!response.ok) {
        console.error("Lỗi fetch dữ liệu");
        return;
      }
      const data = await response.json();
      setSanTable(data.data);
      setTotalRecords(data.meta.totalRecords);
    };
    fetchData().catch(console.error);
  }, [filter, page, limitSize, reloadKey]);
  const totalPages = Math.ceil(totalRecords / limitSize);

  return (
    <div className="w-full overflow-x-auto pt-2">
      <div className="flex flex-col gap-2">
        <div className="w-full flex justify-between items-center">
          <div>
            <select
              className="border px-2 py-1 rounded bg-gray-300"
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Tất cả</option>
              <option value="5">Sân 5</option>
              <option value="7">Sân 7</option>
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
        <table className="table border-2 text-center table-auto w-full min-w-[400px]">
          <thead className="">
            <tr className="bg-slate-200 text-black">
              <th></th>
              <th>ID</th>
              <th>SÂN</th>
              <th>LOẠI</th>
              <th>TRẠNG THÁI</th>
              <th>THAO TÁC</th>
            </tr>
          </thead>
          <tbody>
            {sanTable.length === 0 ? (
              <tr>
                <td colSpan={7}>Đang tải dữ liệu...</td>
              </tr>
            ) : (
              sanTable.map((field) => (
                <tr key={field.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(field.id)}
                      onChange={() => handleCheckboxChange(field.id)}
                    />
                  </td>
                  <td>{field.id}</td>
                  <td>{field.name}</td>
                  <td>{field.field_type}</td>
                  <td>{field.status}</td>
                  <td className="flex gap-2 justify-center items-center">
                    <button
                      type="submit"
                      className="text-xl rounded-sm  text-black hover:text-black"
                      onClick={() => onEdit(field)}
                    >
                      <GoPencil />
                    </button>
                    <button
                      className="text-xl rounded-sm  text-red-700 hover:text-black"
                      onClick={() => onDelete(field.id)}
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </td>
                </tr>
              ))
            )}
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

export default TableFields;
