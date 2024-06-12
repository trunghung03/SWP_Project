import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import swal from 'sweetalert';
import '../../styles/Active/Blog.scss';
import SubNav from '../../components/SubNav/SubNav.js';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';
import BlogInspired from '../../components/BlogInspired/BlogInspired.js';
import { getAllArticles, searchArticlesByTitle } from '../../services/BlogService.js';
import blogLogo from '../../assets/img/blogLogo.png';
import missionImage from '../../assets/img/blogMission.png';
import conflictFreeIcon from '../../assets/img/blog1.svg';
import recycledMetalsIcon from '../../assets/img/blog2.svg';
import givingBackIcon from '../../assets/img/blog3.svg';

function Blog() {
  const [articles, setArticles] = useState([]);
  const [visibleBlogs, setVisibleBlogs] = useState(8);
  const [selectedTag, setSelectedTag] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => {
      const missionText = document.querySelector('.blog_mission_text');
      if (missionText) {
        const scrollPosition = window.scrollY;
        missionText.style.transform = `translateX(${-scrollPosition * 0.1}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleReadMore = (articleID) => {
    navigate('/blog-detail', { state: { articleID } });
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    setVisibleBlogs(8);
    setSearchActive(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchKeyPress = (event) => {
    if (event.key === 'Enter') {
      const validSearchTerm = /^[a-zA-Z\s]*$/.test(searchTerm);
      if (!validSearchTerm) {
        swal('No blogs found!', 'Please try another title.', 'error');
      } else {
        if (searchTerm.trim() === '') {
          getAllArticles()
            .then(data => {
              setArticles(data);
              setSearchActive(false);
              setSelectedTag('');
            })
            .catch(error => {
              console.error('Error fetching articles:', error);
            });
        } else {
          searchArticlesByTitle(searchTerm)
            .then(data => {
              if (data.length === 0) {
                swal('No blogs found!', 'Please try another title.', 'error');
              } else {
                setSearchResults(data);
                setSearchActive(true);
                setSearchTerm('');
              }
            })
            .catch(error => {
              console.error('Error searching articles:', error);
            });
        }
      }
    }
  };

  const firstThreeArticles = articles.slice(0, 3);
  const filteredArticles = searchActive
    ? searchResults.slice(0, visibleBlogs)
    : selectedTag
      ? articles.filter(article => article.tag === selectedTag).slice(0, visibleBlogs)
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
              </div>
              <div className='blog_read_this_button_container'>
                <button
                  className="blog_read_this_button"
                  onClick={() => handleReadMore(article.articleID)}
                >
                  Read more
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="blog_recycle_container">
        <div className="row">
          <div className="col-md-3 blog_recycle_column">
            <h4 className="blog_recycle_title">RECYCLED METALS</h4>
            <p>Today, 96% of our gold and 97% of our silver is recycled. By 2025, 100% will be recycled or Fairmined.</p>
          </div>
          <div className="col-md-3 blog_recycle_column">
            <h4 className="blog_recycle_title">CIRCULARITY</h4>
            <p>Recycled materials. Timeless designs. Lifetime warranties. And trade-in programs that give your jewelry new life.</p>
          </div>
          <div className="col-md-3 blog_recycle_column">
            <h4 className="blog_recycle_title">ZERO WASTE</h4>
            <p>No single-use plastics by 2025. Zero waste in showrooms and offices by 2030.</p>
          </div>
          <div className="col-md-3 blog_recycle_column">
            <h4 className="blog_recycle_title">EMISSION REDUCTIONS</h4>
            <p>We have committed to setting near-term company-wide emission reductions.</p>
          </div>
        </div>
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
          <input
            type="text"
            placeholder="Search blog..."
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyPress={handleSearchKeyPress}
          />
          <i className="fas fa-search"></i>
        </div>
      </div>

      <div className="remaining_blogs_container row">
        {filteredArticles.length > 0 ? (
          filteredArticles.map(article => (
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
          ))
        ) : (
          <div className="no_blogs_found col-12">
            <p>No blogs found..</p>
          </div>
        )}
      </div>

      {(selectedTag === '' && visibleBlogs < articles.length && !searchActive) ||
        (selectedTag !== '' && visibleBlogs < articles.filter(article => article.tag === selectedTag).length) ||
        (searchActive && visibleBlogs < searchResults.length) ? (
        <div className="blog_see_more_container">
          <button className="blog_see_more_button" onClick={handleSeeMore}>View More</button>
        </div>
      ) : null}

      <div className="blog_mission_container">
        <div className="blog_mission_text">jewelry redefined</div>
        <div className="blog_mission_white">                                 </div>
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

      <BlogInspired openInstagram={openInstagram} />

      <ScrollToTop />
    </div>
  );
}

export default Blog;
