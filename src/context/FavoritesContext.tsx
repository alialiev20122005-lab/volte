import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../types/product';
import { storage, STORAGE_KEYS } from '../services/storage';

interface FavoritesContextType {
  favorites: Product[];
  totalFavorites: number;
  toggleFavorite: (product: Product) => void;
  removeFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Product[]>(() => {
    const loaded = storage.get<Product[]>(STORAGE_KEYS.FAVORITES, []);
    return Array.isArray(loaded) ? loaded : [];
  });

  useEffect(() => {
    storage.set(STORAGE_KEYS.FAVORITES, favorites);
  }, [favorites]);

  const toggleFavorite = (product: Product) => {
    setFavorites((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      const exists = safePrev.some((item) => item.id === product.id);
      if (exists) {
        return safePrev.filter((item) => item.id !== product.id);
      }
      return [...safePrev, product];
    });
  };

  const removeFavorite = (productId: string) => {
    setFavorites((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      return safePrev.filter((item) => item.id !== productId);
    });
  };

  const isFavorite = (productId: string): boolean => {
    if (!Array.isArray(favorites)) return false;
    return favorites.some((item) => item.id === productId);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const safeFavorites = Array.isArray(favorites) ? favorites : [];

  return (
    <FavoritesContext.Provider
      value={{
        favorites: safeFavorites,
        totalFavorites: safeFavorites.length,
        toggleFavorite,
        removeFavorite,
        isFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
