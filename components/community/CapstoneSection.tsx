'use client';

import { SectionContent, CapstoneProject } from '@/types';

interface CapstoneSectionProps {
  sectionData: SectionContent;
  projects: CapstoneProject[];
}

export default function CapstoneSection({ sectionData, projects }: CapstoneSectionProps) {
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  
  // Get featured project
  const featuredProject = projects.find(p => p.featured) || projects[0];
  const otherProjects = projects.filter(p => !p.featured).slice(0, 2);

  // Get status badge class
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'recruiting': return 'bg-success';
      case 'in-progress': return 'bg-warning';
      case 'completed': return 'bg-secondary';
      default: return 'bg-secondary';
    }
  };

  // Get status text
  const getStatusText = (status: string) => {
    switch (status) {
      case 'recruiting': return 'Đang tuyển';
      case 'in-progress': return 'Đang thực hiện';
      case 'completed': return 'Hoàn thành';
      default: return status;
    }
  };

  // Get category badge class
  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'fintech': return 'bg-primary';
      case 'healthtech': return 'bg-success';
      case 'iot': return 'bg-warning';
      case 'ai': return 'bg-danger';
      case 'blockchain': return 'bg-info';
      default: return 'bg-secondary';
    }
  };

  // Get category text
  const getCategoryText = (category: string) => {
    switch (category) {
      case 'fintech': return 'Fintech';
      case 'healthtech': return 'HealthTech';
      case 'iot': return 'IoT';
      case 'ai': return 'AI';
      case 'blockchain': return 'Blockchain';
      default: return category;
    }
  };

  return (
    <section className="bg-light page-section-ptb">
      <div className="container">
        <div className="row justify-content-center mb-50">
          <div className="col-lg-8 text-center">
            <h3 className="theme-color mb-20">{sectionData.heading}</h3>
            <p>{sectionData.description}</p>
          </div>
        </div>

        {/* Featured Project */}
        {featuredProject && (
          <div className="row mb-40">
            <div className="col-lg-12">
              <div className="feature-text box-shadow theme-bg hover:shadow-lg transition-all duration-300">
                <div className="row align-items-center">
                  <div className="col-lg-4">
                    <div className="feature-img p-30">
                      <img 
                        className="img-fluid rounded" 
                        src={featuredProject.image?.url ? `${API_URL}${featuredProject.image.url}` : "/images/blog/03.png"}
                        alt={featuredProject.title}
                      />
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="feature-info p-50">
                      <div className="mb-20">
                        <span className={`badge ${getStatusBadgeClass(featuredProject.status)} me-2`}>
                          {getStatusText(featuredProject.status)}
                        </span>
                        <span className="badge bg-warning">{featuredProject.duration}</span>
                      </div>
                      <h4 className="text-white mb-20">{featuredProject.title}</h4>
                      <p className="text-white mb-20">{featuredProject.description}</p>
                      
                      <div className="row mb-30">
                        <div className="col-md-3">
                          <small className="text-white-50 d-block">Trường đối tác</small>
                          <strong className="text-white">{featuredProject.university}</strong>
                        </div>
                        <div className="col-md-3">
                          <small className="text-white-50 d-block">Doanh nghiệp</small>
                          <strong className="text-white">{featuredProject.partner}</strong>
                        </div>
                        <div className="col-md-3">
                          <small className="text-white-50 d-block">Công nghệ</small>
                          <strong className="text-white">{featuredProject.technologies}</strong>
                        </div>
                        <div className="col-md-3">
                          <small className="text-white-50 d-block">Team size</small>
                          <strong className="text-white">{featuredProject.teamSize}</strong>
                        </div>
                      </div>
                      
                      <a className="button white hover:scale-105 transition-transform duration-300" href="javascript:void(0)">Tham gia dự án</a>
                      <a className="button button-border white ms-3 hover:scale-105 transition-transform duration-300" href="javascript:void(0)">Tìm hiểu thêm</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Projects */}
        <div className="row row-cols-1 row-cols-lg-2 g-4">
          {otherProjects?.map((project, index) => (
            <div key={project.slug || index} className="col">
              <div className="feature-text box-shadow white-bg hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-100 d-flex flex-column">
                <div className="feature-info p-30 flex-grow-1 d-flex flex-column">
                  <div className="mb-20">
                    <span className={`badge ${getCategoryBadgeClass(project.category)} me-2`}>
                      {getCategoryText(project.category)}
                    </span>
                    <span className="badge bg-secondary">{project.duration}</span>
                  </div>
                  <h5 className="mb-15">{project.title}</h5>
                  <p className="mb-20 flex-grow-1">{project.shortDescription || project.description}</p>
                  
                  <div className="project-meta mb-20">
                    <small className="text-muted d-block mb-5">
                      <i className="ti-user me-1"></i> Đối tác: <strong>{project.partner}</strong>
                    </small>
                    <small className="text-muted d-block">
                      <i className="ti-settings me-1"></i> Tech: <strong>{project.technologies}</strong>
                    </small>
                  </div>
                  
                  <div className="mt-auto">
                    <a className="button x-small hover:scale-105 transition-transform duration-300" href="javascript:void(0)">Ứng tuyển</a>
                  </div>
                </div>
              </div>
            </div>
          )) || (
            <div className="col-12 text-center">
              <p>Đang tải dự án...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}