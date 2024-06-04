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

    toggleSidebar = () => {
        this.setState(prevState => ({
            expanded: !prevState.expanded
        }));
    };

    handleSignOut = () => {
        localStorage.clear();
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
                            <li className={`manager_sidebar_menu_item ${currentPage === 'manager_statitic' ? 'selected' : ''}`} onClick={() => this.props.navigate('/managerStatitic')}>
                                <i className="fas fa-chart-bar"></i>
                                <span>Statitic</span>
                            </li>
                            <li className={`manager_sidebar_menu_item ${currentPage === 'manager_employee' ? 'selected' : ''}`} onClick={() => this.props.navigate('/managerEmployeeList')}>
                                <i className="fas fa-users"></i>
                                <span>Employee</span>
                            </li>
                            <li className={`manager_sidebar_menu_item ${currentPage === 'manager_manage_product' ? 'selected' : ''}`} onClick={() => this.props.navigate('/managerProductList')}>
                                <i className="fas fa-box-open"></i>
                                <span>Manage Product</span>
                            </li>
                            <li className={`manager_sidebar_menu_item ${currentPage === 'manager_manage_diamond' ? 'selected' : ''}`} onClick={() => this.props.navigate('/managerDiamondList')}>
                                <i className="fas fa-gem"></i>
                                <span>Manage Diamond</span>
                            </li>
                            <li className={`manager_sidebar_menu_item ${currentPage === 'manager_manage_shell' ? 'selected' : ''}`} onClick={() => this.props.navigate('#')}>
                                <i className="fas fa-ring"></i>
                                <span>Manage Shell</span>
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
                            <li className={`manager_sidebar_menu_item ${currentPage === 'manager_statitic' ? 'selected' : ''}`} data-tooltip="Statitic" onClick={() => this.props.navigate('/managerStatitic')}>
                                <i className="fas fa-chart-bar"></i>
                            </li>
                            <li className={`manager_sidebar_menu_item ${currentPage === 'manager_employee' ? 'selected' : ''}`} data-tooltip="Employee" onClick={() => this.props.navigate('/managerEmployeeList')}>
                                <i className="fas fa-users"></i>
                            </li>
                            <li className={`manager_sidebar_menu_item ${currentPage === 'manager_manage_product' ? 'selected' : ''}`} data-tooltip="Manage Product" onClick={() => this.props.navigate('/managerProductList')}>
                                <i className="fas fa-box-open"></i>
                            </li>
                            <li className={`manager_sidebar_menu_item ${currentPage === 'manager_manage_diamond' ? 'selected' : ''}`} data-tooltip="Manage Diamond" onClick={() => this.props.navigate('/managerDiamondList')}>
                                <i className="fas fa-gem"></i>
                            </li>
                            <li className={`manager_sidebar_menu_item ${currentPage === 'manager_manage_shell' ? 'selected' : ''}`} data-tooltip="Manage Shell" onClick={() => this.props.navigate('#')}>
                                <i className="fas fa-ring"></i>
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
