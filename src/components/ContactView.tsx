import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const { showToast } = useShop();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setSubmitted(true);
    showToast('আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে! শীঘ্রই আমরা যোগাযোগ করব।');
    setName('');
    setPhone('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="py-12 bg-[#faf8f5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="text-xs font-semibold text-[#1a4d36] tracking-wider uppercase">
            যোগাযোগ ও গ্রাহক সেবা
          </div>
          <h1 className="text-3xl font-extrabold text-[#143425]">
            ন্যাচারনেস্টের সাথে যোগাযোগ করুন
          </h1>
          <p className="text-xs sm:text-sm text-[#5d6f65]">
            পণ্য সম্পর্কিত যেকোনো জিজ্ঞাসা, পরামর্শ বা পাইকারি অর্ডারের জন্য আমাদের সাথে নিঃসংকোচে যোগাযোগ করতে পারেন।
          </p>
        </div>

        {/* 2-Column Info & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 bg-white rounded-2xl border border-[#ded3c2] shadow-xs space-y-5">
              <h3 className="text-base font-bold text-[#143425]">
                আমাদের প্রধান কার্যালয় ও আউটলেট
              </h3>

              <div className="space-y-4 text-xs text-[#394a40]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#f0eae0] text-[#183e2c] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[#143425] text-xs">ঠিকানা:</strong>
                    <p className="text-[#59695f] leading-relaxed">
                      হাউজ ৪২, রোড ১১, ব্লক-এফ, বনানী, ঢাকা-১২১৩, বাংলাদেশ
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#f0eae0] text-[#183e2c] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[#143425] text-xs">গ্রাহক সেবা হটলাইন:</strong>
                    <p className="text-[#59695f] leading-relaxed">
                      +৮৮০ ১৭১১-০০০০০০ (সরাসরি কল)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#f0eae0] text-[#183e2c] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[#143425] text-xs">ই-মেইল:</strong>
                    <p className="text-[#59695f] leading-relaxed">
                      info@naturenest.com.bd
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#f0eae0] text-[#183e2c] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[#143425] text-xs">কাজের সময়:</strong>
                    <p className="text-[#59695f] leading-relaxed">
                      শনিবার - বৃহস্পতিবার (সকাল ৯:০০ - রাত ৯:০০)
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Quick Link */}
              <div className="pt-3 border-t border-[#eee5d8]">
                <a
                  href="https://wa.me/8801711000000?text=%E0%A6%B9%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%B2%E0%A7%8B%20%E0%A6%A8%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%9A%E0%A6%BE%E0%A6%B0%E0%A6%A8%E0%A7%87%E0%A6%B8%E0%A7%8D%E0%A6%9F%2C%20%E0%A6%86%E0%A6%AE%E0%A6%BF%20%E0%A6%8F%E0%A6%95%E0%A6%9F%E0%A6%BF%20%E0%A6%AA%E0%A6%B0%E0%A6%BE%E0%A6%AE%E0%A6%B0%E0%A7%8D%E0%A6%B6%20%E0%A6%9A%E0%A6%BE%E0%A6%87%E0%A5%A4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-[#25d366]/15 hover:bg-[#25d366]/25 text-[#136f36] border border-[#25d366]/40 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#1fa855]" />
                  <span>WhatsApp এ সরাসরি চ্যাট করুন</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#ded3c2] shadow-xs">
            <h3 className="text-base font-bold text-[#143425] mb-2">
              আমাদের একটি বার্তা পাঠান
            </h3>
            <p className="text-xs text-[#63746a] mb-6">
              ফর্মটি পূরণ করুন, আমাদের কাস্টমার কেয়ার টিম সাধারণত ১-২ ঘণ্টার মধ্যে প্রত্যুত্তর দেয়।
            </p>

            {submitted ? (
              <div className="p-6 bg-[#eef8f2] rounded-xl border border-[#bfe2cb] text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-[#1a6439] mx-auto" />
                <h4 className="text-sm font-bold text-[#143425]">ধন্যবাদ! বার্তাটি গৃহীত হয়েছে</h4>
                <p className="text-xs text-[#526458]">
                  আমাদের প্রতিনিধি অতি শীঘ্রই আপনার সাথে যোগাযোগ করবেন।
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 text-xs text-[#183e2c] font-semibold underline"
                >
                  আরেকটি বার্তা পাঠান
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-[#293c31] mb-1">
                      আপনার নাম *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: তানজিলা পারভীন"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#cfc3b1] bg-[#faf8f5] focus:bg-white text-xs focus:outline-none focus:ring-2 focus:ring-[#183e2c]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#293c31] mb-1">
                      মোবাইল নম্বর *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="01XXXXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#cfc3b1] bg-[#faf8f5] focus:bg-white text-xs focus:outline-none focus:ring-2 focus:ring-[#183e2c]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#293c31] mb-1">
                    বিষয় / পণ্যের নাম
                  </label>
                  <input
                    type="text"
                    placeholder="যেমন: সুন্দরবনের মধু অর্ডার সংক্রান্ত তথ্য"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#cfc3b1] bg-[#faf8f5] focus:bg-white text-xs focus:outline-none focus:ring-2 focus:ring-[#183e2c]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#293c31] mb-1">
                    আপনার বার্তা বা জিজ্ঞাসা *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="বিস্তারিত লিখুন..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#cfc3b1] bg-[#faf8f5] focus:bg-white text-xs focus:outline-none focus:ring-2 focus:ring-[#183e2c]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-[#183e2c] hover:bg-[#102d1f] text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs cursor-pointer active:scale-98 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>বার্তা পাঠিয়ে দিন</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
