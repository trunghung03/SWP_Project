import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
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
  const [isGoogleUser, setIsGoogleUser] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const isGoogle = localStorage.getItem('Google');
    setIsGoogleUser(Boolean(isGoogle));
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

  useEffect(() => {
    window.scrollTo({
      top: document.querySelector('.edit_profile_container').offsetTop,
      behavior: 'smooth',
    });
  }, []);

  const navItems = [
    { name: 'Home', link: '/home' },
    { name: 'Edit Profile', link: '/edit-profile' }
  ];
  const menuItems = [
    { name: 'Edit Profile', path: '/edit-profile', icon: 'fas fa-user-edit', iconClass: 'icon-edit-profile' },
    { name: 'Order History', path: '/order-history', icon: 'fas fa-history', iconClass: 'icon-order-history' },
    { name: 'Notifications', path: '#', icon: 'fas fa-bell', iconClass: 'icon-notification' },
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

  const isValidPhoneNumber = (phone) => {
    const phonePattern = /^[0-9]{10,15}$/;
    return phonePattern.test(phone);
  };

  const handleSaveChanges = async () => {
    if (!firstName || !lastName) {
      toast.error("Field cannot be empty! Please fill out all required fields.", {
        position: "top-right",
        autoClose: 8000
      });
      return;
    }

    if (phoneNumber && !isValidPhoneNumber(phoneNumber)) {
      toast.error("Phone number is invalid! Please try again.", {
        position: "top-right",
        autoClose: 8000
      });
      return;
    }

    if (isPasswordFormVisible && !isGoogleUser) {
      if (!currentPassword || !newPassword || !confirmPassword) {
        toast.error("Please fill in all fields. All password fields are required.", {
          position: "top-right",
          autoClose: 8000
        });
        return;
      }
      if (currentPassword !== storedPassword) {
        toast.error("Current password is incorrect! Please try again.", {
          position: "top-right",
          autoClose: 8000
        });
        return;
      }
      if (newPassword !== confirmPassword) {
        toast.error("New passwords do not match! Please try again.", {
          position: "top-right",
          autoClose: 8000
        });
        return;
      }
      if (newPassword === storedPassword) {
        toast.error("New password cannot be the same as the current password! Please try again.", {
          position: "top-right",
          autoClose: 8000
        });
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
        toast.success("Profile has been updated successfully.", {
          position: "top-right",
          autoClose: 8000
        });
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
      toast.error("Failed to update profile! Please try again.", {
        position: "top-right",
        autoClose: 8000
      });
    }
  };

  return (
    <div className="EditProfile">
      <HeaderComponent />
      <SubNav items={navItems} />
      <ToastContainer />
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
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={isGoogleUser}
                className={isGoogleUser ? "disabled_input" : ""}
              />
            </div>
            <div className="edit_form_group">
              <label>Last name *</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={isGoogleUser}
                className={isGoogleUser ? "disabled_input" : ""}
              />
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

          {/* {!isGoogleUser && (
            <>
              <hr className="edit_profile_line"></hr>
              <h2 onClick={togglePasswordForm} className="toggle_password_form">
                Change Password
                <i className={`fas ${isPasswordFormVisible ? 'fa-chevron-up' : 'fa-chevron-down'} toggle_icon`}></i>
              </h2>
              {isPasswordFormVisible && (
                <form>
                  <div className="edit_form_group full_width position-relative">
                    <label>Current password</label>
                    <input
                      type="password"
                      id="current_password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <span className="edit_password_eye">
                      <i
                        className="far fa-eye"
                        id="edit_current_password_eye"
                        onClick={() => togglePasswordVisibility('current_password', 'edit_current_password_eye')}
                        style={{ cursor: 'pointer' }}
                      ></i>
                    </span>
                  </div>
                  <div className="edit_form_group full_width position-relative">
                    <label>New password</label>
                    <input
                      type="password"
                      id="new_password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <span className="edit_password_eye">
                      <i
                        className="far fa-eye"
                        id="edit_new_password_eye"
                        onClick={() => togglePasswordVisibility('new_password', 'edit_new_password_eye')}
                        style={{ cursor: 'pointer' }}
                      ></i>
                    </span>
                  </div>
                  <div className="edit_form_group full_width position-relative">
                    <label>Confirm new password</label>
                    <input
                      type="password"
                      id="confirm_password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <span className="edit_password_eye">
                      <i
                        className="far fa-eye"
                        id="edit_confirm_password_eye"
                        onClick={() => togglePasswordVisibility('confirm_password', 'edit_confirm_password_eye')}
                        style={{ cursor: 'pointer' }}
                      ></i>
                    </span>
                  </div>
                  <button type="button" className="edit_form_save_button" onClick={handleSaveChanges}>Save new password</button>
                </form>
              )}
            </>
          )} */}
        </div>
      </div>

      <ScrollToTop />
      <FooterComponent />
    </div>
  );
}

export default EditProfile;
