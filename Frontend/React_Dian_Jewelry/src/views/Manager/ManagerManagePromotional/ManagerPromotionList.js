import "@fortawesome/fontawesome-free/css/all.min.css";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import logo from "../../../assets/img/logoN.png";
import ManagerSidebar from "../../../components/ManagerSidebar/ManagerSidebar.js";
import {
  ShowAllPromotion,
  getPromotionByName,
  getPromotionDetail,
  updatePromotionById,
} from "../../../services/ManagerService/ManagerPromotionService.js";
import { set, useForm } from "react-hook-form";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const headCells = [
  { id: "id", numeric: false, disablePadding: false, label: "ID", sortable: true },
  { id: "name", numeric: false, disablePadding: false, label: "Name", sortable: true },
  { id: "code", numeric: false, disablePadding: false, label: "Code", sortable: true },
  { id: "amount", numeric: true, disablePadding: false, label: "Discount Percentage (%)", sortable: true },
  { id: "description", numeric: false, disablePadding: false, label: "Description", sortable: false },
  { id: "startDate", numeric: false, disablePadding: false, label: "Start Date", sortable: true },
  { id: "endDate", numeric: false, disablePadding: false, label: "End Date", sortable: true },
  { id: "status", numeric: false, disablePadding: false, label: "Status", sortable: false },
  { id: "actions", numeric: false, disablePadding: false, label: "Actions", sortable: false },
];
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};


const toUcsiDate = (date) => {
  return new Date(date).toLocaleDateString("en-CA");
};

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
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.sortable ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc" ? "sorted descending" : "sorted ascending"}
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
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const getComparator = (order, orderBy) => {
  return order === "desc"
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
    backgroundColor: "#f9c6bb",
    color: "1c1c1c",
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
  const [isSearch, setIsSearch] = useState(false);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [editedPromotion, setEditedPromotion] = useState({
    name: "",
    code: "",
    amount: 0,
    description: "",
    startDate: "",
    endDate: "",
  });
  const [originalPromotion, setOriginalPromotion] = useState({});

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

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
        swal("Please enter a valid promotion name or ID.", {
          icon: "warning",
        });
      }
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleOpenModal = (promotion) => {
    setEditedPromotion(promotion);
    setOriginalPromotion(promotion);
    Object.keys(promotion).forEach((key) => {
      setValue(key, promotion[key]);
      setValue("validFrom", formatDate(promotion.startDate));
      setValue("validTo", formatDate(promotion.endDate));
      setValue("amount", promotion.amount * 100);

    });
    setOpen(true);
  };

  const handleCloseModal = () => {
    setEditedPromotion(originalPromotion);
    setOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      data.amount = data.amount/100;
      data.validFrom = new Date(data.startDate);
      data.validTo = new Date(data.endDate);
      await updatePromotionById(editedPromotion.id, data);
      setOpen(false);
      swal("Update successful!", "Promotion has been updated.", "success");
      const response = await ShowAllPromotion();
      setPromotionList(response);
    } catch (error) {
      console.error("Error updating Promotion:", error);
      swal("Update failed!", "There was an error updating the Promotion.", "error");
    }
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, promotionList.length - (page - 1) * rowsPerPage);
  const sortedPromotions = tableSort(promotionList, getComparator(order, orderBy));
  const paginatedPromotions = sortedPromotions.slice((page - 1) * rowsPerPage, page * rowsPerPage);

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
          <Table>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {paginatedPromotions.map((promotion) => (
                <TableRow key={promotion.id}>
                  <StyledTableCell align="center">{promotion.id}</StyledTableCell>
                  <StyledTableCell align="center">{promotion.name}</StyledTableCell>
                  <StyledTableCell align="center">{promotion.code}</StyledTableCell>
                  <StyledTableCell align="center">{promotion.amount*100}</StyledTableCell>
                  <StyledTableCell align="center">{promotion.description}</StyledTableCell>
                  <TableCell align="center">{new Date(promotion.startDate).toLocaleDateString("en-CA")}</TableCell>
                        <TableCell align="center">{new Date(promotion.endDate).toLocaleDateString("en-CA")}</TableCell>
                  <StyledTableCell align="center">
                    <PromotionButton endDate={promotion.endDate} id={promotion.id} />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <IconButton onClick={() => handleOpenModal(promotion)}>
                      <EditIcon />
                    </IconButton>
                  </StyledTableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={9} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal open={open} onClose={handleCloseModal}>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "flex", flexDirection: "column", gap: 2, p: 3 }}
            style={{
              backgroundColor: "white",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "40%",
              boxShadow: 24,
              borderRadius: 5,
            }}
          >
            <Typography variant="h6">Edit Promotion</Typography>
            <TextField
              {...register("name", { required: "Name is required" })}
              label="Name"
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ""}
              fullWidth
            />
            <TextField
              {...register("code", { required: "Code is required" })}
              label="Code"
              error={!!errors.code}
              helperText={errors.code ? errors.code.message : ""}
              fullWidth
            />
            <TextField
              {...register("amount", {
                required: "Discount Percentage is required",
                min: { value: 1, message: "Minimum value is 1" },
                max: { value: 100, message: "Maximum value is 100" },
              })}
              label="Discount Percentage (%)"
              type="number"
              error={!!errors.amount}
              helperText={errors.amount ? errors.amount.message : ""}
              fullWidth
            />
            <TextField
              {...register("description")}
              label="Description"
              fullWidth
            />
            <TextField
              {...register("validFrom", { required: "Start Date is required" })}
              label="Start Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              error={!!errors.startDate}
              helperText={errors.startDate ? errors.startDate.message : ""}
              fullWidth
            />
            <TextField
              {...register("validTo", { required: "End Date is required" })}
              label="End Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              error={!!errors.endDate}
              helperText={errors.endDate ? errors.endDate.message : ""}
              fullWidth
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button variant="contained" color="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </div>
    </div>
  );
};

export default ManagerPromotionList;
