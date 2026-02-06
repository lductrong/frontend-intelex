'use client';

import { useEffect, useState } from 'react';
import { AcademyService, GlobalService } from '@/lib/api/services';
import { AcademyPageData, AcademyCourse, Mentor } from '@/types';
import Header from '@/components/global/Header';
import Footer from '@/components/global/Footer';
import PageTitle from '@/components/global/PageTitle';
import CourseFilters from '@/components/academy/CourseFilters';
import CoursesGrid from '@/components/academy/CoursesGrid';
import { usePreloader } from '@/hooks/usePreloader';
import { useBackToTop } from '@/hooks/useBackToTop';

export default function AcademyPage() {
  const [data, setData] = useState<AcademyPageData | null>(null);
  const [courses, setCourses] = useState<AcademyCourse[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [globalData, setGlobalData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [filteredCourses, setFilteredCourses] = useState<AcademyCourse[]>([]);
  const [activeFilter, setActiveFilter] = useState('*');

  // Use React hooks to replace jQuery functionality
  usePreloader();
  useBackToTop();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [academyData, globalDataRes] = await Promise.all([
          AcademyService.getAcademyPageData(),
          GlobalService.getGlobalData()
        ]);

        // Extract courses from academy page data
        const courses = academyData.courses || [];

        setData(academyData);
        setCourses(courses);
        setFilteredCourses(courses);
        setMentors([]); // Mentors not needed for now since courses don't have mentor populated
        setGlobalData(globalDataRes);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Filter courses based on category
  const handleFilterChange = (filterValue: string) => {
    setActiveFilter(filterValue);
    
    if (filterValue === '*') {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter(course => course.category === filterValue);
      setFilteredCourses(filtered);
    }
  };

  if (loading) {
    return (
      <div className="wrapper">
        <div id="pre-loader">
          <img src="/images/pre-loader/loader-06.svg" alt="" />
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="wrapper">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <p>Không thể tải dữ liệu</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      {/* Preloader */}
      <div id="pre-loader">
        <img src="/images/pre-loader/loader-06.svg" alt="" />
      </div>

      {/* Header */}
      <Header data={globalData?.header} />
      
      <main>
        {/* Page Title */}
        <PageTitle 
          title={data.pageTitle}
          subtitle={data.pageSubtitle}
          backgroundImage={data.heroImage?.url ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${data.heroImage.url}` : "/images/hero-home.png"}
        />

        {/* Course Filters */}
        <CourseFilters 
          filterSection={data.filterSection}
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          mentors={mentors}
        />

        {/* Courses Grid */}
        <CoursesGrid 
          courses={filteredCourses}
          mentors={mentors}
        />
      </main>

      {/* Footer */}
      <Footer data={globalData?.footer} />

      {/* Back to top */}
      <div id="back-to-top">
        <a className="top arrow" href="#top">
          <i className="fa fa-angle-up"></i> <span>TOP</span>
        </a>
      </div>
    </div>
  );
}