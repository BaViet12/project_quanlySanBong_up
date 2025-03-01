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
    <div className=" w-full  h-auto px-[20px]">
      <h1 className="text-5xl mb-10 font-mono ">Danh sách sân bóng</h1>
      <div className="flex gap-10 pb-10 justify-start flex-wrap pt-10 w-full">
        {fields.map((field) => (
          <div
            key={field.id}
            className="flex gap-10 p-10 w-full rounded-2xl hover:bg-gray-300"
            onClick={() => onSelectField(field)}
          >
            <div>
              <img
                src={field.image}
                alt={field.name}
                className="w-[750px] h-[450px] rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-3 justify-center ml-14">
              <h1 className="font-mono text-6xl">{field.name}</h1>
              <p className="font-mono text-xl text-gray-500">
                Sân bóng đá {field.fieldType} người
              </p>
              <p
                className={clsx(
                  "font-mono text-xl ",
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
