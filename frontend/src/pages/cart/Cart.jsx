import { Link } from "react-router-dom";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { toast } from "sonner";
import "./Cart.css";

export const Cart = () => {
    const { items, updateQuantity, removeFromCart, getTotal }= useCart();

    const subtotal = getTotal();
    const deliveryFee = subtotal > 50 ? 0: 5.99;
    const total = subtotal + deliveryFee;

    const handleRemove =(productId, name) => {
        removeFromCart(productId);
        toast.success(`${name} removed from cart`);
    };

    if(items.length === 0){
        return(
            <div className="cart-empty-container">
                <div className="cart-empty-content">
                    <div className="cart-empty-icon">
                        <ShoppingBag className="shopping-icon"/>
                    </div>

                    <h1 className="cart-empty-title">Your cart is empty</h1>

                    <p className="cart-empty-text">Start adding items to your cart to see them here</p>

                    <Link className="continue-btn" to="/products">
                    Continue Shopping <ArrowRight className="arrow-icon"/></Link>
                </div>
            </div>
        );
    }

  return (
    <div  className="cart-container">
        <h1 className="cart-title">Shopping Cart</h1>

        <div className="cart-grid">
            {/* Cart Items */}
            <div className="cart-items">
                {items.map((item) =>(
                    <div key={item._id} className="cart-card" >
                        <Link
                        to={`/products/${item._id}`}
                        className="cart-image-wapper"
                        >
                            <img 
                            src={item.image} 
                            alt={item.name} 
                            className="cart-product-image"
                            />
                        </Link>


                        <div className="cart-info">
                            <Link
                            to={`/products/${item._id}`}
                            className="cart-product-name"
                            >
                                {item.name}
                            </Link>

                            <div className="cart-category">{item.category}</div>

                            <div className="cart-price">
                                ₹{item.price.toFixed(2)} each
                            </div>
                        </div>

                        <div className="cart-action">  
                            <button
                                    onClick={() => handleRemove(item._id, item.name)}
                                    className="remove-btn-square"
                                >
                                    Remove
                                </button>
                            
                            <div className="quantity-box">
                                
                                <button
                                onClick={() => {
                                     if (item.quantity > 1) {
                                        updateQuantity(item._id, item.quantity - 1);
                                      }
                                }
                                    

                                }
                                className="quantity-btn"
                                >
                                    <Minus className="small-icon"/>
                                </button>
                                

                                <span className="quantity-text">
                                    {item.quantity}
                                </span>

                                <button 
                                onClick={() =>
                                    updateQuantity(item._id, item.quantity + 1)
                                }
                                className="quantity-btn">
                                    <Plus className="small-icon"/>
                                </button>
                                
                            </div>
                            
                            <div className="total-price">
                                ₹{(item.price * item.quantity).toFixed(2)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* summary */}
            <div className="summary-section">
                <div className="summary-card">
                    <h2 className="summary-title">Order Summary</h2>

                    <div className="sumary-details">
                        <div className="summary-row">
                            <span>
                                Subtotal(
                                {items.reduce(
                                    (sum, item) => sum + item.quantity,
                                    0
                                )}{""}
                                item)
                            </span>

                            <span>₹{subtotal.toFixed(2)}</span>
                        </div>

                        <div className="summary-row">
                            <span>Delivery Fee</span>
                            <span className={deliveryFee === 0 ? "free-text" : ""}>
                                {deliveryFee == 0
                                ? "FREE"
                                : `₹${deliveryFee.toFixed(2)}`}
                            </span>
                        </div>

                        {deliveryFee > 0 &&(
                            <div className="delivery-note">
                                Add ₹{(50 - subtotal).toFixed(2)} more for free delivery
                            </div>
                        )}
                        <div className="summary-total">
                            <span>Total</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>
                    </div>

                    <Link to="/checkout" className="checkout-btn">
                    Proceed to Checkout</Link>
                    
                    <Link to="/products" className="continuecart-btn">
                    Continue Shopping</Link>

                    <div className="benefits">
                        <div className="benefit-item">
                            <span className="check">✓</span>
                            <span>Free delivery on orders over ₹50</span>
                        </div>
                        <div className="benefit-item">
                            <span className="check">✓</span>
                            <span>Same-day delivery available</span>
                        </div>
                        <div className="benefit-item">
                            <span className="check">✓</span>
                            <span>100% satisfaction guarantee</span>
                        </div>
                    </div>

                    


                    </div>
            </div>
        </div>
    </div>
  )
}
