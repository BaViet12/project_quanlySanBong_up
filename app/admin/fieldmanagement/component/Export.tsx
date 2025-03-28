import React, { useState } from "react";
import { TiExportOutline } from "react-icons/ti";
import { FaFileImport } from "react-icons/fa6";

const Export = () => {
  const [loadingExcel, setLoadingExcel] = useState(false);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const handleExportExcel = async () => {
    setLoadingExcel(true);

    try {
      const response = await fetch("/api/soccer/export/excel");
      if (!response.ok) {
        throw new Error("Lỗi tải file Excel");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Quản lý sân bóng.xlsx";
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
  const handleExportPdf = async () => {
    try {
      const response = await fetch("/api/soccer/export/pdf");
      if (!response.ok) {
        throw new Error("Lỗi tải file PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "DanhSachSanBong.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("🔥 Lỗi xuất file PDF:", error);
      alert("Xuất file PDF thất bại, vui lòng thử lại!");
    }
  };

  return (
    <div className="flex justify-end gap-2">
      <div>
        <button className="btn bg-white text-white w-[95px] border-gray-400">
          <FaFileImport className="text-2xl text-black " />
        </button>
      </div>
      <div className="dropdown dropdown-bottom dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn bg-white text-white w-[95px] border-gray-400"
        >
          <TiExportOutline className="text-2xl text-black" />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[9999] w-52 p-2 shadow-sm border-2 mt-1"
        >
          <li>
            <a className="text-sm" onClick={handleExportExcel}>
              Excel
            </a>
          </li>
          <li>
            <a className="text-sm" onClick={handleExportPdf}>
              PDF
            </a>
          </li>
        </ul>
      </div>
      <div>
        <button className="btn bg-white text-black w-[95px] border-gray-400">
          Report
        </button>
      </div>
    </div>
  );
};

export default Export;
