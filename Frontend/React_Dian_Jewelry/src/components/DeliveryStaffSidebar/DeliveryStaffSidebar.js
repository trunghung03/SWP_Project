import React, { Component } from 'react';
import './DeliveryStaffSidebar.scss';
import { useNavigate } from 'react-router-dom';

class DeliveryStaffSidebar extends Component {
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
            <div className={`deliverystaff_sidebar ${expanded ? 'expanded' : 'collapsed'}`}>
                <div className="deliverystaff_sidebar_header">
                    <div className={`deliverystaff_sidebar_profile ${expanded ? '' : 'hidden'}`}>
                        <div className="deliverystaff_sidebar_full_name">{`${firstName} ${lastName}`}</div>
                        <div className="deliverystaff_sidebar_role">Delivery Staff</div>
                    </div>
                    <div className="toggle-button" onClick={this.toggleSidebar}>
                        {expanded ? <i className="fas fa-angle-double-left"></i> : <i className="fas fa-angle-double-right"></i>}
                    </div>
                </div>
                <hr className="deliverystaff_side_bar_line1"></hr>
                {expanded && (
                    <div className="deliverystaff_sidebar_content">
                        <ul className="deliverystaff_sidebar_menu">
                            <li className={`deliverystaff_sidebar_menu_item ${currentPage === 'deliverystaff_manage_order' ? 'selected' : ''}`} onClick={() => this.props.navigate('/delivery-staff-delivery-list')}>
                                <i className="fas fa-box-open"></i>
                                <span>Manager Order</span>
                            </li>
                            <li className={`deliverystaff_sidebar_edit_profile ${currentPage === 'deliverystaff_edit_profile' ? 'selected' : ''}`} onClick={() => this.props.navigate('/staff-edit-profile')}>
                                <i className="fas fa-user"></i>
                                <span>Edit Profile</span>
                            </li>
                            <div className="deliverystaff_sidebar_sign_out" onClick={this.handleSignOut}>
                                <i className="fas fa-sign-out-alt"></i>
                                <span>Sign Out</span>
                            </div>
                        </ul>
                    </div>
                )}
                {!expanded && (
                    <div className="deliverystaff_sidebar_icons">
                        <ul className="deliverystaff_sidebar_menu_icons">
                            <li className={`deliverystaff_sidebar_menu_item ${currentPage === 'deliverystaff_manage_order' ? 'selected' : ''}`} data-tooltip="Manage Order" onClick={() => this.props.navigate('/delivery-staff-delivery-list')}>
                                <i className="fas fa-box-open"></i>
                            </li>
                            <li className={`deliverystaff_sidebar_edit_profile ${currentPage === 'deliverystaff_edit_profile' ? 'selected' : ''}`} data-tooltip="Edit Profile" onClick={() => this.props.navigate('/staff-edit-profile')}>
                                <i className="fas fa-user"></i>
                            </li>
                            <div className="deliverystaff_sidebar_sign_out_icon" data-tooltip="Sign Out" onClick={this.handleSignOut}>
                                <i className="fas fa-sign-out-alt"></i>
                            </div>
                        </ul>
                    </div>
                )}
            </div>
        );
    }
}

const DeliveryStaffSidebarWithHooks = (props) => {
    const navigate = useNavigate();
    return <DeliveryStaffSidebar {...props} navigate={navigate} />;
};

export default DeliveryStaffSidebarWithHooks;
