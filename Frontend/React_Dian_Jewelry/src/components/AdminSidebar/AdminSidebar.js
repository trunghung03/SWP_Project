import React, { Component } from 'react';
import './AdminSidebar.scss';
import { useNavigate } from 'react-router-dom';

class AdminSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: true,
            firstName: localStorage.getItem('firstName') || 'First Name',
            lastName: localStorage.getItem('lastName') || 'Last Name'
        };
    }

    toggleSidebar = () => {
        this.setState(prevState => ({
            expanded: !prevState.expanded
        }));
    };

    handleSignOut = () => {
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
    
        this.props.navigate('/login');
    };
    

    render() {
        const { expanded, firstName, lastName } = this.state;
        const { currentPage } = this.props;

        return (
            <div className={`admin_sidebar ${expanded ? 'expanded' : 'collapsed'}`}>
                <div className="admin_sidebar_header">
                    <div className={`admin_sidebar_profile ${expanded ? '' : 'hidden'}`}>
                        <div className="admin_sidebar_full_name">{`${firstName} ${lastName}`}</div>
                        <div className="admin_sidebar_role">Admin</div>
                    </div>
                    <div className="toggle-button" onClick={this.toggleSidebar}>
                        {expanded ? <i className="fas fa-angle-double-left"></i> : <i className="fas fa-angle-double-right"></i>}
                    </div>
                </div>
                <hr className="admin_side_bar_line1"></hr>
                {expanded && (
                    <div className="admin_sidebar_content">
                        <ul className="admin_sidebar_menu">
                            <li className={`admin_sidebar_menu_item ${currentPage === 'admin_manage_customer' ? 'selected' : ''}`} onClick={() => this.props.navigate('/admin-customer-list')}>
                                <i className="fas fa-users"></i>
                                <span>Customer Account</span>
                            </li>
                            <li className={`admin_sidebar_menu_item ${currentPage === 'admin_manage_employee' ? 'selected' : ''}`} onClick={() => this.props.navigate('/admin-employee-list')}>
                                <i className="fas  fa-id-badge"></i>
                                <span>Employee Account</span>
                            </li>
                            {/* <li className={`admin_sidebar_menu_item ${currentPage === 'salesstaff_edit_profile' ? 'selected' : ''}`} onClick={() => this.props.navigate('#')}>
                                <i className="fas fa-user"></i>
                                <span>Edit Profile</span>
                            </li> */}
                            <div className="admin_sidebar_sign_out" onClick={this.handleSignOut}>
                                <i className="fas fa-sign-out-alt"></i>
                                <span>Sign Out</span>
                            </div>
                        </ul>
                    </div>
                )}
                {!expanded && (
                    <div className="admin_sidebar_icons">
                        <ul className="admin_sidebar_menu_icons">
                            <li className={`admin_sidebar_menu_item ${currentPage === 'admin_manage_customer' ? 'selected' : ''}`} data-tooltip="Customer Account" onClick={() => this.props.navigate('/admin-customer-list')}>
                                <i className="fas fa-users"></i>
                            </li>
                            <li className={`admin_sidebar_menu_item ${currentPage === 'admin_manage_employee' ? 'selected' : ''}`} data-tooltip="Employee Acount" onClick={() => this.props.navigate('/admin-employee-list')}>
                                <i className="fas  fa-id-badge"></i>
                            </li>
                            {/* <li className={`admin_sidebar_menu_item ${currentPage === 'salesstaff_edit_profile' ? 'selected' : ''}`} data-tooltip="Edit Profile" onClick={() => this.props.navigate('#')}>
                                <i className="fas fa-user"></i>
                            </li> */}
                            <div className="admin_sidebar_sign_out_icon" data-tooltip="Sign Out" onClick={this.handleSignOut}>
                                <i className="fas fa-sign-out-alt"></i>
                            </div>
                        </ul>
                    </div>
                )}
            </div>
        );
    }
}

const AdminSidebarWithHooks = (props) => {
    const navigate = useNavigate();
    return <AdminSidebar {...props} navigate={navigate} />;
};

export default AdminSidebarWithHooks;
