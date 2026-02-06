'use client';

import { useEffect } from 'react';

export function useBackToTop() {
  useEffect(() => {
    // Back to top functionality - replace jQuery logic
    const handleScroll = () => {
      const backToTop = document.getElementById('back-to-top');
      if (backToTop) {
        if (window.scrollY > 100) {
          backToTop.style.opacity = '1';
          backToTop.style.visibility = 'visible';
        } else {
          backToTop.style.opacity = '0';
          backToTop.style.visibility = 'hidden';
        }
      }
    };

    const handleClick = (e: Event) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

    window.addEventListener('scroll', handleScroll);
    
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
      backToTop.addEventListener('click', handleClick);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (backToTop) {
        backToTop.removeEventListener('click', handleClick);
      }
    };
  }, []);
}