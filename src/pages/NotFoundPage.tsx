import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="py-24 text-center max-w-lg mx-auto px-4">
      <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 flex items-center justify-center mx-auto mb-6">
        <AlertCircle className="w-8 h-8 text-blue-500" />
      </div>
      <span className="text-4xl font-black text-zinc-900 dark:text-white tracking-widest block mb-2">
        404
      </span>
      <h1 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
        Страница не найдена
      </h1>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed">
        Запрашиваемый адрес не существует или был перемещен. Воспользуйтесь навигацией сайта или перейдите в каталог.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          to="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>На главную страницу</span>
        </Link>
        <Link
          to="/catalog"
          className="w-full sm:w-auto px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
        >
          Каталог товаров
        </Link>
      </div>
    </div>
  );
};
