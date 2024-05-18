import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Authentication/Login.scss';
import rightImage from '../../assets/img/rightImage.png';

const Login = () => {
    useEffect(() => {
        const togglePassword = document.getElementById('togglePassword');
        const handleTogglePassword = () => {
            const password = document.getElementById('password');
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);
            togglePassword.classList.toggle('fa-eye');
            togglePassword.classList.toggle('fa-eye-slash');
        };

        togglePassword.addEventListener('click', handleTogglePassword);

        return () => {
            togglePassword.removeEventListener('click', handleTogglePassword);
        };
    }, []);

    // Press sign in direct to home 
    const navigate = useNavigate();
    const handleSignIn = (e) => {
        e.preventDefault();
        navigate('/home');
    };

    return (
        <div className="main_container container-fluid">
            <div className="row min-vh-100">
                {/* Left Side: Sign In Form */}
                <div className="left_section col-md-6">
                    <div className="w-75">
                        <form className="sign_in_form" onSubmit={handleSignIn}>
                            <h3 className="sign_in_title">Sign in</h3>
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
                            <div className="remember_forgot_section mb-3">
                                <input type="checkbox" />
                                <label className="remember_me">Remember me</label>
                                <a className="forgot_password_link" href="/forgotPassword">Forgot password?</a>
                            </div>
                            <div className="submit_section">
                                <button type="submit" className="sign_in_button btn btn-block">Sign in</button>
                            </div>
                            <div className="sign_up_section">
                                <span>Don't have an account? <a className="sign_up_link" href="/register">Sign up</a></span>
                            </div>
                            <div className="google_section text-center">
                                <hr className="line" />
                                <button type="button" className="google_login btn btn-block">
                                    <i className="icon_gg fab fa-google"></i> Sign in with Google Account
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right Side: Image */}
                <div className="right_section col-md-6 p-0">
                    <img className="right_image" src={rightImage} alt="Ring photo" />
                </div>
            </div>
        </div>
    );
};

export default Login;
