import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../styles/SalesStaff/SalesStaffManageOrder/SSOrderList.scss";
import ManagerSidebar from "../../components/ManagerSidebar/ManagerSidebar.js";
import logo from "../../assets/img/logoN.png";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import InfoIcon from "@mui/icons-material/Info";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { visuallyHidden } from "@mui/utils";
import { fetchAllOrders } from "../../services/SalesStaffService/SSOrderService.js";
import PropTypes from "prop-types";
import {
  EnhancedTableToolbar,
  getComparator,
  tableSort,
} from "../../components/CustomTable/SortTable.js";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";



const headCells = [
  { id: "orderId", numeric: false, disablePadding: false, label: "Order ID", sortable: true },
  { id: "name", numeric: false, disablePadding: false, label: "Customer Name", sortable: true },
  { id: "date", numeric: false, disablePadding: false, label: "Created Date", sortable: true },
  { id: "shippingAddress", numeric: false, disablePadding: false, label: "Shipping Address", sortable: true },
  { id: "phoneNumber", numeric: false, disablePadding: false, label: "Phone number", sortable: true },
  { id: "orderStatus", numeric: false, disablePadding: false, label: "Order Status", sortable: false },
  { id: "detail", numeric: false, disablePadding: false, label: "Detail", sortable: false },
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

const ManagerOrderList = () => {
  const navigate = useNavigate();
  const [orderList, setOrderList] = useState([]);
  const [originalOrderList, setOriginalOrderList] = useState([]); // Maintain the original list
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("orderId");
  const [searchQuery, setSearchQuery] = useState("");
  const employeeId = localStorage.getItem("employeeId");
  const [sortOrder, setSortOrder] = useState("default");
  const [isSearch, setIsSearch] = useState(false);
  const [dense, setDense] = React.useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 6,
    totalPages: 1,
    totalCount: 0,
  });

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#faecec",
      color: "#575757",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const viewDetail = (orderId) => {
    navigate(`/sales-staff-manage-order-detail/${orderId}`);
  };

  const handleChange = async (event) => {
    const selectedValue = event.target.value;
    setSortOrder(selectedValue);
    setPagination((prev) => ({
      ...prev,
      currentPage: 1, // Reset to the first page
    }));
  };

  const fetchOrders = async (page = 1, status = sortOrder) => {
    try {
      const response = await fetchAllOrders();
      const { orders, totalCount } = response;
      setOrderList(orders);
      setOriginalOrderList(orders);
      setPagination((prev) => ({
        ...prev,
        currentPage: page,
        totalPages: Math.ceil(totalCount / (prev.pageSize || 1)), // Ensure pageSize is not zero
        totalCount,
      }));
    } catch (error) {
      console.error("Failed to fetch order list:", error);
      swal("Error", "Failed to fetch order list", "error");
    }
  };

  useEffect(() => {
    fetchOrders(pagination.currentPage, sortOrder);
  }, [employeeId, pagination.currentPage, sortOrder]);

  const handlePageChange = (event, value) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: value,
    }));
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSearchKeyPress = async (e) => {
    if (e.key === "Enter") {
      const searchValue = e.target.value.toLowerCase();
      if (searchValue.trim() === "") {
        fetchOrders();
      } else {
        setIsSearch(true);
        const filteredOrders = originalOrderList.filter(
          (order) =>
            order.orderId.toString().toLowerCase().includes(searchValue) ||
            order.name.toLowerCase().includes(searchValue)
        );
        setOrderList(filteredOrders);
      }
    }
  };

  const handleBackClick = () => {
    setSearchQuery("");
    setIsSearch(false);
    setOrderList(originalOrderList); // Reset to original list
  };

  const isOrderOverdue = (orderDate) => {
    const currentDate = new Date();
    const createdDate = new Date(orderDate);
    const diffTime = Math.abs(currentDate - createdDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 3;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="ss_manage_order_all_container">
      <div className="ss_manage_order_sidebar">
        <ManagerSidebar currentPage="manager_view_order_list" />
      </div>
      <div className="ss_manage_content_content">
        <div className="ss_manage_content_header">
          <img className="ss_manage_content_logo" src={logo} alt="Logo" />
          <div className="ss_manage_content_search_section">
            <input
              type="text"
              className="ss_manage_content_search_bar"
              placeholder="Search by Order ID..."
              value={searchQuery}
              style={{ width: "140px" }}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={handleSearchKeyPress}
            />
          </div>
        </div>
        <hr className="ss_manage_content_line"></hr>
        <h3
          className="manager_title_employees"
          style={{
            textAlign: "center",
            color: "#292727",
            fontFamily: "serif",
          }}
        >
          Order List
        </h3>
        <div className="ss_header_pagination_list">
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120, height: 30 }}>
            <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              onChange={handleChange}
              value={sortOrder}
              label="Status"
            >
              <MenuItem value="default">Default</MenuItem>
              <MenuItem value="Unpaid">Unpaid</MenuItem>
              <MenuItem value="Paid">Paid</MenuItem>
              <MenuItem value="Preparing">Preparing</MenuItem>
              <MenuItem value="Delivering">Delivering</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
          <Stack spacing={2}>
            <Pagination
              count={pagination.totalPages}
              page={pagination.currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        </div>
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <EnhancedTableToolbar numSelected={0} />
            <TableContainer>
              <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {tableSort(orderList || [], getComparator(order, orderBy))
                    .slice(
                      (pagination.currentPage - 1) * pagination.pageSize,
                      pagination.currentPage * pagination.pageSize
                    )
                    .map((row, index) => {
                      const labelId = `enhanced-table-checkbox-${index}`;
                      const isOverdue = isOrderOverdue(row.date);
                      return (
                        <TableRow hover tabIndex={-1} key={row.orderId}>
                          <StyledTableCell align="center" component="th" id={labelId} scope="row" padding="none">
                            {row.orderId}
                          </StyledTableCell>
                          <StyledTableCell align="center">{row.name}</StyledTableCell>
                          <StyledTableCell align="center">{formatDate(row.date)}</StyledTableCell>
                          <StyledTableCell align="center">{row.shippingAddress}</StyledTableCell>
                          <StyledTableCell align="center">{row.phoneNumber}</StyledTableCell>
                          <StyledTableCell align="center">
                            <span
                              className={`order-status ${isOverdue ? "overdue" : row.orderStatus}`}
                            >
                              {row.orderStatus}
                            </span>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <InfoIcon
                              style={{ color: "#9e9e9e", cursor: "pointer" }}
                              onClick={() => viewDetail(row.orderId)}
                            />
                          </StyledTableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
        {isSearch && (
          <button className="SS_back_button" onClick={handleBackClick}>
            Back
          </button>
        )}
      </div>
    </div>
  );
};

export default ManagerOrderList;
