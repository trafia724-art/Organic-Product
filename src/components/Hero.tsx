import React from 'react';
import { useShop } from '../context/ShopContext';
import { ShieldCheck, Truck, Sparkles, ArrowRight, Award } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setCurrentView, setSelectedCategory } = useShop();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f3ece0]/60 via-[#faf7f2] to-[#faf8f5] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#ece4d6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            {/* Quiet text kicker - No pill container per Section 1A */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#1a4d36] uppercase">
              <span>প্রাকৃতিক ও ভেষজ পণ্যের বিশ্বস্ত প্রতিষ্ঠান</span>
              <span aria-hidden="true" className="text-[#a2927c]">·</span>
              <span>ঢাকা, বাংলাদেশ</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#143224] leading-[1.25] text-balance">
              প্রকৃতির খাঁটি পরশ, সুস্থ ও সতেজ পারিবারিক জীবনযাপনে
            </h1>

            <p className="text-base sm:text-lg text-[#4a584f] leading-relaxed max-w-2xl">
              কোনো ভেজাল, রাসায়নিক বা প্রিজারভেটিভ নয়। সুন্দরবনের খাঁটি খলিশা মধু, কাঠের ঘানিতে প্রথম চাপে ভাঙানো তেল, পাহাড়ি হলুদ এবং ত্বক ও চুলের প্রামাণ্য ভেষজ পুষ্টি—সরাসরি পৌঁছে যাবে আপনার দোরগোড়ায়।
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setCurrentView('shop');
                }}
                className="px-6 py-3.5 bg-[#163828] text-white rounded-xl text-sm font-semibold hover:bg-[#10291e] transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer active:scale-98"
              >
                <span>পণ্য কালেকশন দেখুন</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCurrentView('about')}
                className="px-5 py-3.5 bg-white text-[#25392d] border border-[#d6cbba] rounded-xl text-sm font-medium hover:bg-[#f6f2ec] transition-colors cursor-pointer"
              >
                আমাদের বিশুদ্ধতার গল্প
              </button>
            </div>

            {/* Trust Markers Bar (Clean unboxed inline metadata) */}
            <div className="pt-4 border-t border-[#e8ded0] grid grid-cols-3 gap-4">
              <div>
                <div className="flex items-center gap-1.5 text-[#1a4430] font-semibold text-sm">
                  <ShieldCheck className="w-4 h-4 text-[#2d734e]" />
                  <span>১০০% খাঁটি</span>
                </div>
                <p className="text-xs text-[#6a7970] mt-0.5">ল্যাব টেস্টে স্বীকৃত মান</p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-[#1a4430] font-semibold text-sm">
                  <Truck className="w-4 h-4 text-[#2d734e]" />
                  <span>ক্যাশ অন ডেলিভারি</span>
                </div>
                <p className="text-xs text-[#6a7970] mt-0.5">সমগ্র বাংলাদেশে দ্রুততম</p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-[#1a4430] font-semibold text-sm">
                  <Award className="w-4 h-4 text-[#2d734e]" />
                  <span>৫,০০০+ গ্রাহক</span>
                </div>
                <p className="text-xs text-[#6a7970] mt-0.5">সন্তুষ্ট পরিবারের আস্থা</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Studio Shot */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#e2d8c9] bg-[#f2eae0]">
              <img
                src="/src/assets/images/hero_botanical_naturenest_1792904572338.jpg"
                alt="NatureNest botanical organic products"
                className="w-full h-[360px] sm:h-[420px] object-cover transition-transform duration-700 hover:scale-103"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white p-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#dfd4c5]">ন্যাচারনেস্ট স্পেশাল হার্ভেস্ট</p>
                    <p className="text-sm font-semibold text-white">সুন্দরবন কাঁচা মধু ও প্রাকৃতিক ভেষজ সাবান</p>
                  </div>
                  <span className="text-xs bg-[#24583e] text-white px-2.5 py-1 rounded-md font-medium">
                    স্টকে আছে
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
