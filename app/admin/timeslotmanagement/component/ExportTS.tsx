"use client";
import React, { useState } from "react";
import { TiExportOutline } from "react-icons/ti";
const ExportTS = () => {
  const [loadingExcel, setLoadingExcel] = useState(false);
  const handleExportExcel = async () => {
    setLoadingExcel(true);

    try {
      const response = await fetch("/api/timeslot/export/excel");
      if (!response.ok) {
        throw new Error("Lỗi tải file Excel");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Quản lý khung giờ.xlsx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Lỗi xuất file Excel:", error);
      alert("Xuất file Excel thất bại, vui lòng thử lại!");
    } finally {
      setLoadingExcel(false);
    }
  };
  return (
    <div className="flex justify-end mb-2">
      <div className="dropdown dropdown-bottom dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn bg-green-500 text-white w-[90px] p-2"
        >
          <TiExportOutline className="text-2xl" />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[9999] w-52 p-2 shadow-sm border-2 mt-1"
        >
          <li>
            <a className="text-sm " onClick={handleExportExcel}>
              Excel
            </a>
          </li>
          <li>
            <a className="text-sm">PDF</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ExportTS;
