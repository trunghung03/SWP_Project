import React, { useEffect, useState, useContext } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/img/logo.png";
import "../../../styles/SalesStaff/SalesStaffManageContent/SSAddContent.scss";
import SalesStaffSidebar from "../../../components/SalesStaffSidebar/SalesStaffSidebar.js";
import { createContent } from "../../../services/SalesStaffService/SSContentService.js";
import { UserContext } from "../../../services/UserContext.js";
import RichTextEditor from "../SalesStaffManageContent/RichText.js";

function SSContentList() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [imageBase64, setImageBase64] = useState('');
  const employeeId = localStorage.getItem('employeeId');
  const [contentData, setContentData] = useState({
      title: "",
      content: window.location.state?.updatedContent || localStorage.getItem("richTextContent") || "",
      image: "",
      tag: "",
      date: "",
      creator: employeeId,
      status: "True",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContentData({ ...contentData, [name]: value });
  };

  const handleImageUpload = (event) => {
    if (event.target.files.length === 0) {
      console.error("No file selected.");
      return;
    }

    const file = event.target.files[0];
    const reader = new FileReader();
    const preview = document.getElementById("imagePreview");

    if (!file.type.startsWith('image/')) {
      console.error("Selected file is not an image.");
      return;
    }

    reader.onload = () => {
      // Update the state with the base64 string
      setImageBase64(reader.result);
      // Update contentData state with the image
      setContentData((prevData) => ({ ...prevData, image: reader.result }));
      // Update the preview
      preview.src = reader.result;
      preview.style.display = "block";
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const contentDataWithStatus = { ...contentData, status: true };
      await createContent(contentDataWithStatus);
      swal("Success", "Content added successfully", "success");
      navigate("/sales-staff-content-list");
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

  useEffect(() => {
    // Update local storage when contentData changes
    localStorage.setItem("richTextContent", contentData.content);
    localStorage.setItem('contentData', JSON.stringify(contentData));

    // Handle external changes to contentData in local storage
    const handleStorageChange = (event) => {
      if (event.key === 'contentData' || event.key === 'richTextContent') {
        const updatedContent = event.key === 'contentData' ? JSON.parse(event.newValue).content : event.newValue;
        setContentData(prevData => ({ ...prevData, content: updatedContent }));
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('storage', handleStorageChange);
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
                      <option value="Information">Information</option>
                      <option value="Education">Education</option>
                      <option value="Blog">Blog</option>
                    </select>
                  </div>
                  <div className="ss_add_content_subdiv1">
                   <div className="ss_text_editor_nav">
                   <label className="ss_add_content_label">
                      Write your content:
                    </label>
                    <button
                      onClick={() => window.open("/rich-text-page", "_blank")}
                      className="ss-navigate-button"
                    >
                      <i className="fa fa-external-link-alt"></i> Edit in new window
                    </button>
                   </div>
                    <RichTextEditor
                      className="ss_add_rich_text"
                      name="content"
                      value={contentData.content}
                      onChange={(content) => {
                        setContentData({ ...contentData, content });
                        localStorage.setItem('contentData', JSON.stringify({ ...contentData, content }));
                      }}
                    />                   
                  </div>
                </div>
                <div className="ss_add_date_creator_div3 ">
                  <div className="ss_add_subdiv3">
                    <label className="ss_add_content_label">Date:</label>
                    <input
                      name="date"
                      className="ss_add_title_input"
                      type="date"
                      value={contentData.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="ss_add_subdiv3">
                    <label className="ss_add_content_label">Creator:</label>
                    <div className="ss_add_title_input">
                      {user.lastName}                      
                    </div>
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
                  style={{
                    display: "none",
                    marginTop: "10px",
                    maxWidth: "100%",
                  }}
                />
              </div>
            </div>
            <button type="submit" className="ss_add_content_submit_button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SSContentList;
