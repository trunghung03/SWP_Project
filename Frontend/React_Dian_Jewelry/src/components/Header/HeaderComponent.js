import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../services/CartService";
import { UserContext } from "../../services/UserContext";
import { useNotification } from "../../services/NotificationContext";
import "../Header/HeaderComponent.scss";
import logo from "../../assets/img/logoN.png";
import mainImgDiamondJewelry from "../../assets/img/nav1.jpg";
import mainImgWeddingJewelry from "../../assets/img/nav2.jpeg";
import ringCategory from "../../assets/img/ringNav.webp";
import wRingCategory from "../../assets/img/weddingRingNav.png";
import engagementCategory from "../../assets/img/engagementNav.jpg";
import earringCategory from "../../assets/img/earingsNav.jpeg";
import wEarringCategory from "../../assets/img/wEaringNav.webp";
import braceletCategory from "../../assets/img/braceletNav.png";
import wBraceletCategory from "../../assets/img/wBraceletnav.jpg";
import necklaceCategory from "../../assets/img/necklaceNav.jpg";
import wNecklaceCategory from "../../assets/img/wNecklaceNav.webp";
import { searchProducts } from "../../services/ProductService";
import { useSignalR } from "../../services/SignalRContext";

const HeaderComponent = () => {
  const { user, setUser } = useContext(UserContext);
  const { startConnection, notifications } = useSignalR();
  const role = localStorage.getItem("role");
  const customerId = localStorage.getItem("customerId");
  const isLoggedIn = user && customerId;
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const { cartItems } = useCart();
  const diamondMenuRef = useRef(null);
  const weddingMenuRef = useRef(null);
  const diamondMenuTimeoutRef = useRef(null);
  const weddingMenuTimeoutRef = useRef(null);
  const [hoveredImage, setHoveredImage] = useState(mainImgDiamondJewelry);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const { showNotifications, setShowNotifications } = useNotification();
  const [notificationCount, setNotificationCount] = useState(0);
  const [notificationsToShow, setNotificationsToShow] = useState(6);
  const notificationMenuRef = useRef(null);
  const accountMenuRef = useRef(null);

  const handleNotificationReceived = useCallback((newNotification) => {
    setNotificationCount((prevCount) => prevCount + 1);
  }, []);

  useEffect(() => {
    setNotificationCount(notifications.length);
    console.log(notifications);
  }, [notifications]);

  useEffect(() => {
    startConnection(customerId, role);
    if (["Admin", "SalesStaff", "Manager", "DeliveryStaff"].includes(role)) {
      const rememberedEmail = localStorage.getItem("rememberedEmail");
      const rememberedPassword = localStorage.getItem("rememberedPassword");

      const allCartItems = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("cartItems")) {
          allCartItems[key] = localStorage.getItem(key);
        }
      }

      localStorage.clear();

      if (rememberedEmail && rememberedPassword) {
        localStorage.setItem("rememberedEmail", rememberedEmail);
        localStorage.setItem("rememberedPassword", rememberedPassword);
      }

      for (const key in allCartItems) {
        localStorage.setItem(key, allCartItems[key]);
      }

      setUser({
        firstName: localStorage.getItem("firstName") || "",
        lastName: localStorage.getItem("lastName") || "",
        email: localStorage.getItem("email") || "",
        points: localStorage.getItem("points") || 0,
      });
    }
  }, [setUser, startConnection, customerId]);

  useEffect(() => {
    setShowAccountDropdown(false);
    setShowNotifications(false);
  }, [location.pathname]); 

  const toggleAccountDropdown = () => {
    setShowAccountDropdown((prevShow) => !prevShow);
    if (showNotifications) setShowNotifications(false);
  };

  const toggleNotificationDropdown = () => {
    setShowNotifications((prevShow) => !prevShow);
    if (showAccountDropdown) setShowAccountDropdown(false);
  };

  const handleLogout = () => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    const rememberedPassword = localStorage.getItem("rememberedPassword");

    const allCartItems = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("cartItems")) {
        allCartItems[key] = localStorage.getItem(key);
      }
    }

    localStorage.clear();

    if (rememberedEmail && rememberedPassword) {
      localStorage.setItem("rememberedEmail", rememberedEmail);
      localStorage.setItem("rememberedPassword", rememberedPassword);
    }

    for (const key in allCartItems) {
      localStorage.setItem(key, allCartItems[key]);
    }
    window.location.href = "/login";
  };

  const handleSearchKeyPress = async (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      try {
        const response = await searchProducts(searchQuery);
        setSearchQuery("");
        navigate("/search", {
          state: { products: response.data, searchQuery },
        });
      } catch (error) {
        console.error("Search error: ", error);
      }
    }
  };

  const navigateToCategory = (category) => {
    navigate("/diamond-jewelry", { state: { category } });
  };

  const handleMouseEnter = (menuRef, timeoutRef, defaultImage) => {
    clearTimeout(timeoutRef.current);
    menuRef.current.style.display = "flex";
    menuRef.current.style.opacity = "1";
    menuRef.current.style.transform = "translateY(0)";
    setHoveredImage(defaultImage);
  };

  const handleMouseLeave = (menuRef, timeoutRef) => {
    timeoutRef.current = setTimeout(() => {
      menuRef.current.style.opacity = "0";
      setTimeout(() => {
        menuRef.current.style.display = "none";
      }, 100);
    }, 100);
  };

  const handleImageHover = (imageSrc) => {
    setHoveredImage(imageSrc);
  };

  const handleViewMoreNotifications = (e) => {
    e.stopPropagation();
    setNotificationsToShow((prevCount) => prevCount + 5);
  };

  const handleNotificationClick = (e, notification) => {
    e.stopPropagation();
    console.log(notification);
  };

  return (
    <header className="header">
      <div className="top_announcement">
        Free Shipping Around Viet Nam For All Orders, Don't Miss Any Discount.
      </div>
      <div className="top_header container-fluid">
        <div
          className="row align-items-center"
          style={{ backgroundColor: "white" }}
        >
          <div className="col-md-5 col-lg-5 col-sm-12">
            <div className="contact_info">
              <Link to="tel:0795795959">
                <p className="contact_phone">
                  <i className="fas fa-phone-alt"></i>0795 795 959
                </p>
              </Link>

              <a
                href="https://www.google.com/maps/place/Tr%C6%B0%E1%BB%9Dng+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+FPT+TP.+HCM/@10.8411278,106.8092999,19z/data=!4m6!3m5!1s0x31752731176b07b1:0xb752b24b379bae5e!8m2!3d10.8411276!4d106.809883!16s%2Fg%2F11j2zx_fz_?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="contact_address">
                  <i className="fas fa-map-marker-alt"></i> D1 Street, Long
                  Thanh My, Thu Duc City, Ho Chi Minh City
                </p>
              </a>
            </div>
          </div>
          <div className="logo_container col-md-2 col-lg-2 col-sm-12 text-center">
            <Link to="/home">
              <img className="logo" src={logo} alt="Logo" />
            </Link>
          </div>
          <div className="col-md-5 col-lg-5 col-sm-12 text-end">
            <div className="header_icons">
              <div className="col-sm-12 search_section">
                <div className="search_bar_container">
                  <i className="fas fa-search search_icon"></i>
                  <input
                    type="text"
                    className="search_bar"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyUp={handleSearchKeyPress}
                  />
                </div>
              </div>
              <Link to="/cart" className="cart_icon">
                <i className="icon_cart fas fa-shopping-bag"></i>
                {cartItems.length > 0 && (
                  <span className="cart_badge">{cartItems.length}</span>
                )}
              </Link>
              <div
                className={`notification_icon ${showNotifications ? "open" : ""}`}
                onClick={toggleNotificationDropdown}
                ref={notificationMenuRef}
              >
                <i className="icon_noti fas fa-bell"></i>
                {notificationCount > 0 && (
                  <span className="notification_badge">
                    {notificationCount}
                  </span>
                )}
                <div
                  className="noti_dropdown_menu"
                  style={{
                    display: showNotifications ? "block" : "none",
                    opacity: showNotifications ? "1" : "0",
                    transform: showNotifications
                      ? "translateY(0)"
                      : "translateY(-10px)",
                    maxHeight: "370px",
                    overflowY: "auto",
                  }}
                >
                  <div className="noti_header_wrapper">
                    <div className="noti_header">Notifications</div>
                  </div>
                  {notifications.length > 0 ? (
                    notifications
                      .slice(0, notificationsToShow)
                      .reverse()
                      .map((notification, index) => (
                        <div
                          key={notification.Id}
                          className="noti_item"
                          style={{
                            borderBottom:
                              index === notifications.length - 1
                                ? "none"
                                : "1px solid #e0e0e0",
                          }}
                          onClick={(e) => handleNotificationClick(e, notification)}
                        >
                          <div className="each_noti">
                            <p className="noti_description">{notification}</p>
                          </div>
                          {/* <div className="noti_date">
                            <p>10:20 09/11/2004</p>
                          </div> */}
                        </div>
                      ))
                  ) : (
                    <div className="no_notification">
                      <p>No notification</p>
                    </div>
                  )}
                  {notificationsToShow < notifications.length && (
                    <div className="noti_view_more_wrapper">
                      <button
                        className="noti_view_more_button"
                        onClick={handleViewMoreNotifications}
                      >
                        View more notifications
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div
                className={`account_dropdown_section dropdown ${showAccountDropdown ? "open" : ""}`}
                onClick={toggleAccountDropdown}
                ref={accountMenuRef}
              >
                <i className="icon_account fas fa-user"></i>
                <ul
                  className="account_dropdown_menu dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                  style={{
                    display: showAccountDropdown ? "block" : "none",
                    opacity: showAccountDropdown ? "1" : "0",
                    transform: showAccountDropdown
                      ? "translateY(0)"
                      : "translateY(-10px)",
                  }}
                >
                  {user.firstName ? (
                    <>
                      <li>
                        <p className="full_name dropdown-item">
                          {user.firstName} {user.lastName}
                        </p>
                      </li>
                      <li>
                        <p className="point dropdown-item">
                          {user.points} points
                        </p>
                      </li>
                      <hr className="account_hr1" />
                      <li>
                        <Link className="dropdown-item" to="/edit-profile">
                          <i className="adm_icon fas fa-cog"></i> My profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/order-history">
                          <i className="adm_icon fas fa-clipboard"></i> Order
                          history
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/FAQs">
                          <i className="adm_icon fas fa-question-circle"></i>{" "}
                          FAQs
                        </Link>
                      </li>
                      <hr className="account_hr2" />
                      <li>
                        <div className="dropdown-item" onClick={handleLogout}>
                          <i className="adm_icon fas fa-sign-out-alt"></i> Sign
                          out
                        </div>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link className="dropdown-item" to="/FAQs">
                          <i className="adm_icon fas fa-question-circle"></i>{" "}
                          FAQs
                        </Link>
                      </li>
                      <hr className="account_hr_guest" />
                      <li>
                        <Link className="dropdown-item" to="/login">
                          <i className="adm_icon fas fa-sign-in-alt"></i> Sign
                          in
                        </Link>
                      </li>
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
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="home nav-link" to="/home">
                  HOME
                </Link>
              </li>
              <li
                className="diamond_dropdown_section nav-item dropdown"
                onMouseEnter={() =>
                  handleMouseEnter(
                    diamondMenuRef,
                    diamondMenuTimeoutRef,
                    mainImgDiamondJewelry
                  )
                }
                onMouseLeave={() =>
                  handleMouseLeave(diamondMenuRef, diamondMenuTimeoutRef)
                }
              >
                <a
                  className="diamond header_spe_nav_link nav-link"
                  onClick={() =>
                    navigate("/diamond-jewelry", { state: { category: "all" } })
                  }
                  id="diamondDropdown"
                  role="button"
                  aria-expanded="false"
                >
                  DIAMOND JEWELRY
                  <i
                    className="icon_arrow_diamond fas fa-chevron-down"
                    style={{ fontSize: "10px" }}
                  ></i>
                </a>
                <div
                  className="diamond_dropdown_menu dropdown-menu"
                  ref={diamondMenuRef}
                  aria-labelledby="diamondDropdown"
                >
                  <div className="dropdown_content">
                    <ul className="dropdown_items">
                      <li>
                        <a
                          className="dropdown-item"
                          onMouseEnter={() => handleImageHover(ringCategory)}
                          onClick={() => navigateToCategory("ring")}
                        >
                          Ring
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          onMouseEnter={() => handleImageHover(earringCategory)}
                          onClick={() => navigateToCategory("earrings")}
                        >
                          Earrings
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          onMouseEnter={() =>
                            handleImageHover(braceletCategory)
                          }
                          onClick={() => navigateToCategory("bracelet")}
                        >
                          Bracelet
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          onMouseEnter={() =>
                            handleImageHover(necklaceCategory)
                          }
                          onClick={() => navigateToCategory("necklace")}
                        >
                          Necklace
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          onMouseEnter={() =>
                            handleImageHover(engagementCategory)
                          }
                          onClick={() => navigateToCategory("engagementRing")}
                        >
                          Engagement Ring
                        </a>
                      </li>
                    </ul>
                    <div className="dropdown_image">
                      <img src={hoveredImage} alt="Jewelry" />
                    </div>
                  </div>
                </div>
              </li>
              <li
                className="wedding_dropdown_section nav-item dropdown"
                onMouseEnter={() =>
                  handleMouseEnter(
                    weddingMenuRef,
                    weddingMenuTimeoutRef,
                    mainImgWeddingJewelry
                  )
                }
                onMouseLeave={() =>
                  handleMouseLeave(weddingMenuRef, weddingMenuTimeoutRef)
                }
              >
                <a
                  className="wedding header_spe_nav_link nav-link"
                  onClick={() => navigateToCategory("weddingJewelry")}
                  id="weddingDropdown"
                  role="button"
                  aria-expanded="false"
                >
                  WEDDING JEWELRY
                  <i
                    className="icon_arrow_wedding fas fa-chevron-down"
                    style={{ fontSize: "10px" }}
                  ></i>
                </a>
                <div
                  className="wedding_dropdown_menu dropdown-menu"
                  ref={weddingMenuRef}
                  aria-labelledby="weddingDropdown"
                >
                  <div className="dropdown_content">
                    <ul className="dropdown_items">
                      <li>
                        <a
                          className="dropdown-item"
                          onMouseEnter={() => handleImageHover(wRingCategory)}
                          onClick={() => navigateToCategory("weddingRing")}
                        >
                          Wedding Ring
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          onMouseEnter={() =>
                            handleImageHover(wEarringCategory)
                          }
                          onClick={() => navigateToCategory("weddingEarrings")}
                        >
                          Wedding Earrings
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          onMouseEnter={() =>
                            handleImageHover(wBraceletCategory)
                          }
                          onClick={() => navigateToCategory("weddingBracelet")}
                        >
                          Wedding Bracelet
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          onMouseEnter={() =>
                            handleImageHover(wNecklaceCategory)
                          }
                          onClick={() => navigateToCategory("weddingNecklace")}
                        >
                          Wedding Necklace
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          onMouseEnter={() =>
                            handleImageHover(engagementCategory)
                          }
                          onClick={() => navigateToCategory("engagementRing")}
                        >
                          Engagement Ring
                        </a>
                      </li>
                    </ul>
                    <div className="dropdown_image">
                      <img src={hoveredImage} alt="Jewelry" />
                    </div>
                  </div>
                </div>
              </li>
              <li className="nav-item">
                <Link className="price_list nav-link" to="/diamond-price">
                  DIAMONDS
                </Link>
              </li>
              <li className="nav-item">
                <Link className="education nav-link" to="/blog">
                  BLOG
                </Link>
              </li>
              <li className="nav-item">
                <Link className="introduce nav-link" to="/introduce">
                  INTRODUCTION
                </Link>
              </li>
              <li className="nav-item">
                <Link className="contact nav-link" to="/contact">
                  CONTACT US
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderComponent;

