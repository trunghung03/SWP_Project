import EditIcon from "@mui/icons-material/Edit";
import { IconButton, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as React from "react";
import { set, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  updateDiamondById,
  updateSubDiamondById,
} from "../../../../services/ManagerService/ManagerDiamondService";

export default function EditMainDiamondDialog({ diamond, setDiamondList }) {
  const theme = useTheme();
  const [diamondForm, setDiamondForm] = React.useState(diamond);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: diamondForm,
  });
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data) => {
    console.log(data);
    // handleUpdate(data);
    let submitData = {
      price: data.price,
      //   amountAvailable: data.amountAvailable,
      status: true,
    };

    toast.promise(updateDiamondById(diamond?.diamondId, submitData), {
      loading: "Updating...",
      success: () => {
        setOpen(false);
        setDiamondList((prev) =>
          prev.map((item) =>
            item.diamondId === diamond.diamondId
              ? { ...item, price: data.price }
              : item
          )
        );
        return "Diamond updated successfully";
      },
      error: (error) => {
        return error.response.data.message;
      },
    });
    // updateDiamondById(diamond.id, data);
    // setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleClickOpen} color="primary" aria-label="edit">
        <EditIcon style={{color:"#575252"}} />
      </IconButton>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Edit Diamond Price
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              disabled
              margin="dense"
              label="Shape"
              {...register("shape")}
              fullWidth
            />
            <TextField
              disabled
              margin="dense"
              label="Color"
              {...register("color")}
              fullWidth
            />
            <TextField
              disabled
              margin="dense"
              label="Clarity"
              {...register("clarity")}
              fullWidth
            />
            <TextField
              disabled
              margin="dense"
              label="Carat"
              {...register("carat")}
              fullWidth
            />
            <TextField
              disabled
              margin="dense"
              label="Cut"
              {...register("cut")}
              fullWidth
            />
            <TextField
              disabled
              margin="dense"
              label="Certificate"
              {...register("certificateScan")}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Price"
              {...register("price", {
                required: {
                  value: true,
                  message: "Price is required",
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Please enter a valid price",
                },
              })}
              fullWidth
            />
            {errors.price && <Typography variant="p" color={'red'}>{errors.price.message}</Typography>}

            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button type="submit" color="primary" disabled={errors.price}>
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
