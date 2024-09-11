const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Contact schema
const ContactSchema = new Schema({
  name: String,
  email: String,
  phone: String,
});

//Manufacturer schema
const ManufactureSchema = new Schema({
  name: String,
  country: String,
  website: String,
  description: String,
  address: String,
  contact: ContactSchema,
});

//Product schema
const ProductSchema = new Schema({
  name: String,
  sku: Number,
  description: String,
  price: Number,
  category: String,
  manufacturer: ManufactureSchema,
  amountInStock: Number,
});

//Product model
const Product = mongoose.model("Product", ProductSchema);

module.exports = { Product };
