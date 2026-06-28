import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EditAdminProfile.css";
import { useEffect } from "react";
import {
  getProfile,
  updateProfile,
} from "../../../services/userService";
export default function EditAdminProfile() {
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getProfile();

      setFormData({
        name: data.user.name || "",
        email: data.user.email || "",
        phone: data.user.phone || "",
        address: data.user.address || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [formData, setFormData] = useState({
    name: "Admin",
    email: "admin@gmail.com",
    phone: "",
    address: "",
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
      // await updateProfileApi(formData);
       await updateProfile(formData);
      alert("Profile Updated Successfully");
      navigate("/admin/profile");
    } catch (error) {
      console.log(error);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="edit-profile-page">
      <div className="edit-profile-card">
        <h2>Edit Admin Profile</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
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
              rows="4"
              value={formData.address}
              onChange={handleChange}
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

            <button type="submit" className="save-btn">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}