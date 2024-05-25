import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../styles/Setting/EditProfile.scss';
import SubNav from '../../components/SubNav/SubNav.js';
import SettingMenu from '../../components/SettingMenu/SettingMenu.js';

function EditProfile() {
  const navItems = ['Home', 'Setting', 'Edit Profile'];
  return (
    <div className="EditProfile">

      <SubNav items={navItems} />
      <SettingMenu></SettingMenu>
      

    </div>
  );
}

export default EditProfile;