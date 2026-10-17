import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Laptop, Headphones, Tablet, Gamepad2, Watch, ArrowUpRight } from 'lucide-react';
import { CATEGORIES_INFO } from '../../services/productsData';

const ICONS_MAP: Record<string, React.ReactNode> = {
  Smartphone: <Smartphone className="w-6 h-6" />,
  Laptop: <Laptop className="w-6 h-6" />,
  Headphones: <Headphones className="w-6 h-6" />,
  Tablet: <Tablet className="w-6 h-6" />,
  Gamepad2: <Gamepad2 className="w-6 h-6" />,
  Watch: <Watch className="w-6 h-6" />,
};

export const CategoryCards: React.FC = () => {
  return (
    <section className="py-12 border-t border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-blue-600 dark:text-blue-400">
              Категории каталога
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-950 dark:text-white mt-1">
              Выберите категорию устройств
            </h2>
          </div>
          <Link
            to="/catalog"
            className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 transition-colors group"
          >
            <span>Смотреть все категории</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES_INFO.map((cat) => (
            <Link
              key={cat.id}
              to={`/catalog?category=${cat.id}`}
              className="group relative p-5 rounded-2xl bg-white dark:bg-[#111317] border border-zinc-200 dark:border-zinc-800/80 hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:shadow-premium hover:dark:shadow-premium-dark transition-all duration-300 flex flex-col justify-between"
            >
              <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 flex items-center justify-center mb-4">
                {ICONS_MAP[cat.iconName]}
              </div>

              <div>
                <h3 className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-1 leading-snug">
                  {cat.description}
                </p>
              </div>

              <div className="mt-4 flex items-center text-[11px] font-semibold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>В каталог</span>
                <ArrowUpRight className="w-3 h-3 ml-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
