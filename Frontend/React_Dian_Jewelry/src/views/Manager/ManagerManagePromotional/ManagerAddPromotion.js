import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import logo from '../../../assets/img/logoN.png';
import ManagerSidebar from '../../../components/ManagerSidebar/ManagerSidebar.js';
import { createPromotion } from '../../../services/ManagerService/ManagerPromotionService.js';
import '../../../styles/Manager/ManagerAdd.scss';

const ManagerAddPromotion = () => {
    const navigate = useNavigate();
    const [promotionData, setPromotionData] = useState({
        name: '',
        code:'',
        amount: '',
        description: '',
        startDate: '',
        endDate: '',
        employeeId: '',
        status : ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPromotionData({ ...promotionData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const promotionDataWithStatus = { ...promotionData, status: true };
            await createPromotion(promotionDataWithStatus);
            swal("Success", "Promotion added successfully", "success");
            navigate('/manager-promotional-list');
        } catch (error) {
            console.error("Error creating Promotion:", error);
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
            swal("Something is wrong!", "Failed to add Promotion. Please try again.", "error");
        }
    };

    return (
        <div className="manager_add_diamond_all_container">
            <div className="manager_add_diamond_sidebar">
                <ManagerSidebar currentPage="manager_manage_promotional" />
            </div>
            <div className="manager_add_diamond_content">
                <div className="manager_add_diamond_header">
                    <img className="manager_add_diamond_logo" src={logo} alt="Logo" />
                </div>
                <hr className="manager_add_diamond_header_line" />
                <div className="manager_add_diamond_title_back">
                    <h3 className="manager_add_diamond_title">Add New Promotional Code</h3>
                    <button className="manager_add_diamond_back_button" onClick={() => navigate('/manager-promotional-list')}>
                        &lt; Back
                    </button>
                </div>
                <form className="manager_add_diamond_form" onSubmit={handleSubmit}>
                    <div className="manager_add_diamond_form_row">
                        <div className="manager_add_diamond_form_group">
                            <label>Code</label>
                            <input type="text" name="code" value={promotionData.code} onChange={handleChange} required />
                        </div>
                        <div className="manager_add_diamond_form_group">
                            <label>Name</label>
                            <input type="text" name="name" value={promotionData.name} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="manager_add_diamond_form_group">
                            <label>Description</label>
                            <input type="text" name="description" value={promotionData.description} onChange={handleChange} required />
                        </div>
                    <div className="manager_add_diamond_form_row">
                        <div className="manager_add_diamond_form_group">
                            <label>Start Date</label>
                            <input type="text" name="startDate" value={promotionData.startDate} onChange={handleChange} required />
                        </div>
                        <div className="manager_add_diamond_form_group">
                            <label>End Date</label>
                            <input type="text" name="endDate" value={promotionData.endDate} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="manager_add_diamond_form_row">
                        <div className="manager_add_diamond_form_group">
                            <label>Amount</label>
                            <input type="text" name="amount" value={promotionData.amount} onChange={handleChange} required />
                        </div>
                        <div className="manager_add_diamond_form_group">
                            <label>Employee ID</label>
                            <input type="text" name="employeeId" value={promotionData.employeeId} onChange={handleChange} required />
                        </div>
                    </div>
                    <button type="submit" className="manager_add_diamond_submit_button">Add</button>
                </form>
            </div>
        </div>
    );
};

export default ManagerAddPromotion;
