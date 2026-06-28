import React from 'react'
import { Link } from 'react-router-dom';
import { ArrowRight, Quote, Star } from "lucide-react";
import heroImg from '../../assets/hero-img.jpeg';
import "./home.css";
import RatingCard from "../../component/ratingcard/Ratingcard"
import CategoryGrid from "../../component/CategoryGrid/CategoryGrid";
import { ProductCard } from "../../component/productcard/ProductCard";
import { motion } from "framer-motion";
  import { useState, useEffect } from "react";
export const Home = () => {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();

      setProducts(data.products);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/categories");
      const data = await res.json();

      setCategories(data.categories);
    } catch (error) {
      console.error(error);
    }
  };
  const testimonials = [
          {
            name: "Sarah Johnson",
            role: "Regular Customer",
            text: "FreshMart has completely changed how I shop for groceries. The quality is outstanding and delivery is always on time!",
            rating: 5,
          },
          {
            name: "Michael Chen",
            role: "Food Enthusiast",
            text: "The produce is always fresh and the selection is amazing. I love supporting local farms through FreshMart.",
            rating: 5,
          },
          {
            name: "Emily Davis",
            role: "Busy Mom",
            text: "As a busy mom, FreshMart saves me so much time. The convenience and quality make it worth every penny!",
            rating: 5,
          },
        ];
  return (
    <div className='home-container'>
      <section className="hero-container">
        <div className="hero">
          <div className="hero-left">
            <h2>Fresh Groceries</h2>
            <h2 style={{color : '#22c55e' }}>Delivered Daily</h2>
            <p>Shop from our wide selection of farm-fresh produce, quality dairy, and everyday essentials. Get everything delivered to your doorstep.</p>
            <div className="shopnow-button">
              <Link to="/products" className="shopnow-link">
                <button>Shop Fresh Now <ArrowRight className='arrowright-lucide'/></button>
              </Link>
            </div>
          </div>
        </div>
        <div className="right-right">
          <img src={heroImg} alt="" className="hero-img" />
          <RatingCard rating={4.9} reviews={10000} className="ratingcard" />
        </div>
      </section>

      {/* category section*/}
      <section className="category-section">
        <h2 className='category-title'>Shop by Category</h2>
        <CategoryGrid categories={categories} />
      </section>

      {/*product section*/}
      <section className="product-section">
        <h2 className="product-title-main">Featured Products</h2>
        <p className="product-subtitle-main">Handpicked favorites from our store</p>
        <div className="product-grid">
          {products.slice(0, 3).map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />

            ))}
        </div>
        <div className="product-section-btn">
          <Link to="/products" className="btn-view-all-product">
            View All Products <ArrowRight className='arrowright-product-btn'/>
          </Link>
        </div>
      </section>

      {/*promo-section*/}
      <section className="promo-section">
      <motion.div
        className="promo-banner"
        initial={{ opacity: 0, transform: "scale(0.95)" }}
        whileInView={{ opacity: 1, transform: "scale(1)" }}
        transition={{ duration: 0.5 }}
      >
        {/* Background circles */}
        <div className="promo-circle promo-circle-top"></div>
        <div className="promo-circle promo-circle-bottom"></div>

        <div className="promo-content">
          <div className="promo-badge">Limited Time Offer</div>

          <h2 className="promo-title">
            Get 25% Off Your First Order!
          </h2>

          <p className="promo-text">
            New to FreshMart? Enjoy a special discount on your first purchase.
            Use code: <strong>FRESH25</strong>
          </p>

          <Link to="/products" className="promo-btn">
            <span>Start Shopping</span>
            <ArrowRight className="promo-btn-icon" />
          </Link>
        </div>
      </motion.div>
    </section>

    {/* Testimonials */}
    <section className="testimonials-section">
      <div className="testimonials-header">
        <h2 className="testimonials-title">What Our customer Say</h2>
        <p className="testimonials-subtitle">Join thousands of happy customer</p>
      </div>
      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <motion.div
          key={index}
          initial ={{ opacity:0, y:20}}
          whileInView={{ opacity:1, y:0}}
          viewport={{ once :true}}
          transition={{ duration: 0.4, delay: index * 0.1}}
          className='testimonial-card'>

            <Quote className="testimonial-quote" />

            <p className="testimonial-text">{testimonial.text}</p>

            <div className="testimonial-rating">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star key={i} className="testimonial-star" />
              ))}
            </div>

            <div className="testimonial-user">
              <div className="testimonial-name">
                {testimonial.name}
              </div>
              <div className="testimonial-role">
                {testimonial.role}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
    </div>
  )
}
