'use client';

import { VisionMissionData, CeoQuoteData } from '@/types';

interface VisionMissionSectionProps {
  visionMission: VisionMissionData;
  ceoQuote: CeoQuoteData;
}

export default function VisionMissionSection({ visionMission, ceoQuote }: VisionMissionSectionProps) {
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

  return (
    <section className="page-section-ptb gray-bg">
      <div className="container">
        <div className="row d-flex">
          
          {/* Cột Trái: Vision & Mission */}
          <div className="col-lg-6 col-md-12 sm-mb-30 d-flex">
            <div className="white-bg box-shadow p-5 rounded h-100 w-100">
              <div className="section-title mb-20">
                <h6 className="theme-color">{visionMission.sectionTitle}</h6>
                <h2 className="title-effect">{visionMission.heading}</h2>
              </div>
              <p>{visionMission.description}</p>
              <p className="mb-4">{visionMission.mission}</p>

              {/* Features List */}
              <div className="row mt-auto">
                <div className="col-md-6">
                  <ul className="list-unstyled">
                    {visionMission.features?.slice(0, 2).map((feature, index) => (
                      <li key={index} className="mb-2">
                        <i className={`${feature.iconClass} theme-color me-2`}></i>
                        {feature.text}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul className="list-unstyled">
                    {visionMission.features?.slice(2, 4).map((feature, index) => (
                      <li key={index} className="mb-2">
                        <i className={`${feature.iconClass} theme-color me-2`}></i>
                        {feature.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Cột Phải: CEO Quote */}
          <div className="col-lg-6 col-md-12 d-flex">
            <div className="white-bg box-shadow p-5 rounded h-100 w-100 d-flex flex-column justify-content-center">
              
              <div className="mb-4">
                <i className="fa fa-quote-left fa-3x theme-color opacity-50"></i>
              </div>

              <h4 className="mb-4" style={{lineHeight: 1.6, fontWeight: 400, fontStyle: 'italic'}}>
                "{ceoQuote.quote}"
              </h4>

              <div className="d-flex align-items-center mt-auto border-top pt-4">
                <div className="author-avatar me-3">
                  <img 
                    src={ceoQuote.authorPhoto?.url ? `${API_URL}${ceoQuote.authorPhoto.url}` : 'http://localhost:1337/uploads/ceo_948cee97f4.png'}
                    className="rounded-circle shadow-sm"
                    style={{width: '70px', height: '70px', objectFit: 'cover'}}
                    alt={ceoQuote.authorName}
                  />
                </div>
                <div className="author-info">
                  <h5 className="mb-0 text-uppercase" style={{fontSize: '16px'}}>
                    {ceoQuote.authorName}
                  </h5>
                  <span className="theme-color">{ceoQuote.authorTitle}</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}