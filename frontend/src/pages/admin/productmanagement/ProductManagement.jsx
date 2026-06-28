import "./ProductManagement.css";
import { useState, useEffect } from "react";
import {
  getAllProducts,
  deleteProduct,
} from "../../../services/productApi.js";
import { Link ,useNavigate } from "react-router-dom";
import { Plus, Search, Edit, Trash2 } from "lucide-react";

export function ProductManagement() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();

      console.log(data);

      setProducts(data.products);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory =
      filterCategory === "all" ||
      product.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (id, name) => {
  const confirmDelete = window.confirm(
      `Are you sure you want to delete "${name}"?`
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      setProducts((prev) =>
        prev.filter((product) => product._id !== id)
      );

      alert("Product deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  const getStockClass = (stock) => {
    if (stock > 100) return "stock-high";
    if (stock > 50) return "stock-medium";
    return "stock-low";
  };
  if (loading) {
  return <h2>Loading Products...</h2>;
}

  return (
    <div className="product-management">
      {/* Header */}
      <div className="header">
        <div>
          <h1>Product Management</h1>
          <p>Manage your product inventory</p>
        </div>

        <Link to="/admin/products/add-products" className="add-btn">
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="filters">
        <div className="search-box">
          <Search className="search-icon" size={18} />

          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
          />
        </div>

        <select
          value={filterCategory}
          onChange={(e) =>
            setFilterCategory(e.target.value)
          }
        >
          <option value="all">All Categories</option>
          <option value="Fruits">Fruits</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Dairy">Dairy</option>
          <option value="Bakery">Bakery</option>
          <option value="Beverages">Beverages</option>
        </select>
      </div>

      {/* Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product._id}>
                <td>
                  <div className="product-info">
                    <img
                      src={product.image || "/placeholder.png"}
                      alt={product.name}
                    />

                    <span>{product.name}</span>
                  </div>
                </td>

                <td>
                  <span className="category-badge">
                    {product.category}
                  </span>
                </td>

                <td className="price">
                  ₹{Number(product.price || 0).toFixed(2)}
                </td>

                <td>
                  <span
                    className={getStockClass(product.stock)}
                  >
                    {product.stock} units
                  </span>
                </td>

                <td>
                  <div className="pm-action-buttons">
                    <button className="edit-btn"   
                    onClick={() => navigate(`/admin/products/edit/${product._id}`)  }>
                      <Edit size={18} />
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(
                          product._id,
                          product.name
                        )
                      }
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredProducts.length === 0 && (
          <div className="empty">
            <p>No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}