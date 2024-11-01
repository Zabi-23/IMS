
# Industry Management System (IMS)

## Overview

The Industry Management System (IMS) is a project designed to manage product and manufacturer data using two different API architectures: a RESTful API and a GraphQL API. This system allows users to perform CRUD (Create, Read, Update, Delete) operations on products, manufacturers, and their contacts while interacting with a MongoDB database.

### Objectives

- Implement a RESTful API and a GraphQL API for managing an Industry Management System.
- Facilitate user interactions with nested documents in MongoDB.
- Compare and understand the differences between REST and GraphQL APIs.

## Features

### RESTful API
- **Endpoints**:
  - `GET /api/products`: Retrieve a list of all products, including their manufacturer and contact details.
  - `GET /api/products/:id`: Retrieve details of a specific product by ID.
  - `POST /api/products`: Create a new product entry.
  - `PUT /api/products/:id`: Update an existing product by ID.
  - `DELETE /api/products/:id`: Delete a product entry by ID.
  - `GET /api/products/total-stock-value`: Summarize the total value of all products in stock.
  - `GET /api/products/total-stock-value-by-manufacturer`: Summarize total stock value by manufacturer.
  - `GET /api/products/low-stock`: Retrieve products with less than 10 units in stock.
  - `GET /api/products/critical-stock`: Compact list of products with less than 5 items in stock.
  - `GET /api/manufacturers`: List all manufacturers the company works with.

### GraphQL API
- **Queries**:
  - `products`: List all products.
  - `product(id: ID!)`: Get details of a product by ID.
  - `totalStockValue`: Total value of all products in stock.
  - `totalStockValueByManufacturer`: Grouped stock value by manufacturer.
  - `lowStockProducts`: Products with less than 10 units in stock.
  - `criticalStockProducts`: Compact list of products with less than 5 units in stock.
  - `manufacturers`: List of all manufacturers.

- **Mutations**:
  - `addProduct`: Create a new product.
  - `updateProduct`: Update an existing product by ID.
  - `deleteProduct`: Delete a product by ID.

## Technologies Used
- **Backend Framework**: Node.js, Express
- **Database**: MongoDB
- **ODM**: Mongoose
- **API Technologies**: RESTful API, GraphQL
- **Development Tools**: Concurrently, Nodemon, Vite

## Getting Started

### Prerequisites
- Node.js and npm installed on your machine.
- MongoDB account and connection string.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/IMS.git
   cd IMS
   ```

2. Install dependencies for both the server and client:
   ```bash
   npm install
   cd client
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```plaintext
   DATABASE=mongodb+srv://<username>:<password>@cluster.your.mongodb.net/IMS?retryWrites=true&w=majority
   PORT=4000
   ```

4. Start the application using:
   ```bash
   npm start
   ```

### Running the APIs
The application uses `concurrently` to run both the RESTful API, GraphQL API, and the client simultaneously. The server will be accessible on the following ports:
- REST API: `http://localhost:3000/api`
- GraphQL API: `http://localhost:4000/graphql`
- Client: `http://localhost:5173`

## Testing the API
- Use tools like Postman or GraphQL Playground to test the APIs.
- For RESTful API, test endpoints using GET, POST, PUT, DELETE methods.
- For GraphQL, use queries and mutations to interact with the GraphQL endpoint.

## Bonus Features
- Random test data generation for populating the database.
- Pagination and filtering for the GraphQL API.
- Validation and error handling for enhanced user experience.

## Contribution
Feel free to fork the repository and submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.

## Acknowledgements
Special thanks to all team members who contributed to this project.

