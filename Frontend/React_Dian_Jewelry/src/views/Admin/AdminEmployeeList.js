import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar.js';
import '../../styles/Manager/ManagerList.scss';
import logo from '../../assets/img/logoN.png';
import swal from 'sweetalert';
import { ShowAllEmployee, updateStatusById, getEmployeeDetail, getEmployeeByRole, getEmployeeByEmail } from '../../services/AdminService/AdminEmployeeService.js';
const AdminEmployeeList = () => {
    const [employeeList, setEmployeeList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ShowAllEmployee();
                setEmployeeList(response);
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
    const currentEmployee = employeeList.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(employeeList.length / ordersPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Search diamond by id
    const handleSearchKeyPress = async (e) => {

        if (e.key === 'Enter') {
            if (searchQuery.trim().includes("@")) {
                try {
                    const response = await getEmployeeByEmail(searchQuery.trim());
                    setEmployeeList([response]);
                    setCurrentPage(1);
                } catch (error) {
                    console.error("Error fetching employee:", error);
                    swal("Employee not found!", "Please try another one.", "error");
                }
            } else if (searchQuery.trim()) {
                try {
                    const response = await getEmployeeByRole(searchQuery.trim());
                    if (Array.isArray(response)) {
                        setEmployeeList(response);
                    }
                    else if (response) {
                        setEmployeeList([response]);
                    }
                    else {
                        setEmployeeList([]);
                    }

                    setCurrentPage(1);
                } catch (error) {
                    console.error("Error fetching employee:", error);
                    swal("Employee not found!", "Please try another one.", "error");
                }
            }
            else {
                try {
                    const response = await ShowAllEmployee();
                    setEmployeeList(response);
                    setCurrentPage(1);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        }
    };

    // Delete diamond by id 

    const handleStatus = async (employeeID) => {
        try {
            const employee = await getEmployeeDetail(employeeID);
            const employeeStatus = employee.status;
            const action = employeeStatus ? "DEACTIVATE" : "ACTIVATE";
            const swalResult = await swal({
                title: `Are you sure to ${action} this Employee account?`,
                icon: "warning",
                buttons: true,
                dangerMode: true,
            });

            if (swalResult) {
                await updateStatusById(employeeID);
                const response = await ShowAllEmployee();
                setEmployeeList(response);
                swal(`${action} successfully!`, "Employee account status has been changed.", "success");
            }
        } catch (error) {
            console.error("Error changing Employee status:", error);
            swal("Something went wrong!", "Failed to change Employee status. Please try again.", "error");
        }
    };
    return (
        <div className="manager_manage_diamond_all_container">
            <div className="manager_manage_diamond_sidebar">
                <AdminSidebar currentPage="admin_manage_employee" />
            </div>
            <div className="manager_manage_diamond_content">
                <div className="manager_manage_diamond_header">
                    <img className="manager_manage_diamond_logo" src={logo} alt="Logo" />
                    <div className="manager_manage_diamond_search_section">
                        <input
                            type="text"
                            className="manager_manage_diamond_search_bar"
                            placeholder="Search by Email or Role..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={handleSearchKeyPress}
                        />
                    </div>
                </div>
                <hr className="manager_header_line"></hr>
                <h3>List Of Employee Accounts</h3>
                <div className="manager_manage_diamond_create_button_section">
                    <button className="manager_manage_diamond_create_button" onClick={() => navigate('/admin-add-employee')}>Create new employee</button>
                </div>
                <div className="manager_manage_diamond_table_wrapper">
                    <table className="manager_manage_diamond_table table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Role</th>
                                <th>Email</th>
                                <th>Full Name</th>
                                <th>Phone number</th>
                                <th>Address</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employeeList.length > 0 ? (
                                currentEmployee.map((item) => (
                                    <tr key={item.employeeId}>
                                        <td>{item.employeeId}</td>
                                        <td>{item.role}</td>
                                        <td>{item.email}</td>
                                        <td>{item.firstName} {item.lastName}</td>
                                        <td>{item.phoneNumber}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button style={{ backgroundColor: item.status ? '#41c974' : '#c94143', color: 'white', border: "none", borderRadius: '5px', fontSize: '15px', paddingBottom: '3px', paddingRight: '8px' }}><i className="" onClick={() => handleStatus(item.employeeId)} style={{ cursor: 'pointer' }}>{item.status ? "Active" : "Deactive"}</i></button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="10">No Employee found</td>
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

export default AdminEmployeeList;
