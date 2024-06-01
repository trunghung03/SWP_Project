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
import '../../styles/Active/Home.scss';
import brilliant1 from '../../assets/img/brilliant1.png';
import brilliant2 from '../../assets/img/brilliant2.png';
import brilliant3 from '../../assets/img/brilliant3.png';
import brilliant4 from '../../assets/img/brilliant4.png';
import ring from '../../assets/img/ring.jpeg';
import earings from '../../assets/img/earrings.jpg';
import bracelet from '../../assets/img/bracelet.jpg';
import weddingRing from '../../assets/img/weddingRing.jpg';
import weddingEarings from '../../assets/img/weddingEarings.jpg';
import weddingBracelet from '../../assets/img/weddingBracelet.webp';
import diamond_shape from '../../assets/img/shape.png';
import slide1 from '../../assets/img/slide1.png';
import slide2 from '../../assets/img/slide2.png';
import slide3 from '../../assets/img/slide3.png';
import impression from '../../assets/img/impression.png';
import proposal from '../../assets/img/proposal.png';
import bb from '../../assets/img/bb.png';
import { getProductsByIds } from '../../services/ProductService';

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "transparent", zIndex: 25, marginRight: '50px' }}
      onClick={onClick}
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
      onClick={onClick}
    >
      <i className="fas fa-chevron-left" style={{ color: 'white', fontSize: '30px' }}></i>
    </div>
  );
}

