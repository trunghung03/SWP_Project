import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom"; // Import useSearchParams
import swal from "sweetalert";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../../styles/SalesStaff/SalesStaffManageOrder/SSOrderList.scss";
import SalesStaffSidebar from "../../../components/SalesStaffSidebar/SalesStaffSidebar.js";
import logo from "../../../assets/img/logoN.png";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import InfoIcon from "@mui/icons-material/Info";
import PropTypes from "prop-types";
import { getComparator, tableSort } from "../../../components/CustomTable/SortTable.js";
import { getSalesStaffOrderList } from "../../../services/SalesStaffService/SSOrderService.js";
import OrderTabs from "./OrderTab.js";
import { visuallyHidden } from "@mui/utils";
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

const SSOrderList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [orderList, setOrderList] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("orderId");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const employeeId = localStorage.getItem("employeeId");
  const [pagination, setPagination] = useState({
    currentPage: parseInt(searchParams.get("pageNumber")) || 1,
    pageSize: 6,
    totalPages: 1,
    totalCount: 0,
  });
  const [tabValue, setTabValue] = useState(parseInt(searchParams.get("tab")) || 0);
  const statusList = ["Unpaid", "Paid", "Preparing", "Delivering", "Completed", "Cancelled"];

  const viewDetail = (orderId) => {
    navigate(`/sales-staff-manage-order-detail/${orderId}?tab=${tabValue}`);
  };

  const fetchOrders = async (page = 1, search = searchQuery) => {
    try {
      const status = statusList[tabValue];
      const response = await getSalesStaffOrderList(
        employeeId,
        page,
        pagination.pageSize,
        status,
        search
      );
      const { orders, pagination: newPagination } = response;
      setOrderList(orders);
      setPagination({
        ...pagination,
        currentPage: newPagination.currentPage,
        totalPages: newPagination.totalPages,
        totalCount: newPagination.totalCount,
      });
    } catch (error) {
      console.error("Failed to fetch order list:", error);
      swal("Error", "Failed to fetch order list", "error");
    }
  };

  useEffect(() => {
    fetchOrders(pagination.currentPage);
  }, [employeeId, pagination.currentPage, tabValue, searchQuery]);

  const handlePageChange = (event, value) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: value,
    }));
    setSearchParams((prev) => {
      prev.set("pageNumber", value);
      return prev;
    });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setSearchParams((prev) => {
      prev.set("search", value);
      prev.set("pageNumber", 1);
      return prev;
    });
    fetchOrders(1, value);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setSearchParams((prev) => {
      prev.set("tab", newValue);
      prev.set("pageNumber", 1);
      return prev;
    });
  };

  const handleBackClick = () => {
    setSearchQuery("");
    setSearchParams((prev) => {
      prev.delete("search");
      return prev;
    });
    fetchOrders(pagination.currentPage, "");
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
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="ss_manage_order_all_container">
      <div className="ss_manage_order_sidebar">
        <SalesStaffSidebar currentPage="salesstaff_manage_order" />
      </div>
      <div className="ss_manage_content_content">
        <div className="ss_manage_content_header">
          <img className="ss_manage_content_logo" src={logo} alt="Logo" />
          <div className="ss_manage_content_search_section">
            <input
              type="text"
              className="ss_manage_content_search_bar"
              placeholder="Search by . . ."
              value={searchQuery}
              style={{ width: "140px" }}
              onChange={handleSearchChange}
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
        <OrderTabs value={tabValue} handleChange={handleTabChange} statusList={statusList} pagination={pagination} handlePageChange={handlePageChange} />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {tableSort(orderList, getComparator(order, orderBy))
                .slice(0, pagination.pageSize)
                .map((item, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const textStyle =
                    item.orderStatus === "Unpaid" && isOrderOverdue(item.date)
                      ? { color: "#e05858", fontWeight: "bold" }
                      : {};

                  return (
                    <TableRow
                      hover
                      onClick={() => viewDetail(item.orderId)}
                      role="checkbox"
                      tabIndex={-1}
                      key={item.orderId}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="center"
                        style={textStyle}
                      >
                        {item.orderId}
                      </TableCell>
                      <TableCell align="center" style={textStyle}>
                        {item.name}
                      </TableCell>
                      <TableCell align="center" style={textStyle}>
                        {formatDate(item.date)}
                      </TableCell>
                      <TableCell align="center" style={textStyle}>
                        {item.shippingAddress}
                      </TableCell>
                      <TableCell align="center" style={textStyle}>
                        {item.phoneNumber}
                      </TableCell>
                      <TableCell align="center" style={textStyle}>
                        {item.orderStatus}
                      </TableCell>
                      <TableCell align="center">
                        <InfoIcon
                          style={{ cursor: "pointer", color: "#575252" }}
                          onClick={() => viewDetail(item.orderId)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {orderList.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No order found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {/* {searchQuery && (
          <button className="SS_back_button" onClick={handleBackClick}>
            Back
          </button>
        )} */}
      </div>
    </div>
  );
};

SSOrderList.propTypes = {
  status: PropTypes.string.isRequired,
};

export default SSOrderList;
