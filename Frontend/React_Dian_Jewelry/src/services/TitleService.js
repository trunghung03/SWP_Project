import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const UpdateTitle = () => {
  const location = useLocation();
  const { name, orderNumber } = useParams();

  useEffect(() => {
    let title = 'Dian Jewelry';
    const path = location.pathname;

    if (path === '/home' || path === '/') {
      title = 'Homepage | Dian Jewelry';
    } else if (path === '/contact') {
      title = 'Contact Us | Dian Jewelry';
    } else if (path === '/introduce') {
      title = 'Introduce | Dian Jewelry';
    } else if (path === '/diamond-price') {
      title = 'Diamond Price | Dian Jewelry';
    } else if (path === '/blog') {
      title = 'Blog | Dian Jewelry';
    } else if (path.startsWith('/blog-detail')) {
      title = `Blog Detail | Dian Jewelry`;
    } else if (path === '/cart') {
      title = 'Cart | Dian Jewelry';
    } else if (path === '/checkout') {
      title = 'Checkout | Dian Jewelry';
    } else if (path === '/invoice') {
      title = 'Invoice | Dian Jewelry';
    } else if (path === '/transaction-fail') {
      title = 'Transaction Fail | Dian Jewelry';
    } else if (path.startsWith('/product-detail')) {
      title = `Product Detail | Dian Jewelry`;
    } else if (path.startsWith('/diamond-detail')) {
      title = `Diamond Detail | Dian Jewelry`;
    } else if (path === '/login') {
      title = 'Sign in | Dian Jewelry';
    } else if (path === '/register') {
      title = 'Sign up | Dian Jewelry';
    } else if (path === '/forgot-password') {
      title = 'Forgot Password | Dian Jewelry';
    } else if (path === '/reset-password') {
      title = 'Reset Password | Dian Jewelry';
    } else if (path === '/edit-profile') {
      title = 'Edit Profile | Dian Jewelry';
    } else if (path === '/order-history') {
      title = 'Order History | Dian Jewelry';
    } else if (path.startsWith('/order-detail')) {
      title = `Order Detail | Dian Jewelry`;
    } else if (path === '/FAQs') {
      title = 'Frequently Asked Question | Dian Jewelry';
    } else if (path === '/search') {
      title = 'Search | Dian Jewelry';
    } else if (path === '/diamond-jewelry') {
      title = 'Diamond Jewelry | Dian Jewelry';
    } else if (path.startsWith('/collection')) {
      title = 'Jewelry Collection | Dian Jewelry';
    } else if (path === '/shape') {
      title = 'Diamond Shape | Dian Jewelry';
    }

    document.title = title;
  }, [location, name, orderNumber]);

  return null;
};

export default UpdateTitle;
