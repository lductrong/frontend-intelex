'use client';

import { SectionContent, Partner } from '../../types';

interface StrategicPartnersSectionProps {
  sectionData: SectionContent;
  partners: Partner[];
}

export default function StrategicPartnersSection({ sectionData, partners }: StrategicPartnersSectionProps) {
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

  return (
    <section className="white-bg page-section-ptb">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center mb-60">
            <div className="section-title">
              <h6 className="theme-color">Mạng lưới kết nối</h6>
              <h2 className="title-effect">{sectionData.heading}</h2>
              <p>{sectionData.description}</p>
            </div>
            
            {/* Partners Logo Slider */}
            <div className="clients-list mt-50">
              <div className="partners-grid">
                {partners?.length > 0 ? (
                  partners.map((partner, index) => (
                    <div key={index} className="partner-item">
                      <img 
                        className="img-fluid mx-auto hover:scale-110 transition-transform duration-300" 
                        src={partner.logo?.url ? `${API_URL}${partner.logo.url}` : `/images/partners/${partner.name.toLowerCase()}.png`}
                        alt={partner.name}
                        style={{ maxHeight: '80px', transition: 'transform 0.3s ease' }}
                      />
                    </div>
                  ))
                ) : (
                  // Fallback partners if no data
                  <>
                    <div className="partner-item">
                      <img 
                        className="img-fluid mx-auto hover:scale-110 transition-transform duration-300" 
                        src="/images/partners/thlone.png" 
                        alt="Thlone"
                        style={{ maxHeight: '80px', transition: 'transform 0.3s ease' }}
                      />
                    </div>
                    <div className="partner-item">
                      <img 
                        className="img-fluid mx-auto hover:scale-110 transition-transform duration-300" 
                        src="/images/partners/intelex.png" 
                        alt="Intelex"
                        style={{ maxHeight: '80px', transition: 'transform 0.3s ease' }}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom styles for partners grid */}
      <style jsx>{`
        .partners-grid {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 40px;
        }
        
        .partner-item {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 120px;
          height: 80px;
        }
        
        @media (max-width: 768px) {
          .partners-grid {
            gap: 20px;
          }
          
          .partner-item {
            min-width: 100px;
            height: 60px;
          }
        }
      `}</style>
    </section>
  );
}