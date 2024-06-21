import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../services/CartService';
import { UserContext } from '../../services/UserContext';
import '../Header/HeaderComponent.scss';
import logo from '../../assets/img/logoN.png';
import mainImgDiamondJewelry from '../../assets/img/nav1.jpg';
import mainImgWeddingJewelry from '../../assets/img/nav2.jpeg';
import ringCategory from '../../assets/img/ringNav.webp';
import wRingCategory from '../../assets/img/weddingRingNav.png';
import engagementCategory from '../../assets/img/engagementNav.jpg';
import earringCategory from '../../assets/img/earingsNav.jpeg';
import wEarringCategory from '../../assets/img/wEaringNav.webp';
import braceletCategory from '../../assets/img/braceletNav.png';
import wBraceletCategory from '../../assets/img/wBraceletnav.jpg';
import necklaceCategory from '../../assets/img/necklaceNav.jpg';
import wNecklaceCategory from '../../assets/img/wNecklaceNav.webp';

const HeaderComponent = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const { cartItems } = useCart();
    const diamondMenuRef = useRef(null);
    const weddingMenuRef = useRef(null);
    const diamondMenuTimeoutRef = useRef(null);
    const weddingMenuTimeoutRef = useRef(null);
    const [hoveredImage, setHoveredImage] = useState(mainImgDiamondJewelry);
    const [showNotifications, setShowNotifications] = useState(false);

    useEffect(() => {
        const role = localStorage.getItem('role');
        if (['Admin', 'SalesStaff', 'Manager', 'DeliveryStaff'].includes(role)) {
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
            window.location.href = '/login';
        }
    }, []);

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
        window.location.href = '/login';
    };

    const handleSearchKeyPress = async (e) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            const response = await fetch(`https://localhost:7184/api/products/search?name=${searchQuery}`);
            const data = await response.json();
            setSearchQuery('');
            navigate('/search', { state: { products: data, searchQuery } });
        }
    };

    const navigateToCategory = (category) => {
        navigate('/diamond-jewelry', { state: { category } });
    };

    const handleMouseEnter = (menuRef, timeoutRef, defaultImage) => {
        clearTimeout(timeoutRef.current);
        menuRef.current.style.display = 'flex';
        menuRef.current.style.opacity = '1';
        menuRef.current.style.transform = 'translateY(0)';
        setHoveredImage(defaultImage);
    };

    const handleMouseLeave = (menuRef, timeoutRef) => {
        timeoutRef.current = setTimeout(() => {
            menuRef.current.style.opacity = '0';
            setTimeout(() => {
                menuRef.current.style.display = 'none';
            }, 100);
        }, 100);
    };

    const handleImageHover = (imageSrc) => {
        setHoveredImage(imageSrc);
    };

    const notifications = [
        { id: 1, title: 'Title 1', description: 'Description for title 1 Description for title 1 Description for title 1', time: '1 hour ago' },
        { id: 2, title: 'Title 2', description: 'Description for title 2222222222222222222222222222222', time: '2 hours ago' },
        { id: 3, title: 'Title 3', description: 'Description for title 3', time: '3 hours ago' },
        { id: 4, title: 'Title 4', description: 'Description for title 4', time: '4 hours ago' },
        { id: 5, title: 'Title 5', description: 'Description for title 5', time: '5 hours ago' },
    ];

    return (
        <header className="header">
            <div className="top_announcement">
                Free Shipping Around Viet Nam For All Orders, Don't Miss Discount.
            </div>
            <div className="top_header container-fluid">
                <div className="row align-items-center" style={{ backgroundColor: 'white' }}>
                    <div className="col-md-5">
                        <div className="contact_info">
                            <Link to='tel:0795795959'>
                                <p className="contact_phone"><i className="fas fa-phone-alt"></i>0795 795 959</p>
                            </Link>

                            <a href="https://www.google.com/maps/place/Tr%C6%B0%E1%BB%9Dng+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+FPT+TP.+HCM/@10.8411278,106.8092999,19z/data=!4m6!3m5!1s0x31752731176b07b1:0xb752b24b379bae5e!8m2!3d10.8411276!4d106.809883!16s%2Fg%2F11j2zx_fz_?entry=ttu" target="_blank" rel="noopener noreferrer">
                                <p className="contact_address"><i className="fas fa-map-marker-alt"></i> D1 Street, Long Thanh My, Thu Duc City, Ho Chi Minh City</p>
                            </a>
                        </div>
                    </div>
                    <div className="col-md-2 text-center">
                        <Link to="/home">
                            <img className="logo" src={logo} alt="Logo" />
                        </Link>
                    </div>
                    <div className="col-md-5 text-end">
                        <div className="header_icons">
                            <div className="search_section">
                                <div className="search_bar_container">
                                    <i className="fas fa-search search_icon"></i>
                                    <input
                                        type="text"
                                        className="search_bar"
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyPress={handleSearchKeyPress}
                                    />
                                </div>
                            </div>
                            <div
                                className="notification_icon"
                                onMouseEnter={() => setShowNotifications(true)}
                                onMouseLeave={() => setShowNotifications(false)}
                            >
                                <i className="icon_noti fas fa-bell"></i>
                                <span className="notification_badge">5</span>
                                {showNotifications && (
                                    <div className="noti_dropdown_menu">
                                        <div className='noti_header_wrapper'>
                                            <div className="noti_header">Notifications</div>
                                            <div className="noti_header_view">View all<i className="fas fa-arrow-right"></i></div>
                                        </div>
                                        {notifications.map((notification, index) => (
                                            <div key={notification.id} className="noti_item" style={{ borderBottom: index === notifications.length - 1 ? 'none' : '1px solid #e0e0e0' }}>
                                                <div className='each_noti'>
                                                    <p className="noti_title">{notification.title}</p>
                                                    <p className="noti_description">{notification.description}</p>
                                                    <span className="noti_time">{notification.time}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <Link to="/cart" className="cart_icon">
                                <i className="icon_cart fas fa-shopping-bag"></i>
                                {cartItems.length > 0 && <span className="cart_badge">{cartItems.length}</span>}
                            </Link>
                            <div className="account_dropdown_section dropdown">
                                <i className="icon_account fas fa-user"></i>
                                {/* <i className="icon_arrow fas fa-chevron-down" id="dropdownMenuButton1" data-bs-toggle="dropdown"
                                    aria-expanded="false"></i> */}
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
                                            <li><Link className="dropdown-item" to="/edit-profile"><i className="adm_icon fas fa-cog"></i> Setting</Link></li>
                                            <li><Link className="dropdown-item" to="/FAQs"><i className="adm_icon fas fa-question-circle"></i> FAQs</Link></li>
                                            <hr className="account_hr2" />
                                            <li><div className="dropdown-item" onClick={handleLogout}><i className="adm_icon fas fa-sign-out-alt"></i> Sign out</div></li>
                                        </>
                                    ) : (
                                        <>
                                            <li><Link className="dropdown-item" to="/FAQs"><i className="adm_icon fas fa-question-circle"></i> FAQs</Link></li>
                                            <hr className="account_hr_guest" />
                                            <li><Link className="dropdown-item" to="/login"><i className="adm_icon fas fa-sign-in-alt"></i> Sign in</Link></li>
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
                                <Link className="home nav-link" to="/home">HOME</Link>
                            </li>
                            <li
                                className="diamond_dropdown_section nav-item dropdown"
                                onMouseEnter={() => handleMouseEnter(diamondMenuRef, diamondMenuTimeoutRef, mainImgDiamondJewelry)}
                                onMouseLeave={() => handleMouseLeave(diamondMenuRef, diamondMenuTimeoutRef)}
                            >
                                <a className="diamond header_spe_nav_link nav-link" onClick={() => navigate('/diamond-jewelry', { state: { category: 'all' } })} id="diamondDropdown" role="button" aria-expanded="false">
                                    DIAMOND JEWELRY<i className="icon_arrow_diamond fas fa-chevron-down" style={{ fontSize: '10px' }}></i>
                                </a>
                                <div className="diamond_dropdown_menu dropdown-menu" ref={diamondMenuRef} aria-labelledby="diamondDropdown">
                                    <div className="dropdown_content">
                                        <ul className="dropdown_items">
                                            <li><a className="dropdown-item" onMouseEnter={() => handleImageHover(ringCategory)} onClick={() => navigateToCategory('ring')}>Ring</a></li>
                                            <li><a className="dropdown-item" onMouseEnter={() => handleImageHover(earringCategory)} onClick={() => navigateToCategory('earrings')}>Earrings</a></li>
                                            <li><a className="dropdown-item" onMouseEnter={() => handleImageHover(braceletCategory)} onClick={() => navigateToCategory('bracelet')}>Bracelet</a></li>
                                            <li><a className="dropdown-item" onMouseEnter={() => handleImageHover(necklaceCategory)} onClick={() => navigateToCategory('necklace')}>Necklace</a></li>
                                            <li><a className="dropdown-item" onMouseEnter={() => handleImageHover(engagementCategory)} onClick={() => navigateToCategory('engagementRing')}>Engagement Ring</a></li>
                                        </ul>
                                        <div className="dropdown_image">
                                            <img src={hoveredImage} alt="Jewelry" />
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li
                                className="wedding_dropdown_section nav-item dropdown"
                                onMouseEnter={() => handleMouseEnter(weddingMenuRef, weddingMenuTimeoutRef, mainImgWeddingJewelry)}
                                onMouseLeave={() => handleMouseLeave(weddingMenuRef, weddingMenuTimeoutRef)}
                            >
                                <a className="wedding header_spe_nav_link nav-link" onClick={() => navigateToCategory('weddingJewelry')} id="weddingDropdown" role="button" aria-expanded="false">
                                    WEDDING JEWELRY<i className="icon_arrow_wedding fas fa-chevron-down" style={{ fontSize: '10px' }}></i>
                                </a>
                                <div className="wedding_dropdown_menu dropdown-menu" ref={weddingMenuRef} aria-labelledby="weddingDropdown">
                                    <div className="dropdown_content">
                                        <ul className="dropdown_items">
                                            <li><a className="dropdown-item" onMouseEnter={() => handleImageHover(wRingCategory)} onClick={() => navigateToCategory('weddingRing')}>Wedding Ring</a></li>
                                            <li><a className="dropdown-item" onMouseEnter={() => handleImageHover(wEarringCategory)} onClick={() => navigateToCategory('weddingEarrings')}>Wedding Earrings</a></li>
                                            <li><a className="dropdown-item" onMouseEnter={() => handleImageHover(wBraceletCategory)} onClick={() => navigateToCategory('weddingBracelet')}>Wedding Bracelet</a></li>
                                            <li><a className="dropdown-item" onMouseEnter={() => handleImageHover(wNecklaceCategory)} onClick={() => navigateToCategory('weddingNecklace')}>Wedding Necklace</a></li>
                                            <li><a className="dropdown-item" onMouseEnter={() => handleImageHover(engagementCategory)} onClick={() => navigateToCategory('engagementRing')}>Engagement Ring</a></li>
                                        </ul>
                                        <div className="dropdown_image">
                                            <img src={hoveredImage} alt="Jewelry" />
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="nav-item">
                                <Link className="price_list nav-link" to="/price-list">DIAMOND PRICE</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="education nav-link" to="/blog">BLOG</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="introduce nav-link" to="/introduce">INTRODUCE</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="contact nav-link" to="/contact">CONTACT US</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default HeaderComponent;
