import React, { Component } from 'react';
import './Reason.scss';

class Reason extends Component {
    render() {
        return (
            <div className="reason_container">
                <h1 className="reason_title">The Reason To Choose Us</h1>
                <div className="reason_grid">
                    <div className="reason_card">
                        <div className="reason_icon"><i className="fas fa-gem"></i></div>
                        <h3 className="reason_card_title">CHEAP AND SHINY</h3>
                        <p className="reason_card_description">Providing beautiful jewelry models that are sharp, classy in design, sophisticated in every detail at the cheapest prices on the market.</p>
                    </div>
                    <div className="reason_card">
                        <div className="reason_icon"><i className="fas fa-heart"></i></div>
                        <h3 className="reason_card_title">PERFECT QUALITY</h3>
                        <p className="reason_card_description">100% officially imported natural diamonds are carefully selected and have purity and shine, even the smallest diamond.</p>
                    </div>
                    <div className="reason_card">
                        <div className="reason_icon"><i className="fas fa-clock"></i></div>
                        <h3 className="reason_card_title">DEDICATED SERVICE</h3>
                        <p className="reason_card_description">Dedicated staff, passionate about their job, rich in expertise, always ready to serve. Guaranteed to satisfy even the most demanding customers.</p>
                    </div>
                    <div className="reason_card">
                        <div className="reason_icon"><i className="fas fa-gift"></i></div>
                        <h3 className="reason_card_title">ATTRACTIVE WARRANTY</h3>
                        <p className="reason_card_description">Long time warranty for jewelry. Receive wholesale diamonds at good prices throughout Vietnam.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Reason;
