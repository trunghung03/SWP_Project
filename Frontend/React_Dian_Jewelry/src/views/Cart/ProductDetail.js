import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import sizeGuideImage from '../../assets/img/sizeGuide.jpg';
import SubNav from '../../components/SubNav/SubNav.js';
import '../../styles/Cart/ProductDetail.scss';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';
import { getProductDetail, getDiamondDetail, getCollectionDetail, getShellMaterials, getProductList } from '../../services/ProductService';
import { useCart } from '../../services/CartService';
import HeaderComponent from '../../components/Header/HeaderComponent';
import FooterComponent from '../../components/Footer/FooterComponent';


function ProductDetail() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const location = useLocation();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [showSizeGuide, setShowSizeGuide] = useState(false);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedShell, setSelectedShell] = useState('');
    const [product, setProduct] = useState({});
    const [diamond, setDiamond] = useState({});
    const [collection, setCollection] = useState({});
    const [shellMaterials, setShellMaterials] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [showSpecifications, setShowSpecifications] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [alsoLikeProducts, setAlsoLikeProducts] = useState([]);

    const navigateToProductDetail = (productId) => {
        const productDetailElement = document.getElementById('product_detail');
        if (productDetailElement) {
            const topPos = productDetailElement.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: topPos,
                behavior: 'smooth'
            });
        }
        navigate('/product-detail', { state: { id: productId } });
    };

    useEffect(() => {
        const { id } = location.state || {};
        if (id) {
            getProductDetail(id).then(response => {
                const productData = response.data;
                setProduct(productData);
                setSizes(productData.sizes.map(size => size.toString()));
                const images = productData.imageLinkList.split(';');
                setSelectedImage(images[0]);

                return Promise.all([
                    getDiamondDetail(productData.mainDiamondId),
                    getCollectionDetail(productData.collectionId),
                    getProductList()
                ]).then(([diamondResponse, collectionResponse, productListResponse]) => {
                    setDiamond(diamondResponse.data);
                    setCollection(collectionResponse.data);

                    const relatedProducts = productListResponse.data.filter(product => product.categoryID === productData.categoryId);
                    setAlsoLikeProducts(relatedProducts.slice(0, 4));
                }).catch(error => {
                    console.error('Error fetching product, diamond, or collection details:', error);
                });
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

        if (!selectedSize) {
            swal({
                title: "Have not chosen a size yet!",
                text: "Please choose a size for this jewelry.",
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
                title: "Please sign in or sign up first!",
                text: "Sign in to add jewelry to cart.",
                icon: "warning",
                buttons: {
                    signIn: {
                        text: "Sign In",
                        value: "signIn",
                        className: "swal-button"
                    },
                    ok: {
                        text: "Ok",
                        value: "ok",
                        className: "swal-button"
                    }
                }
            }).then((value) => {
                switch (value) {
                    case "signIn":
                        navigate('/login');
                        break;
                    case "ok":
                        break;
                    default:
                        break;
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
                selectedShellName: selectedShell,
                diamondId: product.mainDiamondId
            };
            addToCart(productToSave);
            navigateToCart();
        }
    };

    const navigateToCart = () => {
        swal({
            title: "Add to cart successfully!",
            text: "You can direct to cart to see your jewelry that you have added.",
            icon: "success",
            button: {
                text: "Ok",
                className: "swal-button"
            }
        });
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

    const toggleSpecifications = () => {
        setShowSpecifications(!showSpecifications);
    };

    const navItems = ['Home', 'Diamond Jewelry', product.name];
    const images = product.imageLinkList ? product.imageLinkList.split(';') : [];

    return (
        <div id="product_detail" className="product_detail">
            <HeaderComponent />
            <SubNav items={navItems} />
            <br />
            <div className="product_detail_container">
                <div className="product_images_detail">
                    <div className="thumbnails">
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`${product.name} ${index + 1}`}
                                className={`thumbnail ${selectedImage === image ? 'selected' : ''}`}
                                onClick={() => setSelectedImage(image)}
                            />
                        ))}
                    </div>
                    <img src={selectedImage} alt={product.name} className="main_image" />
                </div>
                <div className="product_info_detail">
                    <h2 className="product_name_detail">{product.name}</h2>
                    <p className="product_description_detail">
                        {product.description}
                    </p>
                    <p className="product_code_detail"><strong>Code:</strong> {product.productCode}</p>
                    <p className="product_diamond_detail"><strong>Diamond Shape:</strong> {diamond.shape}</p>
                    <p className="product_weight_detail"><strong>Carat:</strong> {diamond.carat}</p>
                    <p className="product_shell_detail"><strong>Shell:</strong>
                        {shellMaterials.map((shell) => (
                            <label key={shell.shellMaterialId} style={{ marginRight: '1px', marginLeft: '15px', color: shell.amountAvailable === 0 ? 'gray' : 'black' }}>
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
                        <p><i className="fas fa-phone"></i> <a href='tel:0795795959'>0795 795 959</a></p>
                        <p><i className="fas fa-shipping-fast"></i> Fast delivery, convenient transaction</p>
                        <p><i className="fas fa-calendar-alt"></i> Order now and ship by <strong> four days </strong> depending on selected size</p>
                    </div>
                    <hr className="product_detail_line" />
                </div>
            </div>
            <div className="product_specification_container">
                <h3 className="product_specification_title" onClick={toggleSpecifications}>
                    Specifications & Descriptions
                    <i className={`fas ${showSpecifications ? 'fa-chevron-up' : 'fa-chevron-down'} specification_toggle_icon`}></i>
                </h3>
                <hr className="product_specification_line"></hr>
                {showSpecifications && (
                    <>
                        <p className="product_specification_trademark"><strong>Trademark:</strong> Dian Jewelry</p>
                        <p className="product_specification_diamond_amount"><strong>Shape:</strong> {diamond.shape}</p>
                        <p className="product_specification_color"><strong>Color:</strong> {diamond.color}</p>
                        <p className="product_specification_cut"><strong>Cut:</strong> {diamond.cut}</p>
                        <p className="product_specification_carat"><strong>Carat:</strong> {diamond.carat}</p>
                        <p className="product_specification_clarity"><strong>Clarity:</strong> {diamond.clarity}</p>
                        <p className="product_specification_sub_diamond_amount"><strong>Sub Diamond Amount:</strong> {product.subDiamondAmount}</p>
                        <p className="product_specification_collection"><strong>Collection:</strong> {collection.name}</p>
                    </>
                )}
            </div>
            {showSizeGuide && (
                <div className="size_guide_popup">
                    <div className="size_guide_content">
                        <img src={sizeGuideImage} alt="Size Guide" />
                        <button onClick={closeSizeGuide} className="close_size_guide"><i className="fas fa-times"></i></button>
                    </div>
                </div>
            )}

            <div>
                <div className="just_for_you_container">
                    <div className="just_for_you_text">
                        <h3><strong>Made Just For You</strong></h3>
                        <p>At our San Francisco design studio, our team designs every ring to delight you, from the first time you see it and every day after. We carefully consider the entire piece—obsessing over comfort, quality, and durability so you can cherish it for a lifetime.</p>
                    </div>
                    <div className="just_for_you_features">
                        <div className="feature">
                            <i className="fas fa-recycle"></i>
                            <p><strong>Recycle Gold and Silver</strong><br />We say no to 'dirty gold'</p>
                        </div>
                        <hr className="jfy_line1" />
                        <div className="feature with-lines">
                            <i className="fas fa-gift"></i>
                            <p><strong>Responsibly Packaged</strong><br />Made with less energy, less water, and fewer emissions</p>
                        </div>
                        <hr className="jfy_line2" />
                        <div className="feature">
                            <i className="fas fa-leaf"></i>
                            <p><strong>Progress to Carbon Neutrality</strong><br />We are committed to protecting the planet</p>
                        </div>
                    </div>
                </div>
                <div className="also_like_container">
                    <h2 className="also_like_title">YOU MAY ALSO LIKE</h2>
                    <div className="also_like_wrapper">
                        {alsoLikeProducts.map((product, index) => (
                            <div key={index} className="also_like_card">
                                <img src={product.imageLinkList} alt={product.name} className="also_like_image" />
                                <button className="also_view_button" onClick={(e) => { e.stopPropagation(); navigateToProductDetail(product.productId); }}>View Detail</button>
                                <p className="also_like_detail">{product.clarity} | {product.carat} | {product.color}</p>
                                <p className="also_like_name">{product.name}</p>
                                <p className="also_like_price">{product.price}$</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <ScrollToTop />
            <FooterComponent />
        </div>
    );
}

export default ProductDetail;