const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productIds = [1, 2, 3, 4, 5, 6, 7, 8];
    getProductsByIds(productIds)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const navigateToProductDetail = (productId) => {
    navigate('/productDetail', { state: { id: productId } });
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setCurrentSlide(next)
  };

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

  const navigateToCategory = (category) => {
    navigate('/diamondJewelry', { state: { category } });
  };


  return (
    <div className="Home">
      {/* Slider */}
      <div className="slider-container">
        <Slider {...settings}>
          {[slide1, slide2, slide3].map((slide, index) => (
            <div key={index} className="slide">
              <img src={slide} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </Slider>
        <div className="dot-container">
          {[0, 1, 2].map((_, index) => (
            <span key={index} className={`dot ${index === currentSlide ? 'active' : ''}`} onClick={() => setCurrentSlide(index)}></span>
          ))}
        </div>
      </div>

      <div className="diamond_shape text-center">
        <img src={diamond_shape} alt="Diamond shape" />
      </div>

      {/* Feature jewelry  */}
      <div className="featured_jewelry_container">
        <div className="left_section">
          <h1 className="featured_title">Featured Jewelry</h1>
          <p className="featured_description">Explore our outstanding diamond rings collection, where artistry meets
            timeless elegance. Each piece of jewelry is exquisitely crafted, bringing the splendor and class.</p>
          <button onClick={() => navigate('/ring')} className="shop_now_btn" >Shop now</button>
          <i id="left" className="fa-solid fa-angle-left nav_arrow left_arrow" role="button"></i>
          <i id="right" className="fa-solid fa-angle-right nav_arrow right_arrow" role="button"></i>
        </div>
        <div className="right_section wrapper">
          <ul className="carousel">
            {products.map((product, index) => (
              <li key={index} className="home_product_card card" onClick={() => navigateToProductDetail(product.productId)}>
                <img src={product.imageLinkList} alt={product.name} className="home_product_image" />
                <p className="home_product_name">{product.name}</p>
                <p className="home_product_price">{product.price}$</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Collection  */}
      <div className="collections_container text-center">
        <h1 className="collections_title">OUR COLLECTIONS</h1>
        <div className="collections_grid">
          <div className="collection_column1">
            <div onClick={() => handleNavigate('/ring')} className="collection_item">
              <div className="collection_image_wrapper">
                <img src={ring} alt="Luxurious Lustre" />
                <p className="collection_name">Luxurious Lustre</p>
              </div>
            </div>
            <div onClick={() => handleNavigate('/bracelet')} className="collection_item">
              <div className="collection_image_wrapper">
                <img src={bracelet} alt="Radiant Reflections" />
                <p className="collection_name">Radiant Reflections</p>
              </div>
            </div>
          </div>
          <div className="collection_column2">
            <div onClick={() => handleNavigate('/weddingEarings')} className="collection_item">
              <div className="collection_image_wrapper">
                <img src={weddingEarings} alt="Majestic Mementos" />
                <p className="collection_name">Majestic Mementos</p>
              </div>
            </div>
            <div onClick={() => handleNavigate('/weddingBracelet')} className="collection_item">
              <div className="collection_image_wrapper">
                <img src={weddingBracelet} alt="Blissful Baubles" />
                <p className="collection_name">Blissful Baubles</p>
              </div>
            </div>
          </div>
          <div className="collection_column3">
            <div onClick={() => handleNavigate('/weddingRing')} className="collection_item">
              <div className="collection_image_wrapper">
                <img src={weddingRing} alt="Timeless Treasures" />
                <p className="collection_name">Timeless Treasures</p>
              </div>
            </div>
            <div onClick={() => handleNavigate('/earings')} className="collection_item">
              <div className="collection_image_wrapper">
                <img src={earings} alt="Divine Diamonds" />
                <p className="collection_name">Divine Diamonds</p>
              </div>
            </div>
          </div>
        </div>
        <button onClick={() => navigate('/diamondJewelry')} className="collection_shop_now_btn">Shop now</button>
      </div>

      {/* Best & Belove */}
      <div className="bb_container">
        <img src={bb} alt="Best & Beloved" className="bb_image" />
        <div className="bb_content">
          <div className="bb_text">
            <h2 className="bb_title">Best & Beloved</h2>
            <p className="bb_description">Our most coveted engagement rings, as chosen by you.</p>
          </div>
          <button onClick={() => navigateToCategory('engagementRing')} className="bb_shop_now_button">Shop now</button>
        </div>
      </div>

      {/* Impression */}
      <div className="impression_container">
        <img src={impression} alt="Make An Impression" className="impression_image" />
        <div className="impression_content">
          <h2 className="impression_title">Make An Impression</h2>
          <p className="impression_description">The best jewelry embraces extravagance. Discover truly remarkable, one-of-a-kind pieces that are sure to leave them speechless.</p>
          <button onClick={() => navigate('/bracelet')} className="impression_shop_now_button">SHOP THE BRACELET COLLECTION</button>
        </div>
      </div>

      {/* Proposal */}
      <div className="proposal_container">
        <img src={proposal} alt="An Unforgettable Proposal" className="proposal_image" />
        <div className="proposal_content">
          <h2 className="proposal_title">An Unforgettable Proposal</h2>
          <p className="proposal_description">Glamourous details and matching bands—we have the perfect rings to seal the deal.</p>
          <button onClick={() => navigateToCategory('engagementRing')} className="proposal_shop_now_button">SHOP THE ENGAGEMENT RINGS</button>
        </div>
      </div>

      {/* Reason */}
      <Reason></Reason>

      {/* Brilliant */}
      <div className="brilliant_container">
        <h2 className="brilliant_title">Be Part Of Something Brilliant</h2>
        <p className="brilliant_description">
          Follow us on Facebook & Instagram for gorgeous engagement rings and wedding bands, real life proposals, and dreamy wedding day inspiration. Be sure to tag us in your beautiful jewelry models pictures @dianjewelry for a chance to be featured.
        </p>
        <div className="brilliant_grid">
          <div className="brilliant_column">
            <div className="brilliant_image_large">
              <img src={brilliant1} alt="Image 1" />
            </div>
          </div>
          <div className="brilliant_column">
            <div className="brilliant_image_small">
              <img src={brilliant2} alt="Image 2" />
            </div>
            <div className="brilliant_image_small">
              <img src={brilliant3} alt="Image 3" />
            </div>
          </div>
          <div className="brilliant_column">
            <div className="brilliant_image_large">
              <img src={brilliant4} alt="Image 4" />
            </div>
          </div>
        </div>
      </div>

      <ScrollToTop />
    </div>
  );
}

export default Home;