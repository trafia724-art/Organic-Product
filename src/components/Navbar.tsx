import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, Search, Menu, X, Leaf, Edit3 } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cartTotalCount,
    cartSubtotal,
    setIsCartDrawerOpen,
    searchQuery,
    setSearchQuery,
    setSelectedCategory
  } = useShop();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleNav = (view: 'home' | 'shop' | 'about' | 'contact' | 'faqs' | 'policy') => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentView('shop');
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fcfaf7]/95 backdrop-blur-md border-b border-[#e9e2d5] transition-all">
      {/* 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-[#1a4430] flex items-center justify-center text-[#d2e8d9] shadow-sm group-hover:bg-[#133425] transition-colors">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-[#163828] font-['Plus_Jakarta_Sans'] whitespace-nowrap shrink-0 block leading-tight">
                NatureNest
              </span>
              <span className="text-[11px] text-[#697a70] tracking-wide block">
                ন্যাচারনেস্ট অর্গানিক
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Single-line clean nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#404e45]">
          <button
            onClick={() => handleNav('home')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-[#163828] cursor-pointer ${
              currentView === 'home'
                ? 'text-[#163828] font-semibold border-b-2 border-[#163828] pb-1'
                : 'pb-1'
            }`}
          >
            হোম
          </button>
          <button
            onClick={() => {
              setSelectedCategory('all');
              handleNav('shop');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-[#163828] cursor-pointer ${
              currentView === 'shop'
                ? 'text-[#163828] font-semibold border-b-2 border-[#163828] pb-1'
                : 'pb-1'
            }`}
          >
            সকল পণ্য
          </button>
          <button
            onClick={() => handleNav('about')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-[#163828] cursor-pointer ${
              currentView === 'about'
                ? 'text-[#163828] font-semibold border-b-2 border-[#163828] pb-1'
                : 'pb-1'
            }`}
          >
            আমাদের সম্পর্কে
          </button>
          <button
            onClick={() => handleNav('contact')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-[#163828] cursor-pointer ${
              currentView === 'contact'
                ? 'text-[#163828] font-semibold border-b-2 border-[#163828] pb-1'
                : 'pb-1'
            }`}
          >
            যোগাযোগ
          </button>
          <button
            onClick={() => handleNav('faqs')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-[#163828] cursor-pointer ${
              currentView === 'faqs'
                ? 'text-[#163828] font-semibold border-b-2 border-[#163828] pb-1'
                : 'pb-1'
            }`}
          >
            প্রশ্নোত্তর
          </button>
        </nav>

        {/* Zone 3: Primary Action & Quick Tools */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 text-[#46544b] hover:text-[#163828] hover:bg-[#ede5d8]/50 rounded-lg transition-colors cursor-pointer"
            title="পণ্য খুঁজুন"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Primary Action: Shopping Cart Button */}
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#163828] text-white hover:bg-[#102a1e] transition-all shadow-sm hover:shadow active:scale-98 cursor-pointer"
            aria-label="View Shopping Cart"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-[#cde6d5]" />
              {cartTotalCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#d97706] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center tabular-nums">
                  {cartTotalCount}
                </span>
              )}
            </div>
            <span className="text-xs font-semibold whitespace-nowrap">
              কার্ট {cartSubtotal > 0 && `(৳${cartSubtotal})`}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#3c4a40] hover:text-[#163828] rounded-lg"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Expandable Search Input Row */}
      {isSearchOpen && (
        <div className="border-t border-[#ede5d8] bg-[#fbf9f5] px-4 py-3 transition-all animate-in fade-in slide-in-from-top-2">
          <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="যেকোনো পণ্য খুঁজুন (যেমন: মধু, চুল পড়া, মুলতানি মাটি, তেল, জাফরান)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#d8cdbc] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#163828] focus:border-transparent text-[#212924]"
              />
              <Search className="w-4 h-4 text-[#8a988f] absolute left-3.5 top-3.5" />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#163828] text-white text-xs font-medium rounded-xl hover:bg-[#0f281d] transition-colors cursor-pointer"
            >
              খুঁজুন
            </button>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setIsSearchOpen(false);
              }}
              className="p-2.5 text-[#5e6d63] hover:text-black rounded-xl cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[#ede5d8] bg-[#fcfaf7] px-4 py-4 space-y-3">
          <button
            onClick={() => handleNav('home')}
            className="w-full text-left py-2 px-3 rounded-lg text-sm font-medium text-[#2d3831] hover:bg-[#eee7dc]"
          >
            হোম
          </button>
          <button
            onClick={() => {
              setSelectedCategory('all');
              handleNav('shop');
            }}
            className="w-full text-left py-2 px-3 rounded-lg text-sm font-medium text-[#2d3831] hover:bg-[#eee7dc]"
          >
            সকল পণ্য (Shop)
          </button>
          <button
            onClick={() => handleNav('about')}
            className="w-full text-left py-2 px-3 rounded-lg text-sm font-medium text-[#2d3831] hover:bg-[#eee7dc]"
          >
            আমাদের সম্পর্কে
          </button>
          <button
            onClick={() => handleNav('contact')}
            className="w-full text-left py-2 px-3 rounded-lg text-sm font-medium text-[#2d3831] hover:bg-[#eee7dc]"
          >
            যোগাযোগ
          </button>
          <button
            onClick={() => handleNav('faqs')}
            className="w-full text-left py-2 px-3 rounded-lg text-sm font-medium text-[#2d3831] hover:bg-[#eee7dc]"
          >
            সাধারণ জিজ্ঞাসা (FAQs)
          </button>
          <button
            onClick={() => handleNav('policy')}
            className="w-full text-left py-2 px-3 rounded-lg text-sm font-medium text-[#2d3831] hover:bg-[#eee7dc]"
          >
            ডেলিভারি ও রিটার্ন পলিসি
          </button>
        </div>
      )}
    </header>
  );
};
