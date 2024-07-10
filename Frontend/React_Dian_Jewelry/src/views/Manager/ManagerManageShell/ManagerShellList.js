import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ManagerSidebar from "../../../components/ManagerSidebar/ManagerSidebar.js";
import "../../../styles/Manager/ManagerList.scss";
import {
  ShowAllShell,
  getShellMaterialDetail,
  deleteShellMaterialById,
  updateShellMaterialById,
  getShellMaterialByName,
  createShellMaterial,
  updateShellById
  , ShowAllShellMaterial,
  deleteShellById
} from "../../../services/ManagerService/ManagerShellService.js";
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

const ManagerShellList = () => {
  const navigate = useNavigate();

  const [shellMaterial, setShellMaterial] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedShell, setEditedShell] = useState({});
  const [originalShell, setOriginalShell] = useState({});
  const [addMode, setAddMode] = useState(false);
  const [shell, setShell] = useState([]);
  const [editShellMode, setEditShellMode] = useState(false);
  const [editedShellNotMaterial, setEditedShellNotMaterial] = useState({
    productId: "",
    amountAvailable: ""
  });
  const [originalShellNotMaterial, setOriginalShellNotMaterial] = useState({});
  const [newShell, setNewShell] = useState({
    productId: '',
    amountAvailable: ''
  });

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
        const response = await ShowAllShellMaterial();
        setShellMaterial(response);
        const shells = await ShowAllShell();
        setShell(shells);
        console.log(shells);
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
  const currentShell = shellMaterial.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(shellMaterial.length / ordersPerPage);

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
        try {
          const response = await getShellMaterialDetail(searchQuery.trim());
          setShellMaterial([response]);
          setCurrentPage(1);
        } catch (error) {
          console.error("Error fetching shell:", error);
          swal("Shell not found!", "Please try another one.", "error");
        }
      } else if (searchQuery.trim()) {
        try {
          const response = await getShellMaterialByName(searchQuery.trim());
          if (Array.isArray(response)) {
            setShellMaterial(response);
          } else if (response) {
            setShellMaterial([response]);
          } else {
            setShellMaterial([]);
          }
          setCurrentPage(1);
        } catch (error) {
          console.error("Error fetching shell:", error);
          swal("Shell not found!", "Please try another one.", "error");
        }
      } else {
        try {
          const response = await ShowAllShell();
          setShellMaterial(response);
          setCurrentPage(1);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    }
  };

  // Delete diamond by id
  const handleDeleteShellMaterial = async (shellID) => {
    swal({
      title: "Are you sure to delete this shell material?",
      text: "This action cannot be undone",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await deleteShellMaterialById(shellID);
          const response = await ShowAllShellMaterial();
          setShellMaterial(response);
          swal(
            "Deleted successfully!",
            "The shell has been deleted.",
            "success"
          );
        } catch (error) {
          console.error("Error deleting shell:", error);
          swal(
            "Something went wrong!",
            "Failed to delete the shell. Please try again.",
            "error"
          );
        }
      }
    });
  };

  const handleDeleteShell = async (shellID) => {
    swal({
      title: "Are you sure to delete this shell?",
      text: "This action cannot be undone",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await deleteShellById(shellID);
          const response = await ShowAllShell();
          setShell(response);
          swal(
            "Deleted successfully!",
            "The shell has been deleted.",
            "success"
          );
        } catch (error) {
          console.error("Error deleting shell:", error);
          swal(
            "Something went wrong!",
            "Failed to delete the shell. Please try again.",
            "error"
          );
        }
      }
    });
  };

  // Update by id
  const handleEdit = (shell) => {
    setEditMode(true);
    setEditedShell(shell);
    setOriginalShell(shell);
  };



  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedShell({ ...editedShell, [name]: value });
    setNewShell({ ...newShell, [name]: value });
  };

  const handleUpdate = async () => {
    const status = true;
    const price = 0;
    const requiredFields = ["name", "price"];
    const specialCharPattern = /[$&+?@#|'<>^*()%]/;
    for (let field of requiredFields) {
      if (!editedShell[field]) {
        swal("Please fill in all fields!", `Field cannot be empty.`, "error");
        return;
      }
      if (specialCharPattern.test(editedShell[field])) {
        swal("Invalid characters detected!", `Field "${field}" contains special characters.`, "error");
        return;
      }
    }

    const isEqual =
      JSON.stringify(originalShell) === JSON.stringify(editedShell);
    if (isEqual) {
      swal("No changes detected!", "You have not made any changes.", "error");
      return;
    }

    const shellToUpdate = { ...editedShell, status: true };

    try {
      console.log("Sending update request with data:", shellToUpdate);
      const response = await updateShellMaterialById(
        shellToUpdate.shellMaterialId,
        shellToUpdate
      );
      console.log("Update response:", response.data);
      const updatedItems = await ShowAllShellMaterial();
      setShellMaterial(updatedItems);
      setEditMode(false);
      swal(
        "Updated successfully!",
        "The shellmaterial information has been updated.",
        "success"
      );
    } catch (error) {
      console.error(
        "Error updating shell material:",
        error.response ? error.response.data : error.message
      );
      swal(
        "Something went wrong!",
        "Failed to update. Please try again.",
        "error"
      );
    }
  };


  const handleEditShell = (shell) => {
    setEditShellMode(true);
    setEditedShellNotMaterial(shell);
    setOriginalShellNotMaterial(shell);
  };
  const handleShellChange = (e) => {
    const { name, value } = e.target;
    setEditedShellNotMaterial({ ...editedShellNotMaterial, [name]: value });
  };

  const handleUpdateShell = async () => {
    const requiredFields = ["productId", "amountAvailable"];
    const specialCharPattern = /[$&+?@#|'<>^*()%]/;
    for (let field of requiredFields) {
      if (!editedShellNotMaterial[field]) {
        swal("Please fill in all fields!", `Field "${field}" cannot be empty.`, "error");
        return;
      }
      if (specialCharPattern.test(editedShellNotMaterial[field])) {
        swal("Invalid characters detected!", `Field "${field}" contains special characters.`, "error");
        return;
      }
    }

    const isEqual =
      JSON.stringify(originalShellNotMaterial) === JSON.stringify(editedShellNotMaterial);
    if (isEqual) {
      swal("No changes detected!", "You have not made any changes.", "error");
      return;
    }

    try {
      const response = await updateShellById(editedShellNotMaterial.shellId, editedShellNotMaterial);
      console.log("Update response:", response.data);
      const updatedShells = await ShowAllShell();
      setShell(updatedShells);
      setEditShellMode(false);
      swal(
        "Updated successfully!",
        "The shell information has been updated.",
        "success"
      );
    } catch (error) {
      console.error(
        "Error updating shell:",
        error.response ? error.response.data : error.message
      );
      swal(
        "Something went wrong!",
        "Failed to update. Please try again.",
        "error"
      );
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = ["name", "price"];
    const specialCharPattern = /[$&+?@#|'<>^*()%]/;
    for (let field of requiredFields) {
      if (!newShell[field]) {
        swal("Please fill in all fields!", `Field "${field}" cannot be empty.`, "error");
        return;
      }
      if (specialCharPattern.test(newShell[field])) {
        swal("Invalid characters detected!", `Field "${field}" contains special characters.`, "error");
        return;
      }
    }

    const shellDataWithStatus = { ...newShell, status: true };

    try {
      await createShellMaterial(shellDataWithStatus);
      swal("Success", "Shell added successfully", "success");
      setAddMode(false);
      const response = await ShowAllShellMaterial();
      setShellMaterial(response);
    } catch (error) {
      console.error("Error creating shell:", error);
      swal("Something went wrong!", "Failed to add shell. Please try again.", "error");
    }
  };

  const backList = async () => {
    try {
      const response = await ShowAllShell();
      setShellMaterial(response);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="manager_manage_diamond_all_container">
      <div className="manager_manage_diamond_sidebar">
        <ManagerSidebar currentPage="manager_manage_shell" />
      </div>
      <div className="manager_manage_diamond_content">
        <div className="manager_manage_diamond_header">
          <img className="manager_manage_diamond_logo" src={logo} alt="Logo" />
          <div className="manager_manage_diamond_search_section">
            <input
              type="text"
              className="manager_manage_diamond_search_bar"
              placeholder="Search by ID or Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={handleSearchKeyPress}
            />
            <button
              className="manager_manage_diamond_create_button"
              onClick={() => backList()}
            >Show all shells</button>
          </div>
        </div>
        <hr className="manager_header_line"></hr>

        <h3>List Of Shells</h3>

        <div className="manager_manage_diamond_create_button_section">
          <button
            className="manager_manage_diamond_create_button"
            onClick={() => setAddMode(true)}
          >
            Add new shell material
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

        {/* Table shell list */}
        <div className="manager_manage_diamond_table_wrapper">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Shell Material ID</StyledTableCell>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Price</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shellMaterial.length > 0 ? (
                  shellMaterial.map((item) => (
                    <TableRow className="manager_manage_table_body_row" key={item.shellMaterialId}>
                      <StyledTableCell align="center">{item.shellMaterialId}</StyledTableCell>
                      <StyledTableCell align="center">{item.name}</StyledTableCell>
                      <StyledTableCell align="center">{item.price}</StyledTableCell>
                      <StyledTableCell align="center">
                        <IconButton onClick={() => handleEdit(item)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteShellMaterial(item.shellMaterialId)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </StyledTableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <StyledTableCell colSpan="4" align="center">No shell found</StyledTableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div className="manager_manage_diamond_create_button_section" style={{ marginTop: "2%" }}>
          <button
            className="manager_manage_diamond_create_button"
            onClick={() => navigate("/manager-add-shell")}
          >
            Add new shell
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
                  <StyledTableCell align="center">Shell Id</StyledTableCell>
                  <StyledTableCell align="center">Product ID</StyledTableCell>
                  <StyledTableCell align="center">Amount Available</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                  {/* nói chung hiện hết mấy cái mà vừa add */}
                </TableRow>
              </TableHead>
              <TableBody>
                {shell.length > 0 ? (
                  shell.map((item) => (
                    <TableRow className="manager_manage_table_body_row" key={item.shellId}>
                      <StyledTableCell align="center">{item.shellId}</StyledTableCell>
                      <StyledTableCell align="center">{item.productId}</StyledTableCell>
                      <StyledTableCell align="center">{item.amountAvailable}</StyledTableCell>
                      <StyledTableCell align="center">
                        <IconButton onClick={() => handleEditShell(item)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteShell(item.shellId)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </StyledTableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <StyledTableCell colSpan="4" align="center">No shell found</StyledTableCell>
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
              <h4>Edit Shell Material Information</h4>
              <div className="manager_manage_diamond_form_group">
                <label>Shell Name</label>
                <input
                  type="text"
                  name="name"
                  value={editedShell.name}
                  onChange={handleChange}
                  maxLength={100}
                  required
                />
              </div>
              <div className="manager_manage_diamond_form_group">
                <label>Price</label>
                <input
                  type="text"
                  name="price"
                  value={editedShell.price}
                  onChange={handleChange}
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
      {editShellMode && (
        <div
          className="manager_manage_diamond_modal_overlay"
          onClick={() => setEditShellMode(false)}
        >
          <div
            className="manager_manage_diamond_update_modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="manager_manage_diamond_modal_content">
              <h4>Edit Shell Information</h4>
              <div className="manager_manage_diamond_form_group">
                <label>Product ID</label>
                <input
                  type="text"
                  name="productId"
                  value={editedShellNotMaterial.productId}
                  onChange={handleShellChange}
                  maxLength={100}
                  required
                />
              </div>
              <div className="manager_manage_diamond_form_group">
                <label>Amount Available</label>
                <input
                  type="text"
                  name="amountAvailable"
                  value={editedShellNotMaterial.amountAvailable}
                  onChange={handleShellChange}
                  required
                />
              </div>
              <div className="manager_manage_diamond_modal_actions">
                <button onClick={() => setEditShellMode(false)}>Cancel</button>
                <button onClick={handleUpdateShell}>Confirm</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add new shell modal */}
      {addMode && (
        <div
          className="manager_manage_diamond_modal_overlay"
          onClick={() => setAddMode(false)}
        >
          <div
            className="manager_manage_diamond_update_modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="manager_manage_diamond_modal_content">
              <h4>Add Shell Material</h4>
              <div className="manager_manage_diamond_form_group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  maxLength={100}
                  placeholder="Enter shell's name"
                  value={newShell.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="manager_manage_diamond_form_group">
                <label>Price</label>
                <input
                  type="text"
                  name="price"
                  placeholder="Enter amount available"
                  maxLength={10}
                  value={newShell.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="manager_manage_diamond_modal_actions">
                <button onClick={() => setAddMode(false)}>Cancel</button>
                <button onClick={handleSubmit}>Confirm</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerShellList;
