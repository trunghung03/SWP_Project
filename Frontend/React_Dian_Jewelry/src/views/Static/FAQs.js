import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SubNav from '../../components/SubNav/SubNav.js';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';
import '../../styles/Static/FAQs.scss';
import contact from '../../assets/img/faqContact.png';
import faqsImg from '../../assets/img/faq.png';
import HeaderComponent from '../../components/Header/HeaderComponent';
import FooterComponent from '../../components/Footer/FooterComponent';
import Insta from '../../components/BlogInspired/BlogInspired.js';

function FAQs() {
  const [transitionKey, setTransitionKey] = useState(Date.now());
  const navItems = [
    { name: 'Home', link: '/home' },
    { name: 'Frequently Asked Questions', link: '/FAQS' }
  ];
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate('/contact');
  };

  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(10);

  const toggleFAQ = index => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const faqs = [
    {
      question: "What is the 4Cs standard in diamond quality?",
      answer: "The 4Cs—Carat, Cut, Color, and Clarity—are used to evaluate diamonds. They measure weight, brilliance, color grade, and the presence of imperfections."
    },
    {
      question: "How long does it take to receive my order?",
      answer: "Standard orders typically arrive within 5-7 business days. Customized items may take longer; you'll receive an estimated delivery date at checkout."
    },
    {
      question: "Do you offer a warranty on your jewelry?",
      answer: "Yes, we provide a long time warranty on all our jewelry against manufacturing defects, warranty will be send through email that make the order when the delivery is success. Contact our customer service for warranty claims."
    },
    {
      question: "Are your diamonds conflict-free?",
      answer: "Yes, all our diamonds are certified conflict-free and sourced from ethical suppliers adhering to the Kimberley Process."
    },
    {
      question: "Can I return or exchange an item?",
      answer: "Yes, we offer a 30-day return and exchange policy. Items must be in their original condition. Contact our customer service for assistance."
    },
    {
      question: "Do you offer customization for engagement rings?",
      answer: "Yes, we offer customization options for engagement rings, including personalized engravings and bespoke designs. Contact us for more details."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept major credit cards, PayPal, and bank transfers. You can choose your preferred payment method at checkout."
    },
    {
      question: "How can I track my order?",
      answer: "You can track the order by clicking on setting then direct to order history."
    },
    {
      question: "Do you offer financing options?",
      answer: "Yes, we offer financing options through our partner services. Check the financing section at checkout for more information."
    },
    {
      question: "How do I find my ring size?",
      answer: "We provide a ring size guide on our website. You can also visit a local jeweler to have your ring size measured accurately."
    },
    {
      question: "What if my item needs repair?",
      answer: "We offer repair services for our jewelry. Contact our customer service with details of the issue, and we'll assist you with the repair process."
    },
    {
      question: "Can I visit your physical store?",
      answer: "Yes, you can visit our physical store at the address provided on our contact page. We recommend booking an appointment for personalized service."
    },
    {
      question: "Do you offer gift wrapping services?",
      answer: "Yes, we offer complimentary gift wrapping services for all orders. You can select this option at checkout."
    },
    {
      question: "How can I track my order?",
      answer: "You can track the order by clicking on setting then direct to order history."
    },
    {
      question: "Do you offer financing options?",
      answer: "Yes, we offer financing options through our partner services. Check the financing section at checkout for more information."
    },
    {
      question: "How do I find my ring size?",
      answer: "We provide a ring size guide on our website. You can also visit a local jeweler to have your ring size measured accurately."
    },
    {
      question: "What if my item needs repair?",
      answer: "We offer repair services for our jewelry. Contact our customer service with details of the issue, and we'll assist you with the repair process."
    },
    {
      question: "Can I visit your physical store?",
      answer: "Yes, you can visit our physical store at the address provided on our contact page. We recommend booking an appointment for personalized service."
    },
    {
      question: "Do you offer gift wrapping services?",
      answer: "Yes, we offer complimentary gift wrapping services for all orders. You can select this option at checkout."
    },
    {
      question: "How can I track my order?",
      answer: "You can track the order by clicking on setting then direct to order history."
    },
    {
      question: "Do you offer financing options?",
      answer: "Yes, we offer financing options through our partner services. Check the financing section at checkout for more information."
    },
    {
      question: "How do I find my ring size?",
      answer: "We provide a ring size guide on our website. You can also visit a local jeweler to have your ring size measured accurately."
    },
    {
      question: "What if my item needs repair?",
      answer: "We offer repair services for our jewelry. Contact our customer service with details of the issue, and we'll assist you with the repair process."
    },
    {
      question: "Can I visit your physical store?",
      answer: "Yes, you can visit our physical store at the address provided on our contact page. We recommend booking an appointment for personalized service."
    },
    {
      question: "Do you offer gift wrapping services?",
      answer: "Yes, we offer complimentary gift wrapping services for all orders. You can select this option at checkout."
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleFaqs = filteredFaqs.slice(0, visibleCount);

  const loadMoreFaqs = () => {
    setVisibleCount(visibleCount + 10);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      document.querySelector('.faqs_banner_container').classList.add('visible');
    }, 10);
    return () => clearTimeout(timeout);
  }, [transitionKey]);

  return (
    <div className="FAQs">
      <HeaderComponent />
      <SubNav items={navItems} />

      {/* Main title */}
      <div key={transitionKey} className="faqs_banner_container" style={{ backgroundImage: `url(${faqsImg})` }}>
        <div className="faqs_banner_content">
          <h2>How can we help you?</h2>
        </div>
      </div>
      <br></br><br></br>

      {/* Search Section */}
      <div className="faqs_search_section">
        <input
          type="text"
          className="faqs_search_input"
          placeholder="Search FAQs..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button className="faqs_search_button">
          <i className="fas fa-search"></i>
        </button>
      </div>
      <br></br><br></br>

      {/* Main FAQs section */}
      <div className="main_faqs_container">
        <h2 className="main_faqs_title">Frequently Asked Questions</h2>
        <p className="main_faqs_number">({filteredFaqs.length} questions)</p>
        {visibleFaqs.map((faq, index) => (
          <div key={index}>
            <hr className="main_faqs_line" />
            <div className="main_faqs_question" onClick={() => toggleFAQ(index)}>
              <h3 className="main_faqs_sub_title">{faq.question} <i className={`fas fa-${activeIndex === index ? 'minus' : 'plus'}`}></i></h3>
              {activeIndex === index && <p className="main_faqs_description">{faq.answer}</p>}
            </div>
          </div>
        ))}
        <hr className="main_faqs_line" />
        {visibleCount < filteredFaqs.length && (
          <button className="faqs_view_more_button" onClick={loadMoreFaqs}>View more</button>
        )}
      </div>
      <br></br><br></br>

      {/* Still need help */}
      <div className="container faqs_help_container">
        <div className="row">
          <div className="col-lg-7 col-md-7 col-sm-12 faqs_help_content">
            <h2 className="faqs_help_title">Still need help?</h2>
            <p className="faqs_help_description">
              Whether you need more detailed information or have specific inquiries, don't hesitate to reach out.
            </p>
            <button className="faqs_help_btn" onClick={handleContactClick}>Contact us</button>
          </div>
          <div className="col-lg-5 col-md-5 col-sm-12 faqs_help_image">
            <img src={contact} alt="Contact Us" />
          </div>
        </div>
      </div>
      <br></br><br></br><br></br>
      <ScrollToTop />
      <Insta />
      <FooterComponent />
    </div>
  );
}

export default FAQs;