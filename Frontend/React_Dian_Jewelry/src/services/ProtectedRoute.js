import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const rolesPermissions = {
    Admin: ['/admin-customer-list', '/admin-employee-list', '/admin-add-employee'],
    Manager: ['/manager-statistic', '/manager-diamond-list', '/manager-add-diamond', '/manager-product-list', '/manager-add-product', '/manager-shell-list', '/manager-add-shell', '/manager-employee-list', '/manager-add-employee', '/manager-promotional-list', '/manager-add-promotion'],
    SalesStaff: ['/sales-staff-order-list', '/sales-staff-content-list', '/sales-staff-add-content', '/sales-staff-warranty-list', '/rich-text-page'],
    DeliveryStaff: ['/delivery-staff-delivery-list', '/delivery-staff-delivery-detail'],
    Customer: ['/home', '/blog', '/blog-detail', '/search', '/product-detail', '/cart', '/FAQs', '/checkout', '/invoice', '/edit-profile', '/order-history', '/order-detail']
};

const allRestrictedPages = [
    ...rolesPermissions.Admin,
    ...rolesPermissions.Manager,
    ...rolesPermissions.SalesStaff,
    ...rolesPermissions.DeliveryStaff,
    ...rolesPermissions.Customer.filter(page => ['/checkout', '/invoice', '/edit-profile', '/order-history', '/order-detail'].includes(page))
];

const ProtectedRoute = ({ element: Component, path, ...rest }) => {
    const role = localStorage.getItem('role');
    const navigate = useNavigate();

    const hasPermission = rolesPermissions[role] && rolesPermissions[role].includes(path);
    const isGuest = !role || role === 'Guest';
    const isEmployee = ['Admin', 'Manager', 'SalesStaff', 'DeliveryStaff'].includes(role);
    const isCustomerPage = ['/checkout', '/invoice', '/edit-profile', '/order-history', '/order-detail'].includes(path);

    useEffect(() => {
        if (
            (!hasPermission && !isGuest) ||
            (isGuest && allRestrictedPages.includes(path)) ||
            (isEmployee && isCustomerPage)
        ) {
            alert("You don't have permission to access this page!");
            navigate(-1);
        }
    }, [hasPermission, isGuest, isEmployee, isCustomerPage, path, navigate]);

    return (hasPermission || (isGuest && !allRestrictedPages.includes(path))) ? <Component {...rest} /> : null;
};

export default ProtectedRoute;
