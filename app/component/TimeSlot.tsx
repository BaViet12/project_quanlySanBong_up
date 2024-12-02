"use client";
import React, { useEffect, useState } from "react";

interface Soccer {
  id: number;
  name: string;
  field_type: number;
  status: string;
  HinhAnh: string;
  MoTa: string;
}

interface TimeSlot {
  id: number;
  name: string;
  start_time: string;
  end_time: string;
  status: boolean;
}

const TimeSlot: React.FC = () => {
  const [soccers, setSoccers] = useState<Soccer[]>([]);
  const [timeslots, setTimeslots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [soccerRes, timeslotRes] = await Promise.all([
          fetch("/api/soccer"),
          fetch("/api/timeslot"),
        ]);

        if (!soccerRes.ok || !timeslotRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const soccerData = await soccerRes.json();
        const timeslotData = await timeslotRes.json();

        console.log("Dữ liệu từ API Soccer:", soccerData);
        console.log("Dữ liệu từ API TimeSlot:", timeslotData);

        // Gán dữ liệu
        setSoccers(Array.isArray(soccerData.Soccer) ? soccerData.Soccer : []);
        setTimeslots(Array.isArray(timeslotData.Timeslot) ? timeslotData.Timeslot : []);

        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-10">
      <h1 className="ml-28 font-bold text-5xl py-10">Danh sách sân bóng</h1>
      <div className="flex flex-wrap justify-start gap-10 px-48">
        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : soccers.length > 0 ? (
          soccers.map((soccer) => (
            <div key={soccer.id} className="flex p-6 w-full h-auto gap-10">
              <div>
                <img
                  src={soccer.HinhAnh}
                  alt={soccer.name}
                  className="w-auto h-96 object-cover m-auto"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-5">
                  <h1 className="text-3xl font-semibold">{soccer.name}</h1>
                  <p className="text-blue-700 flex gap-1">
                    Thể loại:{" "}
                    <span className="text-black">
                      Sân bóng đá {soccer.field_type} người
                    </span>
                  </p>
                  <p className="text-blue-700 flex gap-1">
                    Trạng thái: <span className="text-black">{soccer.status}</span>
                  </p>
                  <p className="text-blue-700 flex gap-1">
                    Mô tả: <span className="text-black">{soccer.MoTa}</span>
                  </p>
                </div>
                <div className="flex gap-1 flex-wrap">
                  {/* Hiển thị khung giờ */}
                  {timeslots.length > 0 ? (
                    timeslots.map((time) =>
                      time && time.name ? (
                        <p key={time.id} className="flex">
                          <span>{time.name}</span>
                        </p>
                      ) : (
                        <p key={time.id} className="flex">Dữ liệu không hợp lệ</p>
                      )
                    )
                  ) : (
                    <p>Không có khung giờ nào</p>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Không có dữ liệu để hiển thị</p>
        )}
      </div>
    </div>
  );
};

export default TimeSlot;
