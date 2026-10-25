import React from 'react';
import { Phone, ShieldCheck, Sparkles, MessageCircle } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-[#133224] text-[#d6e3db] text-xs font-normal border-b border-[#1b4331]">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <span className="flex items-center gap-1.5 text-[#a8d5b5]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>১০০% খাঁটি ও প্রাকৃতিক উপাদানের নিশ্চয়তা</span>
          </span>
          <span className="hidden md:inline text-white/30">|</span>
          <span className="hidden md:flex items-center gap-1 text-[#f3e9d8]">
            <Sparkles className="w-3.5 h-3.5 text-[#e5b95a]" />
            <span>১৫০০৳ বা তদূর্ধ্ব অর্ডারে সারা দেশে ফ্রি ডেলিভারি</span>
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <a
            href="tel:+8801711000000"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone className="w-3 h-3 text-[#9ed3a9]" />
            <span>হটলাইন: ০১৭১১-০০০০০০</span>
          </a>
          <span className="text-white/30">|</span>
          <a
            href="https://wa.me/8801711000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[#9ed3a9] hover:underline"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp সহায়তা</span>
          </a>
        </div>
      </div>
    </div>
  );
};
