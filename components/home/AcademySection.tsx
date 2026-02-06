'use client';

import { AcademySectionData, Course } from '@/types';

interface AcademySectionProps {
  data: AcademySectionData;
  courses: Course[];
}

export default function AcademySection({ data, courses }: AcademySectionProps) {
  return (
    <section className="business-service page-section-ptb" id="academy">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center mb-60">
            <h3 className="theme-color">{data.heading}</h3>
            <p className="mt-20">{data.description}</p>
          </div>
        </div>

        <div className="row">
          {courses?.slice(0, 3).map((course, index) => (
            <div key={index} className="col-lg-4 col-md-4 d-flex">
              <div className="feature-text box-shadow text-center mb-30 white-bg h-100 d-flex flex-column hover:shadow-lg transition-shadow duration-300">
                <div className="feature-icon">
                  <span aria-hidden="true" className={`${course.icon} theme-color text-4xl`}></span>
                </div>
                <div className="fature-info d-flex flex-column flex-grow-1">
                  <h4 className="text-back pt-20 pb-10">{course.title}</h4>
                  <p className="leading-relaxed px-4 flex-grow-1">{course.description}</p>
                  <a className="button mt-20 hover:scale-105 transition-transform duration-300" href={course.link || '#'}>
                    Đăng ký ngay
                  </a>
                </div>
              </div>
            </div>
          )) || (
            <div className="col-12 text-center">
              <p>Đang tải khóa học...</p>
            </div>
          )}
        </div>

        <div className="row justify-content-center mt-70">
          <div className="col-md-3 border-end text-start text-md-end pr-40">
            <div className="counter big-counter">
              <span className="timer transition-all duration-500 ease-in-out" data-to={data.statsNumber} data-speed="2000">
                {data.statsNumber}
              </span>
              <label className="block mt-2">{data.statsLabel}</label>
            </div>
          </div>
          <div className="col-md-5 align-self-center pl-15 pl-md-50">
            <h4 className="theme-color">Đầu tư cho tương lai ngay hôm nay</h4>
            <p className="leading-relaxed">Tham gia cộng đồng học tập năng động với hơn 1000+ sinh viên đã tốt nghiệp và thành công.</p>
          </div>
          <div className="col-md-4 align-self-center">
            <a className="button button-border hover:scale-105 transition-transform duration-300" href="/academy">
              Xem thêm tất cả khóa học <i className="fa fa-long-arrow-right ps-2"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}