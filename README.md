# Intelex Frontend 2.0

Modern Next.js frontend với Tailwind CSS, kết nối với Strapi backend.

## 🚀 Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Modern styling
- **Strapi v5** - Headless CMS backend

## 🏗️ Architecture

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
├── components/
│   ├── Header.tsx          # Navigation
│   ├── Footer.tsx          # Footer
│   ├── HeroSection.tsx     # Hero banner với typewriter effect
│   ├── AboutSection.tsx    # Ba trụ cột chiến lược
│   ├── AcademySection.tsx  # Khóa học với counter animation
│   ├── EventSection.tsx    # Sự kiện community
│   ├── CtaSection.tsx      # Call-to-action venture hub
│   └── PartnerSection.tsx  # Đối tác chiến lược
├── lib/
│   └── api.ts              # Strapi API client
└── types/
    └── index.ts            # TypeScript types
```

## 🎨 Features

- ✅ **Responsive Design** - Mobile-first với Tailwind CSS
- ✅ **Typewriter Effect** - Animated text trong hero section
- ✅ **Counter Animation** - Số liệu thống kê động
- ✅ **Smooth Animations** - Hover effects và transitions
- ✅ **API Integration** - Kết nối với Strapi backend
- ✅ **Fallback Data** - Graceful degradation khi API fail
- ✅ **TypeScript** - Type safety cho toàn bộ codebase
- ✅ **SEO Optimized** - Meta tags và semantic HTML

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Setup environment:**
   ```bash
   # .env.local đã có sẵn
   NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open browser:**
   ```
   http://localhost:3000
   ```

## 📡 API Integration

Frontend tự động kết nối với Strapi backend tại `http://localhost:1337`:

- `/api/homepage` - Nội dung trang chủ
- `/api/courses` - Danh sách khóa học
- `/api/events` - Sự kiện community
- `/api/partners` - Đối tác chiến lược

Nếu API không available, sẽ sử dụng fallback data.

## 🎯 Design System

### Colors
- **Primary:** Yellow-400 (#FBBF24)
- **Dark:** Gray-900 (#111827)
- **Light:** Gray-50 (#F9FAFB)

### Typography
- **Font:** Inter (Google Fonts)
- **Headings:** Bold, responsive sizes
- **Body:** Regular, readable line-height

### Components
- **Cards:** Rounded-xl với shadow và hover effects
- **Buttons:** Consistent padding, hover animations
- **Sections:** Proper spacing với py-20

## 🔧 Customization

Để thêm section mới:

1. Tạo component trong `src/components/`
2. Import vào `src/app/page.tsx`
3. Thêm data type vào `src/types/index.ts`
4. Update API client nếu cần

## 📱 Responsive Breakpoints

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px  
- **Desktop:** > 1024px

Sử dụng Tailwind responsive prefixes: `md:`, `lg:`, `xl:`