const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const dotenv = require("dotenv");
const ProductModel = require("../db/models/product");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<db_PASSWORD>",
  process.env.DATABASE_PASSWORD
).replace("<db_NAME>", process.env.DB_NAME);

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected to MongoDB");
    generateTestData();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

async function generateTestData() {
  try {
    await ProductModel.deleteMany({});

    const manufacturers = [];
    for (let i = 0; i < 150; i++) {
      const contact = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
      };

      const manufacturer = {
        name: faker.company.name(),
        country: faker.location.country(),
        website: faker.internet.url(),
        description: faker.lorem.sentence(),
        address: faker.location.streetAddress(),
        contact: contact,
      };

      manufacturers.push(manufacturer);
    }

    const products = [];
    for (let i = 0; i < 1000; i++) {
      const product = {
        name: faker.commerce.productName(),
        sku: faker.number.int(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        category: faker.commerce.department(),
        manufacturer: manufacturers[faker.number.int({ min: 0, max: 149 })],
        amountInStock: faker.number.int({ min: 0, max: 1000 }),
      };

      products.push(product);
    }

    await ProductModel.insertMany(products);
    console.log("Test data generated successfully");
  } catch (error) {
    console.error("Error generating test data:", error);
  } finally {
    mongoose.connection.close();
  }
}
