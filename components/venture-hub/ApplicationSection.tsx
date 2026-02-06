'use client';

import { useState } from 'react';
import { SectionContent, ApplicationForm } from '@/types';

interface ApplicationSectionProps {
  sectionData: SectionContent;
}

export default function ApplicationSection({ sectionData }: ApplicationSectionProps) {
  const [formData, setFormData] = useState<ApplicationForm>({
    representativeName: '',
    email: '',
    phone: '',
    university: '',
    startupName: '',
    industry: 'edtech',
    description: '',
    pitchDeckUrl: '',
    demoUrl: ''
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
        representativeName: '',
        email: '',
        phone: '',
        university: '',
        startupName: '',
        industry: 'edtech',
        description: '',
        pitchDeckUrl: '',
        demoUrl: ''
      });
    } catch (error) {
      setSubmitMessage('Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-light page-section-ptb" id="application-form">
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
                      <input 
                        id="name" 
                        className="form-control" 
                        name="representativeName"
                        placeholder="Tên đại diện *" 
                        type="text" 
                        value={formData.representativeName}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                  </div>
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
                </div>

                <div className="row">
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
                  <div className="col-md-6">
                    <div className="form-group mb-20">
                      <input 
                        id="university" 
                        className="form-control" 
                        name="university"
                        placeholder="Trường đại học *" 
                        type="text" 
                        value={formData.university}
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
                        id="startup-name" 
                        className="form-control" 
                        name="startupName"
                        placeholder="Tên startup *" 
                        type="text" 
                        value={formData.startupName}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-20">
                      <select 
                        className="form-select" 
                        name="industry" 
                        value={formData.industry}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Lĩnh vực *</option>
                        <option value="edtech">EdTech</option>
                        <option value="fintech">FinTech</option>
                        <option value="healthtech">HealthTech</option>
                        <option value="ecommerce">E-commerce</option>
                        <option value="ai">AI/ML</option>
                        <option value="iot">IoT</option>
                        <option value="other">Khác</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-group mb-20">
                  <textarea 
                    id="description" 
                    className="form-control" 
                    name="description"
                    placeholder="Mô tả ngắn về startup (tối đa 500 từ) *" 
                    rows={4} 
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>

                <div className="form-group mb-20">
                  <input 
                    id="pitch-deck" 
                    className="form-control" 
                    name="pitchDeckUrl"
                    placeholder="Link Pitch Deck (Google Drive/Dropbox)" 
                    type="url"
                    value={formData.pitchDeckUrl}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group mb-20">
                  <input 
                    id="demo-link" 
                    className="form-control" 
                    name="demoUrl"
                    placeholder="Link Demo/Prototype (nếu có)" 
                    type="url"
                    value={formData.demoUrl}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group mb-30">
                  <label className="form-check-label">
                    <input className="form-check-input me-2" type="checkbox" required />
                    Tôi đồng ý với <a href="#" className="theme-color">điều khoản sử dụng</a> và <a href="#" className="theme-color">chính sách bảo mật</a>
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
                    {isSubmitting ? 'Đang gửi...' : 'Gửi đăng ký'} <i className="ti-rocket ps-2"></i>
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