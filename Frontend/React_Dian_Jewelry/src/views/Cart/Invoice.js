import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SubNav from '../../components/SubNav/SubNav.js';
import '../../styles/Cart/Invoice.scss';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';
import { getOrderDetailsByOrderId } from '../../services/CheckoutService.js';
import { getProductDetail } from '../../services/ProductService.js';
import qr from '../../assets/img/qr.jpg';
import HeaderComponent from '../../components/Header/HeaderComponent';
import FooterComponent from '../../components/Footer/FooterComponent';


function Invoice() {
    const navItems = [
        { name: 'Home', link: '/home' },
        { name: 'Cart', link: '/cart' },
        { name: 'Checkout', link: '' },
        { name: 'Invoice', link: '' }
    ];
    const navigate = useNavigate();
    const location = useLocation();
    const [orderDetails, setOrderDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    const orderId = location.state?.orderId || localStorage.getItem('orderId');
    const paymentMethod = location.state?.paymentMethod || localStorage.getItem('paymentMethod') || 'Not selected';
    const discount = location.state?.appliedDiscount || localStorage.getItem('orderDiscount');
    const orderDate = new Date(localStorage.getItem('orderDate')).toLocaleDateString('en-GB');
    const totalPrice = location.state?.totalPrice || localStorage.getItem('orderTotalPrice');

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const orderDetailsData = await getOrderDetailsByOrderId(orderId);
                const productDetailsPromises = orderDetailsData.map((detail) =>
                    getProductDetail(detail.productId).then((product) => ({
                        ...detail,
                        productName: product.data.name,
                        productPrice: product.data.price,
                    }))
                );
                const detailedOrderDetails = await Promise.all(productDetailsPromises);
                console.log('detailedOrderDetails:', detailedOrderDetails);
                setOrderDetails(detailedOrderDetails);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching purchase order:', error);
                setLoading(false);
            }
        };

        if (orderId) {
            fetchOrderDetails();
        }
    }, [orderId]);

    return (
        <div className="Invoice">
            <HeaderComponent/>
            <SubNav items={navItems} />
            <div className="invoice_container">
                <div className="invoice_order_summary">
                    <h4 className="invoice_title">THANK YOU FOR YOUR ORDER</h4>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
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
                                        {orderDetails.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.productName}</td>
                                                <td>{Math.floor(item.productPrice)}$</td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td>Discount</td>
                                            <td>{Math.floor(discount)}$</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="invoice_right_section">
                                <div className="invoice_top_right_section">
                                    <h5>Your order has been received</h5>
                                    <ul>
                                        <li><span>•</span> Order number: <strong>{orderId}</strong></li>
                                        <li><span>•</span> Date order: <strong>{orderDate}</strong></li>
                                        <li><span>•</span> Total price: <strong>{Math.floor(totalPrice)}$</strong></li>
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
                                            <li>Keep track your order at tracking orders section</li>
                                            <li>Contact hotline <a href='tel:0795795959'><strong> 0795795959 </strong></a> to transact directly at store</li>
                                        </ul>
                                    ) : paymentMethod === "VNPAY" ? (
                                        <ul>
                                            <li>Order will be prepare about four days</li>
                                            <li>Keep track your order at tracking orders section</li>
                                            <li>Contact hotline <a href='tel:0795795959'><strong> 0795795959 </strong></a> to transact directly at store</li>
                                        </ul>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <ScrollToTop />
            <FooterComponent/>
        </div>
    );
}

export default Invoice;
