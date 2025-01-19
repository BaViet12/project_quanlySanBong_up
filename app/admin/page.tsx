import React from "react";
import BarChart from "./component/BarChart";
import PieChart from "./component/PieChart";

const page = () => {
  return (
    <div className="flex gap-10 justify-center items-center">
      <BarChart></BarChart>
    </div>
  );
};

export default page;
