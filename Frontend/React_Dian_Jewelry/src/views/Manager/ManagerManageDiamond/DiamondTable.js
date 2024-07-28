import DeleteIcon from "@mui/icons-material/Delete";

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
import {styled} from "@mui/material/styles";
import React, {useEffect, useRef} from "react";
import EditDialog from "./components/EditDialog";
import {useNavigate, useSearchParams} from "react-router-dom";
import {usePDF} from "@react-pdf/renderer";
import DiamondPDF from "./DiamondPDF";
import EditMainDiamondDialog from "./components/EditMainDiamondDialog";
import {allMainDiamondPDF, allSubDiamondPDF} from "../../../services/ManagerService/ManagerDiamondService";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#faecec", color: "1c1c1c",
    }, [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
const StyledTableRow = styled(TableRow)(({theme}) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    }, "&:last-child td, &:last-child th": {
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
    const [instance, updateInstance] = usePDF();
    const [searchParams, setSearchParams] = useSearchParams();
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
        setLoading(true)
        console.log("type", type);
        if (type === 0) {
            allMainDiamondPDF().then((response) => {
                // setSubDiamond(response);
                // Generate download pdf action
                setLoading(false)
                updateInstance(<DiamondPDF main={response}/>,);
            });
        } else {
            allSubDiamondPDF().then((response) => {
                // setMainDiamond(response);
                // Generate download pdf action
                updateInstance(<DiamondPDF subs={response}/>,);
                setLoading(false)

            });
        }
    };


    return (<>
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
                        // variant="contained"
                        color="primary"
                        className="manager_manage_diamond_create_button"
                        // href={instance.url} download={"diamond.pdf"}
                        onClick={handlePdfDownload}
                        disabled={loading}
                    >
                        {!instance.loading ? 'Export PDF' : 'Exporting....'}
                    </button>
                    <a ref={downloadLinkRef} style={{display: "none"}}>Hidden Download Link</a>

                    <button
                        variant="contained"
                        color="secondary"
                        className="manager_manage_diamond_create_button"
                        onClick={() => navigate("/manager-add-diamond")}
                        style={{marginLeft: "20px"}}
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
            <Table sx={{minWidth: 700}} aria-label="customized table">
                <TableHead>
                    <TableRow sx={{cursor: "pointer"}}>
                        {tableColumns.map((column) => (<StyledTableCell align="center">{column}</StyledTableCell>))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {maindiamondList && maindiamondList?.map((item) => (<TableRow hover key={item.diamondId}>
                        <TableCell align="center">
                            {item.diamondId}
                        </TableCell>
                        <TableCell align="center">
                            {item.diamondAttributeId}
                        </TableCell>
                        <TableCell align="center">{item.shape}</TableCell>
                        <TableCell align="center">{item.color}</TableCell>
                        <TableCell align="center">
                            {item.clarity}
                        </TableCell>
                        <TableCell align="center">{item.cut}</TableCell>
                        <TableCell align="center">{item.carat}</TableCell>
                        <TableCell align="center">{item.price}</TableCell>
                        <TableCell align="center">
                            {item.certificateScan ?? "not avail"}
                        </TableCell>
                        <TableCell align="center">{item.status ? "Available" : "Sold"}</TableCell>
                        <TableCell align="center">
                            <EditMainDiamondDialog
                                diamond={item}
                                setDiamondList={setDiamondList}
                            />

                            <IconButton
                                onClick={() => handleDelete(item.diamondAttributeId)}
                                color="secondary"
                                aria-label="delete"
                            >
                                <DeleteIcon style={{color: "#575252"}}/>
                            </IconButton>
                        </TableCell>
                    </TableRow>))}

                    {subdiamondList && subdiamondList?.map((item) => (<TableRow hover key={item.subDiamondId}>
                        <TableCell align="center">
                            {item?.subDiamondId}
                        </TableCell>
                        <TableCell align="center">
                            {item?.subDiamondAttributeId}
                        </TableCell>
                        <TableCell align="center">{item.shape}</TableCell>
                        <TableCell align="center">{item.color}</TableCell>
                        <TableCell align="center">
                            {item.clarity}
                        </TableCell>
                        <TableCell align="center">{item.carat}</TableCell>
                        <TableCell align="center">{item.cut}</TableCell>
                        <TableCell align="center">{item.price}</TableCell>
                        <TableCell align="center">
                            {" "}
                            {item.amountAvailable ?? 0}
                        </TableCell>
                        <TableCell align="center">
                            <EditDialog
                                diamond={item}
                                setDiamondList={setDiamondList}
                            />
                            <IconButton
                                onClick={() => handleDelete(item.subDiamondId)}
                                color="secondary"
                                aria-label="delete"
                            >
                                <DeleteIcon style={{color: "#575252"}}/>
                            </IconButton>
                        </TableCell>
                    </TableRow>))}
                </TableBody>
            </Table>
        </TableContainer>
    </>);
}
