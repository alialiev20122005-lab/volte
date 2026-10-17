import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Check, Star } from 'lucide-react';
import { Product } from '../../types/product';
import { formatPrice } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode = 'grid' }) => {
  const { addToCart, isInCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const favorite = isFavorite(product.id);
  const inCart = isInCart(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product);
  };

  if (viewMode === 'list') {
    return (
      <article className="group relative bg-white dark:bg-[#111317] rounded-2xl border border-zinc-200 dark:border-zinc-800/80 p-4 transition-all duration-300 hover:shadow-premium hover:dark:shadow-premium-dark flex flex-col sm:flex-row items-center gap-6">
        
        {/* Image Container */}
        <Link 
          to={`/product/${product.id}`}
          className="relative w-full sm:w-56 h-48 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 shrink-0 flex items-center justify-center p-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label={`Перейти к карточке товара ${product.name}`}
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          {product.isNew && (
            <span className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
              Новинка
            </span>
          )}
        </Link>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between w-full h-full">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs uppercase tracking-wider font-semibold text-blue-600 dark:text-blue-400">
                {product.brand}
              </span>
              <div className="flex items-center gap-1 text-xs text-amber-500">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{product.rating}</span>
                <span className="text-zinc-400">({product.reviewCount})</span>
              </div>
            </div>

            <Link 
              to={`/product/${product.id}`} 
              className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md"
            >
              <h3 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-1">
                {product.name}
              </h3>
            </Link>

            <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
              {product.shortDescription}
            </p>

            {/* Quick Specs Chips */}
            <div className="mt-3 flex flex-wrap gap-2">
              {product.specs.slice(0, 3).map((spec, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center text-[11px] px-2.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/40"
                >
                  <strong className="font-medium mr-1 text-zinc-500">{spec.name}:</strong> {spec.value}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-zinc-950 dark:text-white">
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-xs text-zinc-400 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </div>
              <span className={`text-[11px] font-medium block mt-0.5 ${product.inStock ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-400'}`}>
                {product.inStock ? 'В наличии в демо-каталоге' : 'Под заказ'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleFavorite}
                className={`p-2.5 rounded-xl border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  favorite
                    ? 'bg-rose-50 border-rose-200 text-rose-500 dark:bg-rose-950/40 dark:border-rose-900/60'
                    : 'border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800/80'
                }`}
                title={favorite ? 'Удалить из избранного' : 'Добавить в избранное'}
                aria-label={favorite ? `Удалить ${product.name} из избранного` : `Добавить ${product.name} в избранное`}
              >
                <Heart className={`w-4 h-4 ${favorite ? 'fill-rose-500' : ''}`} />
              </button>

              <button
                onClick={handleAddToCart}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  inCart
                    ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900'
                    : 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-100 shadow-sm'
                }`}
                aria-label={inCart ? `Товар ${product.name} уже в корзине` : `Добавить ${product.name} в корзину`}
              >
                {inCart ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>В корзине</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>В корзину</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Default: Grid view mode
  return (
    <article className="group relative bg-white dark:bg-[#111317] rounded-2xl border border-zinc-200/90 dark:border-zinc-800/80 p-4 transition-all duration-300 hover:shadow-premium hover:dark:shadow-premium-dark flex flex-col justify-between">
      
      {/* Top badges & Favorite button */}
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center p-3 mb-4">
        <Link 
          to={`/product/${product.id}`} 
          className="block w-full h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
          aria-label={`Перейти к товару ${product.name}`}
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 pointer-events-none">
          {product.isNew && (
            <span className="bg-blue-600 text-white text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm">
              Новинка
            </span>
          )}
          {product.oldPrice && (
            <span className="bg-rose-500 text-white text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm">
              Выгода {formatPrice(product.oldPrice - product.price)}
            </span>
          )}
        </div>

        {/* Favorite toggle button */}
        <button
          onClick={handleToggleFavorite}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
            favorite
              ? 'bg-rose-50/90 text-rose-500 dark:bg-rose-950/80 shadow-sm'
              : 'bg-white/80 dark:bg-zinc-900/80 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white shadow-sm'
          }`}
          title={favorite ? 'Удалить из избранного' : 'Добавить в избранное'}
          aria-label={favorite ? `Удалить ${product.name} из избранного` : `Добавить ${product.name} в избранное`}
        >
          <Heart className={`w-4 h-4 ${favorite ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>
      </div>

      {/* Info details */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-blue-600 dark:text-blue-400">
            {product.brand}
          </span>
          <div className="flex items-center gap-1 text-[11px] text-amber-500">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" aria-hidden="true" />
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">{product.rating}</span>
          </div>
        </div>

        <Link 
          to={`/product/${product.id}`} 
          className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md mb-1.5"
        >
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>

        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-3">
          {product.shortDescription}
        </p>

        {/* Key spec highlight */}
        <div className="mt-auto mb-4 py-1.5 px-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/50 dark:border-zinc-800/50 text-[11px] text-zinc-600 dark:text-zinc-400 truncate">
          <span className="font-medium text-zinc-500 dark:text-zinc-400">{product.specs[0]?.name}:</span> {product.specs[0]?.value}
        </div>

        {/* Price & Cart button */}
        <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-zinc-950 dark:text-white">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-[10px] text-zinc-400 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 block">
              В наличии
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className={`flex items-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
              inCart
                ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900'
                : 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-100 shadow-sm'
            }`}
            title={inCart ? 'Товар уже в корзине' : 'Добавить в корзину'}
            aria-label={inCart ? `Товар ${product.name} уже в корзине` : `Добавить ${product.name} в корзину`}
          >
            {inCart ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">В корзине</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>В корзину</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
