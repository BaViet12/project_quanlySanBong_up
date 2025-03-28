"use client";
import TableFields from "@/app/component/TableFields";
import React, { useEffect, useState } from "react";
import { FileUpLoad } from "@/app/component/FileUpLoad";
import { set } from "date-fns";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import Export from "./component/Export";
import { toast, ToastContainer } from "react-toastify";

interface FormDataField {
  name: string;
  fieldType: string;
  status: string;
  image: string;
  description: string;
}

const fieldmanagement = () => {
  const initialFormData: FormDataField = {
    name: "",
    fieldType: "",
    status: "",
    image: "",
    description: "",
  };
  const [formData, setFormData] = useState<FormDataField>(initialFormData);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  const refreshData = () => {
    setReloadKey((prevKey) => prevKey + 1);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (fields: any) => {
    setFormData({
      name: fields.name,
      fieldType: String(fields.fieldType),
      status: fields.status,
      image: fields.HinhAnh,
      description: fields.description,
    });
    setIsEditing(true);
    setEditingId(fields.id);
    const dialog = document.getElementById("my_modal_3") as HTMLDialogElement;
    if (dialog) {
      dialog.showModal();
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const url = isEditing ? `/api/soccer/${editingId}` : "/api/soccer";
    const method = isEditing ? "PUT" : "POST";
    console.log("FORM DATA", formData);
    try {
      const respone = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          field_type: parseInt(formData.fieldType),
          status: formData.status,
          HinhAnh: imageUrl,
          MoTa: formData.description,
        }),
      });
      if (!respone.ok) {
        const ErrorData = await respone.json();
        throw new Error(
          ErrorData.message ||
            `Lỗi từ ${isEditing ? "cập nhật " : "tạo"} sân bóng`
        );
      }
      const data = await respone.json();
      toast.success(`${isEditing ? "Cập nhật" : "Tạo"} sân thành công!`);
      setFormData(initialFormData);
      setIsEditing(false);
      setImageUrl("");
      // refreshData();

      const dialog = document.getElementById("my_modal_3") as HTMLDialogElement;
      if (dialog) {
        dialog.close();
      }
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : `Lỗi ${isEditing ? "cập nhật" : "tạo"} sân`
      ); // Hiển thị thông báo lỗi
      console.log("Lỗi tạo sân bóng", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Bạn muốn xóa Sân bóng này không ?")) {
      return;
    }
    try {
      const respone = await fetch(`/api/soccer/${id}`, {
        method: "DELETE",
      });
      if (!respone.ok) {
        throw new Error("Lỗi khi xóa sân bóng");
      }
      const data = await respone.json();
      toast.success(data.message);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Lỗi xóa sân bóng");
    }
  };

  return (
    <div className="p-2 w-auto h-full" data-theme="light">
      <div className="flex w-auto justify-between items-center">
        <h1 className="text-2xl font-bold py-3">Quản Lý Sân Bóng</h1>
        <div className="mr-32 flex gap-2">
          <button
            className="btn text-white w-[200px] bg-black border-gray-400"
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            Thêm sân bóng
          </button>

          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-lg mb-4">
                {isEditing ? "Cập Nhật Sản Phẩm" : "Thêm Mới Sản Phẩm"}
              </h3>
              <form method="dialog" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700">Tên sân</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Loại sân</label>
                  <select
                    name="fieldType"
                    value={formData.fieldType}
                    onChange={handleChange}
                  >
                    <option value="">Chọn loại sân</option>
                    <option value="5">Sân 5 người </option>
                    <option value="7">Sân 7 người</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Trạng thái</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="">Chọn trạng thái</option>
                    <option value="HOATDONG">đang hoạt động</option>
                    <option value="BAOTRI">đang bảo trì</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Hình ảnh</label>
                  <FileUpLoad
                    endpoint="imageUploader"
                    onChange={(url) => setImageUrl(url || "")}
                    showUpload={!imageUrl}
                  />
                  {imageUrl && (
                    <div className="mt-2 flex flex-col items-center">
                      <img
                        src={imageUrl}
                        alt="Uploaded"
                        className="max-w-xs max-h-48"
                      />
                      <button
                        type="button"
                        onClick={() => setImageUrl("")}
                        className="mt-2 px-4 py-1 bg-black text-white rounded hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Mô tả</label>
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
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
      <div className="mr-32 w-auto">
        <Export></Export>
        <TableFields
          onEdit={handleEdit}
          onDelete={handleDelete}
          reloadKey={refreshData}
        />
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default fieldmanagement;
