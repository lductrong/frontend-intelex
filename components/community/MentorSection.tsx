'use client';

import { SectionContent, CommunityMentor } from '@/types';

interface MentorSectionProps {
  sectionData: SectionContent;
  mentors: CommunityMentor[];
}

export default function MentorSection({ sectionData, mentors }: MentorSectionProps) {
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  
  // Display first 3 mentors
  const displayedMentors = mentors.slice(0, 3);

  // Get skill badge colors
  const getSkillBadgeClass = (skill: string, index: number) => {
    const colors = ['bg-primary', 'bg-success', 'bg-info', 'bg-warning', 'bg-danger', 'bg-dark'];
    return colors[index % colors.length];
  };

  return (
    <section className="white-bg page-section-ptb" id="mentors">
      <div className="container">
        <div className="row justify-content-center mb-50">
          <div className="col-lg-8 text-center">
            <h3 className="theme-color mb-20">{sectionData.heading}</h3>
            <p>{sectionData.description}</p>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {displayedMentors?.map((mentor, index) => (
            <div key={mentor.slug || index} className="col">
              <div className="feature-text box-shadow white-bg text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-100 d-flex flex-column">
                <div className="mentor-photo p-30 pb-0">
                  <img 
                    className="img-fluid rounded-circle mx-auto" 
                    src={mentor.avatar?.url ? `${API_URL}${mentor.avatar.url}` : `/images/team/01.png`}
                    alt={mentor.name}
                    style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                  />
                </div>
                <div className="feature-info p-30 flex-grow-1 d-flex flex-column">
                  <h5 className="mb-10">{mentor.name}</h5>
                  <span className="theme-color mb-15 d-block">{mentor.title}</span>
                  
                  <div className="mentor-skills mb-20 flex-grow-1">
                    {(mentor.skills || mentor.expertise)?.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex} 
                        className={`badge ${getSkillBadgeClass(skill, skillIndex)} me-1 mb-5`}
                      >
                        {skill}
                      </span>
                    )) || (
                      <>
                        <span className="badge bg-primary me-1 mb-5">JavaScript</span>
                        <span className="badge bg-success me-1 mb-5">React</span>
                        <span className="badge bg-info me-1 mb-5">Node.js</span>
                      </>
                    )}
                  </div>
                  
                  <div className="mentor-stats mb-20">
                    <div className="row text-center">
                      <div className="col-4">
                        <small className="text-muted d-block">Kinh nghiệm</small>
                        <strong>{mentor.experience || '5+ năm'}</strong>
                      </div>
                      <div className="col-4">
                        <small className="text-muted d-block">Mentees</small>
                        <strong>{mentor.mentees || 0}+</strong>
                      </div>
                      <div className="col-4">
                        <small className="text-muted d-block">Rating</small>
                        <strong className="theme-color">{mentor.rating || 5.0}★</strong>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    <a className="button x-small hover:scale-105 transition-transform duration-300" href="javascript:void(0)">
                      {mentor.available ? 'Đặt lịch' : 'Không khả dụng'}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )) || (
            <div className="col-12 text-center">
              <p>Đang tải mentor...</p>
            </div>
          )}
        </div>

        <div className="row justify-content-center mt-40">
          <div className="col-md-6 text-center">
            <a className="button button-border hover:scale-105 transition-transform duration-300" href="javascript:void(0)">
              Xem tất cả mentor <i className="ti-user ps-2"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}