import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ManagerSidebar from "../../../components/ManagerSidebar/ManagerSidebar.js";
import "../../../styles/Manager/ManagerListProduct.scss";
import {
  ShowAllProduct,
  getProductDetail,
  updateProductById,
  deleteProductById,
  getProductCollection,
  getProductCategory,
  getProductDiamond,
} from "../../../services/ManagerService/ManagerProductService.js";
import logo from "../../../assets/img/logoN.png";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {Visibility } from "@mui/icons-material";

const ManagerProductList = () => {
  const navigate = useNavigate();

  const [productItems, setProductItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedProduct, setEditedProduct] = useState({});
  const [originalProduct, setOriginalProduct] = useState({});
  const [categories, setCategories] = useState({});
  const [collections, setCollections] = useState({});
  const [mainDiamonds, setMainDiamonds] = useState({});
  const [isSearch , setIsSearch] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 6,
    totalPages: 1,
    totalCount: 0,
  });

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#f9c6bb',
      color: '1c1c1c',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const fetchData = async (page = 1, query = '') => {
    try {
      const response = await ShowAllProduct(page, pagination.pageSize, query);
      setProductItems(response.data);
      setPagination(response.pagination);

      const categoryMap = {};
      const collectionMap = {};
      const mainDiamondMap = {};

      for (const product of response.data) {
        if (product.categoryId !== null && !categoryMap[product.categoryId]) {
          const category = await getProductCategory(product.categoryId);
          categoryMap[product.categoryId] = category.name;
        }

        if (product.collectionId !== null && !collectionMap[product.collectionId]) {
          const collection = await getProductCollection(product.collectionId);
          collectionMap[product.collectionId] = collection.name;
        }

        if (product.mainDiamondId !== null && !mainDiamondMap[product.mainDiamondId]) {
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

  useEffect(() => {
    fetchData(pagination.currentPage);
  }, [pagination.currentPage]);

  const handlePageChange = (pageNumber) => {
    setPagination((prev) => ({ ...prev, currentPage: pageNumber }));
    fetchData(pageNumber, searchQuery);
  };

  const handleSearchKeyPress = async (e) => {
    const isInteger = (value) => {
      return /^-?\d+$/.test(value);
    };
    if (e.key === "Enter") {
      if (isInteger(searchQuery.trim())) {
        setIsSearch(true);
        try {
          const response = await getProductDetail(searchQuery.trim());
          setProductItems([response]);
          setPagination({
            currentPage: 1,
            pageSize: 7,
            totalPages: 1,
            totalCount: 1,
          });
        } catch (error) {
          console.error("Error fetching product:", error);
          swal("Product not found!", "Please try another one.", "error");
        }
      } else if (searchQuery.trim()) {
        setIsSearch(true);
        fetchData(1, searchQuery);
      }
    }
  };

  const handleBack = () => {
    setSearchQuery("");
    fetchData(1);
  };

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
          fetchData(pagination.currentPage, searchQuery);
          swal(
            "Deleted successfully!",
            "The product has been deleted.",
            "success"
          );
        } catch (error) {
          console.error("Error deleting product:", error);
          swal(
            "Something went wrong!",
            "Failed to delete the product. Please try again.",
            "error"
          );
        }
      }
    });
  };

