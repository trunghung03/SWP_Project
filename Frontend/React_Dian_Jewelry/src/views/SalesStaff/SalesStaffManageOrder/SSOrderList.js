import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../../styles/SalesStaff/SalesStaffManageOrder/SSOrderList.scss";
import SalesStaffSidebar from "../../../components/SalesStaffSidebar/SalesStaffSidebar.js";
import logo from "../../../assets/img/logoN.png";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { TableHead } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InfoIcon from "@mui/icons-material/Info";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getSalesStaffOrderList } from "../../../services/SalesStaffService/SSOrderService.js";

const SSOrderList = () => {
  const navigate = useNavigate();
  const [orderList, setOrderList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const employeeId = localStorage.getItem("employeeId");
  const [sortOrder, setSortOrder] = useState("default");
  const [isSearch, setIsSearch] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 6,
    totalPages: 1,
    totalCount: 0,
  });

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#faecec',
      color: '#575757',
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
    fetchOrders(pagination.currentPage, selectedValue);
  };

  const fetchOrders = async (page = 1, status = sortOrder) => {
    try {
      const response = await getSalesStaffOrderList(employeeId, page, pagination.pageSize, status);
      console.log("API Response:", response); // Log the full response to inspect it
      const { orders, totalCount } = response.data;
      setOrderList(orders);
      setPagination((prev) => ({
        ...prev,
        currentPage: page,
        totalPages: Math.ceil(totalCount / pagination.pageSize),
        totalCount,
      }));
    } catch (error) {
      console.error("Failed to fetch order list:", error);
      swal("Error", "Failed to fetch order list", "error");
    }
  };

  useEffect(() => {
    fetchOrders(pagination.currentPage, sortOrder);
  }, [employeeId, pagination.currentPage]);

  const handlePageChange = (pageNumber) => {
    setPagination((prev) => ({ ...prev, currentPage: pageNumber }));
    fetchOrders(pageNumber, sortOrder);
  };

  const renderPagination = () => {
    const pages = [];
    const totalPages = pagination.totalPages;
    const currentPage = pagination.currentPage;

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
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
    } else {
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
    }

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

  const handleSearchKeyPress = async (e) => {
    if (e.key === "Enter") {
      const searchValue = e.target.value.toLowerCase();
      if (searchValue.trim() === "") {
        fetchOrders();
      } else {
        setIsSearch(true);
        const filteredOrders = orderList.filter(
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
    fetchOrders();
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
              placeholder="Search by Order ID..."
              value={searchQuery}
              style={{ width: '140px' }}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={handleSearchKeyPress}
            />
          </div>
        </div>
        <hr className="ss_manage_content_line"></hr>
        <h3 className="manager_title_employees" style={{ textAlign: "center", color: "#292727", fontFamily: "serif" }}>
          Order List
        </h3>
        <div className="ss_header_pagination_list">
          <FormControl
            variant="standard"
            sx={{ m: 1, minWidth: 120, height: 30 }}
          >
            <InputLabel id="demo-simple-select-standard-label">
              Status
            </InputLabel>
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
          {renderPagination()}
        </div>
        <div className="manager_manage_diamond_table_wrapper">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Order ID</StyledTableCell>
                  <StyledTableCell align="center">Customer Name</StyledTableCell>
                  <StyledTableCell align="center">Created Date</StyledTableCell>
                  <StyledTableCell align="center">Shipping Address</StyledTableCell>
                  <StyledTableCell align="center">Phone number</StyledTableCell>
                  <StyledTableCell align="center">Order Status</StyledTableCell>
                  <StyledTableCell align="center">Detail</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderList.length > 0 ? (
                  orderList.map((item) => (
                    <TableRow className="manager_manage_table_body_row" key={item.orderId}>
                      <TableCell style={{ color: "#767677" }} align="center">{item.orderId}</TableCell>
                      <TableCell style={{ color: "#767677" }} align="center">{item.name}</TableCell>
                      <TableCell style={{ color: "#767677" }} align="center">
                        {new Date(item.date).toLocaleDateString("en-CA")}
                      </TableCell>
                      <TableCell style={{ color: "#767677" }} align="center">
                        {item.shippingAddress}
                      </TableCell>
                      <TableCell style={{ color: "#767677" }} align="center">{item.phoneNumber}</TableCell>
                      <TableCell style={{ color: "#767677" }} align="center">{item.orderStatus}</TableCell>
                      <TableCell style={{ color: "#767677" }} align="center">
                        <InfoIcon
                          style={{ cursor: "pointer", color: "#ffc1c1" }}
                          onClick={() => viewDetail(item.orderId)}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan="7" align="center">No order found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {isSearch && (
            <button className="SS_back_button" onClick={handleBackClick}>
              Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SSOrderList;
