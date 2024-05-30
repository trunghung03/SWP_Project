import React, { useEffect } from 'react';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Authentication/ForgotPassword.scss';
import rightImage from '../../assets/img/rightImage.png';

const ForgotPassword = () => {
    useEffect(() => {
        const btn = document.getElementById("emailPopup");
        btn.onclick = function (e) {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

            if (email) {
                if (emailPattern.test(email)) {
                    swal({
                        title: "Email sent!",
                        text: "Check your email to confirm for reset password.",
                        icon: "success",
                        button: {
                            text: "Ok",
                            className: "swal-button"
                        },
                    }).then(() => {
                        window.location.href = "/resetPassword";
                    });
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
            }
        };

        const modal = document.getElementById("emailModal");
        const span = document.getElementsByClassName("close")[0];
        const confirmBtn = document.getElementsByClassName("confirm-btn")[0];

        span.onclick = function () {
            modal.style.display = "none";
        };
        confirmBtn.onclick = function () {
            modal.style.display = "none";
        };
        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        };
    }, []);

    return (
        <div className="fp_main_container container-fluid">
            <div className="fp_wrapper">
                {/* Left Side: Forgot Password Form */}
                <div className="fp_left_side col-md-6 d-flex align-items-center justify-content-center">
                    <form className="forgot_password_form">
                        <h3 className="forgot_password_title">Forgot password</h3>
                        <p className="fp_sub_title">Enter your account's email so that we can send a verify email to confirm for reset password</p>
                        <div className="fp_email_section">
                            <label className="fp_email_label" htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter email" required />
                        </div>
                        <div className="fp_submit_section">
                            <button id="emailPopup" type="submit" className="fp_button btn btn-block">Send verify email</button>
                        </div>
                        <a className="back_to_login" href="/login">&lt; Back to login</a>
                    </form>
                </div>

                {/* Right Side: Image */}
                <div className="fp_right_side col-md-6 p-0">
                    <img className="fp_right_image" src={rightImage} alt="Ring photo" />
                </div>
            </div>

            {/* Popup */}
            <div id="emailModal" className="modal">
                <div className="modal-content">
                    <span className="close" style={{ textAlign: 'end' }}>&times;</span>
                    <div className="icon-wrapper">
                        <i className="fas fa-envelope icon-email"></i>
                    </div>
                    <h4 className="popup_title">Check your email to confirm for reset password!</h4>
                    <button className="confirm-btn">Confirm</button>
                </div>
            </div>

        </div>
    );
};

export default ForgotPassword;
