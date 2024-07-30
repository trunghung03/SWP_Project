import React, { useEffect, useState } from "react";
import { Box, Grid, FormControl, InputLabel, Select, MenuItem, Tabs, Tab } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import swal from "sweetalert";
import { deleteDiamondById, deleteSubDiamondById, getAllSubDiamond, ShowAllDiamond } from "../../../services/ManagerService/ManagerDiamondService";
import "../../../styles/Manager/ManagerList.scss";
import DiamondTable from "./DiamondTable";
import PropTypes from "prop-types";

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
  "Status",
  "Actions",
];

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
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

export default function DiamondTypeSwitcher({ searchTerm }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [diamondList, setDiamondList] = useState([]);
  const [pagination, setPagination] = useState({
    totalPages: 1,
    pageSize: 6,
    currentPage: 1,
  });
  const [shapeFilter, setShapeFilter] = useState("");
  const [clarityFilter, setClarityFilter] = useState("");
  const [colorFilter, setColorFilter] = useState("");
  const [cutFilter, setCutFilter] = useState("");
  const pageNumber = searchParams.get("pageNumber");
  const type = parseInt(searchParams.get("type"));

  useEffect(() => {
    if (!isNaN(type)) {
      setValue(type);
    }
    if (value === type) {
      fetchData(pageNumber, value === 0 ? "main" : "sub");
    } else {
      fetchData(1, value === 0 ? "main" : "sub");
    }
    setPagination({
      ...pagination,
      pageSize: 6,
      currentPage: pageNumber,
    });
  }, [searchParams, value, shapeFilter, clarityFilter, colorFilter, cutFilter, searchTerm]);

  const fetchData = async (page, type) => {
    try {
      const response =
        type === "main"
          ? await ShowAllDiamond(page, 6, shapeFilter, clarityFilter, colorFilter, cutFilter, searchTerm)
          : await getAllSubDiamond(page, 6, shapeFilter, clarityFilter, colorFilter, cutFilter, searchTerm);

      if (response?.data.length === 0) {
        setDiamondList([{ message: "Diamond does not exist" }]);
      } else {
        setDiamondList(response?.data);
      }
      setPagination(response?.pagination);
    } catch (error) {
      console.error("Error fetching data:", error);
      setDiamondList([{ message: "Diamond does not exist" }]);
    }
  };

  const handlePageChange = (event, value) => {
    searchParams.set("pageNumber", value);
    setSearchParams(searchParams);
    setPagination({
      ...pagination,
      currentPage: value,
    });
    setCurrentPage(value);
  };

  const handleChange = (e, newValue) => {
    searchParams.set("type", newValue);
    setSearchParams(searchParams);
    setValue(newValue);
    setShapeFilter("");
    setClarityFilter("");
    setColorFilter("");
    setCutFilter("");
    fetchData(1, newValue === 0 ? "main" : "sub");
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
          swal("Deleted successfully!", "The diamond has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting diamond:", error);
          swal("Something went wrong!", "Failed to delete the diamond. Please try again.", "error");
        }
      }
    });
  };

  const handleShapeFilterChange = (event) => {
    setShapeFilter(event.target.value);
  };

  const handleClarityFilterChange = (event) => {
    setClarityFilter(event.target.value);
  };

  const handleColorFilterChange = (event) => {
    setColorFilter(event.target.value);
  };

  const handleCutFilterChange = (event) => {
    setCutFilter(event.target.value);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Diamonds" {...a11yProps(0)} />
          <Tab label="Sub-Diamonds" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Grid container justifyContent="center">
          <Grid item>
            <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel>Shape</InputLabel>
              <Select value={shapeFilter} onChange={handleShapeFilterChange} label="Shape">
                <MenuItem value="">None</MenuItem>
                <MenuItem value="Round">Round</MenuItem>
                <MenuItem value="Oval">Oval</MenuItem>
                <MenuItem value="Emerald">Emerald</MenuItem>
                <MenuItem value="Cushion">Cushion</MenuItem>
                <MenuItem value="Pear">Pear</MenuItem>
                <MenuItem value="Radiant">Radiant</MenuItem>
                <MenuItem value="Princess">Princess</MenuItem>
                <MenuItem value="Marquise">Marquise</MenuItem>
                <MenuItem value="Asscher">Asscher</MenuItem>
                <MenuItem value="Heart">Heart</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel>Clarity</InputLabel>
              <Select value={clarityFilter} onChange={handleClarityFilterChange} label="Clarity">
                <MenuItem value="">None</MenuItem>
                <MenuItem value="IF">IF</MenuItem>
                <MenuItem value="VVS1">VVS1</MenuItem>
                <MenuItem value="VVS2">VVS2</MenuItem>
                <MenuItem value="VS1">VS1</MenuItem>
                <MenuItem value="VS2">VS2</MenuItem>
                <MenuItem value="SI1">SI1</MenuItem>
                <MenuItem value="SI2">SI2</MenuItem>
                <MenuItem value="I1">I1</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel>Color</InputLabel>
              <Select value={colorFilter} onChange={handleColorFilterChange} label="Color">
                <MenuItem value="">None</MenuItem>
                <MenuItem value="D">D</MenuItem>
                <MenuItem value="E">E</MenuItem>
                <MenuItem value="F">F</MenuItem>
                <MenuItem value="G">G</MenuItem>
                <MenuItem value="H">H</MenuItem>
                <MenuItem value="I">I</MenuItem>
                <MenuItem value="J">J</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel>Cut</InputLabel>
              <Select value={cutFilter} onChange={handleCutFilterChange} label="Cut">
                <MenuItem value="">None</MenuItem>
                <MenuItem value="Good">Good</MenuItem>
                <MenuItem value="Very Good">Very Good</MenuItem>
                <MenuItem value="Ideal">Ideal</MenuItem>
                <MenuItem value="Super Ideal">Super Ideal</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <DiamondTable
          handleDelete={handleDelete}
          maindiamondList={diamondList}
          pagination={pagination}
          handlePageChange={handlePageChange}
          tableColumns={mainDiamondTableColumns}
          currentPage={currentPage}
          setDiamondList={setDiamondList}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Grid container justifyContent="center">
          <Grid item>
            <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel>Shape</InputLabel>
              <Select value={shapeFilter} onChange={handleShapeFilterChange} label="Shape">
                <MenuItem value="">None</MenuItem>
                <MenuItem value="Round">Round</MenuItem>
                <MenuItem value="Oval">Oval</MenuItem>
                <MenuItem value="Emerald">Emerald</MenuItem>
                <MenuItem value="Cushion">Cushion</MenuItem>
                <MenuItem value="Pear">Pear</MenuItem>
                <MenuItem value="Radiant">Radiant</MenuItem>
                <MenuItem value="Princess">Princess</MenuItem>
                <MenuItem value="Marquise">Marquise</MenuItem>
                <MenuItem value="Asscher">Asscher</MenuItem>
                <MenuItem value="Heart">Heart</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel>Clarity</InputLabel>
              <Select value={clarityFilter} onChange={handleClarityFilterChange} label="Clarity">
                <MenuItem value="">None</MenuItem>
                <MenuItem value="IF">IF</MenuItem>
                <MenuItem value="VVS1">VVS1</MenuItem>
                <MenuItem value="VVS2">VVS2</MenuItem>
                <MenuItem value="VS1">VS1</MenuItem>
                <MenuItem value="VS2">VS2</MenuItem>
                <MenuItem value="SI1">SI1</MenuItem>
                <MenuItem value="SI2">SI2</MenuItem>
                <MenuItem value="I1">I1</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel>Color</InputLabel>
              <Select value={colorFilter} onChange={handleColorFilterChange} label="Color">
                <MenuItem value="">None</MenuItem>
                <MenuItem value="D">D</MenuItem>
                <MenuItem value="E">E</MenuItem>
                <MenuItem value="F">F</MenuItem>
                <MenuItem value="G">G</MenuItem>
                <MenuItem value="H">H</MenuItem>
                <MenuItem value="I">I</MenuItem>
                <MenuItem value="J">J</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel>Cut</InputLabel>
              <Select value={cutFilter} onChange={handleCutFilterChange} label="Cut">
                <MenuItem value="">None</MenuItem>
                <MenuItem value="Good">Good</MenuItem>
                <MenuItem value="Very Good">Very Good</MenuItem>
                <MenuItem value="Ideal">Ideal</MenuItem>
                <MenuItem value="Super Ideal">Super Ideal</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <DiamondTable
          pagination={pagination}
          subdiamondList={diamondList}
          tableColumns={subDiamondTableColumns}
          handlePageChange={handlePageChange}
          setDiamondList={setDiamondList}
        />
      </CustomTabPanel>
    </Box>
  );
}
