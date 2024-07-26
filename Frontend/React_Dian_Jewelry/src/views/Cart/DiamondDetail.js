import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import GIA from "../../assets/img/gia2.jpg";
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
  getDiamondDetail,
  getProductDetail,
} from "../../services/ProductService";
import "../../styles/Cart/ProductDetail.scss";

function DiamondDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  const [product, setProduct] = useState({});
  const [diamond, setDiamond] = useState({});
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [maxProductAvailable, setMaxProductAvailable] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 220);
  }, []);

  useEffect(() => {
    const fetchProductData = async (id) => {
      try {
        console.log("ID: " + id);
        setLoading(true);
        const productResponse = await getProductDetail(id);
        const productData = productResponse.data;
        setProduct(productData);
        const images = productData.imageLinkList.split(";");
        setSelectedImage(images[0]);

        const diamondResponse = await getDiamondDetail(productData.mainDiamondAttributeId);
        setDiamond(diamondResponse.data);

        const stockResponse = await checkProductStock(id);
        const { message, maxProductAvailable } = stockResponse.data;
        if (message === "Available") {
          setMaxProductAvailable(maxProductAvailable);
        } else {
          setMaxProductAvailable(0);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const { id } = location.state || {};
    if (id) {
      fetchProductData(id);
    }
  }, [location.state]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.warning("Please sign in or sign up to add diamond to cart.");
      return;
    }

    try {
      const stockResponse = await checkProductStock(product.productId);
      const data = stockResponse.data;
      console.log("Add to Cart Stock Data:", data);
      const { message, maxProductAvailable } = data;

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

      addToCart({
        productId: product.productId,
        name: product.name,
        image: product.imageLinkList,
        code: product.productCode,
        price: product.price,
        selectedSize: "",
        sizes: product.sizes.map((size) => size.toString()),
        selectedShellId: null,
        selectedShellName: "",
        diamondId: product.mainDiamondId,
        categoryId: product.categoryId,
      });
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

  const navItems = [
    { name: "Home", link: "/home" },
    { name: "Diamonds", link: "/diamond-price" },
    { name: diamond.carat + " Carat " + diamond.shape + " Diamond ", link: "" },
  ];

  const images = product.imageLinkList ? product.imageLinkList.split(";") : [];

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
    <div id="product_detail" className={`product_detail`}>
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
                className={`thumbnail ${selectedImage === image ? "selected" : ""}`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
          <img src={selectedImage} alt={product.name} className="main_image" />
        </div>
        <div className="product_info_detail">
          <h2 className="product_name_detail">
            {product.name}{" "}
            {maxProductAvailable !== null && `(${maxProductAvailable} left)`}
          </h2>
          <p className="product_diamond_description">
            {diamond.cut} Cutㅤ|ㅤ{diamond.color} Colorㅤ|ㅤ{diamond.clarity}{" "}
            Clarity
          </p>
          <div className="price_size_container">
            <p className="product_price_detail">
              ${product.price} (Only Diamond)
            </p>
          </div>
          <div className="product_actions_detail">
            <button className="add_to_cart_btn" onClick={handleAddToCart}>
              <i className="fas fa-shopping-cart"></i> Add to cart
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
              days
            </p>
          </div>
          <hr className="product_detail_line" />
        </div>
      </div>

      <br></br>
      <br></br>
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

export default DiamondDetail;
