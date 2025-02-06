"use client";
import React, { useEffect, useState } from "react";
import FieldDetails from "./FieldDetails";
import FieldList from "./FieldList";

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

const Fields: React.FC = () => {
  const [fields, setFields] = useState<Field[]>([]);
  const [selectedField, setSelectedField] = useState<Field | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
    null
  );

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await fetch("/api/soccer");
        const data = await response.json();
        setFields(data.fields);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };
    fetchFields();
  }, []);

  return (
    <div className="w-auto h-auto p-4 mx-auto">
      {selectedField ? (
        <FieldDetails
          field={selectedField}
          selectedTimeSlot={selectedTimeSlot}
          onSelectTimeSlot={setSelectedTimeSlot}
          onBack={() => setSelectedField(null)}
        />
      ) : (
        <FieldList fields={fields} onSelectField={setSelectedField} />
      )}
    </div>
  );
};

export default Fields;
