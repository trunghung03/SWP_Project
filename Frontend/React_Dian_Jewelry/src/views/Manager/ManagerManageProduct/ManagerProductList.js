import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ManagerSidebar from '../../../components/ManagerSidebar/ManagerSidebar.js';
import '../../../styles/Manager/ManagerListProduct.scss';
import { ShowAllProduct, getProductDetail, updateProductById, deleteProductById, getProductCollection, getProductCategory, getProductDiamond } from '../../../services/ManagerService/ManagerProductService.js';
import logo from '../../../assets/img/logoN.png';

const ManagerProductList = () => {
    const navigate = useNavigate();

    const [productItems, setProductItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editedProduct, setEditedProduct] = useState({});
    const [originalProduct, setOriginalProduct] = useState({});
    const [categories, setCategories] = useState({});
    const [collections, setCollections] = useState({});
    const [mainDiamonds, setMainDiamonds] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ShowAllProduct();
                setProductItems(response);
                const categoryMap = {};
                const collectionMap = {};
                const mainDiamondMap = {};
                for (const product of response) {
                    if (!categoryMap[product.categoryId]) {
                        const category = await getProductCategory(product.categoryId);
                        categoryMap[product.categoryId] = category.name;
                    }
                    if (!collectionMap[product.collectionId]) {
                        const collection = await getProductCollection(product.collectionId);
                        collectionMap[product.collectionId] = collection.name;
                    }
                    if (!mainDiamondMap[product.mainDiamondId]) {
                        const mainDiamond = await getProductDiamond(product.mainDiamondId);
                        mainDiamondMap[product.mainDiamondId] = mainDiamond.shape;
                    }
                }
                setCategories(categoryMap);
                setCollections(collectionMap);
                setMainDiamonds(mainDiamondMap);
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
                    swal("Product not found!", "Please try another one.", "error");
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
            title: "Are you sure to delete this product?",
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
                    swal("Deleted successfully!", "The product has been deleted.", "success");
                } catch (error) {
                    console.error("Error deleting diamond:", error);
                    swal("Something went wrong!", "Failed to delete the product. Please try again.", "error");
                }
            }
        });
    };

    // Update by id
    const handleEdit = (diamond) => {
        setEditMode(true);
        setEditedProduct(diamond);
        setOriginalProduct(diamond);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct({ ...editedProduct, [name]: value });
    };

    const handleUpdate = async () => {
        const requiredFields = ["productCode",
            "name",
            "price",
            "description",
            "mainDiamondId",
            "laborPrice",
            "imageLinkList",
            "subDiamondAmount",
            "mainDiamondAmount",
            "shellAmount",
            "collectionId",
            "categoryId"];
        for (let field of requiredFields) {
            if (!editedProduct[field]) {
                swal("Please fill in all fields!", `Field cannot be empty.`, "error");
                return;
            }
        }

        const isEqual = JSON.stringify(originalProduct) === JSON.stringify(editedProduct);
        if (isEqual) {
            swal("No changes detected!", "You have not made any changes.", "error");
            return;
        }

        const productToUpdate = { ...editedProduct, status: true };

        try {
            console.log("Sending update request with data:", productToUpdate);
            const response = await updateProductById(productToUpdate.productId, productToUpdate);
            console.log("Update response:", response.data);
            const updatedItems = await ShowAllProduct();
            setProductItems(updatedItems);
            setEditMode(false);
            swal("Updated successfully!", "The product information has been updated.", "success");
        } catch (error) {
            console.error("Error updating product:", error.response ? error.response.data : error.message);
            swal("Something went wrong!", "Failed to update. Please try again.", "error");
        }
    };

    return (
        <div className="manager_manage_product_all_container">
            <div className="manager_manage_product_sidebar">
                <ManagerSidebar currentPage="manager_manage_product" />
            </div>
            <div className="manager_manage_product_content">
                <div className="manager_manage_product_header">
                    <img className="manager_manage_product_logo" src={logo} alt="Logo" />
                    <div className="manager_manage_product_search_section">
                        <input
                            type="text"
                            className="manager_manage_product_search_bar"
                            placeholder="Search by ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={handleSearchKeyPress}
                        />
                    </div>
                </div>
                <hr className="manager_product_header_line"></hr>
                <h3>List Of Products</h3>
                <div className="manager_manage_product_create_button_section">
                    <button className="manager_manage_product_create_button" onClick={() => navigate('/managerAddProduct')}>Add new product</button>
                </div>

                {/* Table diamond list */}
                <div className="manager_manage_product_table_wrapper">
                    <table className="manager_manage_product_table table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Code</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Labor</th>
                                <th>Description</th>
                                <th>Diamond</th>
                                <th>Main & Sub Diamond Amount</th>
                                <th>Shell Weight</th>
                                <th>Images</th>
                                <th>Category</th>
                                <th>Collection</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productItems.length > 0 ? (
                                currentOrders.map((item) => (
                                    <tr key={item.productId}>
                                        <td>{item.productId}</td>
                                        <td>{item.productCode}</td>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.laborPrice}</td>
                                        <td>{item.description}</td>
                                        <td>{mainDiamonds[item.mainDiamondId]}</td>
                                        <td>{item.mainDiamondAmount} / {item.subDiamondAmount}</td>
                                        <td>{item.shellAmount}</td>
                                        <td>
                                            {item.imageLinkList
                                                ? item.imageLinkList.split(';').map((image, index) => (
                                                    <img key={index} src={image} alt={`Product ${index + 1}`} style={{ width: '60px', height: 'auto', marginRight: '5px' }} />
                                                ))
                                                : 'No image'}
                                        </td>
                                        <td>{categories[item.categoryId]}</td>
                                        <td>{collections[item.collectionId]}</td>
                                        <td>
                                            <i className="fas fa-pen" onClick={() => handleEdit(item)} style={{ cursor: 'pointer', marginRight: '10px' }}></i>
                                            <i className="fas fa-trash" onClick={() => handleDelete(item.productId)} style={{ cursor: 'pointer' }}></i>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="13">No product found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="manager_manage_product_pagination">
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
                <div className="manager_manage_product_modal_overlay" onClick={() => setEditMode(false)}>
                    <div className="manager_manage_product_update_modal" onClick={(e) => e.stopPropagation()}>
                        <div className="manager_manage_product_modal_content">
                            <h4>Edit Product Information</h4>
                            <div className="manager_manage_product_form_group">
                                <label>Product Code</label>
                                <input type="text" name="productCode" value={editedProduct.productCode} onChange={handleChange} />
                            </div>
                            <div className="manager_manage_product_form_group">
                                <label>Name</label>
                                <input type="text" name="name" value={editedProduct.name} onChange={handleChange} />
                            </div>
                            <div className="manager_manage_product_form_group">
                                <label>Price</label>
                                <input type="text" name="price" value={editedProduct.price} onChange={handleChange} />
                            </div>
                            <div className="manager_manage_product_form_group">
                                <label>Description</label>
                                <input type="text" name="description" value={editedProduct.description} onChange={handleChange} />
                            </div>
                            <div className="manager_manage_product_form_group">
                                <label>Main Diamond ID</label>
                                <input type="text" name="mainDiamondId" value={editedProduct.mainDiamondId} onChange={handleChange} />
                            </div>
                            <div className="manager_manage_product_form_group">
                                <label>Labor Price</label>
                                <input type="text" name="laborPrice" value={editedProduct.laborPrice} onChange={handleChange} />
                            </div>
                            <div className="manager_manage_product_form_group">
                                <label>Image</label>
                                <input type="text" name="imageLinkList" value={editedProduct.imageLinkList} onChange={handleChange} />
                            </div>
                            <div className="manager_manage_product_form_group">
                                <label>Main Diamond Amount</label>
                                <input type="text" name="mainDiamondAmount" value={editedProduct.mainDiamondAmount} onChange={handleChange} />
                            </div>

                            <div className="manager_manage_product_form_group">
                                <label>Sub Diamond Amount</label>
                                <input type="text" name="subDiamondAmount" value={editedProduct.subDiamondAmount} onChange={handleChange} />
                            </div>

                            <div className="manager_manage_product_form_group">
                                <label>Shell Amount</label>
                                <input type="text" name="shellAmount" value={editedProduct.shellAmount} onChange={handleChange} />
                            </div>

                            <div className="manager_manage_product_form_group">
                                <label>Collection ID</label>
                                <input type="text" name="collectionId" value={editedProduct.collectionId} onChange={handleChange} />
                            </div>

                            <div className="manager_manage_product_form_group">
                                <label>Category ID</label>
                                <input type="text" name="categoryID" value={editedProduct.categoryId} onChange={handleChange} />
                            </div>
                            <div className="manager_manage_product_modal_actions">
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

export default ManagerProductList;
