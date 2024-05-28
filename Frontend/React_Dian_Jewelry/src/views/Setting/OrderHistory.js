import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../styles/Setting/OrderHistory.scss';
import SubNav from '../../components/SubNav/SubNav.js';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';

function OrderHistory() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [points, setPoints] = useState(0);
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 6;

    useEffect(() => {
        const storedFirstName = localStorage.getItem('firstName');
        const storedLastName = localStorage.getItem('lastName');
        const storedPoints = localStorage.getItem('points');
        if (storedFirstName) setFirstName(storedFirstName);
        if (storedLastName) setLastName(storedLastName);
        if (storedPoints) setPoints(storedPoints);

        // Dummy data for orders, replace with actual data fetching
        const dummyOrders = Array.from({ length: 35 }, (_, index) => ({
            date: `15 August 202${index % 3}`,
            orderNumber: `${Math.floor(Math.random() * 10000000000000000)}`,
            totalPrice: `$${(Math.random() * 300).toFixed(2)}`,
            status: 'Content',
            detail: 'Content'
        }));
        setOrders(dummyOrders);
    }, []);

    const navItems = ['Home', 'Setting', 'Order History'];
    const menuItems = [
        { name: 'Edit Profile', path: '/editProfile', icon: 'fas fa-user-edit', iconClass: 'icon-edit-profile' },
        { name: 'Order History', path: '/orderHistory', icon: 'fas fa-history', iconClass: 'icon-order-history' },
        { name: 'Exchange Point', path: '/exchangePoint', icon: 'fas fa-exchange-alt', iconClass: 'icon-exchange-point' },
    ];

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(orders.length / ordersPerPage);

    const handleDetailClick = (orderNumber) => {
        navigate('/orderDetail', { state: { orderNumber } });
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="OrderHistory">
            <SubNav items={navItems} />

            <div className="order_history_container">
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

                <div className="order_history_table_wrapper">
                    <table className="order_history_table table">
                        <thead>
                            <tr>
                                <th>Order date</th>
                                <th>Order number</th>
                                <th>Total price</th>
                                <th>Status</th>
                                <th>Detail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentOrders.map((order, index) => (
                                <tr key={index}>
                                    <td>{order.date}</td>
                                    <td>{order.orderNumber}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.status}</td>
                                    <td>
                                        <i className="order_history_detail_icon fas fa-external-link-alt" onClick={() => handleDetailClick(order.orderNumber)} style={{ cursor: 'pointer' }}></i>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="order_history_pagination">
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                            &lt;
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={index + 1 === currentPage ? 'order_active' : ''}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                            &gt;
                        </button>
                    </div>
                </div>
            </div>

            <ScrollToTop />
        </div>
    );
}

export default OrderHistory;
