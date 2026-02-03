import { createContext } from "react";
import type { Product, CartItem } from "../types";

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);
