import { useState } from "react";
import { X } from "lucide-react";
import "./Login.css";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export function Login({ isOpen = true, onClose = () => {} }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

    setError("");

    if(!emailRegex.test(email)){
        setError("Please enter a vaild email address");
        return;
    }
    if(!passwordRegex.test(password)){
        setError("Please enter a vaild password");
        return;
    }

    try {
      let res;

      if(isLogin) {
        res =await api.post("/auth/login",{
          email,
          password,
        });
      } else {
        res = await api.post("/auth/register", {
          name,
          email,
          password,
        });
      }

      setUser(res.data.user);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert(res.data.message);

      onClose();
    }catch (error) {
      setError(
        error.response?.data?.message ||
        "Something went wrong"
      );
    };

    // console.log("Form submitted", { email, password, name });
    // onClose();
  };


  return (
    <div className="modal-overlay">
      <div className="modal-box">
        
        {/* Close Button */}
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        {/* Header */}
        <div className="modal-header">
          <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
          <p>
            {isLogin
              ? "Sign in to access your account"
              : "Join FreshMart for fresh groceries"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="form">

          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
            />
          </div>

          {isLogin && (
            <div className="forgot">
              <button type="button">Forgot password?</button>
            </div>
          )}

          {error && (
            <p className="error-message">{error}</p>
          )}

          <button className="primary-btn" type="submit">
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        {/* Toggle */}
        <div className="toggle-auth">
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}
            <span>{isLogin ? " Sign up" : " Sign in"}</span>
          </button>
        </div>

        {/* Google */}
        <div className="google-section">
          <button className="google-btn">
            Continue with Google
          </button>
        </div>

      </div>
    </div>
  );
}