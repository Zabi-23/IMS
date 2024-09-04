const express = require("express");
const {
  createProduct,
  findProducts,
  findProductById,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
  getLowStockProducts,
  getCriticalStockProducts,
  getTotalStockValue,
  getManufacturers,
  getStockValueByManufacturerId,
} = require("../db/productCrud");

const router = express.Router();

// GET: Products with low stock
router.get("/low-stock", async (req, res) => {
  try {
    const lowStock = await getLowStockProducts();
    res.status(200).json(lowStock);
  } catch (error) {
    res.status(500).json({
      message: `Error retrieving low stock products: ${error.message}`,
    });
  }
});

// GET: Products with critical stock
router.get("/critical-stock", async (req, res) => {
  try {
    const criticalStock = await getCriticalStockProducts();
    res.status(200).json(criticalStock);
  } catch (error) {
    res.status(500).json({
      message: `Error retrieving critical stock products: ${error.message}`,
    });
  }
});

// GET: Total stock value
router.get("/total-stock-value", async (req, res) => {
  try {
    const totalStockValue = await getTotalStockValue();
    res.status(200).json({ totalStockValue });
  } catch (error) {
    res.status(500).json({
      message: `Error retrieving total stock value: ${error.message}`,
    });
  }
});

// GET: All manufacturers
router.get("/manufacturers", async (req, res) => {
  try {
    const manufacturers = await getManufacturers();
    res.status(200).json(manufacturers);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error retrieving manufacturers: ${error.message}` });
  }
});

// GET: Stock value by manufacturer ID
router.get("/stock-value/:manufacturerId", async (req, res) => {
  try {
    const { manufacturerId } = req.params;
    const stockValue = await getStockValueByManufacturerId(manufacturerId);
    res.status(200).json({ stockValue });
  } catch (error) {
    res.status(500).json({
      message: `Error retrieving stock value for manufacturer: ${error.message}`,
    });
  }
});

// Create a product
router.post("/", async (req, res) => {
  try {
    const newProduct = await createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await findProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await findProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Produkten hittades inte" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update a product by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await updateProduct(req.params.id, req.body);
    if (!updatedProduct) {
      return res.status(404).json({ message: "Produkten hittades inte" });
    }
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE delete a product by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await deleteProduct(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Produkten hittades inte" });
    }
    res.json({ message: "Produkten har tagits bort" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE delete all products
router.delete("/", async (req, res) => {
  try {
    await deleteAllProducts();
    res.status(200).send("All products deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting all products");
  }
});

module.exports = router;
