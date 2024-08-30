const express = require("express");
const router = express.Router();
const {
  createProduct,
  findProducts,
  findProductById,
  updateProduct,
  deleteProduct,
} = require("../db/productCrud");

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

module.exports = router;
