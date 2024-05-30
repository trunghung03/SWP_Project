import React from 'react';
import ManagerSidebar from '../../components/ManagerSidebar/ManagerSidebar.js';
import swal from 'sweetalert';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import '../../styles/Manager/ManagerUpdateDiamond.scss';


//trang nay de update product
const ManagerUpdateDiamond = () => {
    return (
        <div>
            <ManagerSidebar currentPage="manager_manage_diamond" />
        </div>
    );
};

export default ManagerUpdateDiamond;
