import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import '../../styles/Static/Contact.scss';
import SubNav from '../../components/SubNav/SubNav.js';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';
import Insta from '../../components/BlogInspired/BlogInspired.js';
import { Link } from 'react-router-dom';
import HeaderComponent from '../../components/Header/HeaderComponent';
import FooterComponent from '../../components/Footer/FooterComponent';

function Contact() {
  const navItems = [
    { name: 'Home', link: '/home' },
    { name: 'Contact', link: '/contact' }
  ];
  return (
    <div className="Contact">
      <HeaderComponent />
      <SubNav items={navItems} />

      {/* Contact */}
      <div className="contact_container">
        <h2 className="contact_title">Contact Dian Jewelry</h2>
        <div className='container'>
          <div className="row">
            <div className="col-sm-12 col-md-3 col-lg-3">
              <div className="contact_card">
                <div className="contact_icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <h3 className="contact_card_title">ADDRESS</h3>
                <p className="contact_card_description">
                  <a href="https://www.google.com/maps/place/Tr%C6%B0%E1%BB%9Dng+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+FPT+TP.+HCM/@10.8411278,106.8092999,19z/data=!4m6!3m5!1s0x31752731176b07b1:0xb752b24b379bae5e!8m2!3d10.8411276!4d106.809883!16s%2Fg%2F11j2zx_fz_?entry=ttu" target="_blank" rel="noopener noreferrer">
                    Lot E2a-7, Street D1 High-Tech Park, Long Thanh My Ward, Thu Duc, City. Ho Chi Minh.
                  </a>
                </p>
              </div>
            </div>
            <div className="col-sm-12 col-md-3 col-lg-3">
              <div className="contact_card">
                <div className="contact_icon">
                  <i className="fas fa-clock"></i>
                </div>
                <h3 className="contact_card_title">WORKING TIME</h3>
                <p className="contact_card_description">Monday - Saturday: 8 a.m - 6 p.m<br />Sunday: 8 a.m - 5 p.m</p>
              </div>
            </div>
            <div className="col-sm-12 col-md-3 col-lg-3">
              <div className="contact_card">
                <div className="contact_icon">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <h3 className="contact_card_title">HOTLINE</h3>
                <p className="contact_card_description">Service 24/7: <a href='tel:0795795959'>0795 795 959</a><br />Contact us directly when you need.</p>
              </div>
            </div>
            <div className="col-sm-12 col-md-3  col-lg-3">
              <div className="contact_card">
                <div className="contact_icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <h3 className="contact_card_title">EMAIL</h3>
                <p className="contact_card_description"><a href='mailto:diamonddianjewelry@gmail.com'>diamonddianjewelry@gmail.com</a><br />If urgent please contact us through hotline for faster reply.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ScrollToTop />
      <Insta />
      <FooterComponent />
    </div>
  );
}

export default Contact;
