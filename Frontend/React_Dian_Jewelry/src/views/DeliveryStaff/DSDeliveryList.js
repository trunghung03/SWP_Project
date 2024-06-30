import React, { useEffect, useState } from "react";
import "../../styles/Manager/ManagerList.scss";
import logo from "../../assets/img/logoN.png";
import DeliveryStaffSidebar from "../../components/DeliveryStaffSidebar/DeliveryStaffSidebar.js";
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
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { getDeliveryStaffOrderList, getDeliPurchaseOrderByStatus } from "../../services/DeliveryStaffService/DSDeliveryService.js";
const DSDeliveryList = () => {
  const navigate = useNavigate();
  const employeeId = localStorage.getItem("employeeId");
  const [sortOrder, setSortOrder] = useState("default");
  const [orderList, setOrderList] = useState([]);
  const [initialOrderList, setInitialOrderList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [currentOrder, setCurrentOrder] = useState([]);
  
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#f9c6bb',
      color: '1c1c1c',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const viewDetail = (orderId) => {
    navigate(`/delivery-staff-delivery-detail/${orderId}`);
  };  
  
  const handleChange = async (event) => {
    const selectedValue = event.target.value;
    setSortOrder(selectedValue);
    console.log("Selected status:", selectedValue);

    if (selectedValue === "default") {
      fetchAllOrders();
    } else {
      try {
        const orders = await getDeliPurchaseOrderByStatus(selectedValue, employeeId);
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
      const orders = await getDeliveryStaffOrderList(employeeId);
      console.log("Fetched all orders:", orders);
      if (Array.isArray(orders)) {
        setOrderList(orders);
        setInitialOrderList(orders);
      } else {
        setOrderList([]);
        setInitialOrderList(orders);
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


const handleSearchKeyPress = (e) => {
  if (e.key === "Enter") {
    const searchValue = e.target.value.toLowerCase();
    if (searchValue.trim() === "") {
      setIsSearch(false);
     setOrderList(initialOrderList);
    } else {
      const filteredOrders = initialOrderList.filter(order =>
        order.orderId.toString().toLowerCase().includes(searchValue) ||
        order.name.toLowerCase().includes(searchValue)
      );
      if (filteredOrders.length > 0) {
        setOrderList(filteredOrders);
        setIsSearch(true); 
      } else {
        setOrderList([]); 
        setIsSearch(true); 
      }
    }
  }
};
const handleBackClick = () => {
  setSearchQuery("");
  setIsSearch(false);
  fetchAllOrders(initialOrderList);
};

  return (
    <div className="manager_manage_diamond_all_container">
      <div className="manager_manage_diamond_sidebar">
        <DeliveryStaffSidebar currentPage="deliverystaff_manage_order" />
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
        <h3 style={{ textAlign: "center" , fontWeight:"unset"}}>
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
              <MenuItem value="Delivering">Delivering</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
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
                      <TableCell align="center">{new Date(item.date).toLocaleDateString("en-CA")} </TableCell>
                      <TableCell align="center">
                        {item.shippingAddress}
                      </TableCell>
                      <TableCell align="center">{item.phoneNumber}</TableCell>
                      <TableCell align="center">{item.orderStatus}</TableCell>
                      <TableCell align="center">
                        <InfoIcon
                          style={{ cursor: "pointer", color: "#ff6a6a"}}
                          onClick={() => viewDetail(item.orderId)}
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

export default DSDeliveryList;
