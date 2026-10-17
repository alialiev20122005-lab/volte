import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 dark:bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/60 text-xs font-semibold text-zinc-800 dark:text-zinc-200 mb-6 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
              <span>Флагманская коллекция года</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-[1.08] mb-6">
              Технологии в{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-sky-400">
                совершенной
              </span>{' '}
              форме.
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mb-8 leading-relaxed font-normal">
              VOLTÉ объединяет передовую премиальную электронику от мировых лидеров индустрии. Минималистичный дизайн, бескомпромиссная надежность и безупречный комфорт в каждой детали.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <Link
                to="/catalog"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-semibold text-sm hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-md hover:shadow-lg group"
              >
                <span>Перейти в каталог</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/catalog?filter=featured"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold text-sm hover:bg-zinc-200/60 dark:hover:bg-zinc-800/80 transition-all"
              >
                Популярные устройства
              </Link>
            </div>

            {/* Mini Trust Stats */}
            <div className="mt-12 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80 grid grid-cols-3 gap-6 sm:gap-8 w-full">
              <div>
                <div className="flex items-center gap-1.5 text-zinc-900 dark:text-white font-bold text-lg sm:text-xl">
                  <ShieldCheck className="w-4 h-4 text-blue-500" />
                  <span>100%</span>
                </div>
                <p className="text-xs text-zinc-500 mt-0.5">Оригинальные устройства</p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-zinc-900 dark:text-white font-bold text-lg sm:text-xl">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>3 часа</span>
                </div>
                <p className="text-xs text-zinc-500 mt-0.5">Экспресс-доставка</p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-zinc-900 dark:text-white font-bold text-lg sm:text-xl">
                  <span>24 / 7</span>
                </div>
                <p className="text-xs text-zinc-500 mt-0.5">Консьерж-сервис</p>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Product Frame */}
              <div className="relative rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-900 shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1200&q=85"
                  alt="Флагманский смартфон VOLTÉ"
                  className="w-full h-[440px] sm:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-8">
                  <span className="text-blue-400 text-xs font-semibold tracking-wider uppercase mb-1">
                    Флагман сезона
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    Apple iPhone 16 Pro Max
                  </h3>
                  <p className="text-xs text-zinc-300 max-w-sm mb-4">
                    Корпус из титана Grade 5, инновационный чип A18 Pro и управление камерой Camera Control.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-white">
                      169 990 ₽
                    </span>
                    <Link
                      to="/product/iphone-16-pro-max"
                      className="px-4 py-2 rounded-xl bg-white text-zinc-950 font-semibold text-xs hover:bg-zinc-200 transition-colors shadow-sm"
                    >
                      Подробнее
                    </Link>
                  </div>
                </div>
              </div>

              {/* Floating feature card */}
              <div className="absolute -bottom-6 -left-4 sm:-left-8 p-4 rounded-2xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 shadow-xl hidden sm:flex items-center gap-3 max-w-xs">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white">Премиум-качество</h4>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Гарантия подлинности на каждое устройство в магазине</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
