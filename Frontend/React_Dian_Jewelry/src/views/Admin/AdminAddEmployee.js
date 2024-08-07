import React, { useState } from 'react';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logoN.png';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar.js';
import '../../styles/Manager/ManagerAdd.scss';
import { createEmployee } from '../../services/AdminService/AdminEmployeeService.js';
const AdminAddEmployee = () => {
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

    const validateInputs = () => {
        const { phoneNumber, password, email } = employeeData;

        // Phone number validation
        const phonePattern = /^0\d{9}$/;
        if (!phonePattern.test(phoneNumber)) {
            swal("Invalid phone number", "Phone number must be 10 digits and start with 0.", "error");
            return false;
        }

        // Password validation
        const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{8,}$/;
        if (!passwordPattern.test(password)) {
            swal("Invalid password", "Password must contain at least one uppercase letter, one number, and one special character.", "error");
            return false;
        }

        // Email validation
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            swal("Invalid email", "Please enter a valid email address.", "error");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateInputs()) return;

        try {
            const employeeDataWithStatus = { ...employeeData, status: true };
            await createEmployee(employeeDataWithStatus);
            swal("Success", "Employee added successfully", "success");
            navigate('/admin-employee-list');
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
                <AdminSidebar currentPage="admin_manage_employee" />
            </div>
            <div className="manager_add_diamond_content">
                <div className="manager_add_diamond_header">
                    <img className="manager_add_diamond_logo" src={logo} alt="Logo" />
                </div>
                <hr className="manager_add_diamond_header_line" />
                <div className="manager_add_diamond_title_back">
                    <h3 className="manager_add_diamond_title">Create New Account</h3>
                    <button className="manager_add_diamond_back_button" onClick={() => navigate('/admin-employee-list')}>
                        &lt; Back
                    </button>
                </div>
                <form className="manager_add_diamond_form" onSubmit={handleSubmit}>
                    <div className="manager_add_diamond_form_row">
                        <div className="manager_add_diamond_form_group">
                            <label>First name</label>
                            <input type="text" name="firstName" placeholder="Enter first name" value={employeeData.firstName} onChange={handleChange} required />
                        </div>
                        <div className="manager_add_diamond_form_group ">
                            <label>Last name</label>
                            <input type="text" name="lastName" placeholder="Enter last name" value={employeeData.lastName} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="manager_add_diamond_form_row">
                        <div className="manager_add_diamond_form_group">
                            <label>Role</label>
                            <select id='listRole' name='role' value={employeeData.role} onChange={handleChange} required>
                                <option value="">Role</option>
                                <option value="Admin">Admin</option>
                                <option value="Manager">Manager</option>
                                <option value="Sales Staff">Sales Staff</option>
                                <option value="Delivery Staff">Delivery Staff</option>
                            </select>
                        </div>
                        <div className="manager_add_diamond_form_group">
                            <label>Phone number</label>
                            <input type="text" name="phoneNumber" placeholder="Enter phone number: 0903307685" value={employeeData.phoneNumber} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="manager_add_diamond_form_group">
                        <label>Address</label>
                        <input type="text" name="address" placeholder="Enter address" value={employeeData.address} onChange={handleChange} required />
                    </div>
                    <div className="manager_add_diamond_form_group">
                        <label>Email</label>
                        <input type="text" name="email" placeholder="Enter email: abcxyz@gmail.com" value={employeeData.email} onChange={handleChange} required />
                    </div>
                    <div className="manager_add_diamond_form_row">
                        <div className="manager_add_diamond_form_group">
                            <label>Password</label>
                            <input type="password" name="password" placeholder="Enter password: String@123" value={employeeData.password} onChange={handleChange} required />
                        </div>
                    </div>

                    <button type="submit" className="manager_add_diamond_submit_button">Add</button>
                </form>


            </div>
        </div>
    );
};

export default AdminAddEmployee;
