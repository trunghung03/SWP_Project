import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/Authentication/Login.scss";
import rightImage from "../../assets/img/right.jpeg";
import rightImage2 from "../../assets/img/right2.jpg";
import rightImage3 from "../../assets/img/right3.jpg";

import {
  customerLoginApi,
  employeeLoginApi,
  getUserInfo,
  getEmployeeInfo,
  googleLoginApi,
} from "../../services/UserService";
import { jwtDecode } from "jwt-decode";
import { useCart } from "../../services/CartService";
import { UserContext } from "../../services/UserContext";
import { GoogleLogin } from "@react-oauth/google";
import CryptoJS from 'crypto-js';

const SECRET_KEY = 'ERKufIf8ZD8FBGqYYP8n3xKdda9i3kh2X0N8CBBh7uY='; 

const encryptPassword = (password) => {
  return CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
};

const decryptPassword = (encryptedPassword) => {
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setCartItemsForUser } = useCart();

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    const rememberedPasswordEncrypted = localStorage.getItem("rememberedPassword");

    const allCartItems = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("cartItems")) {
        allCartItems[key] = localStorage.getItem(key);
      }
    }

    localStorage.clear();
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("email");
    localStorage.removeItem("points");

    if (rememberedEmail && rememberedPasswordEncrypted) {
      const rememberedPassword = decryptPassword(rememberedPasswordEncrypted);
      localStorage.setItem("rememberedEmail", rememberedEmail);
      localStorage.setItem("rememberedPassword", rememberedPasswordEncrypted);
      setEmail(rememberedEmail);
      setPassword(rememberedPassword);
      setRememberMe(true);
    }

    for (const key in allCartItems) {
      localStorage.setItem(key, allCartItems[key]);
    }
  }, []);

  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    if (!isValidEmail(email)) {
      toast.error("Wrong email format! Please enter a valid email.", {
        position: "top-right",
        autoClose: 3000
      });
      setLoading(false);
      return;
    }

    try {
      const userInfoRes = await getUserInfo(email);

      if (userInfoRes.data) {
        const res = await customerLoginApi(email, password);
        handleLoginResponse(res, userInfoRes.data, "customer");
      }
    } catch (error) {
      try {
        const employeeInfoRes = await getEmployeeInfo(email);

        if (employeeInfoRes.data) {
          const res = await employeeLoginApi(email, password);
          handleLoginResponse(res, employeeInfoRes.data, "employee");
        }
      } catch (error) {
        toast.error("Wrong email or password! Please try again.", {
          position: "top-right",
          autoClose: 3000
        });
        console.error("Login failed: ", error);
        setLoading(false);
      }
    }
  };

  const handleLoginResponse = (res, userInfo, userType) => {
    if (res && res.data && res.data.token) {
      if (!userInfo.status) {
        toast.error("Account is deactivated! Please contact us if this is a mistake.", {
          position: "top-right",
          autoClose: 3000
        });
        setLoading(false);
        return;
      }
      handleSuccessfulLogin(res.data.token, userType, userInfo.customerId);
    }
  };

  const handleSuccessfulLogin = async (token, userType, customerId) => {
    localStorage.setItem("token", token);
    const decodedToken = jwtDecode(token);
    const role = decodedToken.role;

    if (role) {
      localStorage.setItem("role", role);
      console.log("Role: ", role);

      if (role === "Admin") {
        if (userType === "employee") {
          let employeeInfoRes = await getEmployeeInfo(email);
          if (employeeInfoRes && employeeInfoRes.data) {
            localStorage.setItem("employeeId", employeeInfoRes.data.employeeId);
            localStorage.setItem("firstName", employeeInfoRes.data.firstName);
            localStorage.setItem("lastName", employeeInfoRes.data.lastName);
          }
        }
        navigate("/admin-customer-list");
      } else if (role === "Manager") {
        if (userType === "employee") {
          let employeeInfoRes = await getEmployeeInfo(email);
          if (employeeInfoRes && employeeInfoRes.data) {
            localStorage.setItem("employeeId", employeeInfoRes.data.employeeId);
            localStorage.setItem("firstName", employeeInfoRes.data.firstName);
            localStorage.setItem("lastName", employeeInfoRes.data.lastName);
          }
        }
        navigate("/manager-statistic");
      } else if (role === "SalesStaff") {
        if (userType === "employee") {
          let employeeInfoRes = await getEmployeeInfo(email);
          if (employeeInfoRes && employeeInfoRes.data) {
            localStorage.setItem("employeeId", employeeInfoRes.data.employeeId);
            localStorage.setItem("firstName", employeeInfoRes.data.firstName);
            localStorage.setItem("lastName", employeeInfoRes.data.lastName);
          }
        }
        navigate("/sales-staff-order-list");
      } else if (role === "DeliveryStaff") {
        if (userType === "employee") {
          let employeeInfoRes = await getEmployeeInfo(email);
          if (employeeInfoRes && employeeInfoRes.data) {
            localStorage.setItem("employeeId", employeeInfoRes.data.employeeId);
            localStorage.setItem("firstName", employeeInfoRes.data.firstName);
            localStorage.setItem("lastName", employeeInfoRes.data.lastName);
          }
        }
        navigate("/delivery-staff-delivery-list");
      } else if (role === "Customer") {
        if (userType === "customer") {
          let userInfoRes = await getUserInfo(email);
          if (userInfoRes && userInfoRes.data) {
            localStorage.setItem("customerId", userInfoRes.data.customerId);
            localStorage.setItem("email", userInfoRes.data.email);
            localStorage.setItem("firstName", userInfoRes.data.firstName);
            localStorage.setItem("lastName", userInfoRes.data.lastName);
            localStorage.setItem("points", userInfoRes.data.points);
            localStorage.setItem("address", userInfoRes.data.address);
            localStorage.setItem("phone", userInfoRes.data.phoneNumber);

            setUser({
              firstName: userInfoRes.data.firstName,
              lastName: userInfoRes.data.lastName,
              email: userInfoRes.data.email,
              points: userInfoRes.data.points,
            });

            setCartItemsForUser(userInfoRes.data.customerId);
          }
        }
        navigate("/home");
      } else {
        setError("Login failed: Unknown role");
      }

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
        const encryptedPassword = encryptPassword(password);
        localStorage.setItem("rememberedPassword", encryptedPassword);
      } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberedPassword");
      }
    } else {
      setError("Login failed: No role found");
    }

    setLoading(false);
  };

  useEffect(() => {
    const togglePassword = document.getElementById("togglePassword");
    const handleTogglePassword = () => {
      const passwordField = document.getElementById("password");
      const type =
        passwordField.getAttribute("type") === "password" ? "text" : "password";
      passwordField.setAttribute("type", type);
      togglePassword.classList.toggle("fa-eye");
      togglePassword.classList.toggle("fa-eye-slash");
    };

    togglePassword.addEventListener("click", handleTogglePassword);

    return () => {
      togglePassword.removeEventListener("click", handleTogglePassword);
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
    nextArrow: (
      <div className="login_slider_arrow login_slider_next">
        <i className="login_left_arrow fas fa-chevron-right"></i>
      </div>
    ),
    prevArrow: (
      <div className="login_slider_arrow login_slider_prev">
        <i className="login_right_arrow fas fa-chevron-left"></i>
      </div>
    ),
  };

  const onSuccess = async (res) => {
    const decoded = jwtDecode(res.credential);

    const body = {
      email: decoded.email,
      password: "123",
      lastName: decoded.family_name,
      firstName: decoded.given_name,
      address: "",
      phoneNumber: "",
      accountType: "Google",
      points: 0,
    };

    const userInfoRes = await googleLoginApi(body);
    localStorage.setItem("token", userInfoRes.data.token);
    let userGGInfoRes = await getUserInfo(decoded.email);

    if (userInfoRes.status === 200) {
      setUser({
        firstName: decoded.given_name,
        lastName: decoded.family_name,
        email: decoded.email,
        points: userGGInfoRes.data.points,
      });
      localStorage.setItem("role", "Customer");
      localStorage.setItem("customerId", userGGInfoRes.data.customerId);
      localStorage.setItem("Google", "Yes");
      navigate("/home");
    }
  };

  const onFailure = (res) => { };

  const handleGuestLogin = () => {
    navigate("/home");
  };

  return (
    <div className="main_container">
      <ToastContainer /> 
      <div className="login_wrapper">
        <div className="left_side">
          <form className="sign_in_form" onSubmit={handleLogin}>
            <h3 className="sign_in_title">Sign in</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="email_section">
              <label className="email_label" htmlFor="email">
                Email
              </label>
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
              <label className="password_label" htmlFor="password">
                Password
              </label>
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
                <i
                  className="far fa-eye"
                  id="togglePassword"
                  style={{ cursor: "pointer" }}
                ></i>
              </span>
            </div>
            <div className="remember_forgot_section mb-3">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label className="remember_me">Remember me</label>
              <Link className="forgot_password_link" to="/forgot-password">
                Forgot password?
              </Link>
            </div>
            <div className="submit_section">
              <button
                type="submit"
                className="sign_in_button btn btn-block"
                disabled={loading}
              >
                {loading && (
                  <i
                    className="fas fa-spinner fa-spin"
                    style={{ marginRight: "5px" }}
                  ></i>
                )}
                Sign in
              </button>
            </div>
            <div className="sign_up_section">
              <span>
                Don't have an account?{" "}
                <Link className="sign_up_link" to="/register">
                  Sign up
                </Link>
              </span>
            </div>
            <div className="google_section text-center">
              <hr className="line" />
              <div className="google_guest_section">
                <GoogleLogin
                  className="google_login_btn"
                  buttonText="Login with Google"
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  render={(renderProps) => (
                    <button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      className="google_custom_btn"
                    >
                      <i className="fab fa-google google-icon"></i> Continue with Google
                    </button>
                  )}
                />
                <div
                  className="guest_login_section"
                  onClick={handleGuestLogin}
                  style={{ cursor: "pointer" }}
                >
                  Guest
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="right_side">
          <Slider {...sliderSettings}>
            <div>
              <img className="right_image" src={rightImage} alt="Ring photo" />
            </div>
            <div>
              <img
                className="right_image"
                src={rightImage2}
                alt="Ring photo"
              />
            </div>
            <div>
              <img className="right_image" src={rightImage3} alt="" />
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Login;
