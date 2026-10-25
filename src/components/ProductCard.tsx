import React, { useState } from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/categories';
import { ShoppingBag, Eye, Star, Edit3 } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setSelectedProduct, setEditingProduct } = useShop();
  const [imageError, setImageError] = useState(false);

  const category = CATEGORIES.find((c) => c.id === product.categoryId);

  return (
    <div className="group relative bg-[#fcfaf7] rounded-xl border border-[#e8ded0] overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-[#cfc3b0]">
      {/* Visual Image Slot */}
      <div className="relative aspect-[4/3] w-full bg-[#f1ebe1] overflow-hidden">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.banglaName}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#ebe2d3] to-[#ded2bf] p-4 text-center">
            <span className="text-2xl mb-1">🌿</span>
            <span className="text-xs font-semibold text-[#1a4430]">{product.banglaName}</span>
          </div>
        )}

        {/* Subtle Text Tag (Single unboxed or quiet tag per Section 1A & 2B) */}
        {product.discountPercent && product.discountPercent > 0 && (
          <div className="absolute top-2.5 left-2.5 bg-[#173a2a] text-[#cbf0d7] text-[11px] font-semibold px-2 py-0.5 rounded shadow-sm">
            {product.discountPercent}% ছাড়
          </div>
        )}

        {/* Quick Edit Button for Shop Owner */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setEditingProduct(product);
          }}
          title="মূল্য ও বিবরণ এডিট করুন"
          className="absolute top-2.5 right-2.5 p-1.5 bg-white/90 hover:bg-white text-[#2a3c31] rounded-lg shadow-sm opacity-80 hover:opacity-100 transition-opacity cursor-pointer text-xs flex items-center gap-1"
        >
          <Edit3 className="w-3.5 h-3.5 text-[#88572b]" />
          <span className="text-[10px] hidden sm:inline text-[#674424] font-medium">এডিট</span>
        </button>

        {/* Quick View Floating Button on Hover */}
        <button
          onClick={() => setSelectedProduct(product)}
          className="absolute bottom-2.5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/95 hover:bg-white text-[#193d2b] px-3 py-1.5 rounded-lg text-xs font-medium shadow-md flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>বিস্তারিত দেখুন</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Quiet Metadata: Category · Weight (Clean unboxed inline text) */}
          <div className="flex items-center gap-2 text-xs text-[#6e7d73] mb-1.5">
            <span className="truncate">{category?.banglaName || 'অর্গানিক'}</span>
            <span aria-hidden="true">·</span>
            <span className="shrink-0 font-medium">{product.weight}</span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => setSelectedProduct(product)}
            className="text-[15px] font-semibold text-[#183929] group-hover:text-[#0e2419] transition-colors leading-snug cursor-pointer line-clamp-2"
          >
            {product.banglaName}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2 text-xs text-[#526057]">
            <div className="flex items-center text-[#d97706]">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="font-semibold text-[#1c2921] tabular-nums">{product.rating}</span>
            <span className="text-[#8b988f]">({product.reviewCount})</span>
          </div>
        </div>

        {/* Price & Action Button Footer */}
        <div className="pt-3 mt-3 border-t border-[#eee5d8] flex items-center justify-between gap-2">
          {/* Price with tabular numerals */}
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-[#143224] tabular-nums">
                ৳{product.price}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-[#8c9a91] line-through tabular-nums">
                  ৳{product.originalPrice}
                </span>
              )}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(product, 1)}
            className="px-3 py-2 bg-[#173b2a] hover:bg-[#102a1e] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 shadow-xs cursor-pointer whitespace-nowrap"
            title="কার্টে যোগ করুন"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>অর্ডার</span>
          </button>
        </div>
      </div>
    </div>
  );
};
