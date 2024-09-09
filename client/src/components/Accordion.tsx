import React, { useState } from "react";

interface AccordionProps {
  onDeleteAll: () => void;
  onFetchLowStock: () => void;
  onFetchCriticalStock: () => void;
  onFetchTotalStock: () => void;
  onOpenModal: () => void;
  onFetchManufacturers: () => void;
}

const Accordion: React.FC<AccordionProps> = ({
  onDeleteAll,
  onFetchLowStock,
  onFetchCriticalStock,
  onOpenModal,
  onFetchManufacturers,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showManufacturers, setShowManufacturers] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleShowManufacturersToggle = () => {
    setShowManufacturers(!showManufacturers);
    onFetchManufacturers();
  };

  return (
    <div className="my-4">
      <button
        type="button"
        className="bg-gray-200 text-gray-600 p-2 rounded hover:bg-gray-300 w-52 text-left flex items-center justify-between"
        onClick={handleToggle}
      >
        More Actions
        <span className="ml-2">{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <div className="mt-2 space-y-2 w-52">
          <button
            type="button"
            className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-400 w-full"
            onClick={onFetchLowStock}
          >
            Show Low Stock Products
          </button>
          <button
            type="button"
            className="bg-yellow-600 text-white p-2 rounded hover:bg-yellow-500 w-full"
            onClick={onFetchCriticalStock}
          >
            Show Critical Stock Products
          </button>
          <button
            type="button"
            className="bg-yellow-600 text-white p-2 rounded hover:bg-yellow-500 w-full"
            onClick={onOpenModal}
          >
            Show Total Stock Value
          </button>
          <button
            type="button"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 w-full"
            onClick={handleShowManufacturersToggle}
          >
            {showManufacturers ? "Hide Manufacturers" : "Show Manufacturers"}
          </button>
          <button
            type="button"
            className="bg-red-500 text-white p-2 rounded hover:bg-red-700 w-full"
            onClick={onDeleteAll}
          >
            Delete All Products
          </button>
        </div>
      )}
    </div>
  );
};

export default Accordion;
