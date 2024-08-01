import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ManagerSidebar from "../../../components/ManagerSidebar/ManagerSidebar.js";
import "../../../styles/Manager/ManagerList.scss";
import {
  ShowAllShell,
  ShowAllShellMaterial,
  deleteShellMaterialById,
  updateShellMaterialById,
  deleteShellById,
  updateShellById,
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
import { useForm } from "react-hook-form";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { toast } from "sonner";

const ManagerShellList = () => {
  const navigate = useNavigate();

  const [shellMaterial, setShellMaterial] = useState([]);
  const [shell, setShell] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editShellMode, setEditShellMode] = useState(false);
  const [editedShell, setEditedShell] = useState({ name: "", price: "" });
  const [editedShellNotMaterial, setEditedShellNotMaterial] = useState({ amountAvailable: "" });
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const shellMaterialsResponse = await ShowAllShellMaterial();
        setShellMaterial(shellMaterialsResponse);
        await fetchShells(currentPage, ordersPerPage, searchQuery);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage, searchQuery]);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { register: register2, handleSubmit: handleSubmit2, setValue: setValue2, formState: { errors: errors2 } } = useForm();

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
    setEditedShellNotMaterial({});
    setEditShellMode(false);
  };

  const handleCloseShellMaterialModal = () => {
    setEditedShell({});
    setEditMode(false);
  };

  const handleEdit = (shellMaterial) => {
    setValue("name", shellMaterial.name);
    setValue("price", shellMaterial.price);
    setEditMode(true);
    setEditedShell(shellMaterial);
  };

  const handleUpdate = async (data) => {
    try {
      await updateShellMaterialById(editedShell.shellMaterialId, data);
      const updatedItems = await ShowAllShellMaterial();
      setShellMaterial(updatedItems);
      setEditMode(false);
      toast.success("Updated successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error updating shell material:", error.response ? error.response.data : error.message);
    }
  };

  const handleEditShell = (shell) => {
    setValue2("productId", shell.productId);
    setValue2("amountAvailable", shell.amountAvailable);
    setEditShellMode(true);
    setEditedShellNotMaterial(shell);
  };

  const handleUpdateShell = async (data) => {
    try {
      await updateShellById(editedShellNotMaterial.shellId, data);
      const updatedShells = await ShowAllShell(currentPage, ordersPerPage, searchQuery);
      setShell(updatedShells.data);
      setTotalPages(updatedShells.pagination.totalPages);
      setEditShellMode(false);
      toast.success("Updated successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error updating shell:", error.response ? error.response.data : error.message);
    }
  };

  const handleBackClick = async () => {
    setSearchQuery("");
    setCurrentPage(1);
    await fetchShells(1, ordersPerPage, "");
  };

  const materialMap = shellMaterial.reduce((acc, material) => {
    acc[material.shellMaterialId] = material;
    return acc;
  }, {});

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
                          <EditIcon style={{ cursor: "pointer", color: "#575252" }} />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteShellMaterial(item.shellMaterialId)}>
                          <DeleteIcon style={{ cursor: "pointer", color: "#575252" }} />
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
          <button className="manager_manage_diamond_create_button" onClick={() => navigate("/manager-add-shell")}>Add new shell</button>
          <div className="manager_manage_product_search_section">
            <input
              type="text"
              placeholder="Search . . ."
              value={searchQuery}
              onChange={handleSearchChange}
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
                  <StyledTableCell align="center">Shell Material Name</StyledTableCell>
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
                    const material = materialMap[item.shellMaterialId] || { name: "N/A", price: "N/A" };
                    return (
                      <TableRow className="manager_manage_table_body_row" key={item.shellId}>
                        <StyledTableCell align="center">{item.shellId}</StyledTableCell>
                        <StyledTableCell align="center">{item.productId}</StyledTableCell>
                        <StyledTableCell align="center">{material.name}</StyledTableCell>
                        <StyledTableCell align="center">{item.weight}</StyledTableCell>
                        <StyledTableCell align="center">{item.size}</StyledTableCell>
                        <StyledTableCell align="center">${material.price * item.weight}</StyledTableCell>
                        <StyledTableCell align="center">{item.amountAvailable}</StyledTableCell>
                        <StyledTableCell align="center">
                          <IconButton onClick={() => handleEditShell(item)}>
                            <EditIcon style={{ cursor: "pointer", color: "#575252" }} />
                          </IconButton>
                          <IconButton onClick={() => handleDeleteShell(item.shellId)}>
                            <DeleteIcon style={{ cursor: "pointer", color: "#575252" }} />
                          </IconButton>
                        </StyledTableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <StyledTableCell colSpan="8" align="center">No shell found</StyledTableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

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
              helperText={errors.price ? errors.price.message : ""}
              name="price"
              required
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button onClick={handleCloseShellMaterialModal}>Cancel</Button>
              <Button type="submit">Confirm</Button>
            </Box>
          </Box>
        </Modal>

        <Modal open={editShellMode} onClose={handleCloseModal}>
          <Box
            component="form"
            onSubmit={handleSubmit2(handleUpdateShell)}
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
              {...register2("amountAvailable", {
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
              helperText={errors2.amountAvailable ? errors2.amountAvailable.message : ""}
              required
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button onClick={handleCloseModal}>Cancel</Button>
              <Button type="submit">Confirm</Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default ManagerShellList;
