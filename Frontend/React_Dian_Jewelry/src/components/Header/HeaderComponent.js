import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../services/CartService';
import { UserContext } from '../../services/UserContext';
import '../Header/HeaderComponent.scss';
import logo from '../../assets/img/logoN.png';

const HeaderComponent = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const { cartItems } = useCart();

    const handleLogout = () => {
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        const rememberedPassword = localStorage.getItem('rememberedPassword');

        const allCartItems = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('cartItems')) {
                allCartItems[key] = localStorage.getItem(key);
            }
        }

        localStorage.clear();

        if (rememberedEmail && rememberedPassword) {
            localStorage.setItem('rememberedEmail', rememberedEmail);
            localStorage.setItem('rememberedPassword', rememberedPassword);
        }

        for (const key in allCartItems) {
            localStorage.setItem(key, allCartItems[key]);
        }

        navigate('/login');
    };

    const handleSearchKeyPress = async (e) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            const response = await fetch(`https://localhost:7184/api/products/search?name=${searchQuery}`);
            const data = await response.json();
            setSearchQuery('');
            navigate('/search', { state: { products: data } });
        }
    };

    const navigateToCategory = (category) => {
        navigate('/diamondJewelry', { state: { category } });
    };

    return (
        <header className="header">
            <div className="top_announcement">
                Free Shipping Around Viet Nam For All Orders, Don't Miss Discount.
            </div>
            <div className="top_header container-fluid">
                <div className="row align-items-center" style={{ backgroundColor: 'white' }}>
                    <div className="col-md-4">
                        <div className="contact_info">
                            <p className="contact_phone"><i className="fas fa-phone-alt"></i>0795 795 959</p>
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
                                    {user.firstName ? (
                                        <>
                                            <li>
                                                <p className="full_name dropdown-item">{user.firstName} {user.lastName}</p>
                                            </li>
                                            <li>
                                                <p className="point dropdown-item">{user.points} points</p>
                                            </li>
                                            <hr className="account_hr1" />
                                            <li><a className="dropdown-item" href="/editProfile"><i className="adm_icon fas fa-cog"></i> Setting</a></li>
                                            <li><a className="dropdown-item" href="/FAQs"><i className="adm_icon fas fa-question-circle"></i> FAQs</a></li>
                                            <hr className="account_hr2" />
                                            <li><a className="dropdown-item" href="#" onClick={handleLogout}><i className="adm_icon fas fa-sign-out-alt"></i> Sign out</a></li>
                                        </>
                                    ) : (
                                        <>
                                            <li><a className="dropdown-item" href="/FAQs"><i className="adm_icon fas fa-question-circle"></i> FAQs</a></li>
                                            <hr className="account_hr_guest" />
                                            <li><a className="dropdown-item" href="/login"><i className="adm_icon fas fa-sign-in-alt"></i> Sign in</a></li>
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
                                    aria-expanded="false" onClick={() => navigateToCategory(null)}>
                                    DIAMOND JEWELRY<i className="icon_arrow_diamond fas fa-chevron-down" style={{ fontSize: '10px' }}></i>
                                </a>
                                <ul className="diamond_dropdown_menu dropdown-menu" aria-labelledby="diamondDropdown">
                                    <li><a className="dropdown-item" onClick={() => navigateToCategory('ring')}>Ring</a></li>
                                    <li><a className="dropdown-item" onClick={() => navigateToCategory('earrings')}>Earrings</a></li>
                                    <li><a className="dropdown-item" onClick={() => navigateToCategory('bracelet')}>Bracelet</a></li>
                                    <li><a className="dropdown-item" onClick={() => navigateToCategory('necklace')}>Necklace</a></li>
                                </ul>
                            </li>
                            <li className="wedding_dropdown_section nav-item dropdown">
                                <a className="wedding header_spe_nav_link nav-link" id="weddingDropdown" role="button"
                                    aria-expanded="false" onClick={() => navigateToCategory('weddingJewelry')}>
                                    WEDDING JEWELRY<i className="icon_arrow_wedding fas fa-chevron-down" style={{ fontSize: '10px' }}></i>
                                </a>
                                <ul className="wedding_dropdown_menu dropdown-menu" aria-labelledby="weddingDropdown">
                                    <li><a className="dropdown-item" onClick={() => navigateToCategory('weddingRing')}>Wedding Ring</a></li>
                                    <li><a className="dropdown-item" onClick={() => navigateToCategory('weddingEarrings')}>Wedding Earrings</a></li>
                                    <li><a className="dropdown-item" onClick={() => navigateToCategory('weddingBracelet')}>Wedding Bracelet</a></li>
                                    <li><a className="dropdown-item" onClick={() => navigateToCategory('weddingNecklace')}>Wedding Necklace</a></li>
                                    <li><a className="dropdown-item" onClick={() => navigateToCategory('engagementRing')}>Engagement Ring</a></li>
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
