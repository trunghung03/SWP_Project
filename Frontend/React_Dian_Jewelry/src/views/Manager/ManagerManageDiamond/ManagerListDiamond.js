import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ManagerSidebar from '../../../components/ManagerSidebar/ManagerSidebar.js';
import '../../../styles/Manager/ManagerManageDiamond/ManagerListDiamond.scss';
import { ShowCartItems } from '../../../services/ManagerService.js';
import logo from '../../../assets/img/logo.png';

const ManagerManageDiamond = () => {
    const [cartItems, setCartItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ShowCartItems();
                setCartItems(response);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 6;

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = cartItems.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(cartItems.length / ordersPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearchKeyPress = async (e) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            // Implement search logic here
            const response = await fetch(`https://localhost:7184/api/diamonds/search?name=${searchQuery}`);
            const data = await response.json();
            setCartItems(data);
        }
    };

    return (
        <div className="manager_manage_diamond_all_container">
            <ManagerSidebar currentPage="manager_manage_diamond" />
            <div className="manager_manage_diamond_content">
                <div className="manager_manage_diamond_header">
                    <img className="logo" src={logo} alt="Logo" />
                    <div className="search_section">
                        <input
                            type="text"
                            className="search_bar"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={handleSearchKeyPress}
                        />
                    </div>
                </div>
                <hr className="manager_header_line"></hr>
                <div className="manager_manage_diamond_table_wrapper">
                    <table className="manager_manage_diamond_table table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Shape</th>
                                <th>Color</th>
                                <th>Clarity</th>
                                <th>Carat</th>
                                <th>Cut</th>
                                <th>Cost</th>
                                <th>Quantity</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentOrders.map((item) => (
                                <tr key={item.diamondId}>
                                    <td>{item.diamondId}</td>
                                    <td>{item.shape}</td>
                                    <td>{item.color}</td>
                                    <td>{item.clarity}</td>
                                    <td>{item.carat}</td>
                                    <td>{item.cut}</td>
                                    <td>{item.cost}</td>
                                    <td>{item.amountAvailable}</td>
                                    <td>
                                        {/* Add any action buttons here */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="manager_manage_diamond_pagination">
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                            &lt;
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={index + 1 === currentPage ? 'manager_order_active' : ''}
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
        </div>
    );
};

export default ManagerManageDiamond;
