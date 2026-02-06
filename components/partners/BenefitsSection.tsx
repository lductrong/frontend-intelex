'use client';

import { SectionContent, Benefit } from '../../types';

interface BenefitsSectionProps {
  sectionData: SectionContent;
  benefits: Benefit[];
  type: 'university' | 'company';
}

export default function BenefitsSection({ sectionData, benefits, type }: BenefitsSectionProps) {
  const sectionClass = type === 'university' ? 'white-bg' : 'bg-light';
  const sectionId = type === 'university' ? 'partnership' : '';

  console.log(`${type} benefits:`, benefits);

  return (
    <section className={`${sectionClass} page-section-ptb`} id={sectionId}>
      <div className="container">
        <div className="row justify-content-center mb-50">
          <div className="col-lg-8 text-center">
            <h3 className="theme-color mb-20">{sectionData.heading}</h3>
            <p>{sectionData.description}</p>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {benefits?.map((benefit, index) => (
            <div key={index} className="col">
              <div className="feature-text text-start hover:shadow-lg transition-all duration-300 h-100 d-flex">
                <div className="feature-icon me-4">
                  <i className={`${benefit.icon || 'ti-check-box'} theme-color fa-2x`}></i>
                </div>
                <div className="feature-info flex-grow-1">
                  <h5 className="mb-15">{benefit.title}</h5>
                  <p>{benefit.description}</p>
                </div>
              </div>
            </div>
          )) || (
            // Fallback benefits if no data
            <>
              <div className="col">
                <div className="feature-text text-start h-100 d-flex">
                  <div className="feature-icon me-4">
                    <i className="ti-check-box theme-color fa-2x"></i>
                  </div>
                  <div className="feature-info flex-grow-1">
                    <h5 className="mb-15">
                      {type === 'university' ? 'Đề tài capstone thực tế' : 'Tiếp cận nhân tài'}
                    </h5>
                    <p>
                      {type === 'university' 
                        ? 'Sinh viên làm việc trực tiếp với các dự án thực tế từ doanh nghiệp, nâng cao kỹ năng và kinh nghiệm.'
                        : 'Tuyển dụng trực tiếp từ pool sinh viên xuất sắc đã được đào tạo theo nhu cầu thực tế của doanh nghiệp.'
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="feature-text text-start h-100 d-flex">
                  <div className="feature-icon me-4">
                    <i className="ti-check-box theme-color fa-2x"></i>
                  </div>
                  <div className="feature-info flex-grow-1">
                    <h5 className="mb-15">
                      {type === 'university' ? 'Mentor từ doanh nghiệp' : 'Đồng tài trợ hackathon'}
                    </h5>
                    <p>
                      {type === 'university'
                        ? 'Chuyên gia từ các công ty hàng đầu trực tiếp hướng dẫn và chia sẻ kinh nghiệm với sinh viên.'
                        : 'Tổ chức các cuộc thi để tìm kiếm giải pháp sáng tạo cho các thách thức kinh doanh cụ thể.'
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="feature-text text-start h-100 d-flex">
                  <div className="feature-icon me-4">
                    <i className="ti-check-box theme-color fa-2x"></i>
                  </div>
                  <div className="feature-info flex-grow-1">
                    <h5 className="mb-15">
                      {type === 'university' ? 'Cơ hội học bổng & quỹ nghiên cứu' : 'Gắn thương hiệu với đổi mới'}
                    </h5>
                    <p>
                      {type === 'university'
                        ? 'Hỗ trợ tài chính cho sinh viên xuất sắc và các dự án nghiên cứu có tiềm năng ứng dụng cao.'
                        : 'Xây dựng hình ảnh doanh nghiệp tiên phong trong việc hỗ trợ giáo dục và đổi mới sáng tạo.'
                      }
                    </p>
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