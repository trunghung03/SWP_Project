import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import logo from '../../../assets/img/logoN.png';
import ManagerSidebar from '../../../components/ManagerSidebar/ManagerSidebar.js';
import { ShowAllDiamond, createDiamond,getCertificateById,updateCertificateById } from '../../../services/ManagerService/ManagerDiamondService.js';
import '../../../styles/Manager/ManagerAdd.scss';
import InputNumber from 'rc-input-number';

const ManagerCertificate = () => {
    const navigate = useNavigate();
    return (
        <div className="manager_add_diamond_all_container">
            <div className="manager_add_diamond_sidebar">
                <ManagerSidebar currentPage="manager_manage_diamond" />
            </div>
            <div className="manager_add_diamond_content">
                <div className="manager_add_diamond_header">
                    <img className="manager_add_diamond_logo" src={logo} alt="Logo" />
                </div>
                <hr className="manager_add_diamond_header_line" />
                <div className="manager_add_diamond_title_back">
                    <h3 className="manager_add_diamond_title">View certificate</h3>
                    <button className="manager_add_diamond_back_button" onClick={() => navigate('/manager-diamond-list')}>
                        &lt; Back
                    </button>
                </div>
                    <div className="manager_add_diamond_form_row">
                        <div className="manager_add_diamond_form_group">
                            <label>certificate</label>
                            
                        </div>
                    </div>

                    <button type="submit" className="manager_add_diamond_submit_button">Add</button>
            </div>
        </div>
    );
};

export default ManagerCertificate;
