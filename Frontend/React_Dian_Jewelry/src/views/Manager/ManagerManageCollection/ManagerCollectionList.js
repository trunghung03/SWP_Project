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

const ManagerDiamondList = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedDiamond, setEditedDiamond] = useState({});
  const [originalDiamond, setOriginalDiamond] = useState({});
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ShowAllDiamond();
        setCartItems(response);
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
  const currentOrders = cartItems.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(cartItems.length / ordersPerPage);

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
          const response = await getDiamondDetail(searchQuery.trim());
          setCartItems([response]);
          setCurrentPage(1);
        } catch (error) {
          console.error("Error fetching diamond:", error);
          swal("Diamond not found!", "Please try another one.", "error");
        }
      } else if (searchQuery.trim()) {
        try {
          const response = await getDiamondByShape(searchQuery.trim());
          if (Array.isArray(response)) {
            setCartItems(response);
          } else if (response) {
            setCartItems([response]);
          } else {
            setCartItems([]);
          }

          setCurrentPage(1);
        } catch (error) {
          console.error("Error fetching diamond:", error);
          swal("Diamond not found!", "Please try another one.", "error");
        }
      } else {
        try {
          const response = await ShowAllDiamond();
          setCartItems(response);
          setCurrentPage(1);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    }
  };

  // Delete diamond by id
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
          await deleteDiamondById(diamondId);
          const response = await ShowAllDiamond();
          setCartItems(response);
          swal(
            "Deleted successfully!",
            "The diamond has been deleted.",
            "success"
          );
        } catch (error) {
          console.error("Error deleting diamond:", error);
          swal(
            "Something went wrong!",
            "Failed to delete the diamond. Please try again.",
            "error"
          );
        }
      }
    });
  };

  // Update by id
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
    const requiredFields = [
      "shape",
      "color",
      "clarity",
      "cut",
      "carat",
      "certificateScan",
      "amountAvailable",
    ];
    for (let field of requiredFields) {
      if (!editedDiamond[field]) {
        swal("Please fill in all fields!", `Field cannot be empty.`, "error");
        return;
      }
    }

    const isEqual =
      JSON.stringify(originalDiamond) === JSON.stringify(editedDiamond);
    if (isEqual) {
      swal("No changes detected!", "You have not made any changes.", "error");
      return;
    }

    const diamondToUpdate = { ...editedDiamond, status: true };

    try {
      console.log("Sending update request with data:", diamondToUpdate);
      const response = await updateDiamondById(
        diamondToUpdate.diamondId,
        diamondToUpdate
      );
      console.log("Update response:", response.data);
      const updatedItems = await ShowAllDiamond();
      setCartItems(updatedItems);
      setEditMode(false);
      swal(
        "Updated successfully!",
        "The diamond information has been updated.",
        "success"
      );
    } catch (error) {
      console.error(
        "Error updating diamond:",
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
    <div className="manager_manage_diamond_all_container">
      <div className="manager_manage_diamond_sidebar">
        <ManagerSidebar currentPage="manager_manage_collection" />
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
        <h3>List Of Diamonds</h3>
        <div className="manager_manage_diamond_create_button_section">
          <button
            className="manager_manage_diamond_create_button"
            onClick={() => navigate("/manager-add-diamond")}
          >
            Add new diamond
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
                  <StyledTableCell align="center">Quantity</StyledTableCell>
                  <StyledTableCell align="center">Certificate</StyledTableCell>
                  <StyledTableCell align="center">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentOrders.length > 0 ? (
                  currentOrders.map((item) => (
                    <TableRow
                      className="manager_manage_table_body_row"
                      key={item.diamondId}
                    >
                      <TableCell align="center">{item.diamondId}</TableCell>
                      <TableCell align="center">{item.shape}</TableCell>
                      <TableCell align="center">{item.color}</TableCell>
                      <TableCell align="center">{item.clarity}</TableCell>
                      <TableCell align="center">{item.carat}</TableCell>
                      <TableCell align="center">{item.cut}</TableCell>
                      <TableCell align="center">
                        {item.amountAvailable}
                      </TableCell>
                      <TableCell align="center">
                        {item.certificateScan ? (
                          <img
                            src={item.certificateScan}
                            alt="Certificate"
                            style={{ width: "60px", height: "auto" }}
                          />
                        ) : (
                          "No certificate"
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton onClick={() => handleEdit(item)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(item.diamondId)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan="9">No diamond found</TableCell>
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
          className="manager_manage_diamond_modal_overlay"
          onClick={() => setEditMode(false)}
        >
          <div
            className="manager_manage_diamond_update_modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="manager_manage_diamond_modal_content">
              <h4>Edit Diamond Information</h4>
              <div className="manager_manage_diamond_form_group">
                <label>Shape</label>
                <input
                  type="text"
                  name="shape"
                  value={editedDiamond.shape}
                  onChange={handleChange}
                />
              </div>
              <div className="manager_manage_diamond_form_group">
                <label>Color</label>
                <input
                  type="text"
                  name="color"
                  value={editedDiamond.color}
                  onChange={handleChange}
                />
              </div>
              <div className="manager_manage_diamond_form_group">
                <label>Clarity</label>
                <input
                  type="text"
                  name="clarity"
                  value={editedDiamond.clarity}
                  onChange={handleChange}
                />
              </div>
              <div className="manager_manage_diamond_form_group">
                <label>Carat</label>
                <input
                  type="text"
                  name="carat"
                  value={editedDiamond.carat}
                  onChange={handleChange}
                />
              </div>
              <div className="manager_manage_diamond_form_group">
                <label>Cut</label>
                <input
                  type="text"
                  name="cut"
                  value={editedDiamond.cut}
                  onChange={handleChange}
                />
              </div>
              <div className="manager_manage_diamond_form_group">
                <label>Quantity</label>
                <input
                  type="text"
                  name="amountAvailable"
                  value={editedDiamond.amountAvailable}
                  onChange={handleChange}
                />
              </div>
              <div className="manager_manage_diamond_form_group">
                <label>Certificate</label>
                <input
                  type="text"
                  name="certificateScan"
                  value={editedDiamond.certificateScan}
                  onChange={handleChange}
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
