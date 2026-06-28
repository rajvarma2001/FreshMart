import { Star } from "lucide-react";
import "./Ratingcard.css";

function RatingCard({ rating = 4.9, reviews = 10000, className=""}) {
  return (
    <div className={`rating-card ${className}`}>
      
      {/* Icon */}
      <div className="rating-icon">
        <Star className="star-icon" />
      </div>

      {/* Text */}
      <div className="rating-text">
        <div className="rating-value">{rating} Rating</div>
        <div className="rating-reviews">
          {reviews.toLocaleString()}+ Reviews
        </div>
      </div>

    </div>
  );
}

export default RatingCard;