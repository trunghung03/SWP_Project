import React, { useState } from 'react';
import {Link} from 'react-router-dom';
function Admin_Sidebar() {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            <aside id="sidebar" className={isExpanded ? 'expand' : ''}>
                <div className="d-flex">
                    <button className="toggle-btn" type="button" onClick={handleToggleSidebar}>
                        <i className="lni lni-grid-alt"></i>
                    </button>
                    <div className="sidebar-logo">
                        <p id="fullName">Michael Dang</p>
                    </div>
                </div>
                <ul className="sidebar-nav">
                    <li className="sidebar-item">
                        <Link to="/Admin_Show_Customer_Account" className="sidebar-link">
                            <i className="fa-solid fa-users"></i>
                            <span>Customer Account</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/Admin_Show_Staff_Account" className="sidebar-link">
                            <i className="fa-solid fa-user-tie"></i>
                            <span>Staff Account</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/Admin_Show_Log" className="sidebar-link">
                            <i className="fa-solid fa-check-circle"></i>
                            <span>Log</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/Admin_Create_Staff" className="sidebar-link ">
                            <i className="fas fa-user-plus"></i>
                            <span>Create Account</span>
                        </Link>
                    </li>
                </ul>
                <div className="sidebar-footer">
                    <Link to="#" className="sidebar-link">
                        <i className="lni lni-exit"></i>
                        <span>Logout</span>
                    </Link>
                </div>
            </aside>
        </>
    );
}

export default Admin_Sidebar;
