import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './SettingMenu.scss';

const SettingMenu = () => {
    const navigate = useNavigate();

    const menuItems = [
        { name: 'Edit Profile', path: '/editProfile', icon: 'fas fa-user-edit', iconClass: 'icon-edit-profile' },
        { name: 'Order History', path: '/orderHistory', icon: 'fas fa-history', iconClass: 'icon-order-history' },
        { name: 'Exchange Point', path: '/exchangePoint', icon: 'fas fa-exchange-alt', iconClass: 'icon-exchange-point' },
    ];

    return (
        <div className="setting_menu">
            <div className="setting_menu_section">
                <div className="setting_full_name">Full Name</div>
                <div className="setting_point"><p>1209 points</p></div>
            </div>
            <div className="setting_menu_items">
                {menuItems.map(item => (
                    <div
                        key={item.path}
                        className="setting_menu_item"
                        onClick={() => navigate(item.path)}
                    >
                        <i className={`${item.icon} setting_menu_icon ${item.iconClass}`}></i>
                        <span className="setting_menu_item_name">{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SettingMenu;
