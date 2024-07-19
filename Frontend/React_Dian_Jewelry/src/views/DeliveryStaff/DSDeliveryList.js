import React, { useEffect, useState } from "react";
import "../../styles/Manager/ManagerList.scss";
import logo from "../../assets/img/logoN.png";
import DeliveryStaffSidebar from "../../components/DeliveryStaffSidebar/DeliveryStaffSidebar.js";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import InfoIcon from "@mui/icons-material/Info";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { getDeliveryStaffOrderList } from "../../services/DeliveryStaffService/DSDeliveryService.js";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const DSDeliveryList = () => {
  const navigate = useNavigate();
  const employeeId = localStorage.getItem("employeeId");
  const [sortOrder, setSortOrder] = useState("default");
  const [orderList, setOrderList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#faecec',
      color: '1c1c1c',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const viewDetail = (orderId) => {
    navigate(`/delivery-staff-delivery-detail/${orderId}`);
  };

  const fetchAllOrders = async (page = 1, status = 'default') => {
    try {
      const response = await getDeliveryStaffOrderList(employeeId, page, 6, status);
      const { orders, totalCount } = response;
      setOrderList(orders);
      setTotalPages(Math.ceil(totalCount / 6));
    } catch (error) {
      console.error("Failed to fetch order list:", error);
      swal("Error", "Failed to fetch order list", "error");
    }
  };

  useEffect(() => {
    fetchAllOrders(currentPage, sortOrder);
  }, [employeeId, currentPage, sortOrder]);

  const handleChange = async (event) => {
    const selectedValue = event.target.value;
    setSortOrder(selectedValue);
    setCurrentPage(1); // Reset to the first page when changing the sort order
    fetchAllOrders(1, selectedValue);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      const searchValue = e.target.value.toLowerCase();
      if (searchValue.trim() === "") {
        setIsSearch(false);
        fetchAllOrders(currentPage, sortOrder);
      } else {
        const filteredOrders = orderList.filter(order =>
          order.orderId.toString().toLowerCase().includes(searchValue) ||
          order.name.toLowerCase().includes(searchValue)
        );
        setOrderList(filteredOrders);
        setIsSearch(true);
      }
    }
  };

  const handleBackClick = () => {
    setSearchQuery("");
    setIsSearch(false);
    fetchAllOrders(currentPage, sortOrder);
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
              style={{ width: '140px' }}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={handleSearchKeyPress}
            />
          </div>
        </div>
        <hr className="ss_manage_content_line"></hr>
        <h3 style={{ textAlign: "center", fontWeight: "unset" }}>
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
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
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
                      <TableCell align="center">{item.orderId}</TableCell>
                      <TableCell align="center">{item.name}</TableCell>
                      <TableCell align="center">{new Date(item.date).toLocaleDateString("en-CA")}</TableCell>
                      <TableCell align="center">{item.shippingAddress}</TableCell>
                      <TableCell align="center">{item.phoneNumber}</TableCell>
                      <TableCell align="center">{item.orderStatus}</TableCell>
                      <TableCell align="center">
                        <InfoIcon
                          style={{ cursor: "pointer", color: "#ff6a6a" }}
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
