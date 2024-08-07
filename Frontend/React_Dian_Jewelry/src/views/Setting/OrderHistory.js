import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../styles/Setting/OrderHistory.scss';
import SubNav from '../../components/SubNav/SubNav.js';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';
import { getAllOrders } from '../../services/TrackingOrderService';
import { getUserInfo } from '../../services/UserService'; // Import getUserInfo
import HeaderComponent from '../../components/Header/HeaderComponent';
import FooterComponent from '../../components/Footer/FooterComponent';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Loading from '../../components/Loading/Loading';

function OrderHistory() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [points, setPoints] = useState(0);
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterStatus, setFilterStatus] = useState('All');
    const [sortOrder, setSortOrder] = useState('Newest');
    const [loading, setLoading] = useState(true);
    const ordersPerPage = 6;

    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        const customerId = localStorage.getItem('customerId');

        if (storedEmail) {
            getUserInfo(storedEmail).then(response => {
                const userData = response.data;
                setFirstName(userData.firstName);
                setLastName(userData.lastName);
                setPoints(userData.points);
            }).catch(error => {
                console.error('Error fetching user data:', error);
            });
        }

        if (customerId) {
            getAllOrders(customerId).then(data => {
                setOrders(data);
                setFilteredOrders(data);
                setLoading(false);
            }).catch(error => {
                console.error('Error fetching orders:', error);
                setLoading(false);
            });
        }
    }, []);

    useEffect(() => {
        let filtered = [...orders];
        if (filterStatus !== 'All') {
            filtered = filtered.filter(order => order.orderStatus === filterStatus);
        }
        if (sortOrder === 'Newest') {
            filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else {
            filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        }
        setFilteredOrders(filtered);
        setCurrentPage(1);
    }, [filterStatus, sortOrder, orders]);

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
        navigate(`/order-detail/${orderNumber}`, { state: { orderNumber } });
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

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };

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
                    <div className="order_filters">
                        <FormControl fullWidth size="small">
                            <InputLabel id="sortOrderLabel">Sort</InputLabel>
                            <Select
                                labelId="sortOrderLabel"
                                id="sortOrder"
                                value={sortOrder}
                                label="Sort By"
                                onChange={handleSortChange}
                            >
                                <MenuItem value="Newest">Newest</MenuItem>
                                <MenuItem value="Oldest">Oldest</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth size="small" style={{ marginRight: '10px' }}>
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
                                    <td>${order.totalPrice}</td>
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
