import { useState } from "react";
import { Upload, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import "./AddProducts.css";
import { createProduct } from "../../../services/productApi";

export const AddProducts = () => {
    const navigate = useNavigate();

     const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
    brand: "",
    image: "",
  });

  const [imagePreview , setImagePreview] = useState("");
    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const data = await createProduct(formData);

        console.log("Created Product:", data);

        toast.success("Product added successfully!");

        navigate("/admin/products");
    } catch (error) {
        console.error(error);

        toast.error(
        error.response?.data?.message ||
        "Failed to add product"
        );
    }
    };
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if(file) {
        const reader = new FileReader();

        reader.onloadend =() => {
            setImagePreview(reader.result);
            setFormData((prev) => ({
              ...prev,
              image: reader.result,
            }));
        };
        reader.readAsDataURL(file);
    }
  }
  return (
    <div className="add-product-container">
        <div className="page-header">
            <h1>Add New Product</h1>
            <p>Create a new product in your inventory</p>
        </div>

        <form onSubmit={handleSubmit} className="product-form">
            {/* Product Information */}
            <div className="form-card">
                <h2>Product Information</h2>

                <div className="form-group">
                    <label>Product Name</label>

                    <input type="text"
                    required
                    placeholder="e.g., Fresh Organic Apples"
                    value={formData.name}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            name: e.target.value,
                        })
                    } 
                    />
                </div>

                {/* Price & Stock */}
                <div className="grid-two">
                    <div className="form-group">
                        <label>Price (₹) *</label>

                        <input type="number"
                        step={0.01}
                        required
                        placeholder="0.00"
                        value={formData.price}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                price: e.target.value,
                            })
                        }
                         />

                
                    <div className="form-group">
                        <label>Stock Quantity *</label>

                        <input type="number"
                        required
                        placeholder="0"
                        value={formData.stock}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                stock: e.target.value,
                            })
                        }
                         />
                    </div>
                </div>

                {/* Category & Brand */}
                <div className="grid-two">
                    <div className="form-group">
                        <label>Category *</label>

                        <select
                        required
                        value={formData.category}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                category: e.target.value,
                            })
                        }
                        >
                            <option value="">Select a category</option>
                            <option value="Fruits">Fruits</option>
                            <option value="Vegetables">Vegetables</option>
                            <option value="Dairy">Dairy</option>
                            <option value="Bakery">Bakery</option>
                            <option value="Beverages">Beverages</option>
                            <option value="Snacks">Snacks</option>
                            <option value="Grocery">Grocery</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Brand</label>

                        <input type="text"
                        placeholder="e.g., FreshMart Organic"
                        value={formData.brand}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                brand: e.target.value
                            })
                        } 
                        />
                    </div>
                </div>
                {/* Description */}
                <div className="form-group">
                    <label>Description *</label>

                    <textarea 
                    rows={4}
                    required
                    placeholder="Describe your product..."
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            description: e.target.value,
                        })
                    }
                    />
                </div>
                </div>

                {/* Image Upload */}
                <div className="form-card">
                    <h2>Product Image</h2>

                    <div className="upload-wrapper">
                        {imagePreview ? (
                            <div className="preview-box">
                                <img src={imagePreview}
                                alt="Preview" className="preview-image" />

                                <button className="remove-btn"
                                type="button"
                                onClick={() => setImagePreview("")}
                                >
                                     <X size={18} />
                                </button>
                            </div>
                        ):(
                            <label className="upload-box">
                                <Upload size={45}/>

                                <span>Click to upload image</span>

                                <small>PNG, JPG up to 10MB</small>

                                <input 
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleImageUpload}
                                />
                            </label>
                        )}
                    </div>
                </div>

                {/* Buttons */}
                <div className="button-group">
                    <button className="ap-submit-btn" type="submit">
                        Add Product
                    </button>

                    <button type="button"
                    className="ap-cancel-btn"
                    onClick={() => navigate("/admin/products")}>
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    </div>
  )
}
