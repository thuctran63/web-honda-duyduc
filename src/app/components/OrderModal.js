"use client";
import React, { useState, useEffect } from "react";
import { X, Plus, Trash2 } from "lucide-react";

export default function OrderModal({ open, onClose, selectedCustomer, editData }) {
  // State cho thông tin khách hàng
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });
  
  const [isCustomerLocked, setIsCustomerLocked] = useState(false);
  
useEffect(() => {
  if (!open) return; // modal đóng thì bỏ qua

  if (selectedCustomer) {
    setCustomer({
      name: selectedCustomer.name || "",
      phone: selectedCustomer.phone || "",
      address: selectedCustomer.address || "",
    });
    setIsCustomerLocked(true);
  } else {
    setCustomer({ name: "", phone: "", address: "" });
    setIsCustomerLocked(false);
  }
}, [selectedCustomer, open]); // ✅ chỉ theo dõi selectedCustomer và open


  // State cho thông tin đơn hàng
  const [order, setOrder] = useState({
    name: "", // Tên đơn hàng
    licensePlate: "", // Biển số xe
    kilometer: "", // Số km xe
    date: new Date().toISOString().split('T')[0], // Ngày mặc định hôm nay
    pay: "", // Số tiền khách trả
  });

  // State cho sản phẩm: Mỗi sản phẩm là object với name và price
  const [products, setProducts] = useState([]);

  // State cho checkbox
  const [isToday, setIsToday] = useState(true);

  // Lock body scroll khi modal mở
  useEffect(() => {
    if (open) {
      // Lưu trạng thái scroll hiện tại
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    }

    return () => {
      // Unlock và khôi phục vị trí scroll khi đóng modal
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    };
  }, [open]);

  // Tính toán
  const totalSum = products.reduce((sum, product) => sum + parseFloat(product.price || 0), 0);
  const changeOrDebt = parseFloat(order.pay || 0) - totalSum;

  // Handlers
  const handleCustomerChange = (e) => setCustomer({ ...customer, [e.target.name]: e.target.value });
  const handleOrderChange = (e) => setOrder({ ...order, [e.target.name]: e.target.value });
  const handleDateChange = (e) => setOrder({ ...order, date: e.target.value });
  const handleIsTodayClick = () => {
    setIsToday(!isToday);
    if (!isToday) setOrder({ ...order, date: new Date().toISOString().split('T')[0] });
  };

  // Thêm sản phẩm mới (row trống)
  const addProduct = () => {
    setProducts([...products, { name: "", price: "" }]);
  };

  // Update sản phẩm trong row cụ thể
  const updateProduct = (index, field, value) => {
    const updatedProducts = products.map((p, i) =>
      i === index ? { ...p, [field]: value } : p
    );
    setProducts(updatedProducts);
  };

  // Xóa sản phẩm
  const deleteProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    if (!customer.name || !customer.phone || !customer.address) {
      alert("Vui lòng nhập đầy đủ thông tin khách hàng (Tên, Số điện thoại, Địa chỉ).");
      return false;
    }
    if (products.length === 0 || products.every(p => !p.name || !p.price)) {
      alert("Vui lòng thêm ít nhất một sản phẩm hợp lệ vào đơn hàng.");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    console.log("Order data:", { customer, order, products, totalSum });
    // TODO: Gọi API
    onClose();
  };

  const handleClose = () => onClose();

  // Early return sau khi đã gọi hết tất cả hooks
  if (!open) return null;

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
        // Đóng modal khi click vào backdrop
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl overflow-y-auto relative p-3 sm:p-4 md:p-6 animate-in fade-in zoom-in duration-200"
        style={{
          maxHeight: 'calc(90vh - max(1rem, env(safe-area-inset-top)) - max(1rem, env(safe-area-inset-bottom)))'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">
            Thêm đơn hàng mới
          </h2>
          <button 
            onClick={handleClose} 
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X size={18} className="text-gray-600" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Thông tin khách hàng */}
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 sm:p-4 rounded-xl border border-blue-200">
              <h3 className="font-semibold text-sm sm:text-base text-gray-800 mb-3">
                Thông tin khách hàng
              </h3>
              <div className="space-y-2.5">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Tên khách hàng <span className="text-red-500">*</span></label>
                  <input 
                    name="name" 
                    value={customer.name} 
                    onChange={handleCustomerChange} 
                    placeholder="Nhập tên khách hàng" 
                    className="w-full border border-gray-300 rounded-lg px-2.5 py-1.5 text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all" 
                    required 
					disabled={isCustomerLocked}
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Số điện thoại <span className="text-red-500">*</span></label>
                  <input 
                    name="phone" 
                    value={customer.phone} 
                    onChange={handleCustomerChange} 
                    placeholder="Nhập số điện thoại" 
                    className="w-full border border-gray-300 rounded-lg px-2.5 py-1.5 text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all" 
                    required 
					disabled={isCustomerLocked}
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Địa chỉ <span className="text-red-500">*</span></label>
                  <input 
                    name="address" 
                    value={customer.address} 
                    onChange={handleCustomerChange} 
                    placeholder="Nhập địa chỉ đầy đủ" 
                    className="w-full border border-gray-300 rounded-lg px-2.5 py-1.5 text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all" 
                    required 
					disabled={isCustomerLocked}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Thông tin đơn hàng */}
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-3 sm:p-4 rounded-xl border border-indigo-200">
              <h3 className="font-semibold text-sm sm:text-base text-gray-800 mb-3">
                Thông tin đơn hàng
              </h3>

              {/* Tên đơn hàng */}
              <div className="mb-2.5">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Tên đơn hàng</label>
                <textarea 
                  name="name" 
                  value={order.name} 
                  onChange={handleOrderChange} 
                  placeholder="Nhập tên đơn hàng (tùy chọn)" 
                  className="w-full border border-gray-300 rounded-lg px-2.5 py-1.5 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all resize-none h-16" 
                  rows={3}
                />
              </div>

              {/* Biển số xe và Số km */}
              <div className="grid grid-cols-2 gap-2 mb-2.5">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Biển số xe</label>
                  <input 
                    name="licensePlate" 
                    value={order.licensePlate} 
                    onChange={handleOrderChange} 
                    placeholder="43A1-12345" 
                    className="w-full border border-gray-300 rounded-lg px-2.5 py-1.5 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Số km</label>
                  <input 
                    name="kilometer" 
                    type="number" 
                    value={order.kilometer} 
                    onChange={handleOrderChange} 
                    placeholder="12345" 
                    className="w-full border border-gray-300 rounded-lg px-2.5 py-1.5 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all" 
                  />
                </div>
              </div>

              {/* Ngày đơn hàng */}
              <div className="mb-3 p-2.5 bg-white rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 mb-1.5">
                  <input 
                    type="checkbox" 
                    checked={isToday} 
                    onChange={handleIsTodayClick} 
                    className="w-3.5 h-3.5 text-indigo-600 rounded focus:ring-indigo-500" 
                    id="today-checkbox"
                  />
                  <label htmlFor="today-checkbox" className="text-xs sm:text-sm font-medium text-gray-700 cursor-pointer select-none">
                    Ngày hôm nay
                  </label>
                </div>
                <input 
                  type="date" 
                  value={order.date} 
                  onChange={handleDateChange} 
                  disabled={isToday} 
                  className="w-full border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs sm:text-sm focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all disabled:bg-gray-100 disabled:text-gray-500" 
                />
              </div>

              {/* Sản phẩm trong đơn hàng */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-medium text-xs sm:text-sm text-gray-800">
                    Sản phẩm {products.length > 0 && `(${products.length})`}
                  </h4>
                  <button 
                    onClick={addProduct} 
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all active:scale-95 text-xs sm:text-sm font-medium"
                  >
                    <Plus size={14} />
                    Thêm
                  </button>
                </div>

                {/* Mobile: Card layout, Desktop: Table */}
                {products.length > 0 ? (
                  <>
                    {/* Mobile Card View */}
                    <div className="block sm:hidden space-y-2">
                      {products.map((product, index) => (
                        <div key={index} className="bg-white rounded-lg border border-gray-200 p-2">
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <span className="text-xs font-semibold text-gray-500 shrink-0">#{index + 1}</span>
                            <button 
                              onClick={() => deleteProduct(index)} 
                              className="p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-all shrink-0"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <input 
                              value={product.name} 
                              onChange={(e) => updateProduct(index, 'name', e.target.value)} 
                              placeholder="Tên phụ tùng" 
                              className="flex-1 border border-gray-300 rounded-md px-2 py-1.5 text-xs focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all" 
                            />
                            <input 
                              type="number" 
                              value={product.price} 
                              onChange={(e) => updateProduct(index, 'price', e.target.value)} 
                              placeholder="Giá" 
                              className="w-24 border border-gray-300 rounded-md px-2 py-1.5 text-xs focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all" 
                            />
                          </div>
                        </div>
                      ))}
                      <div className="bg-green-50 rounded-lg border border-green-200 p-2.5 flex justify-between items-center">
                        <span className="text-xs font-semibold text-gray-700">Tổng cộng:</span>
                        <span className="text-sm font-bold text-green-600">{totalSum.toLocaleString()} VND</span>
                      </div>
                    </div>

                    {/* Desktop Table View */}
                    <div className="hidden sm:block overflow-x-auto">
                      <table className="w-full bg-white rounded-lg border border-gray-200 text-xs">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-2 py-1.5 text-left font-medium text-gray-700 w-[8%]">STT</th>
                            <th className="px-2 py-1.5 text-left font-medium text-gray-700 w-[50%]">Tên phụ tùng</th>
                            <th className="px-2 py-1.5 text-left font-medium text-gray-700 w-[30%]">Giá (VND)</th>
                            <th className="px-2 py-1.5 text-center font-medium text-gray-700 w-[12%]">Xóa</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {products.map((product, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-2 py-1.5 font-medium text-gray-900">{index + 1}</td>
                              <td className="px-2 py-1.5">
                                <input 
                                  value={product.name} 
                                  onChange={(e) => updateProduct(index, 'name', e.target.value)} 
                                  placeholder="Tên phụ tùng" 
                                  className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-green-400 focus:border-transparent transition-all" 
                                />
                              </td>
                              <td className="px-2 py-1.5">
                                <input 
                                  type="number" 
                                  value={product.price} 
                                  onChange={(e) => updateProduct(index, 'price', e.target.value)} 
                                  placeholder="Giá" 
                                  className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-green-400 focus:border-transparent transition-all" 
                                />
                              </td>
                              <td className="px-2 py-1.5 text-center">
                                <button 
                                  onClick={() => deleteProduct(index)} 
                                  className="p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-all active:scale-95 mx-auto"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </td>
                            </tr>
                          ))}
                          <tr className="bg-green-50 font-semibold border-t-2">
                            <td className="px-2 py-1.5 text-gray-700">Tổng:</td>
                            <td className="px-2 py-1.5"></td>
                            <td className="px-2 py-1.5 text-green-600">{totalSum.toLocaleString()}</td>
                            <td className="px-2 py-1.5"></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-6 text-gray-400 text-xs sm:text-sm bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    Chưa có sản phẩm. Nhấn "Thêm" để bắt đầu.
                  </div>
                )}

              </div>

              {/* Số tiền khách trả */}
              <div className="mb-2.5">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Số tiền khách trả</label>
                <input 
                  name="pay" 
                  type="number" 
                  value={order.pay} 
                  onChange={handleOrderChange} 
                  placeholder="Nhập số tiền khách trả" 
                  className="w-full border border-gray-300 rounded-lg px-2.5 py-1.5 text-sm focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all" 
                />
              </div>

              {/* Tiền thừa */}
              {totalSum > 0 && (
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-2.5 rounded-lg border border-purple-200">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-gray-700">Tiền thừa:</span>
                    <span className={changeOrDebt > 0 ? "text-green-600" : "text-red-600"}>
                      {changeOrDebt > 0 ? `+${changeOrDebt.toLocaleString()}` : changeOrDebt.toLocaleString()} VND
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 sm:gap-3 mt-4 sm:mt-6 pt-4 border-t border-gray-200">
          <button 
            onClick={handleClose} 
            className="flex-1 px-4 py-2 sm:py-2.5 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-all text-sm sm:text-base"
          >
            Huỷ
          </button>
          <button 
            onClick={handleSubmit} 
            className="flex-1 px-4 py-2 sm:py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:from-blue-700 hover:to-indigo-700 transition-all text-sm sm:text-base"
          >
            Tạo đơn hàng
          </button>
        </div>
      </div>
    </div>
  );
}