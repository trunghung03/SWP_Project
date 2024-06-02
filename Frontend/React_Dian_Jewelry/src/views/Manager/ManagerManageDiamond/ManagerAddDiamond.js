import React from 'react';
import ManagerSidebar from '../../../components/ManagerSidebar/ManagerSidebar.js';
import swal from 'sweetalert';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
// import '../../styles/Manager/ManagerAddDiamond.scss';

//trang nay de add product
const ManagerAddDiamond = () => {
    return (
        <div>
            <ManagerSidebar currentPage="manager_manage_diamond" />
        </div>
    );
};

export default ManagerAddDiamond;
