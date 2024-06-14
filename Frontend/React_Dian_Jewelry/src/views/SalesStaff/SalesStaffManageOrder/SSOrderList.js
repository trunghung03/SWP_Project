import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../../styles/SalesStaff/SalesStaffManageOrder/SSOrderList.scss";
import SalesStaffSidebar from "../../../components/SalesStaffSidebar/SalesStaffSidebar.js";
import {
  getAllOrders,
  getOrderById,
  fetchUserByUserId,
  getAssignOrders,
} from "../../../services/TrackingOrderService.js";
import logo from "../../../assets/img/logoN.png";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InfoIcon from "@mui/icons-material/Info";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SSOrderList = () => {
  const navigate = useNavigate();
  const [orderList, setOrderList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [assignOrdersList, setAssignOrdersList] = useState([]);
  const [items, setItems] = useState([]);
  const employeeId = localStorage.getItem("employeeId");
  const [sortOrder, setSortOrder] = useState("default");
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

  const handleSort = (e) => {
    const orderStatus = e.target.value;
    setSortOrder(orderStatus);
  };

  const handleChange = (event) => {
    setSortOrder(event.target.value);
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all orders
        const response = await getAllOrders();
        setOrderList(response);

        // const response = await getAssignOrders(employeeId);
        // setOrderList(response);

        // Fetch user details for each order
        const userDetailsPromises = response.map(async (item) => {
          try {
            const user = await fetchUserByUserId(item.userId);
            // Store user details as an object instead of a string
            return {
              userId: item.userId,
              userDetails: {
                firstName: user.firstName,
                lastName: user.lastName,
              },
            };
          } catch (error) {
            console.error("Failed to fetch user details:", error);
            // Handle error appropriately, maybe keep it as null or an empty object
            return { userId: item.userId, userDetails: null };
          }
        });

        // Wait for all user details to be fetched
        const userDetailsResults = await Promise.all(userDetailsPromises);

        // Update state with user details
        setUserDetails((prevDetails) => {
          const newDetails = { ...prevDetails };
          userDetailsResults.forEach(({ userId, userDetails }) => {
            newDetails[userId] = userDetails;
          });
          return newDetails;
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [items]);

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 6;

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

  const filteredOrders = sortOrder === "default"
    ? orderList
    : orderList.filter((order) => order.orderStatus === sortOrder);

  const currentOrder = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

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

  return (
    <div className="ss_manage_order_all_container">
      <div className="ss_manage_order_sidebar">
        <SalesStaffSidebar currentPage="salesstaff_manage_order" />
      </div>
      <div className="ss_manage_order_content">
        <div className="manager_manage_diamond_header">
          <img className="manager_manage_diamond_logo" src={logo} alt="Logo" />
          <div className="manager_manage_diamond_search_section">
            <i className="fas fa-search manager_manage_search_icon"></i>
            <input
              type="text"
              className="manager_manage_diamond_search_bar"
              placeholder="Search by Order ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={handleSearchKeyPress}
            />
          </div>
        </div>
        <hr className="manager_header_line"></hr>
        <div className="manager_header_pagination_list">
          <h3
            className="manager_title_employees"
            style={{ textAlign: "center" }}
          >
            Order List
          </h3>
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
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
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
          <MenuItem value="default">Default</MenuItem>
            <MenuItem value="unpaid">Unpaid</MenuItem>
            <MenuItem value="paid">Paid</MenuItem>
            <MenuItem value="preparing">Preparing</MenuItem>
            <MenuItem value="delivering">Delivering</MenuItem>
            <MenuItem value="delivered">Delivered</MenuItem>
        </Select>
      </FormControl>
        <div className="manager_manage_diamond_table_wrapper">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="justify">Order ID</StyledTableCell>
                  <StyledTableCell align="justify">
                    Customer Name
                  </StyledTableCell>
                  <StyledTableCell align="justify">
                    Created Date
                  </StyledTableCell>
                  <StyledTableCell align="justify">
                    Shipping Address
                  </StyledTableCell>
                  <StyledTableCell align="justify">
                    Phone number
                  </StyledTableCell>
                  <StyledTableCell align="justify">
                    Order Status
                  </StyledTableCell>
                  <StyledTableCell align="justify">Detail</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderList.length > 0 ? (
                  currentOrder.map((item) => (
                    <TableRow
                      className="manager_manage_table_body_row"
                      key={item.orderId}
                    >
                      <TableCell>{item.orderId}</TableCell>
                      <TableCell key={item.id}>
                        {userDetails[item.userId]
                          ? `${userDetails[item.userId].lastName} ${
                              userDetails[item.userId].firstName
                            }`
                          : "Loading..."}
                      </TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.shippingAddress}</TableCell>
                      <TableCell>{item.phoneNumber}</TableCell>
                      <TableCell>{item.orderStatus}</TableCell>
                      <TableCell>
                        <InfoIcon
                          style={{ cursor: "pointer" }}
                          onClick={() => navigate('/sales-staff-manage-order-detail', { state: { orderId: item.orderId, orderStatus:item.orderStatus }, })}
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
      </div>
    </div>
  );
};

export default SSOrderList;