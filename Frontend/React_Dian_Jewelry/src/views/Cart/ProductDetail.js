import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import sizeGuideImage from '../../assets/img/sizeGuide.jpg';
import SubNav from '../../components/SubNav/SubNav.js';
import '../../styles/Cart/ProductDetail.scss';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';
import { useLocation } from 'react-router-dom';
import YouMayAlsoLike from '../../components/YouMayAlsoLike/YouMayAlsoLike.js';

function ProductDetail() {
    const location = useLocation();
    const product = location.state || {};
    const { image, name, price } = product;
    const navigate = useNavigate();
    const [showSizeGuide, setShowSizeGuide] = useState(false);
    const [selectedSize, setSelectedSize] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const updatedCartItems = [...cartItems, product];
    const handleAddToCart = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            swal("Please sign in or sign up an account first.", {
                icon: "warning",
            });
        } else {
            saveProductToLocalStorage(product);
            navigateToCart();
        }
    };
    console.log(localStorage.getItem("cartItems"));
    const saveProductToLocalStorage = (product) => {
        // Retrieve the existing cart items from localStorage
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        // Add the new product to the cart items
        const updatedCartItems = [...cartItems, product];
        
        // Save the updated cart items back to localStorage
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };
    const navigateToCart = () => {
        navigate('/cart');
    };

    const openSizeGuide = () => {
        setShowSizeGuide(true);
    };

    const closeSizeGuide = () => {
        setShowSizeGuide(false);
    };

    const navItems = ['Home', 'Diamond Jewelry', name];

    return (
        <div className="product_detail">
            <SubNav items={navItems} />
            <br />
            <div className="product_detail_container">
                <div className="product_image_detail">
                    <img src={image} alt={name} />
                    <div className="product_contact_detail">
                        <p><i className="fas fa-envelope"></i> example@gmail.com</p>
                        <p><i className="fas fa-phone"></i> 0912 345 678</p>
                    </div>
                </div>
                <div className="product_info_detail">
                    <h2 className="product_name_detail">{name}</h2>
                    <p className="product_description_detail">
                        Alternating round and marquise diamonds create an alluring pattern across the top of this chic and distinctive ring.
                    </p>
                    <p className="product_code_detail"><strong>Code:</strong> 129029012</p>
                    <p className="product_weight_detail"><strong>Total Carat Weight:</strong> 3/8 ct. tw.</p>
                    <p className="product_shell_detail"><strong>Shell:</strong> S2272</p>
                    <p className="product_sub_diamond_detail"><strong>Sub diamond:</strong> D8227</p>
                    <div className="price_size_container">
                        <p className="product_price_detail">${price}</p>
                        <div className="size_guide_container">
                            <button onClick={openSizeGuide} className="size_guide_detail">Size guide</button>
                            <select
                                className="ring_size_detail"
                                value={selectedSize}
                                onChange={(e) => setSelectedSize(e.target.value)}
                            >
                                <option value="">Size</option>
                                <option value="5">Size 5</option>
                                <option value="6">Size 6</option>
                                <option value="7">Size 7</option>
                                <option value="8">Size 8</option>
                                <option value="9">Size 9</option>
                                <option value="10">Size 10</option>
                                <option value="11">Size 11</option>
                            </select>
                        </div>
                    </div>
                    <div className="product_actions_detail">
                        <button className="add_to_cart_btn" onClick={handleAddToCart}>
                            <i className="fas fa-shopping-cart"></i> Add to cart
                        </button>
                    </div>
                    <hr className="product_detail_line" />
                    <div className="product_delivery_detail">
                        <p><i className="fas fa-shipping-fast"></i> Fast Delivery</p>
                        <p><i className="fas fa-calendar-alt"></i> Order now and ship by <strong> four days </strong> depending on selected size</p>
                    </div>
                    <hr className="product_detail_line" />
                </div>
            </div>
            {showSizeGuide && (
                <div className="size_guide_popup">
                    <div className="size_guide_content">
                        <img src={sizeGuideImage} alt="Size Guide" />
                        <button onClick={closeSizeGuide} className="close_size_guide"><i className="fas fa-times"></i></button>
                    </div>
                </div>
            )}
            <YouMayAlsoLike />
            <ScrollToTop />
        </div>
    );
}

export default ProductDetail;
