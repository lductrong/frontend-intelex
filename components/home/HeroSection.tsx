'use client';

import { useEffect, useRef } from 'react';
import { HeroSectionData } from '@/types';

interface HeroSectionProps {
  data: HeroSectionData;
}

export default function HeroSection({ data }: HeroSectionProps) {
  const typerRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!typerRef.current || !data.typerWords) return;

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const words = data.typerWords;
    const colors = ['#FFCC33', '#FFCC33', '#FFCC33'];

    function type() {
      const currentWord = words[wordIndex];
      const currentColor = colors[wordIndex % colors.length];

      if (typerRef.current) {
        typerRef.current.style.color = currentColor;

        if (isDeleting) {
          typerRef.current.textContent = currentWord.substring(0, charIndex - 1);
          charIndex--;
        } else {
          typerRef.current.textContent = currentWord.substring(0, charIndex + 1);
          charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
          setTimeout(() => {
            isDeleting = true;
          }, 2000);
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
      }

      const speed = isDeleting ? 100 : 150;
      setTimeout(type, speed);
    }

    type();
  }, [data.typerWords]);

  return (
    <section 
      className="slider-parallax business-banner-05 bg-overlay-black-50 jarallax" 
      data-speed="0.6" 
      data-img-src="/images/hero-home.png"
      style={{
        backgroundImage: 'url(/images/hero-home.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="slider-content-middle">
        <div className="container">
          <div className="row">
            <div className="col-lg-10">
              <div className="slider-content">
                <p className="text-white">
                  <b className="theme-color">{data.subtitle}</b>
                </p>
                <h1 className="text-white">
                  {data.title}{' '}
                  <span ref={typerRef} className="typer react-typewriter"></span>
                  <span ref={cursorRef} className="cursor">_</span>
                </h1>
                <div className="mt-4 space-x-2">
                  {data.buttons?.map((button, index) => (
                    <a 
                      key={index} 
                      href={button.url || '/'}
                      className="button black mr-2 mb-2 inline-block"
                    >
                      {button.label}
                    </a>
                  )) || (
                    <a href="#" className="button black">
                      Khám phá ngay
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}