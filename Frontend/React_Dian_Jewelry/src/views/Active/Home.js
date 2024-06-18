import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';
import Reason from '../../components/Reason/Reason.js';
import HeaderComponent from '../../components/Header/HeaderComponent';
import FooterComponent from '../../components/Footer/FooterComponent';
import '../../styles/Active/Home.scss';
import brilliant1 from '../../assets/img/brilliant1.png';
import brilliant2 from '../../assets/img/brilliant2.png';
import brilliant3 from '../../assets/img/brilliant3.png';
import brilliant4 from '../../assets/img/brilliant4.png';
import ringC from '../../assets/img/homeRingC.jpg';
import earringC from '../../assets/img/homeEarringsC.jpg';
import braceletC from '../../assets/img/homeBraceletC.jpg';
import necklaceC from '../../assets/img/homeNecklaceC.jpg';
import round from '../../assets/img/round.png';
import oval from '../../assets/img/oval.png';
import emerald from '../../assets/img/emerald.png';
import cushion from '../../assets/img/cushion.png';
import pear from '../../assets/img/pear.png';
import radiant from '../../assets/img/radiant.png';
import princess from '../../assets/img/princess.png';
import marquise from '../../assets/img/marquise.png';
import asscher from '../../assets/img/asscher.png';
import heart from '../../assets/img/heart.png';
import slide3 from '../../assets/img/slide1.png';
import slide2 from '../../assets/img/slide2.png';
import slide1 from '../../assets/img/slide3.png';
import ringCategory from '../../assets/img/ringCategory.jpg';
import wRingCategory from '../../assets/img/wRingCategory.jpg';
import engagementCategory from '../../assets/img/engagementCategory.jpg';
import earringCategory from '../../assets/img/earringCategory.webp';
import wEarringCategory from '../../assets/img/wEarringCategory.jpg';
import braceletCategory from '../../assets/img/braceletCategory.webp';
import wBraceletCategory from '../../assets/img/wBraceletCategory.jpg';
import necklaceCategory from '../../assets/img/necklaceCategory.jpg';
import wNecklaceCategory from '../../assets/img/wNecklaceCategory.jpg';
import impression from '../../assets/img/impression.png';
import proposal from '../../assets/img/proposal.png';
import bb from '../../assets/img/bb.png';
import trending from '../../assets/img/trending.png';
import conflictFreeIcon from '../../assets/img/blog1.svg';
import recycledMetalsIcon from '../../assets/img/blog2.svg';
import givingBackIcon from '../../assets/img/blog3.svg';

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "transparent", zIndex: 25, marginRight: '50px' }}
      onClick={(e) => {
        onClick(e);
        props.restartAnimation();
      }}
    >
      <i className="fas fa-chevron-right" style={{ color: 'white', fontSize: '30px' }}></i>
    </div>
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "transparent", zIndex: 25, marginLeft: '50px' }}
      onClick={(e) => {
        onClick(e);
        props.restartAnimation();
      }}
    >
      <i className="fas fa-chevron-left" style={{ color: 'white', fontSize: '30px' }}></i>
    </div>
  );
}

