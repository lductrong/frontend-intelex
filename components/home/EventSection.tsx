'use client';

import { EventSectionData, Event } from '@/types';

interface EventSectionProps {
  data: EventSectionData;
  events: Event[];
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export default function EventSection({ data, events }: EventSectionProps) {
  const eventIcons = ['ti-cup', 'ti-microphone', 'ti-user'];

  return (
    <section className="page-section-ptb bg-light" id="community">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center mb-60">
            <h3 className="theme-color">{data.heading}</h3>
            <p className="mt-20">{data.description}</p>
          </div>
        </div>

        <div className="row">
          {events?.slice(0, 3).map((event, index) => (
            <div key={index} className="col-lg-4 col-md-4">
              <div className="feature-text box-shadow text-center mb-30 white-bg hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="feature-icon">
                  <span aria-hidden="true" className={`${eventIcons[index % eventIcons.length]} theme-color text-4xl`}></span>
                </div>
                <div className="fature-info">
                  <h4 className="text-back pt-20 pb-10">{event.title}</h4>
                  <p className="leading-relaxed px-4">
                    <strong>Ngày:</strong> {formatDate(event.date)} <br />
                    <strong>Địa điểm:</strong> {event.location}
                    {event.speaker && (
                      <>
                        <br />
                        <strong>Diễn giả:</strong> {event.speaker}
                      </>
                    )}
                  </p>
                  <a className="button mt-20 hover:scale-105 transition-transform duration-300" href="#">
                    {index === 0 ? 'Đăng ký thi' : index === 1 ? 'Giữ chỗ ngay' : 'Tìm Mentor'}
                  </a>
                </div>
              </div>
            </div>
          )) || (
            <div className="col-12 text-center">
              <p>Đang tải sự kiện...</p>
            </div>
          )}
        </div>

        <div className="row justify-content-center mt-70">
          <div className="col-md-8 text-center">
            <h4 className="mb-20">Đừng bỏ lỡ các hoạt động hấp dẫn khác!</h4>
            <p className="mb-30 leading-relaxed">Chúng tôi tổ chức các buổi workshop, giao lưu hàng tuần để giúp bạn cập nhật xu hướng công nghệ mới nhất.</p>
            <a className="button hover:scale-105 transition-transform duration-300" href="/community">
              Xem thêm tất cả sự kiện <i className="ti-calendar ps-2"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}