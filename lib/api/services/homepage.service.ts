import { fetchStrapi } from '../strapi-client';
import { HomepageData } from '@/types';

export const HomepageService = {
  // Get homepage data with all components populated
  getHomepageData: async (): Promise<HomepageData> => {
    const query = {
      populate: {
        content: {
          populate: '*'
        }
      }
    };
    
    const response = await fetchStrapi<HomepageData>('homepage', query);
    return response.data;
  }
};