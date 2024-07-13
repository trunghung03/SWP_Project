import React, { useState, useEffect, useCallback, useRef } from 'react';
import './DeliveryStaffSidebar.scss';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../services/NotificationContext';
import { useSignalR } from '../../services/SignalRContext';

const DeliveryStaffSidebar = ({ currentPage }) => {
    const [expanded, setExpanded] = useState(true);
    const firstName = localStorage.getItem('firstName') || 'First Name';
    const lastName = localStorage.getItem('lastName') || 'Last Name';
    const { startConnection, notifications } = useSignalR();
    const role = localStorage.getItem('role');
    const employeeId = localStorage.getItem('employeeId');
    const { showNotifications, setShowNotifications } = useNotification();
    const [notificationCount, setNotificationCount] = useState(0);
    const [notificationsToShow, setNotificationsToShow] = useState(6);
    const notificationMenuRef = useRef(null);
    const accountMenuRef = useRef(null);
    const navigate = useNavigate();

    const handleResize = useCallback(() => {
        if (window.innerWidth < 1200) {
            setExpanded(false);
        } else {
            setExpanded(true);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize(); // Call initially to set expanded state
        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);

    const handleNotificationReceived = useCallback((newNotification) => {
        setNotificationCount((prevCount) => prevCount + 1);
    }, []);

    useEffect(() => {
        setNotificationCount(notifications.length);
    }, [notifications]);

    useEffect(() => {
        startConnection(employeeId, role);
    }, [startConnection, employeeId, role]);

    useEffect(() => {
        setShowNotifications(false);
    }, [window.location.pathname]);

    const toggleSidebar = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    };

    const handleSignOut = () => {
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        const rememberedPassword = localStorage.getItem('rememberedPassword');

        const allCartItems = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('cartItems')) {
                allCartItems[key] = localStorage.getItem(key);
            }
        }

        localStorage.clear();

        if (rememberedEmail && rememberedPassword) {
            localStorage.setItem('rememberedEmail', rememberedEmail);
            localStorage.setItem('rememberedPassword', rememberedPassword);
        }

        for (const key in allCartItems) {
            localStorage.setItem(key, allCartItems[key]);
        }

        navigate('/login');
    };

    const toggleNotificationDropdown = () => {
        setShowNotifications((prevShow) => !prevShow);
    };

    const handleViewMoreNotifications = () => {
        setNotificationsToShow((prevCount) => prevCount + 6);
    };

    const handleNotificationClick = (e, notification) => {
        // Handle notification click logic here
    };

    return (
        <div className={`deliverystaff_sidebar ${expanded ? 'expanded' : 'collapsed'}`}>
            <div className="deliverystaff_sidebar_header">
                <div className={`deliverystaff_sidebar_profile ${expanded ? '' : 'hidden'}`}>
                    <div style ={{display:"flex"}}>
                        <div className="deliverystaff_sidebar_full_name">{`${firstName} ${lastName}`}</div>
                        <div
                            className={`deli_notification_icon ${showNotifications ? 'open' : ''}`}
                            onClick={toggleNotificationDropdown}
                            ref={notificationMenuRef}
                        >
                            <i className="deli_icon_noti fas fa-bell"></i>
                            {notificationCount > 0 && (
                                <span className="deli_notification_badge">{notificationCount}</span>
                            )}
                            <div
                                className="deli_noti_dropdown_menu"
                                style={{
                                    display: showNotifications ? 'block' : 'none',
                                    opacity: showNotifications ? '1' : '0',
                                    transform: showNotifications ? 'translateY(0)' : 'translateY(-10px)',
                                    maxHeight: '370px',
                                    overflowY: 'auto',
                                }}
                            >
                                <div className="deli_noti_header_wrapper">
                                    <div className="deli_noti_header">Notifications</div>
                                </div>
                                {notifications.length > 0 ? (
                                    notifications
                                        .slice(notifications.length - 7, notifications.length).reverse()
                                        .map((notification, index) => (
                                            <div
                                                key={notification.Id}
                                                className="deli_noti_item"
                                                style={{
                                                    borderBottom:
                                                        index === notifications.length - 1
                                                            ? 'none'
                                                            : '1px solid #e0e0e0',
                                                }}
                                                onClick={(e) => handleNotificationClick(e, notification)}
                                            >
                                                <div className="deli_each_noti">
                                                    <p className="deli_noti_description">{notification}</p>
                                                </div>
                                                <div className="deli_noti_date">
                                                    <p>10:20 09/11/2004</p>
                                                </div>
                                            </div>
                                        ))
                                ) : (
                                    <div className="deli_no_notification">
                                        <p>No notification</p>
                                    </div>
                                )}
                                {notificationsToShow < notifications.length && (
                                    <div className="deli_noti_view_more_wrapper">
                                        <button
                                            className="deli_noti_view_more_button"
                                            onClick={handleViewMoreNotifications}
                                        >
                                            View more notifications
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="deliverystaff_sidebar_role">Delivery Staff</div>
                </div>
                <div className="toggle-button" onClick={toggleSidebar}>
                    {expanded ? <i className="fas fa-angle-double-left"></i> : <i className="fas fa-angle-double-right"></i>}
                </div>
            </div>
            <hr className="deliverystaff_side_bar_line1"></hr>
            {expanded && (
                <div className="deliverystaff_sidebar_content">
                    <ul className="deliverystaff_sidebar_menu">
                        <li className={`deliverystaff_sidebar_menu_item ${currentPage === 'deliverystaff_manage_order' ? 'selected' : ''}`} onClick={() => navigate('/delivery-staff-delivery-list')}>
                            <i className="fas fa-box-open"></i>
                            <span>Manage Order</span>
                        </li>
                        <li className={`deliverystaff_sidebar_edit_profile ${currentPage === 'deliverystaff_edit_profile' ? 'selected' : ''}`} onClick={() => navigate('/staff-edit-profile')}>
                            <i className="fas fa-user"></i>
                            <span>Edit Profile</span>
                        </li>
                        <div className="deliverystaff_sidebar_sign_out" onClick={handleSignOut}>
                            <i className="fas fa-sign-out-alt"></i>
                            <span>Sign Out</span>
                        </div>
                    </ul>
                </div>
            )}
            {!expanded && (
                <div className="deliverystaff_sidebar_icons">
                    <ul className="deliverystaff_sidebar_menu_icons">
                        <li className={`deliverystaff_sidebar_menu_item ${currentPage === 'deliverystaff_manage_order' ? 'selected' : ''}`} data-tooltip="Manage Order" onClick={() => navigate('/delivery-staff-delivery-list')}>
                            <i className="fas fa-box-open"></i>
                        </li>
                        <li className={`deliverystaff_sidebar_edit_profile ${currentPage === 'deliverystaff_edit_profile' ? 'selected' : ''}`} data-tooltip="Edit Profile" onClick={() => navigate('/staff-edit-profile')}>
                            <i className="fas fa-user"></i>
                        </li>
                        <div className="deliverystaff_sidebar_sign_out_icon" data-tooltip="Sign Out" onClick={handleSignOut}>
                            <i className="fas fa-sign-out-alt"></i>
                        </div>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DeliveryStaffSidebar;
