import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import logo from '../../../assets/img/logo.png';
import ManagerSidebar from '../../../components/ManagerSidebar/ManagerSidebar.js';
import { createDiamond } from '../../../services/ManagerService/ManagerDiamondService.js';
import '../../../styles/Manager/ManagerManageDiamond/ManagerAddDiamond.scss';

const ManagerAddProduct = () => {
    const navigate = useNavigate();
    const [productData, setProductData] = useState({
        productCode: '',
        name: '',
        price: '',
        description: '',
        mainDiamondId: '',
        chargeUp: '',
        amountAvailable: '',
        certificateScan: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDiamondData({ ...diamondData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const diamondDataWithStatus = { ...diamondData, status: true };
            await createDiamond(diamondDataWithStatus);
            swal("Success", "Diamond added successfully", "success");
            navigate('/managerDiamondList');
        } catch (error) {
            console.error("Error creating diamond:", error);
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
            swal("Something is wrong!", "Failed to add diamond. Please try again.", "error");
        }
    };

    return (
        <div className="manager_add_diamond_all_container">
            <div className="manager_add_diamond_sidebar">
                <ManagerSidebar currentPage="manager_manage_diamond" />
            </div>
            <div className="manager_add_diamond_content">
                <div className="manager_add_diamond_header">
                    <img className="manager_add_diamond_logo" src={logo} alt="Logo" />
                </div>
                <hr className="manager_add_diamond_header_line" />
                <div className="manager_add_diamond_title_back">
                    <h1 className="manager_add_diamond_title">Add new diamond</h1>
                    <button className="manager_add_diamond_back_button" onClick={() => navigate('/managerDiamondList')}>
                        &lt; Back
                    </button>
                </div>
                <form className="manager_add_diamond_form" onSubmit={handleSubmit}>
                    <div className="manager_add_diamond_form_row">
                        <div className="manager_add_diamond_form_group">
                            <label>Shape</label>
                            <input type="text" name="shape" value={diamondData.shape} onChange={handleChange} required />
                        </div>
                        <div className="manager_add_diamond_form_group">
                            <label>Cut</label>
                            <input type="text" name="cut" value={diamondData.cut} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="manager_add_diamond_form_row">
                        <div className="manager_add_diamond_form_group">
                            <label>Carat</label>
                            <input type="number" step="0.01" name="carat" value={diamondData.carat} onChange={handleChange} required />
                        </div>
                        <div className="manager_add_diamond_form_group">
                            <label>Clarity</label>
                            <input type="text" name="clarity" value={diamondData.clarity} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="manager_add_diamond_form_row">
                        <div className="manager_add_diamond_form_group">
                            <label>Price</label>
                            <input type="number" name="price" value={diamondData.price} onChange={handleChange} required />
                        </div>
                        <div className="manager_add_diamond_form_group">
                            <label>Quantity</label>
                            <input type="number" name="amountAvailable" value={diamondData.amountAvailable} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="manager_add_diamond_form_group">
                        <label>Color</label>
                        <input type="text" name="color" value={diamondData.color} onChange={handleChange} required />
                    </div>
                    <div className="manager_add_diamond_form_group">
                        <label>Certificate</label>
                        <input type="text" name="certificateScan" value={diamondData.certificateScan} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="manager_add_diamond_submit_button">Add</button>
                </form>
            </div>
        </div>
    );
};

export default ManagerAddProduct;
