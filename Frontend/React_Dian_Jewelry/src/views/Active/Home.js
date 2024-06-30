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
import CollectionSlide from '../../components/CollectionSlide/CollectionSlide';
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
import slide3 from '../../assets/img/slide1.jpg';
import slide2 from '../../assets/img/slide2.png';
import slide1 from '../../assets/img/slide3.webp';
import slide3Small from '../../assets/img/slide3Small.webp';
import slide2Small from '../../assets/img/slide2Small.webp';
import slide1Small from '../../assets/img/slide1Small.jpg';
import sliderBackground from '../../assets/img/homeBackground.png';
import bb from '../../assets/img/bb.png';
import trending from '../../assets/img/trending.png';
import { getNewestProducts, getTopSellingProducts, getNewestCollections } from '../../services/ProductService.js';

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
  const [activeTab, setActiveTab] = useState('newArrivals');
  const [displayProducts, setDisplayProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [newestCollection, setNewestCollection] = useState(null);

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
    getNewestProducts().then(response => {
      const productsWithOriginalPrice = response.data.map(product => ({
        ...product,
        originalPrice: product.price + 100
      }));
      setNewProducts(productsWithOriginalPrice);
      setDisplayProducts(productsWithOriginalPrice);
    }).catch(error => {
      console.error('Error fetching newest products:', error);
    });

    getTopSellingProducts().then(response => {
      const productsWithOriginalPrice = response.data.map(product => ({
        ...product,
        originalPrice: product.price + 100
      }));
      setTopSellingProducts(productsWithOriginalPrice);
      setTrendingProducts(productsWithOriginalPrice.slice(-2));
    }).catch(error => {
      console.error('Error fetching top selling products:', error);
    });

    getNewestCollections().then(response => {
      const newestCollection = response.data;
      setNewestCollection(newestCollection);
    }).catch(error => {
      console.error('Error fetching newest collections:', error);
    });
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'newArrivals') {
      setDisplayProducts(newProducts);
    } else {
      setDisplayProducts(topSellingProducts);
    }
  };

  const getNavLinkClass = (tab) => {
    return tab === activeTab ? 'home_feature_navlink active-tab' : 'home_feature_navlink';
  };

  const handleProductClick = (product) => {
    const productName = product.name.replace(/\s+/g, '-').toLowerCase();
    navigate(`/product-detail/${productName}`, { state: { id: product.productId } });
  };

  const handleCollectionClick = () => {
    const collectionName = newestCollection.name.replace(/\s+/g, '-').toLowerCase();
    navigate(`/collection/${collectionName}`, { state: { collectionId: newestCollection.collectionId } });
  };

  return (
    <div className="Home">
      <HeaderComponent />
      
      {/* Slider */}
      <div className="slider-container">
        <Slider {...settings}>
          <div className="slide">
            <div className="slide-background">
              <img src={sliderBackground} alt="Background" />
            </div>
            <div className="slide-content">
              <img className="slide-img left-img" src={slide1} alt="Slide 1" />
              <h1>DIAMOND <br></br>RINGS</h1>
              <div className="slide-right-section">
                <p className="slide-text right-text">C  L  A  S  S  I  C     J  E  W  E  L  R  Y</p>
                <div className="slide-small-image">
                  <img src={slide1Small} alt="Small Slide 1" />
                  <button onClick={() => handleNavigate('/diamond-jewelry', { category: 'ring' })} className="slide-button">SHOP THIS CATEGORY</button>
                </div>
              </div>
            </div>
          </div>
          <div className="slide">
            <div className="slide-background">
              <img src={sliderBackground} alt="Slide 2" />
              <h1>NEW  <br></br>ARRIVAL</h1>
            </div>
            <div className="slide-content">
              <img className="slide-img left-img" src={slide2} alt="Slide 2" />
              <div className="slide-right-section">
                <p className="slide-text right-text">C  L  A  S  S  I  C     J  E  W  E  L  R  Y</p>
                <div className="slide-small-image">
                  <img src={slide2Small} alt="Small Slide 2" />
                  {newestCollection && (
                    <button onClick={handleCollectionClick} className="slide-button">SHOP THIS COLLECTION</button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="slide">
            <div className="slide-background">
              <img src={sliderBackground} alt="Slide 3" />
              <h1>ENGAGEMENT <br></br>RINGS</h1>
            </div>
            <div className="slide-content">
              <img className="slide-img left-img" src={slide3} alt="Slide 3" />
              <div className="slide-right-section">
                <p className="slide-text right-text">C  L  A  S  S  I   C     J  E  W  E  L  R  Y</p>
                <div className="slide-small-image">
                  <img src={slide3Small} alt="Small Slide 3" />
                  <button onClick={() => handleNavigate('/diamond-jewelry', { category: 'engagementRing' })} className="slide-button">SHOP THIS CATEGORY</button>
                </div>
              </div>
            </div>
          </div>
        </Slider>
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
            <a onClick={() => handleNavigate('/shape', { shape: 'Round' })}>
              <img src={round} alt="Round" className="diamond_shape_image" />
              <p className="diamond_shape_name">Round</p>
            </a>
          </div>
          <div className="diamond_shape_column">
            <a onClick={() => handleNavigate('/shape', { shape: 'Oval' })}>
              <img src={oval} alt="Oval" className="diamond_shape_image" />
              <p className="diamond_shape_name">Oval</p>
            </a>
          </div>
          <div className="diamond_shape_column">
            <a onClick={() => handleNavigate('/shape', { shape: 'Emerald' })}>
              <img src={emerald} alt="Emerald" className="diamond_shape_image" />
              <p className="diamond_shape_name">Emerald</p>
            </a>
          </div>
          <div className="diamond_shape_column">
            <a onClick={() => handleNavigate('/shape', { shape: 'Cushion' })}>
              <img src={cushion} alt="Cushion" className="diamond_shape_image" />
              <p className="diamond_shape_name">Cushion</p>
            </a>
          </div>
          <div className="diamond_shape_column">
            <a onClick={() => handleNavigate('/shape', { shape: 'Pear' })}>
              <img src={pear} alt="Pear" className="diamond_shape_image" />
              <p className="diamond_shape_name">Pear</p>
            </a>
          </div>
          <div className="diamond_shape_column">
            <a onClick={() => handleNavigate('/shape', { shape: 'Radiant' })}>
              <img src={radiant} alt="Radiant" className="diamond_shape_image" />
              <p className="diamond_shape_name">Radiant</p>
            </a>
          </div>
          <div className="diamond_shape_column">
            <a onClick={() => handleNavigate('/shape', { shape: 'Princess' })}>
              <img src={princess} alt="Princess" className="diamond_shape_image" />
              <p className="diamond_shape_name">Princess</p>
            </a>
          </div>
          <div className="diamond_shape_column">
            <a onClick={() => handleNavigate('/shape', { shape: 'Marquise' })}>
              <img src={marquise} alt="Marquise" className="diamond_shape_image" />
              <p className="diamond_shape_name">Marquise</p>
            </a>
          </div>
          <div className="diamond_shape_column">
            <a onClick={() => handleNavigate('/shape', { shape: 'Asscher' })}>
              <img src={asscher} alt="Asscher" className="diamond_shape_image" />
              <p className="diamond_shape_name">Asscher</p>
            </a>
          </div>
          <div className="diamond_shape_column">
            <a onClick={() => handleNavigate('/shape', { shape: 'Heart' })}>
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
                      <span onClick={() => handleNavigate('/diamond-jewelry', { category: 'earrings' })} className="category_view_collection">VIEW CATEGORY</span>
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
                      <span onClick={() => handleNavigate('/diamond-jewelry', { category: 'ring' })} className="category_view_collection_small">VIEW CATEGORY</span>
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
                      <span onClick={() => handleNavigate('/diamond-jewelry', { category: 'bracelet' })} className="category_view_collection_small">VIEW CATEGORY</span>
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
                      <span onClick={() => handleNavigate('/diamond-jewelry', { category: 'necklace' })} className="category_view_collection">VIEW CATEGORY</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CollectionSlide />

      {/* Best & Beloved */}
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

      {/* Trending */}
      <div className="trending_container">
        <div className="trending_text">trendy collection</div>
        <div className="trending_white">                                 </div>
        <div className="row">
          <div className="col-lg-5 col-md-6 ">
            <img src={trending} alt="Trending" className="trending_image" />
          </div>
          <div className="col-lg-7 col-md-6 trending_right">
            <h2 className="trending_title">Trending Jewelry</h2>
            <div className="trending_product_card_section row">
              {trendingProducts.map((product, index) => (
                <div key={index} className="trending_product_card card" onClick={() => handleProductClick(product)}>
                  <img src={product.imageLinkList} alt={product.name} className="product_image" />
                  <p className="trending_product_name">{product.name}</p>
                  <p className="trending_product_price"><del>{product.originalPrice}$</del>    {product.price}$</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Feature */}
      <div className='home_feature_container_wrapper'>
        <div className="home_feature_container container">
          <div className="home_feature_navbar">
            <button
              className={getNavLinkClass('newArrivals')}
              onClick={() => handleTabClick('newArrivals')}
            >
              New arrivals
            </button>
            <button
              className={getNavLinkClass('bestSellers')}
              onClick={() => handleTabClick('bestSellers')}
            >
              Best sellers
            </button>
          </div>

          <div className="row">
            {displayProducts.map((product) => (
              <div key={product.productId} className="col-md-3">
                <div className="home_feature_product_card" onClick={() => handleProductClick(product)}>
                  <div className="home_feature_product_icon_wrapper" data-tooltip="View detail">
                    <i className="far fa-eye home_feature_product_icon_eye" ></i>
                  </div>
                  <img src={product.imageLinkList} alt={product.name} className="home_feature_product_image" />
                  <p className='home_feature_product_detail'>{product.clarity} | {product.carat} | {product.color}</p>
                  <p className="home_feature_product_name">{product.name}</p>
                  <p className="home_feature_product_price">{product.price}$</p>
                </div>
              </div>
            ))}
          </div>
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
