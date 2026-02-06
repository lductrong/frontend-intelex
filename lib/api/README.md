# API Layer Documentation

Cấu trúc API mới được tổ chức theo mô hình service-oriented để dễ bảo trì và mở rộng.

## Cấu trúc thư mục

```
lib/api/
├── strapi-client.ts      # Cấu hình base client với qs
├── services/             # Các service modules
│   ├── homepage.service.ts
│   ├── academy.service.ts
│   ├── community.service.ts
│   ├── venture-hub.service.ts
│   ├── partners.service.ts
│   ├── blog.service.ts
│   ├── about.service.ts
│   └── index.ts         # Export tất cả services
├── examples/            # Ví dụ sử dụng
│   └── usage-examples.tsx
├── index.ts            # Main exports
└── README.md           # Tài liệu này
```

## Tại sao sử dụng cấu trúc này?

### 1. Tách biệt logic API
- Mỗi service chịu tr책nhiệm cho một domain cụ thể
- Dễ dàng test và maintain
- Code reusability cao

### 2. Sử dụng qs library
- Strapi yêu cầu query string phức tạp cho filters, populate, pagination
- `qs` tự động convert object JavaScript thành URL query string
- Ví dụ: `{ filters: { title: { $eq: 'hello' } } }` → `?filters[title][$eq]=hello`

### 3. Fallback data
- Mỗi service có fallback data khi API không khả dụng
- Đảm bảo ứng dụng vẫn hoạt động trong development

## Cách sử dụng

### Import services

```typescript
import { 
  HomepageService, 
  AcademyService, 
  CommunityService,
  getStrapiImageUrl,
  formatDate 
} from '@/lib/api';
```

### Ví dụ cơ bản

```typescript
// Lấy danh sách khóa học với filter
const courses = await AcademyService.getCourses({
  category: 'web',
  level: 'beginner',
  page: 1,
  pageSize: 10
});

// Tìm kiếm hackathons
const hackathons = await CommunityService.getHackathons({
  status: 'open',
  featured: true
});

// Lấy bài viết blog theo category
const posts = await BlogService.getBlogPosts({
  category: 'ai-technology',
  page: 1
});
```

### Sử dụng trong React Component

```typescript
useEffect(() => {
  const loadData = async () => {
    try {
      const [courses, events] = await Promise.all([
        AcademyService.getFeaturedCourses(3),
        CommunityService.getHackathons({ featured: true })
      ]);
      
      setCourses(courses);
      setEvents(events.data);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  loadData();
}, []);
```

## API Services

### HomepageService
- `getHomepageData()` - Lấy dữ liệu trang chủ
- `getPartnersData()` - Lấy danh sách đối tác

### AcademyService
- `getAcademyPageData()` - Lấy dữ liệu trang Academy
- `getCourses(filters)` - Lấy danh sách khóa học với filter
- `getFeaturedCourses(limit)` - Lấy khóa học nổi bật
- `getCourseBySlug(slug)` - Lấy chi tiết khóa học

### CommunityService
- `getCommunityPageData()` - Lấy dữ liệu trang Community
- `getHackathons(filters)` - Lấy danh sách hackathons
- `getCapstoneProjects(filters)` - Lấy dự án capstone
- `getMentors(filters)` - Lấy danh sách mentors

### VentureHubService
- `getVentureHubPageData()` - Lấy dữ liệu trang Venture Hub
- `getStartups(filters)` - Lấy danh sách startups đã đầu tư
- `getCriteria()` - Lấy tiêu chí đầu tư
- `getProcessSteps()` - Lấy quy trình đầu tư
- `submitApplication(data)` - Gửi đơn đăng ký startup

### PartnersService
- `getPartnersPageData()` - Lấy dữ liệu trang Partners
- `getUniversityBenefits()` - Lấy lợi ích cho trường đại học
- `getCompanyBenefits()` - Lấy lợi ích cho doanh nghiệp
- `getSuccessStories(filters)` - Lấy câu chuyện thành công
- `submitPartnershipApplication(data)` - Gửi đơn đăng ký hợp tác

### BlogService
- `getBlogPageData()` - Lấy dữ liệu trang Blog
- `getBlogPosts(filters)` - Lấy danh sách bài viết
- `getFeaturedBlogPost()` - Lấy bài viết nổi bật
- `getBlogPostBySlug(slug)` - Lấy chi tiết bài viết
- `getBlogCategories()` - Lấy danh mục blog
- `searchPosts(term)` - Tìm kiếm bài viết

### AboutService
- `getAboutPageData()` - Lấy dữ liệu trang About
- `getTeamMembers(filters)` - Lấy thành viên team
- `getCompanyStats()` - Lấy thống kê công ty
- `getMilestones()` - Lấy các mốc quan trọng

## Utilities

### getStrapiImageUrl(imageData)
Chuyển đổi image data từ Strapi thành URL đầy đủ

```typescript
const imageUrl = getStrapiImageUrl(course.thumbnail);
```

### formatDate(dateString)
Format ngày tháng theo định dạng Việt Nam

```typescript
const formattedDate = formatDate(post.publishedDate); // "21/08/2025"
```

## Filters và Pagination

Tất cả services đều hỗ trợ filtering và pagination:

```typescript
const response = await AcademyService.getCourses({
  category: 'web',        // Filter theo category
  level: 'beginner',      // Filter theo level
  page: 2,               // Trang thứ 2
  pageSize: 6            // 6 items per page
});

// Response structure
{
  data: [...],           // Array of items
  meta: {
    pagination: {
      page: 2,
      pageSize: 6,
      pageCount: 10,
      total: 60
    }
  }
}
```

## Error Handling

Tất cả services đều có error handling và fallback data:

```typescript
try {
  const courses = await AcademyService.getCourses();
  // Sử dụng data từ API
} catch (error) {
  console.error('API Error:', error);
  // Service tự động return fallback data
}
```

## Migration từ API cũ

File `lib/api.ts` cũ vẫn được giữ lại để backward compatibility. Các function cũ sẽ gọi services mới:

```typescript
// Cũ (vẫn hoạt động)
const courses = await getAcademyCoursesData();

// Mới (khuyến khích)
const response = await AcademyService.getCourses();
const courses = response.data;
```

## Best Practices

1. **Sử dụng services mới** thay vì functions cũ
2. **Handle loading states** khi gọi API
3. **Sử dụng Promise.all** cho multiple API calls
4. **Cache data** khi cần thiết với React Query hoặc SWR
5. **Error boundaries** để handle API errors gracefully

## Ví dụ hoàn chỉnh

Xem file `examples/usage-examples.tsx` để có ví dụ chi tiết về cách sử dụng trong React components.