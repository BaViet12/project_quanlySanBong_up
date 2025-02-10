import TableBooking from "@/app/component/TableBooking";
import React from "react";

const page = () => {
  return (
    <div className="mr-32">
      <h1 className="text-2xl font-bold py-3">Đơn đặt sân đang cần xác nhận</h1>
      <TableBooking />
    </div>
  );
};

export default page;
