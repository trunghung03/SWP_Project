import React, { useEffect } from 'react';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Authentication/ResetPassword.scss';
import rightImage from '../../assets/img/rightImage.png';


const ResetPassword = () => {
    useEffect(() => {
        const togglePassword = document.getElementById('togglePassword');
        if (togglePassword) {
            togglePassword.addEventListener('click', function () {
                const password = document.getElementById('password');
                const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
                password.setAttribute('type', type);
                this.classList.toggle('fa-eye');
                this.classList.toggle('fa-eye-slash');
            });
        }

        const toggleRePassword = document.getElementById('toggleRePassword');
        if (toggleRePassword) {
            toggleRePassword.addEventListener('click', function () {
                const password = document.getElementById('re_password');
                const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
                password.setAttribute('type', type);
                this.classList.toggle('fa-eye');
                this.classList.toggle('fa-eye-slash');
            });
        }

        const btnSuccessPopup = document.getElementById("successPopup");
        if (btnSuccessPopup) {
            btnSuccessPopup.onclick = function (e) {
                e.preventDefault();
                const password = document.getElementById("password").value;
                const rePassword = document.getElementById("re_password").value;
                if (password && rePassword) {
                    if (password === rePassword) {
                        swal({
                            title: "Success!",
                            text: "Reset password successfully!",
                            icon: "success",
                            button: {
                                text: "Ok",
                                className: "swal-button"
                            },
                        }).then(() => {
                            window.location.href = "/login";
                        });
                    } else {
                        swal({
                            title: "Error!",
                            text: "Passwords have to be the same.",
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
                        text: "Please enter both passwords.",
                        icon: "error",
                        button: {
                            text: "Ok",
                            className: "swal-button"
                        },
                    });
                }
            };
        }
    }, []);

    return (
        <div className="main_container container-fluid">
            <div className="row min-vh-100">
                {/* Left Side: Reset Password Form */}
                <div className="col-md-6 d-flex align-items-center justify-content-center">
                    <div className="w-75">
                        <form className="sign_up_form">
                            <h3 className="sign_up_title">Reset password</h3>
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
                            <div className="submit_section">
                                <button id="successPopup" type="submit" className="reset_button btn btn-block">Reset password</button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right Side: Image */}
                <div className="col-md-6 p-0">
                    <img className="right_image" src={rightImage} alt="Ring photo" />
                </div>
            </div>

            {/* Popup */}
            <div id="successModal" className="modal">
                <div className="modal-content">
                    <span className="close" style={{ textAlign: 'end' }}>&times;</span>
                    <div className="icon-wrapper">
                        <i className="fas fa-check-circle icon-check"></i>
                    </div>
                    <h4 className="success_title">Reset password successfully!</h4>
                    <button className="confirm-btn">Confirm</button>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
