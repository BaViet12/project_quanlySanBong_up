import React from "react";

interface TimeSlot {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  price: number;
  status: boolean;
}

interface TimeSlotDetailsProps {
  timeSlot: TimeSlot;
}

const TimeSlotDetails: React.FC<TimeSlotDetailsProps> = ({ timeSlot }) => {
  return (
    <div className="w-[1100px] mt-4 rounded-md border-2 flex flex-col gap-10 p-10 mx-auto">
      <h4 className="text-xl font-semibold text-center">Thông tin khung giờ</h4>
      <p className="font-Karla">
        <strong>Khung giờ: </strong>
        {timeSlot.name}
      </p>
      <p className="font-Karla">
        <strong>Giá: </strong> {timeSlot.price.toLocaleString()} VNĐ
      </p>
      <div className="flex justify-center">
        <button
          className="p-2 rounded-lg w-[200px] bg-red-500 hover:bg-gray-600 text-white"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          Đặt sân
        </button>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Press ESC key or click on ✕ button to close</p>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default TimeSlotDetails;
