import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import swal from 'sweetalert';
import '../../styles/Setting/EditProfile.scss';
import SubNav from '../../components/SubNav/SubNav.js';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';
import { getUserInfo, updateCustomerInfo } from '../../services/UserService';
import { UserContext } from '../../services/UserContext';
import HeaderComponent from '../../components/Header/HeaderComponent';
import FooterComponent from '../../components/Footer/FooterComponent';


function EditProfile() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [isPasswordFormVisible, setPasswordFormVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [points, setPoints] = useState(0);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [storedPassword, setStoredPassword] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      getUserInfo(storedEmail).then((response) => {
        const userData = response.data;
        setFirstName(userData.firstName || '');
        setLastName(userData.lastName || '');
        setAddress(userData.address || '');
        setPhoneNumber(userData.phoneNumber || '');
        setEmail(userData.email || '');
        setPoints(userData.points || 0);
        setStoredPassword(userData.password || '');
      }).catch((error) => {
        console.error('Error fetching user data:', error);
      });
    }
  }, []);


  const navItems = [
    { name: 'Home', link: '/home' },
    { name: 'Edit Profile', link: '/edit-profile' }
  ];
  const menuItems = [
    { name: 'Edit Profile', path: '/edit-profile', icon: 'fas fa-user-edit', iconClass: 'icon-edit-profile' },
    { name: 'Order History', path: '/order-history', icon: 'fas fa-history', iconClass: 'icon-order-history' },
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

  const handleSaveChanges = async () => {
    if (!firstName || !lastName) {
      swal("Field cannot be empty!", "Please fill out all required fields.", "error");
      return;
    }

    if (isPasswordFormVisible) {
      if (!currentPassword || !newPassword || !confirmPassword) {
        swal("Please fill in all fields", "All password fields are required.", "error");
        return;
      }
      if (currentPassword !== storedPassword) {
        swal("Current password is incorrect!", "Please try again.", "error");
        return;
      }
      if (newPassword !== confirmPassword) {
        swal("New passwords do not match!", "Please try again.", "error");
        return;
      }
      if (newPassword === storedPassword) {
        swal("New password cannot be the same as the current password!", "Please try again.", "error");
        return;
      }
    }

    const updatedData = {
      email,
      password: isPasswordFormVisible ? newPassword : storedPassword,
      lastName,
      firstName,
      address,
      phoneNumber,
      points,
      status: true
    };

    try {
      const response = await updateCustomerInfo(email, updatedData);
      if (response.status === 200) {
        swal("Successfully updated!", "Profile has been updated successfully.", "success");
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('lastName', lastName);
        localStorage.setItem('points', points);
        setUser({
          firstName,
          lastName,
          email,
          points,
        });
      }
    } catch (error) {
      swal("Failed to update profile!", "Please try again.", "error");
    }
  };

  return (
    <div className="EditProfile">
      <HeaderComponent/>
      <SubNav items={navItems} />

      <div className="edit_profile_container">
        <div className="setting_menu">
          <div className="setting_menu_section">
            <div className="setting_full_name">{`${user.firstName} ${user.lastName}`}</div>
            <div className="setting_point"><p>{`${user.points} points`}</p></div>
          </div>
          <div className="setting_menu_items">
            {menuItems.map(item => (
              <div
                key={item.path}
                className={`setting_menu_item ${item.path === '/edit-profile' ? 'edit-profile-item' : ''}`}
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
              <label>First name *</label>
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className="edit_form_group">
              <label>Last name *</label>
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div className="edit_form_group">
              <label>Email *</label>
              <input className="edit_email" type="email" value={email} readOnly />
            </div>
            <div className="edit_form_group">
              <label>Phone number</label>
              <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>
            <div className="edit_form_group full_width">
              <label>Address</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <button type="button" className="edit_form_save_button" onClick={handleSaveChanges}>Save change</button>
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
                <input type="password" id="current_password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                <span className="edit_password_eye">
                  <i className="far fa-eye" id="edit_current_password_eye" onClick={() => togglePasswordVisibility('current_password', 'edit_current_password_eye')} style={{ cursor: 'pointer' }}></i>
                </span>
              </div>
              <div className="edit_form_group full_width position-relative">
                <label>New password</label>
                <input type="password" id="new_password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                <span className="edit_password_eye">
                  <i className="far fa-eye" id="edit_new_password_eye" onClick={() => togglePasswordVisibility('new_password', 'edit_new_password_eye')} style={{ cursor: 'pointer' }}></i>
                </span>
              </div>
              <div className="edit_form_group full_width position-relative">
                <label>Confirm new password</label>
                <input type="password" id="confirm_password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <span className="edit_password_eye">
                  <i className="far fa-eye" id="edit_confirm_password_eye" onClick={() => togglePasswordVisibility('confirm_password', 'edit_confirm_password_eye')} style={{ cursor: 'pointer' }}></i>
                </span>
              </div>
              <button type="button" className="edit_form_save_button" onClick={handleSaveChanges}>Save new password</button>
            </form>
          )}
        </div>
      </div>

      <ScrollToTop />
      <FooterComponent/>
    </div>
  );
}

export default EditProfile;
