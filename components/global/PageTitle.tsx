'use client';

interface PageTitleProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

export default function PageTitle({ title, subtitle, backgroundImage = "/images/hero-home.png" }: PageTitleProps) {
  return (
    <section 
      className="page-title bg-overlay-black-50 jarallax" 
      data-speed="0.6" 
      data-img-src={backgroundImage}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="page-title-name">
              <h1 className="text-white">{title}</h1>
              {subtitle && <p className="text-white">{subtitle}</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}