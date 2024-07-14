import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ManagerSidebar from "../../../components/ManagerSidebar/ManagerSidebar.js";
import "../../../styles/Manager/ManagerList.scss";
import {
  ShowAllPromotion,
  getPromotionDetail,
  getPromotionByName,
  updatePromotionById
} from "../../../services/ManagerService/ManagerPromotionService.js";
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


const getPromotionStatus = async (endDate, id) => {
  try {
    const promotion = await getPromotionDetail(id);
    if (promotion.status === true) {
      const currentDate = new Date();
      const end = new Date(endDate);
      return currentDate <= end;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error fetching promotion status:", error);
    return false;
  }
};
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#f9c6bb',
    color: '1c1c1c',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const PromotionButton = ({ endDate, id }) => {
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPromotionStatus = async () => {
      const status = await getPromotionStatus(endDate, id);
      setIsActive(status);
      setIsLoading(false);
    };

    fetchPromotionStatus();
  }, [endDate, id]);

  if (isLoading) {
    return (
      <button
        style={{
          backgroundColor: "gray",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Loading...
      </button>
    );
  }

  return (
    <button
      style={{
        backgroundColor: isActive ? "#1fd655" : "red",
        color: "white",
        border: "none",
        borderRadius: "5px",
      }}
    >
      {isActive ? "Active" : "Expired"}
    </button>
  );
};

const ManagerPromotionList = () => {
  const navigate = useNavigate();

  const [promotionList, setPromotionList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [employeeList, setEmployeeList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedPromotion, setEditedPromotion] = useState({});
  const [originalPromotion, setOriginalPromotion] = useState({});
  const [isSearch, setIsSearch] = useState(false);
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#f9c6bb',
      color: '1c1c1c',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ShowAllPromotion();
        setPromotionList(response);
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
  const currentPromotion = promotionList.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalPages = Math.ceil(promotionList.length / ordersPerPage);

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
        setIsSearch(true);
        try {
          const response = await getPromotionDetail(searchQuery.trim());
          setPromotionList([response]);
          setCurrentPage(1);
        } catch (error) {
          console.error("Error fetching Promotion:", error);
          swal("Promotion not found!", "Please try another one.", "error");
        }
      } else if (searchQuery.trim()) {
        setIsSearch(true);
        try {
          const response = await getPromotionByName(searchQuery.trim());
          if (Array.isArray(response)) {
            setPromotionList(response);
          } else if (response) {
            setPromotionList([response]);
          } else {
            setPromotionList([]);
          }
          setCurrentPage(1);
        } catch (error) {
          console.error("Error fetching Promotion:", error);
          swal("Promotion not found!", "Please try another one.", "error");
        }
      } else {
        setIsSearch(false);
        try {
          const response = await ShowAllPromotion();
          setPromotionList(response);
          setCurrentPage(1);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    }

  };


  const handleEdit = (Promotion) => {
    setEditMode(true);
    setEditedPromotion(Promotion);
    setOriginalPromotion(Promotion);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPromotion({ ...editedPromotion, [name]: value });
  };

  const handleUpdate = async () => {
    const requiredFields = ["name", "code", "amount", "description", "validFrom", "validTo"];
    const specialCharPattern = /[$&+?@#|'<>^*()%]/;
    for (let field of requiredFields) {
      if (!editedPromotion[field]) {
        swal("Please fill in all fields!", `Field cannot be empty.`, "error");
        return;
      }
      if (specialCharPattern.test(editedPromotion[field])) {
        swal("Invalid characters detected!", `Field "${field}" contains special characters.`, "error");
        return;
      }
    }

    const isEqual =
      JSON.stringify(originalPromotion) === JSON.stringify(editedPromotion);
    if (isEqual) {
      swal("No changes detected!", "You have not made any changes.", "error");
      return;
    }

    const PromotionToUpdate = { ...editedPromotion, status: true };

    try {
      console.log("Sending update request with data:", PromotionToUpdate);
      const response = await updatePromotionById(
        PromotionToUpdate.id,
        PromotionToUpdate
      );
      console.log("Update response:", response.data);
      const updatensetPromotionList = await ShowAllPromotion();
      setPromotionList(updatensetPromotionList);
      setEditMode(false);
      swal(
        "Updated successfully!",
        "The Promotion information has been updated.",
        "success"
      );
    } catch (error) {
      console.error(
        "Error updating Promotion:",
        error.response ? error.response.data : error.message
      );
      swal(
        "Something went wrong!",
        "Failed to update. Please try again.",
        "error"
      );
    }
  };

  const handleBack = async () => {
    try {
      const response = await ShowAllPromotion();
      setPromotionList(response);
      setCurrentPage(1);
      setIsSearch(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div className="manager_manage_diamond_all_container">
      <div className="manager_manage_diamond_sidebar">
        <ManagerSidebar currentPage="manager_manage_promotional" />
      </div>
      <div className="manager_manage_diamond_content">
        <div className="manager_manage_diamond_header">
          <img className="manager_manage_diamond_logo" src={logo} alt="Logo" />
          <div className="manager_manage_diamond_search_section">
            <input
              type="text"
              className="manager_manage_diamond_search_bar"
              placeholder="Search by ID or Code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={handleSearchKeyPress}
            />
          </div>
        </div>
        <hr className="manager_header_line"></hr>

        <h3>List Of Promotional Codes</h3>
        <div className="manager_manage_diamond_create_button_section">
          <button
            className="manager_manage_diamond_create_button"
            onClick={() => navigate("/manager-add-promotion")}
          >
            Add new promotional code
          </button>
          <div className="manager_manage_diamond_pagination">
            <button
              className="manager_button_pagination"
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
              className="manager_button_pagination"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </div>
        <div className="manager_manage_diamond_table_wrapper">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Code</StyledTableCell>
                  <StyledTableCell align="center">Discount Percentage (%)</StyledTableCell>
                  <StyledTableCell align="center">Description</StyledTableCell>
                  <StyledTableCell align="center">Start Date</StyledTableCell>
                  <StyledTableCell align="center">End Date</StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
                  <StyledTableCell align="center">Update</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {promotionList.length > 0 ? (
                  currentPromotion.map((item) => (
                    <TableRow className="manager_manage_table_body_row" key={item.id}>
                      <TableCell align="center">{item.id}</TableCell>
                      <TableCell align="center">{item.name}</TableCell>
                      <TableCell align="center">{item.code}</TableCell>
                      <TableCell align="center">{item.amount}</TableCell>
                      <TableCell align="center">{item.description}</TableCell>
                      <TableCell align="center">{new Date(item.startDate).toLocaleDateString("en-CA")}</TableCell>
                      <TableCell align="center">{new Date(item.endDate).toLocaleDateString("en-CA")}</TableCell>
                      <TableCell align="center">
                        <PromotionButton endDate={item.endDate} id={item.id} />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton onClick={() => handleEdit(item)}>
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan="8" align="center">
                      No Promotion found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {isSearch && (
            <button className="btn btn-secondary mt-3" onClick={handleBack}>
              Back to show all promotions
            </button>
          )}
        </div>
      </div>


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
              <h4>Edit Promotion Information</h4>
              <div className="manager_manage_diamond_form_group">
                <label>Promotion Name</label>
                <input
                  type="text"
                  name="name"
                  maxLength={50}
                  value={editedPromotion.name}
                  onChange={handleChange}
                  placeholder="Enter promotion's name"
                  required
                />
              </div>
              <div className="manager_manage_diamond_form_group">
                <label>Code</label>
                <input
                  type="text"
                  name="code"
                  maxLength={50}
                  value={editedPromotion.code}
                  onChange={handleChange}
                  placeholder="Enter promotion's code"
                  required
                />
              </div>
              <div className="manager_manage_diamond_form_group">
                <label>Description</label>
                <input
                  type="text"
                  name="description"
                  value={editedPromotion.description}
                  onChange={handleChange}
                  placeholder="Enter promotion's description"
                  maxLength={255}
                  required
                />
              </div>

              <div className="manager_manage_diamond_form_group">
                <label>Percentage</label>
                <input
                  type="number"
                  name="amount"
                  value={editedPromotion.amount}
                  onChange={handleChange}
                  placeholder="Enter promotion's percentage"
                  required
                />
              </div>
              <div className="manager_manage_diamond_form_group">
                <label>From</label>
                <input
                  type="date"
                  name="validFrom"
                  placeholder="Enter promotion's valid from"
                  value={editedPromotion.validFrom}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="manager_manage_diamond_form_group">
                <label>To</label>
                <input
                  type="date"
                  name="validTo"
                  placeholder="Enter promotion's valid to"
                  value={editedPromotion.validTo}
                  onChange={handleChange}
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

export default ManagerPromotionList;
