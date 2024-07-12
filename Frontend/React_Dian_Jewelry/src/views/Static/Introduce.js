import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../styles/Static/Introduce.scss';
import SubNav from '../../components/SubNav/SubNav.js';
import beginning from '../../assets/img/beginning.png';
import transpapency from '../../assets/img/transparency.jpg';
import sustainability from '../../assets/img/sustainability.jpg';
import inclusion from '../../assets/img/inclusion.jpg';
import differ1 from '../../assets/img/difference1.png';
import differ2 from '../../assets/img/difference2.png';
import experience from '../../assets/img/experience.jpg';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';
import Reason from '../../components/Reason/Reason.js';
import HeaderComponent from '../../components/Header/HeaderComponent';
import FooterComponent from '../../components/Footer/FooterComponent';
import Insta from '../../components/BlogInspired/BlogInspired.js';
const videoUrl = 'https://cdn.builder.io/o/assets%2F9f2a69003c86470ea05deb9ecb9887be%2Fe0e14f01688242cda1248f61fa4bd547%2Fcompressed?apiKey=b47f39b49d994f41bd8e68fa9258a402&token=e0e14f01688242cda1248f61fa4bd547&alt=media&optimized=true';

const Introduce = () => {
  const navItems = [
    { name: 'Home', link: '/home' },
    { name: 'Introduce', link: '/introduce' }
  ];
  const navigate = useNavigate();

  const handleNavigate = (path, state) => {
    navigate(path, { state });
  };

  return (
    <div className="Introduce">
      <HeaderComponent />
      <SubNav items={navItems} />

      {/* Main title */}
      <div className="banner-container">
        <video className="banner-video" autoPlay loop muted>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="banner-content">
          <h2>JEWELRY REDEFINED</h2>
          <p>We are pioneers. We are disruptors. We are innovators. Join us in transforming the jewelry industry for good.</p>
        </div>
      </div>

      {/* Beginning */}
      <div className="introduce_beginning container">
        <div className="row">
          <div className="introduce_beginning_left col-lg-6 col-md-6 col-sm-12">
            <h3>OUR BEGINNING</h3>
            <div className="introduce_beginning_underline"></div>
            <p>In 2003, Co-Founders Duyen, Minh, Duy, Hung, and Tran couldn't find diamond jewelry that was ethical, sustainable, and traceable. Each passionate about beautiful jewelry and a better world, they decided to act. In 2004, they founded Dian Jewelry, combining Duyen's vision, Minh's design expertise, Duy's commitment to sustainability, Hung's craftsmanship, and Tran's marketing savvy.</p>
            <p>Today, Dian Jewelry revolutionizes how jewelry is sourced, crafted, sold, and worn, never compromising on quality or conscience.</p>
          </div>
          <div className="introduce_beginning_right col-lg-6 col-md-6 col-sm-12">
            <img src={beginning} alt="Dian Jewelry" />
            <p className="beginning_left_desc">“We started Dian Jewelry in 2004 to raise the ethical standards of the diamond industry and to create a new way to buy beautiful fine jewelry.”</p>
          </div>
        </div>
      </div>

      {/* Mission  */}
      <div className="mission_container">
        <div className="mission_description">
          <p>Our mission to cultivate a more transparent, sustainable, compassionate, and inclusive jewelry industry has been at the core of everything we do from day one. By fostering a culture of respect and integrity, we aim to inspire a movement towards a more equitable and sustainable future in jewelry manufacturing and retail. Join us as we will lead the change.</p>
        </div>
        <h4 className="misson_title">OUR MISSION PILLARS</h4>
        <div className='container'>
          <div className="mission_columns row">
            <div className="mission_column1 col-lg-4 col-md-4 col-sm-12">
              <div className='mission_column1_img'>
                <img src={transpapency} alt="Transparency" />
              </div>
              <div className='mission_column1_content'>
                <h3 className="mission_sub_title_1">TRANSPARENCY</h3>
                <p className="mission_sub_description_1">We know where our precious metals and gemstones come from and how our jewelry is made. And we share that information with you, so you can feel good about the jewelry you're wearing.</p>
              </div>
            </div>
            <div className="mission_column2 col-lg-4 col-md-4 col-sm-12">
              <div className='mission_column2_img'>
                <img src={sustainability} alt="Sustainability" />
              </div>
              <div className='mission_column1_content'>
                <h3 className="mission_sub_title_2">SUSTAINABILITY</h3>
                <p className="mission_sub_description_2">We use recycled and sustainable materials, apply energy-efficient practices, and minimize our carbon footprint.</p>
              </div>
            </div>
            <div className="mission_column3 col-lg-4 col-md-4 col-sm-12">
              <div className='mission_column3_img'>
                <img src={inclusion} alt="Inclusion" />
              </div>
              <div className='mission_column1_content'>
                <h3 className="mission_sub_title_3">INCLUSION</h3>
                <p className="mission_sub_description_3">We support and invest in our diverse teams to ensure every employee knows that they belong, and our designs are always crafted with inclusivity in mind.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Experience */}
      <div className="introduce_experience container">
        <div className="row">
          <div className="introduce_experience_left col-lg-6 col-md-6 col-sm-12">
            <h3>WE ARE HERE FOR YOU</h3>
            <div className="introduce_experience_underline"></div>
            <p>Appointments are relaxed, joyful, and tailored to you. Whether it's a milestone moment or an everyday luxury, we're here to help you start your stack, find your fit, and design the perfect piece. Our team is dedicated to making your experience as enjoyable and personalized as possible. We provide expert guidance and a friendly atmosphere, ensuring you feel confident and delighted with your choices.</p>
            <button onClick={() => handleNavigate('/diamond-jewelry', { category: 'all' })} className="introduce_shop_now_btn">Shop now</button>
          </div>
          <div className="introduce_experience_right col-lg-6 col-md-6 col-sm-12">
            <img src={experience} alt="Dian Jewelry" />
          </div>
        </div>
      </div>

      <br></br>
      <br></br>

      {/* Difference */}
      <div className="difference_container">
        <h3 className="difference_title">THE DIAN JEWELRY DIFFERENCE</h3>
        <div className='container'>
          <div className="difference_1 row">
            <div className="difference_1_left col-lg-6 col-md-6 col-sm-12">
              <h3 className="difference_1_title">EXPERTLY DESIGNED JEWELRY</h3>
              <div className="difference_1_underline"></div>
              <p className="difference_1_description">Award-winning designers in our San Francisco studio dream up each piece, considering every aspect of the distinct design. Then, artisans with masterful attention to detail bring our jewelry to life, so you can wear it forever.</p>
            </div>
            <div className="difference_1_right col-lg-6 col-md-6 col-sm-12">
              <img src={differ1} alt="Expertly Designed" />
            </div>
          </div>
          <div className="difference_2 row">
            <div className="difference_2_left col-lg-6 col-md-6 col-sm-12">
              <img src={differ2} alt="Ethically Crafted" />
            </div>
            <div className="difference_2_right col-lg-6 col-md-6 col-sm-12">
              <h3 className="difference_2_title">EVERY PIECE CRAFTED ETHICALLY</h3>
              <div className="difference_2_underline"></div>
              <p className="difference_2_description">Every aspect of our jewelry is ethically crafted, from the minute the materials are sourced, to the moment you put it on, because we believe you should feel good about what you're wearing.</p>
            </div>
          </div>
        </div>
      </div>

      
      {/* Reason  */}
      <Reason></Reason>
<br></br><br></br>

      <ScrollToTop></ScrollToTop>
      <Insta />
      <FooterComponent />
    </div>
  );
}

export default Introduce;
