import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ManagerSidebar from "../../../components/ManagerSidebar/ManagerSidebar.js";
import "../../../styles/Manager/ManagerList.scss";
import {
  ShowAllDiamond,
  getDiamondDetail,
  deleteDiamondById,
  updateDiamondById,
  getDiamondByShape,
  getAllSubDiamond,
  getSubDiamondDetail,
  deleteSubDiamondById,
  updateSubDiamondById,
} from "../../../services/ManagerService/ManagerDiamondService.js";
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
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import DiamondIcon from "@mui/icons-material/Diamond";
import SubDiamondIcon from "@mui/icons-material/Grain";

const ManagerDiamondList = () => {
  const navigate = useNavigate();
  const [diamondList, setDiamondList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedDiamond, setEditedDiamond] = useState({});
  const [originalDiamond, setOriginalDiamond] = useState({});
  const [isSearch, setIsSearch] = useState(false);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [value, setValue] = useState(0); // For BottomNavigation

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#f9c6bb',
      color: '1c1c1c',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const fetchData = async (page, type = "main") => {
    try {
      const response = type === "main" ? await ShowAllDiamond(page) : await getAllSubDiamond(page);
      setDiamondList(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage, value === 0 ? "main" : "sub");
  }, [currentPage, value]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchKeyPress = async (e) => {
    const isInteger = (value) => /^-?\d+$/.test(value);
    if (e.key === "Enter") {
      setIsSearch(true);
      try {
        const response = isInteger(searchQuery.trim())
          ? value === 0
            ? await getDiamondDetail(searchQuery.trim())
            : await getSubDiamondDetail(searchQuery.trim())
          : value === 0
            ? await getDiamondByShape(searchQuery.trim())
            : await getSubDiamondDetail(searchQuery.trim());
        setDiamondList(Array.isArray(response) ? response : [response]);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching diamond:", error);
        swal("Diamond not found!", "Please try another one.", "error");
      }
    } else if (!searchQuery.trim()) {
      setIsSearch(false);
      fetchData(1, value === 0 ? "main" : "sub");
    }
  };

  const handleDelete = async (diamondId) => {
    swal({
      title: "Are you sure to delete this diamond?",
      text: "This action cannot be undone",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          value === 0 ? await deleteDiamondById(diamondId) : await deleteSubDiamondById(diamondId);
          fetchData(currentPage, value === 0 ? "main" : "sub");
          swal("Deleted successfully!", "The diamond has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting diamond:", error);
          swal("Something went wrong!", "Failed to delete the diamond. Please try again.", "error");
        }
      }
    });
  };

  const handleBack = async () => {
    fetchData(1, value === 0 ? "main" : "sub");
    setSearchQuery("");
    setIsSearch(false);
  };

  const handleEdit = (diamond) => {
    setEditMode(true);
    setEditedDiamond(diamond);
    setOriginalDiamond(diamond);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDiamond({ ...editedDiamond, [name]: value });
  };

  const handleUpdate = async () => {
    const requiredFields = ["shape", "color", "clarity", "cut", "carat", "price"];
    if (value === 1) { // if sub-diamond, add 'amountAvailable' to required fields
        requiredFields.push("amountAvailable");
    } else { // if main diamond, add 'certificateScan' to required fields
        requiredFields.push("certificateScan");
    }

    const specialCharPattern = /[$&+?@#|'<>^*()%]/;

    for (let field of requiredFields) {
        if (!editedDiamond[field]) {
            swal("Please fill in all fields!", `Field "${field}" cannot be empty.`, "error");
            return;
        }
        if (specialCharPattern.test(editedDiamond[field])) {
            swal("Invalid characters detected!", `Field "${field}" contains special characters.`, "error");
            return;
        }
    }

    const isEqual = JSON.stringify(originalDiamond) === JSON.stringify(editedDiamond);
    if (isEqual) {
        swal("No changes detected!", "You have not made any changes.", "error");
        return;
    }

    const diamondToUpdate = { ...editedDiamond, status: true };

    try {
        if (value === 0) {
            await updateDiamondById(diamondToUpdate.diamondId, diamondToUpdate);
        } else {
            await updateSubDiamondById(diamondToUpdate.subDiamondId, diamondToUpdate);
        }
        fetchData(currentPage, value === 0 ? "main" : "sub");
        setEditMode(false);
        swal("Updated successfully!", "The diamond information has been updated.", "success");
    } catch (error) {
        console.error("Error updating diamond:", error);
        swal("Something went wrong!", "Failed to update. Please try again.", "error");
    }
  };

  const renderPagination = () => {
    const pages = [];
    const totalPages = pagination.totalPages;
    const currentPage = pagination.currentPage;
    if (totalPages <= 1) return null;
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
    pages.push(
      <button
        key={totalPages}
        onClick={() => handlePageChange(totalPages)}
        className={totalPages === currentPage ? "manager_order_active" : ""}
      >
        {totalPages}
      </button>
    );
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
    <div className="manager_manage_diamond_all_container">
      <div className="manager_manage_diamond_sidebar">
        <ManagerSidebar currentPage="manager_manage_diamond" />
      </div>
      <div className="manager_manage_diamond_content">
        <div className="manager_manage_diamond_header">
          <img className="manager_manage_diamond_logo" src={logo} alt="Logo" />
          <div className="manager_manage_diamond_search_section">
            <input
              type="text"
              className="manager_manage_diamond_search_bar"
              placeholder="Search by ID or Shape..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={handleSearchKeyPress}
            />
          </div>
        </div>
        <hr className="manager_header_line"></hr>
        <h3 style={{ marginBottom: "2.5%" }}>List Of {value === 0 ? "Diamonds" : "Sub-Diamonds"}</h3>
        <div className="manager_manage_diamond_create_button_section">
          <div className="manager_manage_diamond_navigation">
            <Box sx={{ width: 500 }}>
              <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                  fetchData(1, newValue === 0 ? "main" : "sub");
                }}
              >
                <BottomNavigationAction label="Diamonds" icon={<DiamondIcon />} />
                <BottomNavigationAction label="Sub-Diamonds" icon={<SubDiamondIcon />} />
              </BottomNavigation>
            </Box>
          </div>
          <button
            className="manager_manage_diamond_create_button"
            onClick={() => navigate("/manager-add-diamond")}
          >
            Add new diamond
          </button>

          {renderPagination()}
        </div>

        {/* Table diamond list */}
        <div className="manager_manage_diamond_table_wrapper">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">ID</StyledTableCell>
                  <StyledTableCell align="center">Shape</StyledTableCell>
                  <StyledTableCell align="center">Color</StyledTableCell>
                  <StyledTableCell align="center">Clarity</StyledTableCell>
                  <StyledTableCell align="center">Carat</StyledTableCell>
                  <StyledTableCell align="center">Cut</StyledTableCell>
                  <StyledTableCell align="center">Price</StyledTableCell>
                  {value === 0 ? (
                    <StyledTableCell align="center">Certificate</StyledTableCell>
                  ) : (
                    <StyledTableCell align="center">Quantity</StyledTableCell>
                  )}
                  <StyledTableCell align="center">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {diamondList.length > 0 ? (
                  diamondList.map((item) => (
                    <TableRow className="manager_manage_table_body_row" key={item.diamondId || item.subDiamondId}>
                      <TableCell align="center">
                        {item.diamondId || item.subDiamondId}
                      </TableCell>
                      <TableCell align="center">
                        {item.shape}
                      </TableCell>
                      <TableCell align="center">
                        {item.color}
                      </TableCell>
                      <TableCell align="center">
                        {item.clarity}
                      </TableCell>
                      <TableCell align="center">
                        {item.carat}
                      </TableCell>
                      <TableCell align="center">
                        {item.cut}
                      </TableCell>
                      <TableCell align="center">
                        ${item.price}
                      </TableCell>
                      {value === 0 ? (
                        <TableCell align="center">
                          {item.certificateScan ? item.certificateScan : "No certificate"}
                        </TableCell>
                      ) : (
                        <TableCell align="center">
                          {item.amountAvailable}
                        </TableCell>
                      )}
                      <TableCell align="center">
                        <IconButton onClick={() => handleEdit(item)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(item.diamondId || item.subDiamondId)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <StyledTableRow>
                    <StyledTableCell colSpan={9} align="center">
                      No {value === 0 ? "diamond" : "sub-diamond"} found
                    </StyledTableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {isSearch && (
            <button className="btn btn-secondary mt-3" onClick={handleBack}>
              Back to show all {value === 0 ? "diamonds" : "sub-diamonds"}
            </button>
          )}
        </div>
      </div>

      {/* Update modal */}
      {editMode && (
        <div
          className={`manager_manage_diamond_modal_overlay ${editMode ? 'active' : ''}`}
          onClick={() => setEditMode(false)}
        >
          <div
            className="manager_manage_diamond_update_modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="manager_manage_diamond_modal_content">
              <h4>Edit {value === 0 ? "Diamond" : "Sub-Diamond"} Information</h4>
              <div className="manager_manage_diamond_form_group">
                <label>Shape</label>
                <input
                  type="text"
                  name="shape"
                  maxLength={20}
                  value={editedDiamond.shape}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="manager_manage_diamond_form_group">
                <label>Color</label>
                <input
                  type="text"
                  name="color"
                  maxLength={20}
                  value={editedDiamond.color}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="manager_manage_diamond_form_group">
                <label>Clarity</label>
                <input
                  type="text"
                  name="clarity"
                  maxLength={4}
                  value={editedDiamond.clarity}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="manager_manage_diamond_form_group">
                <label>Carat</label>
                <input
                  type="text"
                  name="carat"
                  maxLength={6}
                  value={editedDiamond.carat}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="manager_manage_diamond_form_group">
                <label>Cut</label>
                <input
                  type="text"
                  name="cut"
                  maxLength={20}
                  value={editedDiamond.cut}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="manager_manage_diamond_form_group">
                {value === 0 ? (
                  <>
                    <label>Certificate</label>
                    <input
                      type="text"
                      name="certificateScan"
                      value={editedDiamond.certificateScan}
                      onChange={handleChange}
                      maxLength={255}
                      required
                    />
                  </>
                ) : (
                  <>
                    <label>Quantity</label>
                    <input
                      type="text"
                      name="amountAvailable"
                      value={editedDiamond.amountAvailable}
                      onChange={handleChange}
                      maxLength={10}
                      required
                    />
                  </>
                )}
              </div>
              <div className="manager_manage_diamond_form_group">
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={editedDiamond.price}
                  onChange={handleChange}
                  min="100"
                  max="10000"
                  required
                />
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

export default ManagerDiamondList;
