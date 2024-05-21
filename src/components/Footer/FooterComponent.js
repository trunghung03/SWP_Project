import React, { useEffect } from 'react';
import '../Footer/FooterComponent.scss';

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

    return (
        <>
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <h6>About Us</h6>
                            <ul className="footer_content">
                                <li><a href="#">Our story</a></li>
                                <li><a href="#">Our mission</a></li>
                                <li><a href="#">The difference</a></li>
                            </ul>
                            <br />
                            <h6>Education Blog</h6>
                            <ul className="footer_content">
                                <li><a href="#">Link 1</a></li>
                                <li><a href="#">Link 2</a></li>
                                <li><a href="#">Link 3</a></li>
                                <li><a href="#">Link 4</a></li>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <h6>Service</h6>
                            <ul className="footer_content">
                                <li><a href="#">FAQs</a></li>
                                <li><a href="#">Tracking orders</a></li>
                                <li><a href="#">Promotional codes</a></li>
                            </ul>
                            <br />
                            <h6>Collections</h6>
                            <ul className="footer_content">
                                <li><a href="#">Ring</a></li>
                                <li><a href="#">Earings</a></li>
                                <li><a href="#">Engagement ring</a></li>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <h6>Contact Us</h6>
                            <ul className="footer_content">
                                <li><a href="#">0912 345 678</a></li>
                                <li><a href="#">email@gmail.com</a></li>
                                <li><a href="#">Social media</a></li>
                            </ul>
                            <br />
                            <h6>Social Media</h6>
                            <ul className="footer_content social_media_icon" style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '20px' }}>
                                <li><a href="#"><i className="fb fab fa-facebook-f"></i></a></li>
                                <li><a href="#"><i className="ins fab fa-instagram"></i></a></li>
                                <li><a href="#"><i className="tik fab fa-tiktok"></i></a></li>
                                <li><a href="#"><i className="gg fab fa-google"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <hr className="hr_footer" />
                    <div className="copyright row">
                        <div className="col-md-12 text-center">
                            <p>Copyright ©2024 Dian Jewelry | <a className="tos_link" id="tosLink" href="#tos">Terms of Service & Privacy Policy</a></p>
                        </div>
                    </div>
                </div>
            </footer>

            <div id="tosModal" className="modal" style={{ zIndex: 1000 }}>
                <div className="modal-content" style={{ zIndex: 1001 }}>
                    <span className="close" style={{ textAlign: 'end' }}>&times;</span>
                    <h4 className="tos_title">Terms of Service & Privacy Policy</h4>
                    <p className="tos_introduce">
                        Welcome to Dian Jewelry! By signing up and creating an account on our website,
                        you agree to the following terms, conditions and private policy.
                    </p>
                    <p>
                        - Account Creation: You must provide accurate and complete information during the registration process.
                        You are responsible for maintaining the confidentiality of your account information and password.<br />
                        - Purchases and Payments: Payments must be made through the provided payment options. All sales are final, and returns or exchanges are subject to our return policy.<br />
                        - User Conduct: You agree not to use our website for any unlawful purposes or to engage in any conduct that could damage or impair the functionality of our services.<br />
                        - Information Collection: We collect personal information when you create an account, make a purchase, or contact us. This includes your name, email address, shipping address, and payment information.<br />
                        - Use of Information: We use your information to process orders, communicate with you, and improve our services. We may also use your email address to send you promotional offers and updates, which you can opt out of at any time.<br />
                        - Data Protection: We implement various security measures to protect your personal information. However, no method of transmission over the internet or electronic storage is 100% secure.<br />
                        - Your Rights: You have the right to access, correct, or delete your personal information. You can update your account information at any time or contact us for assistance.<br />
                        - Changes to This Policy: We may update this Privacy Policy periodically. Any changes will be posted on our website, and your continued use of our services constitutes acceptance of the updated policy.<br />
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