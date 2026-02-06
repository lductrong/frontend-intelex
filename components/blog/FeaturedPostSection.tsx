'use client';

import { formatDate } from '@/lib/api/services';
import { SectionContent, BlogPost } from '@/types';

interface FeaturedPostSectionProps {
  sectionData: SectionContent;
  featuredPost: BlogPost;
}

export default function FeaturedPostSection({ 
  sectionData, 
  featuredPost
}: FeaturedPostSectionProps) {
  if (!featuredPost) return null;

  const author = (featuredPost as any).author;
  const category = (featuredPost as any).category;

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
    return "/images/blog/01.jpg";
  };

  return (
    <section className="white-bg page-section-ptb">
      <div className="container">
        <div className="row justify-content-center mb-50">
          <div className="col-lg-8 text-center">
            <h3 className="theme-color mb-20">{sectionData.heading}</h3>
            <p>{sectionData.description}</p>
          </div>
        </div>

        <div className="row mb-50">
          <div className="col-lg-12">
            <div className="feature-text box-shadow white-bg">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="feature-img">
                    <img 
                      className="img-fluid" 
                      src={getImageUrl(featuredPost)} 
                      alt={featuredPost.title || (featuredPost as any).attributes?.title}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/images/blog/01.jpg";
                      }}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="feature-info p-50">
                    <div className="mb-20">
                      <span className="badge bg-danger me-2">Nổi bật</span>
                      {category && (
                        <span className={`badge ${getBadgeClass(category.color || category.attributes?.color)}`}>
                          {category.name || category.attributes?.name}
                        </span>
                      )}
                    </div>
                    <h3 className="mb-20">{featuredPost.title || (featuredPost as any).attributes?.title}</h3>
                    <p className="mb-20">{featuredPost.excerpt || (featuredPost as any).attributes?.excerpt}</p>
                    
                    <div className="blog-meta mb-30">
                      <div className="row">
                        <div className="col-md-4">
                          <small className="text-muted d-block">Ngày đăng</small>
                          <strong>{formatDate(featuredPost.publishedDate || (featuredPost as any).attributes?.publishedDate)}</strong>
                        </div>
                        <div className="col-md-4">
                          <small className="text-muted d-block">Tác giả</small>
                          <strong>{author?.name || author?.attributes?.name || 'Unknown'}</strong>
                        </div>
                        <div className="col-md-4">
                          <small className="text-muted d-block">Thời gian đọc</small>
                          <strong>{featuredPost.readTime || (featuredPost as any).attributes?.readTime || 5} phút</strong>
                        </div>
                      </div>
                    </div>
                    
                    <button className="button" style={{ border: 'none', background: '#007bff', color: 'white', padding: '10px 20px', borderRadius: '5px' }}>Đọc tiếp</button>
                    <div className="social-share mt-20">
                      <small className="text-muted me-2">Chia sẻ:</small>
                      <a href="#" className="me-2"><i className="fa fa-facebook"></i></a>
                      <a href="#" className="me-2"><i className="fa fa-twitter"></i></a>
                      <a href="#" className="me-2"><i className="fa fa-linkedin"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}