import {  User,  MapPin,  Mail,  Phone,  Edit,  Package, Clock,
  Settings as SettingsIcon,
} from "lucide-react";

import { useEffect, useState } from "react";
import { getProfile } from "../../services/userService";
import { getUserOrdersApi } from "../../services/orderApi";

import { Link } from "react-router-dom";
import "./Profile.css";

export const Profile = () => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalSpent: 0,
        memberSince: "-",
        loyaltyPoints: 0,
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile();
                setUser(data.user);
                // populate member since if available
                if (data.user?.createdAt) {
                    const memberSince = new Date(data.user.createdAt).toLocaleString("default", { month: "short", year: "numeric" });
                    setStats((s) => ({ ...s, memberSince }));
                }
            } catch (error) {
                console.log(error);
            } finally{
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    useEffect(() => {
    const fetchOrders = async () => {
        setLoadingOrders(true);
        try {
        const data = await getUserOrdersApi(user._id);

        console.log("API Response:", data);
        console.log("User ID:", user?._id);
        const fetchedOrders = data.orders || [];
        setOrders(fetchedOrders);

        // compute stats from orders + user
        const totalOrders = fetchedOrders.length;
        const totalSpent = fetchedOrders.reduce((sum, o) => sum + Number(o.totalAmount || 0), 0);
        const loyaltyPoints = user?.loyaltyPoints ?? Math.floor(totalSpent);
        const memberSince = user?.createdAt ? new Date(user.createdAt).toLocaleString("default", { month: "short", year: "numeric" }) : stats.memberSince;

        setStats({ totalOrders, totalSpent, memberSince, loyaltyPoints });
        } catch (error) {
        console.log(error);
        } finally {
        setLoadingOrders(false);
        }
    };

    if (!user?._id) return;

    fetchOrders();
    }, [user]);

    if(loading){
        return <h2>loading...</h2>
    }

  const getStatusColor = (status) => {
    switch(status){
        case "Delivered":
            return "status delivered";

        case "Processing":
            return "status processing";

        case "Cancelled":
            return "status cancelled";

        default:
            return "status"
    }
  };

  return (
    <div className="profile-container">
        <h1 className="profile-title">My Profile</h1>

        <div className="profile-grid">

                {/*LEFT SIDE */}
                <div className="profile-left">
                    {/* Used Card */}
                    <div className="card">
                        <div className="avatar-wrapper">
                            <div className="avatar">
                                <User className="avatar-icon"/>
                            </div>
                        </div>
                         
                         <div className="user-info">
                            <h2>{user?.name}</h2>

                            <div className="member-badge">
                                Gold Memeber
                            </div>
                         </div>

                         <div className="contact-info">

                            <div className="contact-item">
                                <Mail className="icon"/>
                                <span>{user?.email}</span>
                            </div>

                            <div className="contact-item">
                                <Phone className="icon"/>
                                <span>{user?.phone}</span>
                            </div>

                            <div className="contact-item">
                                <MapPin className="icon"/>
                                <span>
                                {user?.address || "No address added"}
                                </span>
                            </div>
                         </div>

                         <div className="button-group">

                            <Link to="/profile/edit" className="btn primary-btn">
                            <Edit className="btn-icon"/>
                            Edit Profile
                            </Link>

                            {/* <Link to="/settings" className="btn secondary-btn">
                            <SettingsIcon className="btn-icon"/>
                            Setting
                            </Link> */}
                         </div>
                    </div>

                    {/* status card */}
                    <div className="card">
                        <h3 className="section-title">Account Stats</h3>

                        <div className="stats-list">
                            <div className="stats-row">
                                <span>Total Orders</span>
                                <strong>{loadingOrders ? "..." : stats.totalOrders}</strong>
                            </div>

                            <div className="stats-row">
                                <span>Total Spent</span>
                                <strong className="primary-text">{loadingOrders ? "..." : new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(stats.totalSpent)}</strong>
                            </div>
                            
                            <div className="stats-row">
                                <span>Member Since</span>
                                <strong>{stats.memberSince}</strong>
                            </div>
                            
                            <div className="stats-row">
                                <span>Loyalty Points</span>
                                <strong>{loadingOrders ? "..." : stats.loyaltyPoints}</strong>
                            </div>
                            
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="profile-right">

                {/* ORDER HISTORY */}
                <div className="card">
                    <div className="section-header">
                        <h2>Order History</h2>

                        <Link className="view-all" to="/orders">View All</Link>
                    </div>

                    <div className="order-list">
                    {loadingOrders ? (
                        <p>Loading orders...</p>
                    ) : orders.length > 0 ? (
                        orders.map((order) => (
                        <div className="order-card" key={order._id}>
                            <div className="order-top">
                            <div>
                                <h3>#{order._id.slice(-8)}</h3>

                                <div className="order-date">
                                <Clock className="small-icon" />
                                <span>
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </span>
                                </div>
                            </div>

                            <div className={getStatusColor(order.orderStatus)}>
                                {order.orderStatus}
                            </div>
                            </div>

                            <div className="order-bottom">
                            <span>{order.items?.length || 0} items</span>

                            <strong>
                                ₹{Number(order.totalAmount || 0).toFixed(2)}
                            </strong>
                            </div>

                            <div className="order-payment">
                            Payment: {order.paymentStatus}
                            </div>

                            <Link
                            className="detail-btn"
                            to={`/orders/${order._id}`}
                            >
                            View Details
                            </Link>
                        </div>
                        ))
                    ) : (
                        <div className="empty-orders">
                        <Package className="empty-icon" />
                        <p>No orders yet</p>
                        </div>
                    )}
                    </div>
                    </div>
                {/* PREFERNCES */}
                <div className="card preferences-card">
                    <h2 className="section-heading">Preferences</h2>
                    <div className="preference-item">
                        <div>
                            <h3>Email Notifications</h3>
                            <p>Recevive order update via email</p>
                        </div>

                        <input type="checkbox" defaultChecked />
                    </div>

                    <div className="preference-item">

                        <div>
                            <h3>SMA Notifications</h3>
                            <p>Get deelivery updates via SMS</p>
                        </div>

                        <input type="checkbox"  defaultChecked/>
                        
                    </div>

                    <div className="preference-item">

                        <div>
                            <h3>Marketing Emails</h3>
                            <p>Receive special offers and promotions</p>
                        </div>

                        <input type="checkbox" />
                        
                    </div>

                </div>
            </div>
        </div>

    </div>
  );
};
