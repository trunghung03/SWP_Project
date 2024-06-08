import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar.js';
import '../../styles/Manager/ManagerList.scss';
import logo from '../../assets/img/logoN.png';

const AdminCustomerList = () => {

    return (
        <div className="manager_manage_diamond_all_container">
            <div className="manager_manage_diamond_sidebar">
                <AdminSidebar currentPage="admin_manage_customer" />
            </div>
            <div className="manager_manage_diamond_content">
                <div className="manager_manage_diamond_header">
                    <img className="manager_manage_diamond_logo" src={logo} alt="Logo" />
                    <div className="manager_manage_diamond_search_section">
                        {/* chinh search o day */}
                        {/* <input
                            type="text"
                            className="manager_manage_diamond_search_bar"
                            placeholder="Search by ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={handleSearchKeyPress}
                        /> */}
                    </div>
                </div>
                <hr className="manager_header_line"></hr>
                <h3>List Of Customer Accounts</h3>

                {/* chinh tu day tro xuong */}

            </div>

        </div>
    );
};

export default AdminCustomerList;
