import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ManagerSidebar from '../../../components/ManagerSidebar/ManagerSidebar.js';
import '../../../styles/Manager/ManagerList.scss';
import { ShowAllShell, getShellDetail, deleteShellById, updateShellById, getShellByName } from '../../../services/ManagerService/ManagerShellService.js'
import logo from '../../../assets/img/logoN.png';


const ManagerShellList = () => {
    const navigate = useNavigate();

    const [shellItems, setShellItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editedShell, setEditedShell] = useState({});
    const [originalShell, setOriginalShell] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ShowAllShell();
                setShellItems(response);
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
    const currentShell = shellItems.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(shellItems.length / ordersPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Search diamond by id
    const handleSearchKeyPress = async (e) => {
        const isInteger = (value) => {
            return /^-?\d+$/.test(value);
        };
        if (e.key === 'Enter') {
            if (isInteger(searchQuery.trim())) {
                try {
                    const response = await getShellDetail(searchQuery.trim());
                    setShellItems([response]);
                    setCurrentPage(1);
                } catch (error) {
                    console.error("Error fetching shell:", error);
                    swal("Shell not found!", "Please try another one.", "error");
                }
            }else if(searchQuery.trim()){
                try {
                    const response = await getShellByName(searchQuery.trim());
                    if(Array.isArray(response)){
                        setShellItems(response);
                    }
                    else if(response){
                       setShellItems([response]); 
                    }
                    else{
                        setShellItems([]);
                    }
                    setCurrentPage(1);
                } catch (error) {
                    console.error("Error fetching shell:", error);
                    swal("Shell not found!", "Please try another one.", "error");
                }
            }
             else {
                try {
                    const response = await ShowAllShell();
                    setShellItems(response);
                    setCurrentPage(1);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        }
    };

    // Delete diamond by id 
    const handleDelete = async (shellID) => {
        swal({
            title: "Are you sure to delete this shell?",
            text: "This action cannot be undone",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                try {
                    await deleteShellById(shellID);
                    const response = await ShowAllShell();
                    setShellItems(response);
                    swal("Deleted successfully!", "The shell has been deleted.", "success");
                } catch (error) {
                    console.error("Error deleting shell:", error);
                    swal("Something went wrong!", "Failed to delete the shell. Please try again.", "error");
                }
            }
        });
    };


    // Update by id
    const handleEdit = (shell) => {
        setEditMode(true);
        setEditedShell(shell);
        setOriginalShell(shell);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedShell({ ...editedShell, [name]: value });
    };

    const handleUpdate = async () => {
        const status = true;
        const price = 0;
        const requiredFields = ['name', 'amountAvailable'];
        for (let field of requiredFields) {
            if (!editedShell[field]) {
                swal("Please fill in all fields!", `Field cannot be empty.`, "error");
                return;
            }
        }

        const isEqual = JSON.stringify(originalShell) === JSON.stringify(editedShell);
        if (isEqual) {
            swal("No changes detected!", "You have not made any changes.", "error");
            return;
        }

        const shellToUpdate = { ...editedShell, status: true };

        try {
            console.log("Sending update request with data:", shellToUpdate);
            const response = await updateShellById(shellToUpdate.shellMaterialId, shellToUpdate);
            console.log("Update response:", response.data);
            const updatedItems = await ShowAllShell();
            setShellItems(updatedItems);
            setEditMode(false);
            swal("Updated successfully!", "The shell information has been updated.", "success");
        } catch (error) {
            console.error("Error updating shell:", error.response ? error.response.data : error.message);
            swal("Something went wrong!", "Failed to update. Please try again.", "error");
        }
    };


    return (
        <div className="manager_manage_diamond_all_container">
            <div className="manager_manage_diamond_sidebar">
                <ManagerSidebar currentPage="manager_manage_shell" />
            </div>
            <div className="manager_manage_diamond_content">
                <div className="manager_manage_diamond_header">
                    <img className="manager_manage_diamond_logo" src={logo} alt="Logo" />
                    <div className="manager_manage_diamond_search_section">
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
                <hr className="manager_header_line"></hr>
                
                <h3>List Of Shells</h3>

                <div className="manager_manage_diamond_create_button_section">
                    <button className="manager_manage_diamond_create_button" onClick={() => navigate('/managerAddShell')}>Add new shell</button>
                </div>

                {/* Table diamond list */}
                <div className="manager_manage_diamond_table_wrapper">
                    <table className="manager_manage_diamond_table table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Amount Available</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {shellItems.length > 0 ? (
                                currentShell.map((item) => (
                                    <tr key={item.shellMaterialId}>
                                        <td>{item.shellMaterialId}</td>
                                        <td>{item.name}</td>
                                        <td>{item.amountAvailable}</td>
                                        <td>
                                            <i className="fas fa-pen" onClick={() => handleEdit(item)} style={{ cursor: 'pointer', marginRight: '10px' }}></i>
                                            <i className="fas fa-trash" onClick={() => handleDelete(item.shellMaterialId)} style={{ cursor: 'pointer' }}></i>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="10">No shell found</td>
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

            {/* Update modal */}
            {editMode && (
                <div className="manager_manage_diamond_modal_overlay" onClick={() => setEditMode(false)}>
                    <div className="manager_manage_diamond_update_modal" onClick={(e) => e.stopPropagation()}>
                        <div className="manager_manage_diamond_modal_content">
                            <h4>Edit Shell Information</h4>
                            <div className="manager_manage_diamond_form_group">
                                <label>Shell</label>
                                <input type="text" name="name" value={editedShell.name} onChange={handleChange} />
                            </div>
                            <div className="manager_manage_diamond_form_group">
                                <label>Amount Available</label>
                                <input type="text" name="amountAvailable" value={editedShell.amountAvailable} onChange={handleChange} />
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

export default ManagerShellList;
