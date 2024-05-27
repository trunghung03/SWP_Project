import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../styles/Static/Contact.scss';
import SubNav from '../../components/SubNav/SubNav.js';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';

function Contact() {
  const navItems = ['Home', 'Contact'];
  return (
    <div className="Contact">

      <SubNav items={navItems} />

      {/* Contact */}
      <div className="contact_container">
        <h2 className="contact_title">CONTACT DIAN JEWELRY</h2>
        <div className="contact_grid">
          <div className="contact_card">
            <div className="contact_icon">
            <i className="fas fa-map-marker-alt"></i>
            </div>
            <h3 className="contact_card_title">ADDRESS</h3>
            <p className="contact_card_description"> Lô E2a-7, Đường D1 Khu Công nghệ cao, Phường Long Thạnh Mỹ, Thủ Đức, TP. Hồ Chí Minh.</p>
          </div>
          <div className="contact_card">
            <div className="contact_icon">
              <i className="fas fa-clock"></i>
            </div>
            <h3 className="contact_card_title">WORKING TIME</h3>
            <p className="contact_card_description">Monday - Saturday: 8 a.m - 6 p.m<br></br>Sunday: 8 a.m - 5 p.m</p>
          </div>
          <div className="contact_card">
            <div className="contact_icon">
              <i className="fas fa-phone-alt"></i>
            </div>
            <h3 className="contact_card_title">HOTLINE</h3>
            <p className="contact_card_description">Service 24/7: 0912 345 678<br></br>Contact us directly when you need.</p>
          </div>
          <div className="contact_card">
            <div className="contact_icon">
              <i className="fas fa-envelope"></i>
            </div>
            <h3 className="contact_card_title">EMAIL</h3>
            <p className="contact_card_description">email@gmail.com<br></br>If urgent please contact us through hotline for faster reply.</p>
          </div>
        </div>
      </div>

      <ScrollToTop></ScrollToTop>

    </div>
  );
}

export default Contact;