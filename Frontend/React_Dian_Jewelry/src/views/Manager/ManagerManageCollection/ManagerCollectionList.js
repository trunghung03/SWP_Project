import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ManagerSidebar from "../../../components/ManagerSidebar/ManagerSidebar.js";
import "../../../styles/Manager/ManagerList.scss";
import { ShowAllCollection, searchCollectionById, deleteCollectionById,changeStatus ,updateCollectionById } from "../../../services/ManagerService/ManagerCollectionService.js";
import logo from "../../../assets/img/logoN.png";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";


const ManagerCollectionList = () => {
  const navigate = useNavigate();

  const [collectionItems, setCollectionItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedCollection, setEditedCollection] = useState({});
  const [originalCollection, setOriginalCollection] = useState({});
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
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
        const response = await ShowAllCollection();
        setCollectionItems(response);
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
  const currentOrders = collectionItems.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(collectionItems.length / ordersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Search Collection by id
  const handleSearchKeyPress = async (e) => {
    const isInteger = (value) => {
      return /^-?\d+$/.test(value);
    };
    if (e.key === "Enter") {
      if (isInteger(searchQuery.trim())) {
        try {
          const response = await searchCollectionById(searchQuery.trim());
          setCollectionItems([response]);
          setCurrentPage(1);
        } catch (error) {
          console.error("Error fetching Collection:", error);
          swal("Collection not found!", "Please try another one.", "error");
        }
      } else {
        try {
          const response = await ShowAllCollection();
          setCollectionItems(response);
          setCurrentPage(1);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

    }
  };

  const handleStatus = async (collectionID) => {
    try {
      
      const collection = await searchCollectionById(collectionID);
      console.log(collection);
      const collectionStatus = collection.status;
      const action = collectionStatus ? "DEACTIVATE" : "ACTIVATE";
      const swalResult = await swal({
        title:  `Are you sure to ${action} this customer account?`,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });

      if (swalResult) {
        await changeStatus(collectionID);
        const response = await ShowAllCollection();
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

  // Update by id
  const handleEdit = (collection) => {
    setEditMode(true);
    setEditedCollection(collection);
    setOriginalCollection(collection);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCollection({ ...editedCollection, [name]: value });
  };

  const handleUpdate = async () => {
    const requiredFields = ['name', 'description', 'status'];
    for (let field of requiredFields) {
        if (!editedCollection[field]) {
            swal("Please fill in all fields!", `Field cannot be empty.`, "error");
            return;
        }
    }

    const isEqual = JSON.stringify(originalCollection) === JSON.stringify(editedCollection);
    if (isEqual) {
        swal("No changes detected!", "You have not made any changes.", "error");
        return;
    }

    const CollectionToUpdate = { ...editedCollection, status: true };

    try {
        console.log("Sending update request with data:", CollectionToUpdate);
        await updateCollectionById(CollectionToUpdate.collectionId, CollectionToUpdate);
        const updatedItems = await ShowAllCollection();
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
              placeholder="Search by ID or Shape..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={handleSearchKeyPress}
            />
          </div>
        </div>
        <hr className="manager_header_line"></hr>
        <h3>List Of Collections</h3>
        <div className="manager_manage_diamond_create_button_section">
          <button
            className="manager_manage_diamond_create_button"
            onClick={() => navigate("/manager-add-collection")}
          >
            Add new collection
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

        {/* Table Collection list */}
        <div className="manager_manage_diamond_table_wrapper">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">ID</StyledTableCell>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Description</StyledTableCell>
                  <StyledTableCell align="center">Update</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentOrders.length > 0 ? (
                  currentOrders.map((item) => (
                    <TableRow
                      className="manager_manage_table_body_row"
                      key={item.collectionId}
                    >
                      <TableCell align="center">{item.collectionId}</TableCell>
                      <TableCell align="center">{item.name}</TableCell>
                      <TableCell align="center">{item.description}</TableCell>
                      <TableCell align="center">
                        <IconButton onClick={() => handleEdit(item)}>
                          <EditIcon />
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
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan="9">No Collection found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

      {/* Update modal */}
      {editMode && (
        <div
          className="manager_manage_diamond_modal_overlay"
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
                  value={editedCollection.name}
                  onChange={handleChange}
                />
              </div>
              <div className="manager_manage_diamond_form_group">
                <label>Description</label>
                <input
                  type="text"
                  name="amountAvailable"
                  value={editedCollection.description}
                  onChange={handleChange}
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
