import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const rolesPermissions = {
    Admin: ['/','/admin-customer-list', '/admin-employee-list', '/admin-add-employee'],
    Manager: ['/','/manager-statistic','/manager-collection-list', '/manager-add-collection', '/manager-diamond-list', '/manager-add-diamond', '/manager-product-list', '/manager-add-product', '/manager-shell-list', '/manager-add-shell', '/manager-employee-list', '/manager-add-employee', '/manager-promotional-list', '/manager-add-promotion'],
    SalesStaff: ['/','/sales-staff-order-list', '/sales-staff-content-list', '/sales-staff-add-content', '/sales-staff-warranty-list', '/rich-text-page'],
    DeliveryStaff: ['/','/delivery-staff-delivery-list', '/delivery-staff-delivery-detail/:orderId'],
    Customer: ['/', '/vnpay-result', '/transaction-fail' , '/home', '/blog', '/blog-detail/:title', '/search', '/product-detail/:name', '/cart', '/FAQs', '/checkout', '/invoice', '/edit-profile', '/order-history', '/order-detail/:orderNumber', '/diamond-jewelry', '/collection/:name', '/shape', '/diamond-price', '/contact', '/introduce'],
    Guest: ['/','/home', '/blog', '/blog-detail/:title', '/search', '/product-detail/:name', '/cart', '/FAQs', '/login', '/register', '/forgot-password', '/reset-password', '/diamond-jewelry', '/collection/:name', '/shape', '/diamond-price', '/contact', '/introduce']
};

const restrictedPages = {
    Admin: ['/vnpay-result', '/transaction-fail' ,'/login', '/register', '/home', '/blog', '/blog-detail/:title', '/search', '/product-detail/:name', '/cart', '/FAQs', '/forgot-password', '/reset-password', '/diamond-jewelry', '/collection/:name', '/shape', '/diamond-price', '/contact', '/introduce', '/checkout', '/invoice', '/edit-profile', '/order-history', '/order-detail/:orderNumber'],
    Manager: ['/vnpay-result', '/transaction-fail' ,'/login', '/register', '/home', '/blog', '/blog-detail/:title', '/search', '/product-detail/:name', '/cart', '/FAQs', '/forgot-password', '/reset-password', '/diamond-jewelry', '/collection/:name', '/shape', '/diamond-price', '/contact', '/introduce', '/checkout', '/invoice', '/edit-profile', '/order-history', '/order-detail/:orderNumber'],
    SalesStaff: ['/vnpay-result', '/transaction-fail' ,'/login', '/register', '/home', '/blog', '/blog-detail/:title', '/search', '/product-detail/:name', '/cart', '/FAQs', '/forgot-password', '/reset-password', '/diamond-jewelry', '/collection/:name', '/shape', '/diamond-price', '/contact', '/introduce', '/checkout', '/invoice', '/edit-profile', '/order-history', '/order-detail/:orderNumber'],
    DeliveryStaff: ['/vnpay-result', '/transaction-fail' ,'/login', '/register', '/home', '/blog', '/blog-detail/:title', '/search', '/product-detail/:name', '/cart', '/FAQs', '/forgot-password', '/reset-password', '/diamond-jewelry', '/collection/:name', '/shape', '/diamond-price', '/contact', '/introduce', '/checkout', '/invoice', '/edit-profile', '/order-history', '/order-detail/:orderNumber'],
    Customer: ['/login', '/register', '/forgot-password', '/reset-password'],
    Guest: ['/vnpay-result', '/transaction-fail' , '/checkout', '/invoice', '/edit-profile', '/order-history', '/order-detail/:orderNumber']
};

const ProtectedRoute = ({ element: Component, path, ...rest }) => {
    const role = localStorage?.getItem('role');
    const customerId = localStorage?.getItem('customerId');
    const navigate = useNavigate();
    const allowedPages = role ? rolesPermissions[role] : rolesPermissions.Guest;
    const restricted = role ? restrictedPages[role] : restrictedPages.Guest;

    useEffect(() => {
        let fromCart = localStorage.getItem('fromCart');
        let fromCheckout = localStorage.getItem('fromCheckout');
        const cartKey = `cartItems${customerId}`;
        const cartItems = JSON.parse(localStorage.getItem(cartKey)) || [];
        const resetPasswordToken = localStorage.getItem('resetPasswordToken');

        if (path === '/checkout' && (fromCart !== 'true' || cartItems.length === 0)) {
            alert("You don't have permission to access this page!");
            navigate(-1);
        } 
        // else if (path === '/invoice' && fromCheckout !== 'true') {
        //     alert("You don't have permission to access this page!");
        //     navigate(-1);
        // } 
        else if (path === '/reset-password') {
            if (!resetPasswordToken) {
                alert("You don't have permission to access this page!");
                navigate(-1);
            }
        } else if (!allowedPages.includes(path) || restricted.includes(path)) {
            alert("You don't have permission to access this page!");
            navigate(-1);
        }
    }, [allowedPages, restricted, path, navigate, customerId]);

    useEffect(() => {
        if (path !== '/checkout') {
            localStorage.removeItem('fromCart');
        }
        if (path !== '/invoice') {
            localStorage.removeItem('fromCheckout');
        }
    }, [path]);

    return allowedPages?.includes(path) && !restricted?.includes(path) ? <Component {...rest} /> : null;
};

export default ProtectedRoute;
