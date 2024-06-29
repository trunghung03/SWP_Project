import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar.js";
import "../../styles/Manager/ManagerList.scss";
import logo from "../../assets/img/logoN.png";
import swal from "sweetalert";
import {
  ShowAllEmployee,
  updateStatusById,
  getEmployeeDetail,
  getEmployeeByRole,
  getEmployeeByEmail,
} from "../../services/AdminService/AdminEmployeeService.js";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const AdminEmployeeList = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [isSearch, setIsSearch] = useState(false);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#f9c6bb',
      color: '1c1c1c',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ShowAllEmployee();
        setEmployeeList(response);
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
  const currentEmployee = employeeList.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalPages = Math.ceil(employeeList.length / ordersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Search diamond by id
  const handleSearchKeyPress = async (e) => {
    if (e.key === "Enter") {
      setIsSearch(true);
      if (searchQuery.trim().includes("@")) {
        try {
          const response = await getEmployeeByEmail(searchQuery.trim());
          setEmployeeList([response]);
          setCurrentPage(1);
        } catch (error) {
          console.error("Error fetching employee:", error);
          swal("Employee not found!", "Please try another one.", "error");
        }
      } else if (searchQuery.trim()) {
        try {
          const response = await getEmployeeByRole(searchQuery.trim());
          if (Array.isArray(response)) {
            setEmployeeList(response);
          } else if (response) {
            setEmployeeList([response]);
          } else {
            setEmployeeList([]);
          }

          setCurrentPage(1);
        } catch (error) {
          console.error("Error fetching employee:", error);
          swal("Employee not found!", "Please try another one.", "error");
        }
      } else {
        try {
          const response = await ShowAllEmployee();
          setEmployeeList(response);
          setCurrentPage(1);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    }
  };
  const handleBack = async () => {
    try {
      const response = await ShowAllEmployee();
      setEmployeeList(response);
      setCurrentPage(1);
      setIsSearch(false); // Reset search state when back button is clicked
      setSearchQuery(""); // Clear search query
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Delete diamond by id

  const handleStatus = async (employeeID) => {
    try {
      const employee = await getEmployeeDetail(employeeID);
      const employeeStatus = employee.status;
      const action = employeeStatus ? "DEACTIVATE" : "ACTIVATE";
      const swalResult = await swal({
        title: `Are you sure to ${action} this Employee account?`,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });

      if (swalResult) {
        await updateStatusById(employeeID);
        const response = await ShowAllEmployee();
        setEmployeeList(response);
        swal(
          `${action} successfully!`,
          "Employee account status has been changed.",
          "success"
        );
      }
    } catch (error) {
      console.error("Error changing Employee status:", error);
      swal(
        "Something went wrong!",
        "Failed to change Employee status. Please try again.",
        "error"
      );
    }
  };
  return (
    <div className="manager_manage_diamond_all_container">
      <div className="manager_manage_diamond_sidebar">
        <AdminSidebar currentPage="admin_manage_employee" />
      </div>
      <div className="manager_manage_diamond_content">
        <div className="manager_manage_diamond_header">
          <img className="manager_manage_diamond_logo" src={logo} alt="Logo" />
          <div className="manager_manage_diamond_search_section">
            <input
              type="text"
              className="manager_manage_diamond_search_bar"
              placeholder="Search by Email or Role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={handleSearchKeyPress}
            />
          </div>
        </div>
        <hr className="manager_header_line"></hr>
        <h3>List Of Employee Accounts</h3>
        <div className="manager_manage_diamond_create_button_section">
          <button
            className="manager_manage_diamond_create_button"
            onClick={() => navigate("/admin-add-employee")}
          >
            Create new employee
          </button>
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
        </div>
        <div className="manager_manage_diamond_table_wrapper">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">ID</StyledTableCell>
                  <StyledTableCell align="center">Role</StyledTableCell>
                  <StyledTableCell align="center">Email</StyledTableCell>
                  <StyledTableCell align="center">Full Name</StyledTableCell>
                  <StyledTableCell align="center">Phone number</StyledTableCell>
                  <StyledTableCell align="center">Address</StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employeeList.length > 0 ? (
                  currentEmployee.map((item) => {
                    if (item.role !== 'Admin') {
                      return <TableRow
                        className="manager_manage_table_body_row"
                        key={item.employeeId}
                      >
                        <TableCell align="center">{item.employeeId}</TableCell>
                        <TableCell align="center">{item.role}</TableCell>
                        <TableCell align="center">{item.email}</TableCell>
                        <TableCell align="center">{`${item.firstName} ${item.lastName}`}</TableCell>
                        <TableCell align="center">{item.phoneNumber}</TableCell>
                        <TableCell align="center">{item.address}</TableCell>
                        <TableCell align="center">
                          <Button
                            onClick={() => handleStatus(item.employeeId)}
                            variant="contained"
                            style={{
                              backgroundColor: item.status
                                ? "#1fd655"
                                : "#c94143",
                              color: "white",
                            }}
                          >
                            {item.status ? "Active" : "Deactive"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    }
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan="7">No Employee found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {isSearch && ( // Conditionally render the back button
            <button className="SS_back_button" onClick={handleBack}>
              Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminEmployeeList;
