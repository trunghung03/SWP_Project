import "@fortawesome/fontawesome-free/css/all.min.css";
import { TableContainer } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import PropTypes from "prop-types";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import swal from "sweetalert";
import {
  deleteDiamondById,
  deleteSubDiamondById,
  getAllSubDiamond,
  ShowAllDiamond,
} from "../../../services/ManagerService/ManagerDiamondService";
import "../../../styles/Manager/ManagerList.scss";
import DiamondTable from "./DiamondTable";
import { set } from "react-hook-form";
const mainDiamondTableColumns = [
  "ID",
  "Attribute ID",
  "Shape",
  "Color",
  "Clarity",
  "Carat",
  "Cut",
  "Price",
  "Certificate",
  "Status",
  "Actions",
];

const subDiamondTableColumns = [
  "ID",
  "Attribute ID",
  "Shape",
  "Color",
  "Clarity",
  "Carat",
  "Cut",
  "Price",
  "Quantity",
  "Actions",
];

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function DiamondTypeSwitcher() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(0);
  const[currentPage,setCurrentPage] = useState(1);
  const [diamondList, setDiamondList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedDiamond, setEditedDiamond] = useState({});
  const [originalDiamond, setOriginalDiamond] = useState({});
  const [isSearch, setIsSearch] = useState(false);
  const [pagination, setPagination] = useState({
    totalPages: 1,
    pageSize: 6,
    currentPage: 1,
  });
  const [mainDiamondPDF, setMainDiamondPDF] = useState([]);
  const [subDiamondPDF, setSubDiamondPDF] = useState([]);
  const pageNumber = searchParams.get("pageNumber");
  const type = parseInt(searchParams.get("type"));
  
  useEffect(() => {
    if (!isNaN(type)) {
      setValue(type);
    }
    if(value === type){
      fetchData(pageNumber, value === 0 ? "main" : "sub");
    }else{
      fetchData(1, value === 0 ? "main" : "sub");
    }
    setPagination({
      ...pagination,
      pageSize: 6,
      currentPage: pageNumber,
    });
    // fetchData(pageNumber, value === 0 ? "main" : "sub");
  }, [searchParams,value]);


  const fetchData = async (page, type) => {
    try {
      const response =
        type === "main"
          ? await ShowAllDiamond(page)
          : await getAllSubDiamond(page);
      // type === "main"
      //   ? setMainDiamondPDF(response?.data)
      //   : setSubDiamondPDF(response?.data);

      // console.log("Fetch Data Response: ", response);
      setDiamondList(response?.data);
      setPagination(response?.pagination);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };



  const handlePageChange = (event, value) => {
    console.log("Page Change: ", value);
    searchParams.set("pageNumber", value);
    setSearchParams(searchParams);
    setPagination({
      ...pagination,
      currentPage: value,
    });
    setCurrentPage(value);
  };

  const handleChange = (e, newValue) => {
    const { name, value } = e.target;
    // Update the search parameter
    searchParams.set("type", newValue);
    // Set the updated search parameters back to the URL
    setSearchParams(searchParams);
    console.log("Search Params: ", searchParams);
    setValue(newValue);
    if (newValue === 0) {
      fetchData(1, "main");
    } else {
      fetchData(1, "sub");
    }
  };

  const handleDelete = async (diamondId) => {
    swal({
      title: "Are you sure to delete this diamond?",
      text: "This action cannot be undone",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          value === 0
            ? await deleteDiamondById(diamondId)
            : await deleteSubDiamondById(diamondId);
          fetchData(pagination.currentPage, value === 0 ? "main" : "sub");
          swal(
            "Deleted successfully!",
            "The diamond has been deleted.",
            "success"
          );
        } catch (error) {
          console.error("Error deleting diamond:", error);
          swal(
            "Something went wrong!",
            "Failed to delete the diamond. Please try again.",
            "error"
          );
        }
      }
    });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Diamonds" {...a11yProps(0)} />
          <Tab label="Sub-Diamonds" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={1}>
        <TableContainer component={Paper}>
          <DiamondTable
            pagination={pagination}
            subdiamondList={diamondList}
            tableColumns={subDiamondTableColumns}
            handlePageChange={handlePageChange}
            handleDelete={handleDelete}
            setDiamondList={setDiamondList}
          />
        </TableContainer>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={0}>
        <DiamondTable
          handleDelete={handleDelete}
          maindiamondList={diamondList}
          pagination={pagination}
          handlePageChange={handlePageChange}
          tableColumns={mainDiamondTableColumns}
          currentPage={currentPage}
          mainDiamondPDF={mainDiamondPDF}
          subDiamondPDF={subDiamondPDF}
          setDiamondList={setDiamondList}
        />
      </CustomTabPanel>
    </Box>
  );
}
