import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SubNav from '../../components/SubNav/SubNav.js';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';
import '../../styles/Static/FAQs.scss';
import contact from '../../assets/img/contact.webp';
import faqsImg from '../../assets/img/faqs.png';

function FAQs() {
  const navItems = ['Home', 'Frequently Asked Questions'];
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate('/contact');
  };

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = index => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How can I reset my password?",
      answer: "You can reset your password by going to the settings page and selecting 'Reset Password'."
    },
    {
      question: "Where can I find pricing information?",
      answer: "Pricing information can be found on the 'Pricing' page accessible from the navigation menu."
    },
    {
      question: "What is your return policy?",
      answer: "Our return policy is 30 days. If 30 days have gone by since your purchase, unfortunately, we can’t offer you a refund or exchange."
    }
  ];

  return (
    <div className="FAQs">
      <SubNav items={navItems} />

      {/* Main title */}
      <div className="faqs_banner_container" style={{ backgroundImage: `url(${faqsImg})` }}>
        <div className="faqs_banner_content">
          <h2>How can we help you?</h2>
        </div>
      </div>
      <br></br><br></br>
      {/* Main FAQs section */}
      <div className="main_faqs_container">
        <h2 className="main_faqs_title">Frequently Asked Questions</h2>
        <p className="main_faqs_number">({faqs.length} questions)</p>
        {faqs.map((faq, index) => (
          <div key={index}>
            <hr className="main_faqs_line"/>
            <div className="main_faqs_question" onClick={() => toggleFAQ(index)}>
              <h3 className="main_faqs_sub_title">{faq.question} <i className={`fas fa-${activeIndex === index ? 'minus' : 'plus'}`}></i></h3>
              {activeIndex === index && <p className="main_faqs_description">{faq.answer}</p>}
            </div>
          </div>
        ))}
        <hr className="main_faqs_line"/>
      </div>
      <br></br><br></br>
      {/* Still need help */}
      <div className="faqs_help_container">
        <div className="faqs_help_content">
          <h2 className="faqs_help_title">Still need help?</h2>
          <p className="faqs_help_description">
            Our dedicated team is here to provide further assistance and ensure all your concerns are addressed. Whether you need more detailed information or have specific inquiries, don't hesitate to reach out.
          </p>
          <button className="faqs_help_btn" onClick={handleContactClick}>Contact us</button>
        </div>
        <div className="faqs_help_image">
          <img src={contact} alt="Contact Us" />
        </div>
      </div>
      <br></br><br></br><br></br>
      <ScrollToTop />
    </div>
  );
}

export default FAQs;
