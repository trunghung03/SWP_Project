import React from 'react';
import ManagerSidebar from '../../components/ManagerSidebar/ManagerSidebar.js';
import swal from 'sweetalert';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import '../../styles/Manager/ManagerManageDiamond.scss';


//trang nay de hien thi table cac product
const ManagerManageDiamond = () => {
    return (
        <div>
            <ManagerSidebar currentPage="manager_manage_diamond" />
        </div>
    );
};

export default ManagerManageDiamond;
