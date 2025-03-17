import TableBooking from "@/app/component/TableBooking";
import React from "react";

const page = () => {
  return (
    <div className="mr-10 w-auto h-full">
      <h1 className="text-2xl font-bold py-3">Sân cần xác nhận</h1>
      <TableBooking />
    </div>
  );
};

export default page;
