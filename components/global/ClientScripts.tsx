'use client';

import { useEffect } from 'react';

export default function ClientScripts() {
  useEffect(() => {
    // Load custom.js after component mounts to avoid hydration issues
    const script = document.createElement('script');
    script.src = '/js/custom.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return null;
}