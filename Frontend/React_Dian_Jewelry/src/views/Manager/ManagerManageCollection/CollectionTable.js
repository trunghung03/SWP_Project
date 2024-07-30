import React from "react";
import { Table, TableBody, TableContainer, Paper, TableCell, TableRow } from "@mui/material";
import EnhancedTableHead from "./EnhanceTableHead";
import CollectionRow from "./CollectionRow";
import { tableSort, getComparator } from "../../../Utils/TableUtils";

const CollectionTable = ({ collections, order, orderBy, onRequestSort, handleEdit, handleStatus }) => {
  return (
    <TableContainer component={Paper} sx={{marginTop:2}}>
      <Table sx={{ minWidth: 700}} aria-label="customized table">
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={onRequestSort}
        />
        <TableBody>
          {collections.length > 0 ? (
            tableSort(collections, getComparator(order, orderBy)).map(
              (item) => (
                <CollectionRow
                  key={item.collectionId}
                  item={item}
                  handleEdit={handleEdit}
                  handleStatus={handleStatus}
                />
              )
            )
          ) : (
            <TableRow>
              <TableCell colSpan="9">No Collection found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollectionTable;
