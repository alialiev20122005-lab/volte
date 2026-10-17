import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem } from '../../types/cart';
import { formatPrice } from '../../utils/formatters';

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (productId: string, quantity: number, selectedColor?: string) => void;
  onRemove: (productId: string, selectedColor?: string) => void;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  const { product, quantity, selectedColor } = item;
  const lineTotal = Math.round(product.price) * quantity;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 py-5 border-b border-zinc-200 dark:border-zinc-800 last:border-b-0">
      
      {/* Product Image */}
      <Link
        to={`/product/${product.id}`}
        className="w-24 h-24 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shrink-0 p-2 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        aria-label={`Перейти к товару ${product.name}`}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </Link>

      {/* Details */}
      <div className="flex-1 w-full text-center sm:text-left">
        <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400">
          {product.brand}
        </span>
        <Link
          to={`/product/${product.id}`}
          className="block font-semibold text-sm sm:text-base text-zinc-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md"
        >
          {product.name}
        </Link>
        {selectedColor && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Цвет: <span className="font-medium text-zinc-700 dark:text-zinc-300">{selectedColor}</span>
          </p>
        )}
        <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 mt-1">
          {formatPrice(product.price)} / шт.
        </p>
      </div>

      {/* Quantity Controls & Remove */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
        
        {/* Counter */}
        <div className="flex items-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-1">
          <button
            onClick={() => onUpdateQuantity(product.id, Math.max(1, quantity - 1), selectedColor)}
            disabled={quantity <= 1}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30 disabled:hover:text-zinc-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            title="Уменьшить количество"
            aria-label={`Уменьшить количество для ${product.name}`}
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          
          <span 
            className="px-3 text-xs font-bold text-zinc-900 dark:text-white min-w-[32px] text-center"
            aria-label={`Количество: ${quantity}`}
          >
            {quantity}
          </span>

          <button
            onClick={() => onUpdateQuantity(product.id, quantity + 1, selectedColor)}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            title="Увеличить количество"
            aria-label={`Увеличить количество для ${product.name}`}
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Line Total */}
        <div className="text-right min-w-[100px]">
          <span className="text-sm sm:text-base font-bold text-zinc-950 dark:text-white block">
            {formatPrice(lineTotal)}
          </span>
        </div>

        {/* Remove Button */}
        <button
          onClick={() => onRemove(product.id, selectedColor)}
          className="p-2 rounded-xl text-zinc-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
          title="Удалить товар из корзины"
          aria-label={`Удалить ${product.name} из корзины`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
