"use client";
import TableTimeSlot from "@/app/component/TableTimeSlot";
import React, { useState } from "react";
import ExportTS from "./component/ExportTS";
import { toast, ToastContainer } from "react-toastify";

interface timeslot {
  name: string;
  start_time: string;
  end_time: string;
  status: string;
}

const timeslotmanagement = () => {
  const initialFormData: timeslot = {
    name: "",
    start_time: "",
    end_time: "",
    status: "",
  };
  const [formTimeSlot, setFormTimeSlot] = useState<timeslot>(initialFormData);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const refreshData = () => {
    setReloadKey((prevKey) => prevKey + 1);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormTimeSlot((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const url = isEditing ? `/api/timeslot/${editingId}` : "/api/timeslot";
    const method = isEditing ? "PUT" : "POST";
    console.log("FORMDATA", formTimeSlot);
    try {
      const respone = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formTimeSlot),
      });
      if (!respone.ok) {
        const errorData = await respone.json();
        throw new Error(errorData.message);
      }
      const data = await respone.json();
      toast.success(`${isEditing ? "Cập nhật" : "Tạo"} khung giờ thành công!`);
      setFormTimeSlot(initialFormData);
      setIsEditing(false);
      refreshData();
      const dialog = document.getElementById("my_modal_3") as HTMLDialogElement;
      if (dialog) {
        dialog.showModal();
      }
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : `Lỗi ${isEditing ? "cập nhật" : "tạo"} khung giờ`
      );
      console.error("Lỗi tạo khung giờ", err);
    }
  };

  const handleEdit = (timeSlot: any) => {
    setFormTimeSlot({
      name: timeSlot.name,
      start_time: timeSlot.startTimeVN,
      end_time: timeSlot.endTimeVN,
      status: timeSlot.status,
    });
    setIsEditing(true);
    setEditingId(timeSlot.id);
    refreshData();
    const dialog = document.getElementById("my_modal_3") as HTMLDialogElement;
    if (dialog) {
      dialog.showModal();
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Bạn muốn xóa khung giờ này không ?")) {
      return;
    }
    try {
      const respone = await fetch(`/api/timeslot/${id}`, {
        method: "DELETE",
      });
      if (!respone.ok) {
        throw new Error("Lỗi khi xóa khung giờ");
      }
      const data = await respone.json();
      toast.success(data.message);
      refreshData();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Lỗi xóa khung giờ");
    }
  };

  return (
    <div className="p-3 w-auto h-full " data-theme="light">
      <div className="flex justify-between items-center w-auto">
        <h1 className="text-2xl font-bold">Quản Lý Khung Giờ</h1>
        <div className="mr-32 flex gap-2">
          <button
            className="btn text-white w-[200px] bg-black border-gray-400"
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            Thêm khung giờ
          </button>
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-lg mb-4">
                {isEditing ? "Cập nhật khung giờ" : "Thêm mới khung giờ"}
              </h3>
              <form method="dialog" onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                    {success}
                  </div>
                )}
                <div className="mb-4">
                  <label className="block text-gray-700">Tên khung giờ</label>
                  <input
                    type="text"
                    name="name"
                    value={formTimeSlot.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Giờ bắt đầu</label>
                  <input
                    type="datetime-local"
                    name="start_time"
                    value={formTimeSlot.start_time}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Giờ kết thúc</label>
                  <input
                    type="datetime-local"
                    name="end_time"
                    value={formTimeSlot.end_time}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 mt-4 text-white bg-green-800 rounded hover:bg-blue-600"
                >
                  {isEditing ? "Cập Nhật" : "Thêm Mới"}
                </button>
              </form>
            </div>
          </dialog>
        </div>
      </div>
      <div className="mr-36 pt-2">
        <ExportTS></ExportTS>
        <TableTimeSlot
          onEdit={handleEdit}
          onDelete={handleDelete}
          reloadKey={refreshData}
        />
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default timeslotmanagement;
