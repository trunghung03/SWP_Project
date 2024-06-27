import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../styles/Cart/TransactionFail.scss';
import SubNav from '../../components/SubNav/SubNav.js';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';
import Insta from '../../components/BlogInspired/BlogInspired.js';
import HeaderComponent from '../../components/Header/HeaderComponent';
import FooterComponent from '../../components/Footer/FooterComponent';
import fail from '../../assets/img/paymentFail.jpg';
import { useCart } from '../../services/CartService';

function TransactionFail() {
    const navItems = [
        { name: 'Home', link: '/home' },
        { name: 'Cart', link: '/cart' },
        { name: 'Checkout', link: '' },
        { name: 'Transaction Fail', link: '' }
    ];
    const navigate = useNavigate();
    const { setCartItems: updateCartContext } = useCart();

    useEffect(() => {
        window.scrollTo(0, 160);

        const orderId = parseInt(localStorage.getItem('orderId'));
        const invoiceKey = `invoice${orderId}`;
        localStorage.removeItem(invoiceKey);
        localStorage.removeItem('orderId');

        const customerId = localStorage.getItem('customerId');
        const cartKey = `cartItems${customerId}`;
        localStorage.removeItem(cartKey);
        updateCartContext([]);
    }, [updateCartContext]);

    const handleNavigate = (path, state) => {
        navigate(path, { state });
    };

    return (
        <div className="TransactionFail">
            <HeaderComponent />
            <SubNav items={navItems} />

            <div className='transaction_fail_main_container container'>
                <div className='row'>
                    <div className='transaction_fail_content col-md-6'>
                        <h3>TRANSACTION FAILED</h3>
                        <hr className='transaction_fail_hr'></hr>
                        <p>The payment was unsuccessful due to some abnormality. Please try again later or use another payment method. If this is a mistake, please contact us through the hotline for support.</p>
                        <div className='transaction_fail_button_wrapper'>
                            <button onClick={() => handleNavigate('/diamond-jewelry', { category: 'all' })} className="transaction_fail_shop_button">Continue shopping</button>
                            <button onClick={() => handleNavigate('/contact')} className="transaction_fail_contact_button">Contact us</button>
                        </div>
                    </div>
                    <div className='transaction_fail_image col-md-6'>
                        <img src={fail} alt="Transaction Failed" />
                    </div>
                </div>
            </div>
            <ScrollToTop />
            <Insta />
            <FooterComponent />
        </div>
    );
}

export default TransactionFail;
