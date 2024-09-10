// graphql/resolvers.js
const Product = require('../models/Product');
const Manufacturer =require('../graphql/manufacturer');

const resolvers = {
    // Query to get all products
    products: async () => {
        return await Product.find().populate('manufacturer');
    },
    
    // Query to get a single product by ID
    product: async ({ id }) => {
        return await Product.findById(id).populate('manufacturer');
    },
    
    // Query to calculate total stock value
    totalStockValue: async () => {
        const products = await Product.find();
        return products.reduce((acc, product) => acc + (product.price * product.amountInStock), 0);
    },
    
    // Query to calculate total stock value by manufacturer
    totalStockValueByManufacturer: async () => {
        const products = await Product.find().populate('manufacturer');
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
    
    // Query to get products with low stock (less than 10)
    lowStockProducts: async () => {
        return await Product.find({ amountInStock: { $lt: 10 } }).populate('manufacturer');
    },
    
    // Query to get critical stock products (less than 5)
    criticalStockProducts: async () => {
        const products = await Product.find({ amountInStock: { $lt: 5 } }).populate('manufacturer');
        return products.map(product => ({
            name: product.name,
            manufacturer: product.manufacturer,
            contactName: product.manufacturer.contact.name,
            contactPhone: product.manufacturer.contact.phone,
            contactEmail: product.manufacturer.contact.email,
            amountInStock: product.amountInStock
        }));
    },
    
    // Query to get all manufacturers (unique manufacturers from the products list)
    manufacturers: async () => {
        const products = await Product.find().populate('manufacturer');
        const manufacturers = products.map(product => product.manufacturer);
        return [...new Map(manufacturers.map(m => [m.name, m])).values()]; // Deduplicate manufacturers by name
    },

    // Mutation to add a new product
    addProduct: async ({ name, sku, description, price, category, manufacturer, amountInStock }) => {
        let manufacturerDoc = await Manufacturer.findOne({ name: manufacturer.name });
        
        // Create manufacturer if it doesn't exist
        if (!manufacturerDoc) {
            manufacturerDoc = new Manufacturer(manufacturer);
            await manufacturerDoc.save();
        }

        const product = new Product({
            name,
            sku,
            description,
            price,
            category,
            manufacturer: manufacturerDoc._id, // Reference manufacturer by ID
            amountInStock
        });

        return await product.save();
    },
    
    // Mutation to update an existing product
    updateProduct: async ({ id, name, sku, description, price, category, manufacturer, amountInStock }) => {
        const product = await Product.findById(id);
        if (!product) throw new Error('Product not found');

        // Update manufacturer if provided
        if (manufacturer) {
            let manufacturerDoc = await Manufacturer.findOne({ name: manufacturer.name });
            if (!manufacturerDoc) {
                manufacturerDoc = new Manufacturer(manufacturer);
                await manufacturerDoc.save();
            }
            product.manufacturer = manufacturerDoc._id; // Update manufacturer reference
        }

        if (name) product.name = name;
        if (sku) product.sku = sku;
        if (description) product.description = description;
        if (price) product.price = price;
        if (category) product.category = category;
        if (amountInStock) product.amountInStock = amountInStock;

        return await product.save();
    },
    
    // Mutation to delete a product
    deleteProduct: async ({ id }) => {
        const product = await Product.findById(id);
        if (!product) throw new Error('Product not found');
        await product.remove();
        return product;
    },

    // Mutation to add a new manufacturer
    addManufacturer: async ({ name, country, website, description, address, contact }) => {
        const manufacturer = new Manufacturer({
            name,
            country,
            website,
            description,
            address,
            contact
        });

        return await manufacturer.save();
    }
};

module.exports = resolvers;
