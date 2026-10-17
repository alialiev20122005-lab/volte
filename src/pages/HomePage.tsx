import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { CategoryCards } from '../components/home/CategoryCards';
import { FeaturedSection } from '../components/home/FeaturedSection';
import { NewArrivalsSection } from '../components/home/NewArrivalsSection';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <HeroSection />

      {/* Categories */}
      <CategoryCards />

      {/* Featured / Popular */}
      <FeaturedSection />

      {/* Brand Aesthetic Banner */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-950 to-black text-white p-8 sm:p-14 border border-zinc-800 shadow-2xl">
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30 lg:opacity-50 pointer-events-none hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80"
                alt="MacBook Pro"
                className="w-full h-full object-cover object-left"
              />
            </div>
            
            <div className="relative max-w-xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-semibold mb-4 border border-blue-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Философия VOLTÉ</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                Техника, вдохновляющая на великие идеи
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 mb-8 leading-relaxed">
                Каждый предмет в нашем каталоге отобран вручную экспертами цифровой индустрии. Мы ценим чистоту линий, тактильное благородство материалов и максимальную производительность без компромиссов.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/catalog"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-zinc-950 font-bold text-xs hover:bg-zinc-100 transition-colors shadow-lg"
                >
                  <span>Исследовать всю коллекцию</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>2 года расширенной фирменной поддержки</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <NewArrivalsSection />
    </div>
  );
};
