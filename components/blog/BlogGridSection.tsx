'use client';

import { useState } from 'react';
import { SectionContent, BlogPost } from '@/types';
import BlogCard from './BlogCard';

interface BlogGridSectionProps {
  sectionData: SectionContent;
  blogPosts: BlogPost[];
}

export default function BlogGridSection({ 
  sectionData, 
  blogPosts
}: BlogGridSectionProps) {
  const [visiblePosts, setVisiblePosts] = useState(6);
  
  // Filter out featured posts for the grid
  const nonFeaturedPosts = blogPosts.filter(post => !post.featured);
  const displayedPosts = nonFeaturedPosts.slice(0, visiblePosts);
  const hasMorePosts = visiblePosts < nonFeaturedPosts.length;

  const loadMorePosts = () => {
    setVisiblePosts(prev => prev + 6);
  };

  return (
    <section className="bg-light page-section-ptb">
      <div className="container">
        <div className="row justify-content-center mb-50">
          <div className="col-lg-8 text-center">
            <h3 className="theme-color mb-20">{sectionData.heading}</h3>
            <p>{sectionData.description}</p>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {displayedPosts.map((post) => (
            <div key={post.slug} className="col">
              <BlogCard 
                post={post}
                author={(post as any).author}
                category={(post as any).category}
              />
            </div>
          ))}
        </div>

        {hasMorePosts && (
          <div className="row justify-content-center mt-50">
            <div className="col-md-6 text-center">
              <button 
                className="button button-border"
                onClick={loadMorePosts}
              >
                Xem thêm bài viết <i className="ti-angle-down ps-2"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}