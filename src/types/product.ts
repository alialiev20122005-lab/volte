export type ProductCategory = 
  | 'smartphones'
  | 'laptops'
  | 'headphones'
  | 'tablets'
  | 'gaming'
  | 'accessories';

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  description: string;
  iconName: string;
}

export interface ProductSpec {
  name: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  price: number; // in whole Russian Rubles (e.g. 129990)
  oldPrice?: number;
  rating: number; // e.g. 4.9
  reviewCount: number;
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  image: string;
  gallery: string[];
  shortDescription: string;
  description: string;
  specs: ProductSpec[];
  colors?: string[];
}

export type SortOption = 
  | 'popular' 
  | 'price-asc' 
  | 'price-desc' 
  | 'newest' 
  | 'name-asc';

export interface ProductFilterState {
  category: ProductCategory | 'all';
  searchQuery: string;
  minPrice: number;
  maxPrice: number;
  sortBy: SortOption;
  onlyInStock: boolean;
}
