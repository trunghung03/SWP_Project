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
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEffect } from "react";

export default function UpdateshellMaterial({ shellMaterial, setshellMaterialList }) {
  const theme = useTheme();
  const [shellMaterialForm, setshellMaterialForm] = React.useState(shellMaterial);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: shellMaterialForm,
  });
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = React.useState(false);
  

  const handleClickOpen = () => {
    console.log("shellMaterial: ", shellMaterialForm);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    setshellMaterialForm(shellMaterial);
  }, [shellMaterial]);

  const onSubmit = (data) => {
    console.log(data);
    // handleUpdate(data);
    let submitData = {
      price: data.price,
      amountAvailable: data.amountAvailable,
      status: true,
    };

    // toast.promise(updateSubshellMaterialById(shellMaterial?.subshellMaterialId, submitData), {
    //   loading: "Updating...",
    //   success: () => {
    //     setOpen(false);
    //     setshellMaterialList((prev) =>
    //       prev.map((item) =>
    //         item.subshellMaterialId === shellMaterial.subshellMaterialId
    //           ? { ...item, price: data.price, amountAvailable: data.amountAvailable }
    //           : item
    //       )
    //     );
    //     return "shellMaterial updated successfully";
    //   },
    //   error: (error) => {
    //     return "Failed to update shellMaterial";
    //   },
    // });
    // updateshellMaterialById(shellMaterial.id, data);
    // setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleClickOpen} color="primary" aria-label="edit">
        <EditIcon style={{color:"#575252"}}/>
      </IconButton>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Edit Sub shellMaterial Attributes
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
              margin="dense"
              label="Price"
              {...register("price", {
                required: {
                  value: true,
                  message: "Price is required",
                },
                min: {
                  value: 1,
                  message: "Price should be greater than 0",
                },
              })}
              fullWidth
            />
            {errors.price && (
              <Typography variant="p" color={"red"}>
                {errors.price.message}
              </Typography>
            )}
            <TextField
              margin="dense"
              label="Amount Available"
              {...register("amountAvailable", {
                max: {
                  value: 1000,
                  message: "Amount available should be less than 1000",
                },
                required: {
                  value: true,
                  message: "Quantity is required",
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Please enter a valid amount",
                },
              })}
              fullWidth
            />
            {errors.amountAvailable && (
              <Typography variant="p" color={"red"}>
                {errors.amountAvailable.message}
              </Typography>
            )}

            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                disabled={errors.price && errors.amountAvailable}
              >
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

// EditDialog.propTypes = {
//   shellMaterial: PropTypes.object.isRequired,
//   handleUpdate: PropTypes.func.isRequired,
// };
