import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Sun, Moon, Menu, X, ArrowRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { formatPrice } from '../../utils/formatters';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { totals } = useCart();
  const { totalFavorites } = useFavorites();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/85 dark:bg-[#090A0C]/85 border-b border-zinc-200/80 dark:border-zinc-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo */}
          <Link 
            to="/" 
            className="flex flex-col group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg p-1"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-widest uppercase text-zinc-900 dark:text-white font-sans">
                VOLT<span className="text-blue-500">É</span>
              </span>
            </div>
            <span className="text-[10px] tracking-wider text-zinc-400 dark:text-zinc-500 font-medium uppercase transition-colors group-hover:text-blue-500">
              Технологии в совершенной форме
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/')
                  ? 'text-zinc-950 dark:text-white bg-zinc-100 dark:bg-zinc-800/60'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900'
              }`}
            >
              Главная
            </Link>
            <Link
              to="/catalog"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/catalog')
                  ? 'text-zinc-950 dark:text-white bg-zinc-100 dark:bg-zinc-800/60'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900'
              }`}
            >
              Каталог
            </Link>
          </nav>

          {/* Search bar */}
          <form 
            onSubmit={handleSearchSubmit}
            className="hidden sm:flex relative flex-1 max-w-xs lg:max-w-md mx-2"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск товаров (например, iPhone, M3, Sony)..."
              className="w-full bg-zinc-100 dark:bg-zinc-900/90 text-zinc-900 dark:text-zinc-100 text-sm pl-10 pr-4 py-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 transition-all placeholder:text-zinc-400"
            />
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5 pointer-events-none" />
            {searchQuery && (
              <button
                type="submit"
                className="absolute right-2 top-2 p-1 text-zinc-400 hover:text-blue-500 transition-colors"
                title="Искать"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </form>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              title={theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'}
              aria-label="Переключение темы оформления"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400 hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-5 h-5 text-zinc-700 hover:-rotate-12 transition-transform" />
              )}
            </button>

            {/* Favorites Icon */}
            <Link
              to="/favorites"
              className="relative p-2.5 rounded-full text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              title="Избранное"
              aria-label={`Избранное, товаров: ${totalFavorites}`}
            >
              <Heart className={`w-5 h-5 ${totalFavorites > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {totalFavorites > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[11px] font-bold text-white bg-rose-500 rounded-full shadow-sm animate-in fade-in zoom-in duration-200">
                  {totalFavorites}
                </span>
              )}
            </Link>

            {/* Cart Icon & Total */}
            <Link
              to="/cart"
              className="flex items-center gap-2.5 py-1.5 px-3 rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-white transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              title="Корзина"
              aria-label={`Корзина, товаров: ${totals.totalItems}`}
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {totals.totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-2 flex items-center justify-center min-w-[16px] h-[16px] px-1 text-[10px] font-bold text-white bg-blue-600 rounded-full">
                    {totals.totalItems}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-semibold tracking-tight">
                {totals.subtotal > 0 ? formatPrice(totals.subtotal) : 'Корзина'}
              </span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Открыть мобильное меню"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="sm:hidden pb-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск товаров..."
              className="w-full bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm pl-10 pr-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-2.5 pointer-events-none" />
          </form>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-[#090A0C]/95 backdrop-blur-xl animate-in slide-in-from-top-2 duration-200">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-3 rounded-xl text-base font-medium flex items-center justify-between ${
                isActive('/')
                  ? 'bg-zinc-100 dark:bg-zinc-800 text-blue-600 dark:text-blue-400'
                  : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900'
              }`}
            >
              Главная
              <ArrowRight className="w-4 h-4 text-zinc-400" />
            </Link>
            <Link
              to="/catalog"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-3 rounded-xl text-base font-medium flex items-center justify-between ${
                isActive('/catalog')
                  ? 'bg-zinc-100 dark:bg-zinc-800 text-blue-600 dark:text-blue-400'
                  : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900'
              }`}
            >
              Каталог товаров
              <ArrowRight className="w-4 h-4 text-zinc-400" />
            </Link>
            <Link
              to="/favorites"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-xl text-base font-medium flex items-center justify-between text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900"
            >
              <span>Избранное</span>
              <span className="text-sm font-semibold text-rose-500">{totalFavorites}</span>
            </Link>
            <Link
              to="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-xl text-base font-medium flex items-center justify-between text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900"
            >
              <span>Корзина</span>
              <span className="text-sm font-semibold text-blue-500">{totals.totalItems} шт.</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
