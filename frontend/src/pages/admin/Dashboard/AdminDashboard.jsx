import "./AdminDashboard.css";
import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { useState, useEffect } from "react";
import { getDashboardStatsApi } from "../../../services/adminApi";
import { useNavigate } from "react-router-dom";

export const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const navigate = useNavigate();
    
  useEffect(() => {
  fetchDashboardData();
}, []);

const fetchDashboardData = async () => {
  try {
    const data = await getDashboardStatsApi();

    setStats([
      {
        title: "Total Products",
        value: data.stats.totalProducts,
        change: "+0%",
        trend: "up",
        icon: Package,
        color: "primary",
      },
      {
        title: "Total Orders",
        value: data.stats.totalOrders,
        change: "+0%",
        trend: "up",
        icon: ShoppingCart,
        color: "blue",
      },
      {
        title: "Total Users",
        value: data.stats.totalUsers,
        change: "+0%",
        trend: "up",
        icon: Users,
        color: "purple",
      },
      {
        title: "Total Revenue",
        value: `₹${data.stats.totalRevenue}`,
        change: "+0%",
        trend: "up",
        icon: DollarSign,
        color: "green",
      },
    ]);

    setRecentOrders(data.recentOrders  || []);

  } catch (error) {
    console.error("Dashboard Error:", error);
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
      default:
        return "status";
    }
  };
if (loading) {
  return <h2>Loading Dashboard...</h2>;
}
  return (
    <div className="dashboard">
        <h1 className="dashboard-tiltle">Dashboard</h1>

        {/* Stats */}
        <div className="stats-grid">
            {stats.map((stat) => {
                const Icon =  stat.icon;
                const TrendIcon =
                stat.trend === "up" ? TrendingUp : TrendingDown;

                return(
                    <div className="stat-card" key={stat.title}>
                        <div className="stat-top">
                            <div className={`icon-box ${stat.color}`}>
                                <Icon className="stat-icon"/>
                            </div>

                            <div
                            className={`trend ${
                                stat.trend === "up" ? "up" :"down"
                            }`}
                            >
                                <TrendIcon size={16}/>
                                <span>{stat.change}</span>
                            </div>
                        </div>

                        <h3 className="stat-title">{stat.title}</h3>
                        <p className="stat-value">{stat.value}</p>
                    </div>
                )
            })}
        </div>

        {/* Recent Orders */}
        <div className="orders-section">
            <h2 className="orders-title">Recent Orders</h2>

            <div className="table-wapper">
                <table>
                    <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                        {recentOrders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id.slice(-6) || "N/A"}</td>
                                <td>{order.user?.name || "Unknown User"}</td>
                                <td>₹{order.totalAmount.toFixed(2) || "0.00"}</td>

                                <td>
                                    <span className={getStatusClass(order.orderStatus)}>
                                        {order.orderStatus}
                                    </span>
                                </td>

                                <td>
                                    <button className="view-btn" onClick={() => navigate(`/admin/orders/${order._id}`)}>View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}
