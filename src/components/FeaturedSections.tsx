import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { ArrowRight, Sparkles, TrendingUp, Tag, Clock } from 'lucide-react';

export const FeaturedSections: React.FC = () => {
  const { products, setCurrentView, setSelectedCategory } = useShop();
  const [activeTab, setActiveTab] = useState<'featured' | 'bestseller' | 'new' | 'offers'>('featured');

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'featured') return p.isFeatured;
    if (activeTab === 'bestseller') return p.isBestSeller;
    if (activeTab === 'new') return p.isNewArrival;
    if (activeTab === 'offers') return p.isSpecialOffer || (p.discountPercent && p.discountPercent > 0);
    return true;
  });

  return (
    <section className="py-16 bg-[#faf8f5] border-t border-[#ede4d7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Segmented Filter Control */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6">
          <div>
            <div className="text-xs font-semibold text-[#1a4d36] tracking-wider uppercase mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#2a7a50]" />
              <span>নির্বাচিত অর্গানিক সংগ্রহ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#143425]">
              বিশুদ্ধতা ও ঐতিহ্যের সেরা পণ্যসমূহ
            </h2>
          </div>

          {/* Interactive Segmented Tabs (Clean buttons per Section 1A) */}
          <div className="flex items-center gap-1 p-1 bg-[#eee6d9] rounded-xl self-start lg:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab('featured')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'featured'
                  ? 'bg-white text-[#153827] shadow-xs'
                  : 'text-[#4e5e54] hover:text-[#183d2c]'
              }`}
            >
              সেরা পণ্যসমূহ
            </button>
            <button
              onClick={() => setActiveTab('bestseller')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                activeTab === 'bestseller'
                  ? 'bg-white text-[#153827] shadow-xs'
                  : 'text-[#4e5e54] hover:text-[#183d2c]'
              }`}
            >
              <TrendingUp className="w-3 h-3 text-[#d97706]" />
              <span>বেস্ট সেলার</span>
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                activeTab === 'new'
                  ? 'bg-white text-[#153827] shadow-xs'
                  : 'text-[#4e5e54] hover:text-[#183d2c]'
              }`}
            >
              <Clock className="w-3 h-3 text-[#183d2c]" />
              <span>নতুন সংযোজন</span>
            </button>
            <button
              onClick={() => setActiveTab('offers')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                activeTab === 'offers'
                  ? 'bg-white text-[#153827] shadow-xs'
                  : 'text-[#4e5e54] hover:text-[#183d2c]'
              }`}
            >
              <Tag className="w-3 h-3 text-[#b45309]" />
              <span>বিশেষ ছাড় ও অফার</span>
            </button>
          </div>
        </div>

        {/* 3-4 Column Product Grid adhering to e-commerce guidelines */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA to shop catalog */}
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              setSelectedCategory('all');
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-[#f6f0e6] text-[#163828] border border-[#d6cbba] rounded-xl text-sm font-semibold transition-all shadow-xs hover:shadow cursor-pointer"
          >
            <span>সকল পণ্য ক্যাটালগ এক্সপ্লোর করুন</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
