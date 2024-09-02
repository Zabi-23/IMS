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

//Model för kontakt
const contactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ }, // Validering för e-postformat
  phone: { type: String, match: /^[\d\+\-\(\) ]+$/ }, // Validering för telefonnummerformat
  message: String,
});

//Model för Tillverkare
const manufacturerSchema = new Schema({
  name: { type: String, required: true },
  country: String,
  website: String,
  description: String, 
  address: {
    street: String,
    city: String,
    zipCode: String,
    country: String,
  },
  contact: contactSchema,
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});


const Manufacturer = mongoose.model('Manufacturer', manufacturerSchema);
const Contact = mongoose.model('Contact', contactSchema);
const Product = mongoose.model('Product', productSchema);

module.exports = Product, Manufacturer, Contact;





