import "@fortawesome/fontawesome-free/css/all.min.css";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import logo from "../../../assets/img/logoN.png";
import AutoResizeTextarea from "../../../components/AutoResizeTextBox/AutoResizeTextarea.js";
import ManagerSidebar from "../../../components/ManagerSidebar/ManagerSidebar.js";
import {
  ShowAllCollection,
  changeStatus,
  searchCollectionById,
  updateCollectionById,
} from "../../../services/ManagerService/ManagerCollectionService.js";
import "../../../styles/Manager/ManagerList.scss";
// Head cells for the collection table
const headCells = [
  {
    id: "collectionId",
    numeric: false,
    disablePadding: false,
    label: "ID",
    sortable: true,
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
    sortable: true,
  },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "Description",
    sortable: false,
  },
  {
    id: "update",
    numeric: false,
    disablePadding: false,
    label: "Update",
    sortable: false,
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Action",
    sortable: false,
  },
];

// Enhanced Table Head for sorting
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
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.sortable ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
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
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

// Comparator function for sorting
const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
};

// Sort table rows based on comparator
const tableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const ManagerCollectionList = () => {
  const navigate = useNavigate();
  const [collectionItems, setCollectionItems] = useState([]);
  const role = localStorage.getItem('role');
  const [searchQuery, setSearchQuery] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedCollection, setEditedCollection] = useState({});
  const [isSearch, setIsSearch] = useState(false);
  const [originalCollection, setOriginalCollection] = useState({});
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("collectionId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ShowAllCollection(role);
        setCollectionItems(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [page, setPage] = useState(1);
  const rowsPerPage = 6;

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearchKeyPress = async (e) => {
    const isInteger = (value) => /^-?\d+$/.test(value);

    if (e.key === "Enter") {
      if (isInteger(searchQuery.trim())) {
        setIsSearch(true);
        try {
          const response = await searchCollectionById(searchQuery.trim());
          setCollectionItems([response]);
          setPage(1);
        } catch (error) {
          console.error("Error fetching Collection:", error);
          swal("Collection not found!", "Please try another one.", "error");
        }
      } else {
        setIsSearch(false);
        try {
          const response = await ShowAllCollection(role);
          setCollectionItems(response);
          setPage(1);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    }
  };

  const handleStatus = async (collectionID) => {
    try {
      const collection = await searchCollectionById(collectionID);
      const collectionStatus = collection.status;
      const action = collectionStatus ? "DEACTIVATE" : "ACTIVATE";
      const swalResult = await swal({
        title: `Are you sure to ${action} this collection?`,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });

      if (swalResult) {
        await changeStatus(collectionID);
        const response = await ShowAllCollection(role);
        setCollectionItems(response);
        swal(
          `${action} successfully!`,
          "Collection status has been changed.",
          "success"
        );
      }
    } catch (error) {
      console.error("Error changing collection status:", error);
      swal(
        "Something went wrong!",
        "Failed to change collection status. Please try again.",
        "error"
      );
    }
  };

  const handleEdit = (collection) => {
    setEditMode(true);
    setEditedCollection(collection);
    setOriginalCollection(collection);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Field: ${name}, Value: ${value}`);
    setEditedCollection({ ...editedCollection, [name]: value });
  };

  const handleUpdate = async () => {
    const requiredFields = ["name", "description", "status"];
    const specialCharPattern = /[$&+?@#|'<>^*()%]/;

    for (let field of requiredFields) {
      if (!editedCollection[field]) {
        swal("Please fill in all fields!", `Field cannot be empty.`, "error");
        return;
      }
      if (specialCharPattern.test(editedCollection[field])) {
        swal(
          "Invalid characters detected!",
          `Field "${field}" contains special characters.`,
          "error"
        );
        return;
      }
    }

    const isEqual =
      JSON.stringify(originalCollection) === JSON.stringify(editedCollection);
    if (isEqual) {
      swal("No changes detected!", "You have not made any changes.", "error");
      return;
    }

    const CollectionToUpdate = { ...editedCollection, status: true };

    try {
      console.log("Sending update request with data:", CollectionToUpdate);
      await updateCollectionById(
        CollectionToUpdate.collectionId,
        CollectionToUpdate
      );
      const updatedItems = await ShowAllCollection(role);
      setCollectionItems(updatedItems);
      setEditMode(false);
      swal(
        "Updated successfully!",
        "The Collection information has been updated.",
        "success"
      );
    } catch (error) {
      console.error(
        "Error updating Collection:",
        error.response ? error.response.data : error.message
      );
      swal(
        "Something went wrong!",
        "Failed to update. Please try again.",
        "error"
      );
    }
  };

  const handleBack = async () => {
    try {
      const response = await ShowAllCollection(role);
      setCollectionItems(response);
      setPage(1);
      setIsSearch(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const indexOfLastOrder = page * rowsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - rowsPerPage;
  const currentOrders = collectionItems.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  return (
    <div className="manager_manage_diamond_all_container">
      <div className="manager_manage_diamond_sidebar">
        <ManagerSidebar currentPage="manager_manage_collection" />
      </div>
      <div className="manager_manage_diamond_content">
        <div className="manager_manage_diamond_header">
          <img className="manager_manage_diamond_logo" src={logo} alt="Logo" />
          <div className="manager_manage_diamond_search_section">
            <input
              type="text"
              className="manager_manage_diamond_search_bar"
              placeholder="Search by ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={handleSearchKeyPress}
            />
          </div>
        </div>
        <hr className="manager_header_line" />
        <h3>List Of Collections</h3>
        <div
          className="manager_manage_diamond_create_button_section"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <button
            className="manager_manage_diamond_create_button"
            onClick={() => navigate("/manager-add-collection")}
          >
            Add new collection
          </button>
          <Stack spacing={2} direction="row">
            <Pagination
              count={Math.ceil(collectionItems.length / rowsPerPage)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        </div>

        <div className="manager_manage_diamond_table_wrapper">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={(event, property) => {
                  const isAsc = orderBy === property && order === "asc";
                  setOrder(isAsc ? "desc" : "asc");
                  setOrderBy(property);
                }}
                rowCount={collectionItems.length}
              />
              <TableBody>
                {currentOrders.length > 0 ? (
                  tableSort(currentOrders, getComparator(order, orderBy)).map(
                    (item) => (
                      <TableRow
                        key={item.collectionId}
                        sx={{
                          "&:hover": {
                            backgroundColor: "#f5f5f5",
                          },
                          cursor: "pointer",
                        }}
                      >
                        <TableCell align="center">
                          {item.collectionId}
                        </TableCell>
                        <TableCell align="center">{item.name}</TableCell>
                        <TableCell align="center">{item.description}</TableCell>
                        <TableCell align="center">
                          <IconButton onClick={() => handleEdit(item)}>
                            <EditIcon
                              style={{ cursor: "pointer", color: "#575252" }}
                            />
                          </IconButton>
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            onClick={() => handleStatus(item.collectionId)}
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
                    )
                  )
                ) : (
                  <TableRow>
                    <TableCell colSpan="9">No Collection found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {isSearch && (
            <button className="btn btn-secondary mt-3" onClick={handleBack}>
              Back to show all collections
            </button>
          )}
        </div>
      </div>

      {editMode && (
        <div
          className={`manager_manage_diamond_modal_overlay ${
            editMode ? "active" : ""
          }`}
          onClick={() => setEditMode(false)}
        >
          <div
            className="manager_manage_diamond_update_modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="manager_manage_diamond_modal_content">
              <h4>Edit Collection Information</h4>
              <div className="manager_manage_diamond_form_group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  maxLength={100}
                  value={editedCollection.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="manager_manage_diamond_form_group">
                <label>Description</label>
                <AutoResizeTextarea
                  name="description"
                  value={editedCollection.description}
                  onChange={handleChange}
                  maxLength={255}
                  required
                />
              </div>
              <div className="manager_manage_diamond_modal_actions">
                <button onClick={() => setEditMode(false)}>Cancel</button>
                <button onClick={handleUpdate}>Confirm</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerCollectionList;
