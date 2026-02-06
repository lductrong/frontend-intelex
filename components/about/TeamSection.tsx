'use client';

import { TeamMemberData } from '@/types';

interface TeamSectionProps {
  teamMembers: TeamMemberData[];
}

export default function TeamSection({ teamMembers }: TeamSectionProps) {
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

  return (
    <section className="page-section-ptb theme-bg">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="section-title text-center">
              <h6 className="text-white">Những người dẫn đầu</h6>
              <h2 className="title-effect text-white">Ban Lãnh Đạo & Cố Vấn</h2>
              <p className="text-white">Đội ngũ chuyên gia giàu kinh nghiệm dẫn dắt con thuyền Intelex.</p>
            </div>
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="row">
          {teamMembers?.map((member, index) => (
            <div key={index} className="col-lg-4 col-md-4 sm-mb-30">
              <div className="team white-bg box-shadow text-center p-4 h-100 hover:shadow-lg transition-shadow duration-300">
                <div className="team-photo mb-3">
                  <img 
                    className="img-fluid rounded-circle mx-auto" 
                    src={member.photo?.url ? `${API_URL}${member.photo.url}` : `/images/team/0${index + 1}.png`}
                    alt={member.name}
                    style={{width: '200px', height: '200px', objectFit: 'cover'}}
                  />
                </div>
                <div className="team-description">
                  <div className="team-info">
                    <h5><a href="#">{member.name}</a></h5>
                    <span className="theme-color">{member.position}</span>
                  </div>
                  <p className="mt-3 leading-relaxed">{member.description}</p>
                  
                  {/* Social Links */}
                  {member.socialLinks && member.socialLinks.length > 0 && (
                    <div className="social-icons social-border rounded color-hover clearfix mt-3 d-inline-block">
                      <ul>
                        {member.socialLinks.map((social, socialIndex) => (
                          <li key={socialIndex} className={`social-${social.platform.toLowerCase()}`}>
                            <a href={social.url} target="_blank" rel="noopener noreferrer">
                              <i className={social.iconClass}></i>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )) || (
            <div className="col-12 text-center">
              <p className="text-white">Đang tải thông tin đội ngũ...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}