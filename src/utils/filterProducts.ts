import { Product, ProductFilterState } from '../types/product';

export function filterAndSortProducts(
  products: Product[],
  filter: ProductFilterState
): Product[] {
  let result = [...products];

  // 1. Filter by category
  if (filter.category !== 'all') {
    result = result.filter(p => p.category === filter.category);
  }

  // 2. Filter by search query (name, brand, description, category)
  if (filter.searchQuery.trim()) {
    const q = filter.searchQuery.toLowerCase().trim();
    result = result.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }

  // 3. Filter by price range
  if (typeof filter.minPrice === 'number' && !isNaN(filter.minPrice)) {
    result = result.filter(p => p.price >= filter.minPrice);
  }
  if (typeof filter.maxPrice === 'number' && !isNaN(filter.maxPrice)) {
    result = result.filter(p => p.price <= filter.maxPrice);
  }

  // 4. Filter by in stock only
  if (filter.onlyInStock) {
    result = result.filter(p => p.inStock);
  }

  // 5. Sorting
  switch (filter.sortBy) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'name-asc':
      result.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
      break;
    case 'newest':
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      break;
    case 'popular':
    default:
      // Sort by rating & review count & featured
      result.sort((a, b) => {
        const scoreA = (a.isFeatured ? 100 : 0) + a.rating * 10 + a.reviewCount;
        const scoreB = (b.isFeatured ? 100 : 0) + b.rating * 10 + b.reviewCount;
        return scoreB - scoreA;
      });
      break;
  }

  return result;
}
