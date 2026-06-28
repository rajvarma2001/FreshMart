import { useParams, Link } from "react-router-dom";
import { useState , useEffect} from "react";
import { Star, ShoppingCart, Minus, Plus } from "lucide-react";
import { getProductById } from "../../services/productApi";
import { useCart } from "../../context/CartContext";
import { ProductCard } from "../../component/productcard/ProductCard";
import {
  getProductReviews,
  addReview,
} from "../../services/reviewApi";
import "./ProductDetails.css";

export const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart} = useCart();
  const [quantity, setQuantity] = useState(1);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
  const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const fetchReviews = async () => {
  try {
      const data = await getProductReviews(id);
      setReviews(data.reviews);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login to submit a review");
      return;
    }

    try {
      await addReview({
        product: id,
        rating,
        comment,
      });

      alert("Review added successfully");

      setRating(5);
      setComment("");

      // Refetch both product and reviews to update rating
      const updatedProduct = await getProductById(id);
      setProduct(updatedProduct);

      fetchReviews();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if(!product){
    return(
      <div className="container center">
        <h1>Product Not Found</h1>
        <Link to="/products" className="link">
        BacK to Products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    alert(`${quantity} × ${product.name} added to cart!`);
    setQuantity(1);
  };

  return (
    <div className="container">
      <Link to="/products" className="back-btn"> ← Back to Products</Link>

      <div className="product-detail-grid">
        {/* image */}
        <div className="image-box">
          <img src={product.image} alt={product.name} className="productdetail-image"/>
        </div>

        {/* info */}
        <div className="productdetail-info">
          <span className="category">{product.category}</span>
          <h1>{product.name}</h1>
          

          {/* rating */}
          <div className="rating">
            {[...Array(5)].map((_, i) => (
              <Star
              key={i}
              className={i < Math.floor(product.rating) ? "star filled" : "star"}
              />
            ))}
            <span>
            {product.rating} ({product.numReviews || 0} reviews)
            </span>
          </div>

          {/*price */}
          <div className="price">
            ₹{Number(product.price || 0).toFixed(2)}
            <p>Tax included. Shipping calculated at checkout.</p>
          </div>

          {/* description */}
          <div className="desc">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          {/*quantity */}
          <div className="quantity">
            <h3>Quantity</h3>

            <div className="quantity-row">
            <div className="quantity-box">
              <button onClick={() => setQuantity((qty) => Math.max(1, qty - 1))}>
                <Minus size={18}/>
              </button>

              <span>{quantity}</span>

              <button onClick={() => setQuantity((qty) => qty + 1)}>
                <Plus size={18}/>
              </button>

            </div>
            <div className="total-price">
                Total: ₹{(product.price * quantity).toFixed(2)}
              </div>
            </div>
          </div>

          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            <ShoppingCart size={20} />
            Add to Cart
          </button>

          <div className="extra-info">
            <div>
              <span>SKU:</span>
              <b>FM-{product._id?.slice(-6).toUpperCase()}</b>
            </div>
            <div>    
              <span>Availability:</span>
              <b className="in-stock">In Stock</b>
            </div>
            <div>
              <span>Delivery:</span>
              <b>Same Day Available</b>
            </div>
          </div>
        </div>
      </div>
      {/* review system */}
      <section className="reviews-section">
        <h2>Customer Reviews</h2>

        <form
          className="review-form"
          onSubmit={handleReviewSubmit}
        >
          <div className="rating-select">
            <label>Rating</label>

            <select
              value={rating}
              onChange={(e) =>
                setRating(Number(e.target.value))
              }
            >
              <option value="5">⭐⭐⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="2">⭐⭐</option>
              <option value="1">⭐</option>
            </select>
          </div>

          <textarea
            placeholder="Write your review..."
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
            required
          />

          <button
            type="submit"
            className="submit-review-btn"
          >
            Submit Review
          </button>
        </form>

        <div className="reviews-list">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                className="review-card"
                key={review._id}
              >
                <div className="review-rating">
                  {"⭐".repeat(review.rating)}
                </div>

                <h4>
                  {review.user?.name || "Anonymous"}
                </h4>

                <p>{review.comment}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </section>
      
    </div>
  )
}
