import { fetchStrapi } from '../strapi-client';

export const PartnersService = {
  // Get partners page data (contains everything needed for the page)
  getPartnersPageData: async () => {
    const query = {
      populate: '*'
    };
    
    const response = await fetchStrapi('partners-page', query);
    return response.data;
  }
};