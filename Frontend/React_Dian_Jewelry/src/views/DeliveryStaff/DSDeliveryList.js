import React from 'react';
import '../../styles/Manager/ManagerList.scss';
import logo from '../../assets/img/logoN.png';
import DeliveryStaffSidebar from '../../components/DeliveryStaffSidebar/DeliveryStaffSidebar.js';


const DSDeliveryList = () => {
    return (
        <div className="manager_manage_diamond_all_container">
            <div className="manager_manage_diamond_sidebar">
                <DeliveryStaffSidebar currentPage="deliverystaff_manage_order" />
            </div>
            <div className="manager_manage_diamond_content">
                <div className="manager_manage_diamond_header">
                    <img className="manager_manage_diamond_logo" src={logo} alt="Logo" />
                    {/* chinh search o day  */}
                    {/* <div className="manager_manage_diamond_search_section">
                        <input
                            type="text"
                            className="manager_manage_diamond_search_bar"
                            placeholder="Search by Email or Name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={handleSearchKeyPress}
                        />
                    </div> */}
                </div>
                <hr className="manager_header_line"></hr>
                <h3>List Of Orders</h3>

                {/* chinh tu day tro xuong */}

            </div>
        </div>

    );
};

export default DSDeliveryList;
