import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../styles/Static/Introduce.scss';
import SubNav from '../../components/SubNav/SubNav.js';
import mainImg from '../../assets/img/introduceMain.png';
import beginning from '../../assets/img/beginning.png';
import transpapency from '../../assets/img/transparency.jpg';
import sustainability from '../../assets/img/sustainability.jpg';
import inclusion from '../../assets/img/inclusion.jpg';
import differ1 from '../../assets/img/difference1.png';
import differ2 from '../../assets/img/difference2.png';
import experience from '../../assets/img/experience.webp';
import img1 from '../../assets/img/feature1.webp';
import img2 from '../../assets/img/feature2.webp';
import img3 from '../../assets/img/feature3.webp';
import img4 from '../../assets/img/feature4.webp';
import img5 from '../../assets/img/feature5.webp';
import img6 from '../../assets/img/feature6.webp';
import img7 from '../../assets/img/feature7.webp';
import img8 from '../../assets/img/feature8.jpg';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';
import Reason from '../../components/Reason/Reason.js';

function Introduce() {
  const navItems = ['Home', 'Introduce'];
  const navigate = useNavigate();
  const navigateToProductDetail = (product) => {
    navigate('/productDetail', { state: { image: product.image, name: product.name, price: product.price } });
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
  return (
    <div className="Introduce">
      <SubNav items={navItems} />

      {/* Main title */}
      <div className="banner-container" style={{ backgroundImage: `url(${mainImg})` }}>
        <div className="banner-content">
          <h2>JEWELRY REDEFINED</h2>
          <p>We are pioneers. We are disruptors. We are innovators. Join us in transforming the jewelry industry for good.</p>
        </div>
      </div>

      {/* Beginning */}
      <div className="introduce_beginning">
        <div className="introduce_beginning_left">
          <h3>OUR BEGINNING</h3>
          <div className="introduce_beginning_underline"></div>
          <p>In 2004, Co-Founder and CEO Beth Gerstein couldn’t find a diamond engagement ring that was ethical, sustainable, and traceable. She wanted the sparkling symbol of her commitment to represent more than love: the perfect piece would also respect the planet and protect its future. On a mission to make the jewelry industry more sustainable and ethical, Beth — alongside Eric Grossberg — founded Dian Jewelry in 2005.</p>
          <p>From that first step through today, we've revolutionized the way jewelry is sourced, crafted, sold, and worn. We do not compromise between quality and conscience — and neither do our customers.</p>
        </div>
        <div className="introduce_beginning_right">
          <img src={beginning} alt="Dian Jewelry" />
          <p className="beginning_left_desc">“We started Dian Jewelry in 2005 to raise the ethical standards of the diamond industry and to create a new way to buy beautiful fine jewelry.”</p>
          <p className="beginning_credit">— Beth Gerstein, CEO & Co-Founder</p>
        </div>
      </div>

      {/* Mission  */}
      <div className="mission_container">
        <div className="mission_description">
          <p>Our mission to cultivate a more transparent, sustainable, compassionate, and inclusive jewelry industry has been at the core of everything we do from day one. By fostering a culture of respect and integrity, we aim to inspire a movement towards a more equitable and sustainable future in jewelry manufacturing and retail. Join us as we will lead the change.</p>
        </div>
        <h4 className="misson_title">OUR MISSION PILLARS</h4>
        <div className="mission_columns">
          <div className="mission_column1">
            <img src={transpapency} alt="Transparency" />
            <h3 className="mission_sub_title_1">TRANSPARENCY</h3>
            <p className="mission_sub_description_1">We know where our precious metals and gemstones come from and how our jewelry is made. And we share that information with you, so you can feel good about the jewelry you're wearing.</p>
          </div>
          <div className="mission_column2">
            <img src={sustainability} alt="Sustainability" />
            <h3 className="mission_sub_title_2">SUSTAINABILITY</h3>
            <p className="mission_sub_description_2">We use recycled and sustainable materials, apply energy-efficient practices, and minimize our carbon footprint.</p>
          </div>
          <div className="mission_column3">
            <img src={inclusion} alt="Inclusion" />
            <h3 className="mission_sub_title_3">INCLUSION</h3>
            <p className="mission_sub_description_3">We support and invest in our diverse teams to ensure every employee knows that they belong, and our designs are always crafted with inclusivity in mind.</p>
          </div>
        </div>
      </div>

      {/* Difference */}
      <div className="difference_container">
        <h3 className="difference_title">THE DIAN JEWELRY DIFFERENCE</h3>
        <div className="difference_1">
          <div className="difference_1_left">
            <h3 className="difference_1_title">EXPERTLY DESIGNED JEWELRY</h3>
            <div className="difference_1_underline"></div>
            <p className="difference_1_description">Award-winning designers in our San Francisco studio dream up each piece, considering every aspect of the distinct design. Then, artisans with masterful attention to detail bring our jewelry to life, so you can wear it forever.</p>
          </div>
          <div className="difference_1_right">
            <img src={differ1} alt="Expertly Designed" />
          </div>
        </div>
        <div className="difference_2">
          <div className="difference_2_left">
            <img src={differ2} alt="Ethically Crafted" />
          </div>
          <div className="difference_2_right">
            <h3 className="difference_2_title">EVERY PIECE CRAFTED ETHICALLY</h3>
            <div className="difference_2_underline"></div>
            <p className="difference_2_description">Every aspect of our jewelry is ethically crafted, from the minute the materials are sourced, to the moment you put it on, because we believe you should feel good about what you're wearing.</p>
          </div>
        </div>
      </div>

      {/* Reason  */}
      <Reason></Reason>

      {/* Experience */}
      <div className="introduce_experience">
        <div className="introduce_experience_left">
          <h3>WE ARE HERE FOR YOU</h3>
          <div className="introduce_experience_underline"></div>
          <p>Appointments are relaxed, joyful, and tailored to you. Whether it's a milestone moment or an everyday luxury, we're here to help you start your stack, find your fit, and design the perfect piece.</p>
          <button onClick={() => navigate('/diamondJewelry')} className="introduce_shop_now_btn">Shop now</button>
        </div>
        <div className="introduce_experience_right">
          <img src={experience} alt="Dian Jewelry" />
        </div>
      </div>
      <br></br>
      <br></br>

      {/* Explore */}
      <div className="explore_jewelry_container">
        <div className="explore_left_section">
          <h1 className="explore_title">Move To Explore</h1>
          <button onClick={() => navigate('/diamondJewelry')} className="explore_shop_now_btn" >Shop now</button>
          <i id="left" className="fa-solid fa-angle-left nav_arrow explore_left_arrow" role="button"></i>
          <i id="right" className="fa-solid fa-angle-right nav_arrow explore_right_arrow" role="button"></i>
        </div>
        <div className="explore_right_section wrapper">
          <ul className="carousel">
            {[
              { image: img1, name: "Product 1", price: 327 },
              { image: img2, name: "Product 2", price: 327 },
              { image: img3, name: "Product 3", price: 327 },
              { image: img4, name: "Product 4", price: 327 },
              { image: img5, name: "Product 5", price: 327 },
              { image: img6, name: "Product 6", price: 327 },
              { image: img7, name: "Product 7", price: 327 },
              { image: img8, name: "Product 8", price: 327 }
            ].map((product, index) => (
              <li key={index} className="explore_product_card card" onClick={() => navigateToProductDetail(product)}>
                <img src={product.image} alt={product.name} className="explore_product_image" />
                <p className="explore_product_name">{product.name}</p>
                <p className="explore_product_price">${product.price}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ScrollToTop></ScrollToTop>
    </div>
  );
}

export default Introduce;