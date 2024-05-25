import React, { useState } from 'react';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SubNav from '../../components/SubNav/SubNav.js';
import { useNavigate } from 'react-router-dom';
import '../../styles/Cart/Checkout.scss';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';

function Checkout() {
    const navItems = ['Home', 'Cart', 'Checkout'];
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('');

    const handleBackToCart = () => {
        navigate('/cart');
    };

    const handleInvoice = () => {
        if (paymentMethod === '') {
            swal({
                text: "Please select a payment method before confirming the order.",
                icon: "warning",
                button: "OK",
            });
        } else {
            navigate('/invoice', { state: { paymentMethod } });
        }
    };


    return (
        <div className="Checkout">
            <SubNav items={navItems} />

            <div className="checkout_header">
                <div className="checkout_title">
                    <i className="fas fa-shopping-cart"></i> Checkout (2)
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
                            <input type="text" id="fullName" name="fullName" required placeholder='Enter full name' />
                        </div>
                        <div className="form_group_name_phone">
                            <label htmlFor="phone">Phone number *</label>
                            <input type="text" id="phone" name="phone" required placeholder='Enter phone number' />
                        </div>
                        <div className="form_group_address_note">
                            <label htmlFor="address">Address *</label>
                            <input type="text" id="address" name="address" required placeholder='Enter address' />
                        </div>
                        <div className="form_group_address_note">
                            <label htmlFor="note">Note (optional)</label>
                            <textarea id="note" name="note"></textarea>
                        </div>
                    </form>
                </div>


                <div className="checkout_summary">
                    <h5 className="checkout_summary_voucher_title"><i className="fas fa-ticket"></i>Voucher</h5>
                    <div className="voucher">
                        <input type="text" placeholder="Voucher" />
                        <button>Apply</button>
                    </div>
                    <h5 className="checkout_summary_payment_title"><i className="fas fa-credit-card"></i>Payment method</h5>
                    <div className="payment_methods">
                        <div className="payment_method">
                            <input type="radio" id="bankTransfer" name="paymentMethod" value="Bank Transfer" onChange={(e) => setPaymentMethod(e.target.value)} />
                            <label htmlFor="bankTransfer">Bank Transfer</label>
                            <p>(Make a transfer to the shop's account number in the invoice after clicking order. In the transfer content, write the order code. The order will be shipped after successful transfer)</p>
                        </div>
                        <div className="payment_method">
                            <input type="radio" id="cash" name="paymentMethod" value="Cash" onChange={(e) => setPaymentMethod(e.target.value)} />
                            <label htmlFor="cash">Cash</label>
                            <p>(Give cash by the time delivering or contact us through hotline to come and transact directly at the store)</p>
                        </div>
                    </div>
                    <h5 className="checkout_summary_title"><i className="fas fa-receipt"></i>Total price</h5>
                    <div className="checkout_summary_details">
                        <p className="checkout_summary_subtotal"><span>Subtotal</span><span><strong>180$</strong></span></p>
                        <p className="checkout_summary_discount"><span>Discount</span><span><strong>10$</strong></span></p>
                        <hr />
                        <p className="checkout_summary_total"><span><strong>Total</strong></span><span><strong>170$</strong></span></p>
                    </div>
                    <button onClick={handleInvoice} className="checkout_summary_checkout">Confirm order</button>
                    <div className="checkout_summary_service">
                        <p className="24/7_service"><strong>24/7 Customer Service</strong></p>
                        <p className="phone_service"><i className="fas fa-phone"></i> 0912 345 678</p>
                    </div>
                </div>
            </div>

            <ScrollToTop />
        </div>
    );
}

export default Checkout;
