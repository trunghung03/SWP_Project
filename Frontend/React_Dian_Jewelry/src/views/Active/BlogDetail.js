import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SubNav from '../../components/SubNav/SubNav.js';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';
import BlogInspired from '../../components/BlogInspired/BlogInspired.js';
import { getArticleById, getAllArticles } from '../../services/BlogService.js';
import { getEmployeeById } from '../../services/UserService';
import '../../styles/Active/BlogDetail.scss';
import blogLogo from '../../assets/img/blogLogo.png';
import HeaderComponent from '../../components/Header/HeaderComponent';
import FooterComponent from '../../components/Footer/FooterComponent';
import Loading from '../../components/Loading/Loading';

function BlogDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { articleID } = location.state || {};
  const [article, setArticle] = useState(null);
  const [creatorName, setCreatorName] = useState('');
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [articleID]);

  useEffect(() => {
    if (articleID) {
      getArticleById(articleID)
        .then(data => {
          setArticle(data);
          getEmployeeById(data.createdBy)
            .then(employeeData => {
              const fullName = `${employeeData.data.firstName} ${employeeData.data.lastName}`;
              setCreatorName(fullName);
            })
            .catch(error => {
              console.error(error);
            });

          getAllArticles()
            .then(allArticles => {
              const related = allArticles.filter(a => a.tag === data.tag && a.articleID !== data.articleID).slice(0, 4);
              setRelatedArticles(related);
            })
            .catch(error => {
              console.error(error);
            });
        })
        .catch(error => {
          console.error(error);
        });
    }
    window.scrollTo(0, 210);
  }, [articleID]);

  if (!article) {
    return (
      <div>
        <HeaderComponent />
        <Loading />
        <ScrollToTop />
        <FooterComponent />
      </div>
    );
  }

  const navItems = [
    { name: 'Home', link: '/home' },
    { name: 'Blog', link: '/blog' },
    { name: article.title }
  ];

  return (
    <div className="BlogDetail">
      <HeaderComponent />
      <SubNav items={navItems} />

      <div className='blog_detail_main_container'>
        <div className="blog_detail_header">
          <p className="blog_detail_created_on">{new Date(article.createdOn).toLocaleDateString()}</p>
          <h4 className="blog_detail_title">{article.title}</h4>
          <p className="blog_detail_created_by">Creator: {creatorName}</p>
        </div>
        <div className="blog_detail_content">
          <div className='blog_detail_main_image'>
            <img src={article.image} alt={article.title} className="blog_detail_image" />
          </div>
          <div className='blog_detail_content_text'>
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>
        </div>
      </div>

      <div className="blogd_social_container">
        <div className="blogd_back_to_blog_list" onClick={() => navigate('/blog')}>
          <i className="fas fa-arrow-left"></i>
          <span>Back to blog list</span>
        </div>
        <div className="blogd_social_icons">
          <a href="https://www.facebook.com/profile.php?id=61560517631582" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.instagram.com/dian_jewelryy" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.tiktok.com/@dianjewelry" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-tiktok"></i>
          </a>
          <a href="/home" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-google"></i>
          </a>
          <a href="mailto:diamonddianjewelry@gmail.com">
            <i className="far fa-envelope"></i>
          </a>
        </div>
      </div>

      {relatedArticles.length > 0 && (
        <div className="blog_also_like_container">
          <div className="blog_also_like_header">
            <h4>You Might Also Like From</h4>
            <img src={blogLogo} alt="Blog Logo" className="blog_also_like_logo" />
          </div>
          <div className="remaining_blogd_container row">
            {relatedArticles.map(article => (
              <div key={article.articleID} className="col-md-3 mb-4">
                <div className="blogd_small_blog_card card">
                  <img src={article.image} alt={article.title} className="small_blogd_image card-img-top" />
                  <div className="small_blogd_card_body card-body">
                    <h6 className="small_blogd_title card-title">{article.title}</h6>
                    <div className='small_blogd_card_button'>
                      <button
                        className="small_blogd_read_more btn btn-link"
                        onClick={() => navigate(`/blog-detail/${encodeURIComponent(article.title)}`, { state: { articleID: article.articleID } })}
                      >
                        Read more <i className="fas fa-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className='blog_inspired_title'>
        <h4>Get Inspired</h4>
        <p>Tag us on instagram @dianjewelry</p>
      </div>
      <BlogInspired />
      <ScrollToTop />
      <FooterComponent />
    </div>
  );
}

export default BlogDetail;
