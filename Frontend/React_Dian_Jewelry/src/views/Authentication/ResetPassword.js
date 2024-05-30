import React, { useEffect } from 'react';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Authentication/ResetPassword.scss';
import rightImage from '../../assets/img/rightImage.png';

const ResetPassword = () => {
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

        const btnReset = document.getElementById("resetPasswordButton");
        btnReset.onclick = function (e) {
            e.preventDefault();
            const password = document.getElementById("password").value.trim();
            const rePassword = document.getElementById("re_password").value.trim();

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
                return;
            }

            swal({
                title: "Reset password successfully!",
                text: "You can sign in with new password now.",
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
        <div className="rp_main_container container-fluid">
            <div className="rp_wrapper">
                {/* Left Side: Reset Password Form */}
                <div className="rp_left_side col-md-6">
                    <form className="reset_password_form">
                        <h3 className="reset_password_title">Reset password</h3>
                        <div className="rp_password_section mb-3 position-relative">
                            <label className="rp_password_label" htmlFor="password">Enter new password</label>
                            <input type="password" className="form-control" id="password" placeholder="Enter new password" required />
                            <span className="rp_password_eye">
                                <i className="far fa-eye" id="togglePassword" style={{ cursor: 'pointer' }}></i>
                            </span>
                        </div>
                        <div className="rp_re_password_section mb-3 position-relative">
                            <label className="rp_password_label" htmlFor="re_password">Re-enter password</label>
                            <input type="password" className="form-control" id="re_password" placeholder="Re-enter password" required />
                            <span className="rp_re_password_eye">
                                <i className="far fa-eye" id="toggleRePassword" style={{ cursor: 'pointer' }}></i>
                            </span>
                        </div>
                        <div className="rp_submit_section">
                            <button id="resetPasswordButton" type="submit" className="rp_button btn btn-block">Reset password</button>
                        </div>
                    </form>
                </div>

                {/* Right Side: Image */}
                <div className="rp_right_side col-md-6 p-0">
                    <img className="rp_right_image" src={rightImage} alt="Ring photo" />
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
