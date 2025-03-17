"use client";
import { useRef, useEffect, useState } from "react";
import "chart.js/auto";
import { Chart } from "chart.js/auto";
import dynamic from "next/dynamic";

interface CountFieldsResponse {
  totalField: number;
  Field5: number;
  Field7: number;
}

const Doughnut = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Doughnut),
  {
    ssr: false,
  }
);

export default function BarChart() {
  const [chartData, setChartData] = useState({
    labels: ["Tổng các sân", "Sân 5", "Sân7"],
    datasets: [
      {
        label: "Field Statistics",
        data: [0, 0, 0],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });
  useEffect(() => {
    // Fetch API
    async function fetchData() {
      try {
        const response = await fetch("/admin/api/CountFields");
        const data = await response.json();

        // Cập nhật dữ liệu biểu đồ
        setChartData({
          labels: ["Tổng các sân", "Sân 5", "Sân7"],
          datasets: [
            {
              label: "Field Statistics",
              data: [data.totalField, data.Field5, data.Field7],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
              ],
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);
  return (
    <div>
      <div className="">
        <h1 className="text-center text-2xl">Thống kê sân bóng</h1>
        <Doughnut data={chartData}></Doughnut>
      </div>
      <div></div>
    </div>
  );
}
