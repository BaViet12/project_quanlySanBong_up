"use client";
import React, { useState, useEffect } from "react";

const TinhTrangSan = () => {
  const [data, setData] = useState({ hoatDong: 0, baoTri: 0 });
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/admin/api/CountFields/status");
        if (!response.ok) throw new Error("Lỗi khi fetch API");

        const result = await response.json();
        setData(result);
      } catch (error: any) {
        setError(error.message);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl ">Tình trạng sân</h1>
      <div className=" flex flex-col gap-3">
        <div className="flex gap-1 bg-green-500 p-3 rounded-lg shadow-xl w-[200px] justify-around">
          <p>Hoạt động</p>
          <p>{data.hoatDong}</p>
        </div>
        <div className="flex gap-1 bg-red-500 p-3 rounded-lg shadow-xl w-[200px] justify-around">
          <p>Bảo trì</p>
          <p>{data.baoTri}</p>
        </div>
      </div>
    </div>
  );
};

export default TinhTrangSan;
