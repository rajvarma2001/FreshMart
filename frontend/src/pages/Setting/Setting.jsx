import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { User, Bell, Lock, Globe, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import "./Setting.css";
const Settings = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logged out successfully!");

    navigate("/login");
  };
  return (
    <div className="settings-container">
        <h1 className="settings-title">settings</h1>
        <div className="settings-wRapper">
            {/* Account settings */}
            <div className="settings-carrd">
                <h2>Account settings</h2>

                <div className="settings-list">
                    <button className="settings-items"
                    onClick={() => navigate("/profile/edit")}>
                        <div className="setiing-left">
                            <User className="settings-icon"/>

                            <div>
                                <h3>Edit Profile</h3>
                                <p>Update yur personal information</p>
                            </div>
                        </div>
                        <ChevronRight className="arrow-icon"/>
                    </button>

                    <button className="settings-item">
                        <div className="settings-left">
                            <Lock className="settings-icon"/>
                            <div>
                                <h3>Change Password</h3>
                                <p>Update your password</p>
                            </div>
                        </div>
                         <ChevronRight className="arrow-icon"/>
                    </button>
                </div>
            </div>
            {/* Notifications */}
            <div className="setting-card">
                <h2>Notifications</h2>

                <div className="notification-item">
                    <div className="setting-left">
                        <Bell className="setting-icon"/>

                        <div>
                            <h3>Email Notifications</h3>
                            <p>Receive order updates via email</p>
                        </div>

                    </div>
                    <label className="switch">
                        <input type="checkbox" defaultChecked/>
                        <span className="slider"></span>
                    </label>

                    <div className="notification-item">
                        <div className="settings-left">
                            <Bell className="settings-icon"/>

                            <div>
                                <h3>Push Notifications</h3>
                                <p>Get alerts on your devices</p>
                            </div>
                        </div>
                        <label className="switch">
                            <input type="checkbox" defaultChecked/>
                            <span className="slider"></span>
                        </label>
                    </div>
                    <div className="notification-item">
                        <div className="setting-left">
                            <Bell className="settings-icon"/>

                            <div>
                                <h3>Promotional Emails</h3>
                                <p>Receive offers and deals</p>
                            </div>
                        </div>
                        <label className="switch">
                            <input type="checkbox" />
                            <span className="slider"></span>
                        </label>
                    </div>
                </div>

                {/*Preferences */}
                <div className="setting-card">
                    <h2>Preferences</h2>

                    <button className="settings-item">
                        <div className="settings-left">
                            <Globe className="settings-icon"/>

                            <div>
                                <h3>Language</h3>
                                <p>English (US)</p>
                            </div>
                        </div>
                        <ChevronRight className="arrow-icon"/>
                    </button>
                </div>

                {/* support */}
                <div className="setting-card">
                    <h2>Support</h2>

                    <button className="settings-item">
                        <div className="settings-left">
                            <Globe className="settings-icon"/>

                            <div>
                                <h3>Help Center</h3>
                                <p>Get help and support</p>
                            </div>
                        </div>
                        <ChevronRight className="arrow-icon"/>
                    </button>
                </div>

                {/* logout */}
                <div className="settings-card">
                    <button className="logout-btn" onClick={handleLogout}>
                        <LogOut className="logout-icon"/>
                        Logout</button>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Settings