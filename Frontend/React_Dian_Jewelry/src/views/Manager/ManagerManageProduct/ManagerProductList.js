import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Grid,
  IconButton,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import swal from "sweetalert";
import ManagerSidebar from "../../../components/ManagerSidebar/ManagerSidebar.js";
import logo from "../../../assets/img/logoN.png";
import {
  ShowAllProduct,
  deleteProductById,
  getProductDetail,
  pdfProduct,
  updateProductById,
} from "../../../services/ManagerService/ManagerProductService.js";
import "../../../styles/Manager/ManagerListProduct.scss";
import ProductPDF from "./ProductPDF.js";
import EnhancedTableHead from "./ProductTableHead.js";
import EditModal from "./EditProductModal.js";
import SearchBar from "./SearchBar";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { tableSort, getComparator } from "../../../Utils/TableUtils";
const headCells = [
  { id: "productId", numeric: false, disablePadding: false, label: "ID", sortable: true },
  { id: "productCode", numeric: false, disablePadding: false, label: "Code", sortable: true },
  { id: "name", numeric: false, disablePadding: false, label: "Name", sortable: true },
  { id: "price", numeric: false, disablePadding: false, label: "Price", sortable: true },
  { id: "action", numeric: false, disablePadding: false, label: "Action", sortable: false },
  { id: "view", numeric: false, disablePadding: false, label: "View", sortable: false },
  { id: "available", numeric: false, disablePadding: false, label: "Available", sortable: false },
];

const ManagerProductList = () => {
  const navigate = useNavigate();

  const [productItems, setProductItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedProduct, setEditedProduct] = useState({});
  const [pdfData, setPdfData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 6,
    totalPages: 1,
    totalCount: 0,
  });

  const fetchData = async (page = 1, query = "") => {
    try {
      const response = await ShowAllProduct(page, pagination.pageSize, query);
      setProductItems(response.data);
      const pdfResponse = await pdfProduct();
      setPdfData(pdfResponse.data);
      setPagination(response.pagination);
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
    if (e.key === "Enter") {
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
    }).then((willDelete) => {
      if (willDelete) {
        deleteProductById(productID)
          .then(() => {
            swal(
              "Deleted successfully!",
              "The product has been deleted.",
              "success"
            ).then(() => {
              fetchData(pagination.currentPage, searchQuery); // Fetch fresh data
            });
          })
          .catch((error) => {
            console.error("Error deleting product:", error);
            swal(
              "Something went wrong!",
              "Failed to delete the product. Please try again.",
              "error"
            );
          });
      }
    });
  };

  const handleEdit = (product) => {
    setEditMode(true);
    setEditedProduct(product);
  };

  const handleUpdate = async (updatedProduct) => {
    try {
      await updateProductById(updatedProduct.productId, updatedProduct);
      fetchData(pagination.currentPage, searchQuery); // Fetch fresh data
      setEditMode(false);
      swal("Updated successfully!", "The product information has been updated.", "success");
    } catch (error) {
      console.error("Error updating product:", error);
      swal("Something went wrong!", "Failed to update. Please try again.", "error");
    }
  };

  const viewDetail = (productId) => {
    navigate(`/manager-product-detail/${productId}`);
  };

  return (
    <div className="manager_manage_product_all_container">
      <div className="manager_manage_product_sidebar">
        <ManagerSidebar currentPage="manager_manage_product" />
      </div>
      <div className="manager_manage_product_content">
        <div className="manager_manage_product_header">
          <img className="manager_manage_product_logo" src={logo} alt="Logo" />
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearchKeyPress={handleSearchKeyPress}
          />
        </div>
        <hr className="manager_product_header_line"></hr>
        <h3 style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif", fontWeight: "500" }}>
          List Of Products
        </h3>
        <div className="manager_manage_diamond_create_button_section">
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <button
                className="manager_manage_diamond_create_button"
                onClick={() => navigate("/manager-add-product")}
              >
                Add product
              </button>
            </Grid>
            <Grid item xs={3}>
              <button
                variant="outlined"
                className="manager_manage_diamond_create_button"
              >
                <PDFDownloadLink
                  document={<ProductPDF products={pdfData} />}
                  fileName="products.pdf"
                  className="link"
                >
                  {({ loading }) => (loading ? "Loading document..." : "Download PDF")}
                </PDFDownloadLink>
              </button>
            </Grid>
          </Grid>

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
                  const isAsc = pagination.orderBy === property && pagination.order === "asc";
                  setPagination({
                    ...pagination,
                    order: isAsc ? "desc" : "asc",
                    orderBy: property,
                  });
                }}
                headCells={headCells}
              />
              <TableBody>
                {productItems.length > 0 ? (
                  tableSort(
                    productItems,
                    getComparator(pagination.order, pagination.orderBy)
                  ).map((item) => (
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
                      <TableCell style={{ textTransform: "capitalize" }} align="center">
                        {item.hasSufficientDiamonds ? "Available" : "Sold out"}
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

          {searchQuery && (
            <button className="btn btn-secondary mt-3" onClick={handleBack}>
              Back to show all products
            </button>
          )}
        </div>
      </div>

      <EditModal
        editMode={editMode}
        setEditMode={setEditMode}
        editedProduct={editedProduct}
        setEditedProduct={setEditedProduct}
        handleUpdate={handleUpdate}
        handleCancel={() => setEditMode(false)}
      />
    </div>
  );
};

export default ManagerProductList;
