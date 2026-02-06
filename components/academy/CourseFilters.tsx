'use client';

import { FilterSectionData, Mentor } from '@/types';

interface CourseFiltersProps {
  filterSection: FilterSectionData;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  mentors: Mentor[];
}

export default function CourseFilters({ filterSection, activeFilter, onFilterChange, mentors }: CourseFiltersProps) {
  return (
    <section className="white-bg page-section-pt">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <h3 className="theme-color mb-20">{filterSection.heading}</h3>
          </div>
        </div>
        
        {/* Category Filter Tabs */}
        <div className="row justify-content-center mb-40">
          <div className="col-lg-10">
            <div className="filter-nav text-center">
              <ul className="nav nav-pills justify-content-center" id="filter-tabs">
                {filterSection.categories?.map((category, index) => (
                  <li key={index} className="nav-item">
                    <a 
                      className={`nav-link ${activeFilter === category.value ? 'active' : ''} hover:scale-105 transition-transform duration-300 cursor-pointer`}
                      onClick={() => onFilterChange(category.value)}
                    >
                      {category.name}
                    </a>
                  </li>
                )) || (
                  <>
                    <li className="nav-item">
                      <a 
                        className={`nav-link ${activeFilter === '*' ? 'active' : ''} cursor-pointer`}
                        onClick={() => onFilterChange('*')}
                      >
                        Tất cả
                      </a>
                    </li>
                    <li className="nav-item">
                      <a 
                        className={`nav-link ${activeFilter === 'web' ? 'active' : ''} cursor-pointer`}
                        onClick={() => onFilterChange('web')}
                      >
                        Web Development
                      </a>
                    </li>
                    <li className="nav-item">
                      <a 
                        className={`nav-link ${activeFilter === 'cloud' ? 'active' : ''} cursor-pointer`}
                        onClick={() => onFilterChange('cloud')}
                      >
                        Cloud Computing
                      </a>
                    </li>
                    <li className="nav-item">
                      <a 
                        className={`nav-link ${activeFilter === 'ai' ? 'active' : ''} cursor-pointer`}
                        onClick={() => onFilterChange('ai')}
                      >
                        AI & Machine Learning
                      </a>
                    </li>
                    <li className="nav-item">
                      <a 
                        className={`nav-link ${activeFilter === 'mobile' ? 'active' : ''} cursor-pointer`}
                        onClick={() => onFilterChange('mobile')}
                      >
                        Mobile Development
                      </a>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Filter Dropdowns */}
        {/* <div className="row justify-content-center mb-50">
          <div className="col-lg-8">
            <div className="row">
              <div className="col-md-4 mb-20">
                <select className="form-select">
                  <option>Chủ đề</option>
                  <option>Web Development</option>
                  <option>Cloud Computing</option>
                  <option>AI & Machine Learning</option>
                  <option>Mobile Development</option>
                </select>
              </div>
              <div className="col-md-4 mb-20">
                <select className="form-select">
                  <option>Cấp độ</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
              <div className="col-md-4 mb-20">
                <select className="form-select">
                  <option>Mentor</option>
                  {mentors?.map((mentor, index) => (
                    <option key={index} value={mentor.slug}>
                      {mentor.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}