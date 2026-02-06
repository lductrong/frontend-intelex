import { fetchStrapi } from '../strapi-client';
import { AboutPageData, Partner } from '@/types';

export const AboutService = {
  // Get about page data (contains everything: visionMission, ceoQuote, teamMembers, partnersSection)
  getAboutPageData: async (): Promise<AboutPageData> => {
    const query = {
      populate: {
        heroImage: true,
        visionMission: {
          populate: {
            features: true
          }
        },
        ceoQuote: {
          populate: {
            authorPhoto: true
          }
        },
        teamMembers: {
          populate: {
            photo: true,
            socialLinks: true
          }
        },
        partnersSection: true
      }
    };
    
    const response = await fetchStrapi<AboutPageData>('about-page', query);
    return response.data;
  },

  // Get partners for about page (separate endpoint)
  getPartners: async (): Promise<Partner[]> => {
    const query = {
      populate: ['logo']
    };
    
    const response = await fetchStrapi<Partner[]>('partners', query);
    return response.data;
  }
};