import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SubNav from '../../components/SubNav/SubNav.js';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';
import '../../styles/Setting/OrderDetail.scss';
import { getOrderById, getPromotionById, getOrderDetailsByOrderId, getProductById } from '../../services/TrackingOrderService';

function OrderDetail() {
    const navigate = useNavigate();
    const location = useLocation();
    const { orderNumber } = location.state || {};
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [points, setPoints] = useState(0);
    const [orderDetails, setOrderDetails] = useState(null);
    const [promotionCode, setPromotionCode] = useState('');
    const [orderProducts, setOrderProducts] = useState([]);

    useEffect(() => {
        const storedFirstName = localStorage.getItem('firstName');
        const storedLastName = localStorage.getItem('lastName');
        const storedPoints = localStorage.getItem('points');
        if (storedFirstName) setFirstName(storedFirstName);
        if (storedLastName) setLastName(storedLastName);
        if (storedPoints) setPoints(storedPoints);

        if (orderNumber) {
            getOrderById(orderNumber).then(async (data) => {
                setOrderDetails(data);

                if (data.promotionId) {
                    const promotionData = await getPromotionById(data.promotionId);
                    setPromotionCode(promotionData.code);
                }

                const orderDetailData = await getOrderDetailsByOrderId(orderNumber);
                const productDetails = await Promise.all(orderDetailData.map(async (item) => {
                    const productData = await getProductById(item.productId);
                    return {
                        ...productData,
                        size: item.size,
                        shellMaterialId: item.shellMaterialId,
                    };
                }));
                setOrderProducts(productDetails);
            }).catch(error => {
                console.error('Error fetching order details:', error);
            });
        }
    }, [orderNumber]);

    const navItems = ['Home', 'Setting', 'Order History', 'Order ' + orderNumber];
    const menuItems = [
        { name: 'Edit Profile', path: '/edit-profile', icon: 'fas fa-user-edit', iconClass: 'icon-edit-profile' },
        { name: 'Order History', path: '/order-history', icon: 'fas fa-history', iconClass: 'icon-order-history' },
    ];

    if (!orderDetails) {
        return <div>Loading...</div>;
    }

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    return (
        <div className="OrderDetail">
            <SubNav items={navItems} />

            <div className="order_detail_container">
                <div className="order_history_setting_menu">
                    <div className="order_history_setting_menu_section">
                        <div className="order_history_setting_full_name">{`${firstName} ${lastName}`}</div>
                        <div className="order_history_setting_point"><p>{`${points} points`}</p></div>
                    </div>
                    <div className="order_history_setting_menu_items">
                        {menuItems.map(item => (
                            <div
                                key={item.path}
                                className={`order_history_setting_menu_item ${item.path === '/order-history' ? 'order-history-item' : ''}`}
                                onClick={() => navigate(item.path)}
                            >
                                <i className={`${item.icon} order_history_setting_menu_icon ${item.iconClass}`}></i>
                                <span className="order_history_setting_menu_item_name">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="order_detail_wrapper">
                    <div className="order_detail_border">
                        <div className="order_detail_header">
                            <h4 className="order_detail_number">#{orderNumber}</h4>
                            <span className="order_detail_status">{orderDetails.orderStatus}</span>
                        </div>
                        <hr className="order_detail_line1"></hr>
                        {orderProducts.map((product, index) => (
                            <div key={index} className="order_detail_product">
                                <img src={product.imageLinkList.split(';')[0]} className="order_detail_product_image" alt={product.name} />
                                <div className="order_detail_product_info">
                                    <div className="order_detail_product_header">
                                        <h5 className="order_detail_product_name">{product.name}</h5>
                                        <div className="order_detail_product_links">
                                            <a href="#">VIEW</a>
                                        </div>
                                    </div>
                                    <p className="order_detail_product_size">Shell: {product.shellMaterialId}</p>
                                    <p className="order_detail_product_size">Size: {product.size}</p>
                                    <p className="order_detail_product_price">{product.price}$</p>
                                </div>
                            </div>
                        ))}
                        <hr className="order_detail_line2"></hr>
                        <div className="order_detail_customer_info">
                            <div className="order_detail_customer_item">
                                <i className="fas fa-user"></i>
                                <span>{orderDetails.name}</span>
                            </div>
                            <div className="order_detail_customer_item">
                                <i className="fas fa-phone"></i>
                                <span>{orderDetails.phoneNumber}</span>
                            </div>
                            <div className="order_detail_customer_item">
                                <i className="fas fa-map-marker-alt"></i>
                                <span>{orderDetails.shippingAddress}</span>
                            </div>
                            <div className="order_detail_customer_item">
                                <i className="fas fa-credit-card"></i>
                                <span>{orderDetails.paymentMethod}</span>
                            </div>
                            <div className="order_detail_customer_item">
                                <i className="fas fa-sticky-note"></i>
                                <span>{orderDetails.note}</span>
                            </div>
                        </div>
                        <hr className="order_detail_line3"></hr>
                        <div className="order_detail_footer">
                            <p className="order_detail_date">{formatDate(orderDetails.date)}</p>
                            <p className="order_detail_total_price">
                                <span className="order_detail_discount">{promotionCode ? `Promotion: ${promotionCode}` : ''}</span>
                                Total price: {orderDetails.totalPrice}$
                            </p>
                        </div>
                        <div className="order_detail_actions">
                            <button className="order_detail_contact_us" onClick={() => navigate('/contact')}><i className="fas fa-phone"></i>Contact us</button>
                            <button className="order_detail_continue_shopping" onClick={() => navigate('/diamond-jewelry')}><i className="fas fa-shopping-cart"></i>Continue shopping</button>
                        </div>
                    </div>
                </div>
            </div>

            <ScrollToTop />
        </div>
    );
}

export default OrderDetail;
