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
import { getShellByProductId, checkProductStock, getProductDetail, getDiamondDetail } from '../../services/ProductService';
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
    const [shellData, setShellData] = useState({});
    const [diamondAttributes, setDiamondAttributes] = useState({});
    const [filteredCartItems, setFilteredCartItems] = useState([]);

    useEffect(() => {
        const cartKey = `cartItems${customerId}`;
        const storedCartItems = JSON.parse(localStorage.getItem(cartKey)) || [];
        setFilteredCartItems(storedCartItems);

        storedCartItems.forEach(item => {
            if (!item.selectedShellName) {
                fetchDiamondAttributes(item.productId);
            } else {
                getShellByProductId(item.productId).then(response => {
                    setShellData(prevShellData => ({
                        ...prevShellData,
                        [item.productId]: response.data
                    }));
                }).catch(error => {
                    console.error('Error fetching shell data:', error);
                });
            }
        });

        checkStockStatus(storedCartItems);
    }, [customerId, cartItems]);

    const fetchDiamondAttributes = async (productId) => {
        try {
            const productResponse = await getProductDetail(productId);
            const mainDiamondAttributeId = productResponse.data.mainDiamondAttributeId;
            const diamondResponse = await getDiamondDetail(mainDiamondAttributeId);
            const diamondDetails = diamondResponse.data;
            setDiamondAttributes(prev => ({
                ...prev,
                [productId]: diamondDetails
            }));
        } catch (error) {
            console.error('Error fetching diamond attributes:', error);
        }
    };

    const checkStockStatus = async (items) => {
        try {
            const stockChecks = await Promise.all(
                items.map(item =>
                    checkProductStock(item.productId)
                        .then(response => ({
                            ...item,
                            isOutOfStock: response.data === "Not enough stock"
                        }))
                        .catch(error => ({
                            ...item,
                            isOutOfStock: true
                        }))
                )
            );
            setFilteredCartItems(stockChecks);
        } catch (error) {
            console.error('Error checking stock status:', error);
        }
    };

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

    const handleCheckoutPage = async () => {
        const updatedCartItems = JSON.parse(localStorage.getItem(`cartItems${customerId}`)) || [];

        if (updatedCartItems.length === 0) {
            toast.warn("Please add something first! There is nothing in the cart.", {
                position: "top-right",
                autoClose: 3000
            });
            return;
        }

        const missingSizeItems = updatedCartItems.some(item => !item.selectedSize && item.selectedShellName);
        if (missingSizeItems) {
            toast.warn("Please select a size for jewelry in your cart.", {
                position: "top-right",
                autoClose: 3000
            });
            return;
        }

        try {
            const stockChecks = await Promise.all(
                updatedCartItems.map(item =>
                    checkProductStock(item.productId)
                        .then(response => ({
                            ...item,
                            isOutOfStock: response.data === "Not enough stock"
                        }))
                        .catch(error => ({
                            ...item,
                            isOutOfStock: true
                        }))
                )
            );

            const hasOutOfStockItems = stockChecks.some(item => item.isOutOfStock);

            if (hasOutOfStockItems) {
                toast.error("Some products in your cart are currently sold out. Please remove them to checkout.", {
                    position: "top-right",
                    autoClose: 3000
                });
                setFilteredCartItems(stockChecks);
                return;
            }

            localStorage.setItem('fromCart', 'true');
            navigate('/checkout', { state: { cartItems: updatedCartItems } });
        } catch (error) {
            toast.error("Some products in your cart are currently sold out. Please remove them to checkout.", {
                position: "top-right",
                autoClose: 3000
            });
            console.error(error);
        }
    };

    const handleContinueShopping = () => {
        navigate('/diamond-jewelry', { state: { category: 'all' } });
    };

    const handleSizeChange = (e, index) => {
        const newSize = e.target.value;
        const updatedItem = { ...cartItems[index], selectedSize: newSize };

        const shellEntry = shellData[updatedItem.productId]?.find(shell => shell.size === parseFloat(newSize) && shell.shellMaterialName === updatedItem.selectedShellName);

        if (shellEntry) {
            updatedItem.selectedShellId = shellEntry.shellId;
        }

        updateCartItem(index, updatedItem);

        const updatedCartItems = [...cartItems];
        updatedCartItems[index] = updatedItem;
        localStorage.setItem(`cartItems${customerId}`, JSON.stringify(updatedCartItems));
    };

    const handleViewProduct = (product) => {
        const productName = product.name.replace(/\s+/g, '-').toLowerCase();
        const targetPath = product.selectedShellName ? `/product-detail/${productName}` : `/diamond-detail/${productName}`;
        navigate(targetPath, { state: { id: product.productId } });
    };

    const handleRemoveFromCart = (index) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems.splice(index, 1);
        localStorage.setItem(`cartItems${customerId}`, JSON.stringify(updatedCartItems));
        setFilteredCartItems(updatedCartItems);
        removeFromCart(index);
    };

    const calculateTotal = () => {
        return Math.floor(filteredCartItems.reduce((total, item) => {
            if (!item.isOutOfStock) {
                return total + parseFloat(item.price);
            }
            return total;
        }, 0));
    };

    const getAvailableSizes = (productId, shellMaterialName) => {
        return shellData[productId]?.filter(shell => shell.shellMaterialName === shellMaterialName);
    };

    const availableCartItemsCount = filteredCartItems.filter(item => !item.isOutOfStock).length;

    return (
        <div className={`cart ${showSizeGuide ? 'no-scroll' : ''}`}>
            <HeaderComponent />
            <SubNav items={navItems} />
            <ToastContainer />
            <div className="cart_main_container">
                <div className="cart_header">
                    <div className="cart_title">
                        <i className="fas fa-shopping-cart"></i> My Cart ({availableCartItemsCount})
                    </div>
                    <div className="continue_shopping" onClick={handleContinueShopping}>
                        &lt; Continue Shopping
                    </div>
                </div>

                <div className="cart_container">
                    {filteredCartItems.length === 0 ? (
                        <div className="cart_empty_message">
                            <p>Nothing here... Let's add something to the cart!</p>
                        </div>
                    ) : (
                        <div className="cart_items">
                            {filteredCartItems.map((item, index) => {
                                const firstImage = item.image.split(';')[0];
                                const availableSizes = getAvailableSizes(item.productId, item.selectedShellName);
                                const isOutOfStock = item.isOutOfStock;
                                const diamondAttr = diamondAttributes[item.productId];
                                return (
                                    <div className={`cart_item ${isOutOfStock ? 'out-of-stock' : ''}`} key={index}>
                                        <img src={firstImage} className="cart_item_image" alt={item.name} />
                                        <div className="cart_item_details">
                                            <div className="cart_item_header">
                                                <h5 className={`cart_item_name ${isOutOfStock ? 'text-grey' : ''}`}>
                                                    {item.name} {isOutOfStock && <span className="out-of-stock-text">(Sold out)</span>}
                                                </h5>
                                                <div className="cart_item_links">
                                                    <span onClick={() => !isOutOfStock && handleViewProduct(item)} className={`cart_item_view ${isOutOfStock ? 'disabled text-grey unclickable' : ''}`}>VIEW</span>
                                                    <span> | </span>
                                                    <a className="cart_item_remove" onClick={() => handleRemoveFromCart(index)}>REMOVE</a>
                                                </div>
                                            </div>
                                            {diamondAttr && !item.selectedShellName && (
                                                <p className={`cart_item_diamond_attributes ${isOutOfStock ? 'text-grey' : 'text-diamond-data' }`}>
                                                    {diamondAttr.cut} Cutㅤ|ㅤ{diamondAttr.color} Colorㅤ|ㅤ{diamondAttr.clarity} Clarity
                                                </p>
                                            )}
                                            <p className={`cart_item_description ${isOutOfStock ? 'text-grey' : 'text-diamond-only'}`}>
                                                {item.selectedShellName ? `Shell: ${item.selectedShellName}` : '(Only diamond)'}<br />
                                            </p>
                                            {item.selectedShellName && (
                                                <div className="cart_item_actions">
                                                    <div className="cart_size_guide_container">
                                                        <select
                                                            className={`cart_ring_size_detail ${isOutOfStock ? 'disabled' : ''}`}
                                                            value={item.selectedSize || ''}
                                                            onChange={(e) => handleSizeChange(e, index)}
                                                            disabled={isOutOfStock}
                                                        >
                                                            <option value="">Size</option>
                                                            {availableSizes?.map((shell, sizeIndex) => (
                                                                <option key={sizeIndex} value={shell.size} disabled={shell.amountAvailable === 0}>
                                                                    Size {shell.size}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <span onClick={() => !isOutOfStock && openSizeGuide(item.categoryId)} className={`cart_size_guide_detail ${isOutOfStock ? 'disabled text-grey unclickable' : ''}`}>Size guide</span>
                                                    </div>
                                                </div>
                                            )}
                                            <div className={`cart_item_price ${isOutOfStock ? 'text-grey' : ''}`}>${Math.floor(item.price)}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    <div className="cart_summary">
                        <h5 className="cart_summary_title"><i className="fas fa-receipt"></i> Summary</h5>
                        <div className="cart_summary_details">
                            <p className="cart_summary_subtotal"><span>Subtotal</span><span><strong>${calculateTotal()}</strong></span></p>
                            <p className="cart_summary_total"><span>Total</span><span><strong>${calculateTotal()}</strong></span></p>
                        </div>
                        <hr />
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
            <br /><br />
            <Insta />
            <ScrollToTop />
            <FooterComponent />
        </div>
    );
}

export default Cart;
