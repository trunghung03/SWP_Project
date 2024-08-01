import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Image } from 'antd';
import GIA from "../../assets/img/gia2.jpg";
import braceletSizeGuide from "../../assets/img/sgBracelet.jpg";
import earringSizeGuide from "../../assets/img/sgEaring.jpeg";
import necklaceSizeGuide from "../../assets/img/sgNecklace.jpg";
import ringSizeGuide from "../../assets/img/sgRing.jpg";
import Insta from "../../components/BlogInspired/BlogInspired.js";
import CollectionSlide from "../../components/CollectionSlide/CollectionSlide";
import FooterComponent from "../../components/Footer/FooterComponent";
import HeaderComponent from "../../components/Header/HeaderComponent";
import Loading from "../../components/Loading/Loading";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop.js";
import SubNav from "../../components/SubNav/SubNav.js";
import { useCart } from "../../services/CartService";
import {
  checkProductStock,
  getCollectionDetail,
  getDiamondDetail,
  getProductDetail,
  getProductList,
  getShellByProductId,
  getShellMaterials,
} from "../../services/ProductService";
import "../../styles/Cart/ProductDetail.scss";

function ProductDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedShell, setSelectedShell] = useState("");
  const [product, setProduct] = useState({});
  const [diamond, setDiamond] = useState({});
  const [collection, setCollection] = useState({});
  const [shellMaterials, setShellMaterials] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [showSpecifications, setShowSpecifications] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [alsoLikeProducts, setAlsoLikeProducts] = useState([]);
  const [shellPrice, setShellPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [shellData, setShellData] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [availableShells, setAvailableShells] = useState([]);
  const [maxProductAvailable, setMaxProductAvailable] = useState(null);

  const navigateToProductDetail = (product) => {
    const productId = product.productId;
    const productName = product.name.replace(/\s+/g, "-").toLowerCase();
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
      getProductDetail(id)
        .then((response) => {
          const productData = response.data;
          setProduct(productData);
          setSizes(productData.sizes.map((size) => size.toString()));
          const images = productData.imageLinkList.split(";");
          setSelectedImage(images[0]);

          const diamondAttributeId = productData.mainDiamondAttributeId || productData.subDiamondAttributeId;

          return Promise.all([
            getDiamondDetail(diamondAttributeId).catch(
              (error) => {
                throw error;
              }
            ),
            getCollectionDetail(productData.collectionId).catch((error) => {
              throw error;
            }),
            getShellByProductId(id).catch((error) => {
              throw error;
            }),
            getProductList().catch((error) => {
              throw error;
            }),
            checkProductStock(id).catch((error) => {
              throw error;
            }),
          ])
            .then(
              ([
                diamondResponse,
                collectionResponse,
                shellResponse,
                productListResponse,
                stockResponse,
              ]) => {
                setDiamond(diamondResponse.data);
                setCollection(collectionResponse.data);
                setShellData(shellResponse.data);

                const { message, maxProductAvailable } = stockResponse.data;
                if (message === "Available") {
                  setMaxProductAvailable(maxProductAvailable);
                } else {
                  setMaxProductAvailable(0);
                }

                const relatedProducts = productListResponse.data.filter(
                  (product) => product.categoryID === productData.categoryId
                );
                const currentIndex = relatedProducts.findIndex(
                  (p) => p.productId === productData.productId
                );
                let nextProducts = [];

                if (currentIndex !== -1) {
                  nextProducts = relatedProducts.slice(
                    currentIndex + 1,
                    currentIndex + 5
                  );
                  if (nextProducts.length < 4) {
                    nextProducts = nextProducts.concat(
                      relatedProducts.slice(0, 4 - nextProducts.length)
                    );
                  }
                }

                setAlsoLikeProducts(nextProducts);

                const uniqueShells = [
                  ...new Set(
                    shellResponse.data.map((shell) => shell.shellMaterialName)
                  ),
                ];
                setAvailableShells(uniqueShells);
                const uniqueSizes = [
                  ...new Set(shellResponse.data.map((shell) => shell.size)),
                ];
                setAvailableSizes(uniqueSizes);
              }
            )
            .catch((error) => {
              console.error(error);
            })
            .finally(() => {
              setLoading(false);
            });
        })
        .catch((error) => {
          setLoading(false);
        });

      getShellMaterials()
        .then((response) => {
          setShellMaterials(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [location.state]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.warning("Please sign in or sign up to add jewelry to cart.");
      return;
    }

    try {
      const stockResponse = await checkProductStock(product.productId);
      const { message, maxProductAvailable } = stockResponse.data;

      if (message === "Not enough stock") {
        toast.error(
          "This product is currently out of stock. Sorry for this inconvenience.",
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
        return;
      }

      const cartItemCount = cartItems.filter(
        (item) => item.productId === product.productId
      ).length;

      if (cartItemCount >= maxProductAvailable) {
        toast.error(
          "You have added the maximum amount of this product to your cart.",
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
        return;
      }

      if (!selectedShell) {
        toast.warning("Please choose a shell type.", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      if (!selectedSize) {
        toast.warning("Please choose a size.", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      const shellEntry = shellData.find(
        (shell) =>
          shell.productId === product.productId &&
          shell.size === parseFloat(selectedSize) &&
          shell.shellMaterialName === selectedShell
      );

      const productToSave = {
        productId: product.productId,
        name: product.name,
        image: product.imageLinkList,
        code: product.productCode,
        price: product.price + shellPrice,
        selectedSize,
        sizes: product.sizes.map((size) => size.toString()),
        selectedShellId: shellEntry?.shellId,
        selectedShellName: selectedShell,
        diamondId: product.mainDiamondId,
        categoryId: product.categoryId,
      };
      addToCart(productToSave);
      toast.success("Add to cart successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error(
        "This product is currently out of stock. Sorry for this inconvenience.",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
      console.error(error);
    }
  };

  const openSizeGuide = () => {
    setShowSizeGuide(true);
    document.body.classList.add("no-scroll");
  };

  const closeSizeGuide = () => {
    setShowSizeGuide(false);
    document.body.classList.remove("no-scroll");
  };
  
  const calculateShellPrice = (shell, shellMaterials) => {
    const material = shellMaterials.find(
      (material) => material.shellMaterialId === shell.shellMaterialId
    );
    return material ? material.price * shell.weight : 0;
  };

  const handleShellChange = (e) => {
    const selectedShellMaterial = shellMaterials.find(
      (shellMaterial) => shellMaterial.name === e.target.value
    );
    const selectedShellData = shellData.find(
      (shell) => shell.shellMaterialName === selectedShellMaterial.name
    );
  
    setSelectedShell(selectedShellMaterial.name);
    
    if (selectedShellData) {
      const shellPrice = calculateShellPrice(selectedShellData, shellMaterials);
      setShellPrice(shellPrice);
    } else {
      setShellPrice(0);
    }
  };

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  const toggleSpecifications = () => {
    setShowSpecifications(!showSpecifications);
  };

  const navItems = [
    { name: "Home", link: "/home" },
    { name: "Diamond Jewelry", link: "" },
    { name: product.name, link: "" },
  ];

  const images = product.imageLinkList ? product.imageLinkList.split(";") : [];

  let sizeGuideImage;
  if ([1, 5, 9].includes(product.categoryId)) {
    sizeGuideImage = ringSizeGuide;
  } else if ([2, 6].includes(product.categoryId)) {
    sizeGuideImage = earringSizeGuide;
  } else if ([3, 7].includes(product.categoryId)) {
    sizeGuideImage = braceletSizeGuide;
  } else if ([4, 8].includes(product.categoryId)) {
    sizeGuideImage = necklaceSizeGuide;
  }

  const isShellDisabled = (shell) => {
    if (selectedSize) {
      return !shellData.some(
        (sh) =>
          sh.shellMaterialName === shell &&
          sh.size === parseFloat(selectedSize) &&
          sh.amountAvailable > 0
      );
    }
    return shellData.every(
      (sh) => sh.shellMaterialName === shell && sh.amountAvailable === 0
    );
  };

  const isSizeDisabled = (size) => {
    if (selectedShell) {
      return !shellData.some(
        (sh) =>
          sh.size === size &&
          sh.shellMaterialName === selectedShell &&
          sh.amountAvailable > 0
      );
    }
    return shellData.every(
      (sh) => sh.size === size && sh.amountAvailable === 0
    );
  };

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
    <div
      id="product_detail"
      className={`product_detail ${showSizeGuide ? "no-scroll" : ""}`}
    >
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
                className={`thumbnail ${
                  selectedImage === image ? "selected" : ""
                }`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
          <Image.PreviewGroup>
            <Image
              src={selectedImage}
              alt={product.name}
              className="main_image"
              width={415}
            />
          </Image.PreviewGroup>
        </div>
        <div className="product_info_detail">
          <h2 className="product_name_detail">
            {product.name}{" "}
            {maxProductAvailable === 0 ? "(Sold out)" : `(${maxProductAvailable} left)`}
          </h2>
          <p className="product_description_detail">{product.description}</p>
          <p className="product_code_detail">
            <strong>Code:</strong> {product.productCode}
          </p>
          <p className="product_diamond_detail">
            <strong>Shape:</strong> {diamond.shape}
          </p>
          <p className="product_weight_detail">
            <strong>Carat:</strong> {diamond.carat}
          </p>
          <p className="product_shell_detail">
            <strong>Shell:</strong>
            {availableShells.map((shell) => (
              <label
                key={shell}
                style={{
                  marginRight: "1px",
                  marginLeft: "15px",
                  color: isShellDisabled(shell) ? "gray" : "black",
                }}
              >
                <input
                  className="shell_checkbox"
                  type="radio"
                  value={shell}
                  checked={selectedShell === shell}
                  onChange={handleShellChange}
                  disabled={isShellDisabled(shell)}
                />
                {shell}
              </label>
            ))}
          </p>
          <div className="price_size_container">
            <p className="product_price_detail">
              ${product.price + shellPrice}
            </p>
            <div className="size_guide_container">
              <button onClick={openSizeGuide} className="size_guide_detail">
                Size guide
              </button>
              <select
                className="ring_size_detail"
                value={selectedSize}
                onChange={handleSizeChange}
              >
                <option value="">Size</option>
                {availableSizes.map((size, index) => (
                  <option
                    key={index}
                    value={size}
                    disabled={isSizeDisabled(size)}
                  >
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="product_actions_detail">
            <button 
              className="add_to_cart_btn"
              onClick={handleAddToCart}
              disabled={maxProductAvailable === 0}
              style={{
                backgroundColor: maxProductAvailable === 0 ? "#797979" : "#1c1c1c",
                color: "white"
              }}
            >
              <i className="fas fa-shopping-cart" style={{ color: "white" }}></i> {maxProductAvailable === 0 ? "Sold out" : "Add to cart"}
            </button>
          </div>
          <hr className="product_detail_line" />
          <div className="product_delivery_detail">
            <p>
              <i className="fas fa-phone"></i>{" "}
              <a href="tel:0795795959">0795 795 959</a>
            </p>
            <p>
              <i className="fas fa-shipping-fast"></i> Fast delivery, convenient
              transaction
            </p>
            <p>
              <i className="fas fa-calendar-alt"></i> Order now and ship by four
              days depending on selected size
            </p>
          </div>
          <hr className="product_detail_line" />
        </div>
      </div>
      <div className="product_specification_container">
        <h3
          className="product_specification_title"
          onClick={toggleSpecifications}
        >
          Specifications & Descriptions
          <i
            className={`fas ${
              showSpecifications ? "fa-chevron-up" : "fa-chevron-down"
            } specification_toggle_icon`}
          ></i>
        </h3>
        <hr className="product_specification_line"></hr>
        {showSpecifications && (
          <>
            <p className="product_specification_trademark">
              <strong>Trademark:</strong> Dian Jewelry
            </p>
            <p className="product_specification_diamond_amount">
              <strong>Shape:</strong> {diamond.shape}
            </p>
            <p className="product_specification_color">
              <strong>Color:</strong> {diamond.color}
            </p>
            <p className="product_specification_cut">
              <strong>Cut:</strong> {diamond.cut}
            </p>
            <p className="product_specification_carat">
              <strong>Carat:</strong> {diamond.carat}
            </p>
            <p className="product_specification_clarity">
              <strong>Clarity:</strong> {diamond.clarity}
            </p>
            <p className="product_specification_sub_diamond_amount">
              <strong>Sub Diamond Quantity:</strong> {product.subDiamondAmount}
            </p>
            <p className="product_specification_main_diamond_amount">
              <strong>Main Diamond Quantity:</strong> {product.mainDiamondAmount}
            </p>
            <p className="product_specification_collection">
              <strong>Collection:</strong> {collection.name}
            </p>
          </>
        )}
      </div>
      {showSizeGuide && (
        <div className="size_guide_popup">
          <div className="size_guide_content">
            <img src={sizeGuideImage} alt="Size Guide" />
            <button onClick={closeSizeGuide} className="close_size_guide">
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}

      <div className="also_like_container">
        <h2 className="also_like_title">You May Also Like</h2>
        <div className="also_like_wrapper">
          {alsoLikeProducts.map((product, index) => (
            <div
              key={index}
              className="also_like_card"
              onClick={() => navigateToProductDetail(product)}
            >
              <img
                src={product.imageLinkList}
                alt={product.name}
                className="also_like_image"
              />
              <div
                className="also_product_view_icon_wrapper"
                data-tooltip="View detail"
              >
                <i className="far fa-eye also_product_view_icon"></i>
              </div>
              <p className="also_like_detail">
                {product.clarity} | {product.carat} | {product.color}
              </p>
              <p className="also_like_name">{product.name}</p>
              <p className="also_like_price">${product.price}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="just_for_you_container">
          <div className="just_for_you_text">
            <h3>
              <strong>Made Just For You</strong>
            </h3>
            <p>
              At our San Francisco design studio, our team designs every ring to
              delight you, from the first time you see it and every day after.
              We carefully consider the entire piece—obsessing over comfort,
              quality, and durability so you can cherish it for a lifetime.
            </p>
          </div>
          <div className="just_for_you_features">
            <div className="feature">
              <i className="fas fa-recycle"></i>
              <p>
                <strong>Recycled Gold and Silver</strong>
                <br />
                We say no to 'dirty gold'
              </p>
            </div>
            <hr className="jfy_line1" />
            <div className="feature with-lines">
              <i className="fas fa-gift"></i>
              <p>
                <strong>Responsibly Packaged</strong>
                <br />
                Made with less energy, less water, and fewer emissions
              </p>
            </div>
            <hr className="jfy_line2" />
            <div className="feature">
              <i className="fas fa-leaf"></i>
              <p>
                <strong>Progress to Carbon Neutrality</strong>
                <br />
                We are committed to protecting the planet
              </p>
            </div>
          </div>
        </div>
      </div>

      <br></br>
      <br></br>
      <CollectionSlide />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <div className="GIA_image_wrapper">
        <img src={GIA} alt="GIA certificate" className="GIA_image" />
      </div>
      <p className="GIA_content">
        Confirmation from the Gemological Institute of America GIA - Dian
        Jewelry is the place to sell genuine natural GIA diamonds
      </p>

      <ScrollToTop />
      <Insta />
      <FooterComponent />
    </div>
  );
}

export default ProductDetail;
