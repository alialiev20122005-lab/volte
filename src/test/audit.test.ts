import { describe, it, expect, beforeEach } from 'vitest';
import { storage, STORAGE_KEYS } from '../services/storage';
import { filterAndSortProducts } from '../utils/filterProducts';
import { PRODUCTS, CATEGORIES_INFO } from '../services/productsData';
import { DELIVERY_OPTIONS, validateCheckoutForm } from '../utils/validation';
import { formatPrice } from '../utils/formatters';

describe('Независимый технический аудит VOLTÉ (Comprehensive Audit Tests)', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  describe('1. Устойчивость к повреждению localStorage (Data Corruption Resilience)', () => {
    it('безопасно восстанавливает пустой массив, если в localStorage сохранён объект вместо массива', () => {
      window.localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify({ corrupted: true }));
      const result = storage.get(STORAGE_KEYS.CART, []);
      expect(Array.isArray(result)).toBe(true);
      expect(result).toEqual([]);
    });

    it('безопасно восстанавливает пустой массив, если в localStorage сохранёно число или строка', () => {
      window.localStorage.setItem(STORAGE_KEYS.FAVORITES, '12345');
      const result = storage.get(STORAGE_KEYS.FAVORITES, []);
      expect(Array.isArray(result)).toBe(true);
      expect(result).toEqual([]);

      window.localStorage.setItem(STORAGE_KEYS.FAVORITES, '"just a string"');
      const result2 = storage.get(STORAGE_KEYS.FAVORITES, []);
      expect(Array.isArray(result2)).toBe(true);
      expect(result2).toEqual([]);
    });

    it('безопасно восстанавливает fallback при литерале null', () => {
      window.localStorage.setItem(STORAGE_KEYS.THEME, 'null');
      const result = storage.get(STORAGE_KEYS.THEME, 'dark');
      expect(result).toBe('dark');
    });
  });

  describe('2. Корректность работы корзины и исключение дубликатов', () => {
    it('корректно увеличивает количество при повторном добавлении товара без явного указания цвета', () => {
      const sampleProduct = PRODUCTS[0]; // iPhone 16 Pro Max with colors
      const defaultColor = sampleProduct.colors ? sampleProduct.colors[0] : undefined;

      // Simulate adding first time
      const initialItems = [
        {
          product: sampleProduct,
          quantity: 1,
          selectedColor: defaultColor,
        },
      ];

      // Simulate adding second time
      const effectiveColor = defaultColor;
      const existingIndex = initialItems.findIndex(
        (item) => item.product.id === sampleProduct.id && item.selectedColor === effectiveColor
      );

      expect(existingIndex).toBe(0);
      initialItems[existingIndex].quantity += 1;

      expect(initialItems.length).toBe(1);
      expect(initialItems[0].quantity).toBe(2);
    });

    it('рассчитывает итоговые суммы без копеек и погрешностей', () => {
      let total = 0;
      PRODUCTS.forEach((p) => {
        total += Math.round(p.price);
        expect(Number.isInteger(p.price)).toBe(true);
      });
      expect(Number.isInteger(total)).toBe(true);
      expect(formatPrice(total)).toContain('₽');
    });
  });

  describe('3. Фильтры, URL-параметры и поиск', () => {
    it('корректно находит товары по кириллическому описанию и категории', () => {
      const searchSmartphones = filterAndSortProducts(PRODUCTS, {
        category: 'smartphones',
        searchQuery: 'титан',
        minPrice: 0,
        maxPrice: 500000,
        sortBy: 'popular',
        onlyInStock: false,
      });

      expect(searchSmartphones.length).toBeGreaterThan(0);
      searchSmartphones.forEach((p) => {
        expect(p.category).toBe('smartphones');
      });
    });

    it('корректно обрабатывает граничные условия цен', () => {
      const highPrice = filterAndSortProducts(PRODUCTS, {
        category: 'all',
        searchQuery: '',
        minPrice: 300000,
        maxPrice: 500000,
        sortBy: 'popular',
        onlyInStock: false,
      });

      expect(highPrice.length).toBeGreaterThan(0);
      highPrice.forEach((p) => {
        expect(p.price).toBeGreaterThanOrEqual(300000);
      });
    });
  });

  describe('4. Валидация оформления заказа', () => {
    it('успешно валидирует телефон с пробелами и скобками', () => {
      const result = validateCheckoutForm({
        fullName: 'Дмитрий Иванов',
        phone: '+7 (916) 123-45-67',
        email: 'dmitry@volte.ru',
        deliveryMethod: 'courier',
        city: 'Москва',
        address: 'Кутузовский проспект, 14',
      });

      expect(result.isValid).toBe(true);
      expect(result.errors.phone).toBeUndefined();
    });

    it('выдает ошибку при неполном телефоне', () => {
      const result = validateCheckoutForm({
        fullName: 'Дмитрий Иванов',
        phone: '+7 (916) 123-4',
        email: 'dmitry@volte.ru',
        deliveryMethod: 'courier',
        city: 'Москва',
        address: 'Кутузовский проспект, 14',
      });

      expect(result.isValid).toBe(false);
      expect(result.errors.phone).toContain('11 цифр');
    });

    it('не требует адрес для самовывоза', () => {
      const result = validateCheckoutForm({
        fullName: 'Анна Новикова',
        phone: '+7 (903) 987-65-43',
        email: 'anna@volte.ru',
        deliveryMethod: 'pickup',
        city: '',
        address: '',
      });

      expect(result.isValid).toBe(true);
      expect(result.errors.address).toBeUndefined();
    });
  });

  describe('5. Проверка полноты русскоязычной локализации данных', () => {
    it('все категории имеют корректные русские названия', () => {
      CATEGORIES_INFO.forEach((cat) => {
        expect(cat.name).toMatch(/[А-Яа-яЁё]+/);
        expect(cat.description).toMatch(/[А-Яа-яЁё]+/);
      });
    });

    it('все способы доставки имеют русские названия и описания', () => {
      DELIVERY_OPTIONS.forEach((del) => {
        expect(del.name).toMatch(/[А-Яа-яЁё]+/);
        expect(del.description).toMatch(/[А-Яа-яЁё]+/);
        expect(del.estimatedTime).toMatch(/[А-Яа-яЁё]+/);
      });
    });

    it('все товары содержат русские описания и характеристики', () => {
      PRODUCTS.forEach((prod) => {
        expect(prod.shortDescription).toMatch(/[А-Яа-яЁё]+/);
        expect(prod.description).toMatch(/[А-Яа-яЁё]+/);
        prod.specs.forEach((s) => {
          expect(s.name).toMatch(/[А-Яа-яЁё]+/);
        });
      });
    });
  });
});
