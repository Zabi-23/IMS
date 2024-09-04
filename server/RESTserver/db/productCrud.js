const productModel = require("./models/product");

const createProduct = async (productData) => {
  const product = new productModel(productData);
  return product.save();
};

const findProducts = async () => {
  return productModel.find();
};

const findProductById = async (id) => {
  return productModel.findById(id);
};

const updateProduct = async (id, productData) => {
  return productModel.findByIdAndUpdate(id, productData, { new: true });
};

const deleteProduct = async (id) => {
  return productModel.findByIdAndDelete(id);
};

const deleteAllProducts = async () => {
  return productModel.deleteMany({});
};

// Get products with low stock (less than 30 units)
const getLowStockProducts = async () => {
  try {
    const lowStockProducts = await productModel.find({
      amountInStock: { $lt: 30 },
    });
    return lowStockProducts;
  } catch (error) {
    throw new Error(`Failed to retrieve low stock products: ${error.message}`);
  }
};

// Get products with critical stock (less than 3 units)
const getCriticalStockProducts = async () => {
  try {
    return await productModel.find({ amountInStock: { $lt: 3 } });
  } catch (error) {
    throw new Error(`Failed to get critical stock products: ${error.message}`);
  }
};

// Get total stock value of all products
const getTotalStockValue = async () => {
  try {
    const products = await findProducts();
    return products.reduce(
      (total, product) => total + product.price * product.amountInStock,
      0
    );
  } catch (error) {
    throw new Error(`Failed to get total stock value: ${error.message}`);
  }
};

// Get total stock value by manufacturer ID
const getStockValueByManufacturerId = async (manufacturerId) => {
  try {
    const products = await productModel.find({
      "manufacturer._id": manufacturerId,
    });
    return products.reduce(
      (total, product) => total + product.price * product.amountInStock,
      0
    );
  } catch (error) {
    throw new Error(
      `Failed to get stock value by manufacturer ID: ${error.message}`
    );
  }
};

// Get a list of all manufacturers
const getManufacturers = async () => {
  try {
    const manufacturers = await productModel.distinct("manufacturer");
    return manufacturers;
  } catch (error) {
    throw new Error(`Failed to get manufacturers: ${error.message}`);
  }
};

module.exports = {
  createProduct,
  findProducts,
  findProductById,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
  getLowStockProducts,
  getCriticalStockProducts,
  getTotalStockValue,
  getStockValueByManufacturerId,
  getManufacturers,
};
