import React from "react";
import Product from "../types";

interface ProductCardProps {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
}

const ManufacturerDetails: React.FC<{
  manufacturer: Product["manufacturer"];
}> = ({ manufacturer }) => (
  <div className="mt-2 text-gray-500">
    <div>
      <span className="font-bold">Manufacturer:</span>{" "}
      {manufacturer.name || "Manufacturer not available"}
    </div>
    <div>
      <span className="font-bold">Country:</span>{" "}
      {manufacturer.country || "Country not available"}
    </div>
    <div>
      <span className="font-bold">Website:</span>{" "}
      <a
        href={manufacturer.website || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        {manufacturer.website || "Website not available"}
      </a>
    </div>
    <div>
      <span className="font-bold">Description:</span>{" "}
      {manufacturer.description || "No description available"}
    </div>
    <div>
      <span className="font-bold">Address:</span>{" "}
      {manufacturer.address || "Address not available"}
    </div>
    <div>
      <span className="font-bold">Contact:</span>{" "}
      {manufacturer.contact?.name || "Contact name not available"}
      <div>{manufacturer.contact?.email || "Email: Email not available"}</div>
      <div>
        {manufacturer.contact?.phone || "Phone: Phone number not available"}
      </div>
    </div>
  </div>
);

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
}) => {
  // Lägger till en konditionell rendering ifall mängden är 10 eller mindre.
  const stockColorClass =
    product.amountInStock <= 10 ? "text-red-500" : "text-gray-500";

  return (
    <div className="bg-white hover:bg-neutral-100 p-4 rounded-lg shadow-md transform transition-transform hover:scale-100 hover:-translate-y-1 w-80 mb-6">
      <p className="text-gray-500">ID: {product._id}</p>
      <p className="text-lg font-bold">{product.name}</p>
      <p className="text-gray-600 font-semibold">{product.description}</p>
      <p className="mt-2 text-gray-500 font-semibold">
        Price: ${product.price}
      </p>
      <p className={`mt-2 font-semibold ${stockColorClass}`}>
        Stock: {product.amountInStock}
      </p>
      {product.manufacturer ? (
        <ManufacturerDetails manufacturer={product.manufacturer} />
      ) : (
        <div className="mt-2 text-gray-500">
          <div>
            <span className="font-bold">Manufacturer:</span> No manufacturer
            could be found
          </div>
          <div>
            <span className="font-bold">Website:</span> Website not available
          </div>
          <div>
            <span className="font-bold">Description:</span> No description
            available
          </div>
          <div>
            <span className="font-bold">Address:</span> Address not available
          </div>
          <div>
            <span className="font-bold">Contact:</span> Contact information not
            available
          </div>
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
    </div>
  );
};

export default ProductCard;
