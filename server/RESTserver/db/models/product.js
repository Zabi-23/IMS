const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  name: String,
  email: String,
  phone: String,
});

const ManufactureSchema = new Schema({
  name: String,
  country: String,
  website: String,
  description: String,
  address: String,
  contact: ContactSchema,
});

const ProductSchema = new Schema({
  name: String,
  sku: String,
  description: String,
  price: Number,
  category: String,
  manufacturer: ManufactureSchema,
  amountInStock: Number,
});

const productModel = mongoose.model("Product", ProductSchema);

module.exports = productModel;
