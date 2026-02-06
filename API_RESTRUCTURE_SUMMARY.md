# API Restructure Summary

## Những gì đã được thực hiện

### 1. Cài đặt dependencies
```bash
npm install qs @types/qs
```

### 2. Tạo cấu trúc thư mục mới
```
lib/api/
├── strapi-client.ts      # Base client với qs integration
├── services/             # Service modules theo domain
│   ├── homepage.service.ts
│   ├── academy.service.ts
│   ├── community.service.ts
│   ├── venture-hub.service.ts
│   ├── partners.service.ts
│   ├── blog.service.ts
│   ├── about.service.ts
│   └── index.ts
├── examples/
│   └── usage-examples.tsx # Ví dụ sử dụng trong React
├── index.ts              # Main exports
├── demo.ts              # Demo script
└── README.md            # Documentation
```

### 3. Strapi Client với qs
```typescript
// lib/api/strapi-client.ts
import qs from 'qs';

export const fetchStrapi = async (endpoint, queryObj = {}) => {
  const queryString = qs.stringify(queryObj, {
    encodeValuesOnly: true,
  });
  
  const url = `${STRAPI_URL}/api/${endpoint}${queryString ? `?${queryString}` : ''}`;
  // ... fetch logic
};
```

### 4. Service Pattern
Mỗi service chịu trách nhiệm cho một domain cụ thể:

```typescript
// lib/api/services/academy.service.ts
export const AcademyService = {
  getCourses: async (filters = {}) => {
    const query = {
      populate: ['mentor', 'thumbnail'],
      pagination: { page: filters.page || 1, pageSize: filters.pageSize || 10 },
      sort: ['featured:desc', 'createdAt:desc']
    };
    
    if (filters.category && filters.category !== '*') {
      query.filters = { category: { $eq: filters.category } };
    }
    
    return await fetchStrapi('courses', query);
  }
};
```

## Lợi ích của cấu trúc mới

### 1. Query Building tự động
**Trước:**
```javascript
// Phải viết thủ công
const url = '/api/courses?populate[0]=mentor&filters[category][$eq]=web&pagination[page]=1';
```

**Sau:**
```javascript
// Object JavaScript sạch sẽ
const courses = await AcademyService.getCourses({
  category: 'web',
  page: 1,
  pageSize: 10
});
```

### 2. Type Safety và IntelliSense
```typescript
// Có type hints và validation
const response = await AcademyService.getCourses({
  category: 'web',     // ✅ Valid
  level: 'beginner',   // ✅ Valid
  invalidParam: 123    // ❌ TypeScript error
});
```

### 3. Reusable và Maintainable
```typescript
// Dễ dàng reuse logic
const featuredCourses = await AcademyService.getCourses({ featured: true });
const webCourses = await AcademyService.getCourses({ category: 'web' });
const beginnerCourses = await AcademyService.getCourses({ level: 'beginner' });
```

### 4. Error Handling và Fallback
```typescript
export const AcademyService = {
  getCourses: async (filters = {}) => {
    try {
      const response = await fetchStrapi('courses', query);
      return response;
    } catch (error) {
      console.error('Error fetching courses:', error);
      // Tự động fallback data
      return { data: FALLBACK_COURSES, meta: {} };
    }
  }
};
```

## Ví dụ sử dụng trong Component

### Trước (cách cũ):
```typescript
useEffect(() => {
  const loadData = async () => {
    try {
      // Phải construct URL thủ công
      const response = await fetch('/api/courses?populate[0]=mentor&filters[category][$eq]=web');
      const data = await response.json();
      setCourses(data.data);
    } catch (error) {
      console.error(error);
      // Phải handle fallback manually
    }
  };
  loadData();
}, []);
```

### Sau (cách mới):
```typescript
useEffect(() => {
  const loadData = async () => {
    try {
      const response = await AcademyService.getCourses({
        category: 'web',
        page: 1,
        pageSize: 6
      });
      setCourses(response.data);
    } catch (error) {
      // Error đã được handle trong service
      console.error(error);
    }
  };
  loadData();
}, []);
```

## Advanced Features

### 1. Parallel API Calls
```typescript
const [courses, events, posts] = await Promise.all([
  AcademyService.getFeaturedCourses(3),
  CommunityService.getHackathons({ featured: true }),
  BlogService.getBlogPosts({ featured: true })
]);
```

### 2. Complex Filtering
```typescript
const hackathons = await CommunityService.getHackathons({
  status: 'open',
  type: 'hackathon',
  featured: true,
  page: 1,
  pageSize: 10
});
```

### 3. Form Submission
```typescript
const result = await VentureHubService.submitApplication({
  startupName: 'My Startup',
  description: 'AI-powered solution',
  industry: 'edtech',
  teamMembers: 'John Doe, Jane Smith',
  contactEmail: 'contact@mystartup.com'
});
```

## Migration Path

### Backward Compatibility
File `lib/api.ts` cũ vẫn hoạt động, nhưng internally sử dụng services mới:

```typescript
// Cũ (vẫn hoạt động)
const courses = await getAcademyCoursesData();

// Mới (khuyến khích)
const response = await AcademyService.getCourses();
const courses = response.data;
```

### Recommended Migration Steps
1. **Immediate**: Bắt đầu sử dụng services mới cho features mới
2. **Gradual**: Migrate existing components từng cái một
3. **Eventually**: Remove legacy functions khi không còn sử dụng

## Performance Benefits

### 1. Efficient Query Building
- qs library optimize URL encoding
- Automatic query parameter handling
- Reduced manual string concatenation

### 2. Better Caching Strategy
```typescript
// Có thể dễ dàng implement caching
const getCourses = async (filters) => {
  const cacheKey = JSON.stringify(filters);
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  
  const result = await fetchStrapi('courses', query);
  cache.set(cacheKey, result);
  return result;
};
```

### 3. Request Deduplication
Services có thể implement request deduplication để tránh duplicate API calls.

## Next Steps

1. **Testing**: Thêm unit tests cho các services
2. **Caching**: Implement caching layer với React Query hoặc SWR
3. **Optimistic Updates**: Implement optimistic updates cho form submissions
4. **Real-time**: Thêm WebSocket support cho real-time updates
5. **Offline Support**: Implement offline-first strategy

## Conclusion

Cấu trúc API mới mang lại:
- ✅ Code sạch hơn và dễ maintain
- ✅ Type safety tốt hơn
- ✅ Error handling consistent
- ✅ Reusability cao
- ✅ Performance tối ưu
- ✅ Developer experience tốt hơn

Đây là foundation vững chắc cho việc scale ứng dụng trong tương lai.