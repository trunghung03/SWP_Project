import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../styles/Setting/OrderHistory.scss';
import SubNav from '../../components/SubNav/SubNav.js';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';
import { getAllOrders } from '../../services/TrackingOrderService';
import HeaderComponent from '../../components/Header/HeaderComponent';
import FooterComponent from '../../components/Footer/FooterComponent';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function OrderHistory() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [points, setPoints] = useState(0);
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterStatus, setFilterStatus] = useState('All');
    const ordersPerPage = 6;

    useEffect(() => {
        const storedFirstName = localStorage.getItem('firstName');
        const storedLastName = localStorage.getItem('lastName');
        const storedPoints = localStorage.getItem('points');
        const customerId = localStorage.getItem('customerId');
        if (storedFirstName) setFirstName(storedFirstName);
        if (storedLastName) setLastName(storedLastName);
        if (storedPoints) setPoints(storedPoints);

        getAllOrders().then(data => {
            const customerOrders = data.filter(order => order.userId === parseInt(customerId));
            setOrders(customerOrders);
            setFilteredOrders(customerOrders);
        }).catch(error => {
            console.error('Error fetching orders:', error);
        });
    }, []);

    useEffect(() => {
        if (filterStatus === 'All') {
            setFilteredOrders(orders);
        } else {
            setFilteredOrders(orders.filter(order => order.orderStatus === filterStatus));
        }
        setCurrentPage(1);
    }, [filterStatus, orders]);

    useEffect(() => {
        window.scrollTo({
          top: document.querySelector('.order_history_container').offsetTop,
          behavior: 'smooth',
        });
      }, []);

    const navItems = [
        { name: 'Home', link: '/home' },
        { name: 'Order History', link: '/order-history' }
    ];
    const menuItems = [
        { name: 'Edit Profile', path: '/edit-profile', icon: 'fas fa-user-edit', iconClass: 'icon-edit-profile' },
        { name: 'Order History', path: '/order-history', icon: 'fas fa-history', iconClass: 'icon-order-history' },
    ];

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

    const handleDetailClick = (orderNumber) => {
        navigate('/order-detail', { state: { orderNumber } });
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    const handleFilterChange = (event) => {
        setFilterStatus(event.target.value);
    };

    return (
        <div className="OrderHistory">
            <HeaderComponent />
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
                                className={`order_history_setting_menu_item ${item.path === '/order-history' ? 'order-history-item' : ''}`}
                                onClick={() => navigate(item.path)}
                            >
                                <i className={`${item.icon} order_history_setting_menu_icon ${item.iconClass}`}></i>
                                <span className="order_history_setting_menu_item_name">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="order_history_table_wrapper">
                    <div className="order_filter">
                        <FormControl fullWidth size="small">
                            <InputLabel id="orderFilterLabel">Status</InputLabel>
                            <Select
                                labelId="orderFilterLabel"
                                id="orderFilter"
                                value={filterStatus}
                                label="Filter"
                                onChange={handleFilterChange}
                            >
                                <MenuItem value="All">All</MenuItem>
                                <MenuItem value="Unpaid">Unpaid</MenuItem>
                                <MenuItem value="Paid">Paid</MenuItem>
                                <MenuItem value="Preparing">Preparing</MenuItem>
                                <MenuItem value="Delivering">Delivering</MenuItem>
                                <MenuItem value="Completed">Completed</MenuItem>
                                <MenuItem value="Cancelled">Cancelled</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <table className="order_history_table table">
                        <thead>
                            <tr>
                                <th>Order Date</th>
                                <th>Order ID</th>
                                <th>Total Price</th>
                                <th>Status</th>
                                <th>Detail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentOrders.map((order) => (
                                <tr key={order.orderId}>
                                    <td>{formatDate(order.date)}</td>
                                    <td>{order.orderId}</td>
                                    <td>{order.totalPrice}$</td>
                                    <td>{order.orderStatus}</td>
                                    <td>
                                        <i className="order_history_detail_icon fas fa-external-link-alt" onClick={() => handleDetailClick(order.orderId)} style={{ cursor: 'pointer' }}></i>
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
            <FooterComponent />
        </div>
    );
}

export default OrderHistory;
