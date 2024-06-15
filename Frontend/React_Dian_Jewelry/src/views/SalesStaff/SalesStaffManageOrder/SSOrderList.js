import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../../styles/SalesStaff/SalesStaffManageOrder/SSOrderList.scss";
import SalesStaffSidebar from "../../../components/SalesStaffSidebar/SalesStaffSidebar.js";
import { getOrderById } from "../../../services/TrackingOrderService.js";
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
import { getSalesStaffOrderList, getPurchaseOrderByStatus } from "../../../services/SalesStaffService/SSOrderService.js";

const SSOrderList = () => {
  const navigate = useNavigate();
  const [orderList, setOrderList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const employeeId = localStorage.getItem("employeeId");
  const [sortOrder, setSortOrder] = useState("default");
  const [currentOrder, setCurrentOrder] = useState([]);
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
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
    console.log("Selected status:", selectedValue);

    if (selectedValue === "default") {
      fetchAllOrders();
    } else {
      try {
        const orders = await getPurchaseOrderByStatus(selectedValue);
        console.log("Fetched orders:", orders?.data);
        if (orders) {
          setOrderList([...orders?.data]);
        } else if (orders) {
          setOrderList(orders?.data);
        } else {
          setOrderList(orders?.data);
          console.error("Expected an array but got:", orders);
        }
      } catch (error) {
        console.error("Failed to fetch orders by status:", error);
        swal("Error", "Failed to fetch orders by status", "error");
      }
    }
  };

  const fetchAllOrders = async () => {
    try {
      const orders = await getSalesStaffOrderList(employeeId);
      console.log("Fetched all orders:", orders);
      if (Array.isArray(orders)) {
        setOrderList(orders);
      } else {
        setOrderList([]);
        console.error("Expected an array but got:", orders);
      }
    } catch (error) {
      console.error("Failed to fetch order list:", error);
      swal("Error", "Failed to fetch order list", "error");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [employeeId]);

  const [currentPage, setCurrentPage] = useState(1);
  
 const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    console.log(orderList);
    const ordersPerPage = 6;

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

  const filteredOrders =
    sortOrder === "default"
      ? orderList
      : orderList?.filter((order) => order.orderStatus === sortOrder);
      setTotalPages(Math.ceil(filteredOrders.length / ordersPerPage));
    setCurrentOrder(filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder));
  },[orderList,currentPage])
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchKeyPress = async (e) => {
    if (e.key === "Enter") {
      try {
        const orderId = e.target.value;
        const orderDetails = await getOrderById(orderId);
        console.log(orderDetails);
        // Assuming you want to set the state to show the search result
        if (orderDetails) {
          setOrderList([orderDetails]);
        } else {
          setOrderList([]);
        }
      } catch (error) {
        console.error("Failed to fetch order details:", error);
      }
    }
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
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={handleSearchKeyPress}
            />
          </div>
        </div>
        <hr className="ss_manage_content_line"></hr>
        <h3 className="manager_title_employees" style={{ textAlign: "center" }}>
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
              <MenuItem value="Delivered">Delivered</MenuItem>
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
                className={index + 1 === currentPage ? "manager_order_active" : ""}
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
                  <StyledTableCell align="center">Customer Name</StyledTableCell>
                  <StyledTableCell align="center">Created Date</StyledTableCell>
                  <StyledTableCell align="center">Shipping Address</StyledTableCell>
                  <StyledTableCell align="center">Phone number</StyledTableCell>
                  <StyledTableCell align="center">Order Status</StyledTableCell>
                  <StyledTableCell align="center">Detail</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentOrder.length > 0 ? (
                  currentOrder.map((item) => (
                    <TableRow className="manager_manage_table_body_row" key={item.orderId}>
                      <TableCell align="center">{item.orderId}</TableCell>
                      <TableCell align="center">{item.name}</TableCell>
                      <TableCell align="center">{item.date}</TableCell>
                      <TableCell align="center">{item.shippingAddress}</TableCell>
                      <TableCell align="center">{item.phoneNumber}</TableCell>
                      <TableCell align="center">{item.orderStatus}</TableCell>
                      <TableCell align="center">
                        <InfoIcon style={{ cursor: "pointer" }} onClick={() => viewDetail(item.orderId)} />
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
        </div>
      </div>
    </div>
  );
};

export default SSOrderList;
