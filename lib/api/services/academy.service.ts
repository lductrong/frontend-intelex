import { fetchStrapi } from '../strapi-client';
import { AcademyPageData } from '@/types';

export const AcademyService = {
  // Get academy page data (contains everything: courses, filterSection, heroImage)
  getAcademyPageData: async (): Promise<AcademyPageData> => {
    const query = {
      populate: {
        courses: {
          populate: ['mentor', 'image']
        },
        filterSection: {
          populate: {
            categories: true
          }
        },
        heroImage: true
      }
    };
    
    const response = await fetchStrapi<AcademyPageData>('academy-page', query);
    return response.data;
  }
};