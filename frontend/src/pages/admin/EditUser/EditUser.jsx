import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getUserByIdApi,
  updateUserApi,
} from "../../../services/adminUserApi";
import "./EditUser.css";

export default function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    role: "user",
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
  try {
    const data = await getUserByIdApi(id);

    setFormData({
      name: data.user.name || "",
      email: data.user.email || "",
      phone: data.user.phone || "",
      address: data.user.address || "",
      role: data.user.role || "user",
    });
  } catch (error) {
    console.error("Failed to fetch user:", error);
    alert("Failed to fetch user");
  } finally {
    setLoading(false);
  }
};

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await updateUserApi(id, formData);

    alert("User updated successfully");

    navigate("/admin/users");
  } catch (error) {
    console.error("Failed to update user:", error);

    alert(
      error.response?.data?.message ||
      "Failed to update user"
    );
  }
};

  if (loading) {
    return <h2>Loading User...</h2>;
  }

  return (
    <div className="edit-user-page">
      <div className="edit-user-card">
        <h1>Edit User</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Phone</label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Address</label>

            <textarea
              name="address"
              rows="3"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Role</label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="user">
                Customer
              </option>

              <option value="admin">
                Admin
              </option>
            </select>
          </div>

          <div className="action-buttons">
            <button
              type="button"
              className="edituser-cancel-btn"
              onClick={() =>
                navigate("/admin/users")
              }
            >
              Cancel
            </button>

            <button
              type="submit"
              className="edituser-save-btn"
            >
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}