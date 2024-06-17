import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import sizeGuideImage from '../../assets/img/sgRing.jpg';
import SubNav from '../../components/SubNav/SubNav.js';
import '../../styles/Cart/Cart.scss';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';
import { useCart } from '../../services/CartService';
import HeaderComponent from '../../components/Header/HeaderComponent';
import FooterComponent from '../../components/Footer/FooterComponent';


function Cart() {
    const navigate = useNavigate();
    const navItems = [
        { name: 'Home', link: '/home' },
        { name: 'Cart', link: '/cart' }
    ];
    const [showSizeGuide, setShowSizeGuide] = useState(false);
    const customerId = localStorage.getItem('customerId');
    const { cartItems, removeFromCart, updateCartItem } = useCart();
    const [filteredCartItems, setFilteredCartItems] = useState([]);

    useEffect(() => {
        const cartKey = `cartItems${customerId}`;
        const storedCartItems = JSON.parse(localStorage.getItem(cartKey)) || [];
        setFilteredCartItems(storedCartItems);
    }, [customerId, cartItems]);

    const openSizeGuide = () => {
        setShowSizeGuide(true);
    };

    const closeSizeGuide = () => {
        setShowSizeGuide(false);
    };

    const handleCheckoutPage = () => {
        const updatedCartItems = JSON.parse(localStorage.getItem(`cartItems${customerId}`)) || [];

        if (updatedCartItems.length === 0) {
            swal({
                title: "Please add something to the cart!",
                text: "There are no products in the cart.",
                icon: "warning",
                button: {
                    text: "Ok",
                    className: "swal-button"
                }
            });
            return;
        }

        const missingSizeItems = updatedCartItems.some(item => !item.selectedSize);
        if (missingSizeItems) {
            swal({
                title: "Have not chosen a size yet!",
                text: "Please select a size for all jewelries.",
                icon: "warning",
                button: {
                    text: "Ok",
                    className: "swal-button"
                }
            });
            return;
        }

        localStorage.setItem('fromCart', 'true');
        navigate('/checkout', { state: { cartItems: updatedCartItems } });
    };


    const handleContinueShopping = () => {
        navigate('/diamond-jewelry', { state: { category: 'all' } });
    };

    const handleSizeChange = (e, index) => {
        const newSize = e.target.value;
        const updatedItem = { ...cartItems[index], selectedSize: newSize };
        updateCartItem(index, updatedItem);
    };

    const handleViewProduct = (productId) => {
        navigate('/product-detail', { state: { id: productId } });
    };

    const calculateTotal = () => {
        return Math.floor(cartItems.reduce((total, item) => total + parseFloat(item.price), 0));
    };

    return (
        <div className="cart">
            <HeaderComponent />
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
                        {cartItems.length === 0 ? (
                            <div className="cart_empty_message">
                                Nothing here... Let's add something to the cart!
                            </div>
                        ) : (
                            cartItems.map((item, index) => {
                                const firstImage = item.image.split(';')[0];
                                return (
                                    <div className="cart_item" key={index}>
                                        <img src={firstImage} className="cart_item_image" alt={item.name} />
                                        <div className="cart_item_details">
                                            <div className="cart_item_header">
                                                <h5 className="cart_item_name">{item.name}</h5>
                                                <div className="cart_item_links">
                                                    <a onClick={() => handleViewProduct(item.productId)} className="cart_item_view">VIEW</a>
                                                    <span> | </span>
                                                    <a className="cart_item_remove" onClick={() => removeFromCart(index)}>REMOVE</a>
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
                                            <div className="cart_item_price">{Math.floor(item.price)}$</div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
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
                            <a href='tel:0795795959'><p className="phone_service"><i className="fas fa-phone"></i> 0795 795 959</p></a>
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
            <ScrollToTop />
            <FooterComponent />
        </div>
    );
}

export default Cart;
