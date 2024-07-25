import React, { Component } from 'react';
import './ManagerSidebar.scss';
import { useNavigate } from 'react-router-dom';

class ManagerSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: true,
            firstName: localStorage.getItem('firstName') || 'First Name',
            lastName: localStorage.getItem('lastName') || 'Last Name'
        };
    }
    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize(); // Call initially to set expanded state
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize = () => {
        if (window.innerWidth < 1200) {
            this.setState({ expanded: false });
        } else {
            this.setState({ expanded: true });
        }
    };

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
            <div className={`manager_sidebar ${expanded ? 'expanded' : 'collapsed'}`}>
                <div className="manager_sidebar_header">
                    <div className={`manager_sidebar_profile ${expanded ? '' : 'hidden'}`}>
                        <div className="manager_sidebar_full_name">{`${firstName} ${lastName}`}</div>
                        <div className="manager_sidebar_role">Manager</div>
                    </div>
                    <div className="toggle-button" onClick={this.toggleSidebar}>
                        {expanded ? <i className="fas fa-angle-double-left"></i> : <i className="fas fa-angle-double-right"></i>}
                    </div>
                </div>
                <hr className="manager_side_bar_line1"></hr>
                {expanded && (
                    <div className="manager_sidebar_content">
                        <ul className="manager_sidebar_menu">
                            <li className={`manager_sidebar_menu_item ${currentPage === 'manager_statistic' ? 'selected' : ''}`} onClick={() => this.props.navigate('/manager-statistic')}>
                                <i className="fas fa-chart-bar"></i>
                                <span>Statistic</span>
                            </li>
                            <li className={`manager_sidebar_menu_item ${currentPage === 'manager_employee' ? 'selected' : ''}`} onClick={() => this.props.navigate('/manager-employee-list')}>
                                <i className="fas fa-users"></i>
                                <span>Employee List</span>
                            </li>
                            <li className={`manager_sidebar_menu_item ${currentPage === 'manager_manage_product' ? 'selected' : ''}`} onClick={() => this.props.navigate('/manager-product-list')}>
                                <i className="fas fa-box-open"></i>
                                <span>Manage Product</span>
                            </li>
                            <li className={`manager_sidebar_menu_item ${currentPage === 'manager_manage_diamond' ? 'selected' : ''}`} onClick={() => this.props.navigate('/manager-diamond-list')}>
                                <i className="fas fa-gem"></i>
                                <span>Manage Diamond</span>
                            </li>
                            <li className={`manager_sidebar_menu_item ${currentPage === 'manager_manage_shell' ? 'selected' : ''}`} onClick={() => this.props.navigate('/manager-shell-list')}>
                                <i className="fas fa-ring"></i>
                                <span>Manage Shell</span>
                            </li>
                            <li className={`manager_sidebar_menu_item ${currentPage === 'manager_manage_promotional' ? 'selected' : ''}`} onClick={() => this.props.navigate('/manager-promotional-list')}>
                                <i className="fas fa-receipt"></i>
                                <span>Manage Promotion</span>
                            </li>
                            <li className={`manager_sidebar_menu_item ${currentPage === 'manager_manage_collection' ? 'selected' : ''}`} onClick={() => this.props.navigate('/manager-collection-list')}>
                                <i className="fas fa-leaf"></i>
                                <span>Manage Collection</span>
                            </li>
                            <li className={`manager_sidebar_menu_item ${currentPage === 'manager_view_order_list' ? 'selected' : ''}`} onClick={() => this.props.navigate('/manager-order-list')}>
                                <i className="fas fa-leaf"></i>
                                <span>View Orders List</span>
                            </li>
                            <li className={`manager_sidebar_menu_item ${currentPage === 'manager_edit_profile' ? 'selected' : ''}`} onClick={() => this.props.navigate('/staff-edit-profile')}>
                                <i className="fas fa-user"></i>
                                <span>Edit Profile</span>
                            </li>
                            <div className="manager_sidebar_sign_out" onClick={this.handleSignOut}>
                                <i className="fas fa-sign-out-alt"></i>
                                <span>Sign Out</span>
                            </div>
                        </ul>
                    </div>
                )}
                {!expanded && (
                    <div className="manager_sidebar_icons">
                        <ul className="manager_sidebar_menu_icons">
                            <li className={`manager_sidebar_menu_item ${currentPage === 'manager_statistic' ? 'selected' : ''}`} data-tooltip="Statistic" onClick={() => this.props.navigate('/manager-statistic')}>
                                <i className="fas fa-chart-bar"></i>
                            </li>
                            <li className={`manager_sidebar_menu_item ${currentPage === 'manager_employee' ? 'selected' : ''}`} data-tooltip="Employee List" onClick={() => this.props.navigate('/manager-employee-list')}>
                                <i className="fas fa-users"></i>
                            </li>
                            <li className={`manager_sidebar_menu_item ${currentPage === 'manager_manage_product' ? 'selected' : ''}`} data-tooltip="Manage Product" onClick={() => this.props.navigate('/manager-product-list')}>
                                <i className="fas fa-box-open"></i>
                            </li>
                            <li className={`manager_sidebar_menu_item ${currentPage === 'manager_manage_diamond' ? 'selected' : ''}`} data-tooltip="Manage Diamond" onClick={() => this.props.navigate('/manager-diamond-list')}>
                                <i className="fas fa-gem"></i>
                            </li>
                            <li className={`manager_sidebar_menu_item ${currentPage === 'manager_manage_shell' ? 'selected' : ''}`} data-tooltip="Manage Shell" onClick={() => this.props.navigate('/manager-shell-list')}>
                                <i className="fas fa-ring"></i>
                            </li>
                            <li className={`manager_sidebar_menu_item ${currentPage === 'manager_manage_promotional' ? 'selected' : ''}`} data-tooltip="Manage Promotional" onClick={() => this.props.navigate('/manager-promotional-list')}>
                                <i className="fas fa-receipt"></i>
                            </li>
                            <li className={`manager_sidebar_menu_item ${currentPage === 'manager_manage_collection' ? 'selected' : ''}`} data-tooltip="Manage Collection" onClick={() => this.props.navigate('/manager-collection-list')}>
                                <i className="fas fa-leaf"></i>
                            </li>
                            <li className={`manager_sidebar_menu_item ${currentPage === 'manager_view_order_list' ? 'selected' : ''}`} data-tooltip="View Orders List" onClick={() => this.props.navigate('/manager-order-list')}>
                                <i className="fas fa-leaf"></i>
                            </li>
                            <li className={`manager_sidebar_menu_item ${currentPage === 'manager_edit_profile' ? 'selected' : ''}`} data-tooltip="Edit Profile" onClick={() => this.props.navigate('/staff-edit-profile')}>
                                <i className="fas fa-user"></i>
                            </li>
                            <div className="manager_sidebar_sign_out_icon" data-tooltip="Sign Out" onClick={this.handleSignOut}>
                                <i className="fas fa-sign-out-alt"></i>
                            </div>
                        </ul>
                    </div>
                )}
            </div>
        );
    }
}

const ManagerSidebarWithHooks = (props) => {
    const navigate = useNavigate();
    return <ManagerSidebar {...props} navigate={navigate} />;
};

export default ManagerSidebarWithHooks;
