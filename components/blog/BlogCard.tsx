'use client';

import { formatDate } from '@/lib/api/services';
import { BlogPost, BlogAuthor, BlogCategory } from '@/types';

interface BlogCardProps {
  post: BlogPost;
  author?: BlogAuthor;
  category?: BlogCategory;
}

export default function BlogCard({ post, author, category }: BlogCardProps) {
  const getBadgeClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'primary': 'bg-primary',
      'success': 'bg-success',
      'warning': 'bg-warning',
      'info': 'bg-info',
      'secondary': 'bg-secondary',
      'danger': 'bg-danger'
    };
    return colorMap[color] || 'bg-primary';
  };

  // Get default image based on category
  const getDefaultImage = (categorySlug: string) => {
    const imageMap: { [key: string]: string } = {
      'ai-technology': '/images/blog/01.jpg',
      'career': '/images/blog/02.jpg',
      'event': '/images/blog/03.jpg',
      'startup': '/images/blog/04.jpg',
      'technology': '/images/blog/05.jpg',
      'tutorial': '/images/blog/06.jpg'
    };
    return imageMap[categorySlug] || '/images/blog/07.jpg';
  };

  // Get image URL from Strapi response
  const getImageUrl = (post: any) => {
    // Check different possible structures for featuredImage
    if (post.featuredImage?.data?.attributes?.url) {
      return `http://localhost:1337${post.featuredImage.data.attributes.url}`;
    }
    if (post.featuredImage?.url) {
      return post.featuredImage.url.startsWith('http') 
        ? post.featuredImage.url 
        : `http://localhost:1337${post.featuredImage.url}`;
    }
    if (post.attributes?.featuredImage?.data?.attributes?.url) {
      return `http://localhost:1337${post.attributes.featuredImage.data.attributes.url}`;
    }
    return getDefaultImage(post.categorySlug || post.attributes?.categorySlug || '');
  };

  return (
    <div className="feature-text box-shadow white-bg h-100 d-flex flex-column">
      <div className="feature-img">
        <img 
          className="img-fluid" 
          src={getImageUrl(post)} 
          alt={post.title || post.attributes?.title}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = getDefaultImage(post.categorySlug || '');
          }}
        />
        <div className="feature-overlay">
          <div className="feature-overlay-content">
            {category && (
              <span className={`badge ${getBadgeClass(category.color)}`}>
                {category.name}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="feature-info p-30 d-flex flex-column flex-grow-1">
        <h5 className="mb-15">
          <span style={{ cursor: 'pointer' }}>{post.title || post.attributes?.title}</span>
        </h5>
        <p className="mb-20">{post.excerpt || post.attributes?.excerpt}</p>
        
        <div className="blog-meta mb-20">
          <div className="row">
            <div className="col-6">
              <small className="text-muted">
                <i className="ti-calendar"></i> {formatDate(post.publishedDate || post.attributes?.publishedDate)}
              </small>
            </div>
            <div className="col-6 text-end">
              <small className="text-muted">
                <i className="ti-eye"></i> {(post.viewCount || post.attributes?.viewCount || 0).toLocaleString()} views
              </small>
            </div>
          </div>
        </div>
        
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <small className="text-muted">By {author?.name || author?.attributes?.name || 'Unknown'}</small>
          <button className="button x-small" style={{ border: 'none', background: 'transparent' }}>Đọc thêm</button>
        </div>
      </div>
    </div>
  );
}