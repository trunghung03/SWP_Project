import React, { useState } from 'react';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Authentication/ForgotPassword.scss';
import rightImage from '../../assets/img/right.jpeg';
import rightImage2 from '../../assets/img/right2.jpg';
import rightImage3 from '../../assets/img/right3.jpg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { forgotPasswordApi } from '../../services/UserService';
import { Link } from 'react-router-dom'; 

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const email = document.getElementById("email").value;
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (email) {
            if (emailPattern.test(email)) {
                try {
                    await forgotPasswordApi(email);
                    localStorage.setItem('resetPasswordEmail', email);
                    swal({
                        title: "Mail sent successfully!",
                        text: "Check your email to reset your account password.",
                        icon: "success",
                        button: {
                            text: "Ok",
                            className: "swal-button"
                        },
                    });
                } catch (error) {
                    swal({
                        title: "This email has not sign up an account!",
                        text: "Please try another one.",
                        icon: "error",
                        button: {
                            text: "Ok",
                            className: "swal-button"
                        },
                    });
                } finally {
                    setLoading(false);
                }
            } else {
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
            }
        } else {
            swal({
                title: "Have not enter an email yet!",
                text: "Please enter your email before submitting.",
                icon: "error",
                button: {
                    text: "Ok",
                    className: "swal-button"
                },
            });
            setLoading(false);
        }
    };

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
        <div className="fp_main_container container-fluid">
            <div className="fp_wrapper">
                {/* Left Side: Forgot Password Form */}
                <div className="fp_left_side col-md-6 d-flex align-items-center justify-content-center">
                    <form className="forgot_password_form" onSubmit={handleEmailSubmit}>
                        <h3 className="forgot_password_title">Forgot password</h3>
                        <p className="fp_sub_title">Enter your account's email so that we can send a verify email to confirm for reset password</p>
                        <div className="fp_email_section">
                            <label className="fp_email_label" htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter email" required />
                        </div>
                        <div className="fp_submit_section">
                            <button id="emailPopup" type="submit" className="fp_button btn btn-block" disabled={loading}>
                                {loading && <i className="fas fa-spinner fa-spin" style={{ marginRight: '5px' }}></i>}
                                Send verify email
                            </button>
                        </div>
                        <Link className="back_to_login" to="/login">&lt; Back to login</Link> {/* Updated to Link component */}
                    </form>
                </div>

                {/* Right Side: Image */}
                <div className="fp_right_side col-md-6 p-0">
                    <Slider {...sliderSettings}>
                        <div>
                            <img className="fp_right_image" src={rightImage} alt="Ring photo" />
                        </div>
                        <div>
                            <img className="fp_right_image" src={rightImage2} alt="Ring photo" />
                        </div>
                        <div>
                            <img className="fp_right_image" src={rightImage3} alt="Model with jewelry photo" />
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
