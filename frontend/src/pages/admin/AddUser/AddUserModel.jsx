import { useState } from "react";
import "./AddUserModel.css";
import { useNavigate } from "react-router-dom";
import { createUserApi } from "../../../services/adminUserApi";

export default function AddUsermodel({ onClose, onAddUser }) {
      const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = await createUserApi(formData);

    console.log("API Response:", data);

    alert(data.message);

    console.log("1");
    onAddUser?.(data.user);

    console.log("2");
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "user",
    });

    console.log("3");
    onClose?.();

    console.log("4");
  } catch (error) {
    console.error("ERROR:", error);

    alert(
      error.response?.data?.message ||
      error.message ||
      "Failed to create user"
    );
  }
};

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add New User</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="user">Customer</option>
            <option value="admin">Admin</option>
          </select>

          <div className="modal-actions">
            <button
              type="button"
              className="adduser-cancel-btn"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>

            <button type="submit" className="adduser-save-btn">
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}