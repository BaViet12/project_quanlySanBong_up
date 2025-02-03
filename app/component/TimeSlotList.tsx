import React from "react";
import clsx from "clsx";

interface TimeSlot {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  price: number;
  status: boolean;
}

interface TimeSlotListProps {
  timeslots: TimeSlot[];
  selectedTimeSlot: TimeSlot | null;
  onSelectTimeSlot: (slot: TimeSlot) => void;
}

const TimeSlotList: React.FC<TimeSlotListProps> = ({
  timeslots,
  selectedTimeSlot,
  onSelectTimeSlot,
}) => {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {timeslots.map((slot) => (
        <button
          key={slot.id}
          onClick={() => onSelectTimeSlot(slot)}
          className={clsx(
            "px-4 py-2 rounded-lg hover:bg-orange-600",
            selectedTimeSlot?.id === slot.id
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
