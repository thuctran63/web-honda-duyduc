"use client";
import React, { useState } from "react";
import CustomerTable from "./components/CustomerTable";
import OrderTable from "./components/OrderTable";
import { Search, Plus, ArrowLeft } from "lucide-react";
import CustomerModal from "./components/CustomerModal";
import OrderModal from "./components/OrderModal";

export default function Page() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchType, setSearchType] = useState("");
  const [search, setSearch] = useState("");
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
   const [isAddOrderModalOpen, setIsAddOrderModalOpen] = useState(false);

  const handleBack = () => setSelectedCustomer(null);

  const handleSearch = () => {
    console.log("Search with type:", searchType, "query:", search);
  };
  
  const handleCloseAddOrderModal = () => {
    setIsAddOrderModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-gray-100 text-sm pb-20">
      {/* --- Search Panel --- */}
      <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-md border border-gray-200 p-3 mx-2 mt-2">
        <h2 className="text-base font-semibold text-gray-800 mb-2 flex items-center gap-1.5">
          <Search size={16} className="text-blue-600" />
          Tìm kiếm khách hàng
        </h2>

        <div className="flex flex-col sm:flex-row gap-2">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="border border-gray-300 rounded-lg px-2.5 py-1.5 w-full sm:w-40 text-xs focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
          >
            <option value="">Tiêu chí tìm kiếm</option>
            <option value="name">Tên khách hàng</option>
            <option value="phone">Số điện thoại</option>
            <option value="address">Địa chỉ</option>
          </select>

          <div className="flex items-center border border-gray-300 rounded-lg flex-1 focus-within:ring-2 focus-within:ring-blue-400 transition-all overflow-hidden">
            <input
              type="text"
              placeholder="Nhập nội dung tìm kiếm..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-2.5 py-1.5 text-xs bg-transparent outline-none"
            />
            <button 
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 flex items-center gap-1 text-xs font-medium transition-all"
            >
              <Search size={14} />
              Tìm
            </button>
          </div>
        </div>
      </div>

      {/* --- Main Content --- */}
      <div className="flex-1 overflow-y-auto mt-3 px-2">
        <div className="grid md:grid-cols-2 gap-3">
          {/* Customer list */}
          <div
            className={`${
              selectedCustomer ? "hidden md:block" : "block"
            } bg-white rounded-xl shadow-sm border border-gray-200 p-3 transition-all`}
          >
            <h3 className="font-semibold text-gray-800 mb-2 text-sm">Danh sách khách hàng</h3>
            <CustomerTable onSelect={setSelectedCustomer} searchType={searchType} search={search} />
          </div>

          {/* Order details */}
          <div
            className={`${
              selectedCustomer ? "block" : "hidden md:block"
            } bg-white rounded-xl shadow-sm border border-gray-200 p-3 transition-all`}
          >
            {selectedCustomer ? (
              <>
                {/* Back button for mobile */}
				<button
                  onClick={handleBack}
                  className="md:hidden flex items-center gap-1 text-blue-600 mb-2 text-xs font-medium hover:text-blue-800 transition-all"
                >
                  <ArrowLeft size={14} />
                  Quay lại danh sách
                </button>
                <div className="mb-3 p-2.5 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-xs mb-1">
                    <span className="text-gray-600">Tên:</span>{" "}
                    <span className="font-semibold text-gray-900">{selectedCustomer.name}</span>
                  </p>
                  <p className="text-xs">
                    <span className="text-gray-600">SĐT:</span>{" "}
                    <span className="font-semibold text-gray-900">{selectedCustomer.phone}</span>
                  </p>
                </div>
				
				<div className="flex justify-between items-center mb-3">
				  <h3 className="text-sm font-semibold text-gray-700 tracking-wide">
					📦 Danh sách đơn hàng
				  </h3>

				  <button
					onClick={() => setIsAddOrderModalOpen(true)}
					className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 
							   text-white rounded-lg shadow-sm hover:from-blue-600 hover:to-indigo-600 
							   transition-all text-xs font-medium active:scale-95"
				  >
					<Plus size={14} strokeWidth={2.5} />
					<span>Thêm đơn hàng</span>
				  </button>
				</div>

                
                <OrderTable customer={selectedCustomer} />
              </>
            ) : (
              <p className="text-gray-400 text-center py-8 text-xs">
                Chọn khách hàng để xem chi tiết đơn hàng
              </p>
            )}
          </div>
        </div>
      </div>

      {/* --- Floating Action Buttons (FAB) --- */}
      {!selectedCustomer && (
        <div className="fixed bottom-3 left-0 right-0 flex justify-center gap-3 px-3 z-50">
          <button 
            onClick={() => setShowCustomerModal(true)} 
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2.5 rounded-full flex items-center gap-1.5 text-xs font-medium shadow-lg hover:shadow-xl active:scale-95 transition-all"
          >
            <Plus size={16} strokeWidth={2.5} />
            <span className="hidden sm:inline">Thêm khách hàng</span>
            <span className="sm:hidden">Khách hàng</span>
          </button>
          <button 
            onClick={() => setShowOrderModal(true)} 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2.5 rounded-full flex items-center gap-1.5 text-xs font-medium shadow-lg hover:shadow-xl active:scale-95 transition-all"
          >
            <Plus size={16} strokeWidth={2.5} />
            <span className="hidden sm:inline">Thêm đơn hàng</span>
            <span className="sm:hidden">Đơn hàng</span>
          </button>
        </div>
      )}

      {/* --- Modals --- */}
      <CustomerModal open={showCustomerModal} onClose={() => setShowCustomerModal(false)} />
	  {/* Modal thêm đơn hàng mới cho user chưa tồn tại */}
      <OrderModal open={showOrderModal} onClose={() => setShowOrderModal(false)} />
	  {/* Modal thêm đơn hàng mới cho user đã tồn tại */}
      <OrderModal open={isAddOrderModalOpen} onClose={handleCloseAddOrderModal} selectedCustomer={selectedCustomer} />
    </div>
  );
}