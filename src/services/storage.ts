/**
 * Safe local storage service with error handling and fallback support
 */
export const storage = {
  get<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue;
    try {
      const item = window.localStorage.getItem(key);
      if (item === null || item === undefined || item === 'undefined') {
        return defaultValue;
      }
      const parsed = JSON.parse(item);

      // Validate that if defaultValue is an array, parsed must also be an array
      if (Array.isArray(defaultValue) && !Array.isArray(parsed)) {
        console.warn(`[storage] Key "${key}" expected an Array, but found:`, typeof parsed);
        return defaultValue;
      }

      // Validate object types
      if (
        defaultValue !== null &&
        typeof defaultValue === 'object' &&
        !Array.isArray(defaultValue) &&
        (typeof parsed !== 'object' || Array.isArray(parsed) || parsed === null)
      ) {
        console.warn(`[storage] Key "${key}" expected an Object, but found:`, typeof parsed);
        return defaultValue;
      }

      return (parsed ?? defaultValue) as T;
    } catch (error) {
      console.warn(`[storage] Error reading key "${key}":`, error);
      return defaultValue;
    }
  },

  set<T>(key: string, value: T): boolean {
    if (typeof window === 'undefined') return false;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn(`[storage] Error saving key "${key}":`, error);
      return false;
    }
  },

  remove(key: string): boolean {
    if (typeof window === 'undefined') return false;
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn(`[storage] Error removing key "${key}":`, error);
      return false;
    }
  },

  clear(): boolean {
    if (typeof window === 'undefined') return false;
    try {
      window.localStorage.clear();
      return true;
    } catch (error) {
      console.warn('[storage] Error clearing localStorage:', error);
      return false;
    }
  }
};

export const STORAGE_KEYS = {
  CART: 'volte_cart_v1',
  FAVORITES: 'volte_favorites_v1',
  THEME: 'volte_theme_v1',
  ORDERS: 'volte_demo_orders_v1',
} as const;
