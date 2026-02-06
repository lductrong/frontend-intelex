import qs from 'qs';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

interface StrapiResponse<T> {
  data: T;
  meta?: any;
}

interface StrapiError {
  error: {
    status: number;
    name: string;
    message: string;
    details?: any;
  };
}

export const fetchStrapi = async <T>(
  endpoint: string, 
  queryObj: Record<string, any> = {}
): Promise<StrapiResponse<T>> => {
  // Convert object to query string with proper encoding
  const queryString = qs.stringify(queryObj, {
    encodeValuesOnly: true, // Makes URL cleaner
  });

  const url = `${STRAPI_URL}/api/${endpoint}${queryString ? `?${queryString}` : ''}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData: StrapiError = await response.json();
      throw new Error(`Strapi API Error: ${errorData.error.message || response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error);
    throw error;
  }
};

// Helper function to get Strapi image URL
export function getStrapiImageUrl(imageData: any): string {
  if (!imageData) return '';
  
  if (imageData.url?.startsWith('http')) {
    return imageData.url;
  }
  
  if (imageData.url) {
    return `${STRAPI_URL}${imageData.url}`;
  }
  
  return '';
}

// Helper function to format date
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}