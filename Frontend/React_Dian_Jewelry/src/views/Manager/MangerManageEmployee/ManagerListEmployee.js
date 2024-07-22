import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ManagerSidebar from "../../../components/ManagerSidebar/ManagerSidebar.js";
import "../../../styles/Manager/ManagerList.scss";
import {
  ShowAllEmployee,
  getEmployeeDetail,
  getEmployeeByRole,
} from "../../../services/ManagerService/ManagerEmployeeService.js";
import logo from "../../../assets/img/logoN.png";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { visuallyHidden } from "@mui/utils";
import PropTypes from "prop-types";
import { getComparator, tableSort } from "../../../components/CustomTable/SortTable.js";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const headCells = [
  { id: 'employeeId', numeric: false, disablePadding: false, label: 'Employee ID', sortable: true },
  { id: 'role', numeric: false, disablePadding: false, label: 'Role', sortable: true },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email', sortable: true },
  { id: 'fullName', numeric: false, disablePadding: false, label: 'Full Name', sortable: true },
  { id: 'address', numeric: false, disablePadding: false, label: 'Address', sortable: true },
  { id: 'phoneNumber', numeric: false, disablePadding: false, label: 'Phone Number', sortable: true },
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
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.sortable ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
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
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const ManagerEmployeeList = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('employeeId');
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage, setEmployeesPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const fetchEmployees = async () => {
    try {
      const response = await ShowAllEmployee();
      setEmployeeList(response);
      setTotalPages(Math.ceil(response.length / employeesPerPage));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearchKeyPress = async (e) => {
    const isInteger = (value) => /^-?\d+$/.test(value);

    if (e.key === "Enter") {
      if (isInteger(searchQuery.trim())) {
        setIsSearch(true);
        try {
          const response = await getEmployeeDetail(searchQuery.trim());
          setEmployeeList([response]);
          setCurrentPage(1);
          setTotalPages(1);
        } catch (error) {
          console.error("Error fetching employee:", error);
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
          setTotalPages(Math.ceil(response.length / employeesPerPage));
        } catch (error) {
          console.error("Error fetching employee:", error);
          swal("Employee not found!", "Please try another one.", "error");
        }
      } else {
        setIsSearch(false);
        fetchEmployees();
        setCurrentPage(1);
      }
    }
  };

  const handleBack = async () => {
    fetchEmployees();
    setIsSearch(false);
    setSearchQuery("");
  };

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
        <h3 style={{ textAlign: "center", marginBottom: "3%" }}>Employee List</h3>
        <Box sx={{ width: "100%", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <TableContainer>
              <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={(event, property) => {
                    const isAsc = orderBy === property && order === "asc";
                    setOrder(isAsc ? "desc" : "asc");
                    setOrderBy(property);
                  }}
                  rowCount={employeeList.length}
                />
                <TableBody>
                  {tableSort(employeeList, getComparator(order, orderBy))
                    .slice((currentPage - 1) * employeesPerPage, currentPage * employeesPerPage)
                    .map((item, index) => (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={item.employeeId}
                        sx={{ cursor: "pointer" }}
                      >
                        <TableCell component="th" id={`employee-${item.employeeId}`} scope="row" align="center">
                          {item.employeeId}
                        </TableCell>
                        <TableCell align="center">{item.role}</TableCell>
                        <TableCell align="center">{item.email}</TableCell>
                        <TableCell align="center">{item.firstName} {item.lastName}</TableCell>
                        <TableCell align="center">{item.address}</TableCell>
                        <TableCell align="center">{item.phoneNumber}</TableCell>
                      </TableRow>
                    ))}
                  {employeeList.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} align="center">No employee found</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
        <Stack spacing={2} sx={{ alignItems: 'center', mt: 2 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack>
        {isSearch && (
          <button className="btn btn-secondary mt-3" onClick={handleBack}>
            Back
          </button>
        )}
      </div>
    </div>
  );
};

export default ManagerEmployeeList;
