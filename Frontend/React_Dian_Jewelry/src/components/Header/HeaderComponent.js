import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../services/CartService'; 
import '../Header/HeaderComponent.scss';
import logo from '../../assets/img/logo.png';

const HeaderComponent = () => {
    const [role, setRole] = useState('guest');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [points, setPoints] = useState(0);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const { cartItems } = useCart(); 

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setRole('customer');
            setFirstName(localStorage.getItem("firstName"));
            setLastName(localStorage.getItem("lastName"));
            setPoints(localStorage.getItem("points"));
        } else {
            setRole('guest');
        }
    }, []);

    const handleLogout = () => {
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        const rememberedPassword = localStorage.getItem('rememberedPassword');
        const cartItems = localStorage.getItem('cartItems'); 

        localStorage.clear();

        if (rememberedEmail && rememberedPassword) {
            localStorage.setItem('rememberedEmail', rememberedEmail);
            localStorage.setItem('rememberedPassword', rememberedPassword);
        }

        if (cartItems) {
            localStorage.setItem('cartItems', cartItems); 
        }

        setRole('guest');
        navigate('/login');
    };

    const handleSearchKeyPress = async (e) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            const response = await fetch(`https://localhost:7184/api/Product/search?name=${searchQuery}`);
            const data = await response.json();
            navigate('/search', { state: { products: data } });
        }
    };

    return (
        <header className="header">
            <div className="top_header container-fluid">
                <div className="row align-items-center" style={{ backgroundColor: 'white' }}>
                    <div className="col-md-4">
                        <div className="contact_info">
                            <p className="contact_phone"><i className="fas fa-phone-alt"></i>0912 345 678</p>
                            <p className="contact_address"><i className="fas fa-map-marker-alt"></i> D1 Street, Long Thanh My, Thu Duc City, Ho Chi Minh City</p>
                        </div>
                    </div>
                    <div className="col-md-4 text-center">
                        <a href="/home">
                            <img className="logo" src={logo} alt="Logo" />
                        </a>
                    </div>
                    <div className="col-md-4 text-end">
                        <div className="header_icons">
                            <div className="search_section">
                                <input
                                    type="text"
                                    className="search_bar"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyPress={handleSearchKeyPress}
                                />
                            </div>
                            <a href="/cart" className="cart_icon">
                                <i className="icon_cart fas fa-shopping-bag"></i>
                                {cartItems.length > 0 && <span className="cart_badge">{cartItems.length}</span>}
                            </a>
                            <div className="account_dropdown_section dropdown">
                                <i className="icon_account fas fa-user" id="dropdownMenuButton1" data-bs-toggle="dropdown"
                                    aria-expanded="false"></i>
                                <i className="icon_arrow fas fa-chevron-down"></i>
                                <ul className="account_dropdown_menu dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    {role === 'guest' ? (
                                        <>
                                            <li><a className="dropdown-item" href="/FAQs"><i className="adm_icon fas fa-question-circle"></i> FAQs</a></li>
                                            <hr className="account_hr_guest" />
                                            <li><a className="dropdown-item" href="/login"><i className="adm_icon fas fa-sign-in-alt"></i> Sign in</a></li>
                                        </>
                                    ) : (
                                        <>
                                            <li>
                                                <p className="full_name dropdown-item">{firstName} {lastName}</p>
                                            </li>
                                            <li>
                                                <p className="point dropdown-item">{points} points</p>
                                            </li>
                                            <hr className="account_hr1" />
                                            <li><a className="dropdown-item" href="/editProfile"><i className="adm_icon fas fa-cog"></i> Setting</a></li>
                                            <li><a className="dropdown-item" href="/FAQs"><i className="adm_icon fas fa-question-circle"></i> FAQs</a></li>
                                            <hr className="account_hr2" />
                                            <li><a className="dropdown-item" href="#" onClick={handleLogout}><i className="adm_icon fas fa-sign-out-alt"></i> Sign out</a></li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="home nav-link" href="/home">HOME</a>
                            </li>
                            <li className="diamond_dropdown_section nav-item dropdown">
                                <a className="diamond header_spe_nav_link nav-link" id="diamondDropdown" role="button"
                                    aria-expanded="false" href="/diamondJewelry">
                                    DIAMOND JEWELRY<i className="icon_arrow_diamond fas fa-chevron-down" style={{ fontSize: '10px' }}></i>
                                </a>
                                <ul className="diamond_dropdown_menu dropdown-menu" aria-labelledby="diamondDropdown">
                                    <li><a className="dropdown-item" href="/ring">Ring</a></li>
                                    <li><a className="dropdown-item" href="/earings">Earings</a></li>
                                    <li><a className="dropdown-item" href="/bracelet">Bracelet</a></li>
                                    <li><a className="dropdown-item" href="/necklace">Necklace</a></li>
                                </ul>
                            </li>
                            <li className="wedding_dropdown_section nav-item dropdown">
                                <a className="wedding header_spe_nav_link nav-link" id="weddingDropdown" role="button"
                                    aria-expanded="false" href="/weddingJewelry">
                                    WEDDING JEWELRY<i className="icon_arrow_wedding fas fa-chevron-down" style={{ fontSize: '10px' }}></i>
                                </a>
                                <ul className="wedding_dropdown_menu dropdown-menu" aria-labelledby="weddingDropdown">
                                    <li><a className="dropdown-item" href="/weddingRing">Wedding Ring</a></li>
                                    <li><a className="dropdown-item" href="/weddingEarings">Wedding Earrings</a></li>
                                    <li><a className="dropdown-item" href="/weddingBracelet">Wedding Bracelet</a></li>
                                    <li><a className="dropdown-item" href="/weddingNecklace">Wedding Necklace</a></li>
                                    <li><a className="dropdown-item" href="/engagementRing">Engagement Ring</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="price_list nav-link" href="/priceList">DIAMOND PRICE</a>
                            </li>
                            <li className="nav-item">
                                <a className="education nav-link" href="/education">EDUCATION</a>
                            </li>
                            <li className="nav-item">
                                <a className="introduce nav-link" href="/introduce">INTRODUCE</a>
                            </li>
                            <li className="nav-item">
                                <a className="contact nav-link" href="/contact">CONTACT US</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default HeaderComponent;
