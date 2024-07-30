import React, { useEffect, useState } from "react";
import { Pagination, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import logo from "../../../assets/img/logoN.png";
import ManagerSidebar from "../../../components/ManagerSidebar/ManagerSidebar";
import {
  ShowAllCollection,
  changeStatus,
  searchCollectionById,
  updateCollectionById,
  uploadImage,
} from "../../../services/ManagerService/ManagerCollectionService";
import "../../../styles/Manager/ManagerList.scss";
import CollectionTable from "./CollectionTable";
import EditCollectionModal from "./EditCollectionModal";
import CollectionSearchBar from "./CollectionSearchBar";

const ManagerCollectionList = () => {
  const navigate = useNavigate();
  const [collectionItems, setCollectionItems] = useState([]);
  const role = localStorage.getItem("role");
  const [searchQuery, setSearchQuery] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedCollection, setEditedCollection] = useState({});
  const [isSearch, setIsSearch] = useState(false);
  const [originalCollection, setOriginalCollection] = useState({});
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("collectionId");
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ShowAllCollection(role);
        setCollectionItems(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [role]);

  const [page, setPage] = useState(1);
  const rowsPerPage = 6;

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearchKeyPress = async (e) => {
    const isInteger = (value) => /^-?\d+$/.test(value);

    if (e.key === "Enter") {
      if (isInteger(searchQuery.trim())) {
        setIsSearch(true);
        try {
          const response = await searchCollectionById(searchQuery.trim());
          setCollectionItems([response]);
          setPage(1);
        } catch (error) {
          console.error("Error fetching Collection:", error);
          swal("Collection not found!", "Please try another one.", "error");
        }
      } else {
        setIsSearch(false);
        try {
          const response = await ShowAllCollection(role);
          setCollectionItems(response);
          setPage(1);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    }
  };

  const handleStatus = async (collectionID) => {
    try {
      const collection = await searchCollectionById(collectionID);
      const collectionStatus = collection.status;
      const action = collectionStatus ? "DEACTIVATE" : "ACTIVATE";
      const swalResult = await swal({
        title: `Are you sure to ${action} this collection?`,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });

      if (swalResult) {
        await changeStatus(collectionID);
        const response = await ShowAllCollection(role);
        setCollectionItems(response);
        swal(
          `${action} successfully!`,
          "Collection status has been changed.",
          "success"
        );
      }
    } catch (error) {
      console.error("Error changing collection status:", error);
      swal(
        "Something went wrong!",
        "Failed to change collection status. Please try again.",
        "error"
      );
    }
  };

  const handleEdit = (collection) => {
    setEditMode(true);
    setEditedCollection(collection);
    setOriginalCollection(collection);
    reset(collection); // Reset form values
  };

  const handleUpdate = (updatedCollection) => {
    setCollectionItems((prevCollections) =>
      prevCollections.map((item) =>
        item.collectionId === updatedCollection.collectionId
          ? updatedCollection
          : item
      )
    );
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditedCollection(originalCollection);
  };

  const handleBack = async () => {
    try {
      const response = await ShowAllCollection(role);
      setCollectionItems(response);
      setPage(1);
      setIsSearch(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const indexOfLastOrder = page * rowsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - rowsPerPage;
  const currentOrders = collectionItems.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  return (
    <div className="manager_manage_diamond_all_container">
      <div className="manager_manage_diamond_sidebar">
        <ManagerSidebar currentPage="manager_manage_collection" />
      </div>
      <div className="manager_manage_diamond_content">
        <div className="manager_manage_diamond_header">
          <img className="manager_manage_diamond_logo" src={logo} alt="Logo" />
          <CollectionSearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearchKeyPress={handleSearchKeyPress}
          />
        </div>
        <hr className="manager_header_line" />
        <h3>List Of Collections</h3>
        <div
          className="manager_manage_diamond_create_button_section"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <button
            className="manager_manage_diamond_create_button"
            onClick={() => navigate("/manager-add-collection")}
          >
            Add new collection
          </button>
          <Stack spacing={2} direction="row">
            <Pagination
              count={Math.ceil(collectionItems.length / rowsPerPage)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        </div>

        <CollectionTable
          collections={currentOrders}
          order={order}
          orderBy={orderBy}
          onRequestSort={(event, property) => {
            const isAsc = orderBy === property && order === "asc";
            setOrder(isAsc ? "desc" : "asc");
            setOrderBy(property);
          }}
          handleEdit={handleEdit}
          handleStatus={handleStatus}
        />

        {isSearch && (
          <button className="btn btn-secondary mt-3" onClick={handleBack}>
            Back to show all collections
          </button>
        )}
      </div>

      {editMode && (
        <EditCollectionModal
          editMode={editMode}
          handleCancel={handleCancel}
          editedCollection={editedCollection}
          setCollectionItems={setCollectionItems}
          handleUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default ManagerCollectionList;
