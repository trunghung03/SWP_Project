import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import {
  Grid,
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect } from "react";
import EditDialog from "./components/EditDialog";
import { useNavigate } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import DiamondPDF from "./DiamondPDF";
import EditMainDiamondDialog from "./components/EditMainDiamondDialog";
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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
export default function DiamondTable({
  tableColumns,
  maindiamondList,
  subdiamondList,
  pagination,
  currentPage,
  handlePageChange,
  handleDelete,
  mainDiamondPDF,
  subDiamondPDF,
  setDiamondList,
  ...props
}) {
  const navigate = useNavigate();
  

  return (
    <>
      <Grid container spacing={3} padding={3}>
        <Grid
          item
          xs={12}
          container
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <button
              variant="contained"
              color="primary"
              className="manager_manage_diamond_create_button"
            >
              <PDFDownloadLink
                className="link"
                document={
                  <DiamondPDF main={mainDiamondPDF} sub={subDiamondPDF} />
                }
                width="100px"
                fileName="diamond.pdf"
              >
                {({ loading }) => (loading ? "Loading..." : "Download PDF")}
              </PDFDownloadLink>
            </button>
            <button
              variant="contained"
              color="secondary"
              className="manager_manage_diamond_create_button"
              onClick={() => navigate("/manager-add-diamond")}
              style={{ marginLeft: "20px" }}
            >
              Add new diamond
            </button>
          </Grid>
          <Grid item>
            <Pagination
              count={pagination?.totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Grid>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {tableColumns.map((column) => (
                <StyledTableCell align="center">{column}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {maindiamondList &&
              maindiamondList?.map((item) => (
                <StyledTableRow key={item.diamondId}>
                  <StyledTableCell align="center">
                    {item.diamondId}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item.diamondAttributeId}
                  </StyledTableCell>
                  <StyledTableCell align="center">{item.shape}</StyledTableCell>
                  <StyledTableCell align="center">{item.color}</StyledTableCell>
                  <StyledTableCell align="center">
                    {item.clarity}
                  </StyledTableCell>
                  <StyledTableCell align="center">{item.cut}</StyledTableCell>
                  <StyledTableCell align="center">{item.carat}</StyledTableCell>
                  <StyledTableCell align="center">{item.price}</StyledTableCell>
                  <StyledTableCell align="center">
                    {item.certificateScan ?? "not avail"}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    <EditMainDiamondDialog
                      diamond={item}
                      setDiamondList={setDiamondList}
                    />

                    <IconButton
                      onClick={() => handleDelete(item.diamondAttributeId)}
                      color="secondary"
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}

            {subdiamondList &&
              subdiamondList?.map((item) => (
                <StyledTableRow key={item.subDiamondId}>
                  <StyledTableCell align="center">
                    {item?.subDiamondId}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item?.subDiamondAttributeId}
                  </StyledTableCell>
                  <StyledTableCell align="center">{item.shape}</StyledTableCell>
                  <StyledTableCell align="center">{item.color}</StyledTableCell>
                  <StyledTableCell align="center">
                    {item.clarity}
                  </StyledTableCell>
                  <StyledTableCell align="center">{item.carat}</StyledTableCell>
                  <StyledTableCell align="center">{item.cut}</StyledTableCell>
                  <StyledTableCell align="center">{item.price}</StyledTableCell>
                  <StyledTableCell align="center">
                    {" "}
                    {item.amountAvailable ?? 0}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <EditDialog
                      diamond={item}
                      setDiamondList={setDiamondList}
                    />
                    <IconButton
                      onClick={() => handleDelete(item.subDiamondId)}
                      color="secondary"
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
