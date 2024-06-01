import React from 'react';
import SalesStaffSidebar from '../../../components/SalesStaffSidebar/SalesStaffSidebar.js';

const SSOrderList = () => {
    return (
        <div className="SSOrderList">
            <div>
                <SalesStaffSidebar currentPage="salesstaff_manage_order" />
            </div>
        </div>
    );
};

export default SSOrderList;
