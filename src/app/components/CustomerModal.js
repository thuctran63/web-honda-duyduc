"use client";
import React, { useState } from "react";
import { X } from "lucide-react";

export default function CustomerModal({ open, onClose }) {
  if (!open) return null;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    console.log("Customer data:", form);
    // TODO: Gọi API thêm khách hàng
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-3">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative p-5 animate-in fade-in duration-150">
        {/* Header */}
        <div className="flex justify-between items-center mb-3 border-b pb-2">
          <h2 className="text-lg font-semibold text-gray-800">
            ➕ Thêm khách hàng mới
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-3 mb-4">
          <h3 className="font-medium text-gray-700">Thông tin khách hàng</h3>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Tên khách hàng *"
            className="w-full border rounded-lg px-3 py-2 text-sm"
            required
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Số điện thoại *"
            className="w-full border rounded-lg px-3 py-2 text-sm"
            required
          />
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Địa chỉ *"
            className="w-full border rounded-lg px-3 py-2 text-sm"
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-300 transition"
          >
            Huỷ
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
          >
            Tạo
          </button>
        </div>
      </div>
    </div>
  );
}