import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Question.scss';

const Question = () => {
    const navigate = useNavigate();

    const handleMoreFaqsClick = () => {
        navigate('/FAQs');
    };

    return (
        <div className="question_component">
            {/* FAQs */}
            <div className="faqs_container">
                <div className="row">
                    <div className="col-md-4 faqs_header">
                        <h1>Most FAQs about DIAN Jewelry</h1>
                        <button className="more_faqs_btn" onClick={handleMoreFaqsClick}>More</button>
                    </div>
                    <div className="col-md-8 faq_items">
                        <hr className="top_line" />
                        <div className="faq_item">
                            <h5>What is the 4Cs standard in diamond quality?</h5>
                            <p>The 4Cs—Carat, Cut, Color, and Clarity—are used to evaluate diamonds. They measure weight, brilliance, color grade, and the presence of imperfections.</p>
                        </div>
                        <hr />
                        <div className="faq_item">
                            <h5>How long does it take to receive my order?</h5>
                            <p>Standard orders typically arrive within 5-7 business days. Customized items may take longer; you'll receive an estimated delivery date at checkout.</p>
                        </div>
                        <hr />
                        <div className="faq_item">
                            <h5>Do you offer a warranty on your jewelry?</h5>
                            <p>Yes, we provide a long time warranty on all our jewelry against manufacturing defects, warranty will be send through email that make the order when the delivery is success. Contact our customer service for warranty claims.</p>
                        </div>
                        <hr className="bottom_line" />
                    </div>
                </div>
            </div>

            {/* Question */}
            <div className="question-container">
                <div className="question_content">
                    <div className="question_text">
                        <h3>Have a question about DIAN Jewelry?</h3>
                        <p>Get answers day or night.</p>
                    </div>
                    <div className="vertical_line"> </div>
                    <div className="contact-info">
                        <div className="contact_item">
                            <i className="fas fa-phone-alt"></i> 0795 795 959
                        </div>
                        <br />
                        <div className="contact_item">
                            <i className="fas fa-envelope"></i> diamonddianjewelry@gmail.com
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Question;
