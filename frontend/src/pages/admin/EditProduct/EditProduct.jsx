import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById,  updateProduct, } from "../../../services/productApi";
import "./EditProduct.css";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const data = await getProductById(id);

      setFormData({
        name: data.name || "",
        price: data.price || "",
        category: data.category || "",
        stock: data.stock || "",
        description: data.description || "",
        image: data.image || "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await updateProduct(id, formData);

      alert(data.message);

      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Update failed");
    }
  };

  if (loading) {
    return <h2>Loading Product...</h2>;
  }

  return (
    <div className="edit-product-container">
      <h2>Edit Product</h2>

      <form onSubmit={handleSubmit} className="edit-product-form">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          rows="5"
          value={formData.description}
          onChange={handleChange}
        />
        <div className="editproduct-btn">
            <button type="submit" className="editproduct-submit">
            Update Product
            </button>
            <button type="cancel" className="editproduct-cancel">
            Cancel
            </button>
        </div>
      </form>
    </div>
  );
}