const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animate, setAnimate] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    nextArrow: <NextArrow restartAnimation={() => setAnimate(false)} />,
    prevArrow: <PrevArrow restartAnimation={() => setAnimate(false)} />,
    beforeChange: (current, next) => {
      setAnimate(false);
      setCurrentSlide(next);
    },
    afterChange: () => {
      setTimeout(() => setAnimate(true), 0);
    }
  };

  const handleNavigate = (path, state) => {
    navigate(path, { state });
  };

  const cardData = [
    { name: "Ring", img: ringCategory, category: 'ring' },
    { name: "Earrings", img: earringCategory, category: 'earrings' },
    { name: "Bracelet", img: braceletCategory, category: 'bracelet' },
    { name: "Wedding Ring", img: wRingCategory, category: 'weddingRing' },
    { name: "Necklace", img: necklaceCategory, category: 'necklace' },
    { name: "Wedding Earrings", img: wEarringCategory, category: 'weddingEarrings' },
    { name: "Wedding Bracelet", img: wBraceletCategory, category: 'weddingBracelet' },
    { name: "Wedding Necklace", img: wNecklaceCategory, category: 'weddingNecklace' },
    { name: "Engagement Ring", img: engagementCategory, category: 'engagementRing' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const missionText = document.querySelector('.trending_text');
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

  useEffect(() => {
    const wrapper = document.querySelector(".wrapper");
    const carousel = document.querySelector(".carousel");
    const arrowBtns = document.querySelectorAll(".nav_arrow");
    let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

    arrowBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const direction = btn.id === "left" ? -1 : 1;
        const firstCardWidth = carousel.querySelector(".card").offsetWidth;
        const scrollAmount = firstCardWidth;
        carousel.scrollBy({
          left: direction * scrollAmount,
          behavior: 'smooth'
        });
      });
    });

    const dragStart = (e) => {
      isDragging = true;
      carousel.classList.add("dragging");
      startX = e.pageX;
      startScrollLeft = carousel.scrollLeft;
    };

    const dragging = (e) => {
      if (!isDragging) return;
      carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    };

    const dragStop = () => {
      isDragging = false;
      carousel.classList.remove("dragging");
    };

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);

    return () => {
      carousel.removeEventListener("mousedown", dragStart);
      carousel.removeEventListener("mousemove", dragging);
      document.removeEventListener("mouseup", dragStop);
    };
  }, []);

  return (
    <div className="Home">
      <HeaderComponent />
      {/* Slider */}
      <div className="slider-container">
        <Slider {...settings}>
          <div className="slide">
            <img src={slide1} alt="Slide 1" />
            {/* <div className={`slide-content ${animate ? 'animate-text' : ''}`}>
              <h2 className="slide-title">TO LOVE AND CHERISH</h2>
              <p className="slide-text"> Make it unforgettable with the beautiful pieces that’ll always be adored.</p>
            </div> */}
          </div>
          <div className="slide">
            <img src={slide2} alt="Slide 2" />
          </div>
          <div className="slide">
            <img src={slide3} alt="Slide 3" />
          </div>
        </Slider>
        {/* <div className="dot-container">
          {[0, 1, 2].map((_, index) => (
            <span key={index} className={`dot ${index === currentSlide ? 'active' : ''}`} onClick={() => setCurrentSlide(index)}></span>
          ))}
        </div> */}
      </div>

      {/* Under slider  */}
      <div className="under_slider_container">
        <div className="under_slider_column">
          <i className="fas fa-shipping-fast under_slider_icon"></i>
          <div className="under_slider_text_container">
            <h4 className="under_slider_title">Free shipping</h4>
            <p className="under_slider_text">For all orders</p>
          </div>
        </div>
        <div className="under_slider_column">
          <i className="fa fa-headset under_slider_icon"></i>
          <div className="under_slider_text_container">
            <h4 className="under_slider_title">Hotline support</h4>
            <p className="under_slider_text">Customer service</p>
          </div>
        </div>
        <div className="under_slider_column">
          <i className="fa fa-undo-alt under_slider_icon"></i>
          <div className="under_slider_text_container">
            <h4 className="under_slider_title">Better warranty</h4>
            <p className="under_slider_text">If jewelry have problems</p>
          </div>
        </div>
        <div className="under_slider_column">
          <i className="far fa-credit-card under_slider_icon"></i>
          <div className="under_slider_text_container">
            <h4 className="under_slider_title">Secure payment</h4>
            <p className="under_slider_text">100% secure payment</p>
          </div>
        </div>
      </div>
      <hr className="under_slider_hr" />

      {/* Diamond shape  */}
      <h1 className="shape_title">Explore Diamond Shapes</h1>
      <div className="diamond_shape_container">
        <div className="diamond_shape_grid">
          <div className="diamond_shape_column">
            <a href="" onClick={() => handleNavigate('/shape', { shape: 'Round' })}>
              <img src={round} alt="Round" className="diamond_shape_image" />
              <p className="diamond_shape_name">Round</p>
            </a>
          </div>
          <div className="diamond_shape_column">
            <a href="" onClick={() => handleNavigate('/shape', { shape: 'Oval' })}>
              <img src={oval} alt="Oval" className="diamond_shape_image" />
              <p className="diamond_shape_name">Oval</p>
            </a>
          </div>
          <div className="diamond_shape_column">
            <a href="" onClick={() => handleNavigate('/shape', { shape: 'Emerald' })}>
              <img src={emerald} alt="Emerald" className="diamond_shape_image" />
              <p className="diamond_shape_name">Emerald</p>
            </a>
          </div>
          <div className="diamond_shape_column">
            <a href="" onClick={() => handleNavigate('/shape', { shape: 'Cushion' })}>
              <img src={cushion} alt="Cushion" className="diamond_shape_image" />
              <p className="diamond_shape_name">Cushion</p>
            </a>
          </div>
          <div className="diamond_shape_column">
            <a href="" onClick={() => handleNavigate('/shape', { shape: 'Pear' })}>
              <img src={pear} alt="Pear" className="diamond_shape_image" />
              <p className="diamond_shape_name">Pear</p>
            </a>
          </div>
          <div className="diamond_shape_column">
            <a href="" onClick={() => handleNavigate('/shape', { shape: 'Radiant' })}>
              <img src={radiant} alt="Radiant" className="diamond_shape_image" />
              <p className="diamond_shape_name">Radiant</p>
            </a>
          </div>
          <div className="diamond_shape_column">
            <a href="" onClick={() => handleNavigate('/shape', { shape: 'Princess' })}>
              <img src={princess} alt="Princess" className="diamond_shape_image" />
              <p className="diamond_shape_name">Princess</p>
            </a>
          </div>
          <div className="diamond_shape_column">
            <a href="" onClick={() => handleNavigate('/shape', { shape: 'Marquise' })}>
              <img src={marquise} alt="Marquise" className="diamond_shape_image" />
              <p className="diamond_shape_name">Marquise</p>
            </a>
          </div>
          <div className="diamond_shape_column">
            <a href="" onClick={() => handleNavigate('/shape', { shape: 'Asscher' })}>
              <img src={asscher} alt="Asscher" className="diamond_shape_image" />
              <p className="diamond_shape_name">Asscher</p>
            </a>
          </div>
          <div className="diamond_shape_column">
            <a href="" onClick={() => handleNavigate('/shape', { shape: 'Heart' })}>
              <img src={heart} alt="Heart" className="diamond_shape_image" />
              <p className="diamond_shape_name">Heart</p>
            </a>
          </div>
        </div>
      </div>

      {/* Category */}
      <div className="category_container text-center">
        <h1 className="category_title">Shop By Categories</h1>
        <p className="category_description">Explore our exclusive categories and find the perfect piece of jewelry that suits your style and preference. We have something special for every occasion here.</p>
        <div className="category_grid container">
          <div className="row">
            <div className="category_large col-md-4">
              <div className="category_item_large">
                <div className="category_image_wrapper_large">
                  <img src={earringC} alt="Earrings" />
                  <p className="category_name_large">Earrings</p>
                  <div className="category_hover_content">
                    <p className="category_name_large_hover">Earrings</p>
                    <div className="category_hover_text">
                      <span className="category_large_letter">E</span>
                      <span onClick={() => handleNavigate('/diamond-jewelry', { category: 'earrings' })} className="category_view_collection">VIEW COLLECTION</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="category_small_container col-md-4">
              <div className="category_item_small">
                <div className="category_image_wrapper_small ciwm1">
                  <img src={ringC} alt="Ring" />
                  <p className="category_name_small">Ring</p>
                  <div className="category_hover_content_small">
                    <p className="category_name_small_hover">Ring</p>
                    <div className="category_hover_text_small">
                      <span className="category_large_letter_small">R</span>
                      <span onClick={() => handleNavigate('/diamond-jewelry', { category: 'ring' })} className="category_view_collection_small">VIEW COLLECTION</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="category_item_small">
                <div className="category_image_wrapper_small ciwm2">
                  <img src={braceletC} alt="Bracelet" />
                  <p className="category_name_small">Bracelet</p>
                  <div className="category_hover_content_small">
                    <p className="category_name_small_hover">Bracelet</p>
                    <div className="category_hover_text_small">
                      <span className="category_large_letter_small">B</span>
                      <span onClick={() => handleNavigate('/diamond-jewelry', { category: 'bracelet' })} className="category_view_collection_small">VIEW COLLECTION</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="category_large col-md-4">
              <div className="category_item_large">
                <div className="category_image_wrapper_large">
                  <img src={necklaceC} alt="Necklace" />
                  <p className="category_name_large">Necklace</p>
                  <div className="category_hover_content">
                    <p className="category_name_large_hover">Necklace</p>
                    <div className="category_hover_text">
                      <span className="category_large_letter">N</span>
                      <span onClick={() => handleNavigate('/diamond-jewelry', { category: 'necklace' })} className="category_view_collection">VIEW COLLECTION</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Collection  */}
      <div className="featured_jewelry_container">
        <div className="left_section">
          <h1 className="featured_title">Our Collections</h1>
          <p className="featured_description">View our outstanding jewelry collections, where artistry meets
            timeless elegance. Each piece of jewelry is exquisitely crafted, bringing the splendor and class.</p>
          <button onClick={() => handleNavigate('/diamondJewelry')} className="shop_now_btn" >Shop now</button>
          <i id="left" className="fa-solid fa-angle-left nav_arrow left_arrow" role="button"></i>
          <i id="right" className="fa-solid fa-angle-right nav_arrow right_arrow" role="button"></i>
        </div>
        <div className="right_section wrapper">
          <ul className="carousel">
            {cardData.map((card, index) => (
              <li key={index} className="home_product_card card" onClick={() => handleNavigate('/diamond-jewelry', { category: card.category })}>
                <img src={card.img} alt={card.name} className="home_product_image" />
                <p className="home_product_name">{card.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Trending */}
      <div className="trending_container">
        <div className="trending_text">trendy collection</div>
        <div className="trending_white">                                 </div>
        <div className="row">
          <div className="col-md-4">
            <img src={trending} alt="Trending" className="trending_image" />
          </div>
          <div className="col-md-8 trending_right">
            <h2 className="trending_title">Our Mission</h2>
            <p className="trending_subtitle">We are passionate about cultivating a more transparent, sustainable, and compassionate jewelry industry for the world.</p>
            <div className="row trending_features">
              <div className="trending_icon_wrap col-md-2 text-center">
                <img src={conflictFreeIcon} alt="Conflict Free" className="trending_icon" />
                <p className="trending_feature_text">Beyond<br></br> Conflict Free</p>
              </div>
              <div className="trending_icon_wrap col-md-2 text-center">
                <img src={recycledMetalsIcon} alt="Recycled Metals" className="trending_icon" />
                <p className="trending_feature_text">Recycled<br></br> Precious Metals</p>
              </div>
              <div className="trending_icon_wrap col-md-2 text-center">
                <img src={givingBackIcon} alt="Giving Back" className="trending_icon" />
                <p className="trending_feature_text">Giving<br></br> Back</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Best & Belove */}
      <div className="bb_container">
        <img src={bb} alt="Best & Beloved" className="bb_image" />
        <div className="bb_content">
          <div className="bb_text">
            <h2 className="bb_title">Best & Beloved</h2>
            <p className="bb_description">Our most coveted engagement rings, as chosen by you.</p>
          </div>
          <button onClick={() => handleNavigate('/diamond-jewelry', { category: 'engagementRing' })} className="bb_shop_now_button">Shop now</button>
        </div>
      </div>

      {/* Impression */}
      <div className="impression_container">
        <img src={impression} alt="Make An Impression" className="impression_image" />
        <div className="impression_content">
          <h2 className="impression_title">Make An Impression</h2>
          <p className="impression_description">The best jewelry embraces extravagance. Discover truly remarkable, one-of-a-kind pieces that are sure to leave them speechless.</p>
          <button onClick={() => handleNavigate('/collection', { collection: 'majesticMystique' })} className="impression_shop_now_button">SHOP MAJESTIC MYSTIQUE COLLECTION</button>
        </div>
      </div>

      {/* Proposal */}
      <div className="proposal_container">
        <img src={proposal} alt="An Unforgettable Proposal" className="proposal_image" />
        <div className="proposal_content">
          <h2 className="proposal_title">An Unforgettable Proposal</h2>
          <p className="proposal_description">Glamourous details and matching bands—we have the perfect rings to seal the deal.</p>
          <button onClick={() => handleNavigate('/collection', { collection: 'vintageVirtue' })} className="proposal_shop_now_button">SHOP VINTAGE VIRTUE COLLECTION</button>
        </div>
      </div>

      {/* Reason */}
      <Reason></Reason>

      {/* Brilliant */}
      <div className="brilliant_container">
        <h2 className="brilliant_title">Be Part Of Something Brilliant</h2>
        <p className="brilliant_description">
          Follow us on Instagram for gorgeous engagement rings and wedding bands, real life proposals, and dreamy wedding day inspiration. Be sure to tag us in your beautiful jewelry models or daily life with jewelry pictures and tag <a href="https://www.instagram.com/dian_jewelryy" target="_blank" rel="noopener noreferrer">@dianjewelry</a> for a chance to be featured on our website.
        </p>
        <div className="brilliant_grid">
          <div className="brilliant_column">
            <div className="brilliant_image_large" onClick={() => window.open('https://www.instagram.com/dian_jewelryy', '_blank')}>
              <img src={brilliant1} alt="Image 1" />
              <i className="fab fa-instagram brilliant_icon"></i>
            </div>
          </div>
          <div className="brilliant_column">
            <div className="brilliant_image_small" onClick={() => window.open('https://www.instagram.com/dian_jewelryy', '_blank')}>
              <img src={brilliant2} alt="Image 2" />
              <i className="fab fa-instagram brilliant_icon"></i>
            </div>
            <div className="brilliant_image_small" onClick={() => window.open('https://www.instagram.com/dian_jewelryy', '_blank')}>
              <img src={brilliant3} alt="Image 3" />
              <i className="fab fa-instagram brilliant_icon"></i>
            </div>
          </div>
          <div className="brilliant_column">
            <div className="brilliant_image_large" onClick={() => window.open('https://www.instagram.com/dian_jewelryy', '_blank')}>
              <img src={brilliant4} alt="Image 4" />
              <i className="fab fa-instagram brilliant_icon"></i>
            </div>
          </div>
        </div>
      </div>


      <ScrollToTop />
      <FooterComponent />
    </div>
  );
}

export default Home;
