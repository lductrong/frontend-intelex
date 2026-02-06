'use client';

interface FooterData {
  logoFooter?: {
    url: string;
    alternativeText?: string;
  };
  footerDescription?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactAddress?: string;
  socialLinks?: Array<{
    platform: string;
    url: string;
    iconClass: string;
  }>;
}

interface FooterProps {
  data?: FooterData;
}

export default function Footer({ data }: FooterProps) {
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  const logoUrl = data?.logoFooter?.url 
    ? `${API_URL}${data.logoFooter.url}`
    : '/images/logo.png';

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer footer-topbar black-bg">
      <div className="copyright">
        <div className="container">
          <div className="row align-items-center">
            
            <div className="col-lg-4 col-md-12 mb-4 text-center text-lg-start">
              <img className="img-fluid mb-3" id="logo-footer" src={logoUrl} alt="Logo" style={{maxWidth: '800px'}} />
              <p className="mb-0 small text-white"> 
                {data?.footerDescription || `© Copyright ${currentYear} Intelex All Rights Reserved`}
              </p>
            </div>

            <div className="col-lg-4 col-md-12 mb-4 text-center">
              <div className="footer-text">
                <h5 className="text-white mb-3">Liên hệ</h5>
                <p className="mb-2">Email: <a href={`mailto:${data?.contactEmail || 'info@hesinhthai.edu.vn'}`} className="text-white">{data?.contactEmail || 'info@hesinhthai.edu.vn'}</a></p>
                <p className="mb-2">Điện thoại: {data?.contactPhone || '(024) 1234 5678'}</p>
                <p className="mb-0">Địa chỉ: {data?.contactAddress || 'Hồ Chí Minh, Việt Nam'}</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-12 text-center text-lg-start">
              
              {/* Phần Link (Nằm trên) */}
              <div className="footer-social mb-3">
                <ul className="list-inline mb-0">
                  <li className="list-inline-item"><a href="#">Điều khoản sử dụng</a></li>
                  <li className="list-inline-item text-white-50 mx-1">|</li>
                  <li className="list-inline-item"><a href="#">Chính sách bảo mật</a></li>
                </ul>
              </div>
              
              {/* Phần Icon (Nằm dưới) */}
              <div className="social-icons color-hover">
                <ul className="list-inline mb-0">
                  {data?.socialLinks?.map((social, index) => (
                    <li key={index} className={`list-inline-item social-${social.platform.toLowerCase()}`}>
                      <a href={social.url} target="_blank" rel="noopener noreferrer">
                        <i className={social.iconClass}></i>
                      </a>
                    </li>
                  )) || (
                    <>
                      <li className="list-inline-item social-facebook"><a href="#"><i className="fa fa-facebook"></i></a></li>
                      <li className="list-inline-item social-twitter"><a href="#"><i className="fa fa-twitter"></i></a></li>
                      <li className="list-inline-item social-dribbble"><a href="#"><i className="fa fa-dribbble"></i></a></li>
                      <li className="list-inline-item social-linkedin"><a href="#"><i className="fa fa-linkedin"></i></a></li>
                    </>
                  )}
                </ul>
              </div>

            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}