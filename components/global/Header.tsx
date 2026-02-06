'use client';

import { useEffect, useState } from 'react';

interface HeaderData {
  logoHeader?: {
    url: string;
    alternativeText?: string;
  };
  menuItems?: Array<{
    label: string;
    url: string;
    isExternal: boolean;
  }>;
  authButtons?: boolean;
}

interface HeaderProps {
  data?: HeaderData;
}

export default function Header({ data }: HeaderProps) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsSticky(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Fallback menu items if no data from backend
  const defaultMenuItems = [
    { label: 'Home', url: '/', isExternal: false },
    { label: 'About', url: '/about', isExternal: false },
    { label: 'Academy', url: '/academy', isExternal: false },
    { label: 'Community', url: '/community', isExternal: false },
    { label: 'Venture Hub', url: '/venture-hub', isExternal: false },
    { label: 'Partners', url: '/partners', isExternal: false },
    { label: 'Blog', url: '/blog', isExternal: false },
  ];

  const menuItems = data?.menuItems || defaultMenuItems;
  const showAuthButtons = data?.authButtons !== false; // Default to true
  const logoUrl = data?.logoHeader?.url 
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${data.logoHeader.url}`
    : '/images/logo.png';

  return (
    <header 
      id="header" 
      className={`header dark ${isSticky ? 'sticky-header' : ''}`}
      style={{
        position: isSticky ? 'fixed' : 'relative',
        top: isSticky ? 0 : 'auto',
        left: isSticky ? 0 : 'auto',
        right: isSticky ? 0 : 'auto',
        zIndex: isSticky ? 9999 : 'auto',
        transition: 'all 0.3s ease-in-out'
      }}
    >
      <div className="menu">
        <nav id="menu" className="mega-menu">
          <section className="menu-list-items">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12 col-md-12 position-relative d-flex align-items-center justify-content-between">
                  {/* Menu Logo */}
                  <ul className="menu-logo m-0">
                    <li>
                      <a href="/">
                        <img id="logo_img" src={logoUrl} alt="logo" />
                      </a>
                    </li>
                  </ul>

                  {/* Menu Links */}
                  <div className="menu-bar">
                    <ul className="menu-links d-flex align-items-center m-0 list-unstyled">
                      {menuItems.map((item, index) => (
                        <li key={index}>
                          {item.isExternal ? (
                            <a 
                              href={item.url || '#'} 
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              {item.label} <i className="fa fa-indicator"></i>
                            </a>
                          ) : (
                            <a href={item.url || '/'}>
                              {item.label} <i className="fa fa-indicator"></i>
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </nav>
      </div>
    </header>
  );
}