"use client";
import React, { useEffect, useState } from "react";

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
interface PhanTrang {
  totalRecords: number;
  totalPage: number;
  page: number;
  limit_size: number;
  skip: number;
}

const TableFields: React.FC<TableDashboardProps> = ({
  onDelete,
  onEdit,
  reloadKey,
}) => {
  const [sanTable, setSanTable] = useState<San[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [phanTrang, setPhanTrang] = useState<PhanTrang | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingFields, setLoadingFields] = useState(true);

  useEffect(() => {
    fetch(`/admin/api/field?page=${currentPage}&limit_size=${pageSize}`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch data phan trang");
        return response.json();
      })
      .then((data) => {
        console.log(data.data);
        setSanTable(data.data);
        setPhanTrang(data.meta);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [currentPage, pageSize, reloadKey]);

  // useEffect(() => {
  //   fetch("/api/soccer")
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch data");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("Dữ liệu từ API Field", data.fields);
  //       setSanTable(data.fields);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }, [reloadKey]);
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
      <div className="overflow-x-auto flex justify-center w-full">
        <table className="table w-full xl:ml-36 border-2 mt-14 text-center">
          <thead className="">
            <tr className="bg-green-800 text-white text-sm">
              <th>Mã sân</th>
              <th>Tên sân</th>
              <th>Loại sân</th>
              <th>Trạng thái</th>
              <th>Hình ảnh</th>
              <th>Mô tả</th>
              <th>Thao tác</th>
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
                  <td>{field.id}</td>
                  <td>{field.name}</td>
                  <td>{field.field_type}</td>
                  <td>{field.status}</td>
                  <td>
                    <div className="flex justify-center">
                      <img
                        src={field.HinhAnh}
                        alt={field.name}
                        className="w-14 h-16 object-cover rounded"
                      />
                    </div>
                  </td>
                  <td>{field.MoTa}</td>
                  <td>
                    <div className="flex gap-1 justify-center">
                      <button
                        type="submit"
                        className="bg-green-800 rounded-sm px-1 text-white hover:bg-blue-700"
                        onClick={() => onEdit(field)}
                      >
                        Sửa
                      </button>
                      <button
                        className="bg-green-800 rounded-sm px-1 text-white hover:bg-blue-700"
                        onClick={() => onDelete(field.id)}
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {phanTrang && (
        <div className="flex justify-between space-x-2 mt-4">
          <div className="flex ml-32">
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
              className="px-3 py-1 bg-green-800 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-gray-300"
            >
              Trước
            </button>

            {[...Array(phanTrang.totalPage)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-green-800 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === phanTrang.totalPage}
              className="px-3 py-1 bg-green-800 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-gray-300"
            >
              Sau
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableFields;
