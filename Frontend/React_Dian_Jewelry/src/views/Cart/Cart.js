import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SubNav from '../../components/SubNav/SubNav.js';
import sizeGuideImage from '../../assets/img/sizeGuide.jpg';
import { useNavigate } from 'react-router-dom';
import '../../styles/Cart/Cart.scss';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';
import YouMayAlsoLike from '../../components/YouMayAlsoLike/YouMayAlsoLike.js';

function Cart() {
    const navigate = useNavigate();
    const navItems = ['Home', 'Cart'];
    const [showSizeGuide, setShowSizeGuide] = useState(false);
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')) || []);

    useEffect(() => {
        setCartItems(JSON.parse(localStorage.getItem('cartItems')) || []);
    }, []);

    const openSizeGuide = () => {
        setShowSizeGuide(true);
    };

    const closeSizeGuide = () => {
        setShowSizeGuide(false);
    };

    const handleCheckoutPage = () => {
        if (cartItems.length === 0) {
            swal({
                title: "There are no products in the cart!",
                text: "Please add something to the cart first.",
                icon: "warning",
                button: {
                    text: "Ok",
                    className: "swal-button"
                }
            });
            return;
        }
        navigate('/checkout');
    };

    const handleContinueShopping = () => {
        navigate('/diamondJewelry');
    };

    const handleRemoveItem = (index) => {
        const updatedCartItems = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    const handleSizeChange = (e, index) => {
        const newSize = e.target.value;
        const updatedCartItems = [...cartItems];
        updatedCartItems[index].selectedSize = newSize;
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    const handleViewProduct = (productId) => {
        navigate('/productDetail', { state: { id: productId } });
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
    };

    return (
        <div className="cart">
            <SubNav items={navItems} />
            <div className="cart_main_container">
                <div className="cart_header">
                    <div className="cart_title">
                        <i className="fas fa-shopping-cart"></i> My Cart ({cartItems.length})
                    </div>
                    <div className="continue_shopping" onClick={handleContinueShopping}>
                        &lt; Continue Shopping
                    </div>
                </div>

                <div className="cart_container">
                    <div className="cart_items">
                        {cartItems.map((item, index) => (
                            <div className="cart_item" key={index}>
                                <img src={item.image} className="cart_item_image" alt={item.name} />
                                <div className="cart_item_details">
                                    <div className="cart_item_header">
                                        <h5 className="cart_item_name">{item.name}</h5>
                                        <div className="cart_item_links">
                                            <a onClick={() => handleViewProduct(item.productId)} className="cart_item_view">VIEW</a>
                                            <span> | </span>
                                            <a className="cart_item_remove" onClick={() => handleRemoveItem(index)}>REMOVE</a>
                                        </div>
                                    </div>
                                    <p className="cart_item_description">
                                        Shell: {item.selectedShellName}<br />
                                    </p>
                                    <div className="cart_item_actions">
                                        <div className="cart_size_guide_container">
                                            <select
                                                className="cart_ring_size_detail"
                                                value={item.selectedSize || ''}
                                                onChange={(e) => handleSizeChange(e, index)}
                                            >
                                                <option value="">Size</option>
                                                {item.sizes.map((size, sizeIndex) => (
                                                    <option key={sizeIndex} value={size}>Size {size}</option>
                                                ))}
                                            </select>
                                            <button onClick={openSizeGuide} className="cart_size_guide_detail">Size guide</button>
                                        </div>
                                    </div>
                                    <div className="cart_item_price">{item.price}$</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart_summary">
                        <h5 className="cart_summary_title"><i className="fas fa-receipt"></i> Summary</h5>
                        <div className="cart_summary_details">
                            <p className="cart_summary_subtotal"><span>Subtotal</span><span><strong>{calculateTotal()}$</strong></span></p>
                            <p className="cart_summary_total"><span>Total</span><span><strong>{calculateTotal()}$</strong></span></p>
                        </div>
                        <hr></hr>
                        <button onClick={handleCheckoutPage} className="cart_summary_checkout">Proceed to checkout</button>
                        <div className="cart_summary_service">
                            <p className="24/7_service"><strong>24/7 Customer Service</strong></p>
                            <p className="phone_service"><i className="fas fa-phone"></i> 0912 345 678</p>
                        </div>
                    </div>
                </div>
            </div>

            {showSizeGuide && (
                <div className="cart_size_guide_popup">
                    <div className="cart_size_guide_content">
                        <img src={sizeGuideImage} alt="Size Guide" />
                        <button onClick={closeSizeGuide} className="cart_close_size_guide"><i className="fas fa-times"></i></button>
                    </div>
                </div>
            )}
            <YouMayAlsoLike />
            <ScrollToTop />
        </div>
    );
}

export default Cart;
