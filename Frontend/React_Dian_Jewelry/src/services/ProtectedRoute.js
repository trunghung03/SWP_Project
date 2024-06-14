import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const rolesPermissions = {
    Admin: ['/admin-customer-list', '/admin-employee-list', '/admin-add-employee'],
    Manager: ['/manager-statistic', '/manager-diamond-list', '/manager-add-diamond', '/manager-product-list', '/manager-add-product', '/manager-shell-list', '/manager-add-shell', '/manager-employee-list', '/manager-add-employee', '/manager-promotional-list', '/manager-add-promotion'],
    SalesStaff: ['/sales-staff-order-list', '/sales-staff-content-list', '/sales-staff-add-content', '/sales-staff-warranty-list', '/rich-text-page'],
    DeliveryStaff: ['/delivery-staff-delivery-list', '/delivery-staff-delivery-detail'],
    Customer: ['/home', '/blog', '/blog-detail', '/search', '/product-detail', '/cart', '/FAQs', '/checkout', '/invoice', '/edit-profile', '/order-history', '/order-detail', '/diamond-jewelry', '/collection', '/shape', '/price-list', '/contact', '/introduce'],
    Guest: ['/home', '/blog', '/blog-detail', '/search', '/product-detail', '/cart', '/FAQs', '/login', '/register', '/forgot-password', '/reset-password', '/diamond-jewelry', '/collection', '/shape', '/price-list', '/contact', '/introduce']
};

const restrictedPages = {
    Admin: ['/home', '/blog', '/blog-detail', '/search', '/product-detail', '/cart', '/FAQs', '/login', '/register', '/forgot-password', '/reset-password', '/diamond-jewelry', '/collection', '/shape', '/price-list', '/contact', '/introduce', '/checkout', '/invoice', '/edit-profile', '/order-history', '/order-detail'],
    Manager: ['/home', '/blog', '/blog-detail', '/search', '/product-detail', '/cart', '/FAQs', '/login', '/register', '/forgot-password', '/reset-password', '/diamond-jewelry', '/collection', '/shape', '/price-list', '/contact', '/introduce', '/checkout', '/invoice', '/edit-profile', '/order-history', '/order-detail'],
    SalesStaff: ['/home', '/blog', '/blog-detail', '/search', '/product-detail', '/cart', '/FAQs', '/login', '/register', '/forgot-password', '/reset-password', '/diamond-jewelry', '/collection', '/shape', '/price-list', '/contact', '/introduce', '/checkout', '/invoice', '/edit-profile', '/order-history', '/order-detail'],
    DeliveryStaff: ['/home', '/blog', '/blog-detail', '/search', '/product-detail', '/cart', '/FAQs', '/login', '/register', '/forgot-password', '/reset-password', '/diamond-jewelry', '/collection', '/shape', '/price-list', '/contact', '/introduce', '/checkout', '/invoice', '/edit-profile', '/order-history', '/order-detail'],
    Customer: ['/login', '/register', '/forgot-password', '/reset-password'],
    Guest: ['/checkout', '/invoice', '/edit-profile', '/order-history', '/order-detail']
};

const ProtectedRoute = ({ element: Component, path, ...rest }) => {
    const role = localStorage.getItem('role');
    const navigate = useNavigate();
    const allowedPages = role ? rolesPermissions[role] : rolesPermissions.Guest;
    const restricted = role ? restrictedPages[role] : restrictedPages.Guest;

    useEffect(() => {
        if (!allowedPages.includes(path) || restricted.includes(path)) {
            alert("You don't have permission to access this page!");
            navigate(-1);
        }
    }, [allowedPages, restricted, path, navigate]);

    return allowedPages.includes(path) && !restricted.includes(path) ? <Component {...rest} /> : null;
};

export default ProtectedRoute;
