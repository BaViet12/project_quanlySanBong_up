"use client";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}

const RevenueChart = () => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const res = await fetch("/admin/api/revenue");
        const data = await res.json();

        const labels = data.revenueMonth.map(
          (item: any) => `Tháng ${item.month}`
        );
        const revenueData = data.revenueMonth.map((item: any) => item.revenue);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Doanh thu",
              data: revenueData,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu doanh thu:", error);
      }
    };

    fetchRevenue();
  }, []);

  return (
    <div>
      <h2 className="text-2xl text-center ">Doanh thu từng tháng</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default RevenueChart;
