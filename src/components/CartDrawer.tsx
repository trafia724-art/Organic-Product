import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Tag,
  MessageCircle,
  Truck
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    deliveryArea,
    setDeliveryArea,
    deliveryCharge,
    couponCode,
    setCouponCode,
    couponApplied,
    applyCoupon,
    removeCoupon,
    discountAmount,
    cartGrandTotal,
    setIsCheckoutModalOpen,
    generateWhatsAppLink
  } = useShop();

  const [inputCoupon, setInputCoupon] = useState('');

  if (!isCartDrawerOpen) return null;

  const freeDeliveryThreshold = 1500;
  const remainingForFree = Math.max(0, freeDeliveryThreshold - cartSubtotal);
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeDeliveryThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCoupon.trim()) {
      applyCoupon(inputCoupon);
      setInputCoupon('');
    }
  };

  const handleProceedCheckout = () => {
    setIsCartDrawerOpen(false);
    setIsCheckoutModalOpen(true);
  };

  const handleWhatsAppCheckout = () => {
    const link = generateWhatsAppLink();
    window.open(link, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fcfaf7] shadow-2xl border-l border-[#ded3c2] flex flex-col justify-between">
          {/* Header */}
          <div className="px-5 py-4 border-b border-[#e5dcce] bg-[#f7f2ea] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#183e2c]" />
              <h2 className="text-base font-bold text-[#143425]">
                আপনার শপিং ব্যাগ ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 text-[#5e6d63] hover:text-[#183e2c] rounded-lg hover:bg-black/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-2.5 bg-[#f0eae0] border-b border-[#e2d8c8] text-xs">
            {remainingForFree > 0 ? (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[#38483e]">
                  <span>ফ্রি ডেলিভারি পেতে আর মাত্র <strong>৳{remainingForFree}</strong> যোগ করুন!</span>
                  <span className="font-semibold">{progressPercent}%</span>
                </div>
                <div className="w-full bg-[#dacfbd] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#183e2c] h-full transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-[#18482f] font-semibold">
                <Truck className="w-4 h-4 text-[#267b4b]" />
                <span>অভিনন্দন! আপনি ফ্রি ডেলিভারি পাচ্ছেন 🎉</span>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
            {cart.length === 0 ? (
              <div className="py-16 text-center text-[#74847b] space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#eee5d8] flex items-center justify-center text-[#183e2c]">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <p className="text-sm font-medium">আপনার কার্ট বর্তমানে খালি আছে</p>
                <p className="text-xs text-[#8e9d94]">আমাদের খাঁটি ও প্রাকৃতিক পণ্যসমূহ বেছে নিন</p>
                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="mt-2 px-5 py-2 bg-[#183e2c] text-white rounded-xl text-xs font-semibold hover:bg-[#102d1f]"
                >
                  কেনাকাটা শুরু করুন
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}`}
                  className="flex gap-3 p-3 bg-white rounded-xl border border-[#e8dfd2] shadow-xs"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.banglaName}
                    className="w-16 h-16 rounded-lg object-cover bg-[#f4ede3] shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-[#143425] line-clamp-1">
                          {item.product.banglaName}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[#9ea8a1] hover:text-[#b91c1c] p-0.5"
                          title="সরিয়ে ফেলুন"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#718076] mt-0.5">{item.selectedSize}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs font-bold text-[#143425] tabular-nums">
                        ৳{item.product.price * item.quantity}
                      </span>

                      {/* Quantity stepper */}
                      <div className="flex items-center border border-[#cfc3b1] rounded-md bg-[#faf8f5]">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-[#eae1d3] text-[#425046]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold tabular-nums text-[#1b3427]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-[#eae1d3] text-[#425046]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Delivery & Calculation Summary Footer */}
          {cart.length > 0 && (
            <div className="p-5 bg-[#f7f2ea] border-t border-[#e2d8c9] space-y-3.5">
              {/* Delivery Area Selector */}
              <div>
                <label className="block text-xs font-semibold text-[#27382e] mb-1.5">
                  ডেলিভারি এলাকা নির্বাচন করুন:
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setDeliveryArea('dhaka')}
                    className={`py-2 px-3 rounded-lg border text-center font-medium transition-colors cursor-pointer ${
                      deliveryArea === 'dhaka'
                        ? 'bg-[#183e2c] text-white border-[#183e2c]'
                        : 'bg-white text-[#405146] border-[#d6cbba]'
                    }`}
                  >
                    ঢাকার ভেতর (৳৭০)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryArea('outside')}
                    className={`py-2 px-3 rounded-lg border text-center font-medium transition-colors cursor-pointer ${
                      deliveryArea === 'outside'
                        ? 'bg-[#183e2c] text-white border-[#183e2c]'
                        : 'bg-white text-[#405146] border-[#d6cbba]'
                    }`}
                  >
                    ঢাকার বাইরে (৳১৩০)
                  </button>
                </div>
              </div>

              {/* Promo Coupon */}
              {!couponApplied ? (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="কুপন কোড (যেমন: ORGANIC10)"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 bg-white border border-[#d6cbba] rounded-lg text-xs uppercase text-[#1a3828] focus:outline-none focus:ring-1 focus:ring-[#183e2c]"
                    />
                    <Tag className="w-3.5 h-3.5 text-[#88988e] absolute left-2.5 top-2" />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#314a3b] hover:bg-[#1a3828] text-white text-xs font-semibold rounded-lg"
                  >
                    প্রয়োগ
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-between p-2 bg-[#eaf4ee] border border-[#b8dfc7] rounded-lg text-xs">
                  <div className="flex items-center gap-1.5 text-[#1b5b38] font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>১০% অর্গানিক ছাড় প্রযোজ্য হয়েছে</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-[#9b2c2c] text-[11px] hover:underline"
                  >
                    মুছে ফেলুন
                  </button>
                </div>
              )}

              {/* Price Calculation Breakdown */}
              <div className="space-y-1.5 text-xs text-[#415147] pt-1">
                <div className="flex justify-between">
                  <span>সাবটোটাল</span>
                  <span className="font-semibold tabular-nums">৳{cartSubtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>ডেলিভারি চার্জ</span>
                  <span className="font-semibold tabular-nums">
                    {deliveryCharge === 0 ? 'ফ্রি' : `৳${deliveryCharge}`}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#1c643b]">
                    <span>কুপন ছাড় (১০%)</span>
                    <span className="font-semibold tabular-nums">- ৳{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-[#143425] pt-2 border-t border-[#dfd4c4]">
                  <span>সর্বমোট প্রদেয়</span>
                  <span className="text-base tabular-nums">৳{cartGrandTotal}</span>
                </div>
              </div>

              {/* Main Actions */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleProceedCheckout}
                  className="w-full py-3 px-4 bg-[#183e2c] hover:bg-[#102d1f] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98 cursor-pointer"
                >
                  <span>অর্ডার সম্পন্ন করুন (চেকআউট)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-2.5 px-4 bg-[#25d366]/15 hover:bg-[#25d366]/25 text-[#106b32] border border-[#25d366]/30 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#1fa855]" />
                  <span>হোয়াটসঅ্যাপে সরাসরি অর্ডার পাঠান</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
