import React from "react";

const mockCustomers = [
  {
    name: "Nguyễn Văn A",
    phone: "0901234567",
    address: "Đà nẵng",
    debt: "500.000₫",
  },
  {
    name: "Trần Thị B",
    phone: "0987654321",
    address: "Quảng Nam",
    debt: "0₫",
  },
];

export default function CustomerTable({ onSelect }) {
  return (
    <div>
      {/* Mobile Card List */}
      <div className="md:hidden flex flex-col gap-1.5">
        {mockCustomers.map((c, i) => (
          <div
            key={i}
            onClick={() => onSelect(c)}
            className="p-2.5 border rounded-lg shadow-sm bg-white active:bg-gray-100 cursor-pointer transition-colors hover:bg-gray-50"
          >
            <div className="flex justify-between items-start mb-1">
              <p className="font-semibold text-sm">{c.name}</p>
              {c.debt !== "0₫" && (
                <p className="text-xs text-red-600 font-medium">Nợ: {c.debt}</p>
              )}
            </div>
            <div className="flex justify-between items-center text-xs text-gray-600">
              <span>{c.phone}</span>
              <span className="text-right">{c.address}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <table className="hidden md:table w-full border text-xs">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-2 py-1.5 border text-left font-medium text-gray-700">Tên khách hàng</th>
            <th className="px-2 py-1.5 border text-left font-medium text-gray-700">Số điện thoại</th>
            <th className="px-2 py-1.5 border text-left font-medium text-gray-700">Địa chỉ</th>
            <th className="px-2 py-1.5 border text-right font-medium text-gray-700">Số tiền nợ</th>
          </tr>
        </thead>
        <tbody>
          {mockCustomers.map((c, i) => (
            <tr
              key={i}
              className="hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => onSelect(c)}
            >
              <td className="px-2 py-1.5 border text-gray-900">{c.name}</td>
              <td className="px-2 py-1.5 border text-gray-900">{c.phone}</td>
              <td className="px-2 py-1.5 border text-gray-600 text-xs">
                {c.address}
              </td>
              <td className="px-2 py-1.5 border text-right">
                <span className={c.debt !== "0₫" ? "text-red-600 font-medium" : "text-gray-500"}>
                  {c.debt}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}