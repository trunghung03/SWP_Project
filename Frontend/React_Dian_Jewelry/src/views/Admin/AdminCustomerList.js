import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar.js';
import '../../styles/Manager/ManagerList.scss';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logoN.png';
import { ShowAllCustomer, getCustomerDetail, getCustomerByName, changeStatus,getCustomerById } from '../../services/AdminService/AdminCustomerService.js';
const AdminCustomerList = () => {
    const navigate = useNavigate();
    const [customerList, setCustomerList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editedCustomer, setEditedCustomer] = useState({});
    const [originalCustomer, setOriginalCustomer] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ShowAllCustomer();
                setCustomerList(response);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 6;

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentCustomer = customerList.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(customerList.length / ordersPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Search diamond by id
    const handleSearchKeyPress = async (e) => {

        if (e.key === 'Enter') {
            if (searchQuery.trim().includes("@")) {
                try {
                    const response = await getCustomerDetail(searchQuery.trim());
                    setCustomerList([response]);
                    setCurrentPage(1);
                } catch (error) {
                    console.error("Error fetching diamond:", error);
                    swal("Customer not found!", "Please try another one.", "error");
                }
            } else if (searchQuery.trim()) {
                try {
                    const response = await getCustomerByName(searchQuery.trim());
                    if (Array.isArray(response)) {
                        setCustomerList(response);
                    }
                    else if (response) {
                        setCustomerList([response]);
                    }
                    else {
                        setCustomerList([]);
                    }

                    setCurrentPage(1);
                } catch (error) {
                    console.error("Error fetching diamond:", error);
                    swal("Customer not found!", "Please try another one.", "error");
                }
            }
            else {
                try {
                    const response = await ShowAllCustomer();
                    setCustomerList(response);
                    setCurrentPage(1);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        }
    };

    // Delete diamond by id 
    
    const handleStatus = async (customerID) => {
        try {
            const customer = await getCustomerById(customerID);
            const customerStatus = customer.status;
            const action = customerStatus ? "DEACTIVATE" : "ACTIVATE";
            const swalResult = await swal({
                title: `Are you sure to ${action} this customer account?`,
                icon: "warning",
                buttons: true,
                dangerMode: true,
            });

            if (swalResult) {
                await changeStatus(customerID);
                const response = await ShowAllCustomer();
                setCustomerList(response);
                swal(`${action} successfully!`, "Customer account status has been changed.", "success");
            }
        } catch (error) {
            console.error("Error changing customer status:", error);
            swal("Something went wrong!", "Failed to change Customer status. Please try again.", "error");
        }
    };

    return (
        <div className="manager_manage_diamond_all_container">
            <div className="manager_manage_diamond_sidebar">
                <AdminSidebar currentPage="admin_manage_customer" />
            </div>
            <div className="manager_manage_diamond_content">
                <div className="manager_manage_diamond_header">
                    <img className="manager_manage_diamond_logo" src={logo} alt="Logo" />
                    <div className="manager_manage_diamond_search_section">
                        <input
                            type="text"
                            className="manager_manage_diamond_search_bar"
                            placeholder="Search by Email or Name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={handleSearchKeyPress}
                        />
                    </div>
                </div>
                <hr className="manager_header_line"></hr>
                <h3>List Of Customer Accounts</h3>

                {/* chinh tu day tro xuong */}

                <div className="manager_manage_diamond_table_wrapper">
                    <table className="manager_manage_diamond_table table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>Full Name</th>
                                <th>Phone number</th>
                                <th>Address</th>
                                <th>Points</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customerList.length > 0 ? (
                                currentCustomer.map((item) => (
                                    <tr key={item.customerId}>
                                        <td>{item.customerId}</td>
                                        <td>{item.email}</td>
                                        <td>{item.firstName} {item.lastName}</td>
                                        <td>{item.phoneNumber}</td>
                                        <td>{item.address}</td>
                                        <td> {item.points}</td>
                                        <td>
                                        <button style={{backgroundColor: item.status ? '#1fd655' : 'red', color: 'white', border: "none", borderRadius: '5px'}}><i className="active_deactive_btn" onClick={() => handleStatus(item.customerId)} style={{ cursor: 'pointer'}}>{item.status?"Active":"Deactive"}</i></button>    
                                           </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="10">No Customer found</td>
                                </tr>
                            )}
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

export default AdminCustomerList;
