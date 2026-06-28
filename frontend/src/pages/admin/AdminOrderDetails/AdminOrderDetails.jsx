import { useEffect, useState} from "react";
import { useParams ,useNavigate} from "react-router-dom";
import { getOrderByIdApi } from "../../../services/orderApi";
import "./AdminOrderDetails.css";


export default function AdminOrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, []);

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

  if (loading) return <h2>Loading...</h2>;

  if (!order) return <h2>Order not found</h2>;

  return (
    <div className="admin-order-details">
       <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

      <h1>Order Details</h1>

      {/* Customer */}
      <div className="detail-card">
        <h2>Customer Information</h2>
        <p><strong>Name:</strong> {order.user?.name}</p>
        <p><strong>Email:</strong> {order.user?.email}</p>
        <p><strong>Address:</strong> {order.shippingAddress}</p>
      </div>

      {/* Order */}
      <div className="detail-card">
        <h2>Order Information</h2>
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Status:</strong> {order.orderStatus}</p>
        <p><strong>Payment:</strong> {order.paymentMethod}</p>
        <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
        <p>
          <strong>Date:</strong>{" "}
          {new Date(order.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Products */}
      <div className="detail-card">
        <h2>Ordered Products</h2>

        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Subtotal</th>
            </tr>
          </thead>

          <tbody>
            {order.items.map((item) => (
              <tr key={item._id}>
                <td>{item.product?.name}</td>
                <td>₹{item.price}</td>
                <td>{item.quantity}</td>
                <td>₹{item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Total: ₹{order.totalAmount}</h2>
      </div>
    </div>
  );
}