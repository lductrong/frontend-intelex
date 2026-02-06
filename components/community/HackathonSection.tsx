'use client';

import { SectionContent, Hackathon } from '@/types';

interface HackathonSectionProps {
  sectionData: SectionContent;
  hackathons: Hackathon[];
}

export default function HackathonSection({ sectionData, hackathons }: HackathonSectionProps) {
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  
  // Get featured hackathon
  const featuredHackathon = hackathons.find(h => h.featured) || hackathons[0];
  const otherHackathons = hackathons.filter(h => !h.featured).slice(0, 3);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  // Get status badge class
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'open': return 'bg-success';
      case 'closed': return 'bg-secondary';
      case 'upcoming': return 'bg-warning';
      default: return 'bg-secondary';
    }
  };

  // Get status text
  const getStatusText = (status: string) => {
    switch (status) {
      case 'open': return 'Đang mở đăng ký';
      case 'closed': return 'Đã đóng';
      case 'upcoming': return 'Sắp diễn ra';
      default: return status;
    }
  };

  // Get type badge class
  const getTypeBadgeClass = (type: string) => {
    switch (type) {
      case 'hackathon': return 'bg-danger';
      case 'workshop': return 'bg-primary';
      case 'networking': return 'bg-warning';
      case 'competition': return 'bg-info';
      default: return 'bg-secondary';
    }
  };

  // Get type text
  const getTypeText = (type: string) => {
    switch (type) {
      case 'hackathon': return 'HOT';
      case 'workshop': return 'Workshop';
      case 'networking': return 'Networking';
      case 'competition': return 'Competition';
      default: return type;
    }
  };

  return (
    <section className="white-bg page-section-ptb" id="events">
      <div className="container">
        <div className="row justify-content-center mb-50">
          <div className="col-lg-8 text-center">
            <h3 className="theme-color mb-20">{sectionData.heading}</h3>
            <p>{sectionData.description}</p>
          </div>
        </div>

        {/* Featured Event */}
        {featuredHackathon && (
          <div className="row mb-50">
            <div className="col-lg-12">
              <div className="feature-text box-shadow white-bg hover:shadow-lg transition-all duration-300">
                <div className="row align-items-center">
                  <div className="col-lg-8">
                    <div className="feature-info p-50">
                      <div className="mb-20">
                        <span className={`badge ${getTypeBadgeClass(featuredHackathon.type)} me-2`}>
                          {getTypeText(featuredHackathon.type)}
                        </span>
                        <span className={`badge ${getStatusBadgeClass(featuredHackathon.status)}`}>
                          {getStatusText(featuredHackathon.status)}
                        </span>
                      </div>
                      <h3 className="mb-20">{featuredHackathon.title}</h3>
                      <p className="mb-20">{featuredHackathon.description}</p>
                      
                      <div className="row mb-30">
                        <div className="col-md-3">
                          <small className="text-muted d-block">Ngày tổ chức</small>
                          <strong>
                            {formatDate(featuredHackathon.startDate)}
                            {featuredHackathon.endDate && featuredHackathon.startDate !== featuredHackathon.endDate && 
                              ` - ${formatDate(featuredHackathon.endDate)}`
                            }
                          </strong>
                        </div>
                        <div className="col-md-3">
                          <small className="text-muted d-block">Địa điểm</small>
                          <strong>{featuredHackathon.location}</strong>
                        </div>
                        <div className="col-md-3">
                          <small className="text-muted d-block">Giải thưởng</small>
                          <strong className="theme-color">{featuredHackathon.prize}</strong>
                        </div>
                        <div className="col-md-3">
                          <small className="text-muted d-block">Đã đăng ký</small>
                          <strong>{featuredHackathon.registeredTeams} teams</strong>
                        </div>
                      </div>
                      
                      <a className="button hover:scale-105 transition-transform duration-300" href="javascript:void(0)">Đăng ký ngay</a>
                      <a className="button button-border ms-3 hover:scale-105 transition-transform duration-300" href="javascript:void(0)">Xem chi tiết</a>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="feature-img">
                      <img 
                        className="img-fluid" 
                        src={featuredHackathon.image?.url ? `${API_URL}${featuredHackathon.image.url}` : "/images/blog/02.png"}
                        alt={featuredHackathon.title}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Events Grid */}
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {otherHackathons?.map((hackathon, index) => (
            <div key={hackathon.slug || index} className="col">
              <div className="feature-text box-shadow white-bg hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-100 d-flex flex-column">
                <div className="feature-img">
                  <img 
                    className="img-fluid" 
                    src={hackathon.image?.url ? `${API_URL}${hackathon.image.url}` : `/images/blog/01.png`}
                    alt={hackathon.title}
                    style={{ height: '200px', objectFit: 'cover', width: '100%' }}
                  />
                  <div className="feature-overlay">
                    <div className="feature-overlay-content">
                      <span className={`badge ${getTypeBadgeClass(hackathon.type)}`}>
                        {getTypeText(hackathon.type)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="feature-info p-30 flex-grow-1 d-flex flex-column">
                  <h5 className="mb-15">{hackathon.title}</h5>
                  <p className="mb-20 flex-grow-1">{hackathon.shortDescription || hackathon.description}</p>
                  
                  <div className="event-meta mb-20">
                    <div className="row">
                      <div className="col-6">
                        <small className="text-muted">
                          <i className="ti-calendar"></i> {formatDate(hackathon.startDate)}
                        </small>
                      </div>
                      <div className="col-6 text-end">
                        <small className="text-muted">
                          <i className="ti-location-pin"></i> {hackathon.location}
                        </small>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    <a className="button x-small hover:scale-105 transition-transform duration-300" href="javascript:void(0)">
                      {hackathon.type === 'workshop' ? 'Giữ chỗ ngay' : 
                       hackathon.type === 'networking' ? 'Đăng ký tham gia' : 
                       'Tham gia thử thách'}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )) || (
            <div className="col-12 text-center">
              <p>Đang tải sự kiện...</p>
            </div>
          )}
        </div>

        <div className="row justify-content-center mt-40">
          <div className="col-md-6 text-center">
            <a className="button button-border hover:scale-105 transition-transform duration-300" href="javascript:void(0)">
              Xem tất cả sự kiện <i className="ti-calendar ps-2"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}