import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../styles/Setting/EditProfile.scss';
import SubNav from '../../components/SubNav/SubNav.js';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';

function EditProfile() {
  const navigate = useNavigate();
  const [isPasswordFormVisible, setPasswordFormVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const storedFirstName = localStorage.getItem('firstName');
    const storedLastName = localStorage.getItem('lastName');
    const storedPoints = localStorage.getItem('points');
    if (storedFirstName) setFirstName(storedFirstName);
    if (storedLastName) setLastName(storedLastName);
    if (storedPoints) setPoints(storedPoints);
  }, []);

  const navItems = ['Home', 'Setting', 'Edit Profile'];
  const menuItems = [
    { name: 'Edit Profile', path: '/editProfile', icon: 'fas fa-user-edit', iconClass: 'icon-edit-profile' },
    { name: 'Order History', path: '/orderHistory', icon: 'fas fa-history', iconClass: 'icon-order-history' },
    { name: 'Exchange Point', path: '/exchangePoint', icon: 'fas fa-exchange-alt', iconClass: 'icon-exchange-point' },
  ];

  const togglePasswordForm = () => {
    setPasswordFormVisible(!isPasswordFormVisible);
  };

  const togglePasswordVisibility = (id, eyeId) => {
    const passwordField = document.getElementById(id);
    const eyeIcon = document.getElementById(eyeId);
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    eyeIcon.classList.toggle('fa-eye');
    eyeIcon.classList.toggle('fa-eye-slash');
  };

  return (
    <div className="EditProfile">
      <SubNav items={navItems} />

      <div className="edit_profile_container">
        <div className="setting_menu">
          <div className="setting_menu_section">
            <div className="setting_full_name">{`${firstName} ${lastName}`}</div>
            <div className="setting_point"><p>{`${points} points`}</p></div>
          </div>
          <div className="setting_menu_items">
            {menuItems.map(item => (
              <div
                key={item.path}
                className={`setting_menu_item ${item.path === '/editProfile' ? 'edit-profile-item' : ''}`}
                onClick={() => navigate(item.path)}
              >
                <i className={`${item.icon} setting_menu_icon ${item.iconClass}`}></i>
                <span className="setting_menu_item_name">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="edit_profile_form">
          <h2>Profile Setting</h2>
          <form>
            <div className="edit_form_group">
              <label>First name</label>
              <input type="text" value={firstName} readOnly />
            </div>
            <div className="edit_form_group">
              <label>Last name</label>
              <input type="text" value={lastName} readOnly />
            </div>
            <div className="edit_form_group">
              <label>Email</label>
              <input className="edit_email" type="email" value="example.email@gmail.com" readOnly />
            </div>
            <div className="edit_form_group">
              <label>Phone number</label>
              <input type="text" />
            </div>
            <div className="edit_form_group full_width">
              <label>Address</label>
              <input type="text" />
            </div>
            <button type="button" className="edit_form_save_button">Save change</button>
          </form>

          <hr className="edit_profile_line"></hr>

          <h2 onClick={togglePasswordForm} className="toggle_password_form">
            Change Password
            <i className={`fas ${isPasswordFormVisible ? 'fa-chevron-up' : 'fa-chevron-down'} toggle_icon`}></i>
          </h2>
          {isPasswordFormVisible && (
            <form>
              <div className="edit_form_group full_width position-relative">
                <label>Current password</label>
                <input type="password" id="current_password" />
                <span className="edit_password_eye">
                  <i className="far fa-eye" id="edit_current_password_eye" onClick={() => togglePasswordVisibility('current_password', 'edit_current_password_eye')} style={{ cursor: 'pointer' }}></i>
                </span>
              </div>
              <div className="edit_form_group full_width position-relative">
                <label>New password</label>
                <input type="password" id="new_password" />
                <span className="edit_password_eye">
                  <i className="far fa-eye" id="edit_new_password_eye" onClick={() => togglePasswordVisibility('new_password', 'edit_new_password_eye')} style={{ cursor: 'pointer' }}></i>
                </span>
              </div>
              <div className="edit_form_group full_width position-relative">
                <label>Confirm new password</label>
                <input type="password" id="confirm_password" />
                <span className="edit_password_eye">
                  <i className="far fa-eye" id="edit_confirm_password_eye" onClick={() => togglePasswordVisibility('confirm_password', 'edit_confirm_password_eye')} style={{ cursor: 'pointer' }}></i>
                </span>
              </div>
              <button type="button" className="edit_form_save_button">Save new password</button>
            </form>
          )}
        </div>
      </div>

      <ScrollToTop />
    </div>
  );
}

export default EditProfile;
