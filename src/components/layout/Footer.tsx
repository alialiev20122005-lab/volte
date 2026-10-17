import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, Headphones, RotateCcw } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-[#07080a] text-zinc-600 dark:text-zinc-400 text-sm transition-colors mt-auto">
      
      {/* Advantages strip */}
      <div className="border-b border-zinc-200 dark:border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-blue-500 shadow-sm shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">Гарантия качества</h4>
                <p className="text-xs text-zinc-500">Только оригинальная флагманская техника</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-blue-500 shadow-sm shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">Премиальная доставка</h4>
                <p className="text-xs text-zinc-500">Собственная курьерская служба</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-blue-500 shadow-sm shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">Персональный консьерж</h4>
                <p className="text-xs text-zinc-500">Экспертная поддержка по всем устройствам</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-blue-500 shadow-sm shrink-0">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">30 дней на возврат</h4>
                <p className="text-xs text-zinc-500">Беспроблемный обмен и возврат</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand info */}
          <div className="md:col-span-1">
            <span className="text-2xl font-black tracking-widest uppercase text-zinc-900 dark:text-white">
              VOLT<span className="text-blue-500">É</span>
            </span>
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Технологии в совершенной форме. Премиальный магазин электроники с безупречным вниманием к деталям.
            </p>
            <div className="mt-4 p-3 rounded-xl bg-zinc-200/50 dark:bg-zinc-900/50 border border-zinc-300/50 dark:border-zinc-800/50 text-[11px] text-zinc-500 leading-tight">
              Демонстрационный концепт интернет-магазина. Все торговые марки принадлежат их законным правообладателям.
            </div>
          </div>

          {/* Catalog categories */}
          <div>
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4 text-xs tracking-wider uppercase">
              Категории
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/catalog?category=smartphones" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
                  Смартфоны
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=laptops" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
                  Ноутбуки
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=headphones" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
                  Наушники
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=tablets" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
                  Планшеты
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=gaming" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
                  Игровые устройства
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=accessories" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
                  Аксессуары
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4 text-xs tracking-wider uppercase">
              Навигация
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
                  Главная страница
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
                  Полный каталог
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
                  Избранные товары
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
                  Корзина покупок
                </Link>
              </li>
            </ul>
          </div>

          {/* Demo Contacts */}
          <div>
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4 text-xs tracking-wider uppercase">
              Демо-контакты
            </h4>
            <div className="space-y-2.5 text-xs text-zinc-500">
              <p>
                <span className="text-zinc-700 dark:text-zinc-300 font-medium block">Демонстрационная горячая линия:</span>
                8 (800) 000-00-00 (демо-режим)
              </p>
              <p>
                <span className="text-zinc-700 dark:text-zinc-300 font-medium block">Электронная почта:</span>
                concierge@volte-demo.store
              </p>
              <p>
                <span className="text-zinc-700 dark:text-zinc-300 font-medium block">Флагманский бутик (демо):</span>
                Москва, Театральный проезд, д. 2
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright & legal disclaimer */}
        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} VOLTÉ. Демонстрационный проект интернет-магазина техники.</p>
          <p className="text-center sm:text-right text-[11px]">
            Не является офертой. Платежи и реальные отправления не осуществляются.
          </p>
        </div>
      </div>
    </footer>
  );
};
