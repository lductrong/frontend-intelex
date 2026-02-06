// Export all services for easy importing
export { HomepageService } from './homepage.service';
export { AcademyService } from './academy.service';
export { CommunityService } from './community.service';
export { VentureHubService } from './venture-hub.service';
export { PartnersService } from './partners.service';
export { BlogService } from './blog.service';
export { AboutService } from './about.service';
export { GlobalService } from './global.service';

// Re-export utilities from strapi-client
export { getStrapiImageUrl, formatDate } from '../strapi-client';