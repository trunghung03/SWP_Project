import React, { useEffect } from 'react';
import swal from 'sweetalert';
import '../../styles/Authentication/Register.scss';
import rightImage from '../../assets/img/register.jpg';

const Register = () => {
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
        btnSuccessPopup.onclick = function (e) {
            e.preventDefault();
            const firstName = document.getElementById("first_name").value.trim();
            const lastName = document.getElementById("last_name").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();
            const rePassword = document.getElementById("re_password").value.trim();
            const tosCheckbox = document.getElementById("tos_checkbox");

            if (!firstName || !lastName || !email || !password || !rePassword) {
                swal({
                    title: "Error!",
                    text: "Please fill all fields first.",
                    icon: "error",
                    button: {
                        text: "Ok",
                        className: "swal-button"
                    },
                });
                return;
            }

            const isValidEmail = (email) => {
                const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                return emailPattern.test(email);
            }

            if (!isValidEmail(email)) {
                swal({
                    title: "Error!",
                    text: "Please enter a valid email.",
                    icon: "error",
                    button: {
                        text: "Ok",
                        className: "swal-button"
                    },
                });
                return;
            }

            if (password !== rePassword) {
                swal({
                    title: "Error!",
                    text: "Passwords have to be the same.",
                    icon: "error",
                    button: {
                        text: "Ok",
                        className: "swal-button"
                    },
                });
                return;
            }

            if (!tosCheckbox.checked) {
                swal({
                    title: "Error!",
                    text: "You have not agreed to the term of service.",
                    icon: "error",
                    button: {
                        text: "Ok",
                        className: "swal-button"
                    },
                });
                return;
            }

            swal({
                title: "Success!",
                text: "You have signed up successfully.",
                icon: "success",
                button: {
                    text: "Ok",
                    className: "swal-button"
                },
            }).then(() => {
                window.location.href = "/login";
            });
        }

        return () => {
            togglePassword.removeEventListener('click', handleTogglePassword);
            toggleRePassword.removeEventListener('click', handleToggleRePassword);
        };
    }, []);

    return (
        <div className="main_container container-fluid">
            <div className="row min-vh-100">
                <div className="left_section col-md-6">
                    <div className="w-75">
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
                                <label style={{ fontSize: '13px' }} className="tos">By signing up, I agree with the <a className="tos_link" href="#" id="tosLink">Terms of Service & Privacy Policy</a></label>
                            </div>
                            <div className="submit_section">
                                <button id="successPopup" type="submit" className="sign_up_button btn btn-block">Sign up</button>
                            </div>
                            <div className="sign_up_section">
                                <span>Already have an account? <a className="sign_up_link" href="/login">Sign in</a></span>
                            </div>
                            <div className="google_section text-center">
                                <hr className="line" />
                                <button type="button" className="google_login btn btn-block">
                                    <i className="icon_gg fab fa-google"></i> Sign up with Google Account
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="right_section col-md-6 p-0">
                    <img className="register_image" src={rightImage} alt="Ring photo" />
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
        </div>
    );
};

export default Register;
