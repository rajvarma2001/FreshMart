import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { changePasswordApi } from "../../../services/userService";
import "./ChangePassword.css";

export default function ChangePassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      await changePasswordApi({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      alert("Password changed successfully");

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      navigate("/admin/profile");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to change password"
      );
    }
  };

  return (
    <div className="change-password-page">
      <div className="change-password-card">
        <div className="card-header">
          <Lock size={30} />
          <h2>Change Password</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="button-group">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/admin/profile")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="cp-save-btn"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}