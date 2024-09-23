import React, { useEffect, useState, useCallback } from "react";

// Importerar Product- och Manufacturer-typen från typer.
import { Product, Manufacturer } from "../types";

// Importerar API-funktioner som används för att hämta, skapa, uppdatera och ta bort produkter och tillverkare.
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
  fetchTotalStockValueByManufacturer,
} from "../API/productApi";

// Importerar komponenter som används i applikationen.
import ProductForm from "./ProductForm";
import ProductCard from "./ProductCard";
import ManufacturerCard from "./ManufacturerCard";
import Loader from "./Loader"; // Komponent för att visa laddningsindikator.

const ProductList: React.FC = () => {
  // Använder useState för att hantera olika tillstånd (state) i komponenten.
  const [products, setProducts] = useState<Product[]>([]); // Tillstånd för lagring av produkter.
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]); // Tillstånd för lagring av tillverkare.
  const [searchQuery, setSearchQuery] = useState<string>(""); // Tillstånd för att lagra sökfrågan.
  const [loading, setLoading] = useState<boolean>(false); // Tillstånd för att indikera om data laddas.
  const [error, setError] = useState<string | null>(null); // Tillstånd för att hantera felmeddelanden.
  const [totalStockValue, setTotalStockValue] = useState<number | null>(null); // Tillstånd för att lagra total lagervärde.
  const [editingProductId, setEditingProductId] = useState<string | null>(null); // Tillstånd för att lagra ID för den produkt som redigeras.
  const [showManufacturers, setShowManufacturers] = useState<boolean>(false); // Tillstånd för att visa eller dölja tillverkarkort.
  const [page, setPage] = useState(1); // Tillstånd för att hantera aktuell sidnummer för pagination.
  const [hasMore, setHasMore] = useState(true); // Tillstånd för att indikera om det finns fler produkter att ladda.

  // Förvalda värden för formuläret som används för att skapa eller uppdatera produkter.
  const resetFormState = {
    name: "", // Tomt namn på produkten
    description: "", // Tom beskrivning
    price: 0, // Priset är 0
    amountInStock: 0, // Antal i lager
    sku: "", // SKU för produkten
    category: "", // Kategori
    manufacturer: {
      // Tom tillverkarinformation
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
  };

  // Tillstånd för formulärets nuvarande värden.
  const [formState, setFormState] =
    useState<Omit<Product, "_id">>(resetFormState);

  // Funktion för att hämta produktdata från servern (med pagination).
  const fetchProductsData = useCallback(async () => {
    setLoading(true); // Anger att data laddas.
    setError(null); // Nollställer eventuella fel.
    try {
      const productsData = await fetchProducts(page, 10); // Hämtar produkter för aktuell sida (10 åt gången).
      if (productsData.length < 10) setHasMore(false); // Om färre än 10 produkter laddas finns inga fler att ladda.
      setProducts((prevProducts) => [
        // Uppdaterar produktlistan utan dubbletter.
        ...prevProducts,
        ...productsData.filter(
          (product: Product) => !prevProducts.some((p) => p._id === product._id)
        ),
      ]);
    } catch {
      setError("Error fetching products"); // Hanterar fel vid hämtning.
    } finally {
      setLoading(false); // Stänger av laddningsindikatorn.
    }
  }, [page]); // Effektens beroende av sidnummer (page).

  // useEffect körs när komponenten laddas och varje gång fetchProductsData ändras.
  useEffect(() => {
    fetchProductsData(); // Hämtar produkter när komponenten monteras eller sidnummer ändras.
  }, [fetchProductsData]);

  // Funktion för att ladda fler produkter (ökar sidnumret).
  const loadMoreProducts = () => setPage((prevPage) => prevPage + 1);

  // Hanterar skapande eller uppdatering av produkter.
  const handleCreateOrUpdate = async () => {
    try {
      if (editingProductId) {
        // Om vi redigerar en produkt, uppdatera den.
        const updatedProduct = await updateProduct(editingProductId, {
          ...formState,
          _id: editingProductId,
        });
        // Uppdaterar produktlistan med den redigerade produkten.
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === editingProductId ? updatedProduct : product
          )
        );
      } else {
        // Om vi skapar en ny produkt, lägger den överst i listan.
        const newProduct = await createProduct(formState);
        setProducts((prevProducts) => [newProduct, ...prevProducts]); // Lägger till den nya produkten överst.
      }
      resetForm(); // Återställ formuläret.
    } catch (error: Error | any) {
      // Sätter ett felmeddelande baserat på vad backend returnerar.
      setError(error.message);
    }
  };

  // Hanterar radering av en specifik produkt.
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      // Bekräftar raderingen från användaren.
      try {
        await deleteProduct(id); // Raderar produkten med angivet ID.
        setProducts(await fetchProducts()); // Uppdaterar produktlistan efter radering.
      } catch {
        setError("Error deleting product"); // Hanterar fel vid radering.
      }
    }
  };

  // Hanterar radering av alla produkter.
  const handleDeleteAll = async () => {
    if (window.confirm("Are you sure you want to delete all products?")) {
      // Bekräftar raderingen från användaren.
      try {
        await deleteAllProducts(); // Raderar alla produkter.
        setProducts([]); // Nollställer produktlistan.
      } catch {
        setError("Error deleting all products"); // Hanterar fel vid radering.
      }
    }
  };

  // Funktion för att hämta produkter med låg lagerstatus.
  const handleFetchLowStock = async () => {
    try {
      setProducts(await fetchLowStockProducts()); // Hämtar och uppdaterar produkter med låg lagerstatus.
    } catch {
      setError("Error fetching low stock products"); // Hanterar fel.
    }
  };

  // Funktion för att hämta produkter med kritisk lagerstatus.
  const handleFetchCriticalStock = async () => {
    try {
      setProducts(await fetchCriticalStockProducts()); // Hämtar produkter med kritisk lagerstatus.
    } catch {
      setError("Error fetching critical stock products"); // Hanterar fel.
    }
  };

  // Funktion för att hämta det totala lagervärdet.
  const handleFetchTotalStock = async () => {
    try {
      setTotalStockValue(await fetchTotalStockValue()); // Hämtar och lagrar det totala lagervärdet.
    } catch {
      setError("Error fetching total stock value"); // Hanterar fel.
    }
  };

  // Funktion för att hämta tillverkare och visa tillverkningskort.
  const handleFetchManufacturers = async () => {
    if (showManufacturers) {
      // Om tillverkarna redan visas, döljer vi dem.
      setShowManufacturers(false);
    } else {
      // Annars hämtar vi tillverkare från servern.
      try {
        setManufacturers(await fetchManufacturers());
        setShowManufacturers(true); // Visar tillverkarna.
      } catch {
        setError("Error fetching manufacturers"); // Hanterar fel.
      }
    }
  };

  // Funktion för att hämta total lagerstatus per tillverkare (loggar data i konsolen).
  const handleFetchStockValueByManufacturer = async () => {
    try {
      console.log(await fetchTotalStockValueByManufacturer()); // Loggar total lagerstatus per tillverkare.
    } catch {
      setError("Error fetching stock value by manufacturer"); // Hanterar fel.
    }
  };

  // Hanterar förändringar i formulärets inputfält.
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // Hämtar namnet och värdet från inputfältet.
    setFormState((prev) => ({ ...prev, [name]: value })); // Uppdaterar formulärstillståndet.
  };

  // Hanterar förändringar i tillverkardelen av formuläret.
  const handleManufacturerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      manufacturer: { ...prev.manufacturer, [name]: value },
    }));
  };

  // Hanterar förändringar i kontaktuppgifterna i formuläret.
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      manufacturer: {
        ...prev.manufacturer,
        contact: { ...prev.manufacturer.contact, [name]: value },
      },
    }));
  };

  // Funktion för att visa alla produkter.
  const handleShowAllProducts = async () => {
    try {
      setProducts(await fetchProducts());
    } catch {
      setError("Error fetching all products");
    }
  };

  // Återställer formuläret till standardvärden.
  const resetForm = () => {
    setFormState(resetFormState); // Återställ formulärstillståndet.
    setEditingProductId(null); // Nollställer redigeringsläget.
  };

  const filteredProducts = products.filter((product) => {
    const query = searchQuery.toLowerCase();
    return (
      product.name?.toLowerCase().includes(query) ||
      product.manufacturer?.name?.toLowerCase().includes(query) ||
      product._id?.toLowerCase().includes(query)
    );
  });

  const filteredManufacturers = manufacturers.filter((manufacturer) => {
    const query = searchQuery.toLowerCase();
    return (
      manufacturer.name?.toLowerCase().includes(query) ||
      manufacturer.country?.toLowerCase().includes(query) ||
      manufacturer.website?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4 text-neutral-100">Product List</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by ID, name, or manufacturer"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded p-2 w-80"
        />
      </div>

      {loading && <Loader />}
      {error && (
        <p className="text-center text-lg text-white underline font-bold bg-red-500 rounded-md shadow-lg animate-pulse transition duration-300 ease-in-out w-fit mx-auto">
          🚨 {error} 🚨
        </p>
      )}

      <ProductForm
        product={formState}
        isEditing={!!editingProductId}
        onInputChange={handleInputChange}
        onManufacturerChange={handleManufacturerChange}
        onContactChange={handleContactChange}
        onSubmit={handleCreateOrUpdate}
        resetForm={resetForm}
        onDeleteAll={handleDeleteAll}
        onFetchLowStock={handleFetchLowStock}
        onFetchCriticalStock={handleFetchCriticalStock}
        onFetchTotalStock={handleFetchTotalStock}
        totalStockValue={totalStockValue}
        onFetchManufacturers={handleFetchManufacturers}
        onFetchStockValueByManufacturer={handleFetchStockValueByManufacturer}
        onShowAllProducts={handleShowAllProducts}
      />

      <div className="flex flex-row gap-6 flex-wrap justify-center">
        {showManufacturers ? (
          filteredManufacturers.length > 0 ? (
            filteredManufacturers.map((manufacturer) => (
              <ManufacturerCard
                key={manufacturer._id}
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
                  manufacturer:
                    product.manufacturer || resetFormState.manufacturer,
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

      <div className="flex items-center justify-center">
        {hasMore && (
          <button
            onClick={loadMoreProducts}
            className="m-10 bg-blue-500 text-white p-2 w-1/4 rounded-md hover:bg-blue-700"
          >
            Show More
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductList;
