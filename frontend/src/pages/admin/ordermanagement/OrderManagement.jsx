import "./OrderManagement.css";
import { useState ,useEffect} from "react";
import { Search, Eye, Package } from "lucide-react";
import {
  getAllOrdersApi,
  updateOrderStatusApi,
} from "../../../services/orderApi";
import { useNavigate } from "react-router-dom";


export const OrderManagement = () => {
    
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery]= useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
    fetchOrders();
    }, []);

    const fetchOrders = async () => {
    try {
        const data = await getAllOrdersApi();

        setOrders(data.orders);
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
    };


      
  const getStatusClass = (status) => {
    switch (status) {
      case "Delivered":
        return "status delivered";
      case "Processing":
        return "status processing";
      case "Pending":
        return "status pending";
      case "Cancelled":
        return "status cancelled";
      default:
        return "status";
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
     order._id.slice(-6).toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.user?.email?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
      filterStatus === "all" || order.orderStatus === filterStatus;
      return matchesSearch && matchesStatus;
  });

const handleStatusUpdate = async (orderId, orderStatus) => {
    try {
    await updateOrderStatusApi(orderId, orderStatus);

    setOrders((prev) =>
        prev.map((order) =>
        order._id === orderId
            ? { ...order, orderStatus }
            : order
        )
    );
    } catch (error) {
    console.error(error);
    alert("Failed to update status");
    }
    };

    if (loading) {
    return <h2>Loading Orders...</h2>;
    }
  return (
    <div className="order-management">
        <div className="hedaer">
            <h1>Order Management</h1>
            <p>Manage and track all customer orders</p>
        </div>

        {/* filters */}
        <div className="filters">
            <div className="search-box">
                <Search className="search-icon" size={18}/>
                 <input
                    type="text"
                    placeholder="Search orders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                
            </div>
            <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                >
                <option value="all">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
                </select>
        </div>
        {/* tables */}
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredOrders.map((order)=>(
                        <tr key={order._id}>
                            <td>{order._id.slice(-6)}</td>

                            <td>
                                <div className="customer-info">
                                    <span className="customer-name">
                                        {order.user?.name}
                                    </span>

                                    <span className="customer-email">
                                        {order.user?.email}
                                    </span>
                                </div>
                            </td>

                            <td>
                                {new Date(order.createdAt).toLocaleDateString()}
                            </td>
                            <td>{order.items?.length} items</td>

                            <td className="price">
                                ₹{order.totalAmount.toFixed(2)}
                            </td>

                            <td>
                                 <select
                                    value={order.orderStatus}
                                    onChange={(e) =>
                                    handleStatusUpdate(order._id, e.target.value)
                                    }
                                    className={getStatusClass(order.orderStatus)}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </td>

                            <td>
                                <button className="view-btn"  onClick={() => navigate(`/admin/orders/${order._id}`)}>
                                    <Eye size={18}/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {filteredOrders.length === 0 && (
                <div className="empty">
                    <Package size={60}/>
                    <p>No orders found</p>
                </div>
            )}
        </div>
        {/* summary */}
        <div className="summary-grid">
            <div className="summary-card">
                <p>Total Orders</p>
                <h2>{orders.length}</h2>
            </div>

            <div className="summary-card">
                <p>Pending</p>
                <h2 className="yellow">
                    {orders.filter((o) => o.orderStatus === "pending").length}
                </h2>
            </div>
            <div className="summary-card">
            <p>Processing</p>
            <h2 className="blue">
                {orders.filter((o) => o.orderStatus === "Processing").length}
            </h2>
            </div>

            <div className="summary-card">
            <p>Delivered</p>
            <h2 className="green">
                {orders.filter((o) => o.orderStatus === "Delivered").length}
            </h2>
            </div>
        </div>
    </div>
  )
}
