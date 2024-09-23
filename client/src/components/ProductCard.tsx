import React from "react";
import { Product } from "../types";
import ManufacturerCard from "./ManufacturerCard";

interface ProductCardProps {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
  showOnlyManufacturer?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
  showOnlyManufacturer = false,
}) => {
  // Lägger till en konditionell rendering ifall mängden är 10 eller mindre.
  const stockColorClass =
    product.amountInStock <= 10 ? "text-red-500" : "text-gray-500";

  return (
    <div className="bg-white hover:bg-neutral-100 p-4 rounded-lg shadow-md transform transition-transform hover:scale-100 hover:-translate-y-1 w-80 mb-6">
      {showOnlyManufacturer ? (
        product.manufacturer ? (
          <ManufacturerCard manufacturer={product.manufacturer} />
        ) : (
          <div className="mt-2 text-gray-500">
            No manufacturer information available
          </div>
        )
      ) : (
        <>
          <p className="text-gray-500">ID: {product._id}</p>
          <p className="text-lg font-bold">{product.name}</p>
          <p className="text-cyan-700 font-semibold">{product.description}</p>
          <p className="font-semibold">
            <span className="text-gray-500">Price:</span>{" "}
            <span>${product.price}</span>
          </p>
          <p className="font-semibold">
            <span className="text-gray-500">Stock:</span>{" "}
            <span className={stockColorClass}>{product.amountInStock}</span>
          </p>
          <p className="font-semibold">
            <span className="text-gray-500">SKU:</span>{" "}
            <span>{product.sku}</span>
          </p>
          <p className="font-semibold">
            <span className="text-gray-500">Category:</span>{" "}
            <span>{product.category}</span>
          </p>

          {product.manufacturer ? (
            <ManufacturerCard manufacturer={product.manufacturer} />
          ) : (
            <div className="mt-2 text-gray-500">
              No manufacturer information available
            </div>
          )}
          <div className="mt-4 flex space-x-2">
            <button
              onClick={onEdit}
              className="bg-yellow-500 hover:bg-yellow-700 text-white p-2 rounded-lg"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="bg-red-500 hover:bg-red-700 text-white p-2 rounded-lg"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductCard;
