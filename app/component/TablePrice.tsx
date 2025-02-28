"use client";
import React, { useEffect, useState } from "react";

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
  useEffect(() => {
    fetch(`/admin/api/price?page=${currentPage}&limit_size=${pageSize}`)
      .then((Response) => {
        if (!Response.ok)
          throw new Error("Failed to fetch Data PhanTrangPrice");
        return Response.json();
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

  // useEffect(()=>{
  //     fetch('/api/price')
  //     .then((response) =>{
  //         if(!response.ok) {
  //             throw new Error('Failed to fetch data');
  //         }
  //         return response.json();
  //     })
  //     .then((data)=>{
  //         console.log("Dữ liệu từ API Field",data.Soccer);
  //         setPrice(data.Soccer);
  //     })
  //     .catch((error)=>{
  //         console.error('Error:',error);
  //     })
  // },[reloadKey]);
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
        <table className="table w-[1100px] xl:ml-36 border-2 mt-14 text-center">
          <thead className="">
            <tr className="bg-green-800 text-white text-sm">
              <th>Mã giá</th>
              <th>Tên</th>
              <th>Mã sân</th>
              <th>Mã giờ</th>
              <th>Giá</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {price.map((pricemap) => (
              <tr key={pricemap.id}>
                <th>{pricemap.id}</th>
                <td>{pricemap.name}</td>
                <td>{pricemap.field_id}</td>
                <td>{pricemap.timeslot_id}</td>
                <td>{pricemap.price}</td>
                <td>{pricemap.status}</td>
                <td className="flex gap-1 justify-center">
                  <button
                    type="submit"
                    className="bg-green-800 rounded-sm px-1 text-white hover:bg-blue-700"
                    onClick={() => onEdit(pricemap)}
                  >
                    Sửa
                  </button>
                  <button
                    className="bg-green-800 rounded-sm px-1 text-white hover:bg-blue-700 "
                    onClick={() => onDelete(pricemap.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {phanTrang && (
        <div className="flex justify-between space-x-2 mt-4 w-[1100px]">
          <div className="flex ml-80">
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

export default TablePrice;
