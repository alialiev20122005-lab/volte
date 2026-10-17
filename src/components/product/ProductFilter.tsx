import React from 'react';
import { ProductCategory, ProductFilterState, SortOption } from '../../types/product';
import { CATEGORIES_INFO } from '../../services/productsData';
import { LayoutGrid, List, RotateCcw, SlidersHorizontal, Search, AlertCircle } from 'lucide-react';

interface ProductFilterProps {
  filter: ProductFilterState;
  onFilterChange: (next: Partial<ProductFilterState>) => void;
  onReset: () => void;
  totalFound: number;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export const ProductFilter: React.FC<ProductFilterProps> = ({
  filter,
  onFilterChange,
  onReset,
  totalFound,
  viewMode,
  onViewModeChange,
}) => {
  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'popular', label: 'По популярности' },
    { value: 'price-asc', label: 'Сначала доступные' },
    { value: 'price-desc', label: 'Сначала премиальные' },
    { value: 'newest', label: 'Новинки' },
    { value: 'name-asc', label: 'По названию (А–Я)' },
  ];

  const hasPriceInversion =
    typeof filter.minPrice === 'number' &&
    typeof filter.maxPrice === 'number' &&
    filter.minPrice > 0 &&
    filter.maxPrice > 0 &&
    filter.minPrice > filter.maxPrice;

  return (
    <div className="bg-white dark:bg-[#111317] rounded-2xl border border-zinc-200 dark:border-zinc-800/80 p-5 shadow-sm mb-8 transition-colors">
      
      {/* Category Tabs */}
      <div 
        className="flex items-center gap-2 overflow-x-auto pb-4 mb-4 border-b border-zinc-100 dark:border-zinc-800/80 no-scrollbar"
        role="tablist"
        aria-label="Категории устройств"
      >
        <button
          role="tab"
          aria-selected={filter.category === 'all'}
          onClick={() => onFilterChange({ category: 'all' })}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
            filter.category === 'all'
              ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-sm'
              : 'bg-zinc-100 dark:bg-zinc-800/70 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
          }`}
        >
          Все категории
        </button>

        {CATEGORIES_INFO.map((cat) => (
          <button
            key={cat.id}
            role="tab"
            aria-selected={filter.category === cat.id}
            onClick={() => onFilterChange({ category: cat.id as ProductCategory })}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
              filter.category === cat.id
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-sm'
                : 'bg-zinc-100 dark:bg-zinc-800/70 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Filter controls row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        
        {/* Search Input */}
        <div className="md:col-span-4 relative">
          <input
            type="text"
            value={filter.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            placeholder="Поиск товаров по каталогу..."
            aria-label="Поиск товаров по каталогу"
            className="w-full bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-xs pl-9 pr-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-zinc-400"
          />
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-3 pointer-events-none" />
        </div>

        {/* Price Inputs */}
        <div className="md:col-span-4 flex items-center gap-2">
          <span className="text-xs text-zinc-400 font-medium shrink-0">Цена:</span>
          <div className="flex items-center gap-1.5 flex-1">
            <input
              type="number"
              min={0}
              placeholder="от 0"
              aria-label="Минимальная цена"
              value={filter.minPrice || ''}
              onChange={(e) => onFilterChange({ minPrice: Math.max(0, Number(e.target.value) || 0) })}
              className="w-full bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-xs px-2.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-zinc-400 text-xs">—</span>
            <input
              type="number"
              min={0}
              placeholder="до 500 000"
              aria-label="Максимальная цена"
              value={filter.maxPrice === 500000 ? '' : filter.maxPrice}
              onChange={(e) => onFilterChange({ maxPrice: Number(e.target.value) || 500000 })}
              className="w-full bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-xs px-2.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Sort Select */}
        <div className="md:col-span-2">
          <select
            value={filter.sortBy}
            onChange={(e) => onFilterChange({ sortBy: e.target.value as SortOption })}
            className="w-full bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-xs px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Сортировка товаров"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Reset & View mode */}
        <div className="md:col-span-2 flex items-center justify-between sm:justify-end gap-2">
          <button
            onClick={onReset}
            className="p-2.5 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-1.5 text-xs font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            title="Сбросить фильтры"
            aria-label="Сбросить все фильтры"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Сбросить</span>
          </button>

          <div className="flex items-center p-1 bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
              }`}
              title="Сетка"
              aria-label="Вид сеткой"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-1.5 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
              }`}
              title="Список"
              aria-label="Вид списком"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Price Inversion Warning */}
      {hasPriceInversion && (
        <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-medium">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>Минимальная цена не может быть больше максимальной.</span>
        </div>
      )}

      {/* Counter bar */}
      <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-blue-500" />
          <span>
            Найдено товаров:{' '}
            <strong className="text-zinc-900 dark:text-zinc-100 font-semibold">{totalFound}</strong>
          </span>
        </div>

        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={filter.onlyInStock}
            onChange={(e) => onFilterChange({ onlyInStock: e.target.checked })}
            className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 dark:bg-zinc-900 dark:border-zinc-700"
          />
          <span className="text-zinc-600 dark:text-zinc-400 font-medium">Только в наличии</span>
        </label>
      </div>
    </div>
  );
};
