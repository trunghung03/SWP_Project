import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import logo from '../../../assets/img/logo.png';
import ManagerSidebar from '../../../components/ManagerSidebar/ManagerSidebar.js';
import { createShell } from '../../../services/ManagerService/ManagerShellService.js';
import '../../../styles/Manager/ManagerManageDiamond/ManagerAddDiamond.scss';

const ManagerAddShell = () => {
    const navigate = useNavigate();
    const [shellData, setShellData] = useState({
        name: '',
        amountAvailable: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShellData({ ...shellData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const shellDataWithStatus = { ...shellData, status: true };
            await createShell(shellDataWithStatus);
            swal("Success", "Shell added successfully", "success");
            navigate('/managerShellList');
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
            swal("Something is wrong!", "Failed to add diamond. Please try again.", "error");
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
                    <h1 className="manager_add_diamond_title">Add new Shell</h1>
                    <button className="manager_add_diamond_back_button" onClick={() => navigate('/managerDiamondList')}>
                        &lt; Back
                    </button>
                </div>
                <form className="manager_add_diamond_form" onSubmit={handleSubmit}>
                    <div className="manager_add_diamond_form_row">
                        <div className="manager_add_diamond_form_group">
                            <label>Name</label>
                            <input type="text" name="name" value={shellData.name} onChange={handleChange} required />
                        </div>
                        <div className="manager_add_diamond_form_group">
                            <label>Amount Available</label>
                            <input type="text" name="amountAvailable" value={shellData.amountAvailable} onChange={handleChange} required />
                        </div>
                    </div>
                    <button type="submit" className="manager_add_diamond_submit_button">Add</button>
                </form>
            </div>
        </div>
    );
};

export default ManagerAddShell;
