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
  getProductByName,
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
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

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
    const isInteger = (value) => {
      return /^-?\d+$/.test(value);
    };
    if (e.key === "Enter") {
      if (isInteger(searchQuery.trim())) {
        try {
          const response = await getProductDetail(searchQuery.trim());
          setProductItems([response]);
          setCurrentPage(1);
        } catch (error) {
          console.error("Error fetching product:", error);
          swal("Product not found!", "Please try another one.", "error");
        }
      } else if (searchQuery.trim().toString()) {
        try {
          const response = await getProductByName(searchQuery.trim());
          if (Array.isArray(response)) {
            setProductItems(response);
          } else if (response) {
            setProductItems([response]);
          } else {
            setProductItems([]);
          }
          setCurrentPage(1);
        } catch (error) {
          console.error("Error fetching product:", error);
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
          swal(
            "Deleted successfully!",
            "The product has been deleted.",
            "success"
          );
        } catch (error) {
          console.error("Error deleting diamond:", error);
          swal(
            "Something went wrong!",
            "Failed to delete the product. Please try again.",
            "error"
          );
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
    const requiredFields = [
      "productCode",
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
      "categoryId",
    ];
    for (let field of requiredFields) {
      if (!editedProduct[field]) {
        swal("Please fill in all fields!", `Field cannot be empty.`, "error");
        return;
      }
    }

    const isEqual =
      JSON.stringify(originalProduct) === JSON.stringify(editedProduct);
    if (isEqual) {
      swal("No changes detected!", "You have not made any changes.", "error");
      return;
    }

    const productToUpdate = { ...editedProduct, status: true };

    try {
      console.log("Sending update request with data:", productToUpdate);
      const response = await updateProductById(
        productToUpdate.productId,
        productToUpdate
      );
      console.log("Update response:", response.data);
      const updatedItems = await ShowAllProduct();
      setProductItems(updatedItems);
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
              placeholder="Search by ID or Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={handleSearchKeyPress}
            />
          </div>
        </div>
        <hr className="manager_product_header_line"></hr>
        <h3>List Of Products</h3>
        <div className="manager_manage_diamond_create_button_section">
          <button
            className="manager_manage_diamond_create_button"
            onClick={() => navigate("/manager-add-product")}
          >
            Add new product
          </button>
          <div className="manager_manage_diamond_pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={
                  index + 1 === currentPage ? "manager_order_active" : ""
                }
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </div>

        {/* Table diamond list */}
        <div className="manager_manage_product_table_wrapper">
          <TableContainer component={Paper} style={{marginTop:10}}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                <StyledTableCell align="center">ID</StyledTableCell>
                  <StyledTableCell align="center">Code</StyledTableCell>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Price</StyledTableCell>
                  <StyledTableCell align="center">Labor</StyledTableCell>
                  <StyledTableCell align="center">Description</StyledTableCell>
                  <StyledTableCell align="center">Diamond</StyledTableCell>
                  <StyledTableCell align="center">Main & Sub Diamond Amount</StyledTableCell>
                  <StyledTableCell align="center">Shell Weight</StyledTableCell>
                  <StyledTableCell align="center">Images</StyledTableCell>
                  <StyledTableCell align="center">Category</StyledTableCell>
                  <StyledTableCell align="center">Collection</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
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
                     <TableCell align="center">{item.laborPrice}</TableCell>
                     <TableCell align="center">{item.description}</TableCell>
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
                      <TableCell align="center">
                        <IconButton onClick={() => handleEdit(item)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(item.productId)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan="7">No product found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
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
                <label>Product Code</label>
                <input
                  type="text"
                  name="productCode"
                  value={editedProduct.productCode}
                  onChange={handleChange}
                />
              </div>
              <div className="manager_manage_product_form_group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={editedProduct.name}
                  onChange={handleChange}
                />
              </div>
              <div className="manager_manage_product_form_group">
                <label>Price</label>
                <input
                  type="text"
                  name="price"
                  value={editedProduct.price}
                  onChange={handleChange}
                />
              </div>
              <div className="manager_manage_product_form_group">
                <label>Description</label>
                <input
                  type="text"
                  name="description"
                  value={editedProduct.description}
                  onChange={handleChange}
                />
              </div>
              <div className="manager_manage_product_form_group">
                <label>Main Diamond ID</label>
                <input
                  type="text"
                  name="mainDiamondId"
                  value={editedProduct.mainDiamondId}
                  onChange={handleChange}
                />
              </div>
              <div className="manager_manage_product_form_group">
                <label>Labor Price</label>
                <input
                  type="text"
                  name="laborPrice"
                  value={editedProduct.laborPrice}
                  onChange={handleChange}
                />
              </div>
              <div className="manager_manage_product_form_group">
                <label>Image</label>
                <input
                  type="text"
                  name="imageLinkList"
                  value={editedProduct.imageLinkList}
                  onChange={handleChange}
                />
              </div>
              <div className="manager_manage_product_form_group">
                <label>Main Diamond Amount</label>
                <input
                  type="text"
                  name="mainDiamondAmount"
                  value={editedProduct.mainDiamondAmount}
                  onChange={handleChange}
                />
              </div>

              <div className="manager_manage_product_form_group">
                <label>Sub Diamond Amount</label>
                <input
                  type="text"
                  name="subDiamondAmount"
                  value={editedProduct.subDiamondAmount}
                  onChange={handleChange}
                />
              </div>

              <div className="manager_manage_product_form_group">
                <label>Shell Amount</label>
                <input
                  type="text"
                  name="shellAmount"
                  value={editedProduct.shellAmount}
                  onChange={handleChange}
                />
              </div>

              <div className="manager_manage_product_form_group">
                <label>Collection ID</label>
                <input
                  type="text"
                  name="collectionId"
                  value={editedProduct.collectionId}
                  onChange={handleChange}
                />
              </div>

              <div className="manager_manage_product_form_group">
                <label>Category ID</label>
                <input
                  type="text"
                  name="categoryID"
                  value={editedProduct.categoryId}
                  onChange={handleChange}
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
