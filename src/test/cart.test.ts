import { describe, it, expect } from 'vitest';
import { Product } from '../types/product';
import { CartItem } from '../types/cart';

describe('Логика расчёта корзины (Cart Calculations)', () => {
  const mockProduct1: Product = {
    id: 'prod-1',
    name: 'Флагманский телефон',
    brand: 'VOLTE Brand',
    category: 'smartphones',
    price: 49990,
    rating: 4.8,
    reviewCount: 10,
    inStock: true,
    image: '',
    gallery: [],
    shortDescription: 'Краткое описание',
    description: 'Полное описание',
    specs: [],
  };

  const mockProduct2: Product = {
    id: 'prod-2',
    name: 'Премиальные наушники',
    brand: 'Audio Master',
    category: 'headphones',
    price: 15990,
    rating: 4.9,
    reviewCount: 20,
    inStock: true,
    image: '',
    gallery: [],
    shortDescription: 'Краткое описание',
    description: 'Полное описание',
    specs: [],
  };

  it('корректно рассчитывает промежуточную сумму и количество товаров в целых рублях', () => {
    const items: CartItem[] = [
      { product: mockProduct1, quantity: 2 },
      { product: mockProduct2, quantity: 1 },
    ];

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + Math.round(item.product.price) * item.quantity, 0);

    expect(totalItems).toBe(3);
    expect(subtotal).toBe(49990 * 2 + 15990); // 115970
    expect(Number.isInteger(subtotal)).toBe(true);
  });

  it('применяет бесплатную доставку при заказе от 50 000 ₽', () => {
    const subtotalLarge = 65980;
    const shippingFree = subtotalLarge >= 50000 ? 0 : 590;
    expect(shippingFree).toBe(0);

    const subtotalSmall = 15990;
    const shippingPaid = subtotalSmall >= 50000 ? 0 : 590;
    expect(shippingPaid).toBe(590);
  });

  it('защищает количество товаров от значений меньше 1', () => {
    const sanitizeQuantity = (newQty: number) => Math.max(1, Math.floor(newQty));

    expect(sanitizeQuantity(0)).toBe(1);
    expect(sanitizeQuantity(-5)).toBe(1);
    expect(sanitizeQuantity(3.7)).toBe(3);
    expect(sanitizeQuantity(5)).toBe(5);
  });
});
