import React, { useEffect, useState } from "react";

// Importerar Product-typen från typer.
import { Product, Manufacturer } from "../types";

// Importerar API-funktioner för produkthantering.
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
  fetchLowStockProducts,
  fetchCriticalStockProducts,
  fetchTotalStockValue,
  fetchManufacturers,
} from "../API/productApi";

// Importerar komponenter.
import ProductForm from "./ProductForm";
import ProductCard from "./ProductCard";
import ManufacturerCard from "./ManufacturerCard";
import Loader from "./Loader";

// Komponent för att hantera listning och CRUD-operationer för produkter.
const ProductList: React.FC = () => {
  // Tillståndsvariabler för produkter, sökning, laddning och felhantering.
  const [products, setProducts] = useState<Product[]>([]);
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalStockValue, setTotalStockValue] = useState<number | null>(null);

  // Tillståndsvariabel för formulärdata och redigering.
  const [formState, setFormState] = useState<Omit<Product, "_id">>({
    name: "",
    description: "",
    price: 0,
    amountInStock: 0,
    sku: "",
    category: "",
    manufacturer: {
      name: "",
      country: "",
      website: "",
      description: "",
      address: "",
      contact: {
        name: "",
        email: "",
        phone: "",
      },
    },
  });
  // Tillståndsvariabel för identifiering av redigerad produkt.
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [showManufacturers, setShowManufacturers] = useState<boolean>(false);

  useEffect(() => {
    const fetchProductsData = async () => {
      setLoading(true);
      setError(null);
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (error) {
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProductsData();
  }, []);

  // Funktion för att skapa en ny produkt.
  const handleCreate = async () => {
    try {
      await createProduct(formState); // Skickar ny produktdata till API för skapande.
      const productsData = await fetchProducts(); // Hämtar uppdaterad produktlista från API.
      setProducts(productsData); // Uppdaterar lokalt produkttillstånd med uppdaterad lista.
      resetForm(); // Formulär återställs efter skapande av produkt.
    } catch (error) {
      setError("Error creating product"); // Hanterar fel vid skapande av produkt.
    }
  };

  // Funktion för att uppdatera en befintlig produkt.
  const handleUpdate = async () => {
    if (editingProductId) {
      try {
        await updateProduct(editingProductId, {
          ...formState,
          _id: editingProductId,
        }); // Skickar uppdaterad produktdata till API för uppdatering.
        const productsData = await fetchProducts(); // Hämtar uppdaterad produktlista från API.
        setProducts(productsData); // Uppdaterar lokalt produkttillstånd med uppdaterad lista.
        resetForm(); // Formulär återställs efter uppdatering av produkt.
      } catch (error) {
        setError("Error updating product"); // Hanterar fel vid uppdatering av produkt.
      }
    }
  };

  // Funktion för att ta bort en produkt.
  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id); // Skickar ID för produkt som ska tas bort till API.
      const productsData = await fetchProducts(); // Hämtar uppdaterad produktlista från API.
      setProducts(productsData); // Uppdaterar lokalt produkttillstånd med uppdaterad lista.
    } catch (error) {
      setError("Error deleting product"); // Hanterar fel vid borttagning av produkt.
    }
  };

  const handleDeleteAll = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete all products?"
    );
    if (confirmDelete) {
      try {
        await deleteAllProducts();
        setProducts([]);
      } catch (error) {
        setError("Error deleting all products");
      }
    }
  };

  // Funktion för att få produkter med lågt lager.
  const handleFetchLowStock = async () => {
    try {
      const lowStockData = await fetchLowStockProducts();
      setProducts(lowStockData);
    } catch (error) {
      setError("Error fetching low stock products");
    }
  };

  // Funktion för att få produkter med kritiskt lager.
  const handleFetchCriticalStock = async () => {
    try {
      const criticalStockData = await fetchCriticalStockProducts();
      setProducts(criticalStockData);
    } catch (error) {
      setError("Error fetching critical stock products");
    }
  };

  const handleFetchTotalStock = async () => {
    try {
      const totalStock = await fetchTotalStockValue();
      setTotalStockValue(totalStock);
    } catch (error) {
      setError("Error fetching total stock value");
    }
  };

  const handleFetchManufacturers = async () => {
    if (showManufacturers) {
      setShowManufacturers(false);
    } else {
      try {
        const manufacturersData = await fetchManufacturers();
        setManufacturers(manufacturersData);
        setShowManufacturers(true);
      } catch (error) {
        setError("Error fetching manufacturers");
      }
    }
  };

  // Funktion för att hantera ändringar i formulärfält för produktdetaljer.
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Funktion för att hantera ändringar i formulärfält för tillverkardetaljer.
  const handleManufacturerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      manufacturer: {
        ...prevState.manufacturer,
        [name]: value,
      },
    }));
  };

  // Funktion för att hantera ändringar i formulärfält för kontaktinformation.
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      manufacturer: {
        ...prevState.manufacturer,
        contact: {
          ...prevState.manufacturer.contact,
          [name]: value,
        },
      },
    }));
  };

  // Funktion för att återställa formuläret till ursprungstillstånd.
  const resetForm = () => {
    setFormState({
      name: "",
      description: "",
      price: 0,
      amountInStock: 0,
      sku: "",
      category: "",
      manufacturer: {
        name: "",
        country: "",
        website: "",
        description: "",
        address: "",
        contact: {
          name: "",
          email: "",
          phone: "",
        },
      },
    });
    setEditingProductId(null); // Återställer ID för redigering till null.
  };

  // Filtrerar produkter baserat på söksträngen.
  const filteredProducts = products.filter((product) => {
    const name = product.name ? product.name.toLowerCase() : "";
    const manufacturerName = product.manufacturer?.name
      ? product.manufacturer.name.toLowerCase()
      : "";
    const id = product._id ? product._id.toLowerCase() : "";

    const query = searchQuery.toLowerCase();

    return (
      name.includes(query) ||
      manufacturerName.includes(query) ||
      id.includes(query)
    );
  });

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4 text-neutral-100">Product List</h1>

      {/* Sökformulär */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by ID, name, or manufacturer"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded p-2 w-80"
        />
      </div>

      {/* Loader */}
      {loading && <Loader />}

      {/* Felmeddelande */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Props som skickas vidare till ProductForm komponenten. */}
      <ProductForm
        product={formState}
        isEditing={!!editingProductId}
        onInputChange={handleInputChange}
        onManufacturerChange={handleManufacturerChange}
        onContactChange={handleContactChange}
        onSubmit={editingProductId ? handleUpdate : handleCreate}
        resetForm={resetForm}
        onDeleteAll={handleDeleteAll}
        onFetchLowStock={handleFetchLowStock}
        onFetchCriticalStock={handleFetchCriticalStock}
        onFetchTotalStock={handleFetchTotalStock}
        totalStockValue={totalStockValue}
        onFetchManufacturers={handleFetchManufacturers}
      />

      <div className="flex flex-row gap-6 flex-wrap">
        {showManufacturers ? (
          manufacturers.length > 0 ? (
            manufacturers.map((manufacturer) => (
              <ManufacturerCard
                key={manufacturer.id}
                manufacturer={manufacturer}
              />
            ))
          ) : (
            <p className="text-center text-white">No manufacturers found</p>
          )
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onEdit={() => {
                setFormState({
                  name: product.name,
                  description: product.description,
                  price: product.price,
                  amountInStock: product.amountInStock,
                  sku: product.sku,
                  category: product.category,
                  manufacturer: product.manufacturer || {
                    name: "",
                    country: "",
                    website: "",
                    description: "",
                    address: "",
                    contact: {
                      name: "",
                      email: "",
                      phone: "",
                    },
                  },
                });
                setEditingProductId(product._id || null);
              }}
              onDelete={() => handleDelete(product._id || "")}
            />
          ))
        ) : (
          <p className="text-center text-white">No products found</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
