import type { Product, CartItem } from "../types";
import { PRODUCTS } from "../data/products";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  products: {
    getAll: async (): Promise<Product[]> => {
      await delay(800);
      return PRODUCTS;
    },

    getById: async (id: string): Promise<Product | null> => {
      await delay(500);
      return PRODUCTS.find(p => p.id === id) || null;
    },

    search: async (query: string): Promise<Product[]> => {
      await delay(300);
      if (!query.trim()) return PRODUCTS;
      
      const lowerQuery = query.toLowerCase();
      return PRODUCTS.filter(
        p =>
          p.name.toLowerCase().includes(lowerQuery) ||
          p.description.toLowerCase().includes(lowerQuery) ||
          p.merchant.toLowerCase().includes(lowerQuery)
      );
    },

    filterByPrice: async (minPrice: number, maxPrice: number): Promise<Product[]> => {
      await delay(300);
      return PRODUCTS.filter(p => p.price >= minPrice && p.price <= maxPrice);
    },
  },

  cart: {
    validateItems: async (items: CartItem[]): Promise<{
      valid: boolean;
      errors: string[];
    }> => {
      await delay(400);
      const errors: string[] = [];

      items.forEach(item => {
        const product = PRODUCTS.find(p => p.id === item.product.id);
        if (!product) {
          errors.push(`Product ${item.product.id} not found`);
        } else if (item.quantity > product.stock) {
          errors.push(`${product.name} only has ${product.stock} in stock`);
        }
      });

      return {
        valid: errors.length === 0,
        errors,
      };
    },

    calculateShipping: async (total: number): Promise<number> => {
      await delay(200);
      return total > 100 ? 0 : 10;
    },

    calculateTax: async (subtotal: number): Promise<number> => {
      await delay(150);
      return subtotal * 0.1;
    },
  },

  orders: {
    processPayment: async (formData: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      address: string;
      city: string;
      state: string;
      zipCode: string;
      cardNumber: string;
      expiryDate: string;
      cvv: string;
    }): Promise<{
      success: boolean;
      orderId?: string;
      error?: string;
    }> => {
      await delay(2000);

      if (!formData.firstName || !formData.email || !formData.address || !formData.cardNumber) {
        return {
          success: false,
          error: "Missing required fields",
        };
      }

      if (formData.cardNumber.length !== 16 || isNaN(Number(formData.cardNumber))) {
        return {
          success: false,
          error: "Invalid card number",
        };
      }

      if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
        return {
          success: false,
          error: "Invalid expiry date format",
        };
      }

      if (formData.cvv.length !== 3 || isNaN(Number(formData.cvv))) {
        return {
          success: false,
          error: "Invalid CVV",
        };
      }

      if (Math.random() < 0.9) {
        const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        return {
          success: true,
          orderId,
        };
      }

      return {
        success: false,
        error: "Payment declined. Please try again.",
      };
    },
  },
};
