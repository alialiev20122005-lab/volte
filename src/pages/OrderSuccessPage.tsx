import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { Order } from '../types/order';
import { storage, STORAGE_KEYS } from '../services/storage';
import { formatPrice, formatDate } from '../utils/formatters';
import { CheckCircle2, ArrowRight, Truck, Phone, Mail, User } from 'lucide-react';

export const OrderSuccessPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const location = useLocation();

  // Try to read order from location state or from localStorage
  const stateOrder = location.state?.order as Order | undefined;
  const storedOrders = storage.get<Order[]>(STORAGE_KEYS.ORDERS, []);
  const order = stateOrder || storedOrders.find((o) => o.id === orderId);

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Success Card */}
        <div className="bg-white dark:bg-[#111317] rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 sm:p-12 shadow-sm text-center">
          
          {/* Animated check circle */}
          <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <span className="inline-block text-xs uppercase font-bold tracking-widest text-emerald-600 dark:text-emerald-400 mb-2">
            Заказ успешно оформлен
          </span>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-white mb-2">
            Благодарим за выбор VOLTÉ
          </h1>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-mono font-bold text-zinc-800 dark:text-zinc-200 my-3">
            <span>Номер заказа:</span>
            <span className="text-blue-500">{orderId || order?.id || 'VOLTE-DEMO'}</span>
          </div>

          {/* Prominent Demo Disclaimer */}
          <div className="my-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 text-left">
            <strong className="block font-semibold mb-1">
              Демонстрационный статус заказа:
            </strong>
            Заказ сохранен исключительно в локальной памяти вашего браузера для демонстрации интерфейса интернет-магазина. Реальная доставка и списание средств не производятся.
          </div>

          {order && (
            <div className="text-left mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800">
              
              <h3 className="text-base font-bold text-zinc-950 dark:text-white mb-4">
                Детали заказа
              </h3>

              {/* Items List */}
              <div className="space-y-3 mb-6 divide-y divide-zinc-100 dark:divide-zinc-800/80">
                {order.items.map((item, idx) => (
                  <div key={idx} className="pt-3 first:pt-0 flex items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-10 h-10 object-cover rounded-lg bg-zinc-100 dark:bg-zinc-900 shrink-0"
                      />
                      <div>
                        <span className="font-semibold text-zinc-900 dark:text-white block">
                          {item.product.name}
                        </span>
                        <span className="text-zinc-400 text-[11px]">
                          {item.quantity} шт. {item.selectedColor ? `(Цвет: ${item.selectedColor})` : ''}
                        </span>
                      </div>
                    </div>
                    <span className="font-bold text-zinc-900 dark:text-white shrink-0">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Customer and Delivery info summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 text-xs mb-6">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-zinc-500">
                    <User className="w-3.5 h-3.5 text-blue-500" />
                    <span>Получатель:</span>
                    <strong className="text-zinc-900 dark:text-white">{order.customer.fullName}</strong>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-500">
                    <Phone className="w-3.5 h-3.5 text-blue-500" />
                    <span>Телефон:</span>
                    <strong className="text-zinc-900 dark:text-white">{order.customer.phone}</strong>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-500">
                    <Mail className="w-3.5 h-3.5 text-blue-500" />
                    <span>Email:</span>
                    <strong className="text-zinc-900 dark:text-white">{order.customer.email}</strong>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-zinc-500">
                    <Truck className="w-3.5 h-3.5 text-blue-500" />
                    <span>Доставка:</span>
                    <strong className="text-zinc-900 dark:text-white">
                      {order.customer.deliveryMethod === 'pickup'
                        ? 'Самовывоз из бутика'
                        : order.customer.deliveryMethod === 'express'
                        ? 'Экспресс за 3 часа'
                        : 'Курьерская доставка'}
                    </strong>
                  </div>
                  {order.customer.deliveryMethod !== 'pickup' && (
                    <div className="text-zinc-500">
                      <span>Адрес: </span>
                      <strong className="text-zinc-900 dark:text-white">
                        {order.customer.city}, {order.customer.address}
                        {order.customer.apartment ? `, ${order.customer.apartment}` : ''}
                      </strong>
                    </div>
                  )}
                  <div className="text-zinc-400 text-[11px] pt-1">
                    Дата создания: {formatDate(order.createdAt)}
                  </div>
                </div>
              </div>

              {/* Total Row */}
              <div className="flex items-baseline justify-between pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <span className="text-sm font-bold text-zinc-900 dark:text-white">
                  Итоговая сумма заказа:
                </span>
                <span className="text-2xl font-black text-zinc-950 dark:text-white">
                  {formatPrice(order.total)}
                </span>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/catalog"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-md group"
            >
              <span>Продолжить покупки в каталоге</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
            >
              На главную страницу
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
