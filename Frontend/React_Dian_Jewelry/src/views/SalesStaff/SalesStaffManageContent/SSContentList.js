import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import logo from "../../../assets/img/logoN.png";
import '../../../styles/SalesStaff/SalesStaffManageContent/SSContentList.scss';
import SalesStaffSidebar from '../../../components/SalesStaffSidebar/SalesStaffSidebar.js';
import { getContentList, getContentByTitle, deleteContentById } from '../../../services/SalesStaffService/SSContentService.js';

// Content card
const SSContentCard = ({ articleID, title, createdBy, date, image, tag, onDelete, onUpdate }) => {
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
        onDelete(articleID);
      }
    });
  };

  const handleUpdateClick = () => {
    onUpdate(articleID);
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
        <i className="fas fa-pen" onClick={handleUpdateClick} style={{ color: '#69706e' }}></i>
        <i className="fas fa-trash" onClick={handleDeleteClick} style={{ color: '#69706e' }}></i>
      </div>
    </div>
  );
};

function SSContentList() {
  const [contents, setContents] = useState([]);
  const [fullContents, setFullContents] = useState([]); // To store the full list of contents
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await getContentList();
      setContents(response.data);
      setFullContents(response.data); // Save the full list
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchKeyPress = async (e) => {
    if (e.key === 'Enter') {
      if (searchQuery.trim()) {
        try {
          const response = await getContentByTitle(searchQuery.trim());
          if (response.data.length > 0) {
            setContents(response.data);
            setIsSearch(true);
          } else {
            swal("Blog not found!", "Please try another title.", "error");
            setContents(fullContents); // Reset to full list if search yields no results
          }
        } catch (error) {
          console.error("Error fetching content:", error);
          swal("Blog not found!", "Please try another title.", "error");
          setContents(fullContents); // Reset to full list on error
        }
      } else {
        setContents(fullContents); // Reset to full list if search query is empty
      }
    }
  };

  const handleBackClick = () => {
    setSearchQuery("");
    setIsSearch(false);
    setContents(fullContents); // Reset to full list
  };

  const handleDelete = async (id) => {
    try {
      await deleteContentById(id);
      swal("Remove successfully!", "The blog has been deleted.", "success");
      fetchData(); // Re-fetch the content list after deletion
    } catch (error) {
      console.error("Error deleting content:", error);
      swal("Something is wrong!", "Failed to delete the blog. Please try again.", "error");
    }
  };

  const handleUpdate = (id) => {
    navigate(`/sales-staff-update-content/${id}`);
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
              style={{width: '140px'}}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={handleSearchKeyPress}
            />
          </div>
        </div>
        <hr className="ss_manage_content_line"></hr>
        <div className="ss_manage_content_create_button_section">
          <button className="ss_manage_content_create_button" onClick={() => navigate('/sales-staff-add-content')}>Create new blog</button>
        </div>
        <div className="ss_manage_content_content_list">
          {contents.map((content) => (
            <SSContentCard key={content.articleID} {...content} onDelete={handleDelete} onUpdate={handleUpdate} />
          ))}
          
        </div>
        {isSearch && (
          <button className="SS_back_button" onClick={handleBackClick}>
            Back to Content List
          </button>
        )}
      </div>
    </div>
  );
}

export default SSContentList;
