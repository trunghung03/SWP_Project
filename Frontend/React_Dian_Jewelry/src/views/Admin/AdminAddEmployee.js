import React, { useState } from 'react';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logoN.png';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar.js';
import '../../styles/Manager/ManagerAdd.scss';

const ManagerAddDiamond = () => {
    const navigate = useNavigate();

    return (
        <div className="manager_add_diamond_all_container">
            <div className="manager_add_diamond_sidebar">
                <AdminSidebar currentPage="admin_manage_employee" />
            </div>
            <div className="manager_add_diamond_content">
                <div className="manager_add_diamond_header">
                    <img className="manager_add_diamond_logo" src={logo} alt="Logo" />
                </div>
                <hr className="manager_add_diamond_header_line" />
                <div className="manager_add_diamond_title_back">
                    <h3 className="manager_add_diamond_title">Create New Account</h3>
                    <button className="manager_add_diamond_back_button" onClick={() => navigate('/adminEmployeeList')}>
                        &lt; Back
                    </button>
                </div>

                {/* chinh tu day tro xuong */}

            </div>
        </div>
    );
};

export default ManagerAddDiamond;
