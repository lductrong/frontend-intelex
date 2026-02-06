import { fetchStrapi } from '../strapi-client';

export const BlogService = {
  // Get blog page data (contains everything needed for the page)
  getBlogPageData: async () => {
    const query = {
      populate: '*'
    };
    
    const response = await fetchStrapi('blog-page', query);
    return response.data;
  },

  // Get all blog posts with full data
  getBlogPosts: async () => {
    const query = {
      populate: {
        featuredImage: true,
        author: {
          populate: ['avatar']
        },
        category: true
      },
      sort: ['publishedDate:desc']
    };
    
    const response = await fetchStrapi('blog-posts', query);
    return response.data;
  },

  // Get all blog categories
  getBlogCategories: async () => {
    const query = {
      populate: '*'
    };
    
    const response = await fetchStrapi('blog-categories', query);
    return response.data;
  },

  // Get all blog authors
  getBlogAuthors: async () => {
    const query = {
      populate: ['avatar']
    };
    
    const response = await fetchStrapi('blog-authors', query);
    return response.data;
  }
};