import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import logo from '../../../assets/img/logoN.png';
import ManagerSidebar from '../../../components/ManagerSidebar/ManagerSidebar.js';
import '../../../styles/Manager/ManagerAdd.scss';
import { createProduct, getAllCategories, getAllCollection, getProductByName ,uploadImage } from '../../../services/ManagerService/ManagerProductService.js';

const ManagerAddProduct = () => {
    const navigate = useNavigate();
    const [productData, setProductData] = useState({
        productCode: '',
        name: '',
        price: '',
        description: '',
        mainDiamondId: '',
        laborCost: '',
        imageLinkList: '',
        mainDiamondAmount: '',
        subDiamondAmount: '',
        shellAmount: '',
        collectionId: '',
        categoryId: ''
    });

    const [collections, setCollections] = useState([]);
    const [categories, setCategories] = useState([]);
    const [productList,setProductList] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);


    useEffect(() => {
        const fetchCollectionsAndCategories = async () => {
            try {
                const [collectionsResponse, categoriesResponse] = await Promise.all([
                    getAllCollection(),
                    getAllCategories()
                ]);

                setCollections(collectionsResponse || []);
                setCategories(categoriesResponse || []);
            } catch (error) {
                console.error("Error fetching collections or categories:", error);
            }
        };

        fetchCollectionsAndCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
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
            formData.append("file", file);

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
            const productDTO = {
                productCode: productData.productCode,
                name: productData.name,
                price: parseFloat(productData.price),
                laborPrice: parseFloat(productData.laborCost), // Ensure correct field name and type
                description: productData.description,
                mainDiamondId: parseInt(productData.mainDiamondId),
                subDiamondId: parseInt(productData.subDiamondId), // Ensure subDiamondId is parsed as an integer
                mainDiamondAmount: parseInt(productData.mainDiamondAmount),
                subDiamondAmount: parseInt(productData.subDiamondAmount),
                shellAmount: parseFloat(productData.shellAmount),
                imageLinkList: imageUrls.join(';'),
                collectionId: parseInt(productData.collectionId),
                categoryId: parseInt(productData.categoryId),
                status: true
            };
            console.log(productDTO.imageLinkList);
            await createProduct(productDTO);
            swal("Success", "Product added successfully", "success");
            navigate('/manager-product-list');
        } catch (error) {
            console.error("Error creating product:", error);
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
            swal("Something is wrong!", "Failed to add product. Please try again.", "error");
        }
    };
    

    return (
        <div className="manager_add_diamond_all_container">
            <div className="manager_add_diamond_sidebar">
                <ManagerSidebar currentPage="manager_manage_product" />
            </div>
            <div className="manager_add_diamond_content">
                <div className="manager_add_diamond_header">
                    <img className="manager_add_diamond_logo" src={logo} alt="Logo" />
                </div>
                <hr className="manager_add_diamond_header_line" />
                <div className="manager_add_diamond_title_back">
                    <h3 className="manager_add_diamond_title">Add New Product</h3>
                    <button className="manager_add_diamond_back_button" onClick={() => navigate('/manager-product-list')}>
                        &lt; Back
                    </button>
                </div>
                <form className="manager_add_diamond_form" onSubmit={handleSubmit}>
                    <div className="manager_add_diamond_form_row">
                        <div className="manager_add_diamond_form_group">
                            <label>Code</label>
                            <input type="text" name="productCode" placeholder='PRODxxx' value={productData.productCode} onChange={handleChange} required />
                        </div>
                        <div className="manager_add_diamond_form_group">
                            <label>Name</label>
                            <input type="text" name="name" placeholder="Input product's name" value={productData.name} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="manager_add_diamond_form_row">
                        <div className="manager_add_diamond_form_group">
                            <label>Sale Price</label>
                            <input type="number" name="price" placeholder="Input product's sale price" value={productData.price} onChange={handleChange} required />
                        </div>
                        <div className="manager_add_diamond_form_group">
                            <label>Labor Cost</label>
                            <input type="number" name="laborCost" placeholder="Input product's labor cost" value={productData.laborCost} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="manager_add_diamond_form_row">
                        <div className="manager_add_diamond_form_group">
                            <label>Main Diamond ID</label>
                            <input type="number" name="mainDiamondId" placeholder="Input product's main diamond id" value={productData.mainDiamondId} onChange={handleChange} required />
                        </div>
                        <div className="manager_add_diamond_form_group">
                            <label>Shell Weight</label>
                            <input type="text" name="shellAmount" placeholder="Input product's shell weight (gram)" value={productData.shellAmount} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="manager_add_diamond_form_row">
                        <div className="manager_add_diamond_form_group">
                            <label>Main Diamond Quantity</label>
                            <input type="text" name="mainDiamondAmount" placeholder="Input quantity of main diamond" value={productData.mainDiamondAmount} onChange={handleChange} required />
                        </div>
                        <div className="manager_add_diamond_form_group">
                            <label>Sub Diamond Quantity</label>
                            <input type="text" name="subDiamondAmount" placeholder="Input quantity of sub diamond" value={productData.subDiamondAmount} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="manager_add_diamond_form_row">
                        <div className="manager_add_diamond_form_group">
                            <label>Collection Name</label>
                            <div className="scrollable-select">
                                <select
                                    name="collectionId"
                                    value={productData.collectionId}
                                    onChange={handleChange}
                                    required
                                    style={{ maxHeight: '100px', overflowY: 'auto', width: '200px'}}
                                >
                                    <option value="">Select Collection</option>
                                    {collections.map((collection) => (
                                        <option key={collection.id} value={collection.id}>{collection.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="manager_add_diamond_form_group">
                            <label>Category Name</label>
                            <div className="scrollable-select">
                                <select
                                    name="categoryId"
                                    value={productData.categoryId}
                                    onChange={handleChange}
                                    required
                                    style={{ maxHeight: '100px', overflowY: 'auto' }}
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="manager_add_diamond_form_group">
                        <label>Description</label>
                        <input type="text" name="description" placeholder="Input product's description" value={productData.description} onChange={handleChange} required />
                    </div>
                    <div className="manager_add_diamond_form_group">
                        <label>Image</label>
                        <input type="file" name="image" accept="image/*" onChange={handleImageUpload} multiple />
                    </div>
                    <div className="ss_add_displayed_image_div2">
                        {imagePreviews.map((preview, index) => (
                            <div key={index}>
                                <button
                                    onClick={() => {
                                        setImagePreviews(imagePreviews.filter((_, i) => i !== index));
                                        setImageUrls(imageUrls.filter((_, i) => i !== index));
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
                                    &#x2715;
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
                                        src={preview}
                                        alt="Product"
                                        style={{
                                            width: "87%",
                                            height: "40%",
                                            margin: "auto",
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <button type="submit" className="manager_add_diamond_submit_button">Add</button>
                </form>
            </div>
        </div>
    );
};

export default ManagerAddProduct;
