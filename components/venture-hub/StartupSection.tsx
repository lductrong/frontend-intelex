'use client';

import { SectionContent, Startup } from '@/types';

interface StartupSectionProps {
  sectionData: SectionContent;
  startups: Startup[];
}

export default function StartupSection({ sectionData, startups }: StartupSectionProps) {
  // Display first 3 startups
  const displayedStartups = startups.slice(0, 3);

  // Format funding amount
  const formatFunding = (amount: number) => {
    return amount ? amount.toLocaleString() : '0';
  };

  // Get industry display name
  const getIndustryName = (industry: string) => {
    const industryMap: { [key: string]: string } = {
      'edtech': 'EdTech',
      'fintech': 'FinTech',
      'healthtech': 'HealthTech',
      'ecommerce': 'E-commerce',
      'ai': 'AI/ML',
      'iot': 'IoT',
      'other': 'Khác'
    };
    return industryMap[industry] || industry;
  };

  return (
    <section className="white-bg page-section-ptb" id="funded-startups">
      <div className="container">
        <div className="row justify-content-center mb-50">
          <div className="col-lg-8 text-center">
            <h3 className="theme-color mb-20">{sectionData.heading}</h3>
            <p>{sectionData.description}</p>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {displayedStartups && displayedStartups.length > 0 ? (
            displayedStartups.map((startup, index) => (
              <div key={startup.slug || index} className="col">
                <div className="feature-text box-shadow white-bg hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-100 d-flex flex-column">
                  <div className="startup-logo text-center p-30 pb-0">
                    <div className="startup-industry mb-15">
                      <span className="badge bg-primary">{getIndustryName(startup.industry)}</span>
                    </div>
                    <img 
                      className="img-fluid" 
                      src={startup.logo || `/images/partners/logo.png`}
                      alt={startup.name}
                      style={{ maxHeight: '80px' }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/partners/logo.png';
                      }}
                    />
                  </div>
                  <div className="feature-info p-30 flex-grow-1 d-flex flex-column">
                    <h5 className="mb-15 text-center">{startup.name}</h5>
                    <p className="mb-20 text-center flex-grow-1">{startup.description}</p>
                    
                    <div className="team-info text-center mb-20">
                      <small className="text-muted">Team: {startup.teamMembers}</small>
                    </div>
                    
                    <div className="startup-stats mt-auto">
                      <div className="row text-center border-top pt-20">
                        <div className="col-6">
                          <small className="text-muted">Vốn đầu tư</small>
                          <h6 className="theme-color mb-0">${formatFunding(startup.fundingAmount)}</h6>
                        </div>
                        <div className="col-6">
                          <small className="text-muted">
                            {startup.metrics?.label || 'Metrics'}
                          </small>
                          <h6 className="theme-color mb-0">
                            {startup.metrics?.users || startup.metrics?.hospitals || startup.metrics?.partners || 'N/A'}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>Không có dữ liệu startup từ API</p>
            </div>
          )}
        </div>

        <div className="row justify-content-center mt-40">
          <div className="col-md-6 text-center">
            <button className="button button-border hover:scale-105 transition-transform duration-300">
              Xem thêm success stories <i className="ti-arrow-right ps-2"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}