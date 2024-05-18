import React from 'react';
import '../Header/HeaderComponent.scss';
import logo from '../../assets/img/logo.png';
import {
    Link, NavLink
} from "react-router-dom";

const HeaderComponent = () => {
    return (
        <header className="header">
            <div className="top_header container-fluid">
                <div className="row align-items-center" style={{ backgroundColor: 'white' }}>
                    <div className="col-md-4">
                        <div className="contact_info">
                            <p className="contact_phone"><i className="fas fa-phone-alt"></i>0912 345 678</p>
                            <p className="contact_address"><i className="fas fa-map-marker-alt"></i> Đường D1, Long Thạnh Mỹ, TP Thủ Đức, TP HCM</p>
                        </div>
                    </div>
                    <div className="col-md-4 text-center">
                        <a href="/home">
                            <img className="logo" src={logo} alt="Logo" />
                        </a>
                    </div>
                    <div className="col-md-4 text-end">
                        <div className="header_icons">
                            <div className="search_section">
                                <input type="text" className="search_bar" placeholder="Search..." />
                            </div>
                            <a href="../views/Cart.js">
                                <i className="icon_cart fas fa-shopping-bag"></i>
                            </a>
                            <div className="account_dropdown_section dropdown">
                                <i className="icon_account fas fa-user" id="dropdownMenuButton1" data-bs-toggle="dropdown"
                                    aria-expanded="false"></i>
                                <i className="icon_arrow fas fa-chevron-down"></i>
                                <ul className="account_dropdown_menu dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li>
                                        <p className="full_name dropdown-item">Full name</p>
                                    </li>
                                    <li>
                                        <p className="point dropdown-item">0 point</p>
                                    </li>
                                    <hr className="account_hr1" />
                                    <li><a className="dropdown-item" href="#"><i className="adm_icon fas fa-cog"></i> Setting</a></li>
                                    <li><a className="dropdown-item" href="/FAQs"><i className="adm_icon fas fa-question-circle"></i> FAQs</a></li>
                                    <hr className="account_hr2" />
                                    <li><a className="dropdown-item" href="/login"><i className="adm_icon fas fa-sign-out-alt"></i> Sign out</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="home nav-link" href="/home">HOME</a>
                            </li>
                            <li className="diamond_dropdown_section nav-item dropdown">
                                <a className="diamond nav-link" id="diamondDropdown" role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false" href="/diamondJewelry">
                                    DIAMOND JEWELRY<i className="icon_arrow_diamond fas fa-chevron-down" style={{ fontSize: '10px' }}></i>
                                </a>
                                <ul className="diamond_dropdown_menu dropdown-menu" aria-labelledby="diamondDropdown">
                                    <li><a className="dropdown-item" href="#">Ring</a></li>
                                    <li><a className="dropdown-item" href="#">Earings</a></li>
                                    <li><a className="dropdown-item" href="#">Bracelet</a></li>
                                    <li><a className="dropdown-item" href="#">Necklace</a></li>
                                </ul>
                            </li>
                            <li className="wedding_dropdown_section nav-item dropdown">
                                <a className="wedding nav-link" id="weddingDropdown" role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false" href="/weddingJewelry">
                                    WEDDING JEWELRY<i className="icon_arrow_wedding fas fa-chevron-down" style={{ fontSize: '10px' }}></i>
                                </a>
                                <ul className="wedding_dropdown_menu dropdown-menu" aria-labelledby="weddingDropdown">
                                    <li><a className="dropdown-item" href="#">Wedding Ring</a></li>
                                    <li><a className="dropdown-item" href="#">Wedding Earings</a></li>
                                    <li><a className="dropdown-item" href="#">Wedding Bracelet</a></li>
                                    <li><a className="dropdown-item" href="#">Wedding Necklace</a></li>
                                    <li><a className="dropdown-item" href="#">Engagement Ring</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="price_list nav-link" href="/priceList">PRICE LIST</a>
                            </li>
                            <li className="nav-item">
                                <a className="education nav-link" href="#">EDUCATION</a>
                            </li>
                            <li className="nav-item">
                                <a className="introduce nav-link" href="/introduce">INTRODUCE</a>
                            </li>
                            <li className="nav-item">
                                <a className="contact nav-link" href="/contact">CONTACT US</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default HeaderComponent;
