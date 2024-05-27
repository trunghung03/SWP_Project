import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Authentication/Login.scss';
import rightImage from '../../assets/img/rightImage.png';
import { loginApi, getUserInfo } from '../../services/UserService';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setError('');
        try {
            let res = await loginApi(email, password);
            if (res && res.data && res.data.token) {
                localStorage.setItem("token", res.data.token);
                console.log(">>> check login: ", res.data);

                // Fetch user info
                let userInfoRes = await getUserInfo(email);
                if (userInfoRes && userInfoRes.data) {
                    localStorage.setItem("firstName", userInfoRes.data.firstName);
                    localStorage.setItem("lastName", userInfoRes.data.lastName);
                    localStorage.setItem("points", userInfoRes.data.points);
                }

                navigate('/home');
            } else {
                setError("Login failed: Invalid email or password");
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError("Login failed: Invalid email or password");
            } else {
                setError("Login failed: An unexpected error occurred");
            }
            console.error("Login failed: ", error);
        }
    }

    useEffect(() => {
        const togglePassword = document.getElementById('togglePassword');
        const handleTogglePassword = () => {
            const passwordField = document.getElementById('password');
            const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordField.setAttribute('type', type);
            togglePassword.classList.toggle('fa-eye');
            togglePassword.classList.toggle('fa-eye-slash');
        };

        togglePassword.addEventListener('click', handleTogglePassword);

        return () => {
            togglePassword.removeEventListener('click', handleTogglePassword);
        };
    }, []);

    return (
        <div className="main_container">
            <div className="login_wrapper">
                {/* Left Side: Sign In Form */}
                <div className="left_side">
                    <form className="sign_in_form" onSubmit={handleLogin}>
                        <h3 className="sign_in_title">Sign in</h3>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="email_section">
                            <label className="email_label" htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="password_section mb-3 position-relative">
                            <label className="password_label" htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
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

                {/* Right Side: Image */}
                <div className="right_side">
                    <img className="right_image" src={rightImage} alt="Ring photo" />
                </div>
            </div>
        </div>
    );
};

export default Login;
