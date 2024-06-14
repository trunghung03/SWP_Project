
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../../styles/SalesStaff/SalesStaffManageWarranty/SSWarrantyList.scss';
import '../../../styles/Manager/ManagerList.scss';
import SalesStaffSidebar from '../../../components/SalesStaffSidebar/SalesStaffSidebar.js';
import { fetchAllWarranty, updateWarranty, deleteWarranty, fetchWarrantyDetail } from '../../../services/SalesStaffService/SSWarrantyService.js';
import logo from '../../../assets/img/logo.png';
const SSWarrantyList = () => {
    const navigate = useNavigate();
    const [warrantyList, setWarrantyList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editedWarranty, setEditedWarranty] = useState({});
    const [originalWarranty, setOriginalWarranty] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchAllWarranty();
                setWarrantyList(response);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    console.log(warrantyList.status);

    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 6;
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentWarranty = warrantyList.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(warrantyList.length / ordersPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearchKeyPress = async (e) => {
        if (e.key === 'Enter') {
            if (searchQuery.trim()) {
                try {
                    const response = await fetchWarrantyDetail(searchQuery.trim());
                    setWarrantyList([response]);
                    setCurrentPage(1);
                } catch (error) {
                    console.error("Error fetching warranty:", error);
                    swal("Warranty not found!", "Please try another one.", "error");
                }
            } else {
                try {
                    const response = await fetchAllWarranty();
                    setWarrantyList(response);
                    setCurrentPage(1);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        }
    };
    // Delete diamond by id 
    const handleDelete = async (orderDetailId) => {
        swal({
            title: "Are you sure to delete this diamond?",
            text: "This action cannot be undone",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                try {
                    const status = false;
                    await deleteWarranty(orderDetailId,status);
                    const response = await fetchAllWarranty();
                    setWarrantyList(response);
                    swal("Deleted successfully!", "The warranty has been deleted.", "success");
                } catch (error) {
                    console.error("Error deleting diamond:", error);
                    swal("Something went wrong!", "Failed to delete the warranty. Please try again.", "error");
                }
            }
        });
    };


    // Update by id
    const handleEdit = (warranty) => {
        setEditMode(true);
        setEditedWarranty(warranty);
        setOriginalWarranty(warranty);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedWarranty({ ...editedWarranty, [name]: value });
    };

    const handleUpdate = async () => {
        const requiredFields = ["status"];
        for (let field of requiredFields) {
            if (!editedWarranty[field]) {
                swal("Please fill in all fields!", `Field cannot be empty.`, "error");
                return;
            }
        }

        const isEqual = JSON.stringify(originalWarranty) === JSON.stringify(editedWarranty);
        if (isEqual) {
            swal("No changes detected!", "You have not made any changes.", "error");
            return;
        }

        const warrantyToUpdate = { ...editedWarranty, status: true };

        try {
            console.log("Sending update request with data:", warrantyToUpdate);
            const response = await updateWarranty(warrantyToUpdate.orderDetailId, warrantyToUpdate);
            console.log("Update response:", response.data);
            const updatedItems = await fetchAllWarranty();
            setWarrantyList(updatedItems);
            setEditMode(false);
            swal("Updated successfully!", "The warranty information has been updated.", "success");
        } catch (error) {
            console.error("Error updating diamond:", error.response ? error.response.data : error.message);
            swal("Something went wrong!", "Failed to update. Please try again.", "error");
        }
    };

    return (
        <div className="ss_manage_content_all_container">
            <div className="ss_manage_content_sidebar">
                <SalesStaffSidebar currentPage="salesstaff_manage_warranty" />
            </div>
            <div className="ss_manage_content_content">
                <div className="ss_manage_content_header">
                    <img className="ss_manage_content_logo" src={logo} alt="Logo" />
                    <div className="ss_manage_content_search_section">
                        <input
                            type="text"
                            className="manager_manage_diamond_search_bar"
                            placeholder="Search by ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={handleSearchKeyPress}
                        />
                    </div>
                </div>
                <hr className="ss_manage_content_line"></hr>
                <div className="manager_manage_diamond_create_button_section">
                    <button className="manager_manage_diamond_create_button" onClick={() => navigate('/saleStaffAddNewWarranty')}>Add new Warranty</button>
                </div>

                {/* Table diamond list */}
                <div className="manager_manage_diamond_table_wrapper">
                    <h1>List of employees</h1>
                    <table className="manager_manage_diamond_table table">
                        <thead>
                            <tr>
                                <th>Order Detail ID</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {warrantyList.length > 0 ? (
                                currentWarranty.map((item) => (
                                    <tr key={item.orderDetailId}>
                                        <td>{item.orderDetailId}</td>
                                        <td>{item.startDate}</td>
                                        <td>{item.endDate}</td>
                                        <td>{item.status !== undefined ? item.status.toString() : 'N/A'}</td>
                                        <td>
                                            <i className="fas fa-pen" onClick={() => handleEdit(item)} style={{ cursor: 'pointer', marginRight: '10px' }}></i>
                                            <i className="fas fa-trash" onClick={() => handleDelete(item.orderDetailId)} style={{ cursor: 'pointer' }}></i>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="10">No employee found</td>
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
            {editMode && (
                <div className="manager_manage_diamond_modal_overlay" onClick={() => setEditMode(false)}>
                    <div className="manager_manage_diamond_update_modal" onClick={(e) => e.stopPropagation()}>
                        <div className="manager_manage_diamond_modal_content">
                            <div className="manager_manage_diamond_form_group">
                                <label>Status</label>
                                <input type="text" name="status" value={editedWarranty.status} onChange={handleChange} />
                            </div>
                            <div className="manager_manage_diamond_modal_actions">
                                <button onClick={() => setEditMode(false)}>Cancel</button>
                                <button onClick={handleUpdate}>Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
};

export default SSWarrantyList;
