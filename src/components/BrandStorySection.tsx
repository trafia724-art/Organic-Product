import React from 'react';
import { useShop } from '../context/ShopContext';
import { ShieldCheck, HeartHandshake, Sparkles, Check, ArrowRight } from 'lucide-react';

export const BrandStorySection: React.FC = () => {
  const { setCurrentView } = useShop();

  return (
    <section className="py-20 bg-[#f4ece1] border-y border-[#e2d6c4] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Sourcing & Ingredients */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-[#d6c7b3] bg-[#eae0cf]">
              <img
                src="/src/assets/images/hero_botanical_naturenest_1792904572338.jpg"
                alt="NatureNest sustainable organic harvest"
                className="w-full h-[400px] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Overlay Trust Quote */}
            <div className="mt-4 p-4 bg-white/90 backdrop-blur-xs rounded-xl border border-[#ded1be] text-xs text-[#394a40] space-y-1">
              <span className="font-bold text-[#143425] block">আমাদের অটুট অঙ্গীকার:</span>
              <p className="leading-relaxed">
                "আমরা কোনো রাসায়নিক প্রিজারভেটিভ, কৃত্রিম সুবাস বা সস্তা মিনারেল তেল ব্যবহার করি না। যা প্রকৃতি থেকে সরাসরি পাই, তা-ই আপনাদের কাছে সর্বোচ্চ বিশুদ্ধতায় পৌঁছে দিই।"
              </p>
            </div>
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="text-xs font-semibold text-[#1a4d36] tracking-wider uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#256c47]" />
              <span>ন্যাচারনেস্টের গল্প ও বিশ্বাস</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#143224] leading-snug">
              কৃত্রিমতার ভিড়ে আমরা ফিরিয়ে আনছি প্রকৃতির আদিম বিশুদ্ধতা
            </h2>

            <p className="text-sm sm:text-base text-[#46574c] leading-relaxed">
              ন্যাচারনেস্ট (NatureNest) গড়ে উঠেছে একটি সাধারণ কিন্তু গভীর বিশ্বাস নিয়ে—আমাদের শরীর ও ত্বকের সুস্থতার সবচেয়ে কার্যকর ওষুধ লুকিয়ে আছে প্রকৃতির কোলে। বাংলাদেশে খাদ্য ও রূপচর্চার বাজারে ভেজাল এবং ক্ষতিকর কেমিক্যালের ছড়াছড়ির দিনে আমরা শুরু করেছি সততার এক নতুন অধ্যায়।
            </p>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white rounded-xl border border-[#e2d8c9] space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-bold text-[#183e2c]">
                  <ShieldCheck className="w-4 h-4 text-[#206841]" />
                  <span>সরাসরি উৎস থেকে সংগ্রহ</span>
                </div>
                <p className="text-xs text-[#59695f] leading-relaxed">
                  সুন্দরবনের বুনো মধু সংগ্রহ করেন ঐতিহ্যবাহী মৌয়ালরা এবং নাটোরের কাঠের ঘানিতে ভাঙানো হয় প্রথম চাপের খাঁটি সরিষা ও কালোজিরা তেল।
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-[#e2d8c9] space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-bold text-[#183e2c]">
                  <HeartHandshake className="w-4 h-4 text-[#206841]" />
                  <span>ক্ষতিকর উপাদানমুক্ত ফর্মুলেশন</span>
                </div>
                <p className="text-xs text-[#59695f] leading-relaxed">
                  প্যারাবেন, সালফেট, কৃত্রিম রং ও গন্ধ সম্পূর্ণ বর্জিত। আপনার পরিবারের প্রতিটি সদস্যের জন্য সম্পূর্ণ নিরাপদ।
                </p>
              </div>
            </div>

            {/* Sourcing Points list */}
            <ul className="space-y-2 text-xs sm:text-sm text-[#384a3e]">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#1a4d36] shrink-0" />
                <span>ল্যাবরেটরি টেস্টে পরীক্ষিত খাদ্যের পুষ্টিমান ও আর্দ্রতা</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#1a4d36] shrink-0" />
                <span>বান্দরবানের পাহাড়ি কস্তুরী হলুদ ও চট্টগ্রামের বিশুদ্ধ ভেষজ</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#1a4d36] shrink-0" />
                <span>সারা বাংলাদেশে সুরক্ষিত ইকো-ফ্রেন্ডলি প্যাকেজিংয়ে দ্রুত ডেলিভারি</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={() => setCurrentView('about')}
                className="px-5 py-2.5 bg-[#183e2c] hover:bg-[#102d1f] text-white rounded-xl text-xs font-semibold inline-flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>আমাদের সম্পর্কে বিস্তারিত জানুন</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
