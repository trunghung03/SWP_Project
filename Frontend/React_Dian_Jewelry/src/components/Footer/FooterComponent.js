import React, { useEffect } from 'react';
import '../Footer/FooterComponent.scss';
import { useNavigate } from 'react-router-dom';

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
        navigate(path, { state });
    };

    return (
        <>
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <h6>About Us</h6>
                            <ul className="footer_content">
                                <li><a href="/introduce">Our story</a></li>
                                <li><a href="/introduce">Our mission</a></li>
                                <li><a href="/introduce">The difference</a></li>
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
                                <li><a href="/FAQs">FAQs</a></li>
                                <li><a href="/order-history">Tracking orders</a></li>
                                <li><a href="/edit-profile">My profile</a></li>
                            </ul>
                            <br />
                            <h6>Collections</h6>
                            <ul className="footer_content">
                                <li><a href="" onClick={() => handleNavigate('/collection', { collection: 'blissfulBaubles' })}>Blissful Baubles</a></li>
                                <li><a href="" onClick={() => handleNavigate('/collection', { collection: 'timelessTreasures' })}>Timeless Treasures</a></li>
                                <li><a href="" onClick={() => handleNavigate('/collection', { collection: 'majesticMystique' })} >Majestic Mystique</a></li>
                                <li><a href="" onClick={() => handleNavigate('/collection', { collection: 'vintageVirtue' })}>Vintage Virtue</a></li>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <h6>Contact Us</h6>
                            <ul className="footer_content">
                                <li><a href='tel:0795795959'>0795 795 959</a></li>
                                <li><a href='mailto:diamonddianjewelry@gmail.com'>diamonddianjewelry@gmail.com</a></li>
                                <li><a href="/contact"> </a></li>
                            </ul>
                            <br />
                            <h6>Social Media</h6>
                            <ul className="footer_content social_media_icon" style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '20px' }}>
                                <li><a href="https://www.facebook.com/profile.php?id=61560517631582" target="_blank"><i className="fb fab fa-facebook-f" target="_blank"></i></a></li>
                                <li><a href="https://www.instagram.com/dian_jewelryy" target="_blank"><i className="ins fab fa-instagram"></i></a></li>
                                <li><a href="https://www.tiktok.com/@dianjewelry" target="_blank"><i className="tik fab fa-tiktok"></i></a></li>
                                <li><a href="/home" target="_blank"><i className="gg fab fa-google"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <hr className="hr_footer" />
                    <div className="copyright row">
                        <div className="col-md-12 text-center">
                            <p>Copyright ©2024 Dian Jewelry | <a className="tos_link" id="tosLink" href="#tos"><strong>Terms of Service & Privacy Policy</strong></a></p>
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
