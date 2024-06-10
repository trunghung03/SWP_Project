import React, { useState, useEffect, useContext } from 'react';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SubNav from '../../components/SubNav/SubNav.js';
import { useNavigate } from 'react-router-dom';
import '../../styles/Cart/Checkout.scss';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';
import { createPurchaseOrder, createOrderDetails, getPromotionByCode, requestVNPayPayment } from '../../services/CheckoutService.js';
import { useCart } from '../../services/CartService';
import { UserContext } from '../../services/UserContext';
import vnpay from '../../assets/img/vnpay.webp';

function Checkout() {
    const navItems = ['Home', 'Cart', 'Checkout'];
    const navigate = useNavigate();
    const customerId = localStorage.getItem('customerId');
    const [cartItems, setCartItems] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [points, setPoints] = useState(0);
    const [usePoints, setUsePoints] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        address: '',
        note: ''
    });
    const [voucherDiscount, setVoucherDiscount] = useState(0);
    const [pointsDiscount, setPointsDiscount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [promotionId, setPromotionId] = useState(null);
    const [loading, setLoading] = useState(false);
    const { setCartItems: updateCartContext } = useCart();
    const [voucherCode, setVoucherCode] = useState('');
    const [appliedVoucher, setAppliedVoucher] = useState(false);
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        const cartKey = `cartItems${customerId}`;
        const storedCartItems = JSON.parse(localStorage.getItem(cartKey)) || [];
        setCartItems(storedCartItems);
    }, [customerId]);

    useEffect(() => {
        const storedPoints = JSON.parse(localStorage.getItem('points')) || 0;
        setPoints(storedPoints);

        const firstName = localStorage.getItem('firstName') || '';
        const lastName = localStorage.getItem('lastName') || '';
        const phone = localStorage.getItem('phone') || '';
        const address = localStorage.getItem('address') || '';
        setFormData(prevData => ({
            ...prevData,
            fullName: `${firstName} ${lastName}`,
            phone: phone !== 'null' ? phone : '',
            address: address !== 'null' ? address : ''
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

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + Math.round(parseFloat(item.price)), 0);
    };

    const handleBackToCart = () => {
        navigate('/cart');
    };

    const handleApplyVoucher = async () => {
        try {
            const promotion = await getPromotionByCode(voucherCode);
            const discountAmount = calculateTotal() * promotion.amount;
            setVoucherDiscount(discountAmount);
            setPromotionId(promotion.id);
            setAppliedVoucher(true);
            swal("Apply voucher successfully!", "", "success");
        } catch (error) {
            console.error('Error applying voucher:', error);
            swal("Invalid voucher code!", "Please try another code.", "error");
        }
    };

    const handleInvoice = async () => {
        const { fullName, phone, address, note } = formData;

        if (!fullName || !phone || !address) {
            swal({
                title: "Please fill in all the required fields!",
                text: "All fields have not been filled in yet.",
                icon: "warning",
                button: "OK",
            });
            return;
        }

        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            swal({
                title: "Invalid phone number!",
                text: "Please enter a valid 10-digit phone number.",
                icon: "error",
                button: "OK",
            });
            return;
        }

        if (paymentMethod === '') {
            swal({
                title: "Have not chosen a payment method!",
                text: "Please select a payment method before confirming the order.",
                icon: "warning",
                button: "OK",
            });
            return;
        }

        setLoading(true);

        const userId = parseInt(localStorage.getItem('customerId'), 10);
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
            orderStatus: "Pending",
            promotionId: appliedVoucher ? promotionId : null,
            payWithPoint: usePoints,
            note: note || "None",
            saleStaff: 0,
            deliveryStaff: 0
        };
        console.log(orderData);

        try {
            const createdOrder = await createPurchaseOrder(orderData, voucherCode);
            const orderId = createdOrder.orderId;

            const orderDetailsPromises = cartItems.map(item => {
                const orderDetail = {
                    orderId: orderId,
                    lineTotal: totalPrice,
                    productId: item.productId,
                    shellMaterialId: item.selectedShellId,
                    subDiamondId: item.diamondId,
                    size: parseInt(item.selectedSize, 10)
                };
                return createOrderDetails(orderDetail);
            });

            await Promise.all(orderDetailsPromises);

            localStorage.setItem('orderId', orderId);
            localStorage.setItem('orderDate', date);
            localStorage.setItem('orderTotalPrice', Math.floor(totalPrice));
            localStorage.setItem('orderDiscount', Math.floor(appliedDiscount));

            // Update points
            localStorage.setItem('points', remainingPoints);
            setUser(prevUser => ({
                ...prevUser,
                points: remainingPoints
            }));

            const cartKey = `cartItems${customerId}`;
            localStorage.removeItem(cartKey);

            updateCartContext([]);

            swal({
                title: "Order successfully!",
                text: "Thank you for your order.",
                icon: "success",
                button: "OK",
            });

            if (paymentMethod === 'VNPAY') {
                const paymentData = {
                    orderId,
                    fullName,
                    description: 'Payment for order ' + orderId,
                    amount: Math.floor(totalPrice * 25000), 
                    createdDate: date,
                };
                const vnpayResponse = await requestVNPayPayment(paymentData);
                window.location.href = vnpayResponse.paymentUrl;
            } else {
                navigate('/invoice', { state: { orderId, paymentMethod, usePoints, cartItems, appliedDiscount: Math.floor(appliedDiscount), totalPrice: Math.floor(totalPrice) } }); // Pass as integer
            }
        } catch (error) {
            console.error('Error creating purchase order:', error);
            if (error.response) {
                console.error('Server responded with an error:', error.response.data);
            }
            swal({
                title: "Error processing order!",
                text: "There was an error processing your order. Please try again.",
                icon: "error",
                button: "OK",
            });
            setLoading(false);
        }
    };

    const handlePointsClick = () => {
        setUsePoints(!usePoints);
    };

    const handlePaymentMethodChange = (method) => {
        if (paymentMethod.includes(method)) {
            setPaymentMethod(paymentMethod.replace(method, '').replace(',,', ',').replace(/^,|,$/g, ''));
        } else {
            setPaymentMethod(paymentMethod ? `${paymentMethod},${method}` : method);
        }
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
                                placeholder='Enter full name'
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
                                placeholder='Enter phone number'
                                value={formData.phone}
                                onChange={handleChange}
                                onKeyDown={(e) => e.key === 'e' && e.preventDefault()}
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
                                placeholder='Enter address'
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
                                    <img src={item.image.split(';')[0]} alt={item.name} className="checkout_item_image" />
                                    <div className="checkout_item_details">
                                        <div className="checkout_item_row">
                                            <p className="checkout_item_name"><strong>{item.name} x1</strong></p>
                                            <p className="checkout_item_price"><strong>{Math.round(item.price)}$</strong></p>
                                        </div>
                                        <div className="checkout_item_row">
                                            <p><strong>Shell:</strong> {item.selectedShellName}</p>
                                            <p><strong>Size:</strong> {item.selectedSize}</p>
                                        </div>
                                    </div>
                                </div>
                                {index < cartItems.length - 1 && <hr />}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <div className="checkout_summary">
                    <h5 className="checkout_summary_voucher_title"><i className="fas fa-ticket"></i>Voucher</h5>
                    <div className="voucher">
                        <input type="text" placeholder="Voucher" value={voucherCode} onChange={(e) => setVoucherCode(e.target.value)} disabled={appliedVoucher} />
                        <button onClick={handleApplyVoucher} disabled={appliedVoucher}>Apply</button>
                    </div>

                    <h5 className="checkout_summary_payment_title"><i className="fas fa-credit-card"></i>Payment method</h5>
                    <div className="payment_methods">
                        <div className="payment_method">
                            <input
                                type="radio"
                                id="cash"
                                name="paymentMethod"
                                checked={paymentMethod === 'Cash'}
                                onChange={() => setPaymentMethod('Cash')}
                            />
                            <label htmlFor="cash">Cash</label>
                            <p>(Give cash by the time received or contact us to come and transact directly at the store)</p>
                        </div>
                        <div className="payment_method">
                            <input
                                type="radio"
                                id="bankTransfer"
                                name="paymentMethod"
                                checked={paymentMethod === 'Bank Transfer'}
                                onChange={() => setPaymentMethod('Bank Transfer')}
                            />
                            <label htmlFor="bankTransfer">Bank Transfer</label>
                            <p>(Make a transfer to the shop's account number. Order will be processed after successful transfer)</p>
                        </div>
                        <div className="payment_method">
                            <input
                                type="radio"
                                id="vnpay"
                                name="paymentMethod"
                                checked={paymentMethod === 'VNPAY'}
                                onChange={() => setPaymentMethod('VNPAY')}
                            />
                            <label htmlFor="vnpay">VNPAY</label>
                            <img src={vnpay} style={{ width: "30px", marginLeft: "8px", marginBottom: "14px" }}></img>
                            <p className="vnpay_p">(Use VNPAY for online payment. Order will be processed after successful payment)</p>
                        </div>

                    </div>
                    {points > 0 && (
                        <>
                            <h5 className="checkout_summary_point_title"><i className="fas fa-coins"></i>Point</h5>
                            <div className="use_point_method">
                                <input
                                    className="use_point"
                                    type="checkbox"
                                    id="usePoint"
                                    name="usePoint"
                                    value="Use Point"
                                    checked={usePoints}
                                    onChange={handlePointsClick}
                                />
                                <label htmlFor="usePoint">Use {points} points</label>
                                <p>(1 point = 1$)</p>
                            </div>
                        </>
                    )}

                    <h5 className="checkout_summary_title"><i className="fas fa-receipt"></i>Total price</h5>
                    <div className="checkout_summary_details">
                        <p className="checkout_summary_subtotal"><span>Subtotal</span><span><strong>{Math.floor(calculateTotal())}$</strong></span></p>
                        <p className="checkout_summary_discount"><span>Discount</span><span><strong>{Math.floor(voucherDiscount + pointsDiscount)}$</strong></span></p>
                        <hr />
                        <p className="checkout_summary_total"><span><strong>Total</strong></span><span><strong>{Math.floor(totalPrice)}$</strong></span></p>
                    </div>
                    <button onClick={handleInvoice} className="checkout_summary_checkout" disabled={loading}>
                        {loading && <i className="fas fa-spinner fa-spin" style={{ marginRight: '5px' }}></i>}
                        Confirm order
                    </button>
                    <div className="checkout_summary_service">
                        <p className="24/7_service"><strong>24/7 Customer Service</strong></p>
                        <a href='tel:0795795959'><p className="phone_service"><i className="fas fa-phone"></i> 0795 795 959</p></a>
                    </div>
                </div>
            </div>

            <ScrollToTop />
        </div>
    );
}

export default Checkout;
