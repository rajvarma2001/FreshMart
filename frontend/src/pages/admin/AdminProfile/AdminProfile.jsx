import "./AdminProfile.css";
import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Calendar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../../services/userService";

export default function AdminProfile() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();

        console.log(data);

        // API may return the user object directly or wrapped in `user`
        setAdmin(data.user || data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!admin) {
    return <h2>Failed to load profile</h2>;
  }

  return (
    <div className="admin-profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <img
            src={
              admin.avatar ||
              "https://ui-avatars.com/api/?name=Admin"
            }
            alt="Admin"
            className="profile-avatar"
          />

          <h2>{admin.name}</h2>

          <span className="role-badge">
            <Shield size={16} />
            {admin.role}
          </span>
        </div>

        <div className="profile-details">
          <div className="detail-item">
            <User size={18} />
            <span>{admin.name}</span>
          </div>

          <div className="detail-item">
            <Mail size={18} />
            <span>{admin.email}</span>
          </div>

          <div className="detail-item">
            <Phone size={18} />
            <span>{admin.phone || "Not Added"}</span>
          </div>

          <div className="detail-item">
            <MapPin size={18} />
            <span>{admin.address || "Not Added"}</span>
          </div>

          <div className="detail-item">
            <Calendar size={18} />
            <span>
              Joined: {new Date(admin.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="profile-actions">
          <button
            className="adminedit-btn"
            onClick={() => navigate("/admin/profile/edit")}
          >
            Edit Profile
          </button>

          <button
            className="password-btn"
            onClick={() => navigate("/admin/change-password")}
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}