import React from "react";
import TimeSlotList from "./TimeSlotList";
import BookingModal from "./BookingModal";

interface FieldDetailsProps {
  field: {
    id: number;
    name: string;
    fieldType: string;
    status: string;
    image: string;
    description: string;
    timeslots: { id: number; name: string; status: boolean }[];
  };
  selectedTimeSlot: number | null;
  onSelectTimeSlot: (timeSlotId: number) => void;
  onBack: () => void;
}

const FieldDetails: React.FC<FieldDetailsProps> = ({
  field,
  selectedTimeSlot,
  onSelectTimeSlot,
  onBack,
}) => {
  const [showModal, setShowModal] = React.useState(false);

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
            <strong>Mô tả:</strong> {field.description}
          </p>
        </div>
      </div>

      {/* Time Slot List */}
      <div className="mt-6 px-[200px]">
        <TimeSlotList
          timeSlots={field.timeslots}
          selectedTimeSlot={selectedTimeSlot}
          onSelectTimeSlot={onSelectTimeSlot}
        />
        <button
          className="mt-6 whitespace-nowrap ml-[900px] px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          onClick={onBack}
        >
          Quay lại
        </button>
      </div>

      {/* Booking Modal */}
      <BookingModal show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default FieldDetails;
