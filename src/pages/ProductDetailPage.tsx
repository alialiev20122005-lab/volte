import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS, CATEGORIES_INFO } from '../services/productsData';
import { formatPrice } from '../utils/formatters';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { ProductCard } from '../components/product/ProductCard';
import {
  Heart,
  ShoppingBag,
  Check,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Minus,
  Plus,
  ArrowLeft,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart, isInCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const product = PRODUCTS.find((p) => p.id === id);

  // States
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedNotice, setAddedNotice] = useState<boolean>(false);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      }
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="py-20 text-center max-w-md mx-auto px-4">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
          Товар не найден
        </h2>
        <p className="text-xs text-zinc-500 mb-6">
          Возможно, товар был перемещен или ссылка устарела.
        </p>
        <Link
          to="/catalog"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Вернуться в каталог</span>
        </Link>
      </div>
    );
  }

  const favorite = isFavorite(product.id);
  const inCart = isInCart(product.id);
  const categoryInfo = CATEGORIES_INFO.find((c) => c.id === product.category);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  // Related products from the same category
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mb-8 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
            Главная
          </Link>
          <span>/</span>
          <Link to="/catalog" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
            Каталог
          </Link>
          <span>/</span>
          <Link
            to={`/catalog?category=${product.category}`}
            className="hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            {categoryInfo?.name || product.category}
          </Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-white font-medium truncate max-w-xs">
            {product.name}
          </span>
        </nav>

        {/* Main Product Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-white dark:bg-[#111317] border border-zinc-200 dark:border-zinc-800 flex items-center justify-center p-6 shadow-sm">
              <img
                src={selectedImage || product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-2xl"
              />

              {product.isNew && (
                <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                  Новинка
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {product.gallery.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 p-1 bg-white dark:bg-zinc-900 transition-all ${
                      selectedImage === img
                        ? 'border-blue-500 shadow-sm'
                        : 'border-zinc-200 dark:border-zinc-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Превью ${idx + 1}`} className="w-full h-full object-cover rounded-lg" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details & Actions */}
          <div className="lg:col-span-5 flex flex-col">
            
            {/* Brand & Reviews */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs uppercase tracking-widest font-bold text-blue-600 dark:text-blue-400">
                {product.brand}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-amber-500">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-zinc-900 dark:text-white">{product.rating}</span>
                <span className="text-zinc-400">({product.reviewCount} отзывов)</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-white leading-tight mb-3">
              {product.name}
            </h1>

            {/* Short description */}
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Price Box */}
            <div className="p-5 rounded-2xl bg-zinc-100/60 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-zinc-950 dark:text-white">
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-sm text-zinc-400 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  В наличии в демонстрационном каталоге
                </span>
              </div>
            </div>

            {/* Color variants selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <span className="text-xs font-semibold text-zinc-900 dark:text-white block mb-2">
                  Цвет: <strong className="text-blue-500">{selectedColor}</strong>
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                        selectedColor === color
                          ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-semibold'
                          : 'border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="flex items-center gap-4 mb-6">
              
              {/* Quantity Selector */}
              <div className="flex items-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30 transition-colors"
                  aria-label="Уменьшить количество"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-xs font-bold text-zinc-900 dark:text-white min-w-[36px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                  aria-label="Увеличить количество"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-bold text-xs hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-md group"
              >
                {addedNotice ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Добавлено в корзину!</span>
                  </>
                ) : inCart ? (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Добавить еще (+{quantity})</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Добавить в корзину</span>
                  </>
                )}
              </button>

              {/* Favorite Button */}
              <button
                onClick={() => toggleFavorite(product)}
                className={`p-3.5 rounded-xl border transition-all ${
                  favorite
                    ? 'bg-rose-50 border-rose-200 text-rose-500 dark:bg-rose-950/40 dark:border-rose-900/60'
                    : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
                title={favorite ? 'Удалить из избранного' : 'В избранное'}
                aria-label="В избранное"
              >
                <Heart className={`w-5 h-5 ${favorite ? 'fill-rose-500' : ''}`} />
              </button>
            </div>

            {/* Perks list */}
            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6 space-y-3">
              <div className="flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-400">
                <Truck className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Бесплатная курьерская доставка при заказе от 50 000 ₽</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-400">
                <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0" />
                <span>2 года премиальной гарантии и сертифицированное обслуживание</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-400">
                <RotateCcw className="w-4 h-4 text-blue-500 shrink-0" />
                <span>30 дней на возврат и обмен без лишних формальностей</span>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications & Full Description */}
        <div className="mt-16 pt-12 border-t border-zinc-200 dark:border-zinc-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Description */}
            <div className="lg:col-span-6">
              <h3 className="text-xl font-bold text-zinc-950 dark:text-white mb-4">
                Описание устройства
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>

            {/* Specs Table */}
            <div className="lg:col-span-6">
              <h3 className="text-xl font-bold text-zinc-950 dark:text-white mb-4">
                Технические характеристики
              </h3>
              <div className="divide-y divide-zinc-200 dark:divide-zinc-800 border-y border-zinc-200 dark:border-zinc-800">
                {product.specs.map((spec, idx) => (
                  <div key={idx} className="py-3 flex justify-between gap-4 text-xs">
                    <span className="text-zinc-500 dark:text-zinc-400 font-medium">
                      {spec.name}
                    </span>
                    <span className="text-zinc-900 dark:text-white font-semibold text-right">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-zinc-200 dark:border-zinc-800">
            <h3 className="text-2xl font-bold text-zinc-950 dark:text-white mb-6">
              Вам также может понравиться
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
