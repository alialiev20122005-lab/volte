import { CartItem } from './cart';

export type DeliveryMethodId = 'courier' | 'pickup' | 'express';

export interface DeliveryOption {
  id: DeliveryMethodId;
  name: string;
  price: number;
  estimatedTime: string;
  description: string;
}

export interface CustomerInfo {
  fullName: string;
  phone: string;
  email: string;
  deliveryMethod: DeliveryMethodId;
  city: string;
  address: string;
  apartment?: string;
  comment?: string;
}

export interface Order {
  id: string; // e.g. VOLTE-2026-89412
  createdAt: string; // ISO date string
  items: CartItem[];
  customer: CustomerInfo;
  subtotal: number;
  deliveryPrice: number;
  total: number;
  isDemo: true;
}
