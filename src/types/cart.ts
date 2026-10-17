import { Product } from './product';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface CartTotals {
  totalItems: number;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
}
