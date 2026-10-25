import React from 'react';
import { useShop } from '../context/ShopContext';
import {
  CheckCircle2,
  Printer,
  ShoppingBag,
  ArrowRight,
  Package,
  Truck,
  MessageCircle,
  PhoneCall
} from 'lucide-react';

export const OrderSuccessView: React.FC = () => {
  const { lastPlacedOrder, setCurrentView } = useShop();

  if (!lastPlacedOrder) {
    return (
      <div className="py-20 text-center max-w-xl mx-auto px-4">
        <h2 className="text-xl font-bold text-[#143425]">কোনো সাম্প্রতিক অর্ডার খুঁজে পাওয়া যায়নি</h2>
        <button
          onClick={() => setCurrentView('home')}
          className="mt-4 px-5 py-2.5 bg-[#183e2c] text-white rounded-xl text-sm font-semibold"
        >
          হোম পেজে ফিরুন
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-12 bg-[#faf8f5]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl border border-[#ded3c2] shadow-sm overflow-hidden p-6 sm:p-8 space-y-6 print:border-none print:shadow-none">
          {/* Header */}
          <div className="text-center space-y-2 pb-6 border-b border-[#eee5d7]">
            <div className="w-14 h-14 bg-[#eef7f1] text-[#1c643b] rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#143425]">
              ধন্যবাদ! আপনার অর্ডার সফলভাবে নিশ্চিত হয়েছে
            </h1>
            <p className="text-sm text-[#5a6b61]">
              অর্ডার ট্র্যাকিং আইডি: <span className="font-bold text-[#1a4d36]">{lastPlacedOrder.orderId}</span>
            </p>
            <p className="text-xs text-[#7d8d83]">
              অর্ডারের তারিখ ও সময়: {lastPlacedOrder.date}
            </p>
          </div>

          {/* Delivery Timeline Indicator */}
          <div className="p-4 bg-[#f8f4ee] rounded-xl border border-[#e4dacb]">
            <h3 className="text-xs font-bold text-[#153426] mb-3 uppercase tracking-wider">
              অর্ডার স্ট্যাটাস ও ট্র্যাকিং:
            </h3>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 bg-[#183e2c] text-white rounded-lg font-medium flex flex-col items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-[#a8d8b6]" />
                <span>নিশ্চিত হয়েছে</span>
              </div>
              <div className="p-2 bg-[#eae1d2] text-[#425046] rounded-lg font-medium flex flex-col items-center gap-1">
                <Package className="w-4 h-4 text-[#75847b]" />
                <span>প্যাকিং চলছে</span>
              </div>
              <div className="p-2 bg-[#eae1d2] text-[#425046] rounded-lg font-medium flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-[#75847b]" />
                <span>ডেলিভারিতে</span>
              </div>
            </div>
            <p className="text-xs text-[#526359] mt-3 text-center">
              * আমাদের প্রতিনিধি শীঘ্রই আপনাকে ফোন করে ডেলিভারির তারিখ কনফার্ম করবেন।
            </p>
          </div>

          {/* Customer & Shipping Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-[#faf7f2] rounded-xl border border-[#e9dfd1] space-y-1.5">
              <span className="font-bold text-[#143425] block text-sm">গ্রাহকের বিবরণ:</span>
              <p><strong className="text-[#36463d]">নাম:</strong> {lastPlacedOrder.customerInfo.name}</p>
              <p><strong className="text-[#36463d]">মোবাইল:</strong> {lastPlacedOrder.customerInfo.phone}</p>
              {lastPlacedOrder.customerInfo.altPhone && (
                <p><strong className="text-[#36463d]">বিকল্প ফোন:</strong> {lastPlacedOrder.customerInfo.altPhone}</p>
              )}
            </div>

            <div className="p-4 bg-[#faf7f2] rounded-xl border border-[#e9dfd1] space-y-1.5">
              <span className="font-bold text-[#143425] block text-sm">ডেলিভারি ঠিকানা ও পেমেন্ট:</span>
              <p><strong className="text-[#36463d]">ঠিকানা:</strong> {lastPlacedOrder.customerInfo.address}</p>
              <p><strong className="text-[#36463d]">বিভাগ ও জেলা:</strong> {lastPlacedOrder.customerInfo.division}, {lastPlacedOrder.customerInfo.district}</p>
              <p>
                <strong className="text-[#36463d]">পেমেন্ট মাধ্যম:</strong>{' '}
                {lastPlacedOrder.customerInfo.paymentMethod === 'cod'
                  ? 'ক্যাশ অন ডেলিভারি (COD)'
                  : 'বিকাশ / নগদ মোবাইল ব্যাংকিং'}
              </p>
            </div>
          </div>

          {/* Itemized Receipt Table */}
          <div className="border border-[#e7ddd0] rounded-xl overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#f5ede2] text-[#1a3828] font-bold border-b border-[#e7ddd0]">
                <tr>
                  <th className="py-2.5 px-4">পণ্য</th>
                  <th className="py-2.5 px-4 text-center">পরিমাণ</th>
                  <th className="py-2.5 px-4 text-right">মূল্য</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eee5d9] bg-white">
                {lastPlacedOrder.items.map((it) => (
                  <tr key={`${it.product.id}-${it.selectedSize}`}>
                    <td className="py-2.5 px-4">
                      <span className="font-semibold text-[#183929] block">{it.product.banglaName}</span>
                      <span className="text-[11px] text-[#718077]">{it.selectedSize}</span>
                    </td>
                    <td className="py-2.5 px-4 text-center tabular-nums">{it.quantity}</td>
                    <td className="py-2.5 px-4 text-right font-medium tabular-nums">
                      ৳{it.product.price * it.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-[#faf7f2] text-xs divide-y divide-[#eae0d3]">
                <tr>
                  <td colSpan={2} className="py-2 px-4 text-right text-[#57685e]">সাবটোটাল:</td>
                  <td className="py-2 px-4 text-right font-semibold tabular-nums">৳{lastPlacedOrder.subtotal}</td>
                </tr>
                <tr>
                  <td colSpan={2} className="py-2 px-4 text-right text-[#57685e]">ডেলিভারি চার্জ:</td>
                  <td className="py-2 px-4 text-right font-semibold tabular-nums">
                    {lastPlacedOrder.deliveryCharge === 0 ? 'ফ্রি' : `৳${lastPlacedOrder.deliveryCharge}`}
                  </td>
                </tr>
                {lastPlacedOrder.discount > 0 && (
                  <tr>
                    <td colSpan={2} className="py-2 px-4 text-right text-[#1d633b]">কুপন ছাড়:</td>
                    <td className="py-2 px-4 text-right font-semibold text-[#1d633b] tabular-nums">
                      -৳{lastPlacedOrder.discount}
                    </td>
                  </tr>
                )}
                <tr className="bg-[#f0e7da] font-bold text-sm text-[#143425]">
                  <td colSpan={2} className="py-3 px-4 text-right">সর্বমোট প্রদেয়:</td>
                  <td className="py-3 px-4 text-right tabular-nums text-base">৳{lastPlacedOrder.total}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 print:hidden">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2.5 border border-[#d2c5b3] text-[#34443a] hover:bg-[#f3ede3] rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>মানি রসিদ প্রিন্ট করুন</span>
              </button>

              <a
                href={`https://wa.me/8801711000000?text=${encodeURIComponent(
                  `হ্যালো ন্যাচারনেস্ট, আমি অর্ডার #${lastPlacedOrder.orderId} করেছি। এর ডেলিভারি আপডেট জানতে চাই।`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-[#25d366]/15 hover:bg-[#25d366]/25 text-[#136f36] border border-[#25d366]/40 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#1fa855]" />
                <span>WhatsApp এ কনফার্ম করুন</span>
              </a>
            </div>

            <button
              onClick={() => setCurrentView('shop')}
              className="px-5 py-2.5 bg-[#183e2c] hover:bg-[#102d1f] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <span>আরও কেনাকাটা করুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
