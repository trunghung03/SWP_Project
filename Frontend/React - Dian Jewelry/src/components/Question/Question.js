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
                            <h5>What design details are showcased in ZAC ZAC POSEN engagement rings?</h5>
                            <p>Milgrain details, floral elements, and gleaming halo settings are seen throughout this collection of designer engagement rings.</p>
                        </div>
                        <hr />
                        <div className="faq_item">
                            <h5>What design details are showcased in ZAC ZAC POSEN engagement rings?</h5>
                            <p>Milgrain details, floral elements, and gleaming halo settings are seen throughout this collection of designer engagement rings.</p>
                        </div>
                        <hr />
                        <div className="faq_item">
                            <h5>What design details are showcased in ZAC ZAC POSEN engagement rings?</h5>
                            <p>Milgrain details, floral elements, and gleaming halo settings are seen throughout this collection of designer engagement rings.</p>
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
                            <i className="fas fa-phone-alt"></i> 0912 345 678
                        </div>
                        <br />
                        <div className="contact_item">
                            <i className="fas fa-envelope"></i> example@gmail.com
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Question;
