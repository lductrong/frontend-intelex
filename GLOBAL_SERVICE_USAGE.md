# Cách sử dụng GlobalService

## 🎯 Mục đích
GlobalService được tạo để tái sử dụng logic fetch header/footer data thay vì duplicate code trong mỗi page.

## 📝 Cách sử dụng

### 1. Import GlobalService
```typescript
import { GlobalService } from '@/lib/api/services';
```

### 2. Thay thế code cũ

#### ❌ Code cũ (duplicate trong mỗi page):
```typescript
// API function to get global data (header/footer)
async function getGlobalData() {
  try {
    const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    
    const [headerRes, footerRes] = await Promise.all([
      fetch(`${API_URL}/api/header?populate=*`).then(res => res.json()),
      fetch(`${API_URL}/api/footer?populate=*`).then(res => res.json())
    ]);

    return {
      header: headerRes.data || null,
      footer: footerRes.data || null,
    };
  } catch (error) {
    console.error('Error fetching global data:', error);
    return {
      header: null,
      footer: null,
    };
  }
}

// Trong useEffect
useEffect(() => {
  const fetchData = async () => {
    const globalData = await getGlobalData();
    setGlobalData(globalData);
  };
  fetchData();
}, []);
```

#### ✅ Code mới (sử dụng GlobalService):
```typescript
import { GlobalService } from '@/lib/api/services';

// Trong useEffect
useEffect(() => {
  const fetchData = async () => {
    const globalData = await GlobalService.getGlobalData();
    setGlobalData(globalData);
  };
  fetchData();
}, []);
```

### 3. Các methods available

#### `getGlobalData()` - Lấy cả header và footer
```typescript
const globalData = await GlobalService.getGlobalData();
// Returns: { header: HeaderData | null, footer: FooterData | null }
```

#### `getHeaderData()` - Chỉ lấy header
```typescript
const headerData = await GlobalService.getHeaderData();
// Returns: HeaderData | null
```

#### `getFooterData()` - Chỉ lấy footer
```typescript
const footerData = await GlobalService.getFooterData();
// Returns: FooterData | null
```

## 🔄 Migration Guide

### Pages cần update:
- ✅ `app/venture-hub/page.tsx` - Đã update
- ⏳ `app/page.tsx` (Homepage)
- ⏳ `app/about/page.tsx`
- ⏳ `app/blog/page.tsx`
- ⏳ `app/community/page.tsx`
- ⏳ `app/academy/page.tsx`
- ⏳ `app/partners/page.tsx`

### Steps để migrate:
1. Import `GlobalService` từ `@/lib/api/services`
2. Thay thế `getGlobalData()` function bằng `GlobalService.getGlobalData()`
3. Xóa function `getGlobalData()` cũ
4. Test để đảm bảo header/footer vẫn hoạt động

## 💡 Lợi ích

### 1. DRY Principle
- Không duplicate code
- Centralized logic
- Dễ maintain

### 2. Consistency
- Cùng một cách fetch data
- Cùng error handling
- Cùng response format

### 3. Sử dụng qs library
- GlobalService sử dụng `fetchStrapi` 
- `fetchStrapi` sử dụng `qs.stringify`
- Query parameters được format đúng chuẩn Strapi

### 4. Type Safety
- TypeScript support
- Proper error handling
- Consistent return types

## 🔧 Implementation Details

### File structure:
```
lib/api/services/
├── global.service.ts     # ← New service
├── homepage.service.ts
├── blog.service.ts
└── index.ts             # Export GlobalService
```

### Code trong global.service.ts:
```typescript
import { fetchStrapi } from '../strapi-client';

export const GlobalService = {
  getGlobalData: async () => {
    try {
      const [headerRes, footerRes] = await Promise.all([
        fetchStrapi('header', { populate: '*' }),
        fetchStrapi('footer', { populate: '*' })
      ]);

      return {
        header: headerRes.data || null,
        footer: footerRes.data || null,
      };
    } catch (error) {
      console.error('Error fetching global data:', error);
      return {
        header: null,
        footer: null,
      };
    }
  }
};
```

## 🎯 Next Steps

1. **Update remaining pages** để sử dụng GlobalService
2. **Remove duplicate code** trong các pages
3. **Add fallback data** cho header/footer nếu cần
4. **Consider caching** cho global data nếu cần optimize performance