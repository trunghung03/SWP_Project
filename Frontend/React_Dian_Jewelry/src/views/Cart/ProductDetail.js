import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import sizeGuideImage from '../../assets/img/sizeGuide.jpg';
import SubNav from '../../components/SubNav/SubNav.js';
import '../../styles/Cart/ProductDetail.scss';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';
import YouMayAlsoLike from '../../components/YouMayAlsoLike/YouMayAlsoLike.js';
import { getProductDetail, getDiamondDetail, getCollectionDetail, getShellMaterials } from '../../services/ProductService';

function ProductDetail() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const location = useLocation();
    const navigate = useNavigate();
    const [showSizeGuide, setShowSizeGuide] = useState(false);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedShell, setSelectedShell] = useState('');
    const [product, setProduct] = useState({});
    const [diamond, setDiamond] = useState({});
    const [collection, setCollection] = useState({});
    const [shellMaterials, setShellMaterials] = useState([]);
    const [sizes, setSizes] = useState([]);

    useEffect(() => {
        const { id } = location.state || {};
        if (id) {
            getProductDetail(id).then(response => {
                const productData = response.data;
                setProduct(productData);
                setSizes(productData.sizes.map(size => size.toString()));

                return Promise.all([
                    getDiamondDetail(productData.mainDiamondId),
                    getCollectionDetail(productData.collectionId)
                ]);
            }).then(([diamondResponse, collectionResponse]) => {
                setDiamond(diamondResponse.data);
                setCollection(collectionResponse.data);
            }).catch(error => {
                console.error('Error fetching product, diamond, or collection details:', error);
            });

            getShellMaterials().then(response => {
                setShellMaterials(response.data);
            }).catch(error => {
                console.error('Error fetching shell materials:', error);
            });
        }
    }, [location.state]);

    const handleAddToCart = () => {
        if (!selectedShell) {
            swal({
                title: "Have not chosen a shell yet!",
                text: "Please choose a shell type for this jewelry.",
                icon: "warning",
                button: {
                    text: "Ok",
                    className: "swal-button"
                }
            });
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            swal({
                title: "Cannot add to cart!",
                text: "Please sign in or sign up for an account first.",
                icon: "warning",
                button: {
                    text: "Ok",
                    className: "swal-button"
                }
            });
        } else {
            const productToSave = {
                productId: product.productId,
                name: product.name,
                image: product.imageLinkList,
                code: product.productCode,
                price: product.price,
                selectedSize,
                sizes: product.sizes.map(size => size.toString()),
                selectedShellId: shellMaterials.find(shell => shell.name === selectedShell)?.shellMaterialId,
                selectedShellName: selectedShell
            };
            saveProductToLocalStorage(productToSave);
            navigateToCart();
        }
    };

    const saveProductToLocalStorage = (product) => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const updatedCartItems = [...cartItems, product];
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

    const handleShellChange = (e) => {
        setSelectedShell(e.target.value);
    };

    const handleSizeChange = (e) => {
        setSelectedSize(e.target.value);
    };

    const navItems = ['Home', 'Diamond Jewelry', product.name];

    return (
        <div className="product_detail">
            <SubNav items={navItems} />
            <br />
            <div className="product_detail_container">
                <div className="product_image_detail">
                    <img src={product.imageLinkList} alt={product.name} />
                    <div className="product_contact_detail">
                        <p><i className="fas fa-envelope"></i> example@gmail.com</p>
                        <p><i className="fas fa-phone"></i> 0912 345 678</p>
                    </div>
                </div>
                <div className="product_info_detail">
                    <h2 className="product_name_detail">{product.name}</h2>
                    <p className="product_description_detail">
                        {product.description}
                    </p>
                    <p className="product_code_detail"><strong>Code:</strong> {product.productCode}</p>
                    <p className="product_diamond_detail"><strong>Diamond:</strong> {diamond.cut}</p>
                    <p className="product_weight_detail"><strong>Carat:</strong> {diamond.carat}</p>
                    <p className="product_shell_detail"><strong>Shell:</strong>
                        {shellMaterials.map((shell) => (
                            <label key={shell.shellMaterialId} style={{ marginRight: '10px', color: shell.amountAvailable === 0 ? 'gray' : 'black' }}>
                                <input
                                    className="shell_checkbox"
                                    type="radio"
                                    value={shell.name}
                                    checked={selectedShell === shell.name}
                                    onChange={handleShellChange}
                                    disabled={shell.amountAvailable === 0}
                                />
                                {shell.name}
                            </label>
                        ))}
                    </p>
                    <div className="price_size_container">
                        <p className="product_price_detail">{product.price}$</p>
                        <div className="size_guide_container">
                            <button onClick={openSizeGuide} className="size_guide_detail">Size guide</button>
                            <select
                                className="ring_size_detail"
                                value={selectedSize}
                                onChange={handleSizeChange}
                            >
                                <option value="">Size</option>
                                {sizes.map((size, index) => (
                                    <option key={index} value={size}>Size {size}</option>
                                ))}
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
            <div className="product_specification_container">
                <h3 className="product_specification_title">Specifications & Descriptions</h3>
                <hr className="product_specification_line"></hr>
                <p className="product_specification_trademark"><strong>Trademark:</strong> Dian Jewelry</p>
                <p className="product_specification_diamond_amount"><strong>Main Diamond:</strong> {diamond.name}</p>
                <p className="product_specification_color"><strong>Color:</strong> {diamond.color}</p>
                <p className="product_specification_cut"><strong>Cut:</strong> {diamond.cut}</p>
                <p className="product_specification_carat"><strong>Carat:</strong> {diamond.carat}</p>
                <p className="product_specification_clarity"><strong>Clarity:</strong> {diamond.clarity}</p>
                <p className="product_specification_diamond_size"><strong>Size:</strong> {diamond.diamondSize}</p>
                <p className="product_specification_sub_diamond_amount"><strong>Sub Diamond Amount:</strong> {product.subDiamondAmount}</p>
                <p className="product_specification_collection"><strong>Collection:</strong> {collection.name}</p>
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
