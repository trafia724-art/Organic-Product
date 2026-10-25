import React, { useState } from 'react';
import { Truck, RotateCcw, ShieldCheck, Lock, Check } from 'lucide-react';

export const PolicyView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'delivery' | 'return' | 'privacy'>('delivery');

  return (
    <div className="py-12 bg-[#faf8f5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="text-xs font-semibold text-[#1a4d36] tracking-wider uppercase">
            নীতিমালা ও শর্তাবলী
          </div>
          <h1 className="text-3xl font-extrabold text-[#143425]">
            ন্যাচারনেস্ট প্রাতিষ্ঠানিক পলিসি
          </h1>
          <p className="text-xs sm:text-sm text-[#5d6e64]">
            আমাদের গ্রাহকদের পূর্ণ নিরাপত্তা ও স্বচ্ছ সেবা প্রদানে আমরা অঙ্গীকারবদ্ধ।
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center">
          <div className="inline-flex p-1 bg-[#ede4d7] rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActiveTab('delivery')}
              className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'delivery'
                  ? 'bg-white text-[#143425] shadow-xs'
                  : 'text-[#4e5e54] hover:text-[#143425]'
              }`}
            >
              ডেলিভারি পলিসি
            </button>
            <button
              onClick={() => setActiveTab('return')}
              className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'return'
                  ? 'bg-white text-[#143425] shadow-xs'
                  : 'text-[#4e5e54] hover:text-[#143425]'
              }`}
            >
              রিটার্ন ও রিফান্ড পলিসি
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'privacy'
                  ? 'bg-white text-[#143425] shadow-xs'
                  : 'text-[#4e5e54] hover:text-[#143425]'
              }`}
            >
              গোপনীয়তা নীতি (Privacy)
            </button>
          </div>
        </div>

        {/* Content Box */}
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#ded3c2] shadow-xs text-xs sm:text-sm text-[#3b4c41] leading-relaxed space-y-6">
          {activeTab === 'delivery' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-base font-bold text-[#143425] pb-2 border-b border-[#eee5d8]">
                <Truck className="w-5 h-5 text-[#206941]" />
                <span>ডেলিভারি সময় ও খরচ সংক্রান্ত নীতিমালা</span>
              </div>
              <p>
                ন্যাচারনেস্টে অর্ডারকৃত প্রতিটি পণ্য আমরা নিজস্ব বা বিশ্বস্ত কুরিয়ার পার্টনারদের (যেমন: রেডএক্স, পাঠাও, সুন্দরবন কুরিয়ার) মাধ্যমে সর্বোচ্চ সুরক্ষায় পৌঁছে দিই।
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-[#f8f4ee] rounded-xl border border-[#e5d9c8] space-y-1">
                  <strong className="text-[#143425] block">ঢাকা সিটি কর্পোরেশন এলাকা:</strong>
                  <p>ডেলিভারি সময়: ২৪ থেকে ৪৮ ঘণ্টা</p>
                  <p>চার্জ: ৭০ টাকা (১৫০০৳+ অর্ডারে সম্পূর্ণ ফ্রি)</p>
                </div>
                <div className="p-4 bg-[#f8f4ee] rounded-xl border border-[#e5d9c8] space-y-1">
                  <strong className="text-[#143425] block">ঢাকার বাইরে সমগ্র বাংলাদেশ:</strong>
                  <p>ডেলিভারি সময়: ২ থেকে ৩ কর্মদিবস</p>
                  <p>চার্জ: ১৩০ টাকা (১৫০০৳+ অর্ডারে সম্পূর্ণ ফ্রি)</p>
                </div>
              </div>
              <ul className="space-y-2 pt-2 text-[#4c5c52]">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#1a4d36] shrink-0" />
                  <span>অর্ডার গ্রহণের পর ফোন কলের মাধ্যমে ঠিকানা ভেরিফাই করে পাঠানো হয়।</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#1a4d36] shrink-0" />
                  <span>কাঁচের জার ও তরল তেলের ক্ষেত্রে ৩-লেয়ার বাবল র‍্যাপ সুরক্ষা প্রদান করা হয়।</span>
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'return' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-base font-bold text-[#143425] pb-2 border-b border-[#eee5d8]">
                <RotateCcw className="w-5 h-5 text-[#206941]" />
                <span>৭ দিনের সহজ রিটার্ন ও রিফান্ড পলিসি</span>
              </div>
              <p>
                আমরা গ্রাহক সন্তুষ্টিকে সর্বোচ্চ গুরুত্ব দিই। ডেলিভারি পাওয়ার পর পণ্য নিয়ে কোনো যুক্তিসঙ্গত অভিযোগ থাকলে নিম্নোক্ত শর্তে দ্রুত রিটার্ন গ্রহণ করা হয়:
              </p>
              <div className="space-y-3 pt-2">
                <div className="p-3 bg-[#faf7f2] rounded-lg border border-[#e8dfd2]">
                  <strong className="text-[#143425] block mb-1">১. ক্ষতিগ্রস্ত বা ভুল পণ্য:</strong>
                  <p>যদি কুরিয়ারের সময় বোতল ভেঙে যায় বা ভুল পণ্য পৌঁছায়, ডেলিভারির সময় বা ২৪ ঘণ্টার মধ্যে ছবিসহ আমাদের অবহিত করুন। আমরা নিজ খরচে নতুন পণ্য পাঠাব।</p>
                </div>
                <div className="p-3 bg-[#faf7f2] rounded-lg border border-[#e8dfd2]">
                  <strong className="text-[#143425] block mb-1">২. গুণগত মান নিশ্চিতকরণ:</strong>
                  <p>যদি ল্যাবে বা পরীক্ষায় প্রমাণিত হয় পণ্যটিতে ভেজাল বা কৃত্রিম উপাদান মেশানো ছিল, আমরা ১০০% মূল্য রিফান্ড প্রদান করব।</p>
                </div>
                <div className="p-3 bg-[#faf7f2] rounded-lg border border-[#e8dfd2]">
                  <strong className="text-[#143425] block mb-1">৩. রিফান্ডের মাধ্যম:</strong>
                  <p>পণ্য আমাদের অফিসে পৌঁছানোর ৩ কার্যদিবসের মধ্যে আপনার বিকাশ/নগদ অ্যাকাউন্টে টাকা পাঠিয়ে দেওয়া হবে।</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-base font-bold text-[#143425] pb-2 border-b border-[#eee5d8]">
                <Lock className="w-5 h-5 text-[#206941]" />
                <span>গ্রাহকের তথ্য সুরক্ষা ও গোপনীয়তা নীতি</span>
              </div>
              <p>
                ন্যাচারনেস্ট আপনার ব্যক্তিগত তথ্যের গোপনীয়তাকে অত্যন্ত শ্রদ্ধার সাথে দেখে। আমরা কোনো অবস্থাতেই গ্রাহকের ফোন নম্বর, ঠিকানা বা অর্ডার হিস্ট্রি কোনো তৃতীয় পক্ষের কাছে বিক্রি বা শেয়ার করি না।
              </p>
              <ul className="space-y-2 pt-2 text-[#4c5c52]">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#1a4d36] shrink-0" />
                  <span>সংগৃহীত নাম, মোবাইল নম্বর ও ঠিকানা শুধুমাত্র পণ্য ডেলিভারির কাজে ব্যবহৃত হয়।</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#1a4d36] shrink-0" />
                  <span>মোবাইল ব্যাংকিংয়ের ট্রানজেকশন ডেটা এনক্রিপ্ট রাখা হয়।</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#1a4d36] shrink-0" />
                  <span>প্রয়োজনে যেকোনো সময় আপনার সংরক্ষিত তথ্য মুছে দেওয়ার অনুরোধ জানাতে পারেন।</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
