import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ManagerSidebar from "../../../components/ManagerSidebar/ManagerSidebar.js";
import { PDFDownloadLink } from '@react-pdf/renderer';
import "../../../styles/Manager/ManagerListProduct.scss";
import {
  ShowAllProduct,
  pdfProduct,
  getProductDetail,
  updateProductById,
  deleteProductById,
  getProductCollection,
  getProductCategory,
  getProductDiamond,
} from "../../../services/ManagerService/ManagerProductService.js";
import ProductPDF from "./ProductPDF.js";
import logo from "../../../assets/img/logoN.png";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Visibility } from "@mui/icons-material";
import TableSortLabel from "@mui/material/TableSortLabel";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { visuallyHidden } from "@mui/utils";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";

const headCells = [
  { id: 'productId', numeric: false, disablePadding: false, label: 'ID', sortable: true },
  { id: 'productCode', numeric: false, disablePadding: false, label: 'Code', sortable: true },
  { id: 'name', numeric: false, disablePadding: false, label: 'Name', sortable: true },
  { id: 'price', numeric: false, disablePadding: false, label: 'Price', sortable: true },
  // { id: 'stock', numeric: false, disablePadding: false, label: 'Stock', sortable: true },
  { id: 'action', numeric: false, disablePadding: false, label: 'Action', sortable: false },
  { id: 'view', numeric: false, disablePadding: false, label: 'View', sortable: false },
  { id: 'available', numeric: false, disablePadding: false, label: 'Available', sortable: false },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            style={{ backgroundColor: "#faecec" }}
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.sortable ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
};

const tableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

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
  const [isSearch, setIsSearch] = useState(false);
  const [pdfData, setPdfData] = useState([]);

  const viewDetail = (productId) => {
    navigate(`/manager-product-detail/${productId}`);
  };

  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 6,
    totalPages: 1,
    totalCount: 0,
  });

  const fetchData = async (page = 1, query = '') => {
    try {
      const response = await ShowAllProduct(page, pagination.pageSize, query);
      console.log("Fetched products:", response.data);
      setProductItems(response.data);
      const pdfResponse = await pdfProduct();
      setPdfData(pdfResponse);
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
    const isInteger = (value) => /^-?\d+$/.test(value);

    if (e.key === "Enter") {
      if (isInteger(searchQuery.trim())) {
        setIsSearch(true);
        try {
          const response = await getProductDetail(searchQuery.trim());
          setProductItems([response]);
          setPagination({
            currentPage: 1,
            pageSize: 6,
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
    setIsSearch(false);
  };

  const handleDelete = async (productID) => {
    swal({
      title: "Are you sure to delete this product?",
      text: "This action cannot be undone",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteProductById(productID)
          .then(() => {
            swal("Deleted successfully!", "The product has been deleted.", "success")
              .then(() => {
                fetchData(pagination.currentPage, searchQuery); // Fetch fresh data
              });
          })
          .catch((error) => {
            console.error("Error deleting product:", error);
            swal("Something went wrong!", "Failed to delete the product. Please try again.", "error");
          });
      }
    });
  };

  const handleEdit = (product) => {
    setEditMode(true);
    setEditedProduct(product);
    setOriginalProduct(product);
    document.body.classList.add("modal-open"); // Add this line
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setEditedProduct({ ...editedProduct, [name]: newValue });
  };

  const handleUpdate = async () => {
    const requiredFields = [
      "name",
      "laborPrice",
      "imageLinkList",
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

    const productToUpdate = { ...editedProduct };

    if (editedProduct.description === '') {
      productToUpdate.description = null;
    }

    if (editedProduct.collectionId === '') {
      productToUpdate.collectionId = null;
    }

    updateProductById(productToUpdate.productId, productToUpdate)
      .then(() => {
        swal("Updated successfully!", "The product information has been updated.", "success")
          .then(() => {
            fetchData(pagination.currentPage, searchQuery); // Fetch fresh data
            setEditMode(false);
            document.body.classList.remove("modal-open"); // Add this line
          });
      })
      .catch((error) => {
        console.error("Error updating product:", error.response ? error.response.data : error.message);
        swal("Something went wrong!", "Failed to update. Please try again.", "error");
      });
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
        <h3 style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif", fontWeight: "500" }}>
          List Of Products
        </h3>
        <div className="manager_manage_diamond_create_button_section" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button
            className="manager_manage_diamond_create_button"
            onClick={() => navigate("/manager-add-product")}
          >
            Add product
          </button>
          <Stack spacing={2} direction="row">
            <Pagination
              count={pagination.totalPages}
              page={pagination.currentPage}
              onChange={(e, value) => handlePageChange(value)}
              color="primary"
            />
          </Stack>
        </div>

        <div className="manager_manage_product_table_wrapper">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <EnhancedTableHead
                order={pagination.order}
                orderBy={pagination.orderBy}
                onRequestSort={(event, property) => {
                  const isAsc = pagination.orderBy === property && pagination.order === 'asc';
                  setPagination({ ...pagination, order: isAsc ? 'desc' : 'asc', orderBy: property });
                }}
                rowCount={productItems.length}
              />
              <TableBody>
                {productItems.length > 0 ? (
                  tableSort(productItems, getComparator(pagination.order, pagination.orderBy))
                    .map((item) => (
                      <TableRow
                        key={item.productId}
                        sx={{
                          "&:hover": {
                            backgroundColor: "#f5f5f5",
                          },
                          cursor: "pointer",
                        }}
                      >
                        <TableCell align="center">{item.productId}</TableCell>
                        <TableCell align="center">{item.productCode}</TableCell>
                        <TableCell align="center">{item.name}</TableCell>
                        <TableCell align="center">${item.price}</TableCell>
                        {/* <TableCell align="center">{item.stock}</TableCell> */}
                        <TableCell align="center">
                          <IconButton onClick={() => handleEdit(item)}>
                            <EditIcon style={{ cursor: "pointer", color: "#575252" }} />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(item.productId)}>
                            <DeleteIcon style={{ cursor: "pointer", color: "#575252" }} />
                          </IconButton>
                        </TableCell>
                        <TableCell align="center">
                          <Visibility onClick={() => viewDetail(item.productId)} />
                        </TableCell>
                        <TableCell align="center">
                          {item.hasSufficientDiamonds.toString()}
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
          <div className="pdf-download">
            <PDFDownloadLink
              document={<ProductPDF products={pdfData} />}
              fileName="products.pdf"
            >
              {({ loading }) =>
                loading ? 'Loading document...' : 'Download PDF'
              }
            </PDFDownloadLink>
          </div>
          {isSearch && (
            <button className="btn btn-secondary mt-3" onClick={handleBack}>
              Back to show all products
            </button>
          )}
        </div>
      </div>

      {editMode && (
        <div
          className="manager_manage_product_modal_overlay"
          onClick={() => {
            setEditMode(false);
            document.body.classList.remove("modal-open"); // Add this line
          }}
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
                  value={editedProduct.description || ""}
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
                  value={editedProduct.collectionId || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="manager_manage_product_form_group">
                <label>Category ID</label>
                <input
                  type="text"
                  name="categoryId"
                  value={editedProduct.categoryId}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="manager_manage_product_form_group">
                <label>Status</label>
                <select
                  name="status"
                  value={editedProduct.status ? "isDisplayed" : "notDisplayed"}
                  onChange={(e) => {
                    const value = e.target.value === "isDisplayed";
                    setEditedProduct({ ...editedProduct, status: value });
                  }}
                >
                  <option value="isDisplayed">Is Displayed</option>
                  <option value="notDisplayed">Not Displayed</option>
                </select>
              </div>
              <div className="manager_manage_product_modal_actions">
                <button
                  onClick={() => {
                    setEditMode(false);
                    document.body.classList.remove("modal-open"); // Add this line
                  }}
                >
                  Cancel
                </button>
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
