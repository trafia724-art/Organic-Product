import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryBar } from './components/CategoryBar';
import { FeaturedSections } from './components/FeaturedSections';
import { BrandStorySection } from './components/BrandStorySection';
import { ReviewsSection } from './components/ReviewsSection';
import { ShopView } from './components/ShopView';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { FaqView } from './components/FaqView';
import { PolicyView } from './components/PolicyView';
import { OrderSuccessView } from './components/OrderSuccessView';
import { ProductDetailModal } from './components/ProductDetailModal';
import { EditProductModal } from './components/EditProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';
import { MessageCircle } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentView } = useShop();

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5]">
      {/* Top Announcements */}
      <AnnouncementBar />

      {/* Primary Sticky Top Bar */}
      <Navbar />

      {/* Main View Switcher */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <Hero />
            <CategoryBar />
            <FeaturedSections />
            <BrandStorySection />
            <ReviewsSection />
          </>
        )}

        {currentView === 'shop' && <ShopView />}
        {currentView === 'about' && <AboutView />}
        {currentView === 'contact' && <ContactView />}
        {currentView === 'faqs' && <FaqView />}
        {currentView === 'policy' && <PolicyView />}
        {currentView === 'order-success' && <OrderSuccessView />}
      </main>

      {/* Global Modals & Drawers */}
      <ProductDetailModal />
      <EditProductModal />
      <CartDrawer />
      <CheckoutModal />
      <Toast />

      {/* Floating WhatsApp Button (Adhering to mobile sticky cap) */}
      <a
        href="https://wa.me/8801711000000?text=%E0%A6%B9%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%B2%E0%A7%8B%20%E0%A6%A8%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%9A%E0%A6%BE%E0%A6%B0%E0%A6%A8%E0%A7%87%E0%A6%B8%E0%A7%8D%E0%A6%9F%2C%20%E0%A6%86%E0%A6%AE%E0%A6%BF%20%E0%A6%AA%E0%A6%A3%E0%A7%8D%E0%A6%AF%20%E0%A6%B8%E0%A6%AE%E0%A7%8D%E0%A6%AA%E0%A6%B0%E0%A7%8D%E0%A6%95%E0%A7%87%20%E0%A6%9C%E0%A6%BE%E0%A6%A8%E0%A6%A4%E0%A7%87%20%E0%A6%9A%E0%A6%BE%E0%A6%87%E0%A5%A4"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-40 p-3 bg-[#25d366] text-white rounded-full shadow-lg hover:bg-[#1eb754] transition-all hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer"
        aria-label="Direct WhatsApp Message"
        title="WhatsApp এ সরাসরি মেসেজ দিন"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* Brand Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
}
