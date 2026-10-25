import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Review } from '../types';
import { Star, ShieldCheck, CheckCircle2, MessageSquare, Plus, Edit2, X } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const { reviews, addReview, updateReview } = useShop();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  // New review form
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleOpenAdd = () => {
    setName('');
    setLocation('');
    setRating(5);
    setComment('');
    setEditingReview(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (rev: Review) => {
    setEditingReview(rev);
    setName(rev.authorBangla);
    setLocation(rev.locationBangla);
    setRating(rev.rating);
    setComment(rev.commentBangla);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    if (editingReview) {
      updateReview({
        ...editingReview,
        authorBangla: name.trim(),
        locationBangla: location.trim() || 'বাংলাদেশ',
        rating,
        commentBangla: comment.trim()
      });
    } else {
      addReview({
        authorBangla: name.trim(),
        locationBangla: location.trim() || 'বাংলাদেশ',
        rating,
        commentBangla: comment.trim(),
        verifiedBuyer: true
      });
    }

    setIsModalOpen(false);
  };

  return (
    <section className="py-16 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-semibold text-[#1a4d36] tracking-wider uppercase mb-1">
              প্রকৃত ক্রেতাদের অভিজ্ঞতা
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#143425]">
              গ্রাহকদের বিশ্বস্ত মন্তব্য ও রিভিউ
            </h2>
          </div>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#183e2c] hover:bg-[#102d1f] text-white rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>আপনার রিভিউ লিখুন</span>
          </button>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.slice(0, 6).map((rev) => (
            <div
              key={rev.id}
              className="p-6 bg-white rounded-2xl border border-[#e5dcce] shadow-xs flex flex-col justify-between hover:shadow-sm transition-shadow relative group"
            >
              {/* Edit button */}
              <button
                onClick={() => handleOpenEdit(rev)}
                className="absolute top-4 right-4 p-1.5 text-[#88988e] hover:text-[#183e2c] bg-[#faf7f2] rounded-lg opacity-60 group-hover:opacity-100 transition-opacity"
                title="রিভিউ এডিট করুন"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>

              <div className="space-y-3">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-[#d97706]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rev.rating ? 'fill-current' : 'text-slate-200'
                      }`}
                    />
                  ))}
                  <span className="text-xs font-bold text-[#1e2a22] ml-1 tabular-nums">
                    {rev.rating}.0
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#38483e] leading-relaxed italic">
                  "{rev.commentBangla}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 mt-4 border-t border-[#f0e8dc] flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center gap-1 font-bold text-[#143425]">
                    <span>{rev.authorBangla}</span>
                    {rev.verifiedBuyer && (
                      <span title="যাচাইকৃত ক্রেতা" className="inline-flex items-center">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1f7344]" />
                      </span>
                    )}
                  </div>
                  <span className="text-[#728378] text-[11px]">{rev.locationBangla}</span>
                </div>
                <span className="text-[#8e9d94] text-[11px]">{rev.dateBangla}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-[#fcfaf7] rounded-2xl shadow-xl border border-[#ded3c2] overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#e7ddd0]">
              <h3 className="text-sm font-bold text-[#143425]">
                {editingReview ? 'রিভিউ এডিট করুন' : 'নতুন রিভিউ যোগ করুন'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#64746a] hover:text-black"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#2b3c31] mb-1">আপনার নাম *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="যেমন: রাশেদুল ইসলাম"
                  className="w-full px-3 py-2 rounded-lg border border-[#cfc3b1] bg-white text-xs text-[#1c2921]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#2b3c31] mb-1">এলাকা / জেলা</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="যেমন: বনশ্রী, ঢাকা"
                  className="w-full px-3 py-2 rounded-lg border border-[#cfc3b1] bg-white text-xs text-[#1c2921]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#2b3c31] mb-1">রেটিং</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-[#cfc3b1] bg-white text-xs"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (৫/৫ - অসাধারণ)</option>
                  <option value={4}>⭐⭐⭐⭐ (৪/৫ - ভালো)</option>
                  <option value={3}>⭐⭐⭐ (৩/৫ - সন্তোষজনক)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#2b3c31] mb-1">আপনার অভিজ্ঞতা / মন্তব্য *</label>
                <textarea
                  required
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="পণ্যের মান, প্যাকেজিং বা ডেলিভারি সম্পর্কে আপনার মতামত..."
                  className="w-full px-3 py-2 rounded-lg border border-[#cfc3b1] bg-white text-xs text-[#1c2921]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3.5 py-2 border border-[#d2c5b3] text-[#425246] rounded-lg text-xs"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#183e2c] text-white rounded-lg text-xs font-semibold hover:bg-[#102d1f]"
                >
                  {editingReview ? 'আপডেট করুন' : 'সাবমিট করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
