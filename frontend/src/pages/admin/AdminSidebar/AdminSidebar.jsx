import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  UserCircle,
} from "lucide-react";

import "./AdminSidebar.css";

export const AdminSidebar = () => {
  const location = useLocation();

  return (
    <aside className="admin-sidebar">
      <h2>Admin Panel</h2>
       <Link
        to="/admin/profile"
        className={location.pathname === "/admin/profile" ? "active" : ""}
      ><UserCircle size={18} />
        Profile</Link>

      <Link
        to="/admin/dashboard"
        className={location.pathname === "/admin/dashboard" ? "active" : ""}
      >
        <LayoutDashboard size={18} />
        Dashboard
      </Link>

      <Link
        to="/admin/products"
        className={location.pathname === "/admin/products" ? "active" : ""}
      >
        <Package size={18} />
        Products
      </Link>

      <Link
        to="/admin/orders"
        className={location.pathname === "/admin/orders" ? "active" : ""}
      >
        <ShoppingCart size={18} />
        Orders
      </Link>

      <Link
        to="/admin/users"
        className={location.pathname === "/admin/users" ? "active" : ""}
      >
        <Users size={18} />
        Users
      </Link>
    </aside>
  );
};