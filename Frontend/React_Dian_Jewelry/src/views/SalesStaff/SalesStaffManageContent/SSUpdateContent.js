import React, { useEffect, useState, useContext } from "react";
import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../../../assets/img/logo.png";
import "../../../styles/SalesStaff/SalesStaffManageContent/SSAddContent.scss";
import SalesStaffSidebar from "../../../components/SalesStaffSidebar/SalesStaffSidebar.js";
import { updateContentById, getContentById, uploadImage } from "../../../services/SalesStaffService/SSContentService.js";
import { UserContext } from "../../../services/UserContext.js";
import RichTextEditor from "../SalesStaffManageContent/RichText.js";
import Button from "@mui/material/Button";

function SSUpdateContent() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [contentData, setContentData] = useState({
    title: "",
    tag: "",
    content: "",
    imageUrl: "",
    createdBy: "",
  });
  
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await getContentById(id);
        setContentData(response.data);
        setImagePreview(response.data.imageUrl);
      } catch (error) {
        console.error("Error fetching content:", error);
        swal("Error", "Failed to fetch content data.", "error");
      }
    };

    fetchContent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContentData({ ...contentData, [name]: value });
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      console.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // Ensure the key matches your API's expected key

    try {
      const response = await uploadImage(formData);
      const url = response.url;
      console.log("Uploaded image URL:", url);
      setContentData((prevContentData) => ({
        ...prevContentData,
        imageUrl: url,
      }));
      setImagePreview(URL.createObjectURL(file));
    } catch (error) {
      console.error("Upload error:", error);
    }
    event.target.value = null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedContentData = {
        ...contentData,
        status: true,
        employee: parseInt(user.employeeId),
      };

      await updateContentById(id, formattedContentData);
      swal("Success", "Content updated successfully", "success");
      navigate("/sales-staff-content-list");
    } catch (error) {
      console.error("Error updating content:", error.response?.data || error.message);
      swal(
        "Something is wrong!",
        `Failed to update content. Error: ${error.response?.data?.message || error.message}`,
        "error"
      );
    }
  };

  const handleRemoveImage = () => {
    setImagePreview("");
    setContentData({ ...contentData, imageUrl: "" });
  };

  useEffect(() => {
    localStorage.setItem("richTextContent", contentData.content);
    localStorage.setItem("contentData", JSON.stringify(contentData));

    const handleStorageChange = (event) => {
      if (event.key === "contentData" || event.key === "richTextContent") {
        const updatedContent =
          event.key === "contentData"
            ? JSON.parse(event.newValue).content
            : event.newValue;
        setContentData((prevData) => ({
          ...prevData,
          content: updatedContent,
        }));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [contentData]);

  return (
    <div className="ss_add_content_all_container">
      <div className="ss_add_content_sidebar">
        <SalesStaffSidebar currentPage="salesstaff_manage_blog" />
      </div>
      <div className="ss_add_content_content">
        <div className="ss_add_content_header">
          <img className="ss_add_content_logo" src={logo} alt="Logo" />
        </div>
        <hr className="ss_add_content_line"></hr>
        <h3 className="ss_add_content_title">Update Content</h3>
        <div className="ss_back_container">
          <button
            className="ss_add_content_back_button"
            onClick={() => navigate("/sales-staff-content-list")}
          >
            &lt; Back
          </button>
        </div>
        <div className="ss_add_content_content_form">
          <form className="ss_add_form" onSubmit={handleSubmit}>
            <div className="ss_add_information_div1 ">
              <div className="ss_add_more_infor">
                <div className="ss_add_title_tag">
                  <div className="ss_add_content_subdiv1">
                    <label className="ss_add_content_label">Title:</label>
                    <input
                      className="ss_add_title_input"
                      type="text"
                      name="title"
                      value={contentData.title}
                      onChange={handleChange}
                      required
                      placeholder="Enter the title"
                    />
                  </div>
                  <div className="ss_add_content_subdiv1">
                    <label className="ss_add_content_label">Tag:</label>
                    <select
                      name="tag"
                      value={contentData.tag}
                      onChange={handleChange}
                      required
                      className="ss_add_title_input"
                    >
                      <option value="" disabled>
                        Select a tag
                      </option>
                      <option value="Information">Information</option>
                      <option value="Education">Education</option>
                      <option value="Blog">Blog</option>
                    </select>
                  </div>
                </div>
                <div className="ss_add_creator_date">
                  <div className="ss_add_subdiv3">
                    <label className="ss_add_content_label">Creator:</label>
                    <input
                      name="createdBy"
                      className="ss_add_title_input"
                      type="text"
                      value={contentData.createdBy}
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="ss_add_content_subdiv1">
                <div className="ss_text_editor_nav">
                  <label className="ss_add_content_label">
                    Write your content:
                  </label>
                  <div className="ss_new_window_button">
                    <button
                      onClick={() => window.open("/rich-text-page", "_blank")}
                      className="ss-navigate-button"
                    >
                      <i className="fa fa-external-link-alt"></i> Edit in new
                      window
                    </button>
                  </div>
                </div>
                <RichTextEditor
                  className="ss_add_rich_text"
                  name="content"
                  value={contentData.content}
                  onChange={(content) => {
                    setContentData({ ...contentData, content });
                    localStorage.setItem(
                      "contentData",
                      JSON.stringify({ ...contentData, content })
                    );
                  }}
                />
              </div>
            </div>
            <div className="ss_add_displayed_image_div2">
              <label className="ss_add_content_label_image">Content avatar:</label>
              <input
                type="file"
                name="imageUrl"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={imagePreview ? true : false}
                style={{ marginLeft: '1.5%' }}
              />
              {imagePreview && (
                <div style={{ position: "relative", display: "inline-block" }}>
                  <button
                    onClick={handleRemoveImage}
                    style={{
                      display: "block",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "20px",
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      color: "black"
                    }}
                  >
                    &#x2715; {/* Unicode character for "X" */}
                  </button>
                  <div
                    className="ss_image_preview"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <img
                      src={imagePreview}
                      alt="Content avatar"
                      style={{
                        width: "87%",
                        height: "40%",
                        margin: "auto",
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            <Button
              type="submit"
              variant="contained"
              style={{
                backgroundColor: "#2244a1",
                color: "white",
                padding: "10px 20px",
                fontSize: "16px",
                borderRadius: "5px",
                marginLeft: "87%",
                marginTop: "30px",
              }}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SSUpdateContent;
