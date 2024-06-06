import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SubNav from '../../components/SubNav/SubNav.js';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';
import productImg from '../../assets/img/feature6.webp';
import '../../styles/Setting/OrderDetail.scss';

function OrderDetail() {
    const navigate = useNavigate();
    const location = useLocation();
    const { orderNumber } = location.state || {};
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [points, setPoints] = useState(0);

    useEffect(() => {
        const storedFirstName = localStorage.getItem('firstName');
        const storedLastName = localStorage.getItem('lastName');
        const storedPoints = localStorage.getItem('points');
        if (storedFirstName) setFirstName(storedFirstName);
        if (storedLastName) setLastName(storedLastName);
        if (storedPoints) setPoints(storedPoints);
    }, []);

    const navItems = ['Home', 'Setting', 'Order History', orderNumber];
    const menuItems = [
        { name: 'Edit Profile', path: '/editProfile', icon: 'fas fa-user-edit', iconClass: 'icon-edit-profile' },
        { name: 'Order History', path: '/orderHistory', icon: 'fas fa-history', iconClass: 'icon-order-history' },
        { name: 'Exchange Point', path: '/exchangePoint', icon: 'fas fa-exchange-alt', iconClass: 'icon-exchange-point' },
    ];

    // Dummy data for order details
    const orderDetails = {
        orderNumber: orderNumber,
        discount: '$15OFF',
        status: 'Delivering',
        products: [
            {
                name: 'Engagement Ring',
                description: 'Brushed and Polished Comfort Fit Wedding Ring in White Tungsten Carbide',
                id: '600936TW',
                size: '9',
                price: '219$',
                image: productImg,
            },
            {
                name: 'Engagement Ring',
                description: 'Brushed and Polished Comfort Fit Wedding Ring in White Tungsten Carbide',
                id: '600936TW',
                size: '9',
                price: '219$',
                image: productImg,
            }
        ],
        customer: {
            name: 'Customer Name',
            phone: '091235261234',
            address: 'Nha so 11 duong 53 dien bien phu khu pho ninh tan phuong ninh son thanh pho tay ninh tinh tay ninh',
            paymentMethod: 'Bank Transfer',
            note: "No note",
        },
        orderDate: '10/05/2024',
        totalPrice: '1000$',
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
                                className={`order_history_setting_menu_item ${item.path === '/orderHistory' ? 'order-history-item' : ''}`}
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
                            <h4 className="order_detail_number">#{orderDetails.orderNumber}</h4>
                            <span className="order_detail_status">{orderDetails.status}</span>
                        </div>
                        <hr className="order_detail_line1"></hr>
                        {orderDetails.products.map((product, index) => (
                            <div key={index} className="order_detail_product">
                                <img src={product.image} className="order_detail_product_image" />
                                <div className="order_detail_product_info">
                                    <div className="order_detail_product_header">
                                        <h5 className="order_detail_product_name">{product.name}</h5>
                                        <div className="order_detail_product_links">
                                            <a href="#">VIEW</a>
                                        </div>
                                    </div>
                                    <p className="order_detail_product_description">{product.description}</p>
                                    <p className="order_detail_product_id">{product.id}</p>
                                    <p className="order_detail_product_size">Size {product.size}</p>
                                    <p className="order_detail_product_price">{product.price}</p>
                                </div>
                            </div>
                        ))}
                        <hr className="order_detail_line2"></hr>
                        <div className="order_detail_customer_info">
                            <div className="order_detail_customer_item">
                                <i className="fas fa-user"></i>
                                <span>{orderDetails.customer.name}</span>
                            </div>
                            <div className="order_detail_customer_item">
                                <i className="fas fa-phone"></i>
                                <span>{orderDetails.customer.phone}</span>
                            </div>
                            <div className="order_detail_customer_item">
                                <i className="fas fa-map-marker-alt"></i>
                                <span>{orderDetails.customer.address}</span>
                            </div>
                            <div className="order_detail_customer_item">
                                <i className="fas fa-credit-card"></i>
                                <span>{orderDetails.customer.paymentMethod}</span>
                            </div>
                            <div className="order_detail_customer_item">
                                <i className="fas fa-sticky-note"></i>
                                <span>{orderDetails.customer.note}</span>
                            </div>
                        </div>
                        <hr className="order_detail_line3"></hr>
                        <div className="order_detail_footer">
                            <p className="order_detail_date">{orderDetails.orderDate}</p>
                            <p className="order_detail_total_price">
                                <span className="order_detail_discount">{orderDetails.discount}</span>
                                Total price: {orderDetails.totalPrice}
                            </p>
                        </div>
                        <div className="order_detail_actions">
                            <button className="order_detail_contact_us" onClick={() => navigate('/contact')}><i className="fas fa-phone"></i>Contact us</button>
                            <button className="order_detail_continue_shopping" onClick={() => navigate('/diamondJewelry')}><i className="fas fa-shopping-cart"></i>Continue shopping</button>
                        </div>
                    </div>
                </div>
            </div>

            <ScrollToTop />
        </div>
    );
}

export default OrderDetail;
