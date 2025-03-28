"use client";
import React, { useEffect, useState } from "react";
import { GoPencil } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";

interface Price {
  id: number;
  name: string;
  field_id: number;
  timeslot_id: number;
  price: number;
  status: string;
}
interface TableDashboardProps {
  onEdit: (product: Price) => void;
  onDelete: (id: number) => void;
  reloadKey: (id: number) => void;
}

interface PhanTrang {
  totalRecords: number;
  totalPage: number;
  page: number;
  limit_size: number;
  skip: number;
}

const TablePrice: React.FC<TableDashboardProps> = ({
  onDelete,
  onEdit,
  reloadKey,
}) => {
  const [price, setPrice] = useState<Price[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [phanTrang, setPhanTrang] = useState<PhanTrang | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleCheckboxChange = (id: number) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0)
      return alert("Vui lòng chọn ít nhất 1 khung giờ");
    fetch("/api/price", {
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
    fetch(`/admin/api/price?page=${currentPage}&limit_size=${pageSize}`)
      .then((response) => {
        if (!response.ok)
          throw new Error("Failed to fetch Data PhanTrangPrice");
        return response.json();
      })
      .then((data) => {
        setPrice(data.data);
        setPhanTrang(data.meta);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, [currentPage, pageSize, reloadKey]);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newSize = parseInt(event.target.value);
    setPageSize(newSize);
    setCurrentPage(1); // Reset to first page when changing page size
  };
  return (
    <div className="space-x-4">
      <div className="overflow-x-auto flex justify-center scroll-m-10">
        <table className="table w-full table-auto border-2 mt-14 text-center">
          <thead className="">
            <tr className="bg-slate-200 text-black">
              <th></th>
              <th>ID</th>
              <th>TÊN</th>
              <th>GIÁ</th>
              <th>TRẠNG THÁI</th>
              <th>THAO TÁC</th>
            </tr>
          </thead>
          <tbody>
            {price.map((pricemap) => (
              <tr key={pricemap.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(pricemap.id)}
                    onChange={() => handleCheckboxChange(pricemap.id)}
                  />
                </td>
                <th>{pricemap.id}</th>
                <td>{pricemap.name}</td>
                <td>{pricemap.price}</td>
                <td>{pricemap.status}</td>
                <td className="flex gap-1 justify-center">
                  <button
                    type="submit"
                    className="text-xl rounded-sm  text-black hover:text-black"
                    onClick={() => onEdit(pricemap)}
                  >
                    <GoPencil />
                  </button>
                  <button
                    className="text-xl rounded-sm  text-red-700 hover:text-black"
                    onClick={() => onDelete(pricemap.id)}
                  >
                    <RiDeleteBin6Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {phanTrang && (
        <div className="flex justify-between items-center">
          <div className="flex justify-between space-x-2 mt-4 ">
            <div className="flex">
              <div className=" space-x-2">
                <label htmlFor="pageSize" className="text-sm">
                  Số mục mỗi trang:
                </label>
                <select
                  id="pageSize"
                  value={pageSize}
                  onChange={handlePageSizeChange}
                  className="border rounded px-2 py-1"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-gray-300"
              >
                Trước
              </button>
              {[...Array(phanTrang.totalPage)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === index + 1
                      ? "bg-white text-black"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === phanTrang.totalPage}
                className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-gray-300"
              >
                Sau
              </button>
            </div>
          </div>
          <div>
            <button
              onClick={handleDeleteSelected}
              className="mt-3 px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Xóa mục đã chọn
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TablePrice;
