"use client";
import React, { useEffect } from "react";
import { X } from "lucide-react";

export default function OrderDetailModal({ open, onClose, orderData }) {
  // Lock body scroll khi modal mở
  useEffect(() => {
    if (open) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    }

    return () => {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    };
  }, [open]);

  // Early return sau khi đã gọi hết tất cả hooks
  if (!open || !orderData) return null;

  const handleClose = () => onClose();

  // Parse data - giả sử orderData có cấu trúc tương tự mockOrders
  const {
    nameOrder = "",
    licensePlates = "",
    kilometer = "",
    time = "",
    sum = "",
    debt = "",
    customer = {},
    products = []
  } = orderData;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2 sm:p-4"
      style={{
        paddingTop: 'max(0.5rem, env(safe-area-inset-top))',
        paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))',
        paddingLeft: 'max(0.5rem, env(safe-area-inset-left))',
        paddingRight: 'max(0.5rem, env(safe-area-inset-right))',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-y-auto relative p-3 sm:p-4 md:p-6 animate-in fade-in zoom-in duration-200"
        style={{
          maxHeight: 'calc(90vh - max(1rem, env(safe-area-inset-top)) - max(1rem, env(safe-area-inset-bottom)))'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">
            Chi tiết đơn hàng
          </h2>
          <button 
            onClick={handleClose} 
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X size={18} className="text-gray-600" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Thông tin khách hàng */}
          {customer.name && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 sm:p-4 rounded-xl border border-blue-200">
              <h3 className="font-semibold text-sm sm:text-base text-gray-800 mb-3">
                Thông tin khách hàng
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-600">Tên khách hàng:</span>
                  <span className="font-medium text-gray-900">{customer.name}</span>
                </div>
                {customer.phone && (
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-600">Số điện thoại:</span>
                    <span className="font-medium text-gray-900">{customer.phone}</span>
                  </div>
                )}
                {customer.address && (
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-600">Địa chỉ:</span>
                    <span className="font-medium text-gray-900">{customer.address}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Thông tin đơn hàng */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-3 sm:p-4 rounded-xl border border-indigo-200">
            <h3 className="font-semibold text-sm sm:text-base text-gray-800 mb-3">
              Thông tin đơn hàng
            </h3>
            <div className="space-y-2">
              {nameOrder && (
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-600">Tên đơn hàng:</span>
                  <span className="font-medium text-gray-900 text-right">{nameOrder}</span>
                </div>
              )}
              {(licensePlates || kilometer) && (
                <div className="grid grid-cols-2 gap-3">
                  {licensePlates && (
                    <div className="text-xs sm:text-sm">
                      <span className="text-gray-600 block mb-1">Biển số xe:</span>
                      <span className="font-medium text-gray-900">{licensePlates}</span>
                    </div>
                  )}
                  {kilometer && (
                    <div className="text-xs sm:text-sm">
                      <span className="text-gray-600 block mb-1">Số km:</span>
                      <span className="font-medium text-gray-900">{kilometer} km</span>
                    </div>
                  )}
                </div>
              )}
              {time && (
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-600">Thời gian:</span>
                  <span className="font-medium text-gray-900">{time}</span>
                </div>
              )}
            </div>
          </div>

          {/* Danh sách sản phẩm/dịch vụ */}
          {products && products.length > 0 && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 sm:p-4 rounded-xl border border-green-200">
              <h3 className="font-semibold text-sm sm:text-base text-gray-800 mb-3">
                Sản phẩm/Dịch vụ đã sử dụng
              </h3>

              {/* Mobile: Card layout */}
              <div className="block sm:hidden space-y-2">
                {products.map((product, index) => (
                  <div key={index} className="bg-white rounded-lg border border-gray-200 p-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-gray-500 shrink-0">#{index + 1}</span>
                      <div className="flex-1 flex items-center justify-between gap-2">
                        <p className="text-xs font-medium text-gray-900 flex-1">{product.name}</p>
                        <p className="text-xs text-green-600 font-semibold shrink-0">{product.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop: Table */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full bg-white rounded-lg border border-gray-200 text-xs">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-2 py-1.5 text-left font-medium text-gray-700 w-[10%]">STT</th>
                      <th className="px-2 py-1.5 text-left font-medium text-gray-700 w-[60%]">Tên phụ tùng/Dịch vụ</th>
                      <th className="px-2 py-1.5 text-right font-medium text-gray-700 w-[30%]">Giá (VND)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {products.map((product, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-2 py-1.5 font-medium text-gray-900">{index + 1}</td>
                        <td className="px-2 py-1.5 text-gray-900">{product.name}</td>
                        <td className="px-2 py-1.5 text-right text-green-600 font-medium">{product.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tổng kết thanh toán */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 sm:p-4 rounded-xl border border-purple-200">
            <h3 className="font-semibold text-sm sm:text-base text-gray-800 mb-3">
              Thông tin thanh toán
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-600">Tổng đơn hàng:</span>
                <span className="font-bold text-lg text-green-600">{sum}</span>
              </div>
              {debt && debt !== "0₫" && (
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-600">Số tiền nợ:</span>
                  <span className="font-bold text-lg text-red-600">{debt}</span>
                </div>
              )}
              {debt === "0₫" && (
                <div className="text-center py-2 bg-green-100 rounded-lg">
                  <span className="text-sm font-semibold text-green-700">✓ Đã thanh toán đầy đủ</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Button hành động */}
<div className="flex justify-end gap-3 mt-4 sm:mt-6 pt-4 border-t border-gray-200">
  <button
    onClick={() => {
      // TODO: Bật chế độ chỉnh sửa hoặc mở modal edit
      console.log("Chỉnh sửa đơn hàng:", orderData);
    }}
    className="px-6 py-2 sm:py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all text-sm sm:text-base"
  >
    Cập nhật đơn hàng
  </button>

  <button
    onClick={() => {
      if (confirm("Bạn có chắc chắn muốn xóa đơn hàng này không?")) {
        // TODO: Gọi API hoặc callback xóa đơn hàng ở đây
        console.log("Đã xác nhận xóa đơn hàng:", orderData);
      }
    }}
    className="px-6 py-2 sm:py-2.5 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-all text-sm sm:text-base"
  >
    Xóa
  </button>

  <button
    onClick={handleClose}
    className="px-6 py-2 sm:py-2.5 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-all text-sm sm:text-base"
  >
    Đóng
  </button>
</div>


      </div>
    </div>
  );
}