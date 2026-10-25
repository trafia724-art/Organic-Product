import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/categories';
import {
  X,
  ShoppingBag,
  Zap,
  MessageCircle,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  Edit3
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    setIsCheckoutModalOpen,
    generateWhatsAppLink,
    setEditingProduct,
    reviews,
    addReview
  } = useShop();

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewLocation, setNewReviewLocation] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  if (!selectedProduct) return null;

  const currentSize = selectedSize || selectedProduct.availableSizes?.[0] || selectedProduct.weight;
  const category = CATEGORIES.find((c) => c.id === selectedProduct.categoryId);
  const productReviews = reviews.filter((r) => r.productId === selectedProduct.id);

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity, currentSize);
    setSelectedProduct(null);
    setIsCheckoutModalOpen(true);
  };

  const handleWhatsAppOrder = () => {
    const directLink = generateWhatsAppLink([
      { product: selectedProduct, quantity, selectedSize: currentSize }
    ]);
    window.open(directLink, '_blank');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    addReview({
      productId: selectedProduct.id,
      authorBangla: newReviewAuthor.trim(),
      locationBangla: newReviewLocation.trim() || 'বাংলাদেশ',
      rating: newReviewRating,
      commentBangla: newReviewComment.trim(),
      verifiedBuyer: true
    });

    setNewReviewAuthor('');
    setNewReviewLocation('');
    setNewReviewComment('');
    setShowReviewForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#fcfaf7] rounded-2xl shadow-2xl border border-[#ded3c2] overflow-hidden my-4 sm:my-8">
        {/* Top close button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 text-[#46544b] hover:text-[#183929] bg-white/80 hover:bg-white rounded-full shadow-sm transition-all"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Image & Authenticity Guarantee */}
          <div className="md:col-span-5 bg-[#f4ece0] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#e5dcce]">
            <div>
              <div className="aspect-square w-full rounded-xl overflow-hidden shadow-sm bg-white mb-4">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.banglaName}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Trust Badges under Image */}
              <div className="space-y-2 text-xs text-[#394a40] pt-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#1a4d36] shrink-0" />
                  <span>শতভাগ অর্গানিক ও রাসায়নিক প্রিজারভেটিভমুক্ত</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#1a4d36] shrink-0" />
                  <span>ঢাকার ভেতর ১-২ দিন, বাইরে ২-৩ দিনে হোম ডেলিভারি</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-[#1a4d36] shrink-0" />
                  <span>প্যাকেজিংয়ে কোনো সমস্যা থাকলে দ্রুত ৭ দিনের সহজ রিটার্ন</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#e2d6c4] flex items-center justify-between text-xs text-[#6e7d73]">
              <span>ক্যাটাগরি: {category?.banglaName}</span>
              <button
                onClick={() => {
                  setEditingProduct(selectedProduct);
                  setSelectedProduct(null);
                }}
                className="text-[#895328] hover:text-[#5e3717] font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>তথ্য পরিবর্তন</span>
              </button>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-5">
              {/* Category & Status */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#1a4d36]">
                  {category?.banglaName || 'ন্যাচারাল কালেকশন'}
                </span>
                <span className="text-xs bg-[#eef7f1] text-[#195a3a] px-2.5 py-1 rounded-md font-medium border border-[#c7e5d2]">
                  {selectedProduct.stock > 0 ? `স্টক আছে (${selectedProduct.stock}টি)` : 'সীমিত স্টক'}
                </span>
              </div>

              {/* Title */}
              <div>
                <h1 className="text-2xl font-bold text-[#143425] leading-snug">
                  {selectedProduct.banglaName}
                </h1>
                <p className="text-xs text-[#718076] mt-0.5">{selectedProduct.englishName}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 text-xs">
                <div className="flex items-center text-[#d97706]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(selectedProduct.rating) ? 'fill-current' : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-[#1a3325] tabular-nums">
                  {selectedProduct.rating}
                </span>
                <span className="text-[#6d7c72]">
                  ({selectedProduct.reviewCount}টি ভেরিফাইড রিভিউ)
                </span>
              </div>

              {/* Price Banner */}
              <div className="p-4 bg-[#f4eee4] rounded-xl border border-[#ded2c1] flex items-baseline justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-[#143224] tabular-nums">
                      ৳{selectedProduct.price}
                    </span>
                    {selectedProduct.originalPrice && selectedProduct.originalPrice > selectedProduct.price && (
                      <span className="text-sm text-[#849288] line-through tabular-nums">
                        ৳{selectedProduct.originalPrice}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#6b7b71] mt-0.5">ভ্যাট অন্তর্ভুক্ত · ক্যাশ অন ডেলিভারি প্রযোজ্য</p>
                </div>
                {selectedProduct.discountPercent && selectedProduct.discountPercent > 0 && (
                  <span className="text-xs font-bold bg-[#183d2a] text-[#c7edd5] px-2.5 py-1 rounded-md">
                    {selectedProduct.discountPercent}% সাশ্রয়ী
                  </span>
                )}
              </div>

              {/* Size / Weight Selector */}
              {selectedProduct.availableSizes && selectedProduct.availableSizes.length > 0 && (
                <div>
                  <label className="block text-xs font-semibold text-[#293c31] mb-2">
                    প্যাক সাইজ / পরিমাণ নির্বাচন করুন:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.availableSizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                          currentSize === sz
                            ? 'bg-[#183d2b] text-white border-[#183d2b]'
                            : 'bg-white text-[#34443a] border-[#d8cdbc] hover:border-[#183d2b]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="space-y-3 pt-2 text-sm text-[#3b4c41]">
                <p className="leading-relaxed">{selectedProduct.descriptionBangla}</p>

                {/* Key Benefits */}
                {selectedProduct.benefitsBangla && selectedProduct.benefitsBangla.length > 0 && (
                  <div className="bg-[#faf7f2] p-3.5 rounded-xl border border-[#e5ddce] space-y-2">
                    <h3 className="text-xs font-bold text-[#143324] uppercase tracking-wider">
                      মূল উপকারিতা ও বৈশিষ্ট্য:
                    </h3>
                    <ul className="space-y-1.5">
                      {selectedProduct.benefitsBangla.map((ben, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-[#324538]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#216140] mt-0.5 shrink-0" />
                          <span>{ben}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Ingredients & Usage */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                  <div className="p-3 bg-white rounded-lg border border-[#e5ddce]">
                    <span className="font-bold text-[#143324] block mb-1">উপাদানসমূহ:</span>
                    <span className="text-[#56655c]">{selectedProduct.ingredientsBangla}</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-[#e5ddce]">
                    <span className="font-bold text-[#143324] block mb-1">ব্যবহারের নিয়ম:</span>
                    <span className="text-[#56655c]">{selectedProduct.usageBangla}</span>
                  </div>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 pt-3">
                <span className="text-xs font-semibold text-[#2b3c31]">পরিমাণ:</span>
                <div className="flex items-center border border-[#cfc3b1] rounded-lg bg-white overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-sm font-bold text-[#45574c] hover:bg-[#eee6da] transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-bold text-[#153425] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-sm font-bold text-[#45574c] hover:bg-[#eee6da] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Purchase Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    onClick={() => addToCart(selectedProduct, quantity, currentSize)}
                    className="py-3 px-4 bg-[#183e2c] hover:bg-[#102c1f] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>কার্টে যোগ করুন</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="py-3 px-4 bg-[#d97706] hover:bg-[#b45309] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98 cursor-pointer"
                  >
                    <Zap className="w-4 h-4" />
                    <span>এখনই অর্ডার করুন (চেকআউট)</span>
                  </button>
                </div>

                {/* Direct WhatsApp Order */}
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-2.5 px-4 bg-[#25d366]/10 hover:bg-[#25d366]/20 text-[#127a37] border border-[#25d366]/30 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#1fa855]" />
                  <span>হোয়াটসঅ্যাপে সরাসরি অর্ডার করুন</span>
                </button>
              </div>

              {/* Customer Reviews for this item */}
              <div className="pt-6 border-t border-[#e2d8c9] space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#143425]">
                    গ্রাহকদের প্রতিক্রিয়া ({productReviews.length})
                  </h3>
                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="text-xs font-semibold text-[#183e2c] hover:underline cursor-pointer"
                  >
                    {showReviewForm ? 'বাতিল' : '+ আপনার রিভিউ দিন'}
                  </button>
                </div>

                {/* Review Form */}
                {showReviewForm && (
                  <form onSubmit={handleReviewSubmit} className="p-4 bg-white rounded-xl border border-[#d8cdbc] space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#324539] mb-1">আপনার নাম *</label>
                        <input
                          type="text"
                          required
                          value={newReviewAuthor}
                          onChange={(e) => setNewReviewAuthor(e.target.value)}
                          placeholder="যেমন: সাবরিনা রহমান"
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#cfc3b1]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-[#324539] mb-1">এলাকা / জেলা</label>
                        <input
                          type="text"
                          value={newReviewLocation}
                          onChange={(e) => setNewReviewLocation(e.target.value)}
                          placeholder="যেমন: গুলশান, ঢাকা"
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#cfc3b1]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#324539] mb-1">রেটিং (১-৫)</label>
                      <select
                        value={newReviewRating}
                        onChange={(e) => setNewReviewRating(Number(e.target.value))}
                        className="px-3 py-1.5 text-xs rounded-lg border border-[#cfc3b1] bg-white"
                      >
                        <option value="5">⭐⭐⭐⭐⭐ (৫/৫ - চমৎকার)</option>
                        <option value="4">⭐⭐⭐⭐ (৪/৫ - ভালো)</option>
                        <option value="3">⭐⭐⭐ (৩/৫ - সাধারণ)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#324539] mb-1">মন্তব্য *</label>
                      <textarea
                        required
                        rows={2}
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        placeholder="পণ্যটির গুণাগুণ সম্পর্কে আপনার মতামত লিখুন..."
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#cfc3b1]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#183e2c] text-white rounded-lg text-xs font-semibold hover:bg-[#102d1f]"
                    >
                      রিভিউ জমা দিন
                    </button>
                  </form>
                )}

                {/* Review List */}
                <div className="space-y-2.5">
                  {productReviews.length > 0 ? (
                    productReviews.map((r) => (
                      <div key={r.id} className="p-3 bg-white rounded-lg border border-[#ede5d8] text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-[#183e2c]">{r.authorBangla}</span>
                          <span className="text-[#87958d]">{r.locationBangla}</span>
                        </div>
                        <p className="text-[#45564b] leading-relaxed">{r.commentBangla}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-[#718177] italic">
                      এখনো কোনো রিভিউ নেই। আপনি প্রথম রিভিউ প্রদানকারী হতে পারেন!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
