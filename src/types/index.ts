export interface Product {
  id: string;
  banglaName: string;
  englishName: string;
  categoryId: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  image: string;
  stock: number;
  weight: string;
  availableSizes?: string[];
  descriptionBangla: string;
  ingredientsBangla: string;
  usageBangla: string;
  benefitsBangla: string[];
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isSpecialOffer?: boolean;
}

export interface Category {
  id: string;
  banglaName: string;
  englishName: string;
  iconName: string;
  description: string;
  tagline: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

export interface Review {
  id: string;
  productId?: string;
  authorBangla: string;
  locationBangla: string;
  rating: number;
  dateBangla: string;
  commentBangla: string;
  verifiedBuyer: boolean;
}

export interface OrderCustomerInfo {
  name: string;
  phone: string;
  altPhone?: string;
  division: string;
  district: string;
  address: string;
  notes?: string;
  paymentMethod: 'cod' | 'bkash' | 'nagad';
  trxId?: string;
}

export interface PlacedOrder {
  orderId: string;
  date: string;
  customerInfo: OrderCustomerInfo;
  items: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  total: number;
  status: 'নিশ্চিত করা হয়েছে' | 'প্যাকেজিং চলছে' | 'ডেলিভারিতে রয়েছে';
}
