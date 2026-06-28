import { Link } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { toast } from "sonner";
import "./ProductCard.css";

export function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault(); // prevent navigation
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <Link to={`/products/${product._id}`} className="product-card-link">
      <article className="product-card">

        {/* Image */}
        <div className="product-card__image-wrapper">
          <img
            src={product.image}
            alt={product.name}
            className="product-card__image"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="product-card__content">

          {/* Rating */}
          <div className="product-card__rating">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={`star ${
                  index < Math.floor(product.rating) ? "star--filled" : "star--empty"
                }`}
              />
            ))}
            <span className="product-card__rating-text">
              ({product.rating || 0})
            </span>
              <span className="product-card__review-count">
                ({product.numReviews || 0} reviews)
              </span>
          </div>

          {/* Title */}
          <h3 className="product-card__title">
            {product.name}
          </h3>

          {/* Footer */}
          <div className="product-card__footer">
            <span className="product-card__price">
              ₹{Number(product.price || 0).toFixed(2)}
            </span>

            <button
              className="product-card__btn"
              onClick={handleAddToCart}
              aria-label="Add to cart"
            >
              <ShoppingCart className="product-card__icon" />
            </button>
          </div>

        </div>
      </article>
    </Link>
  );
}