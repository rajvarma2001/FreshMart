import { Outlet } from "react-router-dom";
import { AdminSidebar } from "../AdminSidebar/AdminSidebar";
import "./AdminLayout.css";

export const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};