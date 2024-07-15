import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../../styles/SalesStaff/SalesStaffManageWarranty/SSWarrantyList.scss";
import "../../../styles/Manager/ManagerList.scss";
import SalesStaffSidebar from "../../../components/SalesStaffSidebar/SalesStaffSidebar.js";
import {
  fetchAllWarranty,
  updateWarranty,
  deleteWarranty,
  fetchWarrantyDetail,
} from "../../../services/SalesStaffService/SSWarrantyService.js";
import logo from "../../../assets/img/logoN.png";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from '@mui/material/TablePagination';
import TableRow from "@mui/material/TableRow";
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from "@mui/material/Paper";
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { visuallyHidden } from '@mui/utils';
import { EnhancedTableToolbar, getComparator, tableSort } from "../../../components/CustomTable/SortTable.js";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

const headCells = [
  { id: 'orderDetailId', numeric: false, disablePadding: false, label: 'Order Detail ID', sortable: true },
  { id: 'startDate', numeric: false, disablePadding: false, label: 'Start Date', sortable: true },
  { id: 'endDate', numeric: false, disablePadding: false, label: 'End Date', sortable: true },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status', sortable: true },
  { id: 'action', numeric: false, disablePadding: false, label: 'Action', sortable: false },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all warranties',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
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
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const SSWarrantyList = () => {
  const navigate = useNavigate();
  const [warrantyList, setWarrantyList] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('orderDetailId');
  const [selected, setSelected] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedWarranty, setEditedWarranty] = useState({});
  const [originalWarranty, setOriginalWarranty] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#f9c6bb",
      color: "1c1c1c",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const fetchWarranties = async () => {
    try {
      const response = await fetchAllWarranty();
      setWarrantyList(response);
      setTotalPages(Math.ceil(response.length / ordersPerPage));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchWarranties();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchKeyPress = async (e) => {
    if (e.key === "Enter") {
      if (searchQuery.trim()) {
        try {
          const response = await fetchWarrantyDetail(searchQuery.trim());
          setWarrantyList([response]);
          setCurrentPage(1);
          setIsSearch(true);
        } catch (error) {
          console.error("Error fetching warranty:", error);
          swal("Warranty not found!", "Please try another one.", "error");
        }
      } else {
        fetchWarranties();
        setCurrentPage(1);
        setIsSearch(false);
      }
    }
  };

  const handleBack = async () => {
    fetchWarranties();
    setCurrentPage(1);
    setIsSearch(false);
    setSearchQuery("");
  };

  const handleDelete = async (orderDetailId) => {
    swal({
      title: "Are you sure to delete this warranty?",
      text: "This action cannot be undone",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const status = false;
          await deleteWarranty(orderDetailId, status);
          fetchWarranties();
          swal("Deleted successfully!", "The warranty has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting warranty:", error);
          swal("Something went wrong!", "Failed to delete the warranty. Please try again.", "error");
        }
      }
    });
  };

  const handleEdit = (warranty) => {
    setEditMode(true);
    setEditedWarranty(warranty);
    setOriginalWarranty(warranty);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedWarranty({ ...editedWarranty, [name]: value });
  };

  const handleUpdate = async () => {
    const requiredFields = ["status"];
    for (let field of requiredFields) {
      if (!editedWarranty[field]) {
        swal("Please fill in all fields!", `Field cannot be empty.`, "error");
        return;
      }
    }

    const isEqual = JSON.stringify(originalWarranty) === JSON.stringify(editedWarranty);
    if (isEqual) {
      swal("No changes detected!", "You have not made any changes.", "error");
      return;
    }

    const warrantyToUpdate = { ...editedWarranty };

    try {
      console.log("Sending update request with data:", warrantyToUpdate);
      const response = await updateWarranty(warrantyToUpdate.orderDetailId, warrantyToUpdate);
      console.log("Update response:", response.data);
      fetchWarranties();
      setEditMode(false);
      swal("Updated successfully!", "The warranty information has been updated.", "success");
    } catch (error) {
      console.error("Error updating warranty status:", error.response ? error.response.data : error.message);
      swal("Something went wrong!", "Failed to update. Please try again.", "error");
    }
  };

  const handleBulkUpdate = async () => {
    if (selected.length === 0) {
      swal("No items selected!", "Please select at least one item to update.", "warning");
      return;
    }

    setEditMode(true);
    setEditedWarranty({});
    setOriginalWarranty({});
  };

  const handleBulkUpdateConfirm = async () => {
    try {
      for (let orderDetailId of selected) {
        const warrantyToUpdate = warrantyList.find(warranty => warranty.orderDetailId === orderDetailId);
        await updateWarranty(orderDetailId, { ...warrantyToUpdate, status: editedWarranty.status });
      }
      fetchWarranties();
      setEditMode(false);
      swal("Updated successfully!", "The selected warranties have been updated.", "success");
    } catch (error) {
      console.error("Error updating warranties:", error);
      swal("Something went wrong!", "Failed to update the selected warranties. Please try again.", "error");
    }
  };

  const isExpired = (endDate) => {
    const today = new Date().toLocaleDateString("en-CA");
    const formattedEndDate = new Date(endDate).toLocaleDateString("en-CA");
    return new Date(today) > new Date(formattedEndDate);
  };

  return (
    <div className="ss_manage_content_all_container">
      <div className="ss_manage_content_sidebar">
        <SalesStaffSidebar currentPage="salesstaff_manage_warranty" />
      </div>
      <div className="ss_manage_content_content">
        <div className="ss_manage_content_header">
          <img className="ss_manage_content_logo" src={logo} alt="Logo" />
          <div className="ss_manage_content_search_section">
            <input
              type="text"
              className="manager_manage_diamond_search_bar"
              placeholder="Search by ID..."
              value={searchQuery}
              style={{ width: "140px", borderRadius: "5px" }}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={handleSearchKeyPress}
            />
          </div>
        </div>
        <hr className="ss_manage_content_line"></hr>
        <h3 style={{ textAlign: "center" }}>Warranty List</h3>
        <div className="manager_manage_diamond_create_button_section" style={{ display: "flex", justifyContent: "flex-end" }}>
          <div className="manager_manage_diamond_pagination">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
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
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              &gt;
            </button>
          </div>
        </div>
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer>
              <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={(event) => {
                    if (event.target.checked) {
                      const newSelecteds = warrantyList.map((n) => n.orderDetailId);
                      setSelected(newSelecteds);
                      return;
                    }
                    setSelected([]);
                  }}
                  onRequestSort={(event, property) => {
                    const isAsc = orderBy === property && order === 'asc';
                    setOrder(isAsc ? 'desc' : 'asc');
                    setOrderBy(property);
                  }}
                  rowCount={warrantyList.length}
                />
                <TableBody>
                  {tableSort(warrantyList, getComparator(order, orderBy))
                    .slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage)
                    .map((item, index) => {
                      const isItemSelected = selected.indexOf(item.orderDetailId) !== -1;
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={(event) => {
                            const selectedIndex = selected.indexOf(item.orderDetailId);
                            let newSelected = [];

                            if (selectedIndex === -1) {
                              newSelected = newSelected.concat(selected, item.orderDetailId);
                            } else if (selectedIndex === 0) {
                              newSelected = newSelected.concat(selected.slice(1));
                            } else if (selectedIndex === selected.length - 1) {
                              newSelected = newSelected.concat(selected.slice(0, -1));
                            } else if (selectedIndex > 0) {
                              newSelected = newSelected.concat(
                                selected.slice(0, selectedIndex),
                                selected.slice(selectedIndex + 1),
                              );
                            }

                            setSelected(newSelected);
                          }}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={item.orderDetailId}
                          selected={isItemSelected}
                          sx={{ cursor: 'pointer' }}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                'aria-labelledby': labelId,
                              }}
                            />
                          </TableCell>
                          <TableCell component="th" id={labelId} scope="row" padding="none" align="center">
                            {item.orderDetailId}
                          </TableCell>
                          <TableCell align="center">{new Date(item.startDate).toLocaleDateString("en-CA")}</TableCell>
                          <TableCell align="center">{new Date(item.endDate).toLocaleDateString("en-CA")}</TableCell>
                          <TableCell align="center" style={{ color: isExpired(item.endDate) ? "red" : "inherit" }}>
                            {isExpired(item.endDate) ? "Expired" : item.status !== undefined ? item.status.toString() : "N/A"}
                          </TableCell>
                          <TableCell align="center">
                            <IconButton onClick={() => handleEdit(item)}>
                              <EditIcon style={{ cursor: "pointer", color: "#575252" }}/>
                            </IconButton>
                            <IconButton onClick={() => handleDelete(item.orderDetailId)}>
                              <DeleteIcon style={{ cursor: "pointer", color: "#575252" }}/>
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {warrantyList.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} align="center">No warranty found</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={warrantyList.length}
              rowsPerPage={ordersPerPage}
              page={currentPage - 1}
              onPageChange={(event, newPage) => handlePageChange(newPage + 1)}
              onRowsPerPageChange={(event) => {
                setOrdersPerPage(parseInt(event.target.value, 10));
                setCurrentPage(1);
                fetchWarranties();
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px' }}>
              <button onClick={handleBulkUpdate} className="bulk-update-button">Update Selected</button>
            </div>
          </Paper>
        </Box>
        {isSearch && (
          <button className="SS_back_button" onClick={handleBack}>
            Back
          </button>
        )}
      </div>
      {editMode && (
        <div
        className={`manager_manage_diamond_modal_overlay ${editMode ? 'active' : ''}`}
        onClick={() => setEditMode(false)}
      >
          <div className="manager_manage_diamond_update_modal" onClick={(e) => e.stopPropagation()}>
            <div className="manager_manage_diamond_modal_content">
              <div className="manager_manage_diamond_form_group">
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="status-select-label">Status</InputLabel>
                  <Select
                    name="status"
                    labelId="status-select-label"
                    id="status-select"
                    value={editedWarranty.status || ''}
                    onChange={handleChange}
                    label="status"
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Invalid">Invalid</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="manager_manage_diamond_modal_actions">
                <button onClick={() => setEditMode(false)}>Cancel</button>
                <button onClick={handleBulkUpdateConfirm}>Confirm</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SSWarrantyList;
