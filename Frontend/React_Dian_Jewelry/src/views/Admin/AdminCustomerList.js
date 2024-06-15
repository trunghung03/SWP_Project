import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar.js";
import "../../styles/Manager/ManagerList.scss";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/logoN.png";
import {
  ShowAllCustomer,
  getCustomerDetail,
  getCustomerByName,
  changeStatus,
  getCustomerById,
} from "../../services/AdminService/AdminCustomerService.js";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const AdminCustomerList = () => {
  const navigate = useNavigate();
  const [customerList, setCustomerList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState({});
  const [originalCustomer, setOriginalCustomer] = useState({});
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ShowAllCustomer();
        setCustomerList(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 6;

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentCustomer = customerList.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalPages = Math.ceil(customerList.length / ordersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Search diamond by id
  const handleSearchKeyPress = async (e) => {
    if (e.key === "Enter") {
      if (searchQuery.trim().includes("@")) {
        try {
          const response = await getCustomerDetail(searchQuery.trim());
          setCustomerList([response]);
          setCurrentPage(1);
        } catch (error) {
          console.error("Error fetching diamond:", error);
          swal("Customer not found!", "Please try another one.", "error");
        }
      } else if (searchQuery.trim()) {
        try {
          const response = await getCustomerByName(searchQuery.trim());
          if (Array.isArray(response)) {
            setCustomerList(response);
          } else if (response) {
            setCustomerList([response]);
          } else {
            setCustomerList([]);
          }

          setCurrentPage(1);
        } catch (error) {
          console.error("Error fetching diamond:", error);
          swal("Customer not found!", "Please try another one.", "error");
        }
      } else {
        try {
          const response = await ShowAllCustomer();
          setCustomerList(response);
          setCurrentPage(1);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    }
  };

  // Delete diamond by id

  const handleStatus = async (customerID) => {
    try {
      const customer = await getCustomerById(customerID);
      const customerStatus = customer.status;
      const action = customerStatus ? "DEACTIVATE" : "ACTIVATE";
      const swalResult = await swal({
        title: `Are you sure to ${action} this customer account?`,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });

      if (swalResult) {
        await changeStatus(customerID);
        const response = await ShowAllCustomer();
        setCustomerList(response);
        swal(
          `${action} successfully!`,
          "Customer account status has been changed.",
          "success"
        );
      }
    } catch (error) {
      console.error("Error changing customer status:", error);
      swal(
        "Something went wrong!",
        "Failed to change Customer status. Please try again.",
        "error"
      );
    }
  };

  return (
    <div className="manager_manage_diamond_all_container">
      <div className="manager_manage_diamond_sidebar">
        <AdminSidebar currentPage="admin_manage_customer" />
      </div>
      <div className="manager_manage_diamond_content">
        <div className="manager_manage_diamond_header">
          <img className="manager_manage_diamond_logo" src={logo} alt="Logo" />
          <div className="manager_manage_diamond_search_section">
            <input
              type="text"
              className="manager_manage_diamond_search_bar"
              placeholder="Search by Email or Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={handleSearchKeyPress}
            />
          </div>
        </div>
        <hr className="manager_header_line"></hr>
        <h3>List Of Customer Accounts</h3>
        <div className="manager_manage_diamond_pagination">
            <button
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
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        <div className="manager_manage_diamond_table_wrapper">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">ID</StyledTableCell>
                  <StyledTableCell align="center">Email</StyledTableCell>
                  <StyledTableCell align="center">Full Name</StyledTableCell>
                  <StyledTableCell align="center">Phone number</StyledTableCell>
                  <StyledTableCell align="center">Address</StyledTableCell>
                  <StyledTableCell align="center">Points</StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customerList.length > 0 ? (
                  currentCustomer.map((item) => (
                    <TableRow className="manager_manage_table_body_row" key={item.customerId}>
                      <TableCell align="center">{item.customerId}</TableCell>
                      <TableCell align="center">{item.email}</TableCell>
                      <TableCell align="center">
                        {item.firstName} {item.lastName}
                      </TableCell>
                      <TableCell align="center">{item.phoneNumber}</TableCell>
                      <TableCell align="center">{item.address}</TableCell>
                      <TableCell align="center">{item.points}</TableCell>
                      <TableCell align="center">
                        <Button
                          onClick={() => handleStatus(item.customerId)}
                          style={{
                            backgroundColor: item.status
                              ? "#1fd655"
                              : "#c94143",
                            color: "white",
                          }}
                          variant="contained"
                        >
                          {item.status ? "Active" : "Deactive"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan="7">No Customer found</TableCell>
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

export default AdminCustomerList;
