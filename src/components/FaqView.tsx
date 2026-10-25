import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ChevronDown, HelpCircle, ArrowRight, MessageCircle } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
  category: string;
}

const FAQS: FaqItem[] = [
  {
    category: 'পণ্য ও বিশুদ্ধতা',
    q: 'সুন্দরবনের মধু খাঁটি কিনা তা কীভাবে নিশ্চিত হব?',
    a: 'আমাদের সুন্দরবনের মধু কোনো প্রক্রিয়াজাতকরণ বা চিনি মিশ্রণ ছাড়াই শতভাগ প্রাকৃতিক চাক থেকে সরাসরি অপাস্তুরিত অবস্থায় বোতলজাত করা হয়। ল্যাব টেস্টে এর আর্দ্রতা ও সুক্রোজ মাত্রা আন্তর্জাতিক খাদ্য মানদণ্ডের মধ্যে পাওয়া গেছে। যেকোনো নির্ভরযোগ্য ল্যাবরেটরিতে আমাদের মধুর গুণমান পরীক্ষা করে দেখতে পারেন।'
  },
  {
    category: 'পণ্য ও বিশুদ্ধতা',
    q: 'তেল ও স্কিনকেয়ার পণ্যগুলো কি সংবেদনশীল ত্বকের জন্য নিরাপদ?',
    a: 'আমাদের প্রতিটি তেল ও ভেষজ মাস্ক শতভাগ প্যারাবেন, কৃত্রিম সুবাস ও মিনারেল অয়েল মুক্ত। তবে প্রাকৃতিক উদ্ভিজ্জ উপাদানেও কারও কারও ব্যক্তিগত অ্যালার্জি থাকতে পারে। তাই মুখে ব্যবহারের পূর্বে হাতের কব্জিতে সামান্য লাগিয়ে প্যাচ টেস্ট (Patch Test) করে নেওয়ার পরামর্শ দেওয়া হয়।'
  },
  {
    category: 'ডেলিভারি',
    q: 'অর্ডার করার পর ডেলিভারি পেতে কতদিন সময় লাগে?',
    a: 'ঢাকার ভেতরে সাধারণত ২৪ থেকে ৪৮ ঘণ্টার মধ্যে ডেলিভারি সম্পন্ন হয়। ঢাকার বাইরে সারা বাংলাদেশে জেলা ও উপজেলা পর্যায়ে ২ থেকে ৩ কর্মদিবসের মধ্যে কুরিয়ারের মাধ্যমে পৌঁছে দেওয়া হয়।'
  },
  {
    category: 'ডেলিভারি',
    q: 'ডেলিভারি চার্জ কত এবং কীভাবে ফ্রি ডেলিভারি পাওয়া যায়?',
    a: 'ঢাকার ভেতরে নিয়মিত ডেলিভারি চার্জ ৭০ টাকা এবং ঢাকার বাইরে ১৩০ টাকা। তবে ১৫০০ টাকা বা তার বেশি মূল্যের যেকোনো অর্ডারে সারা বাংলাদেশে ডেলিভারি সম্পূর্ণ ফ্রি।'
  },
  {
    category: 'পেমেন্ট ও অর্ডার',
    q: 'ক্যাশ অন ডেলিভারি (Cash on Delivery) সুবিধা আছে কি?',
    a: 'হ্যাঁ, সারা বাংলাদেশে আমাদের ক্যাশ অন ডেলিভারি সুবিধা রয়েছে। পণ্য হাতে পেয়ে সম্পূর্ণ দেখে মূল্য পরিশোধ করতে পারবেন। এছাড়া চাইলে বিকাশ বা নগদ মোবাইল ব্যাংকিংয়ের মাধ্যমেও পেমেন্ট করা যায়।'
  },
  {
    category: 'পেমেন্ট ও অর্ডার',
    q: 'ওয়েবসাইট ছাড়া সরাসরি হোয়াটসঅ্যাপে অর্ডার করা যাবে কি?',
    a: 'অবশ্যই! আমাদের ওয়েবসাইটে পণ্যের নিচে থাকা "WhatsApp এ সরাসরি অর্ডার করুন" বাটনে ক্লিক করলেই আপনার কাঙ্ক্ষিত পণ্যটি মেসেজ আকারে আমাদের অফিশিয়াল হোয়াটসঅ্যাপে (+৮৮০ ১৭১১-০০০০০০) চলে যাবে।'
  },
  {
    category: 'রিটার্ন ও রিফান্ড',
    q: 'পণ্য ভাঙা বা ত্রুটিপূর্ণ পেলে কীভাবে বদল বা রিফান্ড পাব?',
    a: 'ডেলিভারির সময় কোনো পণ্য ক্ষতিগ্রস্ত হলে বা অসঙ্গতি দেখা দিলে ডেলিভারি ম্যানের সামনেই আমাদের হেল্পলাইনে কল করুন অথবা ছবি তুলে হোয়াটসঅ্যাপে পাঠান। আমরা কোনো বাড়তি খরচ ছাড়াই ৭ দিনের মধ্যে পণ্য পরিবর্তন বা পূর্ণ মূল্য ফেরত দেওয়ার ব্যবস্থা করব।'
  }
];

export const FaqView: React.FC = () => {
  const { setCurrentView } = useShop();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="py-12 bg-[#faf8f5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="text-xs font-semibold text-[#1a4d36] tracking-wider uppercase">
            সহজ সমাধান
          </div>
          <h1 className="text-3xl font-extrabold text-[#143425]">
            সাধারণ জিজ্ঞাসা ও উত্তর (FAQs)
          </h1>
          <p className="text-xs sm:text-sm text-[#5a6c62] max-w-xl mx-auto">
            আমাদের পণ্য, সোর্সিং, ডেলিভারি এবং রিটার্ন পলিসি সম্পর্কিত নিয়মিত প্রশ্নগুলোর উত্তর এখানে পাবেন।
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-[#ded3c2] overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-semibold text-sm text-[#143425] hover:bg-[#faf7f2] cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-[#206941] shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#75867c] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#143425]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#45574c] leading-relaxed border-t border-[#f0e8dc] bg-[#faf8f5]/60 animate-in fade-in duration-150">
                    <p>{faq.a}</p>
                    <span className="inline-block mt-2 text-[11px] text-[#86958d]">
                      টপিক: {faq.category}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions card */}
        <div className="p-6 bg-[#f3ece0] rounded-2xl border border-[#dfd2be] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-[#143425]">
              আপনার কাঙ্ক্ষিত উত্তরটি খুঁজে পাননি?
            </h3>
            <p className="text-xs text-[#5a6a60] mt-0.5">
              আমাদের টিম সার্বক্ষণিক সহায়তার জন্য প্রস্তুত আছে।
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/8801711000000"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#25d366]/20 hover:bg-[#25d366]/30 text-[#127035] border border-[#25d366]/40 rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp চ্যাট</span>
            </a>
            <button
              onClick={() => setCurrentView('contact')}
              className="px-4 py-2 bg-[#183e2c] hover:bg-[#102d1f] text-white rounded-xl text-xs font-bold"
            >
              যোগাযোগ পেজে যান
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
