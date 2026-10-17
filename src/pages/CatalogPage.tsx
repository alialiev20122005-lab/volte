import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ProductFilterState, ProductCategory, SortOption } from '../types/product';
import { PRODUCTS } from '../services/productsData';
import { filterAndSortProducts } from '../utils/filterProducts';
import { ProductCard } from '../components/product/ProductCard';
import { ProductFilter } from '../components/product/ProductFilter';
import { PackageSearch, RotateCcw } from 'lucide-react';

export const CatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Parse initial filters from URL params
  const parseFiltersFromUrl = (): ProductFilterState => {
    const category = (searchParams.get('category') as ProductCategory) || 'all';
    const searchQuery = searchParams.get('q') || '';
    const filterParam = searchParams.get('filter');
    let sortBy = (searchParams.get('sort') as SortOption) || 'popular';

    if (filterParam === 'newest') {
      sortBy = 'newest';
    } else if (filterParam === 'featured') {
      sortBy = 'popular';
    }

    return {
      category,
      searchQuery,
      minPrice: 0,
      maxPrice: 500000,
      sortBy,
      onlyInStock: false,
    };
  };

  const [filter, setFilter] = useState<ProductFilterState>(parseFiltersFromUrl);

  // Keep state synced with URL query changes (e.g. user back/forward navigation or search from header)
  useEffect(() => {
    const updatedFromUrl = parseFiltersFromUrl();
    setFilter((prev) => ({
      ...prev,
      category: updatedFromUrl.category,
      searchQuery: updatedFromUrl.searchQuery,
      sortBy: updatedFromUrl.sortBy,
    }));
  }, [searchParams]);

  const handleFilterChange = (next: Partial<ProductFilterState>) => {
    setFilter((prev) => {
      const updated = { ...prev, ...next };

      // Sync relevant filter states into URL params for shareable URLs
      const newParams = new URLSearchParams();
      if (updated.category !== 'all') {
        newParams.set('category', updated.category);
      }
      if (updated.searchQuery.trim()) {
        newParams.set('q', updated.searchQuery.trim());
      }
      if (updated.sortBy !== 'popular') {
        newParams.set('sort', updated.sortBy);
      }
      setSearchParams(newParams, { replace: true });

      return updated;
    });
  };

  const handleReset = () => {
    setFilter({
      category: 'all',
      searchQuery: '',
      minPrice: 0,
      maxPrice: 500000,
      sortBy: 'popular',
      onlyInStock: false,
    });
    setSearchParams({}, { replace: true });
  };

  // Compute filtered & sorted products
  const filteredProducts = useMemo(() => {
    return filterAndSortProducts(PRODUCTS, filter);
  }, [filter]);

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumbs & Title */}
        <div className="mb-6">
          <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-2" aria-label="Хлебные крошки">
            <Link to="/" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              Главная
            </Link>
            <span>/</span>
            <span className="text-zinc-900 dark:text-white font-medium">Каталог</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-white">
            Каталог премиальной техники
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-2xl">
            Ознакомьтесь с полным собранием флагманских гаджетов, аудиосистем и аксессуаров.
          </p>
        </div>

        {/* Filter Bar Component */}
        <ProductFilter
          filter={filter}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
          totalFound={filteredProducts.length}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* Products List or Empty State */}
        {filteredProducts.length > 0 ? (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
                : 'flex flex-col gap-4'
            }
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} viewMode={viewMode} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-4 rounded-3xl bg-white dark:bg-[#111317] border border-zinc-200 dark:border-zinc-800">
            <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 flex items-center justify-center mx-auto mb-4">
              <PackageSearch className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
              Товары не найдены
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-md mx-auto mt-2 leading-relaxed">
              По вашему запросу ничего не найдено. Попробуйте изменить параметры фильтрации или очистить строку поиска.
            </p>
            <button
              onClick={handleReset}
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Сбросить все фильтры</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
