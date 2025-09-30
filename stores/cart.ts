"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  inStock: boolean;
}

interface CartState {
  items: CartItem[];
  addItem: (product: CartItem) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  isInCart: (productId: number) => boolean;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: CartItem) => {
        const { items } = get();
        const existingItem = items.find((item) => item.id === product.id);

        if (existingItem) {
          // Update quantity if item already exists
          const updatedItems = items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + product.quantity }
              : item,
          );
          set({ items: updatedItems });
        } else {
          // Add new item to cart
          set({ items: [...items, product] });
        }
      },

      removeItem: (productId: number) => {
        const { items } = get();
        const updatedItems = items.filter((item) => item.id !== productId);
        set({ items: updatedItems });
      },

      updateQuantity: (productId: number, quantity: number) => {
        const { items } = get();

        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          get().removeItem(productId);
          return;
        }

        const updatedItems = items.map((item) =>
          item.id === productId ? { ...item, quantity } : item,
        );
        set({ items: updatedItems });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        const { items } = get();
        return items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },

      isInCart: (productId: number) => {
        const { items } = get();
        return items.some((item) => item.id === productId);
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
