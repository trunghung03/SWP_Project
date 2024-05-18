import React, { useEffect } from 'react';
import swal from 'sweetalert';
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
                        title: "Error!",
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
                    title: "Error!",
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
        <div className="main_container container-fluid">
            <div className="row min-vh-100">
                {/* Left Side: Forgot Password Form */}
                <div className="left_section col-md-6">
                    <div className="w-75">
                        <form className="forgot_password_form">
                            <h3 className="forgot_password_title">Forgot password</h3>
                            <p className="sub_title">Enter your email so that we can send a verify email to reset password</p>
                            <div className="email_section">
                                <label className="email_label" htmlFor="email">Email</label>
                                <input type="email" className="form-control" id="email" placeholder="Enter email" required />
                            </div>
                            <div className="submit_section">
                                <button id="emailPopup" type="submit" className="sign_in_button btn btn-block">Send verify email</button>
                            </div>
                            <a className="back_to_login" href="/login">&lt; Back to login</a>
                        </form>
                    </div>
                </div>

                {/* Right Side: Image */}
                <div className="right_section col-md-6 p-0">
                    <img className="right_image" src={rightImage} alt="Ring photo" />
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
