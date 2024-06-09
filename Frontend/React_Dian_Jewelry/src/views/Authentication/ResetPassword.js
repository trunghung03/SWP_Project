import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Authentication/ResetPassword.scss';
import rightImage from '../../assets/img/right.jpeg';
import rightImage2 from '../../assets/img/right2.jpg';
import rightImage3 from '../../assets/img/right3.jpg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { resetPasswordApi } from '../../services/UserService';
import { useLocation } from 'react-router-dom';

const ResetPassword = () => {
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const location = useLocation();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const token = urlParams.get('token');
        if (token) {
            localStorage.setItem('resetPasswordToken', token);
        }
    }, [location]);

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

        return () => {
            togglePassword.removeEventListener('click', handleTogglePassword);
            toggleRePassword.removeEventListener('click', handleToggleRePassword);
        };
    }, []);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!password || !rePassword) {
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

        try {
            const email = localStorage.getItem('resetPasswordEmail');
            const token = localStorage.getItem('resetPasswordToken');
            await resetPasswordApi({ email, token, password, confirmPassword: rePassword });
            swal({
                title: "Reset password successfully!",
                text: "You can sign in with new password now.",
                icon: "success",
                button: {
                    text: "Ok",
                    className: "swal-button"
                },
            }).then(() => {
                localStorage.removeItem('resetPasswordEmail');
                localStorage.removeItem('resetPasswordToken');
                window.location.href = "/login";
            });
        } catch (error) {
            swal({
                title: "Error resetting password!",
                text: "Failed to reset the password. Please try again later.",
                icon: "error",
                button: {
                    text: "Ok",
                    className: "swal-button"
                },
            });
        } finally {
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
        <div className="rp_main_container container-fluid">
            <div className="rp_wrapper">
                {/* Left Side: Reset Password Form */}
                <div className="rp_left_side col-md-6">
                    <form className="reset_password_form" onSubmit={handleResetPassword}>
                        <h3 className="reset_password_title">Reset password</h3>
                        <div className="rp_password_section mb-3 position-relative">
                            <label className="rp_password_label" htmlFor="password">Enter new password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter new password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span className="rp_password_eye">
                                <i className="far fa-eye" id="togglePassword" style={{ cursor: 'pointer' }}></i>
                            </span>
                        </div>
                        <div className="rp_re_password_section mb-3 position-relative">
                            <label className="rp_password_label" htmlFor="re_password">Re-enter password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="re_password"
                                placeholder="Re-enter password"
                                value={rePassword}
                                onChange={(e) => setRePassword(e.target.value)}
                                required
                            />
                            <span className="rp_re_password_eye">
                                <i className="far fa-eye" id="toggleRePassword" style={{ cursor: 'pointer' }}></i>
                            </span>
                        </div>
                        <div className="rp_submit_section">
                            <button type="submit" className="rp_button btn btn-block" disabled={loading}>
                                {loading && <i className="fas fa-spinner fa-spin" style={{ marginRight: '5px' }}></i>}
                                Reset password
                            </button>
                        </div>
                    </form>
                </div>

                {/* Right Side: Image */}
                <div className="rp_right_side col-md-6 p-0">
                    <Slider {...sliderSettings}>
                        <div>
                            <img className="rp_right_image" src={rightImage} alt="Ring photo" />
                        </div>
                        <div>
                            <img className="rp_right_image" src={rightImage2} alt="Ring photo" />
                        </div>
                        <div>
                            <img className="rp_right_image" src={rightImage3} alt="Model with jewelry photo" />
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
