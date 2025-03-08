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
        <button className="btn bg-blue-500 text-white w-[95px]">
          <FaFileImport className="text-2xl" />
        </button>
      </div>
      <div className="dropdown dropdown-bottom dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn bg-green-500 text-white w-[95px]"
        >
          <TiExportOutline className="text-2xl" />
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
        <button className="btn bg-red-500 text-white w-[95px]">Report</button>
      </div>
    </div>
  );
};

export default Export;
