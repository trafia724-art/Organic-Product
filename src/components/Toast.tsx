import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2 } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useShop();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-[#163828] text-white rounded-xl shadow-xl border border-[#27533d] transition-all transform animate-in fade-in slide-in-from-bottom-3 duration-200 max-w-md">
      <CheckCircle2 className="w-5 h-5 text-[#9ed3a9] shrink-0" />
      <p className="text-sm font-medium leading-snug">{toastMessage}</p>
    </div>
  );
};
