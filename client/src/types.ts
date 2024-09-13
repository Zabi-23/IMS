export interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  amountInStock: number;
  sku: string;
  category: string;
  manufacturer: {
    name: string;
    country: string;
    website: string;
    description: string;
    address: string;
    contact: {
      name: string;
      email: string;
      phone: string;
    };
  };
}

export interface Manufacturer {
  _id?: string;
  name: string;
  country: string;
  website: string;
  description: string;
  address: string;
  contact: {
    name: string;
    email: string;
    phone: string;
  };
}
