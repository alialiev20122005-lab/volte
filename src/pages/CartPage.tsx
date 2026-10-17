import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItemRow } from '../components/cart/CartItemRow';
import { CartSummary } from '../components/cart/CartSummary';
import { ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react';

export const CartPage: React.FC = () => {
  const { items, totals, updateQuantity, removeFromCart, clearCart } = useCart();

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Title */}
        <div className="mb-8">
          <div className="text-xs text-zinc-500 mb-2">
            <Link to="/" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              Главная
            </Link>
            <span className="mx-2">/</span>
            <span className="text-zinc-900 dark:text-white font-medium">Корзина</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-3xl font-extrabold text-zinc-950 dark:text-white">
              Корзина покупок
            </h1>
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-rose-500 transition-colors self-start sm:self-auto"
                title="Очистить все товары из корзины"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Очистить корзину</span>
              </button>
            )}
          </div>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Items List */}
            <div className="lg:col-span-8 bg-white dark:bg-[#111317] rounded-3xl border border-zinc-200 dark:border-zinc-800/80 p-6 sm:p-8 shadow-sm">
              <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {items.map((item, index) => (
                  <CartItemRow
                    key={`${item.product.id}-${item.selectedColor || index}`}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                  />
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                <Link
                  to="/catalog"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                >
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                  <span>Продолжить покупки</span>
                </Link>
                <span className="text-xs text-zinc-400">
                  Всего товаров: {totals.totalItems} шт.
                </span>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4">
              <CartSummary totals={totals} showCheckoutButton={true} />
            </div>
          </div>
        ) : (
          <div className="text-center py-20 px-4 rounded-3xl bg-white dark:bg-[#111317] border border-zinc-200 dark:border-zinc-800 max-w-2xl mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white mb-2">
              Корзина пуста
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto mb-8 leading-relaxed">
              В вашей корзине пока нет товаров. Перейдите в каталог флагманских устройств, чтобы выбрать подходящее устройство.
            </p>
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-semibold text-xs hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-md"
            >
              <span>Перейти в каталог</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
