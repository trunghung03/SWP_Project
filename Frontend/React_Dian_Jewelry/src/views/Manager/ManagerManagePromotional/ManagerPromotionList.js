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
  updatePromotionById,
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
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const headCells = [
  { id: 'id', numeric: false, disablePadding: false, label: 'ID', sortable: true },
  { id: 'name', numeric: false, disablePadding: false, label: 'Name', sortable: true },
  { id: 'code', numeric: false, disablePadding: false, label: 'Code', sortable: true },
  { id: 'amount', numeric: true, disablePadding: false, label: 'Discount Percentage (%)', sortable: true },
  { id: 'description', numeric: false, disablePadding: false, label: 'Description', sortable: false },
  { id: 'startDate', numeric: false, disablePadding: false, label: 'Start Date', sortable: true },
  { id: 'endDate', numeric: false, disablePadding: false, label: 'End Date', sortable: true },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status', sortable: false },
  { id: 'actions', numeric: false, disablePadding: false, label: 'Actions', sortable: false },
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
const getPromotionStatus = async (endDate, id) => {
  try {
    const promotion = await getPromotionDetail(id);
    if (promotion.status === true) {
      const currentDate = new Date();
      const end = new Date(endDate);
      // Include the end date in the active period
      return currentDate <= end.setHours(23, 59, 59, 999);
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
  const [editMode, setEditMode] = useState(false);
  const [editedPromotion, setEditedPromotion] = useState({
    name: "",
    code: "",
    amount: 0,
    description: "",
    validFrom: "",
    validTo: ""
  });
  const [originalPromotion, setOriginalPromotion] = useState({});
  const [isSearch, setIsSearch] = useState(false);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');

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

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleSearchKeyPress = async (e) => {
    const isInteger = (value) => /^-?\d+$/.test(value);

    if (e.key === "Enter") {
      if (isInteger(searchQuery.trim())) {
        setIsSearch(true);
        try {
          const response = await getPromotionDetail(searchQuery.trim());
          setPromotionList([response]);
          setPage(1);
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
          setPage(1);
        } catch (error) {
          console.error("Error fetching Promotion:", error);
          swal("Promotion not found!", "Please try another one.", "error");
        }
      } else {
        setIsSearch(false);
        try {
          const response = await ShowAllPromotion();
          setPromotionList(response);
          setPage(1);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    }
  };

  const handleEdit = (promotion) => {
    setEditMode(true);
    setEditedPromotion({
      ...promotion,
      validFrom: formatDate(promotion.startDate),
      validTo: formatDate(promotion.endDate)
    });
    setOriginalPromotion(promotion);
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
      if (field !== "description" && specialCharPattern.test(editedPromotion[field])) {
        swal("Invalid characters detected!", `Field "${field}" contains special characters.`, "error");
        return;
      }
    }

    const validFromDate = new Date(editedPromotion.validFrom);
    const validToDate = new Date(editedPromotion.validTo);

    if (validFromDate > validToDate) {
      swal("Invalid date range!", "The start date must be before the end date.", "error");
      return;
    }

    const isEqual =
      JSON.stringify(originalPromotion) === JSON.stringify(editedPromotion);
    if (isEqual) {
      swal("No changes detected!", "You have not made any changes.", "error");
      return;
    }

    const promotionToUpdate = { ...editedPromotion, status: true };

    try {
      const response = await updatePromotionById(promotionToUpdate.id, promotionToUpdate);
      const updatedPromotionList = await ShowAllPromotion();
      setPromotionList(updatedPromotionList);
      setEditMode(false);
      swal("Updated successfully!", "The promotion information has been updated.", "success");
    } catch (error) {
      console.error("Error updating promotion:", error.response ? error.response.data : error.message);
      swal("Something went wrong!", "Failed to update. Please try again.", "error");
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };


  const handleBack = async () => {
    try {
      const response = await ShowAllPromotion();
      setPromotionList(response);
      setPage(1);
      setIsSearch(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
        <hr className="manager_header_line" />
        <h3>List Of Promotional Codes</h3>
        <div className="manager_manage_diamond_create_button_section" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            className="manager_manage_diamond_create_button"
            onClick={() => navigate("/manager-add-promotion")}
          >
            Add new promotional code
          </button>
          <Pagination
            count={Math.ceil(promotionList.length / rowsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
        <div className="manager_manage_diamond_table_wrapper">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={(event, property) => {
                  const isAsc = orderBy === property && order === "asc";
                  setOrder(isAsc ? "desc" : "asc");
                  setOrderBy(property);
                }}
                rowCount={promotionList.length}
              />
              <TableBody>
                {promotionList.length > 0 ? (
                  tableSort(promotionList, getComparator(order, orderBy))
                    .slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
                    .map((item) => (
                      <TableRow className="manager_manage_table_body_row" key={item.id}>
                        <TableCell align="center">{item.id}</TableCell>
                        <TableCell align="center">{item.name}</TableCell>
                        <TableCell align="center">{item.code}</TableCell>
                        <TableCell align="center">{item.amount*100}</TableCell>
                        <TableCell align="center">{item.description}</TableCell>
                        <TableCell align="center">{new Date(item.startDate).toLocaleDateString("en-CA")}</TableCell>
                        <TableCell align="center">{new Date(item.endDate).toLocaleDateString("en-CA")}</TableCell>
                        <TableCell align="center">
                          <PromotionButton endDate={item.endDate} id={item.id} />
                        </TableCell>
                        <TableCell align="center">
                          <IconButton onClick={() => handleEdit(item)}>
                            <EditIcon style={{ cursor: "pointer", color: "#575252" }} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan="9" align="center">
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
                  label="Name"
                  name="name"
                  value={editedPromotion.name}
                  onChange={handleChange}
                  fullWidth
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
