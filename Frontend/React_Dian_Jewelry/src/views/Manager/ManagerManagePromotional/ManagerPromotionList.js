import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ManagerSidebar from "../../../components/ManagerSidebar/ManagerSidebar.js";
import "../../../styles/Manager/ManagerList.scss";
import {
  ShowAllPromotion,
  getPromotionDetail,
  updatePromotionById,
  getPromotionByName,
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
        try {
          const response = await getPromotionDetail(searchQuery.trim());
          setPromotionList([response]);
          setCurrentPage(1);
        } catch (error) {
          console.error("Error fetching Promotion:", error);
          swal("Promotion not found!", "Please try another one.", "error");
        }
      } else if (searchQuery.trim()) {
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

  // Update by id
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
    const status = true;
    const price = 0;
    const requiredFields = ["name", "amountAvailable"];
    for (let field of requiredFields) {
      if (!editedPromotion[field]) {
        swal("Please fill in all fields!", `Field cannot be empty.`, "error");
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
        PromotionToUpdate.PromotionMaterialId,
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

  const backList = async () =>{
    try {
      const response = await ShowAllPromotion();
      setPromotionList(response);
      setCurrentPage(1);
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
              onKeyPress={handleSearchKeyPress}
            />
            <button
              className="manager_manage_diamond_create_button"
              onClick={() => backList()}
            >Show all promotions</button>
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
                  <StyledTableCell align="center">Discount Percentage</StyledTableCell>
                  <StyledTableCell align="center">Description</StyledTableCell>
                  <StyledTableCell align="center">Start Date</StyledTableCell>
                  <StyledTableCell align="center">End Date</StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
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
                      <TableCell align="center">{item.startDate}</TableCell>
                      <TableCell align="center">{item.endDate}</TableCell>
                      <TableCell align="center">
                        <PromotionButton endDate={item.endDate} id={item.id} />
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
              <h4>Edit Promotion Information</h4>
              <div className="manager_manage_diamond_form_group">
                <label>Promotion</label>
                <input
                  type="text"
                  name="name"
                  value={editedPromotion.name}
                  onChange={handleChange}
                />
              </div>
              <div className="manager_manage_diamond_form_group">
                <label>Amount Available</label>
                <input
                  type="text"
                  name="amountAvailable"
                  value={editedPromotion.amountAvailable}
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

export default ManagerPromotionList;
