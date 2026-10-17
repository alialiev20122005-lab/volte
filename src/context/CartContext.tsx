import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, CartTotals } from '../types/cart';
import { Product } from '../types/product';
import { storage, STORAGE_KEYS } from '../services/storage';

interface CartContextType {
  items: CartItem[];
  totals: CartTotals;
  addToCart: (product: Product, quantity?: number, selectedColor?: string) => void;
  removeFromCart: (productId: string, selectedColor?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedColor?: string) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  getItemCount: (productId: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const loaded = storage.get<CartItem[]>(STORAGE_KEYS.CART, []);
    return Array.isArray(loaded) ? loaded : [];
  });

  // Save to localStorage whenever items change
  useEffect(() => {
    storage.set(STORAGE_KEYS.CART, items);
  }, [items]);

  const addToCart = (product: Product, quantity = 1, selectedColor?: string) => {
    const safeQty = Math.max(1, Math.floor(quantity));
    // Determine effective color ahead of time
    const effectiveColor =
      selectedColor ||
      (product.colors && product.colors.length > 0 ? product.colors[0] : undefined);

    setItems((prevItems) => {
      const safeItems = Array.isArray(prevItems) ? prevItems : [];
      const existingIndex = safeItems.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === effectiveColor
      );

      if (existingIndex > -1) {
        const next = [...safeItems];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + safeQty,
        };
        return next;
      }

      return [
        ...safeItems,
        {
          product,
          quantity: safeQty,
          selectedColor: effectiveColor,
        },
      ];
    });
  };

  const removeFromCart = (productId: string, selectedColor?: string) => {
    setItems((prevItems) => {
      if (!Array.isArray(prevItems)) return [];
      return prevItems.filter(
        (item) =>
          !(
            item.product.id === productId &&
            (selectedColor === undefined || item.selectedColor === selectedColor)
          )
      );
    });
  };

  const updateQuantity = (productId: string, quantity: number, selectedColor?: string) => {
    const safeQty = Math.max(1, Math.floor(quantity));
    setItems((prevItems) => {
      if (!Array.isArray(prevItems)) return [];
      return prevItems.map((item) => {
        if (
          item.product.id === productId &&
          (selectedColor === undefined || item.selectedColor === selectedColor)
        ) {
          return { ...item, quantity: safeQty };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const isInCart = (productId: string): boolean => {
    if (!Array.isArray(items)) return false;
    return items.some((item) => item.product.id === productId);
  };

  const getItemCount = (productId: string): number => {
    if (!Array.isArray(items)) return 0;
    return items
      .filter((item) => item.product.id === productId)
      .reduce((sum, item) => sum + item.quantity, 0);
  };

  // Safe calculations: 100% integer math
  const safeItems = Array.isArray(items) ? items : [];
  const totalItems = safeItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = safeItems.reduce(
    (sum, item) => sum + Math.round(item.product.price) * item.quantity,
    0
  );
  // Free delivery for orders over 50 000 ₽ or 0 for empty cart
  const shipping = subtotal === 0 ? 0 : subtotal >= 50000 ? 0 : 590;
  const discount = 0;
  const total = subtotal + shipping - discount;

  const totals: CartTotals = {
    totalItems,
    subtotal,
    shipping,
    discount,
    total,
  };

  return (
    <CartContext.Provider
      value={{
        items: safeItems,
        totals,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
