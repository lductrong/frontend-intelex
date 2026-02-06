'use client';

import { AboutSectionData } from '@/types';

interface AboutSectionProps {
  data: AboutSectionData;
}

export default function AboutSection({ data }: AboutSectionProps) {
  return (
    <section className="theme-bg page-section-ptb" id="about">
      <div className="container">
        {/* Tiêu đề lớn */}
        <div className="row justify-content-center mb-50">
          <div className="col-md-8 text-center">
            <h2 className="text-white">{data.heading}</h2>
          </div>
        </div>

        <div className="row">
          {data.features?.map((feature, index) => (
            <div key={index} className="col-lg-4 col-md-4 col-sm-12 mb-30">
              <div className="feature-text text-center">
                <div className="feature-icon">
                  <span aria-hidden="true" className={`${feature.iconCode} text-white`}></span>
                </div>
                <div className="feature-info">
                  <h3 className="text-white mt-20 mb-10">{feature.title}</h3>
                  <p className="text-white">{feature.description}</p>
                </div>
              </div>
            </div>
          )) || (
            <div className="col-12 text-center">
              <p className="text-white">Đang tải dữ liệu...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}