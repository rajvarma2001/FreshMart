import { useState ,useEffect } from "react";
import {
  Package,
  Search,
  ChevronRight,
} from "lucide-react";
import { getUserOrdersApi } from "../../services/orderApi";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./OrderHistory.css";

export const OrderHistory = () => {

  const { user } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getUserOrdersApi(user._id);

        setOrders(data.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!user?._id) {
      setOrders([]);
      setLoading(false);
      return;
    }

    fetchOrders();
  }, [user]);

   
   const filteredOrders = orders.filter(
  (order) =>
      order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.items || []).some((item) =>
        item.product?.name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
  );

   const getStatusClass = (status) => {
    switch (status) {
      case "Delivered":
        return "status-delivered";

      case "Processing":
        return "status-processing";

      case "Pending":
        return "status-pending";

      case "Cancelled":
        return "status-cancelled";

      default:
        return "status-default";
    }
   };

   if (loading) {
      return (
        <div className="loading-container">
          <h2>Loading Orders...</h2>
        </div>
      );
    }

  return (
    <div className="order-history-container">
      {/* HEADER */}
      <div className="order-header">
        <h1>Order History</h1>
        <p>View and track your orders</p>
      </div>

      {/* SEARCH */}
      <div className="search-card">
        <div className="search-box">
          <Search className="search-icon"/>

          <input
          type="text"
          placeholder="Search by order ID or product name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* ORDERS */}
      {filteredOrders.length > 0 ? (
        <div className="order-list">
          {filteredOrders.map((order) => (
            <div className="order-card" key={order._id}>

              {/* TOP */}
              <div className="order-top">
                <div>
                  <div className="order-id-row">
                    <h3>{order._id.slice(-8).toUpperCase()}</h3>

                    <span className={getStatusClass(order.orderStatus)}>
                      {order.orderStatus}
                    </span>

                  </div>

                  <p className="order-date">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <div className="total-box">
                  <p>Total Amount</p>
                  <h2>₹{(order.totalAmount || 0).toFixed(2)}</h2>
                </div>

              </div>
              {/* ITEMS */}
              <div className="items-list">

                {(order.items || []).map((item, index) => (
                  <div className="item-row" key={index}>
                    <div className="item-left">

                      <Package className="package-icon" />

                      <span>{item.product?.name}</span>

                      <small>× {item.quantity}</small>

                    </div>

                    <strong>
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </strong>

                  </div>

                ))}

              </div>
              {/* ADDRESS */}
              <div className="address-section">
                <div>
                  <p className="address-label">
                    Delivery Address
                  </p>

                  <p className="address-text">
                    {order.shippingAddress}
                  </p>
                </div>

                <button className="detail-btn"
                 onClick={() => navigate(`/orders/${order._id}`)}
                 >
                  View Details
                  <ChevronRight className="arrow-icon" />
                </button>

              </div>

            </div>
          ))}
        </div>

      ):(
        <div className="empty-orders">
          <Package className="empty-icon"/>

          <h3>No orders found</h3>

          <p>
            {searchQuery
            ? "Try a differnt search term"
          :"you haven't placed any orders yet"}

          </p>
        </div>
      
      )}
    </div>
  );
}
