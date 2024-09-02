// graphql/schema.js
const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type Query {
        products: [Product]
        product(id: ID!): Product
        totalStockValue: Float
        totalStockValueByManufacturer: [ManufacturerStockValue]
        lowStockProducts: [Product]
        criticalStockProducts: [CriticalStockProduct]
        manufacturers: [Manufacturer]
    }

    type Mutation {
        addProduct(name: String!, sku: String!, description: String, price: Float!, category: String, manufacturer: ManufacturerInput, amountInStock: Int): Product
        updateProduct(id: ID!, name: String, sku: String, description: String, price: Float, category: String, manufacturer: ManufacturerInput, amountInStock: Int): Product
        deleteProduct(id: ID!): Product
    }

    type Product {
        id: ID!
        name: String!
        sku: String!
        description: String
        price: Float!
        category: String
        manufacturer: Manufacturer
        amountInStock: Int
    }

    type Manufacturer {
        name: String
        country: String
        website: String
        description: String
        address: String
        contact: Contact
    }

    type Contact {
        name: String
        email: String
        phone: String
    }

    type ManufacturerStockValue {
        manufacturer: Manufacturer
        totalValue: Float
    }

    type CriticalStockProduct {
        name: String
        manufacturer: Manufacturer
        contactName: String
        contactPhone: String
        contactEmail: String
        amountInStock: Int
    }

    input ManufacturerInput {
        name: String
        country: String
        website: String
        description: String
        address: String
        contact: ContactInput
    }

    input ContactInput {
        name: String
        email: String
        phone: String
    }
`);

module.exports = schema;
