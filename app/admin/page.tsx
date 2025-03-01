import React from "react";
import Doughnut from "./component/Doughnut";
import PieChart from "./component/PieChart";
import NotificationPanel from "../component/NotificationPanel";
import TinhTrangSan from "./component/TinhTrangSan";

const page = () => {
  return (
    <div>
      <h1 className="font-bold text-3xl">Overview</h1>
      <div className=" flex  gap-5 py-3 px-1">
        <div className="w-[400px]  p-4 rounded-lg">
          <Doughnut></Doughnut>
        </div>
        <div className="w-[400px]  p-4 rounded-lg">
          <TinhTrangSan></TinhTrangSan>
        </div>
      </div>
    </div>
  );
};

export default page;
