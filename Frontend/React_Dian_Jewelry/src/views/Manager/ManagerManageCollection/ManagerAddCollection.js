import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import logo from '../../../assets/img/logoN.png';
import ManagerSidebar from '../../../components/ManagerSidebar/ManagerSidebar.js';
import { addCollection,uploadImage } from '../../../services/ManagerService/ManagerCollectionService.js';
import '../../../styles/Manager/ManagerAdd.scss';

const ManagerAddCollection = () => {
    const navigate = useNavigate();
    const [collectionData, setCollectionData] = useState({
        collectionId: '',
        name: '',
        description: '',
        imageLink: ''
    });
    const [imageUrls, setImageUrls] = useState([]); // Array to store individual image URLs
    const [imagePreviews, setImagePreviews] = useState([]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setCollectionData({ ...collectionData, [name]: value });
    };

    const handleImageUpload = async (event) => {
        const files = event.target.files;
        if (!files.length) {
            console.error("No file selected.");
            return;
        }

        const newImageUrls = [];
        const newImagePreviews = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const formData = new FormData();
            formData.append("file", file); // Ensure the key matches your API's expected key

            try {
                const response = await uploadImage(formData);
                const url = response.url;
                console.log("Uploaded image URL:", url);
                newImageUrls.push(url);
                newImagePreviews.push(URL.createObjectURL(file));
            } catch (error) {
                console.error("Upload error:", error);
            }
        }

        setImageUrls((prevUrls) => [...prevUrls, ...newImageUrls]);
        setImagePreviews((prevPreviews) => [...prevPreviews, ...newImagePreviews]);

        event.target.value = null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Concatenate image URLs into a single string
            const imageLinksString = imageUrls.join(';');
            
            // Update the collectionData with the concatenated image URLs
            const collectionDataWithImages = { 
                ...collectionData, 
                imageLink: imageLinksString, // Update the imageLink field
                status: true 
            };

            await addCollection(collectionDataWithImages);
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
                            <input placeholder="Enter collection's id" type="text" name="collectionId" value={collectionData.collectionId} onChange={handleChange} required />
                        </div>
                        <div className="manager_add_diamond_form_group">
                            <label>Name</label>
                            <input type="text" placeholder="Enter collection's name" name="name" value={collectionData.name} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="manager_add_diamond_form_group">
                        <label>Description</label>
                        <input type="text" placeholder="Enter collection's description" name="description" value={collectionData.description} onChange={handleChange} required />
                    </div>
                    <div className="manager_add_collection_form_group">
                        <label>Images</label>
                        <input type="file" name="images" accept="image/*" multiple onChange={handleImageUpload} />
                        <div className="image_previews">
                            {imagePreviews.map((preview, index) => (
                                <div key={index} className="image_preview_container">
                                    <button
                                        onClick={() => {
                                            const updatedImagePreviews = imagePreviews.filter((_, i) => i !== index);
                                            const updatedImageUrls = imageUrls.filter((_, i) => i !== index);
                                            setImagePreviews(updatedImagePreviews);
                                            setImageUrls(updatedImageUrls);
                                        }}
                                        style={{
                                            display: "block",
                                            marginTop: "1%",
                                            background: "none",
                                            border: "none",
                                            cursor: "pointer",
                                            fontSize: "20px",
                                            marginLeft: "90%"
                                        }}
                                    >
                                        &#x2715; {/* Unicode character for "X" */}
                                    </button>
                                    <img
                                        src={preview}
                                        alt="Collection avatar"
                                        style={{
                                            width: "87%",
                                            height: "40%",
                                            margin: "auto",
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <button type="submit" className="manager_add_diamond_submit_button">Add</button>
                </form>
            </div>
        </div>
    );
};

export default ManagerAddCollection;
