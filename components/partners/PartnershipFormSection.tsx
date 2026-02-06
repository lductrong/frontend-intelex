'use client';

import { useState } from 'react';
import { SectionContent, PartnershipForm } from '../../types';

interface PartnershipFormSectionProps {
  sectionData: SectionContent;
}

export default function PartnershipFormSection({ sectionData }: PartnershipFormSectionProps) {
  const [formData, setFormData] = useState<PartnershipForm>({
    partnerType: 'university',
    organization: '',
    contactName: '',
    position: '',
    email: '',
    phone: '',
    cooperationType: 'capstone',
    message: '',
    website: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Here you would normally send the data to your API
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitMessage('Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn trong vòng 48 giờ.');
      
      // Reset form
      setFormData({
        partnerType: 'university',
        organization: '',
        contactName: '',
        position: '',
        email: '',
        phone: '',
        cooperationType: 'capstone',
        message: '',
        website: ''
      });
    } catch (error) {
      setSubmitMessage('Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-light page-section-ptb" id="contact-form">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="white-bg p-50 box-shadow hover:shadow-lg transition-all duration-300">
              <div className="text-center mb-40">
                <h3 className="theme-color mb-20">{sectionData.heading}</h3>
                <p>{sectionData.description}</p>
              </div>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-20">
                      <select 
                        className="form-select" 
                        name="partnerType" 
                        value={formData.partnerType}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Loại đối tác *</option>
                        <option value="university">Nhà trường / Đại học</option>
                        <option value="company">Doanh nghiệp</option>
                        <option value="government">Cơ quan nhà nước</option>
                        <option value="ngo">Tổ chức phi lợi nhuận</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-20">
                      <input 
                        id="organization" 
                        className="form-control" 
                        name="organization" 
                        placeholder="Tên tổ chức *" 
                        type="text" 
                        value={formData.organization}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-20">
                      <input 
                        id="contact-name" 
                        className="form-control" 
                        name="contactName" 
                        placeholder="Tên người liên hệ *" 
                        type="text" 
                        value={formData.contactName}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-20">
                      <input 
                        id="position" 
                        className="form-control" 
                        name="position" 
                        placeholder="Chức vụ *" 
                        type="text" 
                        value={formData.position}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-20">
                      <input 
                        id="email" 
                        className="form-control" 
                        name="email" 
                        placeholder="Email *" 
                        type="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-20">
                      <input 
                        id="phone" 
                        className="form-control" 
                        name="phone" 
                        placeholder="Số điện thoại *" 
                        type="tel" 
                        value={formData.phone}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group mb-20">
                  <select 
                    className="form-select" 
                    name="cooperationType" 
                    value={formData.cooperationType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Hình thức hợp tác quan tâm *</option>
                    <option value="capstone">Đề tài Capstone</option>
                    <option value="mentorship">Chương trình Mentor</option>
                    <option value="hackathon">Tài trợ Hackathon</option>
                    <option value="scholarship">Học bổng</option>
                    <option value="research">Nghiên cứu khoa học</option>
                    <option value="recruitment">Tuyển dụng</option>
                    <option value="other">Khác</option>
                  </select>
                </div>

                <div className="form-group mb-20">
                  <textarea 
                    id="message" 
                    className="form-control" 
                    name="message" 
                    placeholder="Mô tả chi tiết về ý tưởng hợp tác (tối đa 500 từ) *" 
                    rows={4} 
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>

                <div className="form-group mb-20">
                  <input 
                    id="website" 
                    className="form-control" 
                    name="website" 
                    placeholder="Website tổ chức (nếu có)" 
                    type="url"
                    value={formData.website}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group mb-30">
                  <label className="form-check-label">
                    <input className="form-check-input me-2" type="checkbox" required />
                    Tôi đồng ý với <a href="#" className="theme-color">điều khoản hợp tác</a> và <a href="#" className="theme-color">chính sách bảo mật</a>
                  </label>
                </div>

                {submitMessage && (
                  <div className={`alert ${submitMessage.includes('thành công') ? 'alert-success' : 'alert-danger'} mb-20`}>
                    {submitMessage}
                  </div>
                )}

                <div className="text-center">
                  <button 
                    id="submit-btn" 
                    className="button hover:scale-105 transition-transform duration-300" 
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Đang gửi...' : 'Gửi đề xuất hợp tác'} <i className="ti-handshake ps-2"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}