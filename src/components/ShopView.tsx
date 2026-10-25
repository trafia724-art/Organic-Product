import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/categories';
import { ProductCard } from './ProductCard';
import { Search, Filter, SlidersHorizontal, ArrowUpDown, X, Sparkles, RotateCcw } from 'lucide-react';

export const ShopView: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy
  } = useShop();

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter and sort computation
  const filteredAndSortedProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category filter
        if (selectedCategory !== 'all' && product.categoryId !== selectedCategory) {
          return false;
        }

        // Search query filter (Bangla + English phonetic)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = product.banglaName.toLowerCase().includes(q);
          const matchEn = product.englishName.toLowerCase().includes(q);
          const matchDesc = product.descriptionBangla.toLowerCase().includes(q);
          const matchCat = product.categoryId.toLowerCase().includes(q);
          if (!matchName && !matchEn && !matchDesc && !matchCat) return false;
        }

        // Price range
        if (product.price < priceRange[0] || product.price > priceRange[1]) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        if (sortBy === 'discount') return (b.discountPercent || 0) - (a.discountPercent || 0);
        // Popularity default
        return b.reviewCount - a.reviewCount;
      });
  }, [products, selectedCategory, searchQuery, priceRange, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setPriceRange([0, 2500]);
    setSortBy('popularity');
  };

  const activeCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory);

  return (
    <div className="py-8 lg:py-12 bg-[#faf8f5] min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1a4d36] uppercase tracking-wider">
            <span>ক্যাটালগ</span>
            <span aria-hidden="true">·</span>
            <span>১০০% খাঁটি ও প্রাকৃতিক</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#143425]">
            {activeCategoryObj ? activeCategoryObj.banglaName : 'সকল অর্গানিক ও ভেষজ পণ্য'}
          </h1>
          <p className="text-xs sm:text-sm text-[#5d6e64] max-w-2xl">
            {activeCategoryObj
              ? activeCategoryObj.description
              : 'প্রকৃতির স্নিগ্ধ আশীর্বাদে সমৃদ্ধ আমাদের প্রতিটি উপাদান। ভেজালমুক্ত জীবনের বিশ্বস্ত সমাধান।'}
          </p>
        </div>

        {/* Toolbar: Search, Sort & Mobile Filter Toggle */}
        <div className="p-4 bg-white rounded-2xl border border-[#ded3c2] shadow-xs mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search bar inside shop */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="পণ্য বা উপাদান খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#cfc3b1] bg-[#faf8f5] text-xs text-[#1e2d24] focus:outline-none focus:ring-2 focus:ring-[#163828] focus:bg-white"
            />
            <Search className="w-4 h-4 text-[#8a988f] absolute left-3 top-2.5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-[#8a988f] hover:text-black"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between md:justify-end gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden px-3.5 py-2 bg-[#f4ece0] text-[#1a3f2d] rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-[#dfd4c4]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>ফিল্টার</span>
            </button>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#64746a] hidden sm:inline whitespace-nowrap">সাজান:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 bg-[#faf8f5] border border-[#cfc3b1] rounded-xl text-xs font-semibold text-[#163828] focus:outline-none cursor-pointer"
              >
                <option value="popularity">জনপ্রিয়তা (বেশি রেটিং)</option>
                <option value="price-asc">মূল্য: কম থেকে বেশি</option>
                <option value="price-desc">মূল্য: বেশি থেকে কম</option>
                <option value="newest">নতুন সংযোজন</option>
                <option value="discount">সর্বোচ্চ ছাড়</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Layout: Sidebar Filters + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 bg-white p-5 rounded-2xl border border-[#ded3c2] shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#eee5d8]">
              <span className="text-sm font-bold text-[#143425] flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-[#1b5035]" />
                <span>ফিল্টার সমূহ</span>
              </span>
              <button
                onClick={handleResetFilters}
                className="text-xs text-[#82542a] hover:text-[#5a3818] font-medium flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>রিসেট</span>
              </button>
            </div>

            {/* Categories Filter */}
            <div>
              <h4 className="text-xs font-bold text-[#203629] mb-2.5 uppercase tracking-wider">
                ক্যাটাগরি
              </h4>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-colors flex items-center justify-between cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-[#183e2c] text-white'
                      : 'text-[#44554a] hover:bg-[#f6efe4]'
                  }`}
                >
                  <span>সব পণ্য একসাথে</span>
                  <span className="tabular-nums opacity-80">{products.length}</span>
                </button>

                {CATEGORIES.map((cat) => {
                  const count = products.filter((p) => p.categoryId === cat.id).length;
                  const isSelected = selectedCategory === cat.id;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-colors flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-[#183e2c] text-white'
                          : 'text-[#44554a] hover:bg-[#f6efe4]'
                      }`}
                    >
                      <span className="truncate pr-1">{cat.banglaName}</span>
                      <span className="tabular-nums opacity-80 shrink-0">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Filter */}
            <div className="pt-4 border-t border-[#eee5d8]">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-[#203629] uppercase tracking-wider">
                  মূল্য সীমা (টাকা)
                </h4>
                <span className="text-xs font-bold text-[#183e2c] tabular-nums">
                  ৳{priceRange[0]} - ৳{priceRange[1]}
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="2500"
                step="50"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full accent-[#183e2c] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#718177] mt-1 tabular-nums">
                <span>৳১০০</span>
                <span>৳২৫০০</span>
              </div>
            </div>

            {/* Purity Guarantee Box */}
            <div className="p-3.5 bg-[#f6efe4] rounded-xl border border-[#e5d9c8] text-xs text-[#394a40] space-y-1">
              <span className="font-bold text-[#143425] block">ন্যাচারনেস্ট প্রতিশ্রুতি:</span>
              <p className="text-[11px] text-[#55675c] leading-relaxed">
                কোনো অযৌক্তিক দাবি নয়, সঠিক ল্যাব টেস্ট এবং প্রাকৃতিক নিয়মে প্রস্তুত পণ্যই আমরা গ্রাহকের হাতে তুলে দিই।
              </p>
            </div>
          </aside>

          {/* Mobile Filter Drawer (Collapsible) */}
          {isMobileFilterOpen && (
            <div className="lg:hidden col-span-12 p-4 bg-white rounded-2xl border border-[#ded3c2] space-y-4 mb-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#eee5d8]">
                <span className="text-xs font-bold text-[#143425]">ক্যাটাগরি ও ফিল্টার</span>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-slate-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setIsMobileFilterOpen(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                    selectedCategory === 'all'
                      ? 'bg-[#183e2c] text-white'
                      : 'bg-[#f4eee3] text-[#344439]'
                  }`}
                >
                  সব পণ্য ({products.length})
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setIsMobileFilterOpen(false);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                      selectedCategory === cat.id
                        ? 'bg-[#183e2c] text-white'
                        : 'bg-[#f4eee3] text-[#344439]'
                    }`}
                  >
                    {cat.banglaName}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Products Grid */}
          <main className="lg:col-span-9 space-y-6">
            <div className="flex items-center justify-between text-xs text-[#627368]">
              <span>
                মোট <strong>{filteredAndSortedProducts.length}</strong>টি পণ্য প্রদর্শিত হচ্ছে
              </span>
              {selectedCategory !== 'all' && (
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="text-[#88572b] hover:underline"
                >
                  সব পণ্য দেখুন
                </button>
              )}
            </div>

            {filteredAndSortedProducts.length === 0 ? (
              <div className="py-20 text-center bg-white rounded-2xl border border-[#e2d8c9] p-8 space-y-3">
                <p className="text-sm font-semibold text-[#183929]">
                  কোনো পণ্য খুঁজে পাওয়া যায়নি!
                </p>
                <p className="text-xs text-[#738379]">
                  অন্য কোনো কীওয়ার্ড দিয়ে খুঁজুন অথবা ফিল্টার রিসেট করুন।
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-[#183e2c] text-white text-xs font-medium rounded-xl hover:bg-[#102d1f]"
                >
                  ফিল্টার রিসেট করুন
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
