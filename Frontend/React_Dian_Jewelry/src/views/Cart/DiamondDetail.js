import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ringSizeGuide from '../../assets/img/sgRing.jpg';
import braceletSizeGuide from '../../assets/img/sgBracelet.jpg';
import earringSizeGuide from '../../assets/img/sgEaring.jpeg';
import necklaceSizeGuide from '../../assets/img/sgNecklace.jpg';
import SubNav from '../../components/SubNav/SubNav.js';
import '../../styles/Cart/ProductDetail.scss';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';
import { getProductList, getProductDetail, getDiamondDetail, getCollectionDetail, getShellMaterials, getShellByProductId, checkProductStock } from '../../services/ProductService';
import { useCart } from '../../services/CartService';
import HeaderComponent from '../../components/Header/HeaderComponent';
import FooterComponent from '../../components/Footer/FooterComponent';
import Insta from '../../components/BlogInspired/BlogInspired.js';
import CollectionSlide from '../../components/CollectionSlide/CollectionSlide';
import GIA from '../../assets/img/gia2.jpg';
import Loading from '../../components/Loading/Loading';

function DiamondDetail() {
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
  const [showSpecifications, setShowSpecifications] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [alsoLikeProducts, setAlsoLikeProducts] = useState([]);
  const [shellPrice, setShellPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [shellData, setShellData] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [availableShells, setAvailableShells] = useState([]);

  const navigateToProductDetail = (product) => {
    const productId = product.productId;
    const productName = product.name.replace(/\s+/g, '-').toLowerCase();
    navigate(`/product-detail/${productName}`, { state: { id: productId } });
    window.scrollTo(0, 220);
  };

  useEffect(() => {
    window.scrollTo(0, 220);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 220);
    const { id } = location.state || {};
    if (id) {
      setLoading(true);
      getProductDetail(id).then(response => {
        const productData = response.data;
        setProduct(productData);
        setSizes(productData.sizes.map(size => size.toString()));
        const images = productData.imageLinkList.split(';');
        setSelectedImage(images[0]);

        return Promise.all([
          getDiamondDetail(productData.mainDiamondAttributeId).catch(error => {
            throw error;
          }),
          getCollectionDetail(productData.collectionId).catch(error => {
            throw error;
          }),
          getShellByProductId(id).catch(error => {
            throw error;
          }),
          getProductList().catch(error => {
            throw error;
          })
        ]).then(([diamondResponse, collectionResponse, shellResponse, productListResponse]) => {
          setDiamond(diamondResponse.data);
          setCollection(collectionResponse.data);
          setShellData(shellResponse.data);

          const relatedProducts = productListResponse.data.filter(product => product.categoryID === productData.categoryId);
          const currentIndex = relatedProducts.findIndex(p => p.productId === productData.productId);
          let nextProducts = [];

          if (currentIndex !== -1) {
            nextProducts = relatedProducts.slice(currentIndex + 1, currentIndex + 5);
            if (nextProducts.length < 4) {
              nextProducts = nextProducts.concat(relatedProducts.slice(0, 4 - nextProducts.length));
            }
          }

          setAlsoLikeProducts(nextProducts);

          const uniqueShells = [...new Set(shellResponse.data.map(shell => shell.shellMaterialName))];
          setAvailableShells(uniqueShells);
          const uniqueSizes = [...new Set(shellResponse.data.map(shell => shell.size))];
          setAvailableSizes(uniqueSizes);
        }).catch(error => {
          console.error(error);
        }).finally(() => {
          setLoading(false);
        });
      }).catch(error => {
        setLoading(false);
      });

      getShellMaterials().then(response => {
        setShellMaterials(response.data);
      }).catch(error => {
        console.error(error);
      });
    }
  }, [location.state]);

  const handleAddToCart = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.warn("Please sign in or sign up to add jewelry to cart.", {
        position: "top-right",
        autoClose: 3000
      });
      return;
    }

    checkProductStock(product.productId).then(response => {
      if (response.data === "Not enough stock") {
        toast.error("Sorry, this product is out of stock.", {
          position: "top-right",
          autoClose: 3000
        });
        return;
      } else {
        const shellEntry = shellData.find(shell => shell.productId === product.productId && shell.size === parseFloat(selectedSize) && shell.shellMaterialName === selectedShell);

        const productToSave = {
          productId: product.productId,
          name: product.name,
          image: product.imageLinkList,
          code: product.productCode,
          price: product.price + shellPrice,
          selectedSize,
          sizes: product.sizes.map(size => size.toString()),
          selectedShellId: shellEntry?.shellId,
          selectedShellName: selectedShell,
          diamondId: product.mainDiamondId,
          categoryId: product.categoryId
        };
        addToCart(productToSave);
        navigateToCart();
      }
    }).catch(error => {
      toast.error("This product is currently out of stock. Sorry for this inconvenience.", {
        position: "top-right",
        autoClose: 3000
      });
      console.error(error);
    });
  };

  const navigateToCart = () => {
    toast.success("Add to cart successfully!", {
      position: "top-right",
      autoClose: 1000
    });
  };

  const navItems = [
    { name: 'Home', link: '/home' },
    { name: 'Diamonds', link: '/diamond-price' },
    { name: diamond.carat + ' Carat ' + diamond.shape + ' Diamond ', link: '' }
  ];

  const images = product.imageLinkList ? product.imageLinkList.split(';') : [];


  if (loading) {
    return (
      <div>
        <HeaderComponent />
        <Loading />
        <ScrollToTop />
        <FooterComponent />
      </div>
    );
  }

  return (
    <div id="product_detail" className={`product_detail ${showSizeGuide ? 'no-scroll' : ''}`}>
      <HeaderComponent />
      <SubNav items={navItems} />
      <ToastContainer />

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
          <h2 className="product_name_detail">{diamond.carat} Carat {diamond.shape} Diamond</h2>
          <p className="product_diamond_description">{diamond.cut} Cutㅤ|ㅤ{diamond.color} Colorㅤ|ㅤ{diamond.clarity} Clarity</p>
          <div className="price_size_container">
            <p className="product_price_detail">${product.price + shellPrice} (Only Diamond)</p>
          </div>
          <div className="product_actions_detail">
            <button
              className="add_to_cart_btn"
              onClick={handleAddToCart}
            >
              <i className="fas fa-shopping-cart"></i> Add to cart
            </button>
          </div>
          <hr className="product_detail_line" />
          <div className="product_delivery_detail">
            <p><i className="fas fa-phone"></i> <a href='tel:0795795959'>0795 795 959</a></p>
            <p><i className="fas fa-shipping-fast"></i> Fast delivery, convenient transaction</p>
            <p><i className="fas fa-calendar-alt"></i> Order now and ship by four days</p>
          </div>
          <hr className="product_detail_line" />
        </div>
      </div>

      <div className="also_like_container">
        <h2 className="also_like_title">You May Also Like</h2>
        <div className="also_like_wrapper">
          {alsoLikeProducts.map((product, index) => (
            <div key={index} className="also_like_card" onClick={() => navigateToProductDetail(product)}>
              <img src={product.imageLinkList} alt={product.name} className="also_like_image" />
              <div className="also_product_view_icon_wrapper" data-tooltip="View detail">
                <i className="far fa-eye also_product_view_icon"></i>
              </div>
              <p className="also_like_detail">{product.clarity} | {product.carat} | {product.color}</p>
              <p className="also_like_name">{product.name}</p>
              <p className="also_like_price">${product.price}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="just_for_you_container">
          <div className="just_for_you_text">
            <h3><strong>Made Just For You</strong></h3>
            <p>At our San Francisco design studio, our team designs every ring to delight you, from the first time you see it and every day after. We carefully consider the entire piece—obsessing over comfort, quality, and durability so you can cherish it for a lifetime.</p>
          </div>
          <div className="just_for_you_features">
            <div className="feature">
              <i className="fas fa-recycle"></i>
              <p><strong>Recycled Gold and Silver</strong><br />We say no to 'dirty gold'</p>
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
      </div>

      <br></br><br></br>
      <CollectionSlide />
      <br></br><br></br><br></br><br></br><br></br>

      <div className="GIA_image_wrapper">
        <img src={GIA} alt="GIA certificate" className="GIA_image" />
      </div>
      <p className="GIA_content">
        Confirmation from the Gemological Institute of America GIA - Dian Jewelry is the place to sell genuine natural GIA diamonds
      </p>

      <ScrollToTop />
      <Insta />
      <FooterComponent />
    </div>
  );
}

export default DiamondDetail;
