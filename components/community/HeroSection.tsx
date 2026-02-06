'use client';

import { CommunityPageData } from '@/types';

interface HeroSectionProps {
  data: CommunityPageData;
}

export default function HeroSection({ data }: HeroSectionProps) {
  return (
    <section className="slider-parallax business-banner-05 bg-overlay-black-50 jarallax" data-speed="0.6" data-img-src="/images/hero-home.png">
      <div className="slider-content-middle">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center"> 
              <div className="slider-content">
                <div className="mb-30">
                  <i className={`${data.heroIcon || 'ti-heart'} theme-color fa-5x`}></i>
                </div>
                <h1 className="text-white mb-20">{data.pageTitle}</h1>
                <p className="text-white mb-40">
                  {data.heroDescription || data.pageSubtitle}
                </p>
                <div className="mt-4">
                  <a className="button hover:scale-105 transition-transform duration-300" href="#events">Tham gia sự kiện</a>
                  <a className="button button-border white ms-3 hover:scale-105 transition-transform duration-300" href="#mentors">Tìm Mentor</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}