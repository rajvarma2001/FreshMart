import "./UserManagement.css";
import { useState ,useEffect } from "react";
import {
  Search,
  Edit,
  Trash2,
  UserPlus,
  Mail,
  Phone,
} from "lucide-react";

import {
  getAllUsersApi,
  deleteUserApi,
} from "../../../services/adminUserApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export function UserManagement() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    if (!user) {
      setUnauthorized(true);
      setLoading(false);
      return;
    }

    if (user.role !== "admin") {
      setUnauthorized(true);
      setLoading(false);
      return;
    }

    const fetchUsers = async () => {
      try {
        const data = await getAllUsersApi();

        setUsers(data.users || data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user]);
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      user.email
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (user.phone || "").includes(searchQuery);

    const matchesRole =
      filterRole === "all" ||
      user.role === filterRole;

    return matchesSearch && matchesRole;
  });

  const handleDelete = async (id, name) => {
    const confirmDelete = window.confirm(
        `Are you sure you want to delete "${name}"?`
      );

      if (!confirmDelete) return;

      try {
        await deleteUserApi(id);

        setUsers((prev) =>
          prev.filter((u) => u._id !== id)
        );

        alert("User deleted successfully");
      } catch (error) {
        console.error(error);
        alert("Failed to delete user");
      }
    };

  const handleToggleStatus = (id) => {
    setUsers(
      users.map((user) =>
        user._id === id
          ? {
              ...user,
              status:
                user.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : user
      )
    );
  };

  const getStatusClass = (status) => {
    return status === "Active"
      ? "status active"
      : "status inactive";
  };

  const getRoleClass = (role) => {
    return role === "admin"
      ? "role admin"
      : "role customer";
  };

  if (loading) {
    return <h2>Loading users...</h2>;
  }

  if (unauthorized) {
    return (
      <div className="user-management">
        <h2>Access denied</h2>
        <p>You must be signed in as an admin to view this page.</p>
      </div>
    );
  }

  return (
    <div className="user-management">
      {/* Header */}
      <div className="header">
        <div>
          <h1>User Management</h1>
          <p>
            Manage customer accounts and permissions
          </p>
        </div>

        <button className="add-user-btn" onClick={() => navigate("/admin/users/add-user")}>
          <UserPlus size={18} />
          Add User
        </button>
      </div>

      {/* Filters */}
      <div className="filters">
        <div className="search-box">
          <Search
            className="search-icon"
            size={18}
          />

          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
          />
        </div>

        <select
          value={filterRole}
          onChange={(e) =>
            setFilterRole(e.target.value)
          }
        >
          <option value="all">All Roles</option>
          <option value="user">
            Customer
          </option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Contact</th>
              <th>Role</th>
              <th>Orders</th>
              <th>Total Spent</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                {/* User */}
                <td>
                  <div className="user-info">
                    <div className="avatar">
                      {user.name.charAt(0)}
                    </div>

                    <div>
                      <div className="user-name">
                        {user.name}
                      </div>

                      <div className="joined-date">
                        Joined{" "}
                        {new Date(
                          user.createdAt
                        ).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                          }
                        )}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Contact */}
                <td>
                  <div className="contact-info">
                    <div className="contact-row">
                      <Mail size={16} />
                      {user.email}
                    </div>

                    <div className="contact-row">
                      <Phone size={16} />
                      {user.phone}
                    </div>
                  </div>
                </td>

                {/* Role */}
                <td>
                  <span
                    className={getRoleClass(
                      user.role
                    )}
                  >
                    {user.role}
                  </span>
                </td>

                {/* Orders */}
                <td>{user.orders || 0}</td>

                {/* Total */}
                <td className="price">
                  ₹{(user.totalSpent || 0).toFixed(2)}
                </td>

                {/* Status */}
                <td>
                  <button
                    onClick={() =>
                      handleToggleStatus(
                        user._id
                      )
                    }
                    className={getStatusClass(
                      user.status
                    )}
                  >
                    {user.status}
                  </button>
                </td>

                {/* Actions */}
                <td>
                  <div className="actions">
                    <button className="edit-btn" onClick={() =>
                        navigate(`/admin/users/edit/${user._id}`)
                      }>
                      <Edit size={18} />
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(
                          user._id,
                          user.name
                        )
                      }
                      disabled={
                        user.role === "admin"
                      }
                    >
                      <Trash2
                        size={18}
                        className={
                          user.role === "admin"
                            ? "disabled-icon"
                            : ""
                        }
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="empty">
            <p>No users found</p>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="summary-grid">
        <div className="summary-card">
          <p>Total Users</p>
          <h2>{users.length}</h2>
        </div>

        <div className="summary-card">
          <p>Active Users</p>
          <h2 className="green">
            {
              users.filter(
                (u) => u.status === "Active"
              ).length
            }
          </h2>
        </div>

        <div className="summary-card">
          <p>Customers</p>
          <h2 className="blue">
            {
              users.filter(
                (u) =>
                  u.role === "user"
              ).length
            }
          </h2>
        </div>

        <div className="summary-card">
          <p>Admins</p>
          <h2 className="purple">
            {
              users.filter(
                (u) => u.role === "admin"
              ).length
            }
          </h2>
        </div>
      </div>
    </div>
  );
}