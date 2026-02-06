# Kiến trúc Frontend - Intelex Website

## 🏗️ Tổng quan kiến trúc

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS
- **State Management**: React Hooks (useState, useEffect)
- **API Client**: Fetch API + Custom Services
- **Backend**: Strapi CMS

## 📁 Cấu trúc thư mục

```
web/frontend2.0/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Homepage
│   ├── globals.css              # Global styles
│   ├── about/
│   │   └── page.tsx            # About page
│   ├── academy/
│   │   └── page.tsx            # Academy page
│   ├── blog/
│   │   └── page.tsx            # Blog page
│   ├── community/
│   │   └── page.tsx            # Community page
│   ├── partners/
│   │   └── page.tsx            # Partners page
│   └── venture-hub/
│       └── page.tsx            # Venture Hub page
├── components/                   # Reusable components
│   ├── Header.tsx              # Navigation header
│   ├── Footer.tsx              # Site footer
│   ├── HeroSection.tsx         # Hero banner
│   ├── AboutSection.tsx        # About section
│   ├── AcademySection.tsx      # Academy showcase
│   ├── EventSection.tsx        # Events display
│   ├── CtaSection.tsx          # Call-to-action
│   ├── PageTitle.tsx           # Page title component
│   ├── ClientScripts.tsx       # Client-side scripts
│   ├── about/                  # About page components
│   ├── academy/                # Academy page components
│   ├── blog/                   # Blog page components
│   ├── community/              # Community page components
│   ├── partners/               # Partners page components
│   └── venture-hub/            # Venture Hub components
├── lib/                         # Utilities and API
│   ├── api.ts                  # Legacy API functions + FALLBACK_DATA
│   └── api/                    # New API architecture
│       ├── strapi-client.ts    # Strapi client configuration
│       ├── index.ts            # API exports
│       └── services/           # Service layer
│           ├── homepage.service.ts
│           ├── about.service.ts
│           ├── academy.service.ts
│           ├── blog.service.ts
│           ├── community.service.ts
│           ├── partners.service.ts
│           └── venture-hub.service.ts
├── hooks/                       # Custom React hooks
│   ├── usePreloader.ts         # Preloader functionality
│   └── useBackToTop.ts         # Back to top button
├── types/                       # TypeScript type definitions
│   └── index.ts                # Global types
└── public/                      # Static assets
    ├── css/                    # Legacy CSS files
    ├── js/                     # Legacy JavaScript files
    ├── images/                 # Image assets
    └── fonts/                  # Font files
```

## 🔄 Luồng hoạt động

### 1. Khởi tạo ứng dụng
```
User truy cập → Next.js Router → app/layout.tsx → Render page
```

### 2. Luồng tải dữ liệu
```
Page Component → Service Layer → Strapi Client → Strapi CMS
                ↓ (fallback)
              FALLBACK_DATA
```

### 3. Luồng render component
```
Page → Layout → Header/Footer (từ backend) → Content Components → Client Scripts
```

## 🏛️ Kiến trúc API Layer

### Service Pattern Implementation

#### 1. Strapi Client (`lib/api/strapi-client.ts`)
```typescript
// Base configuration cho Strapi API
export const fetchStrapi = async (endpoint, queryObj = {}) => {
  const queryString = qs.stringify(queryObj, {
    encodeValuesOnly: true,
  });
  const url = `${STRAPI_URL}/${endpoint}${queryString ? `?${queryString}` : ''}`;
  const response = await fetch(url);
  return await response.json();
};
```

#### 2. Service Layer (`lib/api/services/`)
Mỗi service quản lý API calls cho một domain cụ thể:

```typescript
// Ví dụ: blog.service.ts
export const BlogService = {
  getPosts: async (page = 1) => {
    const query = {
      populate: ['author', 'cover_image'],
      pagination: { page, pageSize: 10 },
      sort: ['createdAt:desc'],
    };
    return await fetchStrapi('posts', query);
  },
  
  searchPosts: async (term) => {
    const query = {
      filters: { title: { $containsi: term } },
    };
    return await fetchStrapi('posts', query);
  }
};
```

#### 3. Fallback Data System
```typescript
// lib/api.ts - FALLBACK_DATA được export để services sử dụng
export const FALLBACK_DATA = {
  homepage: { /* data */ },
  courses: [ /* data */ ],
  events: [ /* data */ ],
  // ... other fallback data
};

// Services sử dụng fallback khi Strapi không available
import { FALLBACK_DATA } from '../api';

export const BlogService = {
  getPosts: async () => {
    try {
      return await fetchStrapi('posts');
    } catch (error) {
      return { data: FALLBACK_DATA.blogPosts };
    }
  }
};
```

## 🎯 Component Architecture

### 1. Page Components
- **Location**: `app/*/page.tsx`
- **Responsibility**: 
  - Fetch data từ services
  - Manage page-level state
  - Compose layout với components
  - Handle loading states

