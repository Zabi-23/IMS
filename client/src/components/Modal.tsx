import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalStockValue: number | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, totalStockValue }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Total Stock Value
        </h2>
        <div className="mb-6">
          {totalStockValue !== null ? (
            <p className="text-xl text-gray-700">
              Total stock value:{" "}
              <span className="font-bold text-green-600 underline">
                ${totalStockValue.toFixed(2)}
              </span>
            </p>
          ) : (
            <p className="text-xl text-gray-600">
              No total stock value available
            </p>
          )}
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-500 transition-colors duration-300"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
