import React, { useEffect } from 'react';
import '../Footer/FooterComponent.scss';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logoFooter.png';
import vnpay from '../../assets/img/vnpay.webp';
import bank from '../../assets/img/bankLogo.png';
import cash from '../../assets/img/cashLogo.png';

const FooterComponent = () => {
    useEffect(() => {
        const modal = document.getElementById("tosModal");
        const btn = document.getElementById("tosLink");
        const span = document.getElementsByClassName("close")[0];
        const confirmBtn = document.getElementsByClassName("confirm-btn")[0];

        btn.onclick = function (e) {
            e.preventDefault();
            modal.style.display = "block";
        }
        span.onclick = function () {
            modal.style.display = "none";
        }
        confirmBtn.onclick = function () {
            modal.style.display = "none";
        }
        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        }
    }, []);

    const navigate = useNavigate();

    const handleNavigate = (path, state) => {
        window.scrollTo(0, 0);
        navigate(path, { state });
    };

    const handleLinkClick = (event, scrollTo) => {
        event.preventDefault();
        window.scrollTo(0, scrollTo);
        navigate(event.currentTarget.getAttribute('href'));
    };

    return (
        <>
            <footer className="footer">
                <div className="container">
                    <div className="row footer_column">
                        <div className="col-sm-6 col-md-3 footer_first_column">
                            <img src={logo}></img>
                            <h6>Contact us for support</h6>
                            <ul className="footer_content">
                                <li><i className="fas fa-phone-volume"></i><Link to='tel:0795795959'>0795 795 959</Link></li>
                                <li><i className="fas fa-envelope"></i><Link to='mailto:diamonddianjewelry@gmail.com'>diamonddianjewelry@gmail.com</Link></li>
                            </ul>
                        </div>
                        <div className="col-sm-6 col-md-2 footer_2_column">
                            <h6>Categories</h6>
                            <ul className="footer_content">
                                <li onClick={() => handleNavigate('/diamond-jewelry', { category: 'all' })}>
                                    <Link to="/diamond-jewelry">Diamond jewelry</Link>
                                </li>
                                <li onClick={() => handleNavigate('/diamond-jewelry', { category: 'weddingJewelry' })}>
                                    <Link to="/diamond-jewelry">Wedding jewelry</Link>
                                </li>
                                <li onClick={() => handleNavigate('/diamond-jewelry', { category: 'ring' })}>
                                    <Link to="/diamond-jewelry">Ring collection</Link>
                                </li>
                                <li onClick={() => handleNavigate('/diamond-jewelry', { category: 'earrings' })}>
                                    <Link to="/diamond-jewelry">Earrings collection</Link>
                                </li>
                                <li onClick={() => handleNavigate('/diamond-jewelry', { category: 'bracelet' })}>
                                    <Link to="/diamond-jewelry">Bracelet collection</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-sm-6 col-md-2 footer_3_column">
                            <h6>Account</h6>
                            <ul className="footer_content">
                                <li><Link to="/edit-profile" onClick={(e) => handleLinkClick(e, 160)}>My profile</Link></li>
                                <li><Link to="/order-history" onClick={(e) => handleLinkClick(e, 160)}>Order history</Link></li>
                                <li><Link to="/order-history" onClick={(e) => handleLinkClick(e, 160)}>Tracking order</Link></li>
                                <li><Link to="" onClick={(e) => handleLinkClick(e, 0)}>Notifications</Link></li>
                                <li><Link to="/cart" onClick={(e) => handleLinkClick(e, 0)}>Shopping cart</Link></li>
                            </ul>
                        </div>
                        <div className="col-sm-6 col-md-2 footer_4_column">
                            <h6>Information</h6>
                            <ul className="footer_content">
                                <li><Link to="/FAQs" onClick={(e) => handleLinkClick(e, 0)}>Questions</Link></li>
                                <li><Link to="/blog" onClick={(e) => handleLinkClick(e, 0)}>Articles</Link></li>
                                <li><Link to="/introduce" onClick={(e) => handleLinkClick(e, 0)}>About us</Link></li>
                                <li><Link to="/contact" onClick={(e) => handleLinkClick(e, 0)}>Contact us</Link></li>
                                <li><Link to="/price-list" onClick={(e) => handleLinkClick(e, 0)}>Diamond price</Link></li>
                            </ul>
                        </div>
                        <div className="col-sm-12 col-md-3 footer_last_column">
                            <h6>Connect with us</h6>
                            <ul className="footer_content social_media_icon" style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '16px' }}>
                                <li><Link to="https://www.facebook.com/profile.php?id=61560517631582" target="_blank"><i className="fb fab fa-facebook-f" target="_blank"></i></Link></li>
                                <li><Link to="https://www.instagram.com/dian_jewelryy" target="_blank"><i className="ins fab fa-instagram"></i></Link></li>
                                <li><Link to="https://www.tiktok.com/@dianjewelry" target="_blank"><i className="tik fab fa-tiktok"></i></Link></li>
                                <li><Link to="/home" target="_blank"><i className="gg fab fa-google"></i></Link></li>
                            </ul>
                            <h6 className='footer_last_column_title_2'>Secure payment</h6>
                            <ul className="footer_content">
                                <img className='footer_vnpay' src={vnpay}></img>
                                <img className='footer_bank' src={bank}></img>
                                <img className='footer_cash' src={cash}></img>
                            </ul>
                        </div>
                    </div>
                    <hr className="hr_footer" />
                    <div className="copyright row">
                        <div className="col-sm-12 col-md-6">
                            <p>© Copyright 2024 by Dian Jewelry</p>
                        </div>
                        <div className="col-sm-12 col-md-6 tos_col">
                            <Link className="footer_tos_link" id="tosLink" to="#tos">Terms of Service & Privacy Policy</Link>
                        </div>
                    </div>
                </div>
            </footer>

            <div id="tosModal" className="modal" style={{ zIndex: 1000 }}>
                <div className="modal-content">
                    <span className="close" style={{ textAlign: 'end' }}>&times;</span>
                    <h4 className="tos_title">Terms of Service & Privacy Policy</h4>
                    <p className="tos_introduce">
                        Welcome to Dian Jewelry! By signing up and creating an account on our website,
                        you agree to the following terms, conditions and private policy.
                    </p>
                    <p>
                        - <strong>Account Creation:</strong> You must provide accurate and complete information during the registration process.
                        You are responsible for maintaining the confidentiality of your account information and password.<br />
                        - <strong>Purchases and Payments:</strong> Payments must be made through the provided payment options. All sales are final, and returns or exchanges are subject to our return policy.<br />
                        - <strong>User Conduct:</strong> You agree not to use our website for any unlawful purposes or to engage in any conduct that could damage or impair the functionality of our services.<br />
                        - <strong>Information Collection:</strong> We collect personal information when you create an account, make a purchase, or contact us. This includes your name, email address, shipping address, and payment information.<br />
                        - <strong>Use of Information:</strong> We use your information to process orders, communicate with you, and improve our services. We may also use your email address to send you promotional offers and updates, which you can opt out of at any time.<br />
                        - <strong>Data Protection:</strong> We implement various security measures to protect your personal information. However, no method of transmission over the internet or electronic storage is 100% secure.<br />
                        - <strong>Your Rights:</strong> You have the right to access, correct, or delete your personal information. You can update your account information at any time or contact us for assistance.<br />
                        - <strong>Changes to This Policy:</strong> We may update this Privacy Policy periodically. Any changes will be posted on our website, and your continued use of our services constitutes acceptance of the updated policy.<br />
                    </p>
                    <p className="tos_introduce">
                        By creating an account, you acknowledge that you have read and agree to our Terms of Service & Privacy Policy. Thank you.
                    </p>
                    <button className="confirm-btn">Confirm</button>
                </div>
            </div>
        </>
    );
};

export default FooterComponent;
