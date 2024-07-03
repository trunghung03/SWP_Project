import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ringSizeGuide from '../../assets/img/sgRing.jpg';
import braceletSizeGuide from '../../assets/img/sgBracelet.jpg';
import earringSizeGuide from '../../assets/img/sgEaring.jpeg';
import necklaceSizeGuide from '../../assets/img/sgNecklace.jpg';
import SubNav from '../../components/SubNav/SubNav.js';
import '../../styles/Cart/Cart.scss';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';
import { useCart } from '../../services/CartService';
import HeaderComponent from '../../components/Header/HeaderComponent';
import FooterComponent from '../../components/Footer/FooterComponent';
import Insta from '../../components/BlogInspired/BlogInspired.js';

function Cart() {
    const navigate = useNavigate();
    const navItems = [
        { name: 'Home', link: '/home' },
        { name: 'Cart', link: '/cart' }
    ];
    const [showSizeGuide, setShowSizeGuide] = useState(false);
    const [sizeGuideImage, setSizeGuideImage] = useState(null);
    const customerId = localStorage.getItem('customerId');
    const { cartItems, removeFromCart, updateCartItem } = useCart();
    const [filteredCartItems, setFilteredCartItems] = useState([]);

    useEffect(() => {
        const cartKey = `cartItems${customerId}`;
        const storedCartItems = JSON.parse(localStorage.getItem(cartKey)) || [];
        setFilteredCartItems(storedCartItems);
    }, [customerId, cartItems]);

    const openSizeGuide = (categoryId) => {
        switch (categoryId) {
            case 1:
            case 5:
            case 9:
                setSizeGuideImage(ringSizeGuide);
                break;
            case 2:
            case 6:
                setSizeGuideImage(earringSizeGuide);
                break;
            case 3:
            case 7:
                setSizeGuideImage(braceletSizeGuide);
                break;
            case 4:
            case 8:
                setSizeGuideImage(necklaceSizeGuide);
                break;
            default:
                setSizeGuideImage(null);
        }
        setShowSizeGuide(true);
        document.body.classList.add('no-scroll');
    };

    const closeSizeGuide = () => {
        setShowSizeGuide(false);
        document.body.classList.remove('no-scroll');
    };

    const handleCheckoutPage = () => {
        const updatedCartItems = JSON.parse(localStorage.getItem(`cartItems${customerId}`)) || [];

        if (updatedCartItems.length === 0) {
            toast.warn("Please add something first! There are nothing in the cart.", {
                position: "top-right",
                autoClose: 8000
            });
            return;
        }

        const missingSizeItems = updatedCartItems.some(item => !item.selectedSize);
        if (missingSizeItems) {
            toast.warn("Please select a size for jewelry in your cart.", {
                position: "top-right",
                autoClose: 8000
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

    const handleViewProduct = (product) => {
        const productName = product.name.replace(/\s+/g, '-').toLowerCase();
        navigate(`/product-detail/${productName}`, { state: { id: product.productId } });
    };

    const calculateTotal = () => {
        return Math.floor(cartItems.reduce((total, item) => total + parseFloat(item.price), 0));
    };

    return (
        <div className={`cart ${showSizeGuide ? 'no-scroll' : ''}`}>
            <HeaderComponent />
            <SubNav items={navItems} />
            <ToastContainer /> 
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
                                                    <a onClick={() => handleViewProduct(item)} className="cart_item_view">VIEW</a>
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
                                                    <button onClick={() => openSizeGuide(item.categoryId)} className="cart_size_guide_detail">Size guide</button>
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
            <br></br><br></br>
            <Insta />
            <ScrollToTop />
            <FooterComponent />
        </div>
    );
}

export default Cart;
