'use client';

import { SectionContent, SuccessStory } from '../../types';

interface SuccessStoriesSectionProps {
  sectionData: SectionContent;
  successStories: SuccessStory[];
}

export default function SuccessStoriesSection({ sectionData, successStories }: SuccessStoriesSectionProps) {
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  
  // Get featured story
  const featuredStory = successStories.find(s => s.featured) || successStories[0];
  const otherStories = successStories.filter(s => !s.featured).slice(0, 2);

  // Get category badge class
  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'edtech': return 'bg-info';
      case 'fintech': return 'bg-primary';
      case 'healthtech': return 'bg-success';
      case 'iot': return 'bg-warning';
      case 'ai': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  // Get category text
  const getCategoryText = (category: string) => {
    switch (category) {
      case 'edtech': return 'EdTech';
      case 'fintech': return 'FinTech';
      case 'healthtech': return 'HealthTech';
      case 'iot': return 'IoT';
      case 'ai': return 'AI';
      default: return category;
    }
  };

  return (
    <section className="white-bg page-section-ptb" id="success-stories">
      <div className="container">
        <div className="row justify-content-center mb-50">
          <div className="col-lg-8 text-center">
            <h3 className="theme-color mb-20">{sectionData.heading}</h3>
            <p>{sectionData.description}</p>
          </div>
        </div>

        {/* Featured Success Story */}
        {featuredStory && (
          <div className="row mb-50">
            <div className="col-lg-12">
              <div className="feature-text box-shadow white-bg hover:shadow-lg transition-all duration-300">
                <div className="row align-items-center">
                  <div className="col-lg-4">
                    <div className="feature-img p-30">
                      <img 
                        className="img-fluid rounded" 
                        src={featuredStory.image?.url ? `${API_URL}${featuredStory.image.url}` : "/images/blog/02.png"}
                        alt={featuredStory.title}
                      />
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="feature-info p-50">
                      <div className="mb-20">
                        <span className="badge bg-success me-2">Success Story</span>
                        <span className={`badge ${getCategoryBadgeClass(featuredStory.category)}`}>
                          {getCategoryText(featuredStory.category)}
                        </span>
                      </div>
                      <h4 className="mb-20">{featuredStory.title}</h4>
                      <p className="mb-20">{featuredStory.description}</p>
                      
                      <div className="row mb-30">
                        <div className="col-md-3">
                          <small className="text-muted d-block">Đối tác trường</small>
                          <strong>{featuredStory.universityPartner}</strong>
                        </div>
                        <div className="col-md-3">
                          <small className="text-muted d-block">Đối tác doanh nghiệp</small>
                          <strong>{featuredStory.companyPartner}</strong>
                        </div>
                        <div className="col-md-3">
                          <small className="text-muted d-block">Thời gian</small>
                          <strong>{featuredStory.duration}</strong>
                        </div>
                        <div className="col-md-3">
                          <small className="text-muted d-block">Kết quả</small>
                          <strong className="theme-color">{featuredStory.results}</strong>
                        </div>
                      </div>
                      
                      {featuredStory.quote && (
                        <blockquote className="blockquote">
                          <p className="mb-0">"{featuredStory.quote}"</p>
                          {featuredStory.quoteAuthor && (
                            <footer className="blockquote-footer mt-10">
                              <cite title="Source Title">
                                {featuredStory.quoteAuthor}
                                {featuredStory.quoteAuthorTitle && ` - ${featuredStory.quoteAuthorTitle}`}
                              </cite>
                            </footer>
                          )}
                        </blockquote>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* More Success Stories Grid */}
        <div className="row row-cols-1 row-cols-lg-2 g-4">
          {otherStories?.map((story, index) => (
            <div key={story.slug || index} className="col">
              <div className="feature-text box-shadow white-bg hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-100 d-flex flex-column">
                <div className="feature-info p-30 flex-grow-1 d-flex flex-column">
                  <div className="mb-20">
                    <span className={`badge ${getCategoryBadgeClass(story.category)} me-2`}>
                      {getCategoryText(story.category)}
                    </span>
                    <span className="badge bg-secondary">{story.year}</span>
                  </div>
                  <h5 className="mb-15">{story.title}</h5>
                  <p className="mb-20 flex-grow-1">{story.shortDescription || story.description}</p>
                  
                  <div className="success-metrics mb-20">
                    <div className="row text-center">
                      {story.metrics && Object.entries(story.metrics).slice(0, 3).map(([key, value], metricIndex) => (
                        <div key={key} className="col-4">
                          <small className="text-muted d-block">{key === 'students' ? 'Học viên' : key === 'courses' ? 'Khóa học' : key === 'completion' ? 'Tỷ lệ hoàn thành' : key === 'sensors' ? 'Cảm biến' : key === 'districts' ? 'Khu vực' : key === 'savings' ? 'Tiết kiệm' : key}</small>
                          <strong className="theme-color">{value}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    <a className="button x-small hover:scale-105 transition-transform duration-300" href="javascript:void(0)">Xem chi tiết</a>
                  </div>
                </div>
              </div>
            </div>
          )) || (
            // Fallback stories if no data
            <>
              <div className="col">
                <div className="feature-text box-shadow white-bg h-100 d-flex flex-column">
                  <div className="feature-info p-30 flex-grow-1 d-flex flex-column">
                    <div className="mb-20">
                      <span className="badge bg-info me-2">EdTech</span>
                      <span className="badge bg-secondary">2024</span>
                    </div>
                    <h5 className="mb-15">Nền tảng học trực tuyến AI</h5>
                    <p className="mb-20 flex-grow-1">Hợp tác giữa ĐH Bách Khoa và EduTech Corp tạo ra nền tảng học tập thông minh với AI cá nhân hóa.</p>
                    
                    <div className="success-metrics mb-20">
                      <div className="row text-center">
                        <div className="col-4">
                          <small className="text-muted d-block">Học viên</small>
                          <strong className="theme-color">15K+</strong>
                        </div>
                        <div className="col-4">
                          <small className="text-muted d-block">Khóa học</small>
                          <strong className="theme-color">200+</strong>
                        </div>
                        <div className="col-4">
                          <small className="text-muted d-block">Tỷ lệ hoàn thành</small>
                          <strong className="theme-color">85%</strong>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-auto">
                      <a className="button x-small" href="javascript:void(0)">Xem chi tiết</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="feature-text box-shadow white-bg h-100 d-flex flex-column">
                  <div className="feature-info p-30 flex-grow-1 d-flex flex-column">
                    <div className="mb-20">
                      <span className="badge bg-warning me-2">IoT</span>
                      <span className="badge bg-secondary">2024</span>
                    </div>
                    <h5 className="mb-15">Smart City Solutions</h5>
                    <p className="mb-20 flex-grow-1">Dự án hợp tác với ĐH Công Nghệ và SmartCity Inc phát triển giải pháp IoT cho thành phố thông minh.</p>
                    
                    <div className="success-metrics mb-20">
                      <div className="row text-center">
                        <div className="col-4">
                          <small className="text-muted d-block">Cảm biến</small>
                          <strong className="theme-color">1000+</strong>
                        </div>
                        <div className="col-4">
                          <small className="text-muted d-block">Khu vực</small>
                          <strong className="theme-color">5 quận</strong>
                        </div>
                        <div className="col-4">
                          <small className="text-muted d-block">Tiết kiệm</small>
                          <strong className="theme-color">30%</strong>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-auto">
                      <a className="button x-small" href="javascript:void(0)">Xem chi tiết</a>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}