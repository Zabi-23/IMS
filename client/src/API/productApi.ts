import axios from "axios";
import { Product } from "../types";

const API_BASE_URL = "http://localhost:3000";

// Function to create a new product.
export const createProduct = async (productData: Product) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/product/`, productData);
    return response.data;
  } catch (error: Error | any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Error creating product. Please try again.");
    }
  }
};

// Function to get all products with pagination.
export const fetchProducts = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/product/?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Function to get a specific product by ID.
export const fetchProductById = async (productId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/product/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}:`, error);
    throw error;
  }
};

// Function to update a product by ID.
export const updateProduct = async (
  productId: string,
  productData: Product
) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/product/${productId}`,
      productData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating product with ID ${productId}:`, error);
    throw error;
  }
};

// Function to delete a product by ID.
export const deleteProduct = async (productId: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/product/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting product with ID ${productId}:`, error);
    throw error;
  }
};

// Function to delete all products.
export const deleteAllProducts = async () => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/product/`);
    return response.data;
  } catch (error) {
    console.error("Error deleting all products:", error);
    throw error;
  }
};

// Function to get products with low stock
export const fetchLowStockProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/product/low-stock`);
    return response.data;
  } catch (error) {
    console.error("Error fetching low stock products:", error);
    throw error;
  }
};

// Function to get products with critical stock
export const fetchCriticalStockProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/product/critical-stock`);
    return response.data;
  } catch (error) {
    console.error("Error fetching critical stock products:", error);
    throw error;
  }
};

// Function to get total stock value
export const fetchTotalStockValue = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/product/total-stock-value`
    );
    return response.data.totalStockValue;
  } catch (error) {
    console.error("Error fetching total stock value:", error);
    throw error;
  }
};

// Function to get all manufacturers
export const fetchManufacturers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/product/manufacturers`);
    return response.data;
  } catch (error) {
    console.error("Error fetching manufacturers:", error);
    throw error;
  }
};

// Function to get total stock value by manufacturer
export const fetchTotalStockValueByManufacturer = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/product/total-stock-value-by-manufacturer`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching total stock value by manufacturer:", error);
    throw error;
  }
};
