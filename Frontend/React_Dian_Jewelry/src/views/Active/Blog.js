import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../styles/Active/Blog.scss';
import SubNav from '../../components/SubNav/SubNav.js';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';
import { getAllArticles } from '../../services/BlogService.js';
import blogLogo from '../../assets/img/blogLogo.png';
import missionImage from '../../assets/img/blogMission.png';
import conflictFreeIcon from '../../assets/img/blog1.svg';
import recycledMetalsIcon from '../../assets/img/blog2.svg';
import givingBackIcon from '../../assets/img/blog3.svg';

function Blog() {
  const [articles, setArticles] = useState([]);
  const [visibleBlogs, setVisibleBlogs] = useState(8);
  const [selectedTag, setSelectedTag] = useState('');
  const navigate = useNavigate();

  const navItems = ['Home', 'Blog'];

  useEffect(() => {
    getAllArticles()
      .then(data => {
        setArticles(data);
      })
      .catch(error => {
        console.error('Error fetching articles:', error);
      });
  }, []);

  const handleReadMore = (articleID) => {
    navigate('/blog-detail', { state: { articleID } });
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    setVisibleBlogs(8);
  };

  const firstThreeArticles = articles.slice(0, 3);
  const filteredArticles = selectedTag
    ? articles.filter(article => article.tag === selectedTag)
    : articles.slice(0, visibleBlogs);

  const handleSeeMore = () => {
    setVisibleBlogs(visibleBlogs + 8);
  };

  const openInstagram = () => {
    window.open('https://www.instagram.com/dian_jewelryy', '_blank');
  };

  return (
    <div className="Blog">
      <SubNav items={navItems} />

      <div className="blog_main_container row">
        <div className='blog_logo'>
          <img src={blogLogo} alt="Blog Logo"></img>
        </div>

        <div className='blog_popular_title'>
          <h4>Popular Education Blogs</h4>
        </div>

        {firstThreeArticles.map(article => (
          <div key={article.articleID} className="col-md-4 mb-4">
            <div className="blog_card card">
              <img src={article.image} alt={article.title} className="blog_image card-img-top" />
              <div className="blog_card_body card-body">
                <h6 className="blog_title card-title">{article.title}</h6>
                <div className='blog_card_button'>
                  <button
                    className="blog_read_more btn btn-link"
                    onClick={() => handleReadMore(article.articleID)}
                  >
                    Read more <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='blog_jjdo'>
        <p>edit later</p>
      </div>

      <div className="blog_nav_bar_container">
        <div className="blog_nav_item" onClick={() => handleTagClick('')}>
          <i className="fas fa-list"></i>
          <span>All</span>
        </div>
        <div className="blog_nav_item" onClick={() => handleTagClick('News')}>
          <i className="fas fa-newspaper"></i>
          <span>News</span>
        </div>
        <div className="blog_nav_item" onClick={() => handleTagClick('About')}>
          <i className="fas fa-info-circle"></i>
          <span>About</span>
        </div>
        <div className="blog_nav_item" onClick={() => handleTagClick('Service')}>
          <i className="fas fa-concierge-bell"></i>
          <span>Service</span>
        </div>
        <div className="blog_nav_item" onClick={() => handleTagClick('Education')}>
          <i className="fas fa-graduation-cap"></i>
          <span>Education</span>
        </div>
        <div className="blog_nav_item" onClick={() => handleTagClick('Blog')}>
          <i className="fas fa-blog"></i>
          <span>Blog</span>
        </div>
        <div className="blog_nav_search">
          <input type="text" placeholder="Search blog..." />
          <i className="fas fa-search"></i>
        </div>
      </div>

      <div className="remaining_blogs_container row">
        {filteredArticles.map(article => (
          <div key={article.articleID} className="col-md-3 mb-4">
            <div className="small_blog_card card">
              <img src={article.image} alt={article.title} className="small_blog_image card-img-top" />
              <div className="small_blog_card_body card-body">
                <h6 className="small_blog_title card-title">{article.title}</h6>
                <div className='small_blog_card_button'>
                  <button
                    className="small_blog_read_more btn btn-link"
                    onClick={() => handleReadMore(article.articleID)}
                  >
                    Read more <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedTag === '' && visibleBlogs < articles.length && (
        <div className="blog_see_more_container">
          <button className="blog_see_more_button" onClick={handleSeeMore}>See More</button>
        </div>
      )}

      <div className="blog_mission_container">
        <div className="blog_mission_text">forever forward</div>
        <div className="blog_mission_white">                            </div>
        <div className="row">
          <div className="col-md-6">
            <img src={missionImage} alt="Mission" className="blog_mission_image" />
          </div>
          <div className="col-md-6 blog_mission_right">
            <h2 className="blog_mission_title">Our Mission</h2>
            <p className="blog_mission_subtitle">We are passionate about cultivating a more transparent, sustainable, and compassionate jewelry industry for the world.</p>
            <div className="row blog_mission_features">
              <div className="blog_mission_icon_wrap col-md-4 text-center">
                <img src={conflictFreeIcon} alt="Conflict Free" className="blog_mission_icon" />
                <p className="blog_mission_feature_text">Beyond<br></br> Conflict Free</p>
              </div>
              <div className="blog_mission_icon_wrap col-md-4 text-center">
                <img src={recycledMetalsIcon} alt="Recycled Metals" className="blog_mission_icon" />
                <p className="blog_mission_feature_text">Recycled<br></br> Precious Metals</p>
              </div>
              <div className="blog_mission_icon_wrap col-md-4 text-center">
                <img src={givingBackIcon} alt="Giving Back" className="blog_mission_icon" />
                <p className="blog_mission_feature_text">Giving<br></br> Back</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="blog_inspired_container">
        <div className="row">
          <div className='blog_inspired_title'>
            <h4>Get Inspired</h4>
            <p>Tag us on instagram @dianjewelry</p>
          </div>
          <div className="blog_inspired_grid">
            <div className="col-md-2 blog_inspired_column">
              <div className="blog_inspired_image" onClick={openInstagram}>
                <img src={missionImage} alt="Inspired 1" />
                <i className="fab fa-instagram inspired_icon"></i>
              </div>
            </div>
            <div className="col-md-2 blog_inspired_column">
              <div className="blog_inspired_image" onClick={openInstagram}>
                <img src={missionImage} alt="Inspired 2" />
                <i className="fab fa-instagram inspired_icon"></i>
              </div>
            </div>
            <div className="col-md-2 blog_inspired_column">
              <div className="blog_inspired_image" onClick={openInstagram}>
                <img src={missionImage} alt="Inspired 3" />
                <i className="fab fa-instagram inspired_icon"></i>
              </div>
            </div>
            <div className="col-md-2 blog_inspired_column">
              <div className="blog_inspired_image" onClick={openInstagram}>
                <img src={missionImage} alt="Inspired 4" />
                <i className="fab fa-instagram inspired_icon"></i>
              </div>
            </div>
            <div className="col-md-2 blog_inspired_column">
              <div className="blog_inspired_image" onClick={openInstagram}>
                <img src={missionImage} alt="Inspired 5" />
                <i className="fab fa-instagram inspired_icon"></i>
              </div>
            </div>
            <div className="col-md-2 blog_inspired_column">
              <div className="blog_inspired_image" onClick={openInstagram}>
                <img src={missionImage} alt="Inspired 6" />
                <i className="fab fa-instagram inspired_icon"></i>
              </div>
            </div>
          </div>
          <div className="instagram_circle" onClick={openInstagram}>
            <i className="fab fa-instagram"></i>
          </div>
        </div>
      </div>


      <ScrollToTop />
    </div>
  );
}

export default Blog;
