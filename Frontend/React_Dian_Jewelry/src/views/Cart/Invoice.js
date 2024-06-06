import React from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SubNav from '../../components/SubNav/SubNav.js';
import { useNavigate } from 'react-router-dom';
import '../../styles/Cart/Invoice.scss';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';

function Invoice() {
    const navItems = ['Home', 'Cart', 'Checkout', 'Invoice'];
    const navigate = useNavigate();
    const location = useLocation();

    const paymentMethod = location.state?.paymentMethod || 'Not selected';

    const handleBackToCart = () => {
        navigate('/cart');
    };

    return (
        <div className="Invoice">
            <SubNav items={navItems} />
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
                                    <tr>
                                        <td>Super Luxury Wedding Ring</td>
                                        <td>$299.00</td>
                                    </tr>
                                    <tr>
                                        <td>Super Luxury Engagement Ring</td>
                                        <td>$299.00</td>
                                    </tr>
                                    <tr>
                                        <td>Discount</td>
                                        <td>$0</td>
                                    </tr>
                                    <tr>
                                        <td>Total:</td>
                                        <td>$1000.00</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="invoice_right_section">
                            <div className="invoice_top_right_section">
                                <h5>Your order has been received</h5>
                                <ul>
                                    <li><span>•</span> Order number: <strong>#91928828282</strong></li>
                                    <li><span>•</span> Date order: <strong>10/05/2024</strong></li>
                                    <li><span>•</span> Total price: <strong>1000$</strong></li>
                                    <li><span>•</span> Payment method: <strong>{paymentMethod}</strong></li>
                                </ul>
                            </div>
                            <div className="invoice_bottom_right_section">
                                {paymentMethod === "Bank Transfer" ? (
                                    <ul>
                                        <li>Bank account: 0189222892922 Vietcombank</li>
                                        <li>Transfer content: #91928828282</li>
                                        <li>Order will be prepared after receiving the money</li>
                                    </ul>
                                ) : paymentMethod === "Cash" ? (
                                    <ul>
                                        <li>Order will be prepare about four days</li>
                                        <li>Keep track your order at tracking orders section</li>
                                        <li>Contact through hotline to transact directly at store</li>
                                    </ul>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ScrollToTop />
        </div>
    );
}

export default Invoice;
