import React, { useEffect, useRef } from "react";
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
import DeleteIcon from "@mui/icons-material/Delete";
import { usePDF } from "@react-pdf/renderer";
import { useNavigate, useSearchParams } from "react-router-dom";
import DiamondPDF from "./DiamondPDF";
import EditMainDiamondDialog from "./components/EditMainDiamondDialog";
import EditDialog from "./components/EditDialog";
import { allMainDiamondPDF, allSubDiamondPDF } from "../../../services/ManagerService/ManagerDiamondService";

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
  maindiamondList = [],
  subdiamondList = [],
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
  const [instance, updateInstance] = usePDF();
  const [searchParams] = useSearchParams();
  const downloadLinkRef = useRef(null);
  const type = parseInt(searchParams.get("type"), 10); // Convert type to a number
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (instance.url && !loading) {
      downloadLinkRef.current.href = instance.url;
      downloadLinkRef.current.download = "diamond.pdf";
      downloadLinkRef.current.click();
    }
  }, [loading, instance.url]);

  const handlePdfDownload = () => {
    setLoading(true);
    if (type === 0) {
      allMainDiamondPDF().then((response) => {
        updateInstance(<DiamondPDF main={response} />);
        setLoading(false);
      });
    } else {
      allSubDiamondPDF().then((response) => {
        updateInstance(<DiamondPDF subs={response} />);
        setLoading(false);
      });
    }
  };

  const renderDiamondRows = (diamonds) => {
    if (diamonds.length === 1 && diamonds[0].message) {
      return (
        <TableRow hover key="no-diamonds">
          <TableCell align="center" colSpan={tableColumns.length}>
            {diamonds[0].message}
          </TableCell>
        </TableRow>
      );
    }

    return diamonds.map((item) => (
      <TableRow hover key={item.diamondId || item.subDiamondId}>
        <TableCell align="center">{item.diamondId || item.subDiamondId}</TableCell>
        <TableCell align="center">{item.diamondAttributeId || item.subDiamondAttributeId}</TableCell>
        <TableCell align="center">{item.shape}</TableCell>
        <TableCell align="center">{item.color}</TableCell>
        <TableCell align="center">{item.clarity}</TableCell>
        <TableCell align="center">{item.cut}</TableCell>
        <TableCell align="center">{item.carat}</TableCell>
        <TableCell align="center">{item.price}</TableCell>
        <TableCell align="center">{item.certificateScan ?? "not avail"}</TableCell>
        <TableCell align="center">{item.status ? "Available" : "Sold"}</TableCell>
        <TableCell align="center">
          <EditMainDiamondDialog diamond={item} setDiamondList={setDiamondList} />
          <IconButton onClick={() => handleDelete(item.diamondAttributeId || item.subDiamondId)} color="secondary" aria-label="delete">
            <DeleteIcon style={{ color: "#575252" }} />
          </IconButton>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <>
      <Grid container spacing={3} padding={3}>
        <Grid item xs={12} container justifyContent="space-between" alignItems="center">
          <Grid item>
            <button
              color="primary"
              className="manager_manage_diamond_create_button"
              onClick={handlePdfDownload}
              disabled={loading}
            >
              {!instance.loading ? "Export PDF" : "Exporting...."}
            </button>
            <a ref={downloadLinkRef} style={{ display: "none" }}>
              Hidden Download Link
            </a>
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
            <TableRow sx={{ cursor: "pointer" }}>
              {tableColumns.map((column) => (
                <StyledTableCell align="center" key={column}>
                  {column}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {type === 0 ? renderDiamondRows(maindiamondList.length ? maindiamondList : [{ message: "Diamond does not exist" }]) 
                        : renderDiamondRows(subdiamondList.length ? subdiamondList : [{ message: "Diamond does not exist" }])}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
