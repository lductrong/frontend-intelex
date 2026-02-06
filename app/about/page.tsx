'use client';

import { useEffect, useState } from 'react';
import { AboutService, GlobalService } from '@/lib/api/services';
import { AboutPageData, Partner } from '@/types';
import Header from '@/components/global/Header';
import Footer from '@/components/global/Footer';
import PageTitle from '@/components/global/PageTitle';
import VisionMissionSection from '@/components/about/VisionMissionSection';
import TeamSection from '@/components/about/TeamSection';
import StrategicPartnersSection from '@/components/partners/StrategicPartnersSection';
import { usePreloader } from '@/hooks/usePreloader';
import { useBackToTop } from '@/hooks/useBackToTop';

export default function AboutPage() {
  const [data, setData] = useState<AboutPageData | null>(null);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [globalData, setGlobalData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Use React hooks to replace jQuery functionality
  usePreloader();
  useBackToTop();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [aboutData, partnersData, globalDataRes] = await Promise.all([
          AboutService.getAboutPageData(),
          AboutService.getPartners(),
          GlobalService.getGlobalData()
        ]);

        setData(aboutData);
        setPartners(partnersData || []);
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

  return (
    <div className="wrapper">
      {/* Preloader */}
      <div id="pre-loader">
        <img src="/images/pre-loader/loader-06.svg" alt="" />
      </div>

      {/* Header */}
      <Header data={globalData?.header} />
      
      <main>
        {/* Page Title */}
        <PageTitle 
          title={data.pageTitle}
          backgroundImage={data.heroImage?.url ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${data.heroImage.url}` : "/images/hero-home.png"}
        />

        {/* Vision & Mission Section */}
        <VisionMissionSection 
          visionMission={data.visionMission}
          ceoQuote={data.ceoQuote}
        />

        {/* Team Section */}
        <TeamSection teamMembers={data.teamMembers} />

        {/* Partners Section */}
        <StrategicPartnersSection 
          sectionData={{
            heading: data.partnersSection.heading,
            description: data.partnersSection.description
          }}
          partners={partners}
        />
      </main>

      {/* Footer */}
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