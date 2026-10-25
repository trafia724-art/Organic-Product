import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { X, Save, RotateCcw, Check, Sparkles } from 'lucide-react';

export const EditProductModal: React.FC = () => {
  const { editingProduct, setEditingProduct, updateProduct } = useShop();

  const [form, setForm] = useState<Product | null>(null);
  const [benefitsText, setBenefitsText] = useState('');

  useEffect(() => {
    if (editingProduct) {
      setForm({ ...editingProduct });
      setBenefitsText(editingProduct.benefitsBangla.join('\n'));
    }
  }, [editingProduct]);

  if (!editingProduct || !form) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const benefits = benefitsText
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const updated: Product = {
      ...form,
      price: Number(form.price) || 0,
      originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
      stock: Number(form.stock) || 0,
      benefitsBangla: benefits.length > 0 ? benefits : form.benefitsBangla
    };

    if (updated.originalPrice && updated.originalPrice > updated.price) {
      updated.discountPercent = Math.round(
        ((updated.originalPrice - updated.price) / updated.originalPrice) * 100
      );
    } else {
      updated.discountPercent = 0;
    }

    updateProduct(updated);
    setEditingProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#fcfaf7] rounded-2xl shadow-2xl border border-[#d8cdbd] overflow-hidden my-8">
        {/* Header */}
        <div className="px-6 py-4 bg-[#143425] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#9bd4aa]" />
            <div>
              <h2 className="text-base font-bold">পণ্যের মূল্য ও বিবরণ এডিটর</h2>
              <p className="text-xs text-[#a9c9b5]">যেকোনো তথ্য সরাসরি পরিবর্তন ও সেভ করুন</p>
            </div>
          </div>
          <button
            onClick={() => setEditingProduct(null)}
            className="p-1.5 text-white/70 hover:text-white rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Bangla Name */}
          <div>
            <label className="block text-xs font-semibold text-[#29392f] mb-1">
              পণ্যের বাংলা নাম *
            </label>
            <input
              type="text"
              required
              value={form.banglaName}
              onChange={(e) => setForm({ ...form, banglaName: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-[#cfc3b1] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#163828] text-[#1c2920]"
            />
          </div>

          {/* English Name & Weight */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#29392f] mb-1">
                ইংরেজি নাম (ক্যাটালগ)
              </label>
              <input
                type="text"
                value={form.englishName}
                onChange={(e) => setForm({ ...form, englishName: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-[#cfc3b1] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#163828]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#29392f] mb-1">
                ওজন বা সাইজ (যেমন: ৫০০ গ্রাম / ২০০ মিলি)
              </label>
              <input
                type="text"
                value={form.weight}
                onChange={(e) => setForm({ ...form, weight: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-[#cfc3b1] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#163828]"
              />
            </div>
          </div>

          {/* Pricing Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-3.5 bg-[#f3ede3] rounded-xl border border-[#e2d8c9]">
            <div>
              <label className="block text-xs font-bold text-[#143425] mb-1">
                বর্তমান বিক্রয় মূল্য (৳) *
              </label>
              <input
                type="number"
                required
                min="1"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg border border-[#c4b6a1] bg-white text-sm font-bold text-[#163828] tabular-nums"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#46544b] mb-1">
                পূর্বের মূল্য / MRP (৳)
              </label>
              <input
                type="number"
                min="0"
                value={form.originalPrice || ''}
                onChange={(e) => setForm({ ...form, originalPrice: Number(e.target.value) || undefined })}
                placeholder="ঐচ্ছিক"
                className="w-full px-3 py-2 rounded-lg border border-[#c4b6a1] bg-white text-sm text-[#46544b] tabular-nums"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#46544b] mb-1">
                স্টক সংখ্যা
              </label>
              <input
                type="number"
                min="0"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg border border-[#c4b6a1] bg-white text-sm tabular-nums"
              />
            </div>
          </div>

          {/* Bangla Description */}
          <div>
            <label className="block text-xs font-semibold text-[#29392f] mb-1">
              বিস্তারিত পণ্যের বিবরণ (বাংলা)
            </label>
            <textarea
              rows={3}
              value={form.descriptionBangla}
              onChange={(e) => setForm({ ...form, descriptionBangla: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-[#cfc3b1] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#163828]"
            />
          </div>

          {/* Benefits / Claims */}
          <div>
            <label className="block text-xs font-semibold text-[#29392f] mb-1">
              উপকারিতা ও গুণাগুণ (প্রতি লাইনে একটি পয়েন্ট লিখুন)
            </label>
            <textarea
              rows={3}
              value={benefitsText}
              onChange={(e) => setBenefitsText(e.target.value)}
              placeholder="পয়েন্ট ১&#10;পয়েন্ট ২&#10;পয়েন্ট ৩"
              className="w-full px-3 py-2 rounded-lg border border-[#cfc3b1] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#163828]"
            />
            <p className="text-[11px] text-[#718077] mt-1">
              * নীতি অনুযায়ী কোনো অযৌক্তিক বা অলৌকিক দাবি নয়, সঠিক ও প্রাকৃতিক বৈশিষ্ট্য উল্লেখ করুন।
            </p>
          </div>

          {/* Usage & Ingredients */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#29392f] mb-1">
                ব্যবহার বিধি
              </label>
              <input
                type="text"
                value={form.usageBangla}
                onChange={(e) => setForm({ ...form, usageBangla: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-[#cfc3b1] bg-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#29392f] mb-1">
                উপাদানসমূহ
              </label>
              <input
                type="text"
                value={form.ingredientsBangla}
                onChange={(e) => setForm({ ...form, ingredientsBangla: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-[#cfc3b1] bg-white text-sm"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-[#e2d8c9] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setEditingProduct(null)}
              className="px-4 py-2 border border-[#d0c4b2] text-[#425046] hover:bg-[#efe7db] rounded-xl text-sm font-medium transition-colors"
            >
              বাতিল
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#163828] hover:bg-[#0f271c] text-white rounded-xl text-sm font-semibold flex items-center gap-1.5 shadow-sm hover:shadow"
            >
              <Save className="w-4 h-4" />
              <span>পরিবর্তন সেভ করুন</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
