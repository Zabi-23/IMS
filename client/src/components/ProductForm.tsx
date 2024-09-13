import React, { useState } from "react";
import { Product } from "../types";
import Modal from "./Modal";
import Accordion from "./Accordion";
import ProductFormFields from "./ProductFormFields";

interface ProductFormProps {
  product: Product;
  isEditing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onManufacturerChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onContactChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  resetForm: () => void;
  onDeleteAll: () => void;
  onFetchLowStock: () => void;
  onFetchCriticalStock: () => void;
  onFetchTotalStock: () => void;
  totalStockValue: number | null;
  onFetchManufacturers: () => void;
  onFetchStockValueByManufacturer: () => void;
  onShowAllProducts: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  isEditing,
  onInputChange,
  onManufacturerChange,
  onContactChange,
  onSubmit,
  resetForm,
  onDeleteAll,
  onFetchLowStock,
  onFetchCriticalStock,
  onFetchTotalStock,
  totalStockValue,
  onFetchManufacturers,
  onFetchStockValueByManufacturer,
  onShowAllProducts,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    onFetchTotalStock();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <form
        className="mb-4 space-x-1"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <h2 className="text-xl font-bold mb-2 text-neutral-100">
          {isEditing ? "Update Product" : "Create Product"}
        </h2>
        
        <ProductFormFields
          product={product}
          onInputChange={onInputChange}
          onManufacturerChange={onManufacturerChange}
          onContactChange={onContactChange}
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-400"
        >
          {isEditing ? "Update Product" : "Create Product"}
        </button>
        <button
          type="button"
          onClick={resetForm}
          className="bg-neutral-500 text-white p-2 rounded ml-2 hover:bg-neutral-400"
        >
          Reset Form
        </button>
        
        <Accordion
          onDeleteAll={onDeleteAll}
          onFetchLowStock={onFetchLowStock}
          onFetchCriticalStock={onFetchCriticalStock}
          onFetchTotalStock={onFetchTotalStock}
          onOpenModal={handleOpenModal}
          onFetchManufacturers={onFetchManufacturers}
          onFetchStockValueByManufacturer={onFetchStockValueByManufacturer}
          onShowAllProducts={onShowAllProducts}
        />
      </form>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        totalStockValue={totalStockValue}
      />
    </>
  );
};

export default ProductForm;
