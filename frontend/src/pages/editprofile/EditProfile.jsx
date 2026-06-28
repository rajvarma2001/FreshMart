import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Save,
  X,
  MailPlusIcon,
} from "lucide-react";
import { toast } from "sonner";
import "./EditProfile.css";
import { getProfile, updateProfile } from "../../services/userService";
import { useAuth } from "../../context/AuthContext";

const Editprofile = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    useEffect(() => {
    const fetchProfile = async () => {
        try {
        const data = await getProfile();

        setFormData((prev) => ({
            ...prev,
            name: data.user.name || "",
            email: data.user.email || "",
            phone: data.user.phone || "",
            address: data.user.address || "",
        }));

        if (data.user.addresses) {
            setAddresses(data.user.addresses);
            }
        } catch (error) {
        console.log(error);
        }
    };

    fetchProfile();
    }, []);

    

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const res = await updateProfile({
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        });
        setUser(res.user);

        toast.success(res.message);
        navigate("/profile");
    } catch (error) {
        toast.error("Failed to update profile");
    }
    };

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address:"",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });



  return (
    <div className="edit-profile-container">
        <div className="edit-profile-header">
            <h1>Edit profile</h1>
            <p>Update your personal information</p>
        </div>

        <form onSubmit={handleSubmit} className="edit-profile-form">
            {/* Personal Information */}
            <div className="profile-card">
                <h2>Personal Information</h2>

                <div className="form-group">
                    <label>Full Name</label>

                    <div className="input-wrapper">
                        <User className="input-icon"/>

                        <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                        setFormData({
                            ...formData,
                            name: e.target.value,
                        })
                        }
                        />
                    </div>
                </div>
                
                <div className="grid-two">
                    <div className="form-group">
                        <label>Email Address</label>

                        <div className="input-wrapper">
                            <Mail className="input-icon"/>

                             <input
                                type="email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                    ...formData,
                                    email: e.target.value,
                                    })
                                }
                                />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Phone Number</label>

                        <div className="input-wrapper">
                            <Phone className="input-icon"/>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) =>
                                    setFormData({
                                    ...formData,
                                    phone: e.target.value,
                                    })
                                }
                                />
                        </div>
                    </div>
                </div>
            </div>

            {/* Change Password */}
            <div className="profile-card">
                <h2>Change Password</h2>

                <div className="form-group">
                    <label>Current Password</label>
                    <div className="input-wrapper">
                        <Lock className="input-icon"/>

                        <input
                            type="password"
                            placeholder="••••••••"
                            value={formData.currentPassword}
                            onChange={(e) =>
                            setFormData({
                                ...formData,
                                currentPassword: e.target.value,
                            })
                            }
                        />
                    </div>
                </div>
                <div className="grid-two">
                    <div className="form-group">
                        <label>New Password</label>

                        <div className="input-wrapper">
                            <Lock className="input-icon"/>

                            <input
                            type="password"
                            placeholder="••••••••"
                            value={formData.newPassword}
                            onChange={(e) =>
                                setFormData({
                                ...formData,
                                newPassword: e.target.value,
                                })
                            }
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Confirm New Password</label>

                        <div className="input-wrapper">
                            <Lock className="input-icon"/>

                            <input
                            type="password"
                            placeholder="********"
                            value={formData.confirmPassword}
                            onChange={(e)=>
                                setFormData({
                                    ...formData,
                                    confirmPassword: e.target.value,
                                })
                            }
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Saved Addresses */}
            <div className="form-group">
            <label>Address</label>

            <div className="input-wrapper">
                <MapPin className="input-icon" />

                <input
                type="text"
                value={formData.address}
                onChange={(e) =>
                    setFormData({
                    ...formData,
                    address: e.target.value,
                    })
                }
                placeholder="Enter your address"
                />
            </div>
            </div>
            {/* Buttons */}
            <div className="button-group">
                <button type="submit" className="save-btn">
                    <Save size={18}/>
                    Save Changes
                </button>

                <button type="button" className="cancel-btn" 
                onClick={() => navigate("/profile")}>
                    Cancel
                </button>
            </div>
        </form>
    </div>
  )
}

export default Editprofile