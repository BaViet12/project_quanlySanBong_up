import React from "react";
import clsx from "clsx";

interface TimeSlotListProps {
  timeSlots: {
    id: number;
    name: string;
    status: boolean;
  }[];
  selectedTimeSlot: number | null;
  onSelectTimeSlot: (timeSlotId: number) => void;
}

const TimeSlotList: React.FC<TimeSlotListProps> = ({
  timeSlots,
  selectedTimeSlot,
  onSelectTimeSlot,
}) => {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {timeSlots.map((slot) => (
        <button
          key={slot.id}
          onClick={() => onSelectTimeSlot(slot.id)}
          className={clsx(
            "px-4 py-2 rounded-lg hover:bg-orange-600",
            selectedTimeSlot === slot.id
              ? "bg-yellow-500 text-white"
              : slot.status
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-gray-400 cursor-not-allowed text-gray-700"
          )}
          disabled={!slot.status}
        >
          {slot.name}
        </button>
      ))}
    </div>
  );
};

export default TimeSlotList;
