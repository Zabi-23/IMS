const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  sku: String,
  description: String,
  price: { type: Number, required: true },
  category: String,
  manufacturer: { type: Schema.Types.ObjectId, ref: "Manufacturer" },
  amountInStock: Number,
});

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
