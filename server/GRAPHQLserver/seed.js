const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const dotenv = require("dotenv");
const { Product } = require("./models/Product"); // Justera sökvägen om nödvändigt

dotenv.config();

const DB = process.env.DATABASE.replace(
  "<db_PASSWORD>",
  process.env.DATABASE_PASSWORD
).replace("<db_NAME>", process.env.DB_NAME);

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected to MongoDB");
    generateFakeData();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

async function generateFakeData() {
  try {
    await Product.deleteMany({}); // Radera tidigare data

    const products = [];
    for (let i = 0; i < 100; i++) {
      const manufacturer = {
        name: faker.company.name(),
        country: faker.location.country(),
        website: faker.internet.url(),
        description: faker.lorem.sentence(),
        address: faker.location.streetAddress(),
        contact: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          phone: faker.phone.number(),
        },
      };

      const product = {
        name: faker.commerce.productName(),
        sku: faker.number.int(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price()),
        category: faker.commerce.department(),
        manufacturer: manufacturer,
        amountInStock: faker.number.int({ min: 0, max: 1000 }),
      };

      products.push(product);
    }

    await Product.insertMany(products);
    console.log("Fake data generated successfully");
  } catch (error) {
    console.error("Error generating fake data:", error);
  } finally {
    mongoose.connection.close();
  }
}

