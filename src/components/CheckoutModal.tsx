import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { OrderCustomerInfo } from '../types';
import {
  X,
  ShieldCheck,
  Truck,
  CreditCard,
  MessageCircle,
  CheckCircle2,
  Lock,
  PhoneCall
} from 'lucide-react';

const DIVISIONS = [
  'ঢাকা বিভাগ',
  'চট্টগ্রাম বিভাগ',
  'রাজশাহী বিভাগ',
  'খুলনা বিভাগ',
  'বরিশাল বিভাগ',
  'সিলেট বিভাগ',
  'রংপুর বিভাগ',
  'ময়মনসিংহ বিভাগ'
];

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    cart,
    cartSubtotal,
    deliveryArea,
    setDeliveryArea,
    deliveryCharge,
    discountAmount,
    cartGrandTotal,
    placeOrder,
    generateWhatsAppLink
  } = useShop();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [altPhone, setAltPhone] = useState('');
  const [division, setDivision] = useState(DIVISIONS[0]);
  const [district, setDistrict] = useState('ঢাকা');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'nagad'>('cod');
  const [trxId, setTrxId] = useState('');
  const [phoneError, setPhoneError] = useState('');

  if (!isCheckoutModalOpen) return null;

  const validatePhone = (num: string) => {
    // Valid Bangladeshi mobile numbers: 013, 014, 015, 016, 017, 018, 019 with 11 digits
    const cleaned = num.replace(/\s+/g, '').replace(/-/g, '');
    const regex = /^(?:\+88|88)?(01[3-9]\d{8})$/;
    return regex.test(cleaned);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePhone(phone)) {
      setPhoneError('অনুগ্রহ করে সঠিক ১১ ডিজিটের বাংলাদেশি মোবাইল নম্বর দিন (যেমন: 01711223344)');
      return;
    }
    setPhoneError('');

    const customerInfo: OrderCustomerInfo = {
      name: name.trim(),
      phone: phone.trim(),
      altPhone: altPhone.trim() || undefined,
      division,
      district: district.trim(),
      address: address.trim(),
      notes: notes.trim() || undefined,
      paymentMethod,
      trxId: trxId.trim() || undefined
    };

    placeOrder(customerInfo);
  };

  const handleWhatsAppOrder = () => {
    const customerInfo: Partial<OrderCustomerInfo> = {
      name,
      phone,
      division,
      district,
      address,
      paymentMethod
    };
    const link = generateWhatsAppLink(cart, customerInfo);
    window.open(link, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#fcfaf7] rounded-2xl shadow-2xl border border-[#ded3c2] overflow-hidden my-6">
        {/* Header */}
        <div className="px-6 py-4 bg-[#143425] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#9cd4ab]" />
            <div>
              <h2 className="text-base font-bold">নিরাপদ চেকআউট ও ডেলিভারি ফর্ম</h2>
              <p className="text-xs text-[#a6cbb2]">সহজ ও দ্রুততম ক্যাশ অন ডেলিভারি</p>
            </div>
          </div>
          <button
            onClick={() => setIsCheckoutModalOpen(false)}
            className="p-1.5 text-white/70 hover:text-white rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 max-h-[80vh] overflow-y-auto space-y-6">
          {/* Order Summary Strip */}
          <div className="p-4 bg-[#f3ede3] rounded-xl border border-[#e2d8c9] space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-[#143425]">
              <span>অর্ডারের পণ্যসমূহ ({cart.reduce((s, i) => s + i.quantity, 0)}টি):</span>
              <span className="tabular-nums">মোট প্রদেয়: ৳{cartGrandTotal}</span>
            </div>
            <div className="text-xs text-[#4d5c52] space-y-1">
              {cart.map((it) => (
                <div key={`${it.product.id}-${it.selectedSize}`} className="flex justify-between">
                  <span className="truncate pr-2">
                    {it.product.banglaName} ({it.selectedSize}) x {it.quantity}
                  </span>
                  <span className="tabular-nums shrink-0 font-medium">
                    ৳{it.product.price * it.quantity}
                  </span>
                </div>
              ))}
            </div>
            <div className="pt-2 border-t border-[#dfd2be] flex justify-between text-xs text-[#39483e]">
              <span>ডেলিভারি চার্জ: {deliveryCharge === 0 ? 'ফ্রি' : `৳${deliveryCharge}`}</span>
              {discountAmount > 0 && <span className="text-[#1c643b]">ডিসকাউন্ট: -৳{discountAmount}</span>}
            </div>
          </div>

          {/* Customer Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#143425] flex items-center gap-1.5">
              <span>১. গ্রাহকের তথ্য ও ঠিকানা</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#293c31] mb-1">
                  আপনার পূর্ণ নাম *
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: মো: আরিফুল ইসলাম"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#d2c5b3] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#163828] text-[#1a2920]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#293c31] mb-1">
                  সচল মোবাইল নম্বর *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="017XXXXXXXX"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (phoneError) setPhoneError('');
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#d2c5b3] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#163828] text-[#1a2920]"
                />
                {phoneError && <p className="text-[11px] text-red-600 mt-1">{phoneError}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#293c31] mb-1">
                  বিভাগ *
                </label>
                <select
                  value={division}
                  onChange={(e) => {
                    const val = e.target.value;
                    setDivision(val);
                    if (val === 'ঢাকা বিভাগ') {
                      setDeliveryArea('dhaka');
                    } else {
                      setDeliveryArea('outside');
                    }
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#d2c5b3] bg-white text-xs font-medium text-[#1a2920] focus:outline-none focus:ring-2 focus:ring-[#163828]"
                >
                  {DIVISIONS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#293c31] mb-1">
                  জেলা / থানা *
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: ঢাকা / উত্তরা / মিরপুর"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#d2c5b3] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#163828] text-[#1a2920]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#293c31] mb-1">
                  বিকল্প ফোন নম্বর (ঐচ্ছিক)
                </label>
                <input
                  type="tel"
                  placeholder="জরুরি প্রয়োজনে অন্য নম্বর"
                  value={altPhone}
                  onChange={(e) => setAltPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#d2c5b3] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#163828] text-[#1a2920]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#293c31] mb-1">
                সম্পূর্ণ ঠিকানা (বাসা/ফ্ল্যাট নং, রোড নং, এলাকা) *
              </label>
              <textarea
                required
                rows={2}
                placeholder="যেমন: বাসা নং ১২, রোড নং ৫, ব্লক-ডি, বসুন্ধরা আ/এ, ঢাকা"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#d2c5b3] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#163828] text-[#1a2920]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#5a6a60] mb-1">
                ডেলিভারি নোট বা বিশেষ নির্দেশনা (ঐচ্ছিক)
              </label>
              <input
                type="text"
                placeholder="যেমন: বিকেলে ৪টার পর ডেলিভারি দিলে ভালো হয়"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#d2c5b3] bg-white text-xs text-[#2a382f]"
              />
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-[#143425]">
              ২. মূল্য পরিশোধের মাধ্যম নির্বাচন করুন
            </h3>

            <div className="space-y-2.5">
              {/* Cash on Delivery */}
              <label
                className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors ${
                  paymentMethod === 'cod'
                    ? 'bg-[#eaf4ee] border-[#183e2c]'
                    : 'bg-white border-[#dcd1bf] hover:border-[#b8a994]'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mt-1 text-[#183e2c] focus:ring-[#183e2c]"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#143425]">
                      ক্যাশ অন ডেলিভারি (Cash on Delivery)
                    </span>
                    <span className="text-xs bg-[#183e2c] text-white px-2 py-0.5 rounded font-medium">
                      জনপ্রিয় ও নিরাপদ
                    </span>
                  </div>
                  <p className="text-xs text-[#526358] mt-1">
                    পণ্য হাতে পেয়ে পুরোপুরি যাচাই করে ডেলিভারি ম্যানের কাছে নগদ মূল্য পরিশোধ করুন।
                  </p>
                </div>
              </label>

              {/* bKash / Nagad */}
              <label
                className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors ${
                  paymentMethod === 'bkash'
                    ? 'bg-[#eaf4ee] border-[#183e2c]'
                    : 'bg-white border-[#dcd1bf] hover:border-[#b8a994]'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'bkash'}
                  onChange={() => setPaymentMethod('bkash')}
                  className="mt-1 text-[#183e2c] focus:ring-[#183e2c]"
                />
                <div className="flex-1">
                  <span className="text-sm font-bold text-[#143425]">
                    বিকাশ অথবা নগদ (মোবাইল ব্যাংকিং)
                  </span>
                  <p className="text-xs text-[#526358] mt-1">
                    আমাদের মার্চেন্ট/ব্যক্তিগত নম্বরে (০১৭১১-০০০০০০) সেন্ড মানি করুন।
                  </p>

                  {paymentMethod === 'bkash' && (
                    <div className="mt-3 p-3 bg-white rounded-lg border border-[#c4dcce] text-xs space-y-2">
                      <p className="text-[#1b4330] font-semibold">
                        📲 bKash / Nagad নম্বর: <strong>০১৭১১-০০০০০০</strong> (Personal)
                      </p>
                      <div>
                        <label className="block text-[11px] font-medium text-[#46564c] mb-1">
                          টাকা পাঠানোর পর প্রাপ্ত TrxID (ট্রানজেকশন আইডি) লিখুন:
                        </label>
                        <input
                          type="text"
                          placeholder="যেমন: 9K8A2BC3"
                          value={trxId}
                          onChange={(e) => setTrxId(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-md border border-[#c8beae] uppercase"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-[#ded3c2] space-y-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-[#596a60]">
                <span>মোট প্রদেয়: </span>
                <strong className="text-base text-[#143425] tabular-nums font-bold">
                  ৳{cartGrandTotal}
                </strong>
                <span className="text-[11px] block text-[#7e8e84]">
                  (পণ্য মূল্য + ডেলিভারি চার্জ)
                </span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleWhatsAppOrder}
                  className="flex-1 sm:flex-none px-4 py-3 bg-[#25d366]/15 hover:bg-[#25d366]/25 text-[#136e35] border border-[#25d366]/40 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#1fa855]" />
                  <span>হোয়াটসঅ্যাপে অর্ডার</span>
                </button>

                <button
                  type="submit"
                  className="flex-1 sm:flex-none px-6 py-3 bg-[#163828] hover:bg-[#0f281d] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#a7d8b5]" />
                  <span>অর্ডার নিশ্চিত করুন</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
