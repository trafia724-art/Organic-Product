import React from 'react';
import { useShop } from '../context/ShopContext';
import { ShieldCheck, Heart, Leaf, Award, CheckCircle, ArrowRight } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { setCurrentView } = useShop();

  return (
    <div className="py-12 bg-[#faf8f5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="text-xs font-semibold text-[#1a4d36] tracking-wider uppercase">
            আমাদের গল্প ও দর্শন
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#143425] leading-tight">
            প্রকৃতির খাঁটি দান সরাসরি আপনার পরিবারে পৌঁছে দেওয়ার অঙ্গীকার
          </h1>
          <p className="text-sm sm:text-base text-[#526359] leading-relaxed">
            ন্যাচারনেস্ট (NatureNest) একটি বিশ্বস্ত বাংলাদেশি উদ্যোগ। রাসায়নিক কীটনাশক ও ভেজালের ভিড়ে খাঁটি অর্গানিক ও ঐতিহ্যবাহী ভেষজ সামগ্রী উপহার দেওয়াই আমাদের ব্রত।
          </p>
        </div>

        {/* Story Visual & Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white p-6 sm:p-10 rounded-2xl border border-[#ded3c2] shadow-xs">
          <div className="rounded-xl overflow-hidden bg-[#eee5d8]">
            <img
              src="/src/assets/images/hero_botanical_naturenest_1792904572338.jpg"
              alt="NatureNest authentic organic harvest"
              className="w-full h-[340px] object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-[#3b4c41] leading-relaxed">
            <h2 className="text-xl font-bold text-[#143425]">
              যেভাবে শুরু হয়েছিল ন্যাচারনেস্টের যাত্রা
            </h2>
            <p>
              ২০২১ সালে যখন বাজারে নিখাদ সরিষার তেল বা এক চামচ খাঁটি মধু খুঁজে পাওয়া দুরূহ হয়ে উঠেছিল, তখন আমরা উদ্যোগ নিই সরাসরি মাঠপর্যায়ে গিয়ে সোর্সিং করার।
            </p>
            <p>
              আমরা সুন্দরবনের সাতক্ষীরা ও মোংলা রেঞ্জের অভিজ্ঞ মৌয়ালদের সাথে সরাসরি কাজ শুরু করি। মধ্যস্বত্বভোগী ছাড়াই প্রাকৃতিক চাক থেকে অপাস্তুরিত কাঁচা মধু সংগ্রহ নিশ্চিত করি। একইভাবে নাটোরের ঐতিহ্যবাহী কাঠের ঘানি এবং বান্দরবানের পাহাড়ি কৃষকদের সাথে গড়ে তুলি আস্থার সম্পর্ক।
            </p>
            <div className="p-3 bg-[#f7f2ea] rounded-xl border border-[#e8ded0] space-y-1 text-xs">
              <span className="font-bold text-[#143425] block">আমাদের লক্ষ্য:</span>
              <p className="text-[#55675c]">
                প্রাকৃতিক উপাদান ব্যবহারের মাধ্যমে পরিবারের সুস্থতা রক্ষা করা এবং কোনো ধরনের ক্ষতিকর সিন্থেটিক উপাদানমুক্ত জীবনধারা গড়ে তোলা।
              </p>
            </div>
          </div>
        </div>

        {/* Core Values 4-Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 bg-white rounded-xl border border-[#ded3c2] space-y-2">
            <div className="w-10 h-10 rounded-lg bg-[#eaf4ee] text-[#183e2c] flex items-center justify-center mb-3">
              <Leaf className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#143425]">১০০% অর্গানিক</h3>
            <p className="text-xs text-[#5f7166] leading-relaxed">
              কোনো কৃত্রিম রং, রাসায়নিক সুবাস, মিনারেল তেল বা প্রিজারভেটিভ ব্যবহার করা হয় না।
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-[#ded3c2] space-y-2">
            <div className="w-10 h-10 rounded-lg bg-[#eaf4ee] text-[#183e2c] flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#143425]">ল্যাব টেস্টে পরীক্ষিত</h3>
            <p className="text-xs text-[#5f7166] leading-relaxed">
              প্রতিটি লটের আর্দ্রতা, অম্লতা এবং বিশুদ্ধতা আধুনিক বৈজ্ঞানিক মানদণ্ডে যাচাই করা হয়।
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-[#ded3c2] space-y-2">
            <div className="w-10 h-10 rounded-lg bg-[#eaf4ee] text-[#183e2c] flex items-center justify-center mb-3">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#143425]">ন্যায্য কৃষক বাণিজ্য</h3>
            <p className="text-xs text-[#5f7166] leading-relaxed">
              প্রাকৃতিক মধু ও ভেষজ সংগ্রহকারী কৃষক ও মৌয়ালদের আমরা দিই ন্যায্য ও সম্মানজনক পারিশ্রমিক।
            </p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-[#ded3c2] space-y-2">
            <div className="w-10 h-10 rounded-lg bg-[#eaf4ee] text-[#183e2c] flex items-center justify-center mb-3">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#143425]">বিশ্বস্ত সেবা</h3>
            <p className="text-xs text-[#5f7166] leading-relaxed">
              ক্যাশ অন ডেলিভারি এবং কোনো অসন্তোষ দেখা দিলে দ্রুত ৭ দিনের রিটার্ন পলিসি।
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <button
            onClick={() => setCurrentView('shop')}
            className="px-6 py-3.5 bg-[#183e2c] hover:bg-[#102d1f] text-white rounded-xl text-xs font-semibold inline-flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <span>আমাদের প্রাকৃতিক পণ্যসমূহ দেখুন</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
