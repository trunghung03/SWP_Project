import React from "react";
import { TableHead, TableRow, TableCell, TableSortLabel, Box } from "@mui/material";
import PropTypes from "prop-types";
import { visuallyHidden } from "@mui/utils";

// Head cells for the collection table
const headCells = [
  {
    id: "collectionId",
    numeric: false,
    disablePadding: false,
    label: "ID",
    sortable: true,
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
    sortable: true,
  },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "Description",
    sortable: false,
  },
  {
    id: "imageLink",
    numeric: false,
    disablePadding: false,
    label: "Images",
    sortable: false,
  },
  {
    id: "update",
    numeric: false,
    disablePadding: false,
    label: "Update",
    sortable: false,
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Action",
    sortable: false,
  },
];

// Enhanced Table Head for sorting
function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            style={{ backgroundColor: "#faecec" }}
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.sortable ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default EnhancedTableHead;
