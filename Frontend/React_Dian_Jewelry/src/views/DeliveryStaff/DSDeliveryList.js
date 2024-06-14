import React, { useEffect, useState } from "react";
import "../../styles/Manager/ManagerList.scss";
import logo from "../../assets/img/logoN.png";
import DeliveryStaffSidebar from "../../components/DeliveryStaffSidebar/DeliveryStaffSidebar.js";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow"; // Import TableRow
import FormControl from "@mui/material/FormControl"; // Import FormControl
import InputLabel from "@mui/material/InputLabel"; // Import InputLabel
import Select from "@mui/material/Select"; // Import Select
import MenuItem from "@mui/material/MenuItem"; // Import MenuItem
import TableContainer from "@mui/material/TableContainer"; // Import TableContainer
import Paper from "@mui/material/Paper"; // Import Paper
import TableHead from "@mui/material/TableHead"; // Import TableHead
import InfoIcon from "@mui/icons-material/Info";
import {
  getAllOrders,
  getOrderById,
  fetchUserByUserId,
  getAssignOrders,
} from "../../services/TrackingOrderService.js";
import { useNavigate } from "react-router-dom";
import { getDeliveryStaffOrderList } from "../../services/DeliveryStaffService/DSDeliveryService.js";
const DSDeliveryList = () => {
  const navigate = useNavigate();
  const employeeId = localStorage.getItem("employeeId");
  const [sortOrder, setSortOrder] = useState("default");
  const [orderList, setOrderList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const handleMoreDetails = (item) => {
    console.log("More details for item:", item);
    // Implement the logic to show more details about the item
    // This could be opening a modal, redirecting to another page, etc.
  };
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 6;

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

  const filteredOrders =
    sortOrder === "default"
      ? orderList
      : orderList.filter((order) => order.orderStatus === sortOrder);

  const currentOrder = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const handleChange = (event) => {
    setSortOrder(event.target.value);
  };

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchKeyPress = async (e) => {
    if (e.key === "Enter") {
      // Check if the Enter key was pressed
      try {
        const orderId = e.target.value; // Assuming the input value is the order ID
        const orderDetails = await getOrderById(orderId);
        console.log(orderDetails); // Do something with the order details, e.g., display them
      } catch (error) {
        console.error("Failed to fetch order details:", error);
        // Handle error (e.g., show an error message to the user)
      }
    }
  };
  useEffect(() => {
    getDeliveryStaffOrderList(employeeId)
      .then((data) => {
        setOrderList(data);
      })
      .catch((error) => {
        console.error("Failed to fetch order list:", error);
      });
  }, []);
  return (
    <div className="manager_manage_diamond_all_container">
      <div className="manager_manage_diamond_sidebar">
        <DeliveryStaffSidebar currentPage="deliverystaff_manage_order" />
      </div>
      <div className="manager_manage_diamond_content">
        <div className="manager_manage_diamond_header">
          <img className="manager_manage_diamond_logo" src={logo} alt="Logo" />
          <div className="ss_manage_content_search_section">
            {/* <i className="fas fa-search manager_manage_search_icon"></i> */}
            <input
              type="text"
              className="ss_manage_content_search_bar"
              placeholder="Search by Order ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={handleSearchKeyPress}
            />
          </div>
        </div>
        <hr className="manager_header_line"></hr>
        <h3 className="manager_title_employees" style={{ textAlign: "center" }}>
          Order List
        </h3>
        <div className="ds_header_pagination_list">
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
              value={sortOrder}
              onChange={handleChange}
              label="Status"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="default">Default</MenuItem> //mot chinh lai deli
              chi thay dc delivering, delivered
              <MenuItem value="unpaid">Unpaid</MenuItem>
              <MenuItem value="paid">Paid</MenuItem>
              <MenuItem value="preparing">Preparing</MenuItem>
              <MenuItem value="delivering">Delivering</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
            </Select>
          </FormControl>
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
                  <StyledTableCell align="center">Order ID</StyledTableCell>
                  <StyledTableCell align="center">
                    Customer Name
                  </StyledTableCell>
                  <StyledTableCell align="center">Created Date</StyledTableCell>
                  <StyledTableCell align="center">
                    Shipping Address
                  </StyledTableCell>
                  <StyledTableCell align="center">Phone number</StyledTableCell>
                  <StyledTableCell align="center">Order Status</StyledTableCell>
                  <StyledTableCell align="center">Detail</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderList.length > 0 ? (
                  currentOrder.map((item) => (
                    <TableRow
                      className="manager_manage_table_body_row"
                      key={item.orderId}
                    >
                      <TableCell align="center">{item.orderId}</TableCell>
                      <TableCell align="center">{item.name}</TableCell>
                      <TableCell align="center">{item.date}</TableCell>
                      <TableCell align="center">
                        {item.shippingAddress}
                      </TableCell>
                      <TableCell align="center">{item.phoneNumber}</TableCell>
                      <TableCell align="center">{item.orderStatus}</TableCell>
                      <TableCell align="center">
                        <InfoIcon
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            navigate("/delivery-staff-delivery-detail", {
                              state: {
                                orderId: item.orderId,
                                orderStatus: item.orderStatus,
                              },
                            })
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan="10">No order found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        {/* chinh tu day tro xuong */}
      </div>
    </div>
  );
};

export default DSDeliveryList;
