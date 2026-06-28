import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Package, MapPin, CreditCard , ArrowLeft } from "lucide-react";
import { getOrderByIdApi } from "../../services/orderApi";
import "./OrderDetails.css";
import { useNavigate } from "react-router-dom";

export const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderByIdApi(id);
        setOrder(data.order);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <h2>Loading...</h2>;

  if (!order) return <h2>Order not found</h2>;

  return (
    <div className="order-details-container">
        <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={18} />
        Back
      </button>
      <div className="order-header">
        <h1>Order Details</h1>
        <p>Order #{order._id.slice(-8).toUpperCase()}</p>
      </div>

      <div className="details-card">
        <h3>Status</h3>
        <p>{order.orderStatus}</p>
      </div>

      <div className="details-card">
        <h3>
          <MapPin size={18} />
          Shipping Address
        </h3>

        <p>{order.shippingAddress}</p>
      </div>

      <div className="details-card">
        <h3>
          <CreditCard size={18} />
          Payment Method
        </h3>

        <p>{order.paymentMethod}</p>
      </div>

      <div className="details-card">
        <h3>
          <Package size={18} />
          Ordered Items
        </h3>

        {order.items.map((item) => (
          <div key={item._id} className="item-row">
            <span>{item.product?.name}</span>
            <span>Qty: {item.quantity}</span>
            <span>₹{item.price}</span>
          </div>
        ))}
      </div>

      <div className="details-card total-card">
        <h2>Total: ₹{order.totalAmount}</h2>
      </div>
    </div>
  );
};