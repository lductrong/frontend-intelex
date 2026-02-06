'use client';

import { useEffect } from 'react';

export function usePreloader() {
  useEffect(() => {
    // Hide preloader after page loads - replace jQuery logic
    const timer = setTimeout(() => {
      const preloader = document.getElementById('pre-loader');
      if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
}