const handleEdit = (product) => {
  setEditMode(true);
  setEditedProduct(product);
  setOriginalProduct(product);
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleUpdate = async () => {
    const requiredFields = [
      "name",
      "description",
      "laborPrice",
      "imageLinkList",
      "collectionId",
      "categoryId",
    ];
    const specialCharPattern = /[$&+?@#|'<>^*()%]/;

    for (let field of requiredFields) {
      if (!editedProduct[field]) {
        swal("Please fill in all fields!", `Field cannot be empty.`, "error");
        return;
      }
      if (specialCharPattern.test(editedProduct[field])) {
        swal("Invalid characters detected!", `Field "${field}" contains special characters.`, "error");
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
      await updateProductById(productToUpdate.productId, productToUpdate);
      fetchData(pagination.currentPage, searchQuery);
      setEditMode(false);
      swal(
        "Updated successfully!",
        "The product information has been updated.",
        "success"
      );
    } catch (error) {
      console.error(
        "Error updating product:",
        error.response ? error.response.data : error.message
      );
      swal(
        "Something went wrong!",
        "Failed to update. Please try again.",
        "error"
      );
    }
  };

  const renderPagination = () => {
    const pages = [];
    const totalPages = pagination.totalPages;
    const currentPage = pagination.currentPage;
  
    if (totalPages <= 5) {
      // Show all pages if total pages are less than or equal to 5
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={i === currentPage ? "manager_order_active" : ""}
          >
            {i}
          </button>
        );
      }
    } else {
      // Show first page
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={1 === currentPage ? "manager_order_active" : ""}
        >
          1
        </button>
      );
  
      if (currentPage > 3) {
        pages.push(<span key="start-ellipsis">...</span>);
      }
  
      // Show previous, current, and next page
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
  
      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={i === currentPage ? "manager_order_active" : ""}
          >
            {i}
          </button>
        );
      }
  
      if (currentPage < totalPages - 2) {
        pages.push(<span key="end-ellipsis">...</span>);
      }
  
      // Show last page
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={totalPages === currentPage ? "manager_order_active" : ""}
        >
          {totalPages}
        </button>
      );
    }
  
    return (
      <div className="manager_manage_diamond_pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {pages}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    );
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
              onKeyUp={handleSearchKeyPress}
            />
          </div>
        </div>
        <hr className="manager_product_header_line"></hr>
        <h3 style={{fontFamily:"Georgia, 'Times New Roman', Times, serif", fontWeight:"500"}}>List Of Products</h3>
        <div className="manager_manage_diamond_create_button_section">
          <button
            className="manager_manage_diamond_create_button"
            onClick={() => navigate("/manager-add-product")}
          >
            Add product
          </button>
          {renderPagination()}
        </div>

        {/* Table product list */}
        <div className="manager_manage_product_table_wrapper">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">ID</StyledTableCell>
                  <StyledTableCell align="center">Code</StyledTableCell>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Price</StyledTableCell>
                  {/* <StyledTableCell align="center">Description</StyledTableCell>
                  <StyledTableCell align="center">Diamond</StyledTableCell>
                  <StyledTableCell align="center">Main & Sub Diamond Amount</StyledTableCell>
                  <StyledTableCell align="center">Shell Weight</StyledTableCell>
                  <StyledTableCell align="center">Images</StyledTableCell>
                  <StyledTableCell align="center">Category</StyledTableCell>
                  <StyledTableCell align="center">Collection</StyledTableCell>
                  <StyledTableCell align="center">Labor</StyledTableCell> */}
                  <StyledTableCell align="center">Stock</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                  <StyledTableCell align="center">View</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productItems.length > 0 ? (
                  productItems.map((item) => (
                    <TableRow className="manager_manage_table_body_row" key={item.productId}>
                      <TableCell align="center">{item.productId}</TableCell>
                      <TableCell align="center">{item.productCode}</TableCell>
                      <TableCell align="center">{item.name}</TableCell>
                      <TableCell align="center">{item.price}</TableCell>
                      <TableCell align="center">quantityyy</TableCell>
                      {/* <TableCell align="center">{item.description}</TableCell>
                      <TableCell align="center">{mainDiamonds[item.mainDiamondId]}</TableCell>
                      <TableCell align="center">
                        {item.mainDiamondAmount} / {item.subDiamondAmount}
                      </TableCell>
                      <TableCell align="center">{item.shellAmount}</TableCell>
                      <TableCell align="center">
                        {item.imageLinkList ? (
                          <img
                            src={item.imageLinkList.split(";")[0]}
                            alt="Product"
                            style={{
                              width: "60px",
                              height: "auto",
                              marginRight: "5px",
                            }}
                          />
                        ) : (
                          "No image"
                        )}
                      </TableCell>
                      <TableCell align="center">{categories[item.categoryId]}</TableCell>
                      <TableCell align="center">{collections[item.collectionId]}</TableCell>
                      <TableCell align="center">{item.laborPrice}</TableCell> */}
                      
                      <TableCell align="center">
                        <IconButton onClick={() => handleEdit(item)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(item.productId)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell align="center">
                        <Visibility onClick={() => navigate("/manager-product-detail")}></Visibility>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan="12">No product found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {isSearch && (
            <button className="btn btn-secondary mt-3" onClick={handleBack}>
              Back to show all products
            </button>
          )}
        </div>
      </div>

      {/* Update modal */}
      {editMode && (
        <div
          className="manager_manage_product_modal_overlay"
          onClick={() => setEditMode(false)}
        >
          <div
            className="manager_manage_product_update_modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="manager_manage_product_modal_content">
              <h4>Edit Product Information</h4>
              <div className="manager_manage_product_form_group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  maxLength={100}
                  value={editedProduct.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="manager_manage_product_form_group">
                <label>Description</label>
                <input
                  type="text"
                  name="description"
                  maxLength={255}
                  value={editedProduct.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="manager_manage_product_form_group">
                <label>Labor Price</label>
                <input
                  type="text"
                  name="laborPrice"
                  value={editedProduct.laborPrice}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="manager_manage_product_form_group">
                <label>Image</label>
                <input
                  type="text"
                  name="imageLinkList"
                  value={editedProduct.imageLinkList}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="manager_manage_product_form_group">
                <label>Collection ID</label>
                <input
                  type="text"
                  name="collectionId"
                  value={editedProduct.collectionId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="manager_manage_product_form_group">
                <label>Category ID</label>
                <input
                  type="text"
                  name="categoryID"
                  value={editedProduct.categoryId}
                  onChange={handleChange}
                  required
                />
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
