import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import logo from '../../../assets/img/logo.png';
import ManagerSidebar from '../../../components/ManagerSidebar/ManagerSidebar.js';
import { createEmployee } from '../../../services/ManagerService/ManagerEmployeeService.js';
import '../../../styles/Manager/ManagerAdd.scss';

const ManagerAddEmployee = () => {
    const navigate = useNavigate();
    const [employeeData, setEmployeeData] = useState({
        role: '',
        email: '',
        password: '',
        lastName: '',
        firstName: '',
        address: '',
        phoneNumber: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const employeeDataWithStatus = { ...employeeData, status: true };
            await createEmployee(employeeDataWithStatus);
            swal("Success", "Employee added successfully", "success");
            navigate('/managerEmployeeList');
        } catch (error) {
            console.error("Error creating employee:", error);
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
            swal("Something is wrong!", "Failed to add employee. Please try again.", "error");
        }
    };

    return (
        <div className="manager_add_diamond_all_container">
            <div className="manager_add_diamond_sidebar">
                <ManagerSidebar currentPage="manager_employee" />
            </div>
            <div className="manager_add_diamond_content">
                <div className="manager_add_diamond_header">
                    <img className="manager_add_diamond_logo" src={logo} alt="Logo" />
                </div>
                <hr className="manager_add_diamond_header_line" />
                <div className="manager_add_diamond_title_back">
                    <h3 className="manager_add_diamond_title">Add New Employee</h3>
                    <button className="manager_add_diamond_back_button" onClick={() => navigate('/managerEmployeeList')}>
                        &lt; Back
                    </button>
                </div>
                <form className="manager_add_diamond_form" onSubmit={handleSubmit}>
                    <div className="manager_add_diamond_form_row">
                        <div className="manager_add_diamond_form_group">
                            <label>Role</label>
                            <input type="text" name="role" value={employeeData.role} onChange={handleChange} required />
                        </div>
                        <div className="manager_add_diamond_form_group">
                            <label>Email</label>
                            <input type="text" name="email" value={employeeData.email} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="manager_add_diamond_form_row">

                        <div className="manager_add_diamond_form_group">
                            <label>First name</label>
                            <input type="text" name="firstName" value={employeeData.firstName} onChange={handleChange} required />
                        </div>
                        <div className="manager_add_diamond_form_group">
                            <label>Last name</label>
                            <input type="text" name="lastName" value={employeeData.lastName} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="manager_add_diamond_form_row">
                        <div className="manager_add_diamond_form_group">
                            <label>Password</label>
                            <input type="text" name="password" value={employeeData.password} onChange={handleChange} required />
                        </div>
                        <div className="manager_add_diamond_form_group">
                            <label>Phone number</label>
                            <input type="text" name="phoneNumber" value={employeeData.phoneNumber} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="manager_add_diamond_form_group">
                        <label>Address</label>
                        <input type="text" name="address" value={employeeData.address} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="manager_add_diamond_submit_button">Add</button>
                </form>
            </div>
        </div>
    );
};

export default ManagerAddEmployee;
