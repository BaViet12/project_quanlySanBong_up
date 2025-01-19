"use client";
import TablePrice from "@/app/component/TablePrice";
import React, { useState } from "react";

interface Price {
  name: string;
  field_id: number;
  timeslot_id: number;
  price: number;
  status: string;
}

const pricemanagement = () => {
  const initialFormData: Price = {
    name: "",
    field_id: 0,
    timeslot_id: 0,
    price: 0,
    status: "",
  };

  const [formPrice, setFormPrice] = useState<Price>(initialFormData);
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
    setFormPrice((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const url = isEditing ? `/api/price/${editingId}` : "/api/price";
    const method = isEditing ? "PUT" : "POST";
    console.log("Form Data:", formPrice);
    try {
      const respone = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formPrice),
      });
      if (!respone.ok) {
        const errData = await respone.json();
        throw new Error(errData.message);
      }
      const data = await respone.json();

      setSuccess(data.message || "Tạo giá sân thành công");
      setFormPrice(initialFormData);
      setIsEditing(false);
      refreshData();
      const dialog = document.getElementById("my_modal_3") as HTMLDialogElement;
      if (dialog) {
        dialog.showModal();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi tạo giá sân");
      console.error("Lỗi tạo giá sân", err);
    }
  };

  const handleEdit = (price: any) => {
    setFormPrice({
      name: price.name,
      field_id: price.field_id,
      timeslot_id: price.timeslot_id,
      price: price.price,
      status: price.status,
    });
    setIsEditing(true);
    setEditingId(price.id);
    refreshData();
    const dialog = document.getElementById("my_modal_3") as HTMLDialogElement;
    if (dialog) {
      dialog.showModal();
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Bạn muốn xóa giá sân này không ?")) {
      return;
    }
    try {
      const respone = await fetch(`/api/price/${id}`, {
        method: "DELETE",
      });
      if (!respone.ok) {
        throw new Error("Lỗi khi xóa giá sân");
      }
      const data = await respone.json();
      setSuccess(data.message);
      refreshData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi xóa giá sân");
    }
  };

  return (
    <div className="p-2 h-full ml-7" data-theme="light">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold py-3">Quản lý giá sân bóng</h1>
        <button
          className="bg-green-800 p-3 text-white rounded-md hover:bg-cyan-600"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          Thêm giá sân
        </button>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg mb-4">
              {isEditing ? "Cập nhật giá sân" : "Thêm mới giá sân"}
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
                <label className="block text-gray-700">Tên</label>
                <input
                  type="text"
                  name="name"
                  value={formPrice.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Mã sân</label>
                <input
                  type="number"
                  name="field_id"
                  value={formPrice.field_id}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Mã giờ</label>
                <input
                  type="number"
                  name="timeslot_id"
                  value={formPrice.timeslot_id}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Giá</label>
                <input
                  type="number"
                  name="price"
                  value={formPrice.price}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Trạng thái</label>
                <select
                  name="status"
                  value={formPrice.status}
                  onChange={handleChange}
                >
                  <option value="">Chọn trạng thái</option>
                  <option value="TRONG">Trống</option>
                  <option value="DADAT">Đã đặt</option>
                </select>
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
      <div className="mr-36">
        <TablePrice
          onEdit={handleEdit}
          onDelete={handleDelete}
          reloadKey={refreshData}
        />
      </div>
    </div>
  );
};

export default pricemanagement;
