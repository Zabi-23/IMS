const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  sku: String,
  description: String,
  price: Number,
  category: String,
  manufacturer: { type: Schema.Types.ObjectId, ref: 'Manufacturer' },
  amountInStock: Number
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
