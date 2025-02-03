import React from "react";
import clsx from "clsx";

interface Field {
  id: number;
  name: string;
  fieldType: string;
  status: string;
  image: string;
  description: string;
  timeslots: TimeSlot[];
}

interface TimeSlot {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  price: number;
  status: boolean;
}

interface FieldListProps {
  fields: Field[];
  onSelectField: (field: Field) => void;
}

const FieldList: React.FC<FieldListProps> = ({ fields, onSelectField }) => {
  return (
    <div className="w-[1200px] h-auto px-[100px]">
      <h1 className="text-5xl mb-10 font-Karla">Danh sách sân bóng</h1>
      <div className="flex gap-20 pb-10 flex-wrap pt-10">
        {fields.map((field) => (
          <div
            key={field.id}
            className="flex gap-10 p-10 flex-wrap hover:border-2 w-[1200px]"
            onClick={() => onSelectField(field)}
          >
            <div>
              <img
                src={field.image}
                alt={field.name}
                className="w-[600px] h-[400px] rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="font-Karla text-6xl">{field.name}</h1>
              <p className="font-Karla text-lg">
                Sân bóng đá {field.fieldType} người
              </p>
              <p
                className={clsx(
                  "font-Karla",
                  field.status === "HOATDONG"
                    ? "text-green-500"
                    : "text-red-500"
                )}
              >
                {field.status === "HOATDONG"
                  ? "Hoạt động"
                  : field.status === "BAOTRI"
                  ? "Bảo trì"
                  : field.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FieldList;
