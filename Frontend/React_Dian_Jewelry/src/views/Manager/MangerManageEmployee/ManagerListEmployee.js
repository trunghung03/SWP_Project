import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ManagerSidebar from "../../../components/ManagerSidebar/ManagerSidebar.js";
import "../../../styles/Manager/ManagerList.scss";
import {
  ShowAllEmployee,
  getEmployeeDetail,
  deleteEpmloyeeById,
  updateEmployeeById,
  getEmployeeByRole,
} from "../../../services/ManagerService/ManagerEmployeeService.js";
import logo from "../../../assets/img/logoN.png";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const ManagerEmployeeList = () => {
  const navigate = useNavigate();

  const [employeeList, setEmployeeList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState({});
  const [isSearch, setIsSearch] = useState(false);
  const [originalEmployee, setOriginalEmployee] = useState({});
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#f9c6bb',
      color: '1c1c1c',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

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
    const isInteger = (value) => {
      return /^-?\d+$/.test(value);
    };
    if (e.key === "Enter") {
      if (isInteger(searchQuery.trim())) {
        setIsSearch(true);
        try {
          const response = await getEmployeeDetail(searchQuery.trim());
          setEmployeeList([response]);
          setCurrentPage(1);
        } catch (error) {
          console.error("Error fetching diamond:", error);
          swal("Employee not found!", "Please try another one.", "error");
        }
      } else if (searchQuery.trim()) {
        setIsSearch(true);
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
          console.error("Error fetching diamond:", error);
          swal("Employee not found!", "Please try another one.", "error");
        }
      } else {
        try {
          setIsSearch(false);
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
      setIsSearch(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div className="manager_manage_diamond_all_container">
      <div className="manager_manage_diamond_sidebar">
        <ManagerSidebar currentPage="manager_employee" />
      </div>
      <div className="manager_manage_diamond_content">
        <div className="manager_manage_diamond_header">
          <img className="manager_manage_diamond_logo" src={logo} alt="Logo" />
          <div className="manager_manage_diamond_search_section">
            <input
              type="text"
              className="manager_manage_diamond_search_bar"
              placeholder="Search by ID or Role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={handleSearchKeyPress}
            />
          </div>
        </div>
        <hr className="manager_header_line"></hr>
        <h3 className="manager_title_employees" style={{ alignItems: "flex-end" }}>
          Employees
        </h3>
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
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell align="justify">Role</StyledTableCell>
                  <StyledTableCell align="justify">Email</StyledTableCell>
                  <StyledTableCell align="justify">Full Name</StyledTableCell>
                  <StyledTableCell align="justify">Address</StyledTableCell>
                  <StyledTableCell align="justify">
                    Phone number
                  </StyledTableCell>
                  {/* <StyledTableCell align="justify">Action</StyledTableCell> */}
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
                        <TableCell>{item.employeeId}</TableCell>
                        <TableCell>{item.role}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>
                          {item.firstName} {item.lastName}
                        </TableCell>
                        <TableCell>{item.address}</TableCell>
                        <TableCell>{item.phoneNumber}</TableCell>
                        {/* <TableCell>
                        <i
                          className="fas fa-pen"
                          onClick={() => handleEdit(item)}
                          style={{ cursor: "pointer", marginRight: "10px" }}
                        ></i>
                        <i
                          className="fas fa-trash"
                          onClick={() => handleDelete(item.employeeId)}
                          style={{ cursor: "pointer" }}
                        ></i>
                      </TableCell> */}
                      </TableRow>
                    }
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan="10">No employee found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {isSearch && (
            <button className="btn btn-secondary mt-3" onClick={handleBack}>
              Back to show all employees
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagerEmployeeList;
