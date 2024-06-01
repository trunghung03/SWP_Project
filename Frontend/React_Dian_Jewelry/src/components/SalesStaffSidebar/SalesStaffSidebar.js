import React, { Component } from 'react';
import './SalesStaffSidebar.scss';
import { useNavigate } from 'react-router-dom';

class SalesStaffSidebar extends Component {
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
            <div className={`salesstaff_sidebar ${expanded ? 'expanded' : 'collapsed'}`}>
                <div className="salesstaff_sidebar_header">
                    <div className={`salesstaff_sidebar_profile ${expanded ? '' : 'hidden'}`}>
                        <div className="salesstaff_sidebar_full_name">{`${firstName} ${lastName}`}</div>
                        <div className="salesstaff_sidebar_role">Sales Staff</div>
                    </div>
                    <div className="toggle-button" onClick={this.toggleSidebar}>
                        {expanded ? <i className="fas fa-angle-double-left"></i> : <i className="fas fa-angle-double-right"></i>}
                    </div>
                </div>
                <hr className="salesstaff_side_bar_line1"></hr>
                {expanded && (
                    <div className="salesstaff_sidebar_content">
                        <ul className="salesstaff_sidebar_menu">
                            <li className={`salesstaff_sidebar_menu_item ${currentPage === 'salesstaff_manage_order' ? 'selected' : ''}`} onClick={() => this.props.navigate('/salesStaffOrderList')}>
                                <i className="fas fa-box-open"></i>
                                <span>Manage Order</span>
                            </li>
                            <li className={`salesstaff_sidebar_menu_item ${currentPage === 'salesstaff_manage_blog' ? 'selected' : ''}`} onClick={() => this.props.navigate('#')}>
                                <i className="fas fa-book"></i>
                                <span>Manage Blog</span>
                            </li>
                            <li className={`salesstaff_sidebar_menu_item ${currentPage === 'salesstaff_manage_warranty' ? 'selected' : ''}`} onClick={() => this.props.navigate('#')}>
                                <i className="fas fa-file-contract"></i>
                                <span>Manage Warranty</span>
                            </li>
                            <li className={`salesstaff_sidebar_menu_item ${currentPage === 'salesstaff_edit_profile' ? 'selected' : ''}`} onClick={() => this.props.navigate('#')}>
                                <i className="fas fa-user"></i>
                                <span>Edit Profile</span>
                            </li>
                        </ul>
                        <hr className="salesstaff_side_bar_line2"></hr>
                        <div className="salesstaff_sidebar_sign_out" onClick={this.handleSignOut}>
                            <i className="fas fa-sign-out-alt"></i>
                            <span>Sign Out</span>
                        </div>
                    </div>
                )}
                {!expanded && (
                    <div className="salesstaff_sidebar_icons">
                        <ul className="salesstaff_sidebar_menu_icons">
                            <li className={`salesstaff_sidebar_menu_item ${currentPage === 'salesstaff_manage_order' ? 'selected' : ''}`} data-tooltip="Manage Order" onClick={() => this.props.navigate('/salesStaffOrderList')}>
                                <i className="fas fa-box-open"></i>
                            </li>
                            <li className={`salesstaff_sidebar_menu_item ${currentPage === 'salesstaff_manage_blog' ? 'selected' : ''}`} data-tooltip="Manage Blog" onClick={() => this.props.navigate('#')}>
                                <i className="fas fa-book"></i>
                            </li>
                            <li className={`salesstaff_sidebar_menu_item ${currentPage === 'salesstaff_manage_warranty' ? 'selected' : ''}`} data-tooltip="Manage Warranty" onClick={() => this.props.navigate('#')}>
                                <i className="fas fa-file-contract"></i>
                            </li>
                            <li className={`salesstaff_sidebar_menu_item ${currentPage === 'salesstaff_edit_profile' ? 'selected' : ''}`} data-tooltip="Edit Profile" onClick={() => this.props.navigate('#')}>
                                <i className="fas fa-user"></i>
                            </li>
                        </ul>
                        <hr className="salesstaff_side_bar_line2"></hr>
                        <div className="salesstaff_sidebar_sign_out_icon" data-tooltip="Sign Out" onClick={this.handleSignOut}>
                            <i className="fas fa-sign-out-alt"></i>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

const SalesStaffSidebarWithHooks = (props) => {
    const navigate = useNavigate();
    return <SalesStaffSidebar {...props} navigate={navigate} />;
};

export default SalesStaffSidebarWithHooks;
