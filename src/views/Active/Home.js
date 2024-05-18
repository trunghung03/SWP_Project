import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';
import '../../styles/Active/Home.scss';
import rightImage from '../../assets/img/rightImage.png';
import diamond_shape from '../../assets/img/shape.png';
import slide1 from '../../assets/img/slide1.webp';
import slide2 from '../../assets/img/slide2.webp';
import slide3 from '../../assets/img/slide3.webp';
import impression from '../../assets/img/impression.png';
import proposal from '../../assets/img/proposal.png';
import bb from '../../assets/img/bb.png';

const Home = () => {
  let slideIndex = 1;

  const showSlides = (n) => {
    let i;
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
  };

  const plusSlides = (n) => {
    showSlides(slideIndex += n);
  };

  const currentSlide = (n) => {
    showSlides(slideIndex = n);
  };

  useEffect(() => {
    showSlides(slideIndex);

    // Feature product
    const wrapper = document.querySelector(".wrapper");
    const carousel = document.querySelector(".carousel");
    const firstCardWidth = carousel.querySelector(".card").offsetWidth;
    const arrowBtns = document.querySelectorAll(".nav_arrow");
    const carouselChildrens = [...carousel.children];
    let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

    let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

    carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
      carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

    carouselChildrens.slice(0, cardPerView).forEach(card => {
      carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");

    arrowBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const direction = btn.id === "left" ? -1 : 1;
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

    const infiniteScroll = () => {
      if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
      }
      else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
      }
      clearTimeout(timeoutId);
      if (!wrapper.matches(":hover")) autoPlay();
    };

    const autoPlay = () => {
      if (window.innerWidth < 800 || !isAutoPlay) return;
      timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
    };

    autoPlay();

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("scroll", infiniteScroll);
    wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
    wrapper.addEventListener("mouseleave", autoPlay);

  }, []);

  return (
    <div className="Home">
      {/* Slider  */}
      <div className="slider-container">
        <div className="slide">
          <img src={slide1} alt="Slide 1" />
        </div>
        <div className="slide">
          <img src={slide2} alt="Slide 2" />
        </div>
        <div className="slide">
          <img src={slide3} alt="Slide 3" />
        </div>
        <a className="prev" onClick={() => plusSlides(-1)}>&#10094;</a>
        <a className="next" onClick={() => plusSlides(1)}>&#10095;</a>
        <div className="dot-container">
          <span className="dot" onClick={() => currentSlide(1)}></span>
          <span className="dot" onClick={() => currentSlide(2)}></span>
          <span className="dot" onClick={() => currentSlide(3)}></span>
        </div>
      </div>

      <div className="diamond_shape text-center">
        <img src={diamond_shape} alt="Diamond shape" />
      </div>

      {/* Feature jewelry  */}
      <div className="featured_jewelry_container">
        <div className="left_section">
          <h1 className="featured_title">Featured Jewelry</h1>
          <p className="featured_description">Explore our outstanding diamond jewelry collection, where artistry meets
            timeless elegance. Each piece of jewelry is exquisitely crafted, bringing the splendor and class.</p>
          <button className="shop_now_btn">Shop now</button>
          <i id="left" className="fa-solid fa-angle-left nav_arrow left_arrow" role="button"></i>
          <i id="right" className="fa-solid fa-angle-right nav_arrow right_arrow" role="button"></i>
        </div>
        <div className="right_section wrapper">
          <ul className="carousel">
            <li className="product_card card">
              <img src={rightImage} alt="Name" className="product_image" />
              <p className="product_name">Product 1</p>
              <p className="product_price">$327</p>
            </li>
            <li className="product_card card">
              <img src={rightImage} alt="Name" className="product_image" />
              <p className="product_name">Product 2</p>
              <p className="product_price">$327</p>
            </li>
            <li className="product_card card">
              <img src={rightImage} alt="Name" className="product_image" />
              <p className="product_name">Product 3</p>
              <p className="product_price">$327</p>
            </li>
            <li className="product_card card">
              <img src={rightImage} alt="Name" className="product_image" />
              <p className="product_name">Product 4</p>
              <p className="product_price">$327</p>
            </li>
            <li className="product_card card">
              <img src={rightImage} alt="Name" className="product_image" />
              <p className="product_name">Product 5</p>
              <p className="product_price">$327</p>
            </li>
            <li className="product_card card">
              <img src={rightImage} alt="Name" className="product_image" />
              <p className="product_name">Product 6</p>
              <p className="product_price">$327</p>
            </li>
            <li className="product_card card">
              <img src={rightImage} alt="Name" className="product_image" />
              <p className="product_name">Product 7</p>
              <p className="product_price">$327</p>
            </li>
            <li className="product_card card">
              <img src={rightImage} alt="Name" className="product_image" />
              <p className="product_name">Product 8</p>
              <p className="product_price">$327</p>
            </li>
          </ul>
        </div>
      </div>

      {/* Collection  */}
      <div className="collections_container text-center">
        <h1 className="collections_title">OUR COLLECTIONS</h1>
        <div className="collections_grid">
          <div className="collection_column1">
            <div className="collection_item">
              <div className="collection_image_wrapper">
                <img src={rightImage} alt="Luxurious Lustre" />
                <p className="collection_name">Luxurious Lustre</p>
              </div>
            </div>
            <div className="collection_item">
              <div className="collection_image_wrapper">
                <img src={rightImage} alt="Radiant Reflections" />
                <p className="collection_name">Radiant Reflections</p>
              </div>
            </div>
          </div>
          <div className="collection_column2">
            <div className="collection_item">
              <div className="collection_image_wrapper">
                <img src={rightImage} alt="Majestic Mementos" />
                <p className="collection_name">Majestic Mementos</p>
              </div>
            </div>
            <div className="collection_item">
              <div className="collection_image_wrapper">
                <img src={rightImage} alt="Blissful Baubles" />
                <p className="collection_name">Blissful Baubles</p>
              </div>
            </div>
          </div>
          <div className="collection_column3">
            <div className="collection_item">
              <div className="collection_image_wrapper">
                <img src={rightImage} alt="Timeless Treasures" />
                <p className="collection_name">Timeless Treasures</p>
              </div>
            </div>
            <div className="collection_item">
              <div className="collection_image_wrapper">
                <img src={rightImage} alt="Divine Diamonds" />
                <p className="collection_name">Divine Diamonds</p>
              </div>
            </div>
          </div>
        </div>
        <button className="collection_shop_now_btn">Shop now</button>
      </div>

      {/* Best & Belove */}
      <div className="bb_container">
        <img src={bb} alt="Best & Beloved" className="bb_image" />
        <div className="bb_content">
          <div className="bb_text">
            <h2 className="bb_title">Best & Beloved</h2>
            <p className="bb_description">Our most coveted engagement rings, as chosen by you.</p>
          </div>
          <button className="bb_shop_now_button">Shop now</button>
        </div>
      </div>

      {/* Impression */}
      <div className="impression_container">
        <img src={impression} alt="Make An Impression" className="impression_image" />
        <div className="impression_content">
          <h2 className="impression_title">Make An Impression</h2>
          <p className="impression_description">The best jewelry embraces extravagance. Discover truly remarkable, one-of-a-kind pieces that are sure to leave them speechless.</p>
          <button className="impression_shop_now_button">SHOP THE BRACELET COLLECTION</button>
        </div>
      </div>

      {/* Proposal */}
      <div className="proposal_container">
        <img src={proposal} alt="An Unforgettable Proposal" className="proposal_image" />
        <div className="proposal_content">
          <h2 className="proposal_title">An Unforgettable Proposal</h2>
          <p className="proposal_description">Glamourous details and matching bands—we have the perfect rings to seal the deal.</p>
          <button className="proposal_shop_now_button">SHOP THE ENGAGEMENT RINGS</button>
        </div>
      </div>

      {/* Reason */}
      <div className="reason_container">
        <h2 className="reason_title">THE REASON TO CHOOSE US</h2>
        <div className="reason_grid">
          <div className="reason_card">
            <div className="reason_icon">
              <i className="fas fa-gem"></i>
            </div>
            <h3 className="reason_card_title">CHEAP AND SHINY</h3>
            <p className="reason_card_description">Providing beautiful jewelry models that are sharp, classy in design, sophisticated in every detail at the cheapest prices on the market.</p>
          </div>
          <div className="reason_card">
            <div className="reason_icon">
              <i className="fas fa-heart"></i>
            </div>
            <h3 className="reason_card_title">PERFECT QUALITY</h3>
            <p className="reason_card_description">100% officially imported natural diamonds are carefully selected and have purity and shine, even the smallest diamond.</p>
          </div>
          <div className="reason_card">
            <div className="reason_icon">
              <i className="fas fa-clock"></i>
            </div>
            <h3 className="reason_card_title">SERVICE DEDICATED</h3>
            <p className="reason_card_description">Dedicated staff, passionate about their job, rich in expertise, always ready to serve. Guaranteed to satisfy even the most demanding customers.</p>
          </div>
          <div className="reason_card">
            <div className="reason_icon">
              <i className="fas fa-gift"></i>
            </div>
            <h3 className="reason_card_title">ATTRACTIVE POLICY</h3>
            <p className="reason_card_description">Lifetime warranty and renewal of jewelry. Receive wholesale diamonds at good prices throughout Vietnam.</p>
          </div>
        </div>
      </div>

      {/* Brilliant */}
      <div className="brilliant_container">
        <h2 className="brilliant_title">Be Part Of Something Brilliant</h2>
        <p className="brilliant_description">
          Follow us on Facebook & Instagram for gorgeous engagement rings and wedding bands, real life proposals, and dreamy wedding day inspiration. Be sure to tag us in your beautiful jewelry models pictures @dianjewelry for a chance to be featured.
        </p>
        <div className="brilliant_grid">
          <div className="brilliant_column">
            <div className="brilliant_image_large">
              <img src={rightImage} alt="Image 1" />
            </div>
          </div>
          <div className="brilliant_column">
            <div className="brilliant_image_small">
              <img src={rightImage} alt="Image 2" />
            </div>
            <div className="brilliant_image_small">
              <img src={rightImage} alt="Image 3" />
            </div>
          </div>
          <div className="brilliant_column">
            <div className="brilliant_image_large">
              <img src={rightImage} alt="Image 4" />
            </div>
          </div>
        </div>
      </div>



      <ScrollToTop />
    </div>
  );
}

export default Home;
