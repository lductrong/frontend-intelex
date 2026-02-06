'use client';

import { CtaSectionData } from '@/types';

interface CtaSectionProps {
  data: CtaSectionData;
}

export default function CtaSection({ data }: CtaSectionProps) {
  return (
    <section className="dark-theme-bg pos-r page-section-ptb" id="venture">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 text-center">
            
            <div className="mb-30 animate-pulse">
              <i className={`${data.icon} theme-color fa-5x`}></i>
            </div>
            
            <h2 className="text-white title-effect">{data.title}</h2>
            
            <p className="text-white mt-20 mb-40 leading-relaxed max-w-4xl mx-auto">
              {data.content}
            </p>

            <div className="row justify-content-center">
              <div className="col-md-12 space-x-4">
                {data.buttons?.map((button, index) => (
                  <a 
                    key={index}
                    className={`button hover:scale-105 transition-all duration-300 ${button.style === 'outline' ? 'button-border white ms-md-3 mt-3 mt-md-0' : ''}`}
                    href={button.url || '#'}
                  >
                    {button.label} <i className={index === 0 ? 'ti-file ps-2' : 'ti-eye ps-2'}></i>
                  </a>
                )) || (
                  <a className="button" href="#">
                    Tìm hiểu thêm <i className="ti-arrow-right ps-2"></i>
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}