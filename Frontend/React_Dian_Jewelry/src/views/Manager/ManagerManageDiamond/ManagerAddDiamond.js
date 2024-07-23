import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import logo from '../../../assets/img/logoN.png';
import ManagerSidebar from '../../../components/ManagerSidebar/ManagerSidebar.js';
import { createDiamond, createSubDiamond, getCertificateById, updateCertificateById } from '../../../services/ManagerService/ManagerDiamondService.js';
import '../../../styles/Manager/ManagerAdd.scss';
import Loading from '../../../components/Loading/Loading.js';

const ManagerAddDiamond = () => {
    const navigate = useNavigate();
    const [diamondType, setDiamondType] = useState('main');
    const [diamondCerificate, setDiamondCertificate] = useState();
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
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDiamondData({ ...diamondData, [name]: value });
    };

    const handleDiamondTypeChange = (e) => {
        setDiamondType(e.target.value);
        setDiamondData({
            shape: '',
            carat: '',
            cut: '',
            clarity: '',
            color: '',
            price: '',
            amountAvailable: '',
            certificateScan: 'null'
        });
    };

    const validateCarat = (carat) => {
        const caratValue = parseFloat(carat);
        if (diamondType === 'main') {
            return caratValue > 0.5 && caratValue < 4;
        } else {
            return caratValue <= 0.5 && caratValue > 0.1;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateCarat(diamondData.carat)) {
            swal("Invalid Carat", `Carat value must be ${diamondType === 'main' ? 'greater than 0.5 and less than 4' : 'greater than 0.1 and less than or equal to 0.5'}`, "error");
            return;
        }

        setLoading(true); // Set loading state to true
        try {
            const diamondDataWithStatus = { ...diamondData, status: true };

            if (diamondType === 'main') {
                const dataRes = await createDiamond(diamondDataWithStatus);
                console.log("Main diamond response:", dataRes);
                const certificate = await getCertificateById(dataRes.diamondId);
                console.log(certificate);
                setDiamondCertificate(certificate.url);
                await updateCertificateById(dataRes.diamondId, { certificateScan: certificate.url });
            } else {
                const subDiamondRes = await createSubDiamond(diamondDataWithStatus);
                console.log("Sub diamond response:", subDiamondRes);
            }

            swal("Success", `${diamondType === 'main' ? 'Main' : 'Sub'} Diamond added successfully`, "success")
            swal("Success", `${diamondType === 'main' ? 'Main' : 'Sub'} Diamond added successfully`, "success")
            .then(() => {
                setTimeout(() => {
                    navigate('/manager-diamond-list'); // Navigate after 3 seconds
                }, 3000);
            });
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
            swal("Something is wrong!", `Failed to add ${diamondType} diamond. Please try again.`, "error");
        } finally {
            setLoading(false); // Set loading state to false
        }
    };

    if (loading) {
        return <Loading />; // Render Loading component when loading
    }

    
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
                            <label>Type</label>
                            <select value={diamondType} onChange={handleDiamondTypeChange} required>
                                <option value="main">Main Diamond</option>
                                <option value="sub">Sub Diamond</option>
                            </select>
                        </div>
                    </div>
                    <div className="manager_add_diamond_form_row">
                        <div className="manager_add_diamond_form_group">
                            <label>Shape</label>
                            <select type="text" name="shape" value={diamondData.shape} onChange={handleChange} required>
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
                        <div className="manager_add_diamond_form_group">
                            <label>Carat</label>
                            <input
                                type="number"
                                placeholder="Enter diamond's carat"
                                name="carat"
                                value={diamondData.carat}
                                onChange={handleChange}
                                required
                                min={diamondType === 'main' ? 0.51 : 0.11}
                                max={diamondType === 'main' ? 3.99 : 0.5}
                                step="0.01"
                            />
                        </div>
                    </div>
                    <div className="manager_add_diamond_form_row">
                        <div className="manager_add_diamond_form_group">
                            <label>Cut</label>
                            <select type="text" name="cut" value={diamondData.cut} onChange={handleChange} required>
                                <option value="">Select Cut</option>
                                <option value="Ideal">Ideal</option>
                                <option value="Premium">Premium</option>
                                <option value="Good">Good</option>
                                <option value="Very Good">Very Good</option>
                                <option value="Fair">Fair</option>
                            </select>
                        </div>
                        <div className="manager_add_diamond_form_group">
                            <label>Clarity</label>
                            <select type="text" name="clarity" value={diamondData.clarity} onChange={handleChange} required>
                                <option value="">Select Clarity</option>
                                <option value="SI2">SI2</option>
                                <option value="SI1">SI1</option>
                                <option value="VS1">VS1</option>
                                <option value="VS2">VS2</option>
                                <option value="VVS2">VVS2</option>
                                <option value="VVS1">VVS1</option>
                                <option value="I1">I1</option>
                                <option value="IF">IF</option>
                            </select>
                        </div>
                    </div>
                    <div className="manager_add_diamond_form_row">
                        <div className="manager_add_diamond_form_group">
                            <label>Color</label>
                            <select type="text" name="color" value={diamondData.color} onChange={handleChange} required>
                                <option value="">Select Color</option>
                                <option value="SI2">SI2</option>
                                <option value="E">E</option>
                                <option value="I">I</option>
                                <option value="J">J</option>
                                <option value="H">H</option>
                                <option value="F">F</option>
                                <option value="G">G</option>
                                <option value="D">D</option>
                            </select>
                        </div>
                        <div className="manager_add_diamond_form_group">
                            <label>Price</label>
                            <input type="number" min={0} placeholder="Enter diamond's price" name="price" value={diamondData.price} onChange={handleChange} required />
                        </div>
                    </div>
                    {diamondType === 'sub' && (
                        <div className="manager_add_diamond_form_group">
                            <label>Quantity</label>
                            <input type="number" placeholder="Enter quantity" name="amountAvailable" value={diamondData.amountAvailable} onChange={handleChange} required />
                        </div>
                    )}
                    {diamondType === 'main' && (
                        <div className="manager_add_diamond_form_group">
                            <label>Certificate Scan</label>
                            <input type="text" placeholder="Certificate scan URL will be displayed here" name="certificateScan" value={diamondCerificate} readOnly/>
                        </div>
                    )}
                    <button type="submit" className="manager_add_diamond_submit_button">Add</button>
                </form>
            </div>
        </div>
    );
};

export default ManagerAddDiamond;
