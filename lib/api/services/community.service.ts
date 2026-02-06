import { fetchStrapi } from '../strapi-client';
import { CommunityPageData } from '@/types';

export const CommunityService = {
  // Get community page data (contains everything: hackathons, capstone-projects, mentors)
  getCommunityPageData: async (): Promise<CommunityPageData> => {
    const query = {
      populate: '*'
    };

    const response = await fetchStrapi<CommunityPageData>('community-page', query);
    return response.data;
  }
};