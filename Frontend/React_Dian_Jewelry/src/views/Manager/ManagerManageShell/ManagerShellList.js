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
  updateShellById,
  ShowAllShellMaterial,
  deleteShellById,
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
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import { set, useForm } from "react-hook-form";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { toast } from "sonner";

const ManagerShellList = () => {
  const navigate = useNavigate();

  const [shellMaterial, setShellMaterial] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [editedShell, setEditedShell] = useState({});
  const [originalShell, setOriginalShell] = useState({});
  const [addMode, setAddMode] = useState(false);
  const [shell, setShell] = useState([]);
  const [editShellMode, setEditShellMode] = useState(false);
  const [editedShellNotMaterial, setEditedShellNotMaterial] = useState({
    productId: "",
    amountAvailable: "",
  });
  const [originalShellNotMaterial, setOriginalShellNotMaterial] = useState({});
  const [newShell, setNewShell] = useState({
    productId: "",
    amountAvailable: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ordersPerPage = 6;

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#faecec",
      color: "1c1c1c",
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
        await fetchShells(currentPage, ordersPerPage, searchQuery);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage, searchQuery]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const fetchShells = async (pageNumber, pageSize, searchQuery = "") => {
    try {
      const response = await ShowAllShell(pageNumber, pageSize, searchQuery);
      setShell(response.data);
      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching shells:", error);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchKeyPress = async (e) => {
    if (e.key === "Enter") {
      setCurrentPage(1);
      await fetchShells(1, ordersPerPage, searchQuery);
    }
  };

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
          toast.success("Shell material deleted successfully!", {
            position: "top-right",
            autoClose: 2000,
          });
        } catch (error) {
          console.error("Error deleting shell:", error);
          toast.error("Failed to delete shell material. Please try again.", {
            position: "top-right",
            autoClose: 2000,
          });
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
          await fetchShells(currentPage, ordersPerPage, searchQuery);
          toast.success("Shell deleted successfully!", {
            position: "top-right",
            autoClose: 2000,
          });
        } catch (error) {
          console.error("Error deleting shell:", error);
          toast.error("Failed to delete shell. Please try again.", {
            position: "top-right",
            autoClose: 2000,
          });
        }
      }
    });
  };

  const handleCloseModal = () => {
    // shell
    setEditedShellNotMaterial(originalShellNotMaterial);
    setEditShellMode(false);
  };

  const handleCloseShellMaterialModal = () => {
    setEditedShell(originalShell);
    setEditMode(false);
  };

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
        toast.info("Please fill in all fields!", {
          position: "top-right",
          autoClose: 2000,
        });
        return;
      }
      if (specialCharPattern.test(editedShell[field])) {
        toast.info("Invalid characters detected!", {
          position: "top-right",
          autoClose: 2000,
        });
        return;
      }
    }

    const isEqual =
      JSON.stringify(originalShell) === JSON.stringify(editedShell);
    if (isEqual) {
      toast.message("No changes detected!", {
        position: "top-right",
        autoClose: 2000,
      });
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
      toast.success("Updated successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.error(
        "Error updating shell material:",
        error.response ? error.response.data : error.message
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
        toast.message("Please fill in all fields!", {
          position: "top-right",
          autoClose: 2000,
        });
        return;
      }
      if (specialCharPattern.test(editedShellNotMaterial[field])) {
        toast.message("Invalid characters detected!", {
          position: "top-right",
          autoClose: 2000,
        });
        return;
      }
    }

    const isEqual =
      JSON.stringify(originalShellNotMaterial) ===
      JSON.stringify(editedShellNotMaterial);
    if (isEqual) {
      toast.message("No changes detected!", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }

    try {
      const response = await updateShellById(
        editedShellNotMaterial.shellId,
        editedShellNotMaterial
      );
      console.log("Update response:", response.data);
      // Fetch updated shell data
      const updatedShells = await ShowAllShell(
        currentPage,
        ordersPerPage,
        searchQuery
      );
      setShell(updatedShells.data);
      setTotalPages(updatedShells.pagination.totalPages);
      setEditShellMode(false);
      toast.success("Updated successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.error(
        "Error updating shell:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleBackClick = async () => {
    setSearchQuery("");
    setCurrentPage(1);
    await fetchShells(1, ordersPerPage, "");
  };

  return (
    <div className="manager_manage_diamond_all_container">
      <div className="manager_manage_diamond_sidebar">
        <ManagerSidebar currentPage="manager_manage_shell" />
      </div>
      <div className="manager_manage_diamond_content">
        <div className="manager_manage_diamond_header">
          <img className="manager_manage_diamond_logo" src={logo} alt="Logo" />
        </div>
        <hr className="manager_header_line"></hr>

        <h3>List Of Shells</h3>

        <div className="manager_manage_diamond_create_button_section">
          <div className="manager_manage_diamond_pagination"></div>
        </div>

        <div className="manager_manage_diamond_table_wrapper">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">
                    Shell Material ID
                  </StyledTableCell>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Price</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shellMaterial.length > 0 ? (
                  shellMaterial.map((item) => (
                    <TableRow
                      className="manager_manage_table_body_row"
                      key={item.shellMaterialId}
                    >
                      <StyledTableCell align="center">
                        {item.shellMaterialId}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {item.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {item.price}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <IconButton onClick={() => handleEdit(item)}>
                          <EditIcon
                            style={{ cursor: "pointer", color: "#575252" }}
                          />
                        </IconButton>
                        <IconButton
                          onClick={() =>
                            handleDeleteShellMaterial(item.shellMaterialId)
                          }
                        >
                          <DeleteIcon
                            style={{ cursor: "pointer", color: "#575252" }}
                          />
                        </IconButton>
                      </StyledTableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <StyledTableCell colSpan="4" align="center">
                      No shell found
                    </StyledTableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div
          className="manager_manage_diamond_create_button_section"
          style={{ marginTop: "2%" }}
        >
          <button
            className="manager_manage_diamond_create_button"
            onClick={() => navigate("/manager-add-shell")}
          >
            Add new shell
          </button>
          <div className="manager_manage_product_search_section">
            <input
              type="text"
              placeholder="Search . . ."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={handleSearchKeyPress}
              className="manager_manage_product_search_bar"
            />
          </div>
          <Stack spacing={2} sx={{ alignItems: "center", mt: 2 }}>
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
                  <StyledTableCell align="center">Shell Id</StyledTableCell>
                  <StyledTableCell align="center">Product ID</StyledTableCell>
                  <StyledTableCell align="center">
                    Shell Material Name
                  </StyledTableCell>
                  <StyledTableCell align="center">Weight</StyledTableCell>
                  <StyledTableCell align="center">Size</StyledTableCell>
                  <StyledTableCell align="center">Price</StyledTableCell>
                  <StyledTableCell align="center">Quantity</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shell.length > 0 ? (
                  shell.map((item) => {
                    const material = shellMaterial.find(
                      (material) =>
                        material.shellMaterialId === item.shellMaterialId
                    ) || { name: "N/A", price: "N/A" };
                    return (
                      <TableRow
                        className="manager_manage_table_body_row"
                        key={item.shellId}
                      >
                        <StyledTableCell align="center">
                          {item.shellId}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {item.productId}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {material ? material.name : "Material not found"}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {item.weight}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {item.size}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          $
                          {material
                            ? material.price * item.weight
                            : "Material not found"}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {item.amountAvailable}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <IconButton onClick={() => handleEditShell(item)}>
                            <EditIcon
                              style={{ cursor: "pointer", color: "#575252" }}
                            />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDeleteShell(item.shellId)}
                          >
                            <DeleteIcon
                              style={{ cursor: "pointer", color: "#575252" }}
                            />
                          </IconButton>
                        </StyledTableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <StyledTableCell colSpan="8" align="center">
                      No shell found
                    </StyledTableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        {isSearch && (
          <button className="SS_back_button" onClick={handleBackClick}>
            Back to All
          </button>
        )}

        <Modal open={editMode} onClose={handleCloseShellMaterialModal}>
          <Box
            component="form"
            onSubmit={handleSubmit(handleUpdate)}
            sx={{ display: "flex", flexDirection: "column", gap: 2, p: 3 }}
            style={{
              backgroundColor: "white",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "30%",
              boxShadow: 24,
              borderRadius: 6,
            }}
          >
            <Typography variant="h6">Edit Shell Material</Typography>
            <TextField
              {...register("name", { required: true })}
              type="text"
              name="name"
              label="Name"
              value={editedShell.name}
              onChange={handleChange}
              // error={!!errors.name}
              helperText={errors.name ? "Name is required" : ""}
              maxLength={100}
              required
            />
            <TextField
              {...register("price", {
                required: { value: true, message: "Price is required" },
                min: { value: 1, message: "Price must be greater than 0" },
              })}
              type="number"
              label="Price"
              // error={!!errors.price}
              helperText={errors.price ? errors.price.message : ""}
              name="price"
              value={editedShell.price}
              onChange={handleChange}
              required
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button onClick={() => setEditMode(false)}>Cancel</Button>
              <Button onClick={handleUpdate}>Confirm</Button>
            </Box>
          </Box>
        </Modal>

        <Modal open={editShellMode} onClose={handleCloseModal}>
          <Box
            component="form"
            onSubmit={handleSubmit(handleUpdateShell)}
            sx={{ display: "flex", flexDirection: "column", gap: 2, p: 3 }}
            style={{
              backgroundColor: "white",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "30%",
              boxShadow: 24,
              borderRadius: 6,
            }}
          >
            <Typography variant="h6">Edit Shell</Typography>
            <TextField
              {...register("productId", { required: true })}
              type="text"
              label="Product ID"
              // error={!!errors.productId}
              helperText={errors.productId ? "Product ID is required" : ""}
              name="productId"
              value={editedShellNotMaterial.productId}
              onChange={handleShellChange}
              required
            />
            <TextField
              {...register("amountAvailable", {
                required: {
                  value: true,
                  message: "Amount available is required",
                },
                min: {
                  value: 1,
                  message: "Amount available must be greater than 0",
                },
                max: {
                  value: 50,
                  message: "Amount available must be smaller than 50",
                },
              })}
              type="number"
              name="amountAvailable"
              label="Amount Available"
              // error={!!errors.amountAvailable}
              helperText={
                errors.amountAvailable ? errors.amountAvailable.message : ""
              }
              value={editedShellNotMaterial.amountAvailable}
              onChange={handleShellChange}
              required
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button onClick={() => setEditShellMode(false)}>Cancel</Button>
              <Button onClick={handleUpdateShell}>Confirm</Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default ManagerShellList;
