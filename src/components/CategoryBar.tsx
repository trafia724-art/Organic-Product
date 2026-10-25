import React from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/categories';
import {
  Sparkles,
  Scissors,
  Flower2,
  Utensils,
  Flame,
  Layers,
  Droplet,
  Home,
  HeartHandshake,
  Activity,
  ArrowRight
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-5 h-5" />,
  Scissors: <Scissors className="w-5 h-5" />,
  Flower2: <Flower2 className="w-5 h-5" />,
  Utensils: <Utensils className="w-5 h-5" />,
  Flame: <Flame className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />,
  Droplet: <Droplet className="w-5 h-5" />,
  Home: <Home className="w-5 h-5" />,
  HeartHandshake: <HeartHandshake className="w-5 h-5" />,
  Activity: <Activity className="w-5 h-5" />
};

export const CategoryBar: React.FC = () => {
  const { selectedCategory, setSelectedCategory, setCurrentView, products } = useShop();

  const handleSelectCategory = (id: string) => {
    setSelectedCategory(id);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-12 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold text-[#1a4d36] tracking-wider uppercase mb-1">
              ক্যাটাগরি অনুযায়ী ব্রাউজ করুন
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#153425]">
              প্রাকৃতিক ও ভেষজ পণ্যের বিশেষ ক্যাটাগরি
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setCurrentView('shop');
            }}
            className="flex items-center gap-1.5 text-sm font-semibold text-[#1a4d36] hover:text-[#113123] transition-colors group cursor-pointer self-start sm:self-auto"
          >
            <span>সব পণ্য একসাথে দেখুন</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 sm:gap-4">
          {CATEGORIES.map((cat) => {
            const count = products.filter((p) => p.categoryId === cat.id).length;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                className={`p-4 rounded-xl border text-left transition-all duration-200 group flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-[#183d2b] text-white border-[#183d2b] shadow-md'
                    : 'bg-[#fcfaf7] hover:bg-white text-[#2a382f] border-[#e7decfa0] hover:border-[#cfc1af] hover:shadow-sm'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors ${
                    isSelected
                      ? 'bg-white/15 text-[#b9e6c7]'
                      : 'bg-[#efe8dc] text-[#1e4d36] group-hover:bg-[#e4dcce]'
                  }`}
                >
                  {iconMap[cat.iconName] || <Sparkles className="w-5 h-5" />}
                </div>

                <div>
                  <h3
                    className={`text-sm font-semibold leading-snug line-clamp-1 ${
                      isSelected ? 'text-white' : 'text-[#183d2b] group-hover:text-[#102d1f]'
                    }`}
                  >
                    {cat.banglaName}
                  </h3>
                  <p
                    className={`text-xs mt-1 line-clamp-1 ${
                      isSelected ? 'text-white/70' : 'text-[#6b7b72]'
                    }`}
                  >
                    {count > 0 ? `${count}টি পণ্য উপলব্ধ` : 'খাঁটি কালেকশন'}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
