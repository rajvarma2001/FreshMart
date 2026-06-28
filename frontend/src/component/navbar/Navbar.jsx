import { useState, useEffect, useRef } from "react";
import { UserRound, ShoppingCart, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth  } from "../../context/AuthContext";

export const Navbar = ({ onLoginClick, onSignupClick }) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const menuRef = useRef();

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token"); // future use;
    setIsOpen(false);
  };

  const handleSearchSubmit = (q) => {
    const term = (q || query).trim();
    if (!term) {
      navigate('/products');
      return;
    }
    navigate(`/products?search=${encodeURIComponent(term)}`);
    setIsOpen(false);
  };

  return (
    <header className="header-container">
      <nav className="navbar">
        <div className="nav">

          {/* Logo */}
          <div className="logo">
            <h3 className="logo-text">
              <span className="package-lucide">F</span>
              FreshMart
            </h3>
          </div>

          {/* Navigation */}
          <ul className="nav-links">
            <li>
              <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
            </li>
            <li>
              <Link to="/products" onClick={() => setIsOpen(false)}>Products</Link>
            </li>
            <li>
              <Link to="/aboutus" onClick={() => setIsOpen(false)}>About Us</Link>
            </li>
          </ul>

          {/* Search */}
          <div className="navbar-search">
            <Search className="search-icons" />
            <input
              type="text"
              placeholder="Search for product"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearchSubmit();
                }
              }}
            />
            <button
              className="navbar-search-submit"
              type="button"
              onClick={() => handleSearchSubmit()}
            >
              Search
            </button>
          </div>

          {/* Right Buttons */}
          <div className="button-navbar">

            {/* User Menu */}
            <div className="user-menu" ref={menuRef}>
              <button type="button" onClick={() => setIsOpen(!isOpen)}>
                <UserRound />
              </button>

              {isOpen && (
                <div className="dropdown">
                  {!user ? (
                        <button
                          type="button"
                          className="dropdown-btn"
                          onClick={() => {
                            onLoginClick?.();
                            setIsOpen(false);
                          }}
                        >
                          SignIn & SignUp
                        </button>
                      ) : (
                        <>
                          {user?.role === "admin" ? (
                            <Link
                              to="/admin/dashboard"
                              className="dropdown-btn"
                              onClick={() => setIsOpen(false)}
                            >
                              Dashboard
                            </Link>
                          ) : (
                            <Link
                              to="/profile"
                              className="dropdown-btn"
                              onClick={() => setIsOpen(false)}
                            >
                              Profile
                            </Link>
                          )}

                          <button
                            type="button"
                            className="dropdown-btn"
                            onClick={handleLogout}
                          >
                            Logout
                          </button>
                        </>
                      )}
                </div>
              )}
            </div>

            {/* Cart */}
            <button type="button" onClick={() => navigate("/cart")}>
              <ShoppingCart />
            </button>

          </div>
        </div>
      </nav>
    </header>
  );
};