import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button as AntdButton, Upload, message } from "antd";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { toast } from "sonner";
import { uploadImage } from "../../../services/ManagerService/ManagerCollectionService";

const EditModal = ({ editMode, handleCancel, editedProduct, setEditedProduct, handleUpdate }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(editMode);
  const [imagePreview, setImagePreview] = useState(
    editedProduct.imageLinkList ? editedProduct.imageLinkList.split(';') : []
  );
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      ...editedProduct,
      status: editedProduct.status ? "isDisplayed" : "notDisplayed"
    },
  });

  useEffect(() => {
    if (editMode) {
      setOpen(true);
      reset({
        ...editedProduct,
        status: editedProduct.status ? "isDisplayed" : "notDisplayed"
      });
      setFileList([]);
      if (editedProduct.imageLinkList) {
        setImagePreview(editedProduct.imageLinkList.split(';'));
      } else {
        setImagePreview([]);
      }
    }
  }, [editMode, reset, editedProduct]);

  const handleClose = () => {
    setOpen(false);
    handleCancel();
  };

  const handleImageChange = async ({ fileList: newFileList }) => {
    if (imagePreview.length + newFileList.length > 4) {
      toast.error("You can only upload up to 4 images. Please delete an existing image to upload a new one.");
      return;
    }
  
    setLoading(true);
  
    const uploadPromises = newFileList.map(file => {
      const formData = new FormData();
      formData.append("file", file.originFileObj);
      return uploadImage(formData);
    });
  
    try {
      const uploadedImages = await Promise.all(uploadPromises);
      const uploadedUrls = uploadedImages.map(response => response.url);
  
      setImagePreview(prev => [...prev, ...uploadedUrls]);
      setFileList(newFileList);
    } catch (error) {
      console.error("Upload error:", error);
      message.error("Failed to upload image");
    } finally {
      setLoading(false);
    }
  };
  
  const handleImageDelete = (index) => {
    setImagePreview((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    setLoading(true);

    const updatedImageLinks = imagePreview.join(";");

    const updatedProduct = {
      ...editedProduct,
      ...data,
      imageLinkList: updatedImageLinks,
      status: data.status === "isDisplayed",
    };

    toast.promise(handleUpdate(updatedProduct), {
      loading: "Updating...",
      success: () => {
        setOpen(false);
        setEditedProduct(updatedProduct);
        return "Product updated successfully";
      },
      error: (error) => {
        console.error("Update error:", error);
        return "Failed to update product";
      },
    });

    setLoading(false);
    handleClose();
  };

  const uploadProps = {
    beforeUpload: (file) => {
      const isPNG = file.type === "image/png";
      if (!isPNG) {
        message.error(`${file.name} is not a png file`);
      }
      return isPNG || Upload.LIST_IGNORE;
    },
    onChange: handleImageChange,
    fileList,
    multiple: true,
  };
  

  useEffect(() => {
    return () => {
      // Clean up the object URLs to avoid memory leaks
      imagePreview.forEach(url => URL.revokeObjectURL(url));
    };
  }, [imagePreview]);

  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="edit-product-modal-title">
      <DialogTitle id="edit-product-modal-title">Edit Product Information</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            margin="dense"
            label="Name"
            {...register("name", { required: "Name is required", maxLength: 100 })}
            fullWidth
            defaultValue={editedProduct.name}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            margin="dense"
            label="Description"
            {...register("description", { maxLength: 255 })}
            fullWidth
            defaultValue={editedProduct.description}
            error={!!errors.description}
            helperText={errors.description?.message}
            multiline
            maxRows={4}
          />
          <TextField
            margin="dense"
            label="Labor Price"
            {...register("laborPrice", { required: "Labor Price is required" })}
            fullWidth
            defaultValue={editedProduct.laborPrice}
            error={!!errors.laborPrice}
            helperText={errors.laborPrice?.message}
          />
          <Box display="flex" flexDirection="column" alignItems="center" margin={2}>
            {imagePreview?.length > 0 && (
              <Box marginBottom={2} display="flex" flexDirection="column" alignItems="center">
                {imagePreview.map((img, index) => (
                  <div key={index} style={{ position: 'relative', marginBottom: 10 }}>
                    <img src={img} alt={`Preview ${index}`} style={{ width: 200, height: 200, objectFit: "cover" }} />
                    <IconButton
                      style={{ position: 'absolute', top: 0, right: 0 }}
                      onClick={() => handleImageDelete(index)}
                    >
                      <DeleteOutlined />
                    </IconButton>
                  </div>
                ))}
              </Box>
            )}
            <Upload {...uploadProps}>
              <AntdButton icon={<UploadOutlined />}>Upload image only</AntdButton>
            </Upload>
          </Box>
          <TextField
            margin="dense"
            label="Collection ID"
            {...register("collectionId")}
            fullWidth
            defaultValue={editedProduct.collectionId}
          />
          <TextField
            margin="dense"
            label="Category ID"
            {...register("categoryId", { required: "Category ID is required" })}
            fullWidth
            defaultValue={editedProduct.categoryId}
            error={!!errors.categoryId}
            helperText={errors.categoryId?.message}
          />
          <TextField
            select
            margin="dense"
            label="Status"
            {...register("status", { required: "Status is required" })}
            fullWidth
            defaultValue={editedProduct.status ? "isDisplayed" : "notDisplayed"}
            SelectProps={{ native: true }}
            error={!!errors.status}
            helperText={errors.status?.message}
          >
            <option value="isDisplayed">Is Displayed</option>
            <option value="notDisplayed">Not Displayed</option>
          </TextField>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : "Confirm"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
