'use client';

import { useEffect, useState } from 'react';
import { CommunityService, GlobalService } from '@/lib/api/services';
import { CommunityPageData, Hackathon, CapstoneProject, CommunityMentor } from '@/types';
import Header from '@/components/global/Header';
import Footer from '@/components/global/Footer';
import HeroSection from '../../components/community/HeroSection';
import HackathonSection from '../../components/community/HackathonSection';
import CapstoneSection from '../../components/community/CapstoneSection';
import MentorSection from '../../components/community/MentorSection';
import { usePreloader } from '@/hooks/usePreloader';
import { useBackToTop } from '@/hooks/useBackToTop';

export default function CommunityPage() {
  const [data, setData] = useState<CommunityPageData | null>(null);
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [capstoneProjects, setCapstoneProjects] = useState<CapstoneProject[]>([]);
  const [mentors, setMentors] = useState<CommunityMentor[]>([]);
  const [globalData, setGlobalData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Use React hooks to replace jQuery functionality
  usePreloader();
  useBackToTop();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [communityData, globalDataRes] = await Promise.all([
          CommunityService.getCommunityPageData(),
          GlobalService.getGlobalData()
        ]);

        // Extract hackathons, capstone projects and mentors from community page data if available
        const hackathons = (communityData as any)?.hackathons || [];
        const capstoneProjects = (communityData as any)?.capstone_projects || [];
        const mentors = (communityData as any)?.mentors || [];

        console.log('Community data loaded:', {
          hackathons: hackathons.length,
          capstoneProjects: capstoneProjects.length,
          mentors: mentors.length
        });

        setData(communityData);
        setHackathons(hackathons);
        setCapstoneProjects(capstoneProjects);
        setMentors(mentors);
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
        {/* Hero Section */}
        <HeroSection data={data} />

        {/* Hackathon & Events Section */}
        <HackathonSection 
          sectionData={data.hackathonSection}
          hackathons={hackathons}
        />

        {/* Capstone Projects Section */}
        <CapstoneSection 
          sectionData={data.capstoneSection}
          projects={capstoneProjects}
        />

        {/* Mentor Hub Section */}
        <MentorSection 
          sectionData={data.mentorSection}
          mentors={mentors}
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