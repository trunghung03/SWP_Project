import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import logo from '../../../assets/img/logoN.png';
import ManagerSidebar from '../../../components/ManagerSidebar/ManagerSidebar.js';
import { createShell } from '../../../services/ManagerService/ManagerShellService.js';
import '../../../styles/Manager/ManagerAdd.scss';
import { getProductDetail } from '../../../services/ManagerService/ManagerProductService.js';

const ManagerAddShell = () => {
    const navigate = useNavigate();
    const [productName, setProductName] = useState("");
    const [shellData, setShellData] = useState({
        productId: '',
        amountAvailable: '',
        shellMaterialId: '',
        weight: '',
        sizes: [] // Add sizes to state
    });

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setShellData({ ...shellData, [name]: value });
        if (name === 'productId') {
            try {
                const productDetail = await getProductDetail(value);
                setProductName(productDetail.name);
            } catch (error) {
                console.error("Error fetching product detail:", error);
                setProductName(""); // Reset product name if there's an error
            }
        }
    };

    const handleSizeChange = (e) => {
        const { value } = e.target;
        const sizes = value.split(',').map(size => parseFloat(size.trim()));
        setShellData({ ...shellData, sizes });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const shellDataWithStatus = { ...shellData, status: true };
            await createShell(shellDataWithStatus);
            swal("Success", "Shell added successfully", "success");
            navigate('/manager-shell-list');
        } catch (error) {
            console.error("Error creating shell:", error);
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
            swal("Something is wrong!", "Failed to add shell. Please try again.", "error");
        }
    };

    return (
        <div className="manager_add_diamond_all_container">
            <div className="manager_add_diamond_sidebar">
                <ManagerSidebar currentPage="manager_manage_shell" />
            </div>
            <div className="manager_add_diamond_content">
                <div className="manager_add_diamond_header">
                    <img className="manager_add_diamond_logo" src={logo} alt="Logo" />
                </div>
                <hr className="manager_add_diamond_header_line" />
                <div className="manager_add_diamond_title_back">
                    <h3 className="manager_add_diamond_title">Add New Shell</h3>
                    <button className="manager_add_diamond_back_button" onClick={() => navigate('/manager-shell-list')}>
                        &lt; Back
                    </button>
                </div>
                <form className="manager_add_diamond_form" onSubmit={handleSubmit}>
                    <div className="manager_add_diamond_form_row">
                        <div className="manager_add_diamond_form_group">
                            <label>Product ID</label>
                            <input placeholder="Add product id" type="number" name="productId" value={shellData.productId} onChange={handleChange} required />
                        </div>
                        <div className="manager_add_diamond_form_group">
                            <label>Product Name</label>
                            <input type="text" name="productName" value={productName} readOnly />
                        </div>
                    </div>
                    <div className="manager_add_diamond_form_row">
                        <div className="manager_add_diamond_form_group">
                            <label>Shell Material ID</label>
                            <input placeholder="Add shell's material Id" type="number" name="shellMaterialId" value={shellData.shellMaterialId} onChange={handleChange} required />
                        </div>
                        <div className="manager_add_diamond_form_group">
                            <label>Amount Available</label>
                            <input placeholder="Add amount available" type="text" name="amountAvailable" value={shellData.amountAvailable} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="manager_add_diamond_form_row">
                        <div className="manager_add_diamond_form_group">
                            <label>Weight</label>
                            <input placeholder="Add shell's weight" type="text" name="weight" value={shellData.weight} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="manager_add_diamond_form_row">
                        <div className="manager_add_diamond_form_group">
                            <label>Sizes (comma separated)</label>
                            <input placeholder="Add sizes" type="text" name="sizes" onChange={handleSizeChange} required />
                        </div>
                    </div>
                    <button type="submit" className="manager_add_diamond_submit_button">Add</button>
                </form>
            </div>
        </div>
    );
};

export default ManagerAddShell;
