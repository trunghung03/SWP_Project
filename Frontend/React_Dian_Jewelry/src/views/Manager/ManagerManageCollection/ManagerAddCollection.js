import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import logo from '../../../assets/img/logoN.png';
import ManagerSidebar from '../../../components/ManagerSidebar/ManagerSidebar.js';
import { addCollection } from '../../../services/ManagerService/ManagerCollectionService.js';
import '../../../styles/Manager/ManagerAdd.scss';

const ManagerAddCollection = () => {
    const navigate = useNavigate();
    const [collectionData, setCollectionData] = useState({
        collectionId: '',
        name: '',
        description: '',
        imageLink: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCollectionData({ ...collectionData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const collectionDataWithStatus = { ...collectionData, status: true };
            await addCollection(collectionDataWithStatus);
            swal("Success", "Collection added successfully", "success");
            navigate('/manager-collection-list');
        } catch (error) {
            console.error("Error creating collection:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                console.error("Response headers:", error.response.headers);
                if (error.response.data.errors) {
                    for (const [key, value] of Object.entries(error.response.data.errors)) {
                        console.error(`${key}: ${value}`);
                    }
                }
            }
            swal("Something is wrong!", "Failed to add collection. Please try again.", "error");
        }
    };

    return (
        <div className="manager_add_diamond_all_container">
            <div className="manager_add_diamond_sidebar">
                <ManagerSidebar currentPage="manager_manage_collection" />
            </div>
            <div className="manager_add_diamond_content">
                <div className="manager_add_diamond_header">
                    <img className="manager_add_diamond_logo" src={logo} alt="Logo" />
                </div>
                <hr className="manager_add_diamond_header_line" />
                <div className="manager_add_diamond_title_back">
                    <h3 className="manager_add_diamond_title">Add New Collection</h3>
                    <button className="manager_add_diamond_back_button" onClick={() => navigate('/manager-collection-list')}>
                        &lt; Back
                    </button>
                </div>
                <form className="manager_add_diamond_form" onSubmit={handleSubmit}>
                    <div className="manager_add_diamond_form_row">
                        <div className="manager_add_diamond_form_group">
                            <label>Collection ID</label>
                            <input type="text" name="collectionId" value={collectionData.collectionId} onChange={handleChange} required />
                        </div>
                        <div className="manager_add_diamond_form_group">
                            <label>Name</label>
                            <input type="text" name="name" value={collectionData.name} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="manager_add_diamond_form_group">
                        <label>Description</label>
                        <input type="text" name="description" value={collectionData.description} onChange={handleChange} required />
                    </div>
                    <div className="manager_add_diamond_form_group">
                        <label>Image Link</label>
                        <input type="text" name="imageLink" value={collectionData.imageLink} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="manager_add_diamond_submit_button">Add</button>
                </form>
            </div>
        </div>
    );
};

export default ManagerAddCollection;
