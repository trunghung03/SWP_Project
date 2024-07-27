import "@fortawesome/fontawesome-free/css/all.min.css";
import DeleteIcon from "@mui/icons-material/Delete";
import DiamondIcon from "@mui/icons-material/Diamond";
import EditIcon from "@mui/icons-material/Edit";
import SubDiamondIcon from "@mui/icons-material/Grain";
import { Grid } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { PDFDownloadLink } from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import swal from "sweetalert";
import logo from "../../../assets/img/logoN.png";
import ManagerSidebar from "../../../components/ManagerSidebar/ManagerSidebar.js";
import {
  ShowAllDiamond,
  deleteDiamondById,
  deleteSubDiamondById,
  getAllSubDiamond,
  getDiamondByShape,
  getDiamondDetail,
  getMainDiamondAttribute,
  getSubDiamondAttribute,
  getSubDiamondDetail,
  updateDiamondById,
  updateSubDiamondById,
} from "../../../services/ManagerService/ManagerDiamondService.js";
import "../../../styles/Manager/ManagerList.scss";
import DiamondPDf from "./DiamondPDF.js";
import DiamondTypeSwitcher from "./DiamondTypeSwitcher.js";

const ManagerDiamondList = () => {
  const [searchParams, setSearchParams] = useSearchParams("");
  return (
    <div className="manager_manage_diamond_all_container">
      <div className="manager_manage_diamond_sidebar">
        <ManagerSidebar currentPage="manager_manage_diamond" />
      </div>
      <div className="manager_manage_diamond_content">
        <div className="manager_manage_diamond_header">
          <img className="manager_manage_diamond_logo" src={logo} alt="Logo" />
          <div className="manager_manage_diamond_search_section">
            <input
              type="text"
              className="manager_manage_diamond_search_bar"
              placeholder="Search by ID or Shape..."
              onChange={(e) => {
                searchParams.set("search", e.target.value);
                setSearchParams(
                  searchParams.toString().length === 0
                    ? ""
                    : "?" + searchParams.toString()
                );
              }}
              // onKeyUp={handleSearchKeyPress}
            />
          </div>
        </div>
        <hr className="manager_header_line"></hr>

        <DiamondTypeSwitcher />
      </div>
    </div>
  );
};

export default ManagerDiamondList;
