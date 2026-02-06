'use client';

import { useState } from 'react';
import { AcademyCourse, Mentor } from '@/types';
import CourseCard from './CourseCard';

interface CoursesGridProps {
  courses: AcademyCourse[];
  mentors: Mentor[];
}

export default function CoursesGrid({ courses, mentors }: CoursesGridProps) {
  const [visibleCourses, setVisibleCourses] = useState(6);

  const handleLoadMore = () => {
    setVisibleCourses(prev => prev + 6);
  };

  const displayedCourses = courses.slice(0, visibleCourses);
  const hasMoreCourses = visibleCourses < courses.length;

  return (
    <section className="bg-light page-section-ptb">
      <div className="container">
        <div className="row" id="courses-grid">
          {displayedCourses?.map((course, index) => (
            <CourseCard 
              key={course.slug || index}
              course={course}
              mentors={mentors}
              index={index}
            />
          )) || (
            <div className="col-12 text-center">
              <p>Đang tải khóa học...</p>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {hasMoreCourses && (
          <div className="row justify-content-center mt-50">
            <div className="col-md-6 text-center">
              <a 
                className="button button-border hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={handleLoadMore}
              >
                Xem thêm khóa học <i className="ti-angle-down ps-2"></i>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}