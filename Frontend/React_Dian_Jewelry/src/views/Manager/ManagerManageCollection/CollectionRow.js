import React from "react";
import { TableRow, TableCell, Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ImagePreview from "./ImagePreview";

const CollectionRow = ({ item, handleEdit, handleStatus }) => {
  return (
    <TableRow
      key={item.collectionId}
      sx={{
        "&:hover": {
          backgroundColor: "#f5f5f5",
        },
        cursor: "pointer",
      }}
    >
      <TableCell align="center">{item.collectionId}</TableCell>
      <TableCell align="center">{item.name}</TableCell>
      <TableCell align="center">{item.description}</TableCell>
      <TableCell align="center">
        <ImagePreview collectionImage={item.imageLink} />
      </TableCell>
      <TableCell align="center">
        <IconButton onClick={() => handleEdit(item)}>
          <EditIcon style={{ cursor: "pointer", color: "#575252" }} />
        </IconButton>
      </TableCell>
      <TableCell align="center">
        <Button
          onClick={() => handleStatus(item.collectionId)}
          style={{
            backgroundColor: item.status ? "#1fd655" : "#c94143",
            color: "white",
          }}
          variant="contained"
        >
          {item.status ? "Active" : "Deactive"}
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CollectionRow;
