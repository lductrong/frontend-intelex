'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/global/Header';
import Footer from '@/components/global/Footer';
import HeroSection from '@/components/venture-hub/HeroSection';
import CriteriaSection from '@/components/venture-hub/CriteriaSection';
import ProcessSection from '@/components/venture-hub/ProcessSection';
import StartupSection from '@/components/venture-hub/StartupSection';
import ApplicationSection from '@/components/venture-hub/ApplicationSection';
import { usePreloader } from '@/hooks/usePreloader';
import { useBackToTop } from '@/hooks/useBackToTop';
import { GlobalService, VentureHubService } from '@/lib/api/services';
import { VentureHubPageData, Startup, Criteria, ProcessStep } from '@/types';

export default function VentureHubPage() {
  const [data, setData] = useState<VentureHubPageData | null>(null);
  const [startups, setStartups] = useState<Startup[]>([]);
  const [criteria, setCriteria] = useState<Criteria[]>([]);
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>([]);
  const [globalData, setGlobalData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Use React hooks to replace jQuery functionality
  usePreloader();
  useBackToTop();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [ventureHubData, globalDataRes] = await Promise.all([
          VentureHubService.getVentureHubPageData(),
          GlobalService.getGlobalData()
        ]);

        // Extract data from venture hub page API response
        const startups = (ventureHubData as any)?.startups || [];
        const criteria = (ventureHubData as any)?.criteria || [];
        const processSteps = (ventureHubData as any)?.process_steps || [];

        setData(ventureHubData as VentureHubPageData);
        setStartups(startups);
        setCriteria(criteria);
        setProcessSteps(processSteps);
        setGlobalData(globalDataRes);

        console.log('Venture Hub data loaded:', {
          startups: startups.length,
          criteria: criteria.length,
          processSteps: processSteps.length
        });
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
          <img src="/images/pre-loader/loader-06.svg" alt="Loading..." />
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
        {/* Hero Section */}
        <HeroSection data={data} />

        {/* Criteria Section */}
        <CriteriaSection 
          sectionData={data.criteriaSection}
          criteria={criteria}
        />

        {/* Process Section */}
        <ProcessSection 
          sectionData={data.processSection}
          processSteps={processSteps}
        />

        {/* Startup Section */}
        <StartupSection 
          sectionData={data.fundedStartupsSection}
          startups={startups}
        />

        {/* Application Section */}
        <ApplicationSection 
          sectionData={data.applicationSection}
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