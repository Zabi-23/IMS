// graphql/resolvers.js


const Product = require('../models/Product');
const Manufacturer = require('../models/Manufacturer');
const Contact = require('../models/Contact');

const resolvers = {
    products: async () => {
        return await Product.find().populate('manufacturer');
    },
    product: async ({ id }) => {
        return await Product.findById(id).populate('manufacturer');
    },
    totalStockValue: async () => {
        const products = await Product.find();
        return products.reduce((acc, product) => acc + (product.price * product.amountInStock), 0);
    },
    totalStockValueByManufacturer: async () => {
        const products = await Product.find().populate('manufacturer');
        const result = {};

        products.forEach(product => {
            const manufacturer = product.manufacturer;
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
    },
    lowStockProducts: async () => {
        return await Product.find({ amountInStock: { $lt: 10 } }).populate('manufacturer');
    },
    criticalStockProducts: async () => {
        const products = await Product.find({ amountInStock: { $lt: 5 } }).populate('manufacturer');
        return products.map(product => {
            const manufacturer = product.manufacturer;
            return {
                name: product.name,
                manufacturer: manufacturer.name,
                contactName: manufacturer.contact.name,
                contactPhone: manufacturer.contact.phone,
                contactEmail: manufacturer.contact.email,
                amountInStock: product.amountInStock
            };
        });
    },
    manufacturers: async () => {
        return await Manufacturer.find();
    },
    addProduct: async ({ name, sku, description, price, category, manufacturer, amountInStock }) => {
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
    },
    updateProduct: async ({ id, name, sku, description, price, category, manufacturer, amountInStock }) => {
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
    },
    deleteProduct: async ({ id }) => {
        const product = await Product.findById(id);
        if (!product) throw new Error('Product not found');
        await product.remove();
        return product;
    }
};

module.exports = resolvers;
