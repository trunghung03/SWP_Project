import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/img/logo.png';
import '../../../styles/SalesStaff/SalesStaffManageContent/SSContentList.scss';
import SalesStaffSidebar from '../../../components/SalesStaffSidebar/SalesStaffSidebar.js';
import { getContentList, getContentByTitle, deleteContentById } from '../../../services/SalesStaffService/SSContentService.js';

// Content card
const SSContentCard = ({ id, title, createdBy, date, image, tag, onDelete }) => {
  const handleDeleteClick = () => {
    swal({
      title: "Are you sure to remove this blog?",
      text: "This action can not be undone",
      icon: "warning",
      buttons: {
        cancel: "Cancel",
        confirm: {
          text: "Confirm",
          value: "confirm",
        }
      },
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        onDelete(id);
      }
    });
  };

  return (
    <div className="ss_manage_content_content_card" style={{ cursor: 'pointer' }}>
      <img src={image} alt={title} />
      <div className="ss_manage_content_content_info">
        <p className="ss_manage_content_creator">Created by: {createdBy}</p>
        <h6 className="ss_manage_content_content_title">{title}</h6>
        <div className="ss_manage_content_content_tags">
          <span>#{tag}</span>
        </div>
        <p className="ss_manage_content_content_date">{new Date(date).toLocaleDateString()}</p>
      </div>
      <div className="ss_manage_content_content_actions">
        <i className="fas fa-pen"></i>
        <i className="fas fa-trash" onClick={handleDeleteClick}></i>
      </div>
    </div>
  );
};

function SSContentList() {
  const [contents, setContents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getContentList();
        setContents(response.data);
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearchKeyPress = async (e) => {
    if (e.key === 'Enter') {
      if (searchQuery.trim()) {
        try {
          const response = await getContentByTitle(searchQuery.trim());
          setContents([response.data]);
        } catch (error) {
          console.error("Error fetching content:", error);
          swal("Blog not found!", "Please try another title.", "error");
        }
      } else {
        try {
          const response = await getContentList();
          setContents(response.data);
        } catch (error) {
          console.error("Error fetching content:", error);
        }
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteContentById(id);
      setContents(contents.filter(content => content.id !== id));
      swal("Remove successfully!", "The blog has been deleted.", "success");
    } catch (error) {
      console.error("Error deleting content:", error);
      swal("Something is wrong!", "Failed to delete the blog. Please try again.", "error");
    }
  };

  return (
    <div className="ss_manage_content_all_container">
      <div className="ss_manage_content_sidebar">
        <SalesStaffSidebar currentPage="salesstaff_manage_blog" />
      </div>
      <div className="ss_manage_content_content">
        <div className="ss_manage_content_header">
          <img className="ss_manage_content_logo" src={logo} alt="Logo" />
          <div className="ss_manage_content_search_section">
            <input
              type="text"
              className="ss_manage_content_search_bar"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearchKeyPress}
            />
          </div>
        </div>
        <hr className="ss_manage_content_line"></hr>
        <div className="ss_manage_content_create_button_section">
          <button className="ss_manage_content_create_button" onClick={() => navigate('/salesStaffAddContent')}>Create new blog</button>
        </div>
        <div className="ss_manage_content_content_list">
          {contents.map((content) => (
            <SSContentCard key={content.id} {...content} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SSContentList;
