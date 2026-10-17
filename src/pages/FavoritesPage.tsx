import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/product/ProductCard';
import { Heart, Trash2, ShoppingBag, ArrowRight, Check } from 'lucide-react';

export const FavoritesPage: React.FC = () => {
  const { favorites, clearFavorites, totalFavorites } = useFavorites();
  const { addToCart } = useCart();
  const [addedAllNotice, setAddedAllNotice] = useState(false);

  const handleAddAllToCart = () => {
    favorites.forEach((product) => {
      addToCart(product, 1);
    });
    setAddedAllNotice(true);
    setTimeout(() => setAddedAllNotice(false), 2500);
  };

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumbs & Title */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-2" aria-label="Хлебные крошки">
            <Link to="/" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              Главная
            </Link>
            <span>/</span>
            <span className="text-zinc-900 dark:text-white font-medium">Избранное</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-zinc-950 dark:text-white">
                Избранные товары
              </h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Список сохраненных вами устройств ({totalFavorites} шт.)
              </p>
            </div>

            {totalFavorites > 0 && (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleAddAllToCart}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  {addedAllNotice ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Все товары добавлены!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Добавить все в корзину</span>
                    </>
                  )}
                </button>
                <button
                  onClick={clearFavorites}
                  className="inline-flex items-center gap-1.5 p-2 text-xs text-zinc-400 hover:text-rose-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded-lg"
                  title="Очистить список избранного"
                  aria-label="Очистить все избранные товары"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {totalFavorites > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-4 rounded-3xl bg-white dark:bg-[#111317] border border-zinc-200 dark:border-zinc-800 max-w-2xl mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white mb-2">
              Избранное пока пусто
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto mb-8 leading-relaxed">
              Отмечайте понравившиеся товары сердечком, чтобы вернуться к ним позже или сравнить характеристики.
            </p>
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-semibold text-xs hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-md group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <span>В каталог товаров</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
