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
  getManufacturers,
} = require("../db/productCrud");

const router = express.Router();

// POST a product
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

router.delete("/", async (req, res) => {
  try {
    await deleteAllProducts(); // Anropa deleteAllProducts här
    res.status(200).send("All products deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting all products");
  }
});

router.get("/low-stock", async (req, res) => {
  try {
    const products = await findProducts();
    const lowStockProducts = products.filter(
      (product) => product.amountInStock < 10
    );
    res.json(lowStockProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/critical-stock", async (req, res) => {
  try {
    const products = await findProducts();
    const criticalStockProducts = products
      .filter((product) => product.amountInStock < 5)
      .map((product) => ({
        name: product.name,
        manufacturer: product.manufacturer.name,
        contactName: product.manufacturer.contact.name,
        contactPhone: product.manufacturer.contact.phone,
        contactEmail: product.manufacturer.contact.email,
      }));
    res.json(criticalStockProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/manufacturers", async (req, res) => {
  try {
    const products = await findProducts();
    const manufacturers = [
      ...new Set(products.map((product) => product.manufacturer)),
    ];
    res.json(manufacturers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
