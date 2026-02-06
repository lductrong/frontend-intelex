'use client';

import { useEffect, useState } from 'react';
import { HomepageService, GlobalService } from '@/lib/api/services';
import { HomepageData, HeroSectionData, AboutSectionData, AcademySectionData, EventSectionData, CtaSectionData, PartnerSectionData } from '@/types';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import AcademySection from '@/components/home/AcademySection';
import EventSection from '@/components/home/EventSection';
import CtaSection from '@/components/home/CtaSection';
import StrategicPartnersSection from '@/components/partners/StrategicPartnersSection';
import Header from '@/components/global/Header';
import Footer from '@/components/global/Footer';
import { usePreloader } from '@/hooks/usePreloader';
import { useBackToTop } from '@/hooks/useBackToTop';

export default function HomePage() {
  const [data, setData] = useState<HomepageData | null>(null);
  const [globalData, setGlobalData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Use React hooks to replace jQuery functionality
  usePreloader();
  useBackToTop();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [homepageData, globalDataRes] = await Promise.all([
          HomepageService.getHomepageData(),
          GlobalService.getGlobalData()
        ]);

        // Extract courses and events from homepage content sections
        const academySection = homepageData.content?.find((block: any) => block.__component === 'homepage.academy-showcase') as AcademySectionData;
        const eventSection = homepageData.content?.find((block: any) => block.__component === 'homepage.event-showcase') as EventSectionData;
        const partnerSection = homepageData.content?.find((block: any) => block.__component === 'homepage.partner-section') as PartnerSectionData;

        setData({
          content: homepageData.content || [],
          courses: academySection?.featuredCourses || [],
          events: eventSection?.featuredEvents || [],
          partners: partnerSection?.partners || []
        });

        setGlobalData(globalDataRes);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

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

  // Find specific sections from content
  const heroSection = data.content.find(block => block.__component === 'homepage.hero-section') as HeroSectionData;
  const aboutSection = data.content.find(block => block.__component === 'homepage.about-section') as AboutSectionData;
  const academySection = data.content.find(block => block.__component === 'homepage.academy-showcase') as AcademySectionData;
  const eventSection = data.content.find(block => block.__component === 'homepage.event-showcase') as EventSectionData;
  const ctaSection = data.content.find(block => block.__component === 'homepage.cta-section') as CtaSectionData;
  const partnerSection = data.content.find(block => block.__component === 'homepage.partner-section') as PartnerSectionData;

  return (
    <div className="wrapper">
      {/* Preloader */}
      <div id="pre-loader">
        <img src="/images/pre-loader/loader-06.svg" alt="" />
      </div>

      {/* Header - data từ backend */}
      <Header data={globalData?.header} />
      
      <main>
        {heroSection && <HeroSection data={heroSection} />}
        {aboutSection && <AboutSection data={aboutSection} />}
        {academySection && <AcademySection data={academySection} courses={data.courses} />}
        {eventSection && <EventSection data={eventSection} events={data.events} />}
        {ctaSection && <CtaSection data={ctaSection} />}
        {partnerSection && (
          <StrategicPartnersSection 
            sectionData={{
              heading: partnerSection.heading,
              description: partnerSection.description || "Chúng tôi hợp tác với các trường đại học, doanh nghiệp và quỹ đầu tư hàng đầu."
            }} 
            partners={partnerSection.partners || []} 
          />
        )}
      </main>

      {/* Footer - data từ backend */}
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