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
  Input,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { UploadOutlined } from "@ant-design/icons";
import { Button as AntdButton, Upload, message } from "antd";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  uploadImage,
  updateCollectionById,
} from "../../../services/ManagerService/ManagerCollectionService";
import { toast } from "sonner";

const EditCollectionModal = ({
  editMode,
  handleCancel,
  editedCollection,
  setCollectionItems,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(editMode);
  const [imagePreview, setImagePreview] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(editedCollection.imageLink || "");
  const [collectionId, setCollectionId] = useState(editedCollection.collectionId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: editedCollection,
  });

  useEffect(() => {
    // console.log("Image preview:", editedCollection?.imageLink);
    console.log("Edited collection:", editedCollection);
    if (open === true) {
      setOpen(true);
      reset(editedCollection);
      setCollectionId(editedCollection.collectionId);
      setFileList([]);
      if (editedCollection.imageLink) {
        setImagePreview(editedCollection?.imageLink);
      } else {
        setImagePreview(null);
      }
    }
  }, [open, reset, editedCollection]);

  const handleClose = () => {
    setOpen(false);
    handleCancel();
  };

  const onSubmit = async (data) => {
    setLoading(true);

    if (fileList.length > 0) {
      const file = fileList[0].originFileObj;
      const formData = new FormData();
      formData.append("file", file);


      toast.promise(uploadImage(formData), {
        loading: "Uploading...",
        success: (response) => {
          const url = response.url;
          console.log("Upload success:", url);
          setImageUrl(url);
          console.log("Edited collection:", editedCollection);
          let updatedCollection = {
            // ...editedCollection,
            name: data.name,
            description: data.description, 
            status: data.status,
            collectionImage: response?.url ?? imagePreview,
          };
          console.log("Updated collection:", updatedCollection);
          console.log("Data:", data);
           toast.promise(
            updateCollectionById(collectionId, updatedCollection),
            {
              loading: "Updating...",
              success: () => {
                setOpen(false);
                updatedCollection= {...updatedCollection, collectionId: collectionId}
                updatedCollection= {...updatedCollection, imageLink: response?.url ?? imagePreview}
                setCollectionItems((prev) =>
                  prev.map((item) =>
                    item.collectionId === editedCollection.collectionId
                      ? updatedCollection
                      : item
                  )
                );
                return "Collection updated successfully";
              },
              error: (error) => {
                console.error("Update error:", error);
                return "Failed to update collection";
              },
            }
          );
          // return "Image uploaded successfully";
        },
        error: (error) => {
          console.error("Upload error:", error);
          return "Failed to upload image";
        },
      });
      

      // uploadImage(formData)
      //   .then((response) => {
      //     const url = response.url;
      //     console.log("Upload success:", url);
      //     setImageUrl(url);
      //     console.log("Edited collection:", editedCollection);
      //     const updatedCollection = {
      //       // ...editedCollection,
      //       name: data.name,
      //       description: data.description,
      //       status: data.status,
      //       collectionImage: response.url ?? imagePreview,
      //     };
      //     console.log("Updated collection:", updatedCollection);

      //     toast.promise(
      //       updateCollectionById(editedCollection?.collectionId, updatedCollection),
      //       {
      //         loading: "Updating...",
      //         success: () => {
      //           setOpen(false);
      //           setCollectionItems((prev) =>
      //             prev.map((item) =>
      //               item.collectionId === editedCollection.collectionId
      //                 ? updatedCollection
      //                 : item
      //             )
      //           );
      //           return "Collection updated successfully";
      //         },
      //         error: (error) => {
      //           console.error("Update error:", error);
      //           return "Failed to update collection";
      //         },
      //       }
      //     );
      //   })
      //   .catch((error) => {
      //     console.error("Upload error:", error);
      //   });
    }
    setLoading(false);
    handleClose();
  };

  const handleImageChange = ({ fileList: newFileList }) => {
    setFileList(newFileList.slice(-1)); // Keep only the last uploaded file
    if (newFileList.length > 0) {
      const file = newFileList[0].originFileObj;
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const props = {
    beforeUpload: (file) => {
      const isPNG = file.type === "image/png";
      if (!isPNG) {
        message.error(`${file.name} is not a png file`);
      }
      return isPNG || Upload.LIST_IGNORE;
    },
    onChange: handleImageChange,
    fileList,
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="edit-collection-modal-title"
    >
      <DialogTitle id="edit-collection-modal-title">
        Edit Collection Information
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            margin="dense"
            label="Name"
            {...register("name", { required: "Name is required" })}
            fullWidth
            defaultValue={editedCollection.name}
            error={!!errors.name}
            helperText={errors.name?.message}
            multiline
            maxRows={4}
          />
          <TextField
            margin="dense"
            label="Description"
            {...register("description", {
              required: "Description is required",
            })}
            fullWidth
            defaultValue={editedCollection.description}
            error={!!errors.description}
            helperText={errors.description?.message}
            multiline
            maxRows={4}
          />
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            margin={2}
          >
            {imagePreview && (
              <Box marginBottom={2}>
                <img
                  loading="lazy"
                  src={imagePreview}
                  alt="Collection"
                  style={{ width: "100%", maxHeight: 200, objectFit: "cover" }}
                />
              </Box>
            )}
            <Upload {...props}>
              <AntdButton icon={<UploadOutlined />}>
                Upload image only
              </AntdButton>
            </Upload>
          </Box>
          <Input type="hidden" {...register('collectionId')}></Input>
          <TextField
            select
            margin="dense"
            label="Status"
            {...register("status", { required: "Status is required" })}
            fullWidth
            defaultValue={editedCollection.status}
            SelectProps={{ native: true }}
            error={!!errors.status}
            helperText={errors.status?.message}
          >
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
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

export default EditCollectionModal;
