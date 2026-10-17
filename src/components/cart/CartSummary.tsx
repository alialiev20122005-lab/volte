import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { CartTotals } from '../../types/cart';
import { formatPrice } from '../../utils/formatters';

interface CartSummaryProps {
  totals: CartTotals;
  showCheckoutButton?: boolean;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  totals,
  showCheckoutButton = true,
}) => {
  const isFreeDelivery = totals.subtotal >= 50000;

  return (
    <div className="bg-white dark:bg-[#111317] rounded-2xl border border-zinc-200 dark:border-zinc-800/80 p-6 shadow-sm sticky top-28 transition-colors">
      <h3 className="text-base font-bold text-zinc-950 dark:text-white mb-4">
        Сумма заказа
      </h3>

      <div className="space-y-3 text-xs border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-4">
        <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
          <span>Товары ({totals.totalItems} шт.):</span>
          <span className="font-semibold text-zinc-900 dark:text-white">{formatPrice(totals.subtotal)}</span>
        </div>

        <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
          <span className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-blue-500" />
            Доставка курьером:
          </span>
          <span className={`font-semibold ${isFreeDelivery ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-900 dark:text-white'}`}>
            {isFreeDelivery ? 'Бесплатно' : formatPrice(totals.shipping)}
          </span>
        </div>

        {!isFreeDelivery && totals.subtotal > 0 && (
          <p className="text-[11px] text-zinc-400 leading-tight">
            Добавьте товаров еще на {formatPrice(50000 - totals.subtotal)} для бесплатной курьерской доставки.
          </p>
        )}
      </div>

      <div className="flex justify-between items-baseline mb-6">
        <span className="text-sm font-bold text-zinc-900 dark:text-white">Итого к оплате:</span>
        <span className="text-2xl font-black text-zinc-950 dark:text-white">
          {formatPrice(totals.total)}
        </span>
      </div>

      {showCheckoutButton && (
        <Link
          to="/checkout"
          className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-semibold text-sm hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-md group"
        >
          <span>Перейти к оформлению</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}

      <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center gap-2 text-[11px] text-zinc-400">
        <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
        <span>Официальная гарантия и безопасный сервис обслуживания</span>
      </div>
    </div>
  );
};
