import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  CreditCard,
  Wallet,
  Banknote,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { useCart } from "../../context/CartContext";
import { placeOrderApi } from "../../services/orderApi";
import { useAuth } from "../../context/AuthContext";

import "./Checkout.css";

export const Checkout = () => {
  const { user } = useAuth();
  console.log(user);

  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod ] = useState("cod");


  const subtotal = getTotal();
  const deliveryFee = 2.99;
  const finalTotal = subtotal + deliveryFee;

  const handlePlaceOrder = async () => {
    try {
      if (!user?._id) {
        toast.error("Please sign in before placing an order");
        navigate("/login");
        return;
      }

      if (!user?.address) {
        toast.error("Please add a delivery address");
        navigate("/profile/edit");
        return;
      }

      const orderData = {
        userId: user._id,
        shippingAddress: user.address,
        paymentMethod: paymentMethod === "cod" ? "COD" : "Online",
      };

      const response = await placeOrderApi(orderData);

      toast.success(response.message);

      clearCart();

      navigate("/orders");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to place order"
      );
    }
  };

  if (items.length === 0){
    return(
      <div className="empty-cart-container">
        <div className="empty-cart-content">
          <h1>Your cart is empty</h1>
          <p>Add some items to checkout</p>

          <button onClick={() => navigate("/products")}>
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1 className="checkoout-title">Checkout</h1>

      <div className="checkout-grid">
        {/* LEFT SIDE  */}
        <div className="checkout-left">
          {/* ADDRESS */}
          <div className="card">
            <div className="section-title">
              <MapPin className="icon"/>
              <h2>Delivery Address</h2>
            </div>

             <div className="address-box active">
                <div className="address-top">
                  <div>
                    <h3>Shipping Address</h3>
                    {user?.address ? (
                      <p>{user.address}</p>
                    ) : (
                      <p className="no-address">
                        No address added. Please update your profile.
                      </p>
                    )}
                  </div>

                  <div className="check-circle">
                    <Check className="check-icon" />
                  </div>
                </div>
              </div>

            <button
              className="add-address-btn"
              onClick={() => navigate("/profile/edit")}
            >
              Edit Address
            </button>
          </div>

          {/* PAYMENT */}
          <div className="card">
            <div className="section-title">
              <CreditCard className="icon"/>
              <h2>Payment Method</h2>
            </div>

            <div className="payment-list">

              {/* COD */}
              <button
              onClick={() => setPaymentMethod("cod")}
              className={`payment-box ${
                paymentMethod === "cod" ? "active" : ""
              }`}
              >
                <div className="payment-content">
                  <div className="payment-left">
                    <Banknote className="payment-icon"/>

                    <div>
                      <h3>Cash on Delivery</h3>
                      <p>Pay when you receive</p>
                    </div>
                    </div>

                    {paymentMethod === "cod" &&(
                      <div className="check-circle">
                        <Check className="check-icon"/>
                      </div>
                    )}                  
                </div>
              </button>

              {/* UPI */}
              {/* <button
              onClick={() => setPaymentMethod("upi")}
              className={`payment-box ${
                paymentMethod === "upi" ? "active" : ""
              }`}
              >
                <div className="payment-content">
                  <div className="payment-left">
                    <Wallet className="payment-icon"/>

                    <div>
                      <h3>UPI / Wallets</h3>
                      <p>Google Pay, PhonePe, Paytm</p>
                    </div>
                  </div>

                  {paymentMethod === "upi" &&(
                    <div className="check-circle">
                      <Check className="check-icon"/>
                    </div>
                  )}
                </div>
              </button> */}

              {/* CARD */}
              {/* <button
              onClick={() => setPaymentMethod("card")}
              className={`payment-box ${
                paymentMethod === "card" ? "active" : ""
              }`}
              >
                <div className="payment-content">
                  <div className="payment-left">
                    <CreditCard className="payment-icon"/>

                    <div>
                      <h3>Credit / Debit Card</h3>
                      <p>Visa, Mastercard, etc.</p>
                    </div>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="check-circle">

                      <Check className="check-icon"/>
                    </div>
                  )}
                </div>
              </button> */}

            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="checkout-right">
          <div className="summary-card">

            <h2>Order Summary</h2>

            <div className="summary-items">
              {items.map((item) => (
                <div className="summary-item" key={item._id}>
                  <img
                  src={item.image}
                  alt={item.name}
                  />
                  <div className="summary-info">
                    <h3>{item.name}</h3>

                    <p>
                      {item.quantity} × ₹{item.price.toFixed(2)}
                    </p>
                  </div>

                  <span>
                    ₹{(item.quantity * item.price).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="price-details">

              <div className="price-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>

              <div className="price-row">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee.toFixed(2)}</span>
              </div>

              <div className="price-total">
                <span>Total</span>
                <span>₹{finalTotal.toFixed(2)}</span>
              </div>

            </div>

            <button
            onClick={handlePlaceOrder}
            className="place-order-btn"
            >
              Place Order
            </button>

            <div className="terms-box">
              <p>
                By placing this order, you agree to our Terms of Service
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
