import React, { useState } from 'react';
import { Info, X } from 'lucide-react';

export const DemoBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="bg-zinc-900 text-zinc-300 dark:bg-black dark:text-zinc-400 text-xs py-2 px-4 border-b border-zinc-800/80 sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <Info className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <p className="font-medium tracking-wide">
            <span className="text-white font-semibold mr-1">Демонстрационный режим:</span>
            Магазин VOLTÉ работает в ознакомительном формате. Оформление заказа не требует оплаты и не инициирует реальную доставку.
          </p>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 hover:text-white rounded-md transition-colors shrink-0 focus:outline-none focus:ring-1 focus:ring-blue-500"
          aria-label="Закрыть уведомление"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
