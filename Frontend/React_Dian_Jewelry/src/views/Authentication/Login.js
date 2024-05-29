import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import '../../styles/Authentication/Login.scss';
import rightImage from '../../assets/img/rightImage.png';
import { customerLoginApi, employeeLoginApi, getUserInfo, getEmployeeInfo } from '../../services/UserService';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        const rememberedPassword = localStorage.getItem('rememberedPassword');

        if (rememberedEmail && rememberedPassword) {
            setEmail(rememberedEmail);
            setPassword(rememberedPassword);
            setRememberMe(true);
        }
    }, []);

    const isValidEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailPattern.test(email);
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        setError('');

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
            return;
        }

        let userInfoRes;
        try {
            userInfoRes = await getUserInfo(email);
        } catch (error) {
            console.error("Error checking email existence: ", error);
        }

        let res;

        try {
            res = await customerLoginApi(email, password);

            if (res && res.data && res.data.token) {
                if (userInfoRes.data.password !== password) {
                    swal({
                        title: "Wrong password!",
                        text: "Please try again.",
                        icon: "error",
                        button: {
                            text: "Ok",
                            className: "swal-button"
                        }
                    });
                    return;
                }
                if (!userInfoRes.data.status) {
                    swal({
                        title: "Account is deactivated!",
                        text: "Please contact us if this is a mistake.",
                        icon: "error",
                        buttons: {
                            contact: {
                                text: "Contact",
                                value: "contact",
                                className: "contact-alert-button"
                            }
                        }
                    }).then((value) => {
                        if (value === "contact") {
                            navigate('/contact');
                        }
                    });
                    return;
                }
                handleSuccessfulLogin(res.data.token, 'customer');
                return;
            }
        } catch (error) {
            console.log("Customer login failed, trying employee login...");
        }

        try {
            res = await employeeLoginApi(email, password);

            if (res && res.data && res.data.token) {
                const employeeInfoRes = await getEmployeeInfo(email);
                if (employeeInfoRes && employeeInfoRes.data) {
                    if (employeeInfoRes.data.password !== password) {
                        swal({
                            title: "Wrong password!",
                            text: "Please try again.",
                            icon: "error",
                            button: {
                                text: "Ok",
                                className: "swal-button"
                            }
                        });
                        return;
                    }
                    if (!employeeInfoRes.data.status) {
                        swal({
                            title: "Account is deactivated!",
                            text: "Please contact us if this is a mistake.",
                            icon: "error",
                            buttons: {
                                contact: {
                                    text: "Contact",
                                    value: "contact",
                                    className: "contact-alert-button"
                                }
                            }
                        }).then((value) => {
                            if (value === "contact") {
                                navigate('/contact');
                            }
                        });
                        return;
                    }
                }
                handleSuccessfulLogin(res.data.token, 'employee');
                return;
            }
        } catch (error) {
            swal({
                title: "Email does not exist!",
                text: "Please try other email or sign up an account with this email.",
                icon: "error",
                buttons: {
                    signUp: {
                        text: "Sign up",
                        value: "signUp",
                        className: "swal-button"
                    }
                }
            }).then((value) => {
                if (value === "signUp") {
                    navigate('/register');
                }
            });
            console.error("Login failed: ", error);
        }
    };

    const handleSuccessfulLogin = async (token, userType) => {
        localStorage.setItem("token", token);
        const decodedToken = jwtDecode(token);
        const role = decodedToken.role;

        if (role) {
            localStorage.setItem("role", role);
            console.log("Role: ", role);

            if (role === 'Admin') {
                navigate('/adminCustomerList');
            } else if (role === 'Manager') {
                if (userType === 'employee') {
                    let employeeInfoRes = await getEmployeeInfo(email);
                    if (employeeInfoRes && employeeInfoRes.data) {
                        localStorage.setItem("firstName", employeeInfoRes.data.firstName);
                        localStorage.setItem("lastName", employeeInfoRes.data.lastName);
                    }
                }
                navigate('/managerStatitic');
            } else if (role === 'SalesStaff') {
                navigate('/salesStaffOrderList');
            } else if (role === 'DeliveryStaff') {
                navigate('/deliveryStaffDeliveryList');
            } else if (role === 'Customer') {
                if (userType === 'customer') {
                    let userInfoRes = await getUserInfo(email);
                    if (userInfoRes && userInfoRes.data) {
                        localStorage.setItem("firstName", userInfoRes.data.firstName);
                        localStorage.setItem("lastName", userInfoRes.data.lastName);
                        localStorage.setItem("points", userInfoRes.data.points);
                    }
                }
                navigate('/home');
            } else {
                setError("Login failed: Unknown role");
            }

            if (rememberMe) {
                localStorage.setItem('rememberedEmail', email);
                localStorage.setItem('rememberedPassword', password);
            } else {
                localStorage.removeItem('rememberedEmail');
                localStorage.removeItem('rememberedPassword');
            }
        } else {
            setError("Login failed: No role found");
        }
    };

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
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
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
                <div className="right_side">
                    <img className="right_image" src={rightImage} alt="Ring photo" />
                </div>
            </div>
        </div>
    );
};

export default Login;
