import React from "react";
import Doughnut from "./component/Doughnut";
import PieChart from "./component/PieChart";

const page = () => {
  return (
    <div className=" flex flex-col gap-5 py-7 px-3">
      <h1 className="font-bold text-3xl">Overview</h1>
      <div className="w-[400px] border-2 p-4 rounded-lg">
        <Doughnut></Doughnut>
      </div>
    </div>
  );
};

export default page;
