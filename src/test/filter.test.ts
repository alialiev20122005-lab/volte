import { describe, it, expect } from 'vitest';
import { filterAndSortProducts } from '../utils/filterProducts';
import { Product, ProductFilterState } from '../types/product';

const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'Apple iPhone 16 Pro',
    brand: 'Apple',
    category: 'smartphones',
    price: 139990,
    rating: 4.9,
    reviewCount: 30,
    inStock: true,
    isNew: true,
    image: '',
    gallery: [],
    shortDescription: 'Титановый флагман',
    description: 'Описание телефона',
    specs: [],
  },
  {
    id: 'p2',
    name: 'Sony WH-1000XM5',
    brand: 'Sony',
    category: 'headphones',
    price: 36990,
    rating: 4.8,
    reviewCount: 50,
    inStock: true,
    isFeatured: true,
    image: '',
    gallery: [],
    shortDescription: 'Шумоподавление',
    description: 'Наушники с отличным звуком',
    specs: [],
  },
  {
    id: 'p3',
    name: 'MacBook Air 15 M3',
    brand: 'Apple',
    category: 'laptops',
    price: 179990,
    rating: 5.0,
    reviewCount: 15,
    inStock: false,
    image: '',
    gallery: [],
    shortDescription: 'Тонкий ноутбук',
    description: 'Apple ноутбук',
    specs: [],
  },
];

describe('Фильтрация и сортировка товаров (Filter and Sort Logic)', () => {
  it('фильтрует товары по категории', () => {
    const filter: ProductFilterState = {
      category: 'smartphones',
      searchQuery: '',
      minPrice: 0,
      maxPrice: 500000,
      sortBy: 'popular',
      onlyInStock: false,
    };

    const result = filterAndSortProducts(mockProducts, filter);
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('p1');
  });

  it('ищет товары по поисковому запросу без учета регистра', () => {
    const filter: ProductFilterState = {
      category: 'all',
      searchQuery: 'sony',
      minPrice: 0,
      maxPrice: 500000,
      sortBy: 'popular',
      onlyInStock: false,
    };

    const result = filterAndSortProducts(mockProducts, filter);
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('p2');
  });

  it('фильтрует по диапазону цен', () => {
    const filter: ProductFilterState = {
      category: 'all',
      searchQuery: '',
      minPrice: 30000,
      maxPrice: 150000,
      sortBy: 'popular',
      onlyInStock: false,
    };

    const result = filterAndSortProducts(mockProducts, filter);
    expect(result.length).toBe(2); // Sony (36990) and iPhone (139990)
    expect(result.some((p) => p.id === 'p3')).toBe(false); // MacBook (179990) excluded
  });

  it('фильтрует товары только в наличии', () => {
    const filter: ProductFilterState = {
      category: 'all',
      searchQuery: '',
      minPrice: 0,
      maxPrice: 500000,
      sortBy: 'popular',
      onlyInStock: true,
    };

    const result = filterAndSortProducts(mockProducts, filter);
    expect(result.length).toBe(2);
    expect(result.some((p) => p.id === 'p3')).toBe(false);
  });

  it('сортирует товары по возрастанию цены', () => {
    const filter: ProductFilterState = {
      category: 'all',
      searchQuery: '',
      minPrice: 0,
      maxPrice: 500000,
      sortBy: 'price-asc',
      onlyInStock: false,
    };

    const result = filterAndSortProducts(mockProducts, filter);
    expect(result[0].price).toBe(36990);
    expect(result[2].price).toBe(179990);
  });

  it('сортирует товары по убыванию цены', () => {
    const filter: ProductFilterState = {
      category: 'all',
      searchQuery: '',
      minPrice: 0,
      maxPrice: 500000,
      sortBy: 'price-desc',
      onlyInStock: false,
    };

    const result = filterAndSortProducts(mockProducts, filter);
    expect(result[0].price).toBe(179990);
    expect(result[2].price).toBe(36990);
  });
});
