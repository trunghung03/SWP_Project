import React from 'react';
import '../../styles/DeliveryStaff/DeliveryStaffSetting/DSEditProfile.scss';
import DeliveryStaffSidebar from '../../components/DeliveryStaffSidebar/DeliveryStaffSidebar.js';

const DSEditProfile = () => {
    return (
        <div className="ds_edit_profile_all_container">
            <div className="ds_edit_profile_sidebar">
                <DeliveryStaffSidebar currentPage="deliverystaff_edit_profile" />
            </div>
            <div className="ds_edit_profile_content">
                <p>sales staff edit profile</p>
                <p>sales staff edit profile</p>
                <p>sales staff edit profile</p>
                <p>sales staff edit profile</p>
                <p>sales staff edit profile</p>
                <p>sales staff edit profile</p>
                <p>sales staff edit profile</p>
                <p>sales staff edit profile</p>
            </div>
        </div>
    );
};

export default DSEditProfile;
