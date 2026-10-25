import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Review, PlacedOrder, OrderCustomerInfo } from '../types';
import { INITIAL_PRODUCTS } from '../data/products';
import { INITIAL_REVIEWS } from '../data/reviews';

interface ShopContextType {
  // Navigation
  currentView: 'home' | 'shop' | 'about' | 'contact' | 'faqs' | 'policy' | 'order-success';
  setCurrentView: (view: 'home' | 'shop' | 'about' | 'contact' | 'faqs' | 'policy' | 'order-success') => void;
  
  // Product Catalog & Editing
  products: Product[];
  updateProduct: (updated: Product) => void;
  resetProductsToDefault: () => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  editingProduct: Product | null;
  setEditingProduct: (p: Product | null) => void;

  // Reviews & Editing
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'dateBangla'>) => void;
  updateReview: (updated: Review) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedSize?: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartTotalCount: number;
  cartSubtotal: number;
  deliveryArea: 'dhaka' | 'outside';
  setDeliveryArea: (area: 'dhaka' | 'outside') => void;
  deliveryCharge: number;
  couponCode: string;
  setCouponCode: (code: string) => void;
  discountAmount: number;
  couponApplied: boolean;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  cartGrandTotal: number;

  // Modals & Drawers
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (open: boolean) => void;

  // Search & Filter State
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  sortBy: 'popularity' | 'price-asc' | 'price-desc' | 'newest' | 'discount';
  setSortBy: (sort: 'popularity' | 'price-asc' | 'price-desc' | 'newest' | 'discount') => void;

  // Orders
  lastPlacedOrder: PlacedOrder | null;
  placeOrder: (customerInfo: OrderCustomerInfo) => PlacedOrder;

  // Toast Feedback
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // WhatsApp Order Helper
  generateWhatsAppLink: (items?: CartItem[], customer?: Partial<OrderCustomerInfo>) => string;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const PRODUCTS_STORAGE_KEY = 'naturenest_products_v1';
