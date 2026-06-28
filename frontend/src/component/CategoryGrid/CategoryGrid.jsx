import React from "react";
import { Link } from "react-router-dom";
import "./CategoryGrid.css";

const CategoryGrid = ({ categories }) => {
  console.log(categories);
  return (
    <div className="category-grid">
      {categories.map((category, index) => (
        <div className="category-card-wrapper" key={category.name}>
          
          <Link
            to={`/products?category=${category.name}`}
            className="category-card"
          >
            
            {/* Icon or Image Circle */}
            <div
              className="category-icon"
              style={{ backgroundColor: category.color }}
            >
              {category.image ? (
                <img
                  src={
                    category.image.startsWith("http")
                      ? category.image
                      : `http://localhost:5000/${category.image}`
                  }
                  alt={category.name}
                  className="category-img"
                />
              ) : (
                category.icon
              )}
            </div>

            {/* Name */}
            <h3 className="category-name">{category.name}</h3>

          </Link>

        </div>
      ))}
    </div>
  );
};

export default CategoryGrid;