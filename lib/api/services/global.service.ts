import { fetchStrapi } from '../strapi-client';

export const GlobalService = {
  // Get header and footer data for all pages
  getGlobalData: async () => {
    const [headerRes, footerRes] = await Promise.all([
      fetchStrapi('header', { populate: '*' }),
      fetchStrapi('footer', { populate: '*' })
    ]);

    return {
      header: headerRes.data || null,
      footer: footerRes.data || null,
    };
  },

  // Get only header data
  getHeaderData: async () => {
    const response = await fetchStrapi('header', { populate: '*' });
    return response.data || null;
  },

  // Get only footer data
  getFooterData: async () => {
    const response = await fetchStrapi('footer', { populate: '*' });
    return response.data || null;
  }
};