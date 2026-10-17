import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CustomerInfo, DeliveryMethodId, Order } from '../types/order';
import { DELIVERY_OPTIONS, validateCheckoutForm, ValidationErrors } from '../utils/validation';
import { DeliverySelector } from '../components/checkout/DeliverySelector';
import { formatPrice, formatPhoneNumber, generateOrderId } from '../utils/formatters';
import { storage, STORAGE_KEYS } from '../services/storage';
import { ShieldCheck, Info, CheckCircle2, ArrowLeft, ShoppingBag } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { items, totals, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState<CustomerInfo>({
    fullName: '',
    phone: '',
    email: '',
    deliveryMethod: 'courier',
    city: 'Москва',
    address: '',
    apartment: '',
    comment: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If cart is empty, redirect or prompt user
  if (items.length === 0) {
    return (
      <div className="py-20 text-center max-w-md mx-auto px-4">
        <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-zinc-950 dark:text-white mb-2">
          В вашей корзине пока нет товаров
        </h2>
        <p className="text-xs text-zinc-500 mb-6">
          Чтобы оформить заказ, выберите хотя бы одно устройство в каталоге.
        </p>
        <Link
          to="/catalog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-xs font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Перейти в каталог</span>
        </Link>
      </div>
    );
  }

  // Selected delivery option
  const currentDelivery = DELIVERY_OPTIONS.find((d) => d.id === form.deliveryMethod) || DELIVERY_OPTIONS[0];
  const actualDeliveryPrice =
    form.deliveryMethod === 'pickup'
      ? 0
      : form.deliveryMethod === 'courier' && totals.subtotal >= 50000
      ? 0
      : currentDelivery.price;

  const finalTotal = totals.subtotal + actualDeliveryPrice;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setForm((prev) => ({ ...prev, phone: formatted }));
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  const handleFieldChange = (field: keyof CustomerInfo, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { isValid, errors: validationErrors } = validateCheckoutForm(form);
    if (!isValid) {
      setErrors(validationErrors);
      // Scroll to the first error smoothly
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    // Simulate short network delay for realistic experience
    setTimeout(() => {
      const orderId = generateOrderId();
      const newOrder: Order = {
        id: orderId,
        createdAt: new Date().toISOString(),
        items: [...items],
        customer: { ...form },
        subtotal: totals.subtotal,
        deliveryPrice: actualDeliveryPrice,
        total: finalTotal,
        isDemo: true,
      };

      // Save to localStorage safely
      const existingOrders = storage.get<Order[]>(STORAGE_KEYS.ORDERS, []);
      const safeOrders = Array.isArray(existingOrders) ? existingOrders : [];
      storage.set(STORAGE_KEYS.ORDERS, [newOrder, ...safeOrders]);

      // Clear shopping cart
      clearCart();

      // Navigate to order success screen
      navigate(`/order-success/${orderId}`, { state: { order: newOrder } });
    }, 600);
  };

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Title */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-2" aria-label="Хлебные крошки">
            <Link to="/cart" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              Корзина
            </Link>
            <span>/</span>
            <span className="text-zinc-900 dark:text-white font-medium">Оформление заказа</span>
          </nav>
          <h1 className="text-3xl font-extrabold text-zinc-950 dark:text-white">
            Оформление демонстрационного заказа
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Заполните данные получателя и способ доставки для подтверждения заказа.
          </p>
        </div>

        {/* Demo Alert Box */}
        <div className="mb-8 p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div className="text-xs text-blue-900 dark:text-blue-200">
            <strong className="font-semibold block mb-0.5">
              Внимание: демонстрационный режим
            </strong>
            VOLTÉ не списывает деньги с карт и не осуществляет реальных отправлений. Форма предназначена для проверки сценария оформления заказа и валидации полей интерфейса.
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Form Details */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* 1. Customer Information */}
              <div className="bg-white dark:bg-[#111317] rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-sm">
                <h3 className="text-base font-bold text-zinc-950 dark:text-white mb-4">
                  1. Контактная информация
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Full Name */}
                  <div className="sm:col-span-2">
                    <label htmlFor="customer-fullName" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Имя и фамилия покупателя <span className="text-rose-600 dark:text-rose-400">*</span>
                    </label>
                    <input
                      id="customer-fullName"
                      type="text"
                      value={form.fullName}
                      onChange={(e) => handleFieldChange('fullName', e.target.value)}
                      placeholder="Александр Смирнов"
                      aria-required="true"
                      aria-invalid={!!errors.fullName}
                      aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                      className={`w-full bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-xs px-4 py-3 rounded-xl border transition-colors focus:outline-none focus:ring-2 ${
                        errors.fullName
                          ? 'border-rose-500 focus:ring-rose-500 bg-rose-50/20'
                          : 'border-zinc-200 dark:border-zinc-800 focus:ring-blue-500'
                      }`}
                    />
                    {errors.fullName && (
                      <p id="fullName-error" className="mt-1 text-[11px] text-rose-600 dark:text-rose-400 font-medium">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="customer-phone" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Телефон для связи <span className="text-rose-600 dark:text-rose-400">*</span>
                    </label>
                    <input
                      id="customer-phone"
                      type="tel"
                      value={form.phone}
                      onChange={handlePhoneChange}
                      placeholder="+7 (999) 000-00-00"
                      aria-required="true"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                      className={`w-full bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-xs px-4 py-3 rounded-xl border transition-colors focus:outline-none focus:ring-2 ${
                        errors.phone
                          ? 'border-rose-500 focus:ring-rose-500 bg-rose-50/20'
                          : 'border-zinc-200 dark:border-zinc-800 focus:ring-blue-500'
                      }`}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="mt-1 text-[11px] text-rose-600 dark:text-rose-400 font-medium">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="customer-email" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Электронная почта <span className="text-rose-600 dark:text-rose-400">*</span>
                    </label>
                    <input
                      id="customer-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => handleFieldChange('email', e.target.value)}
                      placeholder="client@volte.ru"
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className={`w-full bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-xs px-4 py-3 rounded-xl border transition-colors focus:outline-none focus:ring-2 ${
                        errors.email
                          ? 'border-rose-500 focus:ring-rose-500 bg-rose-50/20'
                          : 'border-zinc-200 dark:border-zinc-800 focus:ring-blue-500'
                      }`}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-[11px] text-rose-600 dark:text-rose-400 font-medium">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* 2. Delivery Method */}
              <div className="bg-white dark:bg-[#111317] rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-sm">
                <h3 className="text-base font-bold text-zinc-950 dark:text-white mb-4">
                  2. Выбор способа доставки
                </h3>

                <DeliverySelector
                  selectedId={form.deliveryMethod}
                  onChange={(id: DeliveryMethodId) => handleFieldChange('deliveryMethod', id)}
                  subtotal={totals.subtotal}
                />
              </div>

              {/* 3. Address (Conditional on non-pickup) */}
              {form.deliveryMethod !== 'pickup' && (
                <div className="bg-white dark:bg-[#111317] rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-sm">
                  <h3 className="text-base font-bold text-zinc-950 dark:text-white mb-4">
                    3. Адрес доставки
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-1">
                      <label htmlFor="customer-city" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Город <span className="text-rose-600 dark:text-rose-400">*</span>
                      </label>
                      <input
                        id="customer-city"
                        type="text"
                        value={form.city}
                        onChange={(e) => handleFieldChange('city', e.target.value)}
                        placeholder="Москва"
                        aria-required="true"
                        aria-invalid={!!errors.city}
                        aria-describedby={errors.city ? 'city-error' : undefined}
                        className={`w-full bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-xs px-4 py-3 rounded-xl border transition-colors focus:outline-none focus:ring-2 ${
                          errors.city
                            ? 'border-rose-500 focus:ring-rose-500'
                            : 'border-zinc-200 dark:border-zinc-800 focus:ring-blue-500'
                        }`}
                      />
                      {errors.city && (
                        <p id="city-error" className="mt-1 text-[11px] text-rose-600 dark:text-rose-400 font-medium">
                          {errors.city}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="customer-address" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Улица, дом <span className="text-rose-600 dark:text-rose-400">*</span>
                      </label>
                      <input
                        id="customer-address"
                        type="text"
                        value={form.address}
                        onChange={(e) => handleFieldChange('address', e.target.value)}
                        placeholder="ул. Тверская, д. 12"
                        aria-required="true"
                        aria-invalid={!!errors.address}
                        aria-describedby={errors.address ? 'address-error' : undefined}
                        className={`w-full bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-xs px-4 py-3 rounded-xl border transition-colors focus:outline-none focus:ring-2 ${
                          errors.address
                            ? 'border-rose-500 focus:ring-rose-500'
                            : 'border-zinc-200 dark:border-zinc-800 focus:ring-blue-500'
                        }`}
                      />
                      {errors.address && (
                        <p id="address-error" className="mt-1 text-[11px] text-rose-600 dark:text-rose-400 font-medium">
                          {errors.address}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="customer-apartment" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Квартира / Офис (необязательно)
                      </label>
                      <input
                        id="customer-apartment"
                        type="text"
                        value={form.apartment}
                        onChange={(e) => handleFieldChange('apartment', e.target.value)}
                        placeholder="кв. 45, подъезд 2, этаж 6"
                        className="w-full bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-xs px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 4. Comments */}
              <div className="bg-white dark:bg-[#111317] rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-sm">
                <h3 className="text-base font-bold text-zinc-950 dark:text-white mb-2">
                  Пожелания к заказу
                </h3>
                <textarea
                  id="customer-comment"
                  rows={2}
                  value={form.comment}
                  onChange={(e) => handleFieldChange('comment', e.target.value)}
                  placeholder="Дополнительные инструкции для курьера или консьержа..."
                  className="w-full bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-xs px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Right Column: Order Summary & Confirmation */}
            <div className="lg:col-span-4 bg-white dark:bg-[#111317] rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-sm sticky top-28">
              <h3 className="text-base font-bold text-zinc-950 dark:text-white mb-4">
                Состав заказа ({totals.totalItems} шт.)
              </h3>

              {/* Items Mini List */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1 mb-6 divide-y divide-zinc-100 dark:divide-zinc-800/80">
                {items.map((item, idx) => (
                  <div key={idx} className="pt-2 first:pt-0 flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-lg bg-zinc-100 dark:bg-zinc-900 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-semibold text-zinc-900 dark:text-white truncate">
                        {item.product.name}
                      </h5>
                      <p className="text-[11px] text-zinc-400">
                        {item.quantity} шт. × {formatPrice(item.product.price)}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-zinc-900 dark:text-white shrink-0">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2.5 text-xs border-t border-zinc-100 dark:border-zinc-800 pt-4 mb-6">
                <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                  <span>Стоимость товаров:</span>
                  <span className="font-semibold text-zinc-900 dark:text-white">
                    {formatPrice(totals.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                  <span>Доставка:</span>
                  <span className={`font-semibold ${actualDeliveryPrice === 0 ? 'text-emerald-500' : 'text-zinc-900 dark:text-white'}`}>
                    {actualDeliveryPrice === 0 ? 'Бесплатно' : formatPrice(actualDeliveryPrice)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-zinc-100 dark:border-zinc-800 text-sm font-bold text-zinc-900 dark:text-white">
                  <span>Итого к оплате:</span>
                  <span className="text-xl font-black">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-bold text-xs hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-md disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                {isSubmitting ? (
                  <span>Формирование тестового заказа...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Подтвердить тестовый заказ</span>
                  </>
                )}
              </button>

              <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-[11px] text-zinc-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Оплата при получении после осмотра устройства</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
