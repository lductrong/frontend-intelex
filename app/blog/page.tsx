'use client';

import { useEffect, useState } from 'react';
import { BlogService, GlobalService } from '@/lib/api/services';
import { BlogPost } from '@/types';
import PageTitle from '@/components/global/PageTitle';
import FeaturedPostSection from '@/components/blog/FeaturedPostSection';
import BlogGridSection from '@/components/blog/BlogGridSection';
import Header from '@/components/global/Header';
import Footer from '@/components/global/Footer';
import { usePreloader } from '@/hooks/usePreloader';
import { useBackToTop } from '@/hooks/useBackToTop';

export default function BlogPage() {
  const [data, setData] = useState<any>(null);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [globalData, setGlobalData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Use React hooks to replace jQuery functionality
  usePreloader();
  useBackToTop();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [blogPageData, blogPostsData, globalDataRes] = await Promise.all([
          BlogService.getBlogPageData(),
          BlogService.getBlogPosts(),
          GlobalService.getGlobalData()
        ]);

        // Find featured post and regular posts
        const allPosts = blogPostsData || [];
        const featuredPost = allPosts.find((post: any) => post.featured || post.attributes?.featured) || allPosts[0];
        const regularPosts = allPosts.filter((post: any) => !(post.featured || post.attributes?.featured));

        console.log('Blog API Response Debug:', {
          blogPageData,
          allPosts: allPosts.slice(0, 2), // Show first 2 posts structure
          featuredPost,
          totalPosts: allPosts.length
        });

        setData(blogPageData);
        setFeaturedPost(featuredPost);
        setBlogPosts(regularPosts);
        setGlobalData(globalDataRes);

        console.log('Blog data loaded:', {
          posts: allPosts.length,
          featuredPost: !!featuredPost,
          regularPosts: regularPosts.length
        });
      } catch (error) {
        console.error('Error fetching blog data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) {
    return (
      <div className="wrapper">
        <div id="pre-loader">
          <img src="/images/pre-loader/loader-06.svg" alt="" />
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="wrapper">
        <div id="pre-loader">
          <img src="/images/pre-loader/loader-06.svg" alt="" />
        </div>
        <Header data={globalData?.header} />
        <div className="container">
          <div className="row">
            <div className="col-12 text-center py-5">
              <h2>Không thể tải dữ liệu</h2>
              <p>Vui lòng thử lại sau.</p>
            </div>
          </div>
        </div>
        <Footer data={globalData?.footer} />
      </div>
    );
  }

  return (
    <div className="wrapper">
      {/* Preloader */}
      <div id="pre-loader">
        <img src="/images/pre-loader/loader-06.svg" alt="" />
      </div>

      {/* Header */}
      <Header data={globalData?.header} />
      
      <main>
        {/* Page Title */}
        <PageTitle 
          title={data?.pageTitle || "Blog & Tin tức"}
          subtitle={data?.pageSubtitle || "Cập nhật xu hướng công nghệ và câu chuyện khởi nghiệp"}
          backgroundImage="/images/hero-home.png"
        />
        
        {/* Featured Post Section */}
        {featuredPost && (
          <FeaturedPostSection 
            sectionData={data?.featuredPostSection || {
              heading: "Bài viết nổi bật",
              description: "Những thông tin và góc nhìn mới nhất về công nghệ, khởi nghiệp và giáo dục"
            }}
            featuredPost={featuredPost}
          />
        )}

        {/* Blog Grid Section */}
        <BlogGridSection 
          sectionData={data?.blogPostsSection || {
            heading: "Danh sách bài viết",
            description: "Khám phá thêm nhiều nội dung hữu ích về công nghệ, khởi nghiệp và phát triển sự nghiệp"
          }}
          blogPosts={blogPosts}
        />

        {/* Related Links Section */}
        <section className="section-padding">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center mb-5">
                <h2>Khám phá thêm</h2>
                <p className="lead">Tham gia các chương trình khác của Intelex</p>
              </div>
            </div>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              <div className="col">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center p-4 d-flex flex-column">
                    <div className="icon-box mb-3">
                      <i className="ti-book" style={{ fontSize: '3rem', color: '#ffd000ff' }}></i>
                    </div>
                    <h5 className="card-title">Academy</h5>
                    <p className="card-text flex-grow-1">Học tập cùng chuyên gia và nhận chứng chỉ có giá trị</p>
                    <a href="/academy" className="btn btn-outline-primary mt-auto">Khám phá</a>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center p-4 d-flex flex-column">
                    <div className="icon-box mb-3">
                      <i className="ti-heart" style={{ fontSize: '3rem', color: '#ffd000ff' }}></i>
                    </div>
                    <h5 className="card-title">Community</h5>
                    <p className="card-text flex-grow-1">Kết nối với cộng đồng công nghệ trẻ năng động</p>
                    <a href="/community" className="btn btn-outline-primary mt-auto">Tham gia</a>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center p-4 d-flex flex-column">
                    <div className="icon-box mb-3">
                      <i className="ti-rocket" style={{ fontSize: '3rem', color: '#ffd000ff' }}></i>
                    </div>
                    <h5 className="card-title">Venture Hub</h5>
                    <p className="card-text flex-grow-1">Nhận đầu tư cho ý tưởng startup của bạn</p>
                    <a href="/venture-hub" className="btn btn-outline-primary mt-auto">Nộp hồ sơ</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer data={globalData?.footer} />

      {/* Back to top */}
      <div id="back-to-top">
        <a className="top arrow" href="#top">
          <i className="fa fa-angle-up"></i> <span>TOP</span>
        </a>
      </div>
    </div>
  );
}