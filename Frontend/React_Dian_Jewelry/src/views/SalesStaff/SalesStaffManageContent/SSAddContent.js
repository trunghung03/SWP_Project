import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/img/logo.png';
import '../../../styles/SalesStaff/SalesStaffManageContent/SSAddContent.scss';
import SalesStaffSidebar from '../../../components/SalesStaffSidebar/SalesStaffSidebar.js';

function SSContentList() {
    return (
        <div className="ss_add_content_all_container">
            <div className="ss_add_content_sidebar">
                <SalesStaffSidebar currentPage="salesstaff_manage_blog" />
            </div>
            <div className="ss_add_content_content">
                <div className="ss_add_content_header">
                    <img className="ss_add_content_logo" src={logo} alt="Logo" />
                </div>
                <hr className="ss_add_content_line"></hr>
                <div className="ss_add_content_content_form">
                    <p>chinh o day ne</p>
                </div>
            </div>
        </div>
    );
}

export default SSContentList;
