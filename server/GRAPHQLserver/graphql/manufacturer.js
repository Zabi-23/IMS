const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
});

const ManufacturerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    country: String,
    website: String,
    description: String,
    address: String,
    contact: ContactSchema
});

// Check if the model already exists before defining it
const Manufacturer = mongoose.models.Manufacturer || mongoose.model('Manufacturer', ManufacturerSchema);

module.exports = Manufacturer;
