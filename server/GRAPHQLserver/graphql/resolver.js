// graphql/resolvers.js


const Product = require('../models/Product');
const Manufacturer = require('../models/Manufacturer');
const Contact = require('../models/Contact');

const resolvers = {
    products: async () => {
        try {
            return await Product.find().populate('manufacturer');
        } catch (err) {
            throw new Error('Error fetching products: ' + err.message);
        }
    },

    product: async ({ id }) => {
        try {
            return await Product.findById(id).populate('manufacturer');
        } catch (err) {
            throw new Error('Error fetching product: ' + err.message);
        }
    },

    totalStockValue: async () => {
        try {
            const products = await Product.find();
            return products.reduce((acc, product) => acc + (product.price * product.amountInStock), 0);
        } catch (err) {
            throw new Error('Error fetching total stock value: ' + err.message);
        }
    },

    totalStockValueByManufacturer: async () => {
        try {
            const products = await Product.find().populate('manufacturer');
            const result = {};

            products.forEach(product => {
                const manufacturer = product.manufacturer;
                if (!manufacturer) return; // Hantera fall där tillverkaren inte finns
                const manufacturerName = manufacturer.name;
                if (!result[manufacturerName]) {
                    result[manufacturerName] = {
                        manufacturer: manufacturer,
                        totalValue: 0
                    };
                }
                result[manufacturerName].totalValue += product.price * product.amountInStock;
            });

            return Object.values(result);
        } catch (err) {
            throw new Error('Error fetching total stock value by manufacturer: ' + err.message);
        }
    },

    criticalStockProducts: async () => {
        try {
            const products = await Product.find({ amountInStock: { $lt: 5 } }).populate('manufacturer');
            return products.map(product => {
                const manufacturer = product.manufacturer;
                return {
                    name: product.name,
                    manufacturer: manufacturer ? manufacturer.name : 'Unknown',
                    contactName: manufacturer && manufacturer.contact ? manufacturer.contact.name : 'Unknown',
                    contactPhone: manufacturer && manufacturer.contact ? manufacturer.contact.phone : 'Unknown',
                    contactEmail: manufacturer && manufacturer.contact ? manufacturer.contact.email : 'Unknown',
                    amountInStock: product.amountInStock
                };
            });
        } catch (err) {
            throw new Error('Error fetching critical stock products: ' + err.message);
        }
    },

    manufacturers: async () => {
        try {
            return await Manufacturer.find();
        } catch (err) {
            throw new Error('Error fetching manufacturers: ' + err.message);
        }
    },

    addProduct: async ({ name, sku, description, price, category, manufacturer, amountInStock }) => {
        try {
            const product = new Product({
                name,
                sku,
                description,
                price,
                category,
                manufacturer,
                amountInStock
            });
            return await product.save();
        } catch (err) {
            throw new Error('Error adding product: ' + err.message);
        }
    },

    updateProduct: async ({ id, name, sku, description, price, category, manufacturer, amountInStock }) => {
        try {
            const product = await Product.findById(id);
            if (!product) throw new Error('Product not found');

            if (name) product.name = name;
            if (sku) product.sku = sku;
            if (description) product.description = description;
            if (price) product.price = price;
            if (category) product.category = category;
            if (manufacturer) product.manufacturer = manufacturer;
            if (amountInStock) product.amountInStock = amountInStock;

            return await product.save();
        } catch (err) {
            throw new Error('Error updating product: ' + err.message);
        }
    },

    deleteProduct: async ({ id }) => {
        try {
            const product = await Product.findByIdAndDelete(id);
            if (!product) throw new Error('Product not found');
            return product;
        } catch (err) {
            throw new Error('Error deleting product: ' + err.message);
        }
    }
};

module.exports = resolvers;
