import React from "react";
import Product from "../types";

interface ProductFormProps {
  product: Product;
  isEditing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onManufacturerChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onContactChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  resetForm: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  isEditing,
  onInputChange,
  onManufacturerChange,
  onContactChange,
  onSubmit,
  resetForm,
}) => {
  return (
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
        /* required */
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
        /* required */
        className="border rounded p-2 mb-2"
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={product.category || ""}
        onChange={onInputChange}
        /* required */
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
        /* required */
        className="border rounded p-2 mb-2"
      />
      <input
        type="text"
        name="country"
        placeholder="Manufacturer Country"
        value={product.manufacturer?.country || ""}
        onChange={onManufacturerChange}
        /* required */
        className="border rounded p-2 mb-2"
      />
      <input
        type="text"
        name="website"
        placeholder="Manufacturer Website"
        value={product.manufacturer?.website || ""}
        onChange={onManufacturerChange}
        /* required */
        className="border rounded p-2 mb-2"
      />
      <input
        type="text"
        name="description"
        placeholder="Manufacturer Description"
        value={product.manufacturer?.description || ""}
        onChange={onManufacturerChange}
        /*  required */
        className="border rounded p-2 mb-2"
      />
      <input
        type="text"
        name="address"
        placeholder="Manufacturer Address"
        value={product.manufacturer?.address || ""}
        onChange={onManufacturerChange}
        /*   required */
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
        /* required */
        className="border rounded p-2 mb-2"
      />
      <input
        type="email"
        name="email"
        placeholder="Contact Email"
        value={product.manufacturer?.contact?.email || ""}
        onChange={onContactChange}
        /* required */
        className="border rounded p-2 mb-2"
      />
      <input
        type="text"
        name="phone"
        placeholder="Contact Phone"
        value={product.manufacturer?.contact?.phone || ""}
        onChange={onContactChange}
        /* required */
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
    </form>
  );
};

export default ProductForm;
