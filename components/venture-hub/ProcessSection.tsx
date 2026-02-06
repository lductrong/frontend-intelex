'use client';

import { SectionContent, ProcessStep } from '@/types';

interface ProcessSectionProps {
  sectionData: SectionContent;
  processSteps: ProcessStep[];
}

export default function ProcessSection({ sectionData, processSteps }: ProcessSectionProps) {
  return (
    <section className="bg-light page-section-ptb">
      <div className="container">
        <div className="row justify-content-center mb-50">
          <div className="col-lg-8 text-center">
            <h3 className="theme-color mb-20">{sectionData.heading}</h3>
            <p>{sectionData.description}</p>
          </div>
        </div>

        <div className="row">
          {processSteps && processSteps.length > 0 ? (
            processSteps.map((step, index) => (
              <div key={index} className="col-lg-3 col-md-6 mb-30">
                <div className="feature-text box-shadow text-center white-bg hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="feature-icon">
                    <span className="step-number theme-color">{step.stepNumber}</span>
                  </div>
                  <div className="feature-info p-30">
                    <h5 className="mb-15">{step.title}</h5>
                    <p>{step.description}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>Không có dữ liệu quy trình từ API</p>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="row justify-content-center mt-50" id="apply-now">
          <div className="col-lg-10 text-center">
            <div className="action-box theme-bg p-50 hover:shadow-lg transition-all duration-300">
              <h4 className="text-white mb-20">Sẵn sàng bắt đầu hành trình khởi nghiệp?</h4>
              
              <div className="d-md-flex align-items-center justify-content-center" style={{ gap: '30px' }}>
                <p className="text-white mb-0">Hãy biến ý tưởng thành hiện thực cùng chúng tôi!</p>
                <a className="button white hover:scale-105 transition-transform duration-300" href="#application-form" style={{ whiteSpace: 'nowrap' }}>
                  Nộp hồ sơ ngay
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom styles for step numbers */}
      <style jsx>{`
        .step-number {
          display: inline-block;
          width: 60px;
          height: 60px;
          line-height: 60px;
          border-radius: 50%;
          border: 3px solid;
          font-size: 24px;
          font-weight: bold;
        }
      `}</style>
    </section>
  );
}