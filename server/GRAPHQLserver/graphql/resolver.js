// graphql/resolvers.js
const Product = require('../models/Product');

const resolvers = {
    products: async () => {
        return await Product.find();
    },
    product: async ({ id }) => {
        return await Product.findById(id);
    },
    totalStockValue: async () => {
        const products = await Product.find();
        return products.reduce((acc, product) => acc + (product.price * product.amountInStock), 0);
    },
    totalStockValueByManufacturer: async () => {
        const products = await Product.find();
        const result = {};

        products.forEach(product => {
            const manufacturerName = product.manufacturer.name;
            if (!result[manufacturerName]) {
                result[manufacturerName] = {
                    manufacturer: product.manufacturer,
                    totalValue: 0
                };
            }
            result[manufacturerName].totalValue += product.price * product.amountInStock;
        });

        return Object.values(result);
    },
    lowStockProducts: async () => {
        return await Product.find({ amountInStock: { $lt: 10 } });
    },
    criticalStockProducts: async () => {
        const products = await Product.find({ amountInStock: { $lt: 5 } });
        return products.map(product => ({
            name: product.name,
            manufacturer: product.manufacturer,
            contactName: product.manufacturer.contact.name,
            contactPhone: product.manufacturer.contact.phone,
            contactEmail: product.manufacturer.contact.email,
            amountInStock: product.amountInStock
        }));
    },
    manufacturers: async () => {
        const products = await Product.find();
        const manufacturers = products.map(product => product.manufacturer);
        return [...new Map(manufacturers.map(m => [m.name, m])).values()];
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
