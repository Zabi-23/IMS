import React, { useState } from "react";
import { Product } from "../types";
import Modal from "./Modal";
import Accordion from "./Accordion";

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
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={product.name || ""}
          onChange={onInputChange}
          required
          className="border rounded p-2 mb-2"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={product.description || ""}
          onChange={onInputChange}
          className="border rounded p-2 mb-2"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price || ""}
          onChange={onInputChange}
          required
          min="0"
          className="border rounded p-2 mb-2"
        />
        <input
          type="number"
          name="amountInStock"
          placeholder="Stock"
          value={product.amountInStock || ""}
          onChange={onInputChange}
          required
          min="0"
          className="border rounded p-2 mb-2"
        />
        <input
          type="text"
          name="sku"
          placeholder="SKU"
          value={product.sku || ""}
          onChange={onInputChange}
          className="border rounded p-2 mb-2"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category || ""}
          onChange={onInputChange}
          className="border rounded p-2 mb-2"
        />
        <h3 className="text-lg font-semibold mt-4 text-neutral-100">
          Manufacturer Details
        </h3>
        <input
          type="text"
          name="name"
          placeholder="Manufacturer Name"
          value={product.manufacturer?.name || ""}
          onChange={onManufacturerChange}
          className="border rounded p-2 mb-2"
        />
        <input
          type="text"
          name="country"
          placeholder="Manufacturer Country"
          value={product.manufacturer?.country || ""}
          onChange={onManufacturerChange}
          className="border rounded p-2 mb-2"
        />
        <input
          type="text"
          name="website"
          placeholder="Manufacturer Website"
          value={product.manufacturer?.website || ""}
          onChange={onManufacturerChange}
          className="border rounded p-2 mb-2"
        />
        <input
          type="text"
          name="description"
          placeholder="Manufacturer Description"
          value={product.manufacturer?.description || ""}
          onChange={onManufacturerChange}
          className="border rounded p-2 mb-2"
        />
        <input
          type="text"
          name="address"
          placeholder="Manufacturer Address"
          value={product.manufacturer?.address || ""}
          onChange={onManufacturerChange}
          className="border rounded p-2 mb-2"
        />
        <h4 className="text-md font-semibold mt-4 text-neutral-100">
          Contact Details
        </h4>
        <input
          type="text"
          name="name"
          placeholder="Contact Name"
          value={product.manufacturer?.contact?.name || ""}
          onChange={onContactChange}
          className="border rounded p-2 mb-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Contact Email"
          value={product.manufacturer?.contact?.email || ""}
          onChange={onContactChange}
          className="border rounded p-2 mb-2"
        />
        <input
          type="text"
          name="phone"
          placeholder="Contact Phone"
          value={product.manufacturer?.contact?.phone || ""}
          onChange={onContactChange}
          className="border rounded p-2 mb-2"
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
