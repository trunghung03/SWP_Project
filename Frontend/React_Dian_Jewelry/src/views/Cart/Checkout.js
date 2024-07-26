import "@fortawesome/fontawesome-free/css/all.min.css";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "sonner";
import vnpay from "../../assets/img/vnpay.webp";
import Insta from "../../components/BlogInspired/BlogInspired.js";
import FooterComponent from "../../components/Footer/FooterComponent";
import HeaderComponent from "../../components/Header/HeaderComponent";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop.js";
import SubNav from "../../components/SubNav/SubNav.js";
import { useCart } from "../../services/CartService";
import {
  UpdateQuantityCheckout,
  createOrderDetails,
  createPurchaseOrder,
  getPromotionByCode,
  requestVNPayPayment,
} from "../../services/CheckoutService.js";
import { checkProductStock } from "../../services/ProductService";
import { UserContext } from "../../services/UserContext";
import "../../styles/Cart/Checkout.scss";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 45,
  height: 20,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(25px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#f4b798",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 16,
    height: 16,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#f4b798",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

function Checkout() {
  const navItems = [
    { name: "Home", link: "/home" },
    { name: "Cart", link: "/cart" },
    { name: "Checkout", link: "" },
  ];
  const navigate = useNavigate();
  const customerId = localStorage.getItem("customerId");
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [points, setPoints] = useState(0);
  const [usePoints, setUsePoints] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    note: "",
  });
  const [voucherDiscount, setVoucherDiscount] = useState(0);
  const [pointsDiscount, setPointsDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [promotionId, setPromotionId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setCartItems: updateCartContext } = useCart();
  const [voucherCode, setVoucherCode] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState(false);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const cartKey = `cartItems${customerId}`;
    const storedCartItems = JSON.parse(localStorage.getItem(cartKey)) || [];
    setCartItems(groupCartItems(storedCartItems));
    window.scrollTo(0, 230);
  }, [customerId]);

  useEffect(() => {
    const storedPoints = JSON.parse(localStorage.getItem("points")) || 0;
    setPoints(storedPoints);

    const firstName = localStorage.getItem("firstName") || "";
    const lastName = localStorage.getItem("lastName") || "";
    const phone = localStorage.getItem("phone") || "";
    const address = localStorage.getItem("address") || "";
    setFormData((prevData) => ({
      ...prevData,
      fullName: `${firstName} ${lastName}`,
      phone: phone !== "null" ? phone : "",
      address: address !== "null" ? address : "",
    }));
  }, []);

  useEffect(() => {
    const initialTotal = calculateTotal();
    let discountFromPoints = 0;
    if (usePoints) {
      discountFromPoints = Math.min(points, initialTotal);
      setPointsDiscount(discountFromPoints);
    } else {
      setPointsDiscount(0);
    }
    const totalDiscount = voucherDiscount + discountFromPoints;
    setTotalPrice(Math.max(0, initialTotal - totalDiscount));
  }, [usePoints, points, cartItems, voucherDiscount, pointsDiscount]);

  const groupCartItems = (items) => {
    const groupedItems = items.reduce((acc, item) => {
      const key = `${item.productId}-${item.name}-${item.image}-${item.price}-${item.selectedShellId}-${item.selectedShellName}-${item.selectedSize}`;
      if (!acc[key]) {
        acc[key] = { ...item, quantity: 1 };
      } else {
        acc[key].quantity += 1;
      }
      return acc;
    }, {});

    return Object.values(groupedItems);
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) =>
        total + Math.round(parseFloat(item.price)) * item.quantity,
      0
    );
  };

  const handleBackToCart = () => {
    navigate("/cart");
  };

  const handleApplyVoucher = async () => {
    try {
      const promotion = await getPromotionByCode(voucherCode);

      const currentDateTime = new Date();
      const promotionEndDate = new Date(promotion.endDate);

      if (promotionEndDate < currentDateTime) {
        throw new Error("Voucher has expired");
      }

      const discountAmount = calculateTotal() * promotion.amount;
      setVoucherDiscount(discountAmount);
      setPromotionId(promotion.id);
      setAppliedVoucher(true);
      toast.success("Apply voucher successfully!");
    } catch (error) {
      console.error("Error applying voucher:", error);
      toast.error(
        "Invalid voucher code or voucher has expired! Please try another one.",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    }
  };

  const handleInvoice = async () => {
    const { fullName, phone, address, note } = formData;

    if (!fullName || !phone || !address) {
      toast.warn("Please fill in all the required fields.");
      return;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    if (paymentMethod === "") {
      toast.warning("Please choose a payment method.");
      return;
    }

    try {
      const stockChecks = await Promise.all(
        cartItems.map((item) =>
          checkProductStock(item.productId)
            .then((response) => ({
              ...item,
              isOutOfStock: response.data === "Not enough stock",
            }))
            .catch((error) => ({
              ...item,
              isOutOfStock: true,
            }))
        )
      );

      const hasOutOfStockItems = stockChecks.some((item) => item.isOutOfStock);

      if (hasOutOfStockItems) {
        toast.error(
          "Can not checkout due to some products in your cart are currently sold out. Sorry for this inconvenience.",
          {
            position: "top-right",
            autoClose: 3000,
            onClose: () => navigate("/cart"),
          }
        );
        return;
      }

      setLoading(true);

      const userId = parseInt(localStorage.getItem("customerId"), 10);
      const date = new Date().toISOString();
      const initialTotal = calculateTotal();
      const totalDiscount = voucherDiscount + pointsDiscount;

      let remainingPoints = points;
      let appliedDiscount = totalDiscount;
      if (totalDiscount > initialTotal) {
        remainingPoints = totalDiscount - initialTotal;
        appliedDiscount = initialTotal;
      } else {
        remainingPoints = points - pointsDiscount;
      }

      const orderData = {
        userId: userId,
        date: date,
        name: fullName,
        phoneNumber: phone,
        paymentMethod: paymentMethod,
        shippingAddress: address,
        totalPrice: initialTotal,
        orderStatus: "Unpaid",
        promotionId: appliedVoucher ? promotionId : null,
        payWithPoint: usePoints,
        note: note || "None",
        saleStaff: 0,
        deliveryStaff: 0,
      };

      const createdOrder = await createPurchaseOrder(orderData, voucherCode);
      const orderId = createdOrder.orderId;

      const orderDetailsPromises = cartItems.flatMap((item) => {
        return Array.from({ length: item.quantity }, () => ({
          orderId: orderId,
          lineTotal: item.price,
          productId: item.productId,
          shellId: item?.selectedShellId || null,
        })).map((orderDetail) => createOrderDetails(orderDetail));
      });

      await Promise.all(orderDetailsPromises);

      const expandedCartItems = cartItems.flatMap((item) =>
        Array.from({ length: item.quantity }, () => ({
          ...item,
          quantity: 1,
        }))
      );

      const invoiceData = {
        orderId,
        orderDate: date,
        orderTotalPrice: Math.floor(totalPrice),
        orderDiscount: Math.floor(appliedDiscount),
        paymentMethod,
        cartItems: expandedCartItems,
      };

      localStorage.setItem("orderId", orderId);
      localStorage.setItem(`invoice${orderId}`, JSON.stringify(invoiceData));

      localStorage.setItem("points", remainingPoints);
      setUser((prevUser) => ({
        ...prevUser,
        points: remainingPoints,
      }));

      if (paymentMethod === "VNPAY") {
        const paymentData = {
          orderId,
          fullName,
          description: "Payment for order " + orderId,
          amount: Math.floor(totalPrice * 25000),
          createdDate: date,
        };
        const vnpayResponse = await requestVNPayPayment(paymentData);
        window.location.href = vnpayResponse.paymentUrl;
      } else {
        toast.promise(UpdateQuantityCheckout(orderId), {
          pending: "Processing...",
          success: "Checkout successfully!",
          error:
            "Can not checkout due to some products in your cart are currently sold out. Sorry for this inconvenience.",
        });

        localStorage.setItem("fromCheckout", "true");
        navigate("/invoice", { state: { orderId } });
      }
    } catch (error) {
      if (error.response) {
      }
      toast.error(
        "Can not checkout due to some products in your cart are currently sold out. Sorry for this inconvenience.",
        {
          position: "top-right",
          autoClose: 3000,
          onClose: () => navigate("/cart"),
        }
      );
      setLoading(false);
    }
  };

  const handlePointsClick = () => {
    setUsePoints(!usePoints);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneWheel = (e) => {
    e.preventDefault();
  };

  return (
    <div className="Checkout">
      <HeaderComponent />
      <SubNav items={navItems} />

      <div className="checkout_header">
        <div className="checkout_title">
          <i className="fas fa-shopping-cart"></i> Checkout ({cartItems.length})
        </div>
        <div className="checkout_continue_shopping" onClick={handleBackToCart}>
          &lt; Back To Cart
        </div>
      </div>

      <div className="checkout_container">
        <div className="checkout_items">
          <form className="checkout_form">
            <div className="form_group_name_phone">
              <label htmlFor="fullName">Full name *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                placeholder="Enter full name"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div className="form_group_name_phone">
              <label htmlFor="phone">Phone number *</label>
              <input
                type="number"
                id="phone"
                name="phone"
                required
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                onKeyDown={(e) => e.key === "e" && e.preventDefault()}
                onWheel={handlePhoneWheel}
              />
            </div>
            <div className="form_group_address_note">
              <label htmlFor="address">Address *</label>
              <input
                type="text"
                id="address"
                name="address"
                required
                placeholder="Enter address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="form_group_address_note">
              <label htmlFor="note">Note (optional)</label>
              <textarea
                id="note"
                name="note"
                value={formData.note}
                onChange={handleChange}
              ></textarea>
            </div>
          </form>
          <div className="checkout_cart_items_container">
            {cartItems.map((item, index) => (
              <React.Fragment key={index}>
                <div className="checkout_cart_item">
                  <img
                    src={item.image.split(";")[0]}
                    alt={item.name}
                    className="checkout_item_image"
                  />
                  <div className="checkout_item_details">
                    <div className="checkout_item_row">
                      <p className="checkout_item_name">
                        <strong>
                          {item.name} x{item.quantity}
                        </strong>
                      </p>
                      <p className="checkout_item_price">
                        <strong>
                          ${Math.round(item.price) * item.quantity}
                        </strong>
                      </p>
                    </div>
                    {!item.selectedShellName ? (
                      <p>(Only diamond)</p>
                    ) : (
                      <>
                        <div className="checkout_item_row">
                          <p>
                            <strong>Shell:</strong> {item.selectedShellName}
                          </p>
                          <p>
                            <strong>Size:</strong> {item.selectedSize}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                {index < cartItems.length - 1 && <hr />}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="checkout_summary">
          <h5 className="checkout_summary_voucher_title">
            <i className="fas fa-ticket"></i>Voucher
          </h5>
          <div className="voucher">
            <input
              type="text"
              placeholder="Voucher"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
              disabled={appliedVoucher}
            />
            <button onClick={handleApplyVoucher} disabled={appliedVoucher}>
              Apply
            </button>
          </div>

          <h5 className="checkout_summary_payment_title">
            <i className="fas fa-credit-card"></i>Payment method
          </h5>
          <div className="payment_methods">
            <div
              className="payment_method"
              onClick={() => setPaymentMethod("Bank Transfer")}
            >
              <input
                type="radio"
                id="bankTransfer"
                name="paymentMethod"
                checked={paymentMethod === "Bank Transfer"}
                onChange={() => setPaymentMethod("Bank Transfer")}
              />
              <p className="payment_label" htmlFor="bankTransfer">
                Bank Transfer
              </p>
              {paymentMethod === "Bank Transfer" && (
                <p>
                  (Make a transfer to the shop's account number. Order will be
                  processed after successful transfer)
                </p>
              )}
            </div>
            <div
              className="payment_method"
              onClick={() => setPaymentMethod("VNPAY")}
            >
              <input
                type="radio"
                id="vnpay"
                name="paymentMethod"
                checked={paymentMethod === "VNPAY"}
                onChange={() => setPaymentMethod("VNPAY")}
              />
              <div className="payment_vnpay_wrapper">
                <p className="payment_label" htmlFor="vnpay">
                  VNPAY
                </p>
                <img
                  src={vnpay}
                  style={{
                    width: "30px",
                    marginTop: "-34px",
                    marginBottom: "10px",
                    marginLeft: "-17px",
                  }}
                  alt="VNPAY"
                />
              </div>
              {paymentMethod === "VNPAY" && (
                <>
                  <p>
                    (Use VNPAY for online payment. Order will be processed after
                    successful payment)
                  </p>
                </>
              )}
            </div>
          </div>
          {points > 0 && (
            <>
              <div className="use_point_method">
                <h5 className="checkout_summary_point_title">
                  <i className="fas fa-coins"></i>Use {points} points:
                </h5>
                <IOSSwitch checked={usePoints} onChange={handlePointsClick} />
              </div>
            </>
          )}

          <h5 className="checkout_summary_title">
            <i className="fas fa-receipt"></i>Total price
          </h5>
          <div className="checkout_summary_details">
            <p className="checkout_summary_subtotal">
              <span>Subtotal</span>
              <span>
                <strong>${Math.floor(calculateTotal())}</strong>
              </span>
            </p>
            <p className="checkout_summary_discount">
              <span>Discount</span>
              <span>
                <strong>${Math.floor(voucherDiscount + pointsDiscount)}</strong>
              </span>
            </p>
            <hr />
            <p className="checkout_summary_total">
              <span>
                <strong>Total</strong>
              </span>
              <span>
                <strong>${Math.floor(totalPrice)}</strong>
              </span>
            </p>
          </div>
          <button
            onClick={handleInvoice}
            className="checkout_summary_checkout"
            disabled={loading}
          >
            {loading && (
              <i
                className="fas fa-spinner fa-spin"
                style={{ marginRight: "5px" }}
              ></i>
            )}
            Confirm order
          </button>
          <div className="checkout_summary_service">
            <p className="24/7_service">
              <strong>24/7 Customer Service</strong>
            </p>
            <a href="tel:0795795959">
              <p className="phone_service">
                <i className="fas fa-phone"></i> 0795 795 959
              </p>
            </a>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <Insta />
      <ScrollToTop />
      <FooterComponent />
    </div>
  );
}

export default Checkout;
