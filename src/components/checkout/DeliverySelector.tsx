import React from 'react';
import { DeliveryMethodId } from '../../types/order';
import { DELIVERY_OPTIONS } from '../../utils/validation';
import { formatPrice } from '../../utils/formatters';
import { Check, Truck, Zap, Store } from 'lucide-react';

interface DeliverySelectorProps {
  selectedId: DeliveryMethodId;
  onChange: (id: DeliveryMethodId) => void;
  subtotal: number;
}

const ICONS_MAP: Record<DeliveryMethodId, React.ReactNode> = {
  courier: <Truck className="w-5 h-5 text-blue-500" />,
  express: <Zap className="w-5 h-5 text-amber-500" />,
  pickup: <Store className="w-5 h-5 text-emerald-500" />,
};

export const DeliverySelector: React.FC<DeliverySelectorProps> = ({
  selectedId,
  onChange,
  subtotal,
}) => {
  return (
    <div className="space-y-3">
      {DELIVERY_OPTIONS.map((option) => {
        const isSelected = selectedId === option.id;
        const isFree = option.id === 'pickup' || (option.id === 'courier' && subtotal >= 50000);
        const actualPrice = isFree ? 0 : option.price;

        return (
          <div
            key={option.id}
            onClick={() => onChange(option.id)}
            className={`p-4 rounded-2xl border cursor-pointer transition-all ${
              isSelected
                ? 'bg-blue-50/60 dark:bg-blue-950/20 border-blue-500 shadow-xs'
                : 'bg-white dark:bg-[#111317] border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 shrink-0 mt-0.5">
                  {ICONS_MAP[option.id]}
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-zinc-900 dark:text-white">
                    {option.name}
                  </h4>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-0.5">
                    Срок: {option.estimatedTime}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    {option.description}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className={`text-sm font-bold ${actualPrice === 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-900 dark:text-white'}`}>
                  {actualPrice === 0 ? 'Бесплатно' : formatPrice(actualPrice)}
                </span>
                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center mt-2 ml-auto shadow-xs">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
