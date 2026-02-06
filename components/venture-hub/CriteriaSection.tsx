'use client';

import { SectionContent, Criteria } from '@/types';

interface CriteriaSectionProps {
  sectionData: SectionContent;
  criteria: Criteria[];
}

export default function CriteriaSection({ sectionData, criteria }: CriteriaSectionProps) {
  return (
    <section className="white-bg page-section-ptb">
      <div className="container">
        <div className="row justify-content-center mb-50">
          <div className="col-lg-8 text-center">
            <h3 className="theme-color mb-20">{sectionData.heading}</h3>
            <p>{sectionData.description}</p>
          </div>
        </div>
        
        <div className="row">
          {criteria && criteria.length > 0 ? (
            criteria.map((item, index) => (
              <div key={index} className="col-lg-6 col-md-6 mb-30">
                <div className="feature-text text-start hover:shadow-lg transition-all duration-300">
                  <div className="feature-icon float-start me-4">
                    <i className={`${item.icon || 'ti-check-box'} theme-color fa-2x`}></i>
                  </div>
                  <div className="feature-info">
                    <h5 className="mb-15">{item.title}</h5>
                    <p>{item.description}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>Không có dữ liệu tiêu chí từ API</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}