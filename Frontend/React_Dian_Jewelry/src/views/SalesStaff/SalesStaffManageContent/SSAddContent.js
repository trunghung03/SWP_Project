import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/img/logo.png";
import "../../../styles/SalesStaff/SalesStaffManageContent/SSAddContent.scss";
import SalesStaffSidebar from "../../../components/SalesStaffSidebar/SalesStaffSidebar.js";
import { createContent } from "../../../services/SalesStaffService/SSContentService.js";

function SSContentList() {
  const navigate = useNavigate();
  const [employeeList, setEmployeeList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
  const [contentData, setContentData] = useState({
    title: "",
    content: "",
    image: "",
    tag: "",
    creator: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContentData({ ...contentData, [name]: value });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    const preview = document.getElementById('imagePreview');

    reader.onload = () => {
      setContentData({ ...contentData, image: reader.result });
      preview.src = reader.result;
      preview.style.display = 'block';
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const contentDataWithStatus = { ...contentData, status: true };
      await createContent(contentDataWithStatus);
      swal("Success", "Product added successfully", "success");
      navigate("/manager-product-list");
    } catch (error) {
      console.error("Error creating content:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
        if (error.response.data.errors) {
          for (const [key, value] of Object.entries(
            error.response.data.errors
          )) {
            console.error(`${key}: ${value}`);
          }
        }
      }
      swal(
        "Something is wrong!",
        "Failed to add new content. Please try again.",
        "error"
      );
    }
  };
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
        <div className="ss_add_content_title_back">
          <h3 className="ss_add_content_title">Add New Content</h3>
          <button
            className="ss_add_content_back_button"
            onClick={() => navigate("/sales-staff-content-list")}
          >
            &lt; Back
          </button>
        </div>
        <div className="ss_add_content_content_form">
          <form className="ss_add_form" onSubmit={handleSubmit}>
            <div className="ss_add_all_content">      
            <div className="ss_add_content_div1_div2">
              <div className="ss_add_information_div1 ">
                <div className="ss_add_content_subdiv1">
                  <label className="ss_add_content_label">Title:</label>
                  <input
                    className="ss_add_title_input"
                    type="text"
                    value={contentData.title}
                    onChange={handleChange}
                    required
                    placeholder="Enter the title"
                  />
                </div>
                <div className="ss_add_content_subdiv1">
                  <label className="ss_add_content_label">Tag:</label>
                  <select
                    value={contentData.tag}
                    onChange={handleChange}
                    required
                    className="ss_add_title_input"
                  >
                    <option value="Information">Information</option>
                    <option value="Education">Education</option>
                    <option value="Blog">Blog</option>
                  </select>
                </div>
                <div className="ss_add_content_subdiv1">
                  <label className="ss_add_content_label">
                    Write your content:
                  </label>
                  <textarea
                    className="ss_add_content_richtext"
                    name="postContent"
                    rows={4}
                    cols={40}
                  />
                </div>
              </div>
              <div className="ss_add_date_creator_div3 ">
                <div className="ss_add_subdiv3">
                  <label className="ss_add_content_label">Date:</label>
                  <input
                    className="ss_add_title_input"
                    type="date"
                    value={contentData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="ss_add_subdiv3">
                  <label className="ss_add_content_label">Creator:</label>
                  <input
                    className="ss_add_title_input"
                    value={contentData.creator}
                    onChange={handleChange}
                    required
                    placeholder="Enter the creator"
                  />
                </div>
              </div>
            </div>
            <div className="ss_add_displayed_image_div2">
              <label className="ss_add_content_label">Image:</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageUpload}
                required
              />
              <img
                id="imagePreview"
                src="#"
                alt="Image Preview"
                style={{ display: "none", marginTop: "10px", maxWidth: "100%" }}
              />
            </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SSContentList;
