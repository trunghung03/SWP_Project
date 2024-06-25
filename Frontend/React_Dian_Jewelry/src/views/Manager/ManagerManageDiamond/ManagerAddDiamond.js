import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import logo from '../../../assets/img/logoN.png';
import ManagerSidebar from '../../../components/ManagerSidebar/ManagerSidebar.js';
import { ShowAllDiamond, createDiamond,getCertificateById,updateCertificateById } from '../../../services/ManagerService/ManagerDiamondService.js';
import '../../../styles/Manager/ManagerAdd.scss';
import InputNumber from 'rc-input-number';

const ManagerAddDiamond = () => {
    const navigate = useNavigate();
    const [diamondData, setDiamondData] = useState({
        shape: '',
        carat: '',
        cut: '',
        clarity: '',
        color: '',
        price: '',
        amountAvailable: '',
        certificateScan: 'null' 
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
            const certificate = await getCertificateById(diamondDataWithStatus.diamondId);
            await updateCertificateById(diamondDataWithStatus.diamondId,certificate);
            swal("Success", "Diamond added successfully", "success");
            navigate('/manager-diamond-list');
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
                    <h3 className="manager_add_diamond_title">Add New Diamond</h3>
                    <button className="manager_add_diamond_back_button" onClick={() => navigate('/manager-diamond-list')}>
                        &lt; Back
                    </button>
                </div>
                <form className="manager_add_diamond_form" onSubmit={handleSubmit}>
                    <div className="manager_add_diamond_form_row">
                        <div className="manager_add_diamond_form_group">
                            <label>Color</label>
                            <select type="text" name="color" value={diamondData.color} onChange={handleChange} required >
                                <option value="">Select Color</option>
                                <option value="SI2">SI2</option>
                                <option value="E">E</option>
                                <option value="I">I</option>
                                <option value="J"> J</option>
                                <option value="H">H</option>
                                <option value="F">F</option>
                                <option value="G">G</option>
                                <option value="D">D</option>
                            </select>
                        </div>

                        <div className="manager_add_diamond_form_group">
                            <label>Cut</label>
                            <select type="text" name="cut" value={diamondData.cut} onChange={handleChange} required >
                                <option value="">Select Cut</option>
                                <option value="Ideal">Ideal</option>
                                <option value="Premium">Premium</option>
                                <option value="Good">Good</option>
                                <option value="Very Good">Very Good</option>
                                <option value="Fair">Fair</option>
                            </select>
                        </div>
                    </div>

                    <div className="manager_add_diamond_form_row">
                        <div className="manager_add_diamond_form_group">
                            <label>Carat</label>
                            <input type="number" max={5.2} placeholder="Enter diamond's carat"  name="carat" value={diamondData.carat} onChange={handleChange} required />
                        </div>
                        <div className="manager_add_diamond_form_group">
                            <label>Clarity</label>
                            <select type="text" name="clarity" value={diamondData.clarity} onChange={handleChange} required >
                                <option value="">Select Clarity</option>
                                <option value="SI2">SI2</option>
                                <option value="SI1">SI1</option>
                                <option value="VS1">VS1</option>
                                <option value="VS2"> VS2</option>
                                <option value="VVS2">VVS2</option>
                                <option value="VVS1">VVS1</option>
                                <option value="I1">I1</option>
                                <option value="IF">IF</option>
                            </select>
                        </div>

                    </div>

                    <div className="manager_add_diamond_form_row">
                        <div className="manager_add_diamond_form_group">
                            <label>Price</label>
                            <input type="number" placeholder="Enter diamond's price" name="price" value={diamondData.price} onChange={handleChange} required />
                        </div>
                        <div className="manager_add_diamond_form_group">
                            <label>Quantity</label>
                            <input type="number" placeholder="Enter quantity" name="amountAvailable" value={diamondData.amountAvailable}
                                onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="manager_add_diamond_form_group">
                        <label>Shape</label>
                        <select type="text" name="shape" value={diamondData.shape} onChange={handleChange} required >
                            <option value="">Select Shape</option>
                            <option value="Round">Round</option>
                            <option value="Oval">Oval</option>
                            <option value="Emerald">Emerald</option>
                            <option value="Cushion">Cushion</option>
                            <option value="Pear">Pear</option>
                            <option value="Radiant">Radiant</option>
                            <option value="Marquise">Marquise</option>
                            <option value="Asscher">Asscher</option>
                            <option value="Heart">Heart</option>

                        </select>
                    </div>
                    <button type="submit" className="manager_add_diamond_submit_button">Add</button>
                </form>
            </div>
        </div>
    );
};

export default ManagerAddDiamond;