### 2. Layout Components
- **Header.tsx**: Navigation, logo, menu
- **Footer.tsx**: Footer links, contact info, social media
- **PageTitle.tsx**: Breadcrumb và page title

### 3. Content Components
- **Reusable**: HeroSection, AboutSection, CtaSection
- **Page-specific**: Trong thư mục tương ứng (blog/, academy/, etc.)

### 4. Utility Components
- **ClientScripts.tsx**: jQuery scripts và third-party integrations

## 🔧 State Management

### 1. Local State (useState)
```typescript
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
```

### 2. Custom Hooks
```typescript
// hooks/usePreloader.ts
export const usePreloader = () => {
  useEffect(() => {
    // Preloader logic
  }, []);
};

// hooks/useBackToTop.ts
export const useBackToTop = () => {
  useEffect(() => {
    // Back to top functionality
  }, []);
};
```

## 🎨 Styling Architecture

### 1. CSS Hierarchy
```
1. Tailwind CSS (utility-first)
2. Global CSS (app/globals.css)
3. Legacy CSS (public/css/*)
4. Component-specific styles (styled-jsx)
```

### 2. Theme System
- **Primary**: Yellow theme (`skin-yellow.css`)
- **Components**: Bootstrap-based với custom modifications
- **Responsive**: Mobile-first approach

## 🚀 Performance Optimizations

### 1. Next.js Features
- **App Router**: File-based routing
- **Server Components**: Default server rendering
- **Client Components**: Selective hydration với 'use client'

### 2. Data Fetching Strategy
```typescript
// Server Components (default)
async function ServerPage() {
  const data = await fetchData(); // Server-side
  return <Component data={data} />;
}

// Client Components (interactive)
'use client';
function ClientPage() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetchData().then(setData); // Client-side
  }, []);
  
  return <Component data={data} />;
}
```

### 3. Asset Optimization
- **Images**: Next.js Image component với optimization
- **Fonts**: Google Fonts với preload
- **CSS**: Minification và tree-shaking

## 🔄 Data Flow Patterns

### 1. Homepage Flow
```
app/page.tsx → HomepageService → Strapi CMS
           ↓
    HeroSection, AboutSection, AcademySection, EventSection
           ↓
    Header/Footer từ backend
```

### 2. Blog Flow
```
app/blog/page.tsx → BlogService → Strapi CMS / FALLBACK_DATA
                ↓
    FeaturedPostSection, BlogCard components
                ↓
    Pagination, Search, Categories
```

### 3. Venture Hub Flow (Current)
```
app/venture-hub/page.tsx → Fake Data (VENTURE_HUB_DATA)
                       ↓
    Hero, Criteria, Process, Startups, Application Form
                       ↓
    Header/Footer từ backend
```

## 🛠️ Development Workflow

### 1. Adding New Page
```bash
1. Tạo app/new-page/page.tsx
2. Tạo service trong lib/api/services/new-page.service.ts
3. Tạo components trong components/new-page/
4. Update types trong types/index.ts
5. Add fallback data trong lib/api.ts (nếu cần)
```

### 2. API Integration Pattern
```typescript
// 1. Define service
export const NewPageService = {
  getData: async () => {
    try {
      return await fetchStrapi('new-endpoint');
    } catch (error) {
      return { data: FALLBACK_DATA.newPageData };
    }
  }
};

// 2. Use in component
'use client';
export default function NewPage() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    NewPageService.getData().then(setData);
  }, []);
  
  return <div>{/* render */}</div>;
}
```

## 🔍 Error Handling

### 1. API Error Handling
```typescript
try {
  const data = await fetchStrapi('endpoint');
  return data;
} catch (error) {
  console.error('API Error:', error);
  return { data: FALLBACK_DATA.defaultData };
}
```

### 2. Component Error Boundaries
```typescript
if (loading) return <LoadingSpinner />;
if (error) return <ErrorMessage error={error} />;
if (!data) return <EmptyState />;
```

## 📱 Responsive Design

### 1. Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

### 2. Component Adaptation
```typescript
// Responsive classes
<div className="col-12 col-md-6 col-lg-4">
  <Component />
</div>
```

## 🔐 Security Considerations

### 1. Environment Variables
```bash
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
# Public variables có prefix NEXT_PUBLIC_
```

### 2. Data Sanitization
```typescript
// Sanitize user input
const sanitizedInput = DOMPurify.sanitize(userInput);
```

## 🚀 Deployment Architecture

### 1. Build Process
```bash
npm run build → Static generation → Deploy to hosting
```

### 2. Environment Setup
- **Development**: Local Strapi + Next.js dev server
- **Production**: Production Strapi + Static deployment

---

## 📋 Current Status & Next Steps

### ✅ Completed
- Service pattern implementation
- API restructure với qs library
- About, Blog pages với Footer integration
- Fallback data system
- Venture Hub page theo mẫu HTML

### 🔄 In Progress
- Venture Hub page refinement
- Theme consistency (yellow primary color)

### 📝 Todo
- Complete all pages với service integration
- Performance optimization
- SEO optimization
- Testing implementation