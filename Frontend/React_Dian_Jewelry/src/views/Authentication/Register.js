import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../styles/Authentication/Register.scss';
import rightImage from '../../assets/img/right.jpeg';
import rightImage2 from '../../assets/img/right2.jpg';
import rightImage3 from '../../assets/img/right3.jpg';
import { getUserInfo } from '../../services/UserService';

const Register = () => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const togglePassword = document.getElementById('togglePassword');
        const handleTogglePassword = () => {
            const password = document.getElementById('password');
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);
            togglePassword.classList.toggle('fa-eye');
            togglePassword.classList.toggle('fa-eye-slash');
        };

        const toggleRePassword = document.getElementById('toggleRePassword');
        const handleToggleRePassword = () => {
            const rePassword = document.getElementById('re_password');
            const type = rePassword.getAttribute('type') === 'password' ? 'text' : 'password';
            rePassword.setAttribute('type', type);
            toggleRePassword.classList.toggle('fa-eye');
            toggleRePassword.classList.toggle('fa-eye-slash');
        };

        togglePassword.addEventListener('click', handleTogglePassword);
        toggleRePassword.addEventListener('click', handleToggleRePassword);

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

        const btnSuccessPopup = document.getElementById("successPopup");
        btnSuccessPopup.onclick = async function (e) {
            e.preventDefault();
            setLoading(true);
            const firstName = document.getElementById("first_name").value.trim();
            const lastName = document.getElementById("last_name").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();
            const rePassword = document.getElementById("re_password").value.trim();
            const tosCheckbox = document.getElementById("tos_checkbox");

            if (!firstName || !lastName || !email || !password || !rePassword) {
                swal({
                    title: "Fields haven't filled in all yet!",
                    text: "Please fill in all fields first.",
                    icon: "error",
                    button: {
                        text: "Ok",
                        className: "swal-button"
                    },
                });
                setLoading(false);
                return;
            }

            const isValidEmail = (email) => {
                const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                return emailPattern.test(email);
            }

            if (!isValidEmail(email)) {
                swal({
                    title: "Wrong email format!",
                    text: "Please enter a valid email.",
                    icon: "error",
                    button: {
                        text: "Ok",
                        className: "swal-button"
                    },
                });
                setLoading(false);
                return;
            }

            if (password !== rePassword) {
                swal({
                    title: "Passwords have to be the same!",
                    text: "Please try again.",
                    icon: "error",
                    button: {
                        text: "Ok",
                        className: "swal-button"
                    },
                });
                setLoading(false);
                return;
            }

            if (!tosCheckbox.checked) {
                swal({
                    title: "Have not agreed to term of service!",
                    text: "Cannot sign up if you do not agree with our terms of service.",
                    icon: "error",
                    button: {
                        text: "Ok",
                        className: "swal-button"
                    },
                });
                setLoading(false);
                return;
            }

            try {
                const userInfoRes = await getUserInfo(email);
                if (userInfoRes && userInfoRes.data) {
                    swal({
                        title: "Email has been registered!",
                        text: "Please use another email to sign up.",
                        icon: "error",
                        button: {
                            text: "Ok",
                            className: "swal-button"
                        },
                    });
                    setLoading(false);
                    return;
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.log('Email not found, safe to proceed with registration.');
                } else {
                    console.error("Error checking email existence: ", error);
                    setLoading(false);
                    return;
                }
            }

            const requestData = {
                firstName,
                lastName,
                email,
                password
            };

            try {
                const response = await fetch('https://localhost:7184/api/accounts/registercustomer', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestData)
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();

                if (result.success) {
                    swal({
                        title: "Error!",
                        text: result.message || "Registration failed. Please try again.",
                        icon: "error",
                        button: {
                            text: "Ok",
                            className: "swal-button"
                        },
                    });
                } else {
                    swal({
                        title: "Sign up successfully!",
                        text: "You have signed up a new account.",
                        icon: "success",
                        button: {
                            text: "Ok",
                            className: "swal-button"
                        },
                    }).then(() => {
                        window.location.href = "/login";
                    });
                }
            } catch (error) {
                swal({
                    title: "Error!",
                    text: "Registration failed. Please try again.",
                    icon: "error",
                    button: {
                        text: "Ok",
                        className: "swal-button"
                    },
                });
            } finally {
                setLoading(false);
            }
        }

        return () => {
            togglePassword.removeEventListener('click', handleTogglePassword);
            toggleRePassword.removeEventListener('click', handleToggleRePassword);
        };
    }, []);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: "linear",
        nextArrow: <div className="login_slider_arrow login_slider_next"><i className="login_left_arrow fas fa-chevron-right"></i></div>,
        prevArrow: <div className="login_slider_arrow login_slider_prev"><i className="login_right_arrow fas fa-chevron-left"></i></div>
    };

    return (
        <div className="register_main_container container-fluid">
            <div className="register_wrapper">
                {/* Left Side: register Form */}
                <div className="register_left_side col-md-6">
                    <form className="sign_up_form">
                        <h3 className="sign_up_title">Sign up</h3>
                        <div className="name_section">
                            <div className="name_section_row">
                                <div className="first_name_wrapper">
                                    <label className="first_name_label" htmlFor="first_name">First name</label>
                                    <input type="text" className="form-control" id="first_name" placeholder="Enter first name" required />
                                </div>
                                <div className="last_name_wrapper">
                                    <label className="last_name_label" htmlFor="last_name">Last name</label>
                                    <input type="text" className="form-control" id="last_name" placeholder="Enter last name" required />
                                </div>
                            </div>
                        </div>
                        <div className="email_section">
                            <label className="email_label" htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter email" required />
                        </div>
                        <div className="password_section mb-3 position-relative">
                            <label className="password_label" htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Enter password" required />
                            <span className="password_eye">
                                <i className="far fa-eye" id="togglePassword" style={{ cursor: 'pointer' }}></i>
                            </span>
                        </div>
                        <div className="re_password_section mb-3 position-relative">
                            <label className="password_label" htmlFor="re_password">Re-enter password</label>
                            <input type="password" className="form-control" id="re_password" placeholder="Re-enter password" required />
                            <span className="re_password_eye">
                                <i className="far fa-eye" id="toggleRePassword" style={{ cursor: 'pointer' }}></i>
                            </span>
                        </div>
                        <div className="term_of_service mb-3">
                            <input id="tos_checkbox" type="checkbox" />
                            <label style={{ fontSize: '13px' }} className="tos">I agree with the <a className="tos_link" href="#" id="tosLink">Terms of Service & Privacy Policy</a></label>
                        </div>
                        <div className="submit_section">
                            <button id="successPopup" type="submit" className="sign_up_button btn btn-block" disabled={loading}>
                                {loading && <i className="fas fa-spinner fa-spin" style={{ marginRight: '5px' }}></i>}
                                Sign up
                            </button>
                        </div>
                        <div className="sign_up_section">
                            <span>Already have an account? <a className="sign_up_link" href="/login">Sign in</a></span>
                        </div>
                        <div className="google_section text-center">
                            <hr className="line" />
                            <button type="button" className="google_login btn btn-block">
                                <i className="icon_gg fab fa-google"></i> Sign in with Google Account
                            </button>
                        </div>
                    </form>
                </div>

                <div className="register_right_side col-md-6 p-0">
                    <Slider {...sliderSettings}>
                        <div>
                            <img className="register_image" src={rightImage} alt="Ring photo" />
                        </div>
                        <div>
                            <img className="register_image" src={rightImage2} alt="Ring photo" />
                        </div>
                        <div>
                            <img className="register_image" src={rightImage3} alt="Model with jewelry photo" />
                        </div>
                    </Slider>
                </div>
            </div>
            <div id="tosModal" className="modal">
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
        </div>
    );
};

export default Register;
