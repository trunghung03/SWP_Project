import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SubNav from '../../components/SubNav/SubNav.js';
import '../../styles/Cart/Invoice.scss';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';
import qr from '../../assets/img/qr.jpg';
import HeaderComponent from '../../components/Header/HeaderComponent';
import FooterComponent from '../../components/Footer/FooterComponent';
import Insta from '../../components/BlogInspired/BlogInspired.js';
import { useCart } from '../../services/CartService';
import Loading from '../../components/Loading/Loading';

function Invoice() {
    const navItems = [
        { name: 'Home', link: '/home' },
        { name: 'Cart', link: '/cart' },
        { name: 'Checkout', link: '' },
        { name: 'Invoice', link: '' }
    ];
    const navigate = useNavigate();
    const location = useLocation();
    const [invoiceData, setInvoiceData] = useState(null);
    const [loading, setLoading] = useState(true); 
    const { setCartItems: updateCartContext } = useCart();

    useEffect(() => {
        window.scrollTo(0, 160);
    }, []);

    useEffect(() => {
        const fetchData = () => {
            const orderId = parseInt(localStorage.getItem('orderId'));
            const invoiceKey = `invoice${orderId}`;
            const storedInvoiceData = JSON.parse(localStorage.getItem(invoiceKey));

            if (storedInvoiceData) {
                setInvoiceData(storedInvoiceData);
                localStorage.removeItem(invoiceKey);
                localStorage.removeItem('orderId');
            }

            const customerId = localStorage.getItem('customerId');
            const cartKey = `cartItems${customerId}`;
            localStorage.removeItem(cartKey);
            updateCartContext([]);
            setLoading(false); 
        };

        fetchData();
    }, [updateCartContext]);

    if (loading) {
        return (
            <div>
                <HeaderComponent />
                <Loading />
                <ScrollToTop />
                <FooterComponent />
            </div>
        );
    }

    if (!invoiceData) {
        return (
            <div>
                <HeaderComponent />
                <div>Loading...</div>
                <ScrollToTop />
                <FooterComponent />
            </div>
        );
    }

    const { orderId, orderDate, orderTotalPrice, orderDiscount, paymentMethod, cartItems } = invoiceData;
    const formattedDate = new Date(orderDate).toLocaleDateString('en-GB');

    return (
        <div className="Invoice">
            <HeaderComponent />
            <SubNav items={navItems} />
            <ToastContainer />
            <div className="invoice_container">
                <div className="invoice_order_summary">
                    <h4 className="invoice_title">THANK YOU FOR YOUR ORDER</h4>
                    <div className="invoice_content">
                        <div className="invoice_left_section">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Detail</th>
                                        <th>Sub Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>${Math.floor(item.price)}</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td>Discount</td>
                                        <td>${Math.floor(orderDiscount)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="invoice_right_section">
                            <div className="invoice_top_right_section">
                                <h5>Your order has been received</h5>
                                <ul>
                                    <li><span>•</span> Order number: <strong>{orderId}</strong></li>
                                    <li><span>•</span> Date order: <strong>{formattedDate}</strong></li>
                                    <li><span>•</span> Total price: <strong>${Math.floor(orderTotalPrice)}</strong></li>
                                    <li><span>•</span> Payment method: <strong>{paymentMethod}</strong></li>
                                </ul>
                            </div>
                            <div className="invoice_bottom_right_section">
                                {paymentMethod === "Bank Transfer" ? (
                                    <ul>
                                        <li>Bank account: <strong>050124800983 Sacombank</strong></li>
                                        <li>Transfer content (important): <strong>DIAN{orderId}</strong></li>
                                        <li>Order will be cancel after 2 days if do not transfer</li>
                                        <li>Contact hotline <a href='tel:0795795959'><strong> 0795795959 </strong></a> to transact directly at store</li>
                                        <img src={qr} className="qr" alt="QR Code" />
                                    </ul>
                                ) : paymentMethod === "Cash" ? (
                                    <ul>
                                        <li>Order will be prepare about four days</li>
                                        <li>Keep track your order at order history section</li>
                                        <li>Contact hotline <a href='tel:0795795959'><strong> 0795795959 </strong></a> to transact directly at store</li>
                                    </ul>
                                ) : paymentMethod === "VNPAY" ? (
                                    <ul>
                                        <li>Order will be prepare about four days</li>
                                        <li>Keep track your order at order history section</li>
                                        <li>Contact hotline <a href='tel:0795795959'><strong> 0795795959 </strong></a> to pay directly at store</li>
                                    </ul>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <br /><br />
            <Insta />
            <ScrollToTop />
            <FooterComponent />
        </div>
    );
}

export default Invoice;
