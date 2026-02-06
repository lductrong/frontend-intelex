'use client';

import { useEffect, useState } from 'react';
import { PartnersService, GlobalService } from '@/lib/api/services';
import { PartnersPageData, Benefit, SuccessStory, Partner } from '@/types';
import Header from '../../components/global/Header';
import Footer from '../../components/global/Footer';
import HeroSection from '../../components/partners/HeroSection';
import BenefitsSection from '../../components/partners/BenefitsSection'
import SuccessStoriesSection from '../../components/partners/SuccessStoriesSection';
import PartnershipFormSection from '../../components/partners/PartnershipFormSection';
import StrategicPartnersSection from '../../components/partners/StrategicPartnersSection';
import { usePreloader } from '../../hooks/usePreloader';
import { useBackToTop } from '../../hooks/useBackToTop';

export default function PartnersPage() {
  const [data, setData] = useState<PartnersPageData | null>(null);
  const [universityBenefits, setUniversityBenefits] = useState<Benefit[]>([]);
  const [companyBenefits, setCompanyBenefits] = useState<Benefit[]>([]);
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [globalData, setGlobalData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Use React hooks to replace jQuery functionality
  usePreloader();
  useBackToTop();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [partnersData, globalDataRes] = await Promise.all([
          PartnersService.getPartnersPageData(),
          GlobalService.getGlobalData()
        ]);

        // Extract data from partners page API response
        const benefits = (partnersData as any)?.benefits || [];
        const successStories = (partnersData as any)?.success_stories || [];
        const partners = (partnersData as any)?.partners || [];

        // Filter benefits by target audience
        const universityBenefits = benefits.filter((benefit: any) => benefit.targetAudience === 'university');
        const companyBenefits = benefits.filter((benefit: any) => benefit.targetAudience === 'company');

        setData(partnersData);
        setUniversityBenefits(universityBenefits);
        setCompanyBenefits(companyBenefits);
        setSuccessStories(successStories);
        setPartners(partners);
        setGlobalData(globalDataRes);

        console.log('Partners data loaded:', {
          totalBenefits: benefits.length,
          universityBenefits: universityBenefits.length,
          companyBenefits: companyBenefits.length,
          successStories: successStories.length,
          partners: partners.length
        });
        console.log('University benefits:', universityBenefits);
        console.log('Company benefits:', companyBenefits);
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
        <div id="pre-loader">
          <img src="/images/pre-loader/loader-06.svg" alt="" />
        </div>
        <Header data={globalData?.header} />
        <div className="container">
          <div className="row">
            <div className="col-12 text-center py-5">
              <h2>Không thể tải dữ liệu</h2>
              <p>Vui lòng thử lại sau.</p>
            </div>
          </div>
        </div>
        <Footer data={globalData?.footer} />
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
        {/* Hero Section */}
        <HeroSection data={data} />

        {/* University Benefits Section */}
        <BenefitsSection 
          sectionData={data.universityBenefitsSection}
          benefits={universityBenefits}
          type="university"
        />

        {/* Company Benefits Section */}
        <BenefitsSection 
          sectionData={data.companyBenefitsSection}
          benefits={companyBenefits}
          type="company"
        />

        {/* Success Stories Section */}
        <SuccessStoriesSection 
          sectionData={data.successStoriesSection}
          successStories={successStories}
        />

        {/* Partnership Form Section */}
        <PartnershipFormSection 
          sectionData={data.partnershipFormSection}
        />

        {/* Strategic Partners Section */}
        {data.partnersection && (
          <StrategicPartnersSection 
            sectionData={data.partnersection}
            partners={partners}
          />
        )}
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