import React from "react";
import { Manufacturer } from "../types";

interface ManufacturerCardProps {
  manufacturer: Manufacturer;
  showOnlyBasicInfo?: boolean;
}

const ManufacturerCard: React.FC<ManufacturerCardProps> = ({
  manufacturer,
  showOnlyBasicInfo = false,
}) => {
  return (
    <div className="bg-white hover:bg-neutral-100 p-4 rounded-lg shadow-md w-72">
      {showOnlyBasicInfo ? (
        <>
          <p className="font-bold">
            Manufacturer: {manufacturer.name || "Manufacturer not available"}
          </p>
          <p className="text-gray-500">
            Country: {manufacturer.country || "Country not available"}
          </p>
        </>
      ) : (
        <>
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
            <div>
              {manufacturer.contact?.email || "Email: Email not available"}
            </div>
            <div>
              {manufacturer.contact?.phone ||
                "Phone: Phone number not available"}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ManufacturerCard;
