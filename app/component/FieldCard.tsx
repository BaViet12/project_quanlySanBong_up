import React from "react";
import clsx from "clsx";

interface FieldCardProps {
  field: {
    id: number;
    name: string;
    fieldType: string;
    status: string;
    image: string;
  };
  onClick: () => void;
}

const FieldCard: React.FC<FieldCardProps> = ({ field, onClick }) => {
  return (
    <div
      className="flex gap-10 p-10 flex-wrap hover:border-2 w-[1200px]"
      onClick={onClick}
    >
      <img
        src={field.image}
        alt={field.name}
        className="w-[600px] h-[400px] rounded-lg"
      />
      <div className="flex flex-col gap-3">
        <h1 className="font-semibold text-6xl">{field.name}</h1>
        <p className="font-semi text-lg">Sân bóng đá {field.fieldType} người</p>
        <p
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
        </p>
      </div>
    </div>
  );
};

export default FieldCard;
