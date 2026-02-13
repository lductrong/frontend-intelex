'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Header({ data }: HeaderProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Quản lý đóng/mở menu mobile

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = data?.menuItems || [/* ...default items... */];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isSticky ? 'bg-black/90 py-2 shadow-lg' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="z-50">
          <img src="/images/logo.png" alt="Logo" className="h-10 w-auto" />
        </Link>

        {/* Desktop Menu: Hiện từ màn hình lg (1024px) trở lên */}
        <nav className="hidden lg:flex items-center space-x-8">
          {menuItems.map((item, idx) => (
            <Link 
              key={idx} 
              href={item.url} 
              className="text-white hover:text-blue-400 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Nút Hamburger cho Mobile: Ẩn trên màn hình lg */}
        <button 
          className="lg:hidden z-50 text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>

        {/* Mobile Menu: Chỉ hiện trên Mobile (lg:hidden) */}
        <div className={`
          fixed top-20 right-4 w-64 bg-slate-900/95 backdrop-blur-sm 
          rounded-2xl shadow-2xl border border-white/10
          transition-all duration-300 origin-top-right transform lg:hidden
          ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}
        `}>
          <nav className="flex flex-col p-6 space-y-4">
            {menuItems.map((item, idx) => (
              <Link 
                key={idx} 
                href={item.url} 
                className="text-lg text-white hover:text-blue-400 border-b border-white/5 pb-2 last:border-0"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Nếu bạn có thêm nút Login/Register thì để ở đây */}
            <button className="bg-blue-600 text-white py-2 rounded-lg mt-2">
              Get Started
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}