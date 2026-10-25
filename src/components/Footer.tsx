import React from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/categories';
import {
  Leaf,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ShieldCheck,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, setSelectedCategory, resetProductsToDefault } = useShop();

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (view: 'home' | 'shop' | 'about' | 'contact' | 'faqs' | 'policy') => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#122e20] text-[#d4ded8] pt-14 pb-8 border-t border-[#1a402d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Column 1: Brand & Slogan (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#22553c] flex items-center justify-center text-[#cce8d5]">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white font-['Plus_Jakarta_Sans'] block leading-none">
                  NatureNest
                </span>
                <span className="text-[11px] text-[#86a693] tracking-wide block mt-1">
                  ন্যাচারনেস্ট অর্গানিক বাংলাদেশ
                </span>
              </div>
            </div>

            <p className="text-xs text-[#a3b8ad] leading-relaxed">
              বাংলাদেশের নির্ভরযোগ্য প্রিমিয়াম অর্গানিক ও ভেষজ পণ্যের অনলাইন শপ। সুন্দরবনের খাঁটি মধু, কাঠের ঘানির তেল ও নিরাপদ স্কিনকেয়ার পৌঁছে দিচ্ছি প্রতিটি ভালোবাসার ঘরে।
            </p>

            <div className="space-y-2 text-xs text-[#cbd8d1] pt-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#79c293] shrink-0" />
                <span>হাউজ ৪২, রোড ১১, বনানী, ঢাকা-১২১৩</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#79c293] shrink-0" />
                <span>হটলাইন: ০১৭১১-০০০০০০ / ০১৯১১-০০০০০০</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#79c293] shrink-0" />
                <span>ই-মেইল: info@naturenest.com.bd</span>
              </div>
            </div>

            {/* Direct WhatsApp Button */}
            <div className="pt-2">
              <a
                href="https://wa.me/8801711000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#25d366] hover:bg-[#1eb855] text-black rounded-lg text-xs font-bold transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp এ চ্যাট করুন</span>
              </a>
            </div>
          </div>

          {/* Column 2: Categories (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              পণ্য ক্যাটাগরি
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {CATEGORIES.slice(0, 8).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className="text-left text-[#a3b8ad] hover:text-white transition-colors truncate"
                >
                  {cat.banglaName}
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Quick Links & Policy (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              প্রয়োজনীয় লিংক
            </h4>
            <div className="flex flex-col space-y-2 text-xs text-[#a3b8ad]">
              <button
                onClick={() => handleNav('home')}
                className="text-left hover:text-white transition-colors"
              >
                হোম পেজ
              </button>
              <button
                onClick={() => handleNav('shop')}
                className="text-left hover:text-white transition-colors"
              >
                সকল পণ্য
              </button>
              <button
                onClick={() => handleNav('about')}
                className="text-left hover:text-white transition-colors"
              >
                আমাদের সম্পর্কে
              </button>
              <button
                onClick={() => handleNav('contact')}
                className="text-left hover:text-white transition-colors"
              >
                যোগাযোগ
              </button>
              <button
                onClick={() => handleNav('faqs')}
                className="text-left hover:text-white transition-colors"
              >
                সাধারণ প্রশ্নোত্তর
              </button>
              <button
                onClick={() => handleNav('policy')}
                className="text-left hover:text-white transition-colors"
              >
                ডেলিভারি ও রিটার্ন
              </button>
            </div>
          </div>

          {/* Column 4: Trust & Payments (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              পেমেন্ট ও ডেলিভারি
            </h4>
            <div className="space-y-2 text-xs text-[#9eb5aa]">
              <div className="p-2 bg-[#1b4330] rounded-lg">
                <span className="block text-white font-semibold">ক্যাশ অন ডেলিভারি</span>
                <span className="text-[11px] text-[#9eb5aa]">সারা দেশে হোম ডেলিভারি</span>
              </div>
              <div className="p-2 bg-[#1b4330] rounded-lg">
                <span className="block text-white font-semibold">বিকাশ / নগদ</span>
                <span className="text-[11px] text-[#9eb5aa]">নিরাপদ মোবাইল পেমেন্ট</span>
              </div>
            </div>

            {/* Social links */}
            <div className="pt-2">
              <span className="block text-[11px] text-white/60 mb-2">সোশ্যাল মিডিয়া:</span>
              <div className="flex items-center gap-2 text-xs font-medium text-[#a3b8ad]">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">ফেসবুক</a>
                <span>·</span>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">ইনস্টাগ্রাম</a>
                <span>·</span>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">ইউটিউব</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Reset Tool */}
        <div className="pt-6 border-t border-[#1a402d] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7e998c]">
          <p>© {new Date().getFullYear()} NatureNest (ন্যাচারনেস্ট)। সর্বস্বত্ব সংরক্ষিত।</p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNav('policy')}
              className="hover:text-white transition-colors"
            >
              গোপনীয়তা নীতি
            </button>
            <span>·</span>
            <button
              onClick={() => handleNav('policy')}
              className="hover:text-white transition-colors"
            >
              শর্তাবলী
            </button>
            <span>·</span>
            {/* Quick reset for testing */}
            <button
              onClick={resetProductsToDefault}
              className="text-[#96beaa] hover:text-white transition-colors"
              title="এডিট করা তথ্য রিসেট করুন"
            >
              ডিফল্ট ডেটা রিসেট
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
