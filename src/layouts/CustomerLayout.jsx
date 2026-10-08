import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { CartDrawer } from '../components/cart/CartDrawer';

export function CustomerLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBFC] font-sans antialiased text-[#282C3F]">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
