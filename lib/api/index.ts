// Main API exports
export * from './services';
export { fetchStrapi, getStrapiImageUrl, formatDate } from './strapi-client';

// Type definitions
export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiError {
  error: {
    status: number;
    name: string;
    message: string;
    details?: any;
  };
}