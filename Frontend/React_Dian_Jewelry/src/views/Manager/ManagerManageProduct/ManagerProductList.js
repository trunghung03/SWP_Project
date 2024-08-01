import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
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
  updateProductById,
} from "../../../services/ManagerService/ManagerProductService.js";
import "../../../styles/Manager/ManagerListProduct.scss";
import ProductPDF from "./ProductPDF.js";
import EnhancedTableHead from "./ProductTableHead.js";
import EditModal from "./EditProductModal.js";
import SearchBar from "./SearchBar";
import { PDFDownloadLink, usePDF } from "@react-pdf/renderer";
import { tableSort, getComparator } from "../../../Utils/TableUtils";
import { toast } from "sonner";
import { useDebouncedCallback } from 'use-debounce';

const headCells = [
  { id: "productId", numeric: false, disablePadding: false, label: "ID", sortable: true },
  { id: "productCode", numeric: false, disablePadding: false, label: "Code", sortable: true },
  { id: "name", numeric: false, disablePadding: false, label: "Name", sortable: true },
  { id: "price", numeric: false, disablePadding: false, label: "Price", sortable: true },
  { id: "action", numeric: false, disablePadding: false, label: "Action", sortable: false },
  { id: "view", numeric: false, disablePadding: false, label: "View", sortable: false },
  { id: "available", numeric: false, disablePadding: false, label: "Quantity", sortable: false },
];

const ManagerProductList = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("SearchTerm") || "");

  const [productItems, setProductItems] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedProduct, setEditedProduct] = useState({});
  const [pdfData, setPdfData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 6,
    totalPages: 1,
    totalCount: 0,
    order: 'asc',
    orderBy: 'name',
  });

  const downloadLinkRef = useRef(null);
  const [instance, updateInstance] = usePDF();

  const fetchData = useDebouncedCallback(async () => {
    const page = searchParams.get("PageNumber") || 1;
    const searchTerm = searchParams.get("SearchTerm") || "";
    const pageSize = pagination.pageSize;

    try {
      const response = await ShowAllProduct(page, pageSize, searchTerm);
      setProductItems(response.data);
      setPagination({
        ...pagination,
        currentPage: response.pagination.currentPage,
        totalPages: response.pagination.totalPages,
        totalCount: response.pagination.totalCount,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, 400);

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  useEffect(() => {
    fetchPdfData();
  }, []);

  useEffect(() => {
    if (instance.url) {
      downloadLinkRef.current.href = instance.url;
      downloadLinkRef.current.download = "products.pdf";
      downloadLinkRef.current.click();
    }
  }, [instance.url]);

  const handlePageChange = (pageNumber) => {
    searchParams.set("PageNumber", pageNumber);
    setSearchParams(searchParams);
  };

  const handleSearchTermChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    searchParams.set("SearchTerm", value);
    setSearchParams(searchParams);
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
            toast.success("Product deleted successfully!", { position: "top-right", autoClose: 3000 });
            fetchData(); // Fetch fresh data
          })
          .catch((error) => {
            console.error("Error deleting product:", error);
            toast.error("Failed to delete product. Please try again.", { position: "top-right", autoClose: 3000 });
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
      fetchData(); // Fetch fresh data
      setEditMode(false);
      toast.success("Product updated successfully!", { position: "top-center", autoClose: 3000 });
    } catch (error) {
      console.error("Error updating product:", error);
      swal("Something went wrong!", "Failed to update. Please try again.", "error");
    }
  };

  const fetchPdfData = async () => {
    try {
      const response = await ShowAllProduct(null, null, null);
      setPdfData(response.data);
    } catch (error) {
      console.error("Error fetching PDF data:", error);
    }
  };

  const handlePdfDownload = () => {
    fetchPdfData().then(() => {
      updateInstance(<ProductPDF products={pdfData} />);
    });
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
          <SearchBar searchTerm={searchTerm} setSearchTerm={handleSearchTermChange} />
        </div>
        <hr className="manager_product_header_line"></hr>
        <h3 style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif", fontWeight: "500" }}>
          List Of Products
        </h3>
        <div className="manager_manage_diamond_create_button_section">
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <button className="manager_manage_diamond_create_button" onClick={() => navigate("/manager-add-product")}>
                Add product
              </button>
            </Grid>
            <Grid item xs={3}>
              <button
                variant="outlined"
                className="manager_manage_diamond_create_button"
                onClick={handlePdfDownload}
              >
                Download PDF
              </button>
              <a ref={downloadLinkRef} style={{ display: "none" }}>
                Hidden Download Link
              </a>
            </Grid>
          </Grid>

          <Stack spacing={2} direction="row">
            <Pagination
              count={pagination.totalPages}
              page={parseInt(searchParams.get("PageNumber")) || 1}
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
                  setPagination({ ...pagination, order: isAsc ? "desc" : "asc", orderBy: property });
                }}
                headCells={headCells}
              />
              <TableBody>
                {productItems.length > 0 ? (
                  tableSort(productItems, getComparator(pagination.order, pagination.orderBy)).map((item) => (
                    <TableRow
                      key={item.productId}
                      sx={{ "&:hover": { backgroundColor: "#f5f5f5" }, cursor: "pointer" }}
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
                      <TableCell align="center">
                        {item.maxProductAvailable === 0 ? "Sold out" : item.maxProductAvailable}
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
