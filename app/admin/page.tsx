import React from "react";
import Doughnut from "./component/Doughnut";
import PieChart from "./component/PieChart";
import NotificationPanel from "../component/NotificationPanel";
import TinhTrangSan from "./component/TinhTrangSan";
import RevenueChart from "./component/RevenueChart";

const page = () => {
  return (
    <div className="p-2">
      <h1 className="font-bold text-5xl">Overview</h1>
      <div className="flex w-full min-h-screen gap-2">
        <div className=" flex flex-col gap-2 justify-center h-[600px]">
          <div className="w-[300px]  p-4 rounded-lg">
            <Doughnut></Doughnut>
          </div>
          <div className="w-[300px] p-4  rounded-lg">
            <TinhTrangSan></TinhTrangSan>
          </div>
        </div>
        <div className="w-full h-[900px] p-8">
          <RevenueChart></RevenueChart>
        </div>
      </div>
    </div>
  );
};

export default page;
