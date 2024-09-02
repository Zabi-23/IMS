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

module.exports = {
  createProduct,
  findProducts,
  findProductById,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
};
