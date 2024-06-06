import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ManagerSidebar from '../../../components/ManagerSidebar/ManagerSidebar.js';
import '../../../styles/Manager/ManagerManageDiamond/ManagerDiamondList.scss';
import { ShowAllProduct,getProductDetail, deleteProductById } from '../../../services/ManagerService/ManagerDiamondService.js';
import logo from '../../../assets/img/logo.png';

const ManagerProductList = () => {
    const navigate = useNavigate();

    const [productItems, setProductItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editedProduct, setEditedProduct] = useState({});
    const [originalDiamond, setOriginalDiamond] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ShowAllProduct();
                setProductItems(response);
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
    const currentOrders = productItems.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(productItems.length / ordersPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Search diamond by id
    const handleSearchKeyPress = async (e) => {
        if (e.key === 'Enter') {
            if (searchQuery.trim()) {
                try {
                    const response = await getProductDetail(searchQuery.trim());
                    setProductItems([response]);
                    setCurrentPage(1);
                } catch (error) {
                    console.error("Error fetching diamond:", error);
                    swal("Diamond not found!", "Please try another one.", "error");
                }
            } else {
                try {
                    const response = await ShowAllProduct();
                    setProductItems(response);
                    setCurrentPage(1);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        }
    };

    // Delete diamond by id 
    const handleDelete = async (productID) => {
        swal({
            title: "Are you sure to delete this diamond?",
            text: "This action cannot be undone",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                try {
                    await deleteProductById(productID);
                    const response = await ShowAllProduct();
                    setProductItems(response);
                    swal("Deleted successfully!", "The diamond has been deleted.", "success");
                } catch (error) {
                    console.error("Error deleting diamond:", error);
                    swal("Something went wrong!", "Failed to delete the diamond. Please try again.", "error");
                }
            }
        });
    };


    // Update by id
    const handleEdit = (product) => {
    //     setEditMode(true);
    //     setEditedDiamond(diamond);
    //     setOriginalDiamond(diamond);
     };

     const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setEditedDiamond({ ...editedDiamond, [name]: value });
    };

     const handleUpdate = async () => {
    //     const requiredFields = ['name', 'price', 'imageLinkList', 'categoryID', 'collectionId', 'cost'];
    //     for (let field of requiredFields) {
    //         if (!editedDiamond[field]) {
    //             swal("Please fill in all fields!", `Field cannot be empty.`, "error");
    //             return;
    //         }
    //     }

    //     const isEqual = JSON.stringify(originalDiamond) === JSON.stringify(editedDiamond);
    //     if (isEqual) {
    //         swal("No changes detected!", "You have not made any changes.", "error");
    //         return;
    //     }

    //     const diamondToUpdate = { ...editedDiamond, status: true };

    //     try {
    //         console.log("Sending update request with data:", diamondToUpdate);
    //         const response = await updateDiamondById(diamondToUpdate.diamondId, diamondToUpdate);
    //         console.log("Update response:", response.data);
    //         const updatedItems = await ShowAllDiamond();
    //         setCartItems(updatedItems);
    //         setEditMode(false);
    //         swal("Updated successfully!", "The diamond information has been updated.", "success");
    //     } catch (error) {
    //         console.error("Error updating diamond:", error.response ? error.response.data : error.message);
    //         swal("Something went wrong!", "Failed to update. Please try again.", "error");
    //     }
     };


    return (
        <div className="manager_manage_diamond_all_container">
            <div className="manager_manage_diamond_sidebar">
                <ManagerSidebar currentPage="manager_manage_product" />
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
                <div className="manager_manage_diamond_create_button_section">
                    <button className="manager_manage_diamond_create_button" onClick={() => navigate('/managerAddDiamond')}>Add new product</button>
                </div>

                {/* Table diamond list */}
                <div className="manager_manage_diamond_table_wrapper">
                    <h1>List of products</h1>
                    <table className="manager_manage_diamond_table table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Image</th>
                                <th>Category</th>
                                <th>Collection</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productItems.length > 0 ? (
                                currentOrders.map((item) => (
                                    <tr key={item.productId}>
                                        <td>{item.productId}</td>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.imageLinkList}</td>
                                        <td>{item.categoryID}</td>
                                        <td>{item.collectionId}</td>
                                        <td>
                                            <i className="fas fa-pen" onClick={() => handleEdit(item)} style={{ cursor: 'pointer', marginRight: '10px' }}></i>
                                            <i className="fas fa-trash" onClick={() => handleDelete(item.productId)} style={{ cursor: 'pointer' }}></i>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="10">No products found</td>
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
            {/* {editMode && (
                <div className="manager_manage_diamond_modal_overlay" onClick={() => setEditMode(false)}>
                    <div className="manager_manage_diamond_update_modal" onClick={(e) => e.stopPropagation()}>
                        <div className="manager_manage_diamond_modal_content">
                            <h4>Edit Diamond Information</h4>
                            <div className="manager_manage_diamond_form_group">
                                <label>Shape</label>
                                <input type="text" name="shape" value={editedDiamond.shape} onChange={handleChange} />
                            </div>
                            <div className="manager_manage_diamond_form_group">
                                <label>Color</label>
                                <input type="text" name="color" value={editedDiamond.color} onChange={handleChange} />
                            </div>
                            <div className="manager_manage_diamond_form_group">
                                <label>Clarity</label>
                                <input type="text" name="clarity" value={editedDiamond.clarity} onChange={handleChange} />
                            </div>
                            <div className="manager_manage_diamond_form_group">
                                <label>Carat</label>
                                <input type="text" name="carat" value={editedDiamond.carat} onChange={handleChange} />
                            </div>
                            <div className="manager_manage_diamond_form_group">
                                <label>Cut</label>
                                <input type="text" name="cut" value={editedDiamond.cut} onChange={handleChange} />
                            </div>
                            <div className="manager_manage_diamond_form_group">
                                <label>Cost</label>
                                <input type="text" name="cost" value={editedDiamond.cost} onChange={handleChange} />
                            </div>
                            <div className="manager_manage_diamond_form_group">
                                <label>Quantity</label>
                                <input type="text" name="amountAvailable" value={editedDiamond.amountAvailable} onChange={handleChange} />
                            </div>
                            <div className="manager_manage_diamond_form_group">
                                <label>Certificate</label>
                                <input type="text" name="certificateScan" value={editedDiamond.certificateScan} onChange={handleChange} />
                            </div>
                            <div className="manager_manage_diamond_modal_actions">
                                <button onClick={() => setEditMode(false)}>Cancel</button>
                                <button onClick={handleUpdate}>Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            )} */}
        </div>
    );
};

export default ManagerProductList;
