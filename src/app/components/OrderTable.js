import React, { useState } from "react";
import OrderDetailModal from "./OrderDetailModal";
import OrderModal from "./OrderModal";
import { Plus } from "lucide-react";

const mockOrders = [
  {
    nameOrder: "Thay nhớt + rửa xe",
    licensePlates: "43A1-12345",
    kilometer: "15000",
    time: "2025-10-03 10:00",
    sum: "250.000₫",
    debt: "0₫",
    description: "Khách thay nhớt và rửa xe.",
    customer: {
      name: "Nguyễn Văn A",
      phone: "0901234567",
      address: "123 Đường ABC, Quận 1, TP.HCM"
    },
    products: [
      { name: "Nhớt Shell 10W-40", price: "150.000₫" },
      { name: "Rửa xe cao cấp", price: "100.000₫" }
    ]
  },
  {
    nameOrder: "Sửa phanh",
    licensePlates: "43B1-67890",
    kilometer: "32500",
    time: "2025-09-28 15:30",
    sum: "350.000₫",
    debt: "100.000₫",
    description: "Phanh trước hơi cứng, đã thay má phanh.",
    customer: {
      name: "Trần Thị B",
      phone: "0912345678",
      address: "456 Đường XYZ, Quận 2, TP.HCM"
    },
    products: [
      { name: "Má phanh trước (cặp)", price: "200.000₫" },
      { name: "Dầu phanh DOT4", price: "80.000₫" },
      { name: "Công thay phanh", price: "70.000₫" }
    ]
  },
];

export default function OrderTable({ customer }) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div>

      {/* Mobile card list */}
      <div className="md:hidden flex flex-col gap-1.5">
        {mockOrders.map((o, i) => (
          <div
            key={i}
            className="p-2.5 border rounded-lg shadow-sm bg-white active:bg-gray-100 cursor-pointer transition-colors hover:bg-gray-50"
            onClick={() => handleOrderClick(o)}
          >
            <div className="flex justify-between items-start mb-1">
              <p className="font-semibold text-sm">{o.nameOrder}</p>
              <p className="text-xs text-gray-500">{o.time}</p>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600">{o.licensePlates}</span>
              <span>
                <b className="text-green-600">{o.sum}</b>
                {o.debt !== "0₫" && <span className="text-red-600 ml-2">Nợ: {o.debt}</span>}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <table className="hidden md:table w-full border text-xs">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-2 py-1.5 border text-left font-medium text-gray-700">Tên đơn hàng</th>
            <th className="px-2 py-1.5 border text-left font-medium text-gray-700">Biển số xe</th>
            <th className="px-2 py-1.5 border text-left font-medium text-gray-700">Thời gian</th>
            <th className="px-2 py-1.5 border text-right font-medium text-gray-700">Tổng đơn hàng</th>
            <th className="px-2 py-1.5 border text-right font-medium text-gray-700">Số tiền nợ</th>
          </tr>
        </thead>
        <tbody>
          {mockOrders.map((o, i) => (
            <tr 
              key={i}
              className="cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => handleOrderClick(o)}
            >
              <td className="px-2 py-1.5 border text-gray-900">{o.nameOrder}</td>
              <td className="px-2 py-1.5 border text-gray-900">{o.licensePlates}</td>
              <td className="px-2 py-1.5 border text-gray-600">{o.time}</td>
              <td className="px-2 py-1.5 border text-right text-green-600 font-medium">{o.sum}</td>
              <td className="px-2 py-1.5 border text-right">
                <span className={o.debt !== "0₫" ? "text-red-600 font-medium" : "text-gray-500"}>
                  {o.debt}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal chi tiết đơn hàng */}
      <OrderDetailModal 
        open={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        orderData={selectedOrder}
      />

    </div>
  );
}