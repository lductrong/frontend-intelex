'use client';

import { AcademyCourse, Mentor } from '@/types';

interface CourseCardProps {
  course: AcademyCourse;
  mentors: Mentor[];
  index: number;
}

export default function CourseCard({ course, mentors, index }: CourseCardProps) {
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

  // Find mentor for this course
  const mentor = mentors.find(m => m.slug === course.mentorSlug) || mentors[index % mentors.length];

  // Get level badge color
  const getLevelBadgeClass = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-success';
      case 'intermediate': return 'bg-warning';
      case 'advanced': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  // Format price
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' ' + currency;
  };

  return (
    <div className={`col-lg-4 col-md-6 col-sm-12 mb-30 ${course.category} ${course.level}`}>
      <div className="feature-text box-shadow white-bg hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="feature-img">
          <img 
            className="img-fluid" 
            src={course.image?.url ? `${API_URL}${course.image.url}` : `/images/blog/01.png`}
            alt={course.title}
          />
          <div className="feature-overlay">
            <div className="feature-overlay-content">
              <span className={`badge ${getLevelBadgeClass(course.level)}`}>
                {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
              </span>
            </div>
          </div>
        </div>
        <div className="feature-info p-30">
          <h5 className="mb-15">
            <a href="javascript:void(0)" className="hover:text-yellow-500 transition-colors duration-300">
              {course.title}
            </a>
          </h5>
          <p className="mb-20 leading-relaxed">
            {course.shortDescription || course.description}
          </p>
          
          <div className="course-meta mb-20">
            <div className="row">
              <div className="col-6">
                <small className="text-muted">
                  <i className="ti-time"></i> {course.duration}
                </small>
              </div>
              <div className="col-6 text-end">
                <small className="text-muted">
                  <i className="ti-user"></i> {course.studentsCount} học viên
                </small>
              </div>
            </div>
          </div>
          
          {mentor && (
            <div className="course-instructor mb-20">
              <div className="d-flex align-items-center">
                <img 
                  className="rounded-circle me-2" 
                  src={mentor.avatar?.url ? `${API_URL}${mentor.avatar.url}` : `/images/team/01.png`}
                  alt={mentor.name}
                  width="30" 
                  height="30"
                />
                <small>Mentor: <strong>{mentor.name}</strong></small>
              </div>
            </div>
          )}
          
          <div className="d-flex justify-content-between align-items-center">
            <span className="price theme-color font-weight-bold">
              {formatPrice(course.price, course.currency)}
            </span>
            <a 
              className="button x-small hover:scale-105 transition-transform duration-300" 
              href="javascript:void(0)"
            >
              Đăng ký ngay
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}