const REVIEWS_STORAGE_KEY = 'naturenest_reviews_v1';
const CART_STORAGE_KEY = 'naturenest_cart_v1';

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<'home' | 'shop' | 'about' | 'contact' | 'faqs' | 'policy' | 'order-success'>('home');
  
  // Products state with localStorage
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_PRODUCTS;
  });

  // Reviews state with localStorage
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem(REVIEWS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_REVIEWS;
  });

  // Cart state with localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return [];
  });

  // Navigation & Modals
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2500]);
  const [sortBy, setSortBy] = useState<'popularity' | 'price-asc' | 'price-desc' | 'newest' | 'discount'>('popularity');

  // Checkout and delivery
  const [deliveryArea, setDeliveryArea] = useState<'dhaka' | 'outside'>('dhaka');
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<PlacedOrder | null>(null);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    } catch {
      // Ignore
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
    } catch {
      // Ignore
    }
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore
    }
  }, [cart]);

  // Product actions
  const updateProduct = (updated: Product) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
    if (selectedProduct && selectedProduct.id === updated.id) {
      setSelectedProduct(updated);
    }
    showToast(`"${updated.banglaName}" পণ্যের তথ্য সফলভাবে আপডেট হয়েছে!`);
  };

  const resetProductsToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem(PRODUCTS_STORAGE_KEY);
    showToast('পণ্যের তালিকা মূল অবস্থায় ফিরিয়ে আনা হয়েছে!');
  };

  // Review actions
  const addReview = (newRev: Omit<Review, 'id' | 'dateBangla'>) => {
    const formattedDate = new Intl.DateTimeFormat('bn-BD', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date());

    const review: Review = {
      ...newRev,
      id: `rev-${Date.now()}`,
      dateBangla: formattedDate
    };
    setReviews((prev) => [review, ...prev]);
    showToast('আপনার মূল্যবান রিভিউ সফলভাবে যুক্ত হয়েছে! ধন্যবাদ।');
  };

  const updateReview = (updated: Review) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === updated.id ? updated : r))
    );
    showToast('রিভিউ আপডেট সম্পন্ন হয়েছে!');
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, selectedSize?: string) => {
    const size = selectedSize || product.availableSizes?.[0] || product.weight;
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        return copy;
      }
      return [...prev, { product, quantity, selectedSize: size }];
    });
    showToast(`"${product.banglaName}" কার্টে যোগ করা হয়েছে!`);
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('আইটেমটি কার্ট থেকে সরানো হয়েছে');
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Free shipping threshold: ৳1500
  const isFreeDelivery = cartSubtotal >= 1500 && cartSubtotal > 0;
  const deliveryCharge = cartSubtotal === 0 ? 0 : isFreeDelivery ? 0 : deliveryArea === 'dhaka' ? 70 : 130;

  // Coupon handling
  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'ORGANIC10' || clean === 'NATURE10') {
      setCouponApplied(true);
      showToast('অভিনন্দন! ১০% অর্গানিক ছাড় যুক্ত হয়েছে।');
      return true;
    } else if (clean === 'FREESHIP') {
      setCouponApplied(true);
      showToast('ফ্রি শিপিং কুপন যুক্ত হয়েছে!');
      return true;
    } else {
      showToast('ভুল কুপন কোড! অনুগ্রহ করে সঠিক কোড দিন (যেমন: ORGANIC10)');
      return false;
    }
  };

  const removeCoupon = () => {
    setCouponApplied(false);
    setCouponCode('');
    showToast('কুপন ডিসকাউন্ট সরানো হয়েছে');
  };

  const discountAmount = couponApplied
    ? Math.round(cartSubtotal * 0.1)
    : 0;

  const cartGrandTotal = Math.max(0, cartSubtotal + deliveryCharge - discountAmount);

  // WhatsApp link generation
  const generateWhatsAppLink = (customItems?: CartItem[], customer?: Partial<OrderCustomerInfo>) => {
    const targetItems = customItems || cart;
    const phoneBD = '8801711000000'; // NatureNest official business hotline
    let text = `*🌿 ন্যাচারনেস্ট (NatureNest) নতুন অর্ডার Anfrage*\n\n`;
    
    if (customer?.name) {
      text += `👤 *গ্রাহকের নাম:* ${customer.name}\n`;
      text += `📞 *মোবাইল:* ${customer.phone}\n`;
      if (customer.address) {
        text += `📍 *ঠিকানা:* ${customer.address}, ${customer.district || ''}\n`;
      }
      text += `💳 *পেমেন্ট:* ${customer.paymentMethod === 'bkash' ? 'বিকাশ' : customer.paymentMethod === 'nagad' ? 'নগদ' : 'ক্যাশ অন ডেলিভারি (COD)'}\n\n`;
    }

    text += `*📦 অর্ডারের পণ্যের তালিকা:*\n`;
    targetItems.forEach((item, idx) => {
      text += `${idx + 1}. ${item.product.banglaName} (${item.selectedSize}) x ${item.quantity} = ৳${item.product.price * item.quantity}\n`;
    });

    const sub = targetItems.reduce((acc, it) => acc + it.product.price * it.quantity, 0);
    const ship = sub >= 1500 ? 0 : deliveryArea === 'dhaka' ? 70 : 130;
    const tot = sub + ship;

    text += `\n💵 *সাবটোটাল:* ৳${sub}`;
    text += `\n🚚 *ডেলিভারি চার্জ:* ৳${ship}`;
    text += `\n💰 *সর্বমোট প্রদেয়:* ৳${tot}\n\n`;
    text += `আমি এই অর্ডারটি কনফার্ম করতে চাই। অনুগ্রহ করে দ্রুত ডেলিভারির ব্যবস্থা করবেন।`;

    return `https://wa.me/${phoneBD}?text=${encodeURIComponent(text)}`;
  };

  // Place Order
  const placeOrder = (customerInfo: OrderCustomerInfo): PlacedOrder => {
    const orderId = `NN-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const formattedDate = new Intl.DateTimeFormat('bn-BD', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(new Date());

    const newOrder: PlacedOrder = {
      orderId,
      date: formattedDate,
      customerInfo,
      items: [...cart],
      subtotal: cartSubtotal,
      deliveryCharge,
      discount: discountAmount,
      total: cartGrandTotal,
      status: 'নিশ্চিত করা হয়েছে'
    };

    setLastPlacedOrder(newOrder);
    clearCart();
    setIsCheckoutModalOpen(false);
    setCurrentView('order-success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('আপনার অর্ডারটি সফলভাবে গৃহীত হয়েছে!');
    return newOrder;
  };

  return (
    <ShopContext.Provider
      value={{
        currentView,
        setCurrentView,
        products,
        updateProduct,
        resetProductsToDefault,
        selectedProduct,
        setSelectedProduct,
        editingProduct,
        setEditingProduct,
        reviews,
        addReview,
        updateReview,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotalCount,
        cartSubtotal,
        deliveryArea,
        setDeliveryArea,
        deliveryCharge,
        couponCode,
        setCouponCode,
        discountAmount,
        couponApplied,
        applyCoupon,
        removeCoupon,
        cartGrandTotal,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        priceRange,
        setPriceRange,
        sortBy,
        setSortBy,
        lastPlacedOrder,
        placeOrder,
        toastMessage,
        showToast,
        generateWhatsAppLink
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
