import React from "react";
import clsx from "clsx";
import TimeSlotList from "./TimeSlotList";
import TimeSlotDetails from "./TimeSlotDetails";

interface TimeSlot {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  price: number;
  status: boolean;
}

interface Field {
  id: number;
  name: string;
  fieldType: string;
  status: string;
  image: string;
  description: string;
  timeslots: TimeSlot[];
}

interface FieldDetailsProps {
  field: Field;
  selectedTimeSlot: TimeSlot | null;
  onSelectTimeSlot: (slot: TimeSlot) => void;
  onBack: () => void;
}

const FieldDetails: React.FC<FieldDetailsProps> = ({
  field,
  selectedTimeSlot,
  onSelectTimeSlot,
  onBack,
}) => {
  return (
    <div>
      <div className="flex px-[200px] gap-5 md:flex-row">
        <img
          src={field.image}
          alt={field.name}
          className="w-[500px] h-[300px] rounded-xl shadow-lg"
        />
        <div className="flex flex-col gap-10">
          <h1 className="text-7xl font-semi">{field.name}</h1>
          <p>
            <strong>Thể loại:</strong> sân bóng {field.fieldType} người
          </p>
          <p>
            <strong>Trạng thái:</strong>{" "}
            <span
              className={clsx(
                "font-semibold",
                field.status === "HOATDONG" ? "text-green-500" : "text-red-500"
              )}
            >
              {field.status === "HOATDONG"
                ? "Hoạt động"
                : field.status === "BAOTRI"
                ? "Bảo trì"
                : field.status}
            </span>
          </p>
          <p>
            <strong>Mô tả:</strong> {field.description}
          </p>
        </div>
      </div>

      <div className="mt-6 px-[200px]">
        <TimeSlotList
          timeslots={field.timeslots}
          selectedTimeSlot={selectedTimeSlot}
          onSelectTimeSlot={onSelectTimeSlot}
        />
        <button
          className="mt-6 whitespace-nowrap ml-[900px] px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-gray-600"
          onClick={onBack}
        >
          Quay lại
        </button>
      </div>

      {selectedTimeSlot && <TimeSlotDetails timeSlot={selectedTimeSlot} />}
    </div>
  );
};

export default FieldDetails;
