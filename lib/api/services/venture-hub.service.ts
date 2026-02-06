import { fetchStrapi } from '../strapi-client';

export const VentureHubService = {
  // Get venture hub page data (contains everything needed for the page)
  getVentureHubPageData: async () => {
    const query = {
      populate: '*'
    };
    
    const response = await fetchStrapi('venture-hub-page', query);
    return response.data;
  }
};