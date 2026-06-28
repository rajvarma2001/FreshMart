import React from 'react'
import { Heart, Leaf, Truck, Shield, Mail, Phone, MapPin } from "lucide-react";
import abboutstory from "../../assets/about-story.jpeg";
import "./Aboutus.css"

export const Aboutus = () => {
     const values = [
    {
      icon: Leaf,
      title: "Fresh & Organic",
      description:
        "We source the freshest organic produce directly from local farms, ensuring quality and sustainability.",
    },
    {
      icon: Heart,
      title: "Customer First",
      description:
        "Your satisfaction is our priority. We're committed to providing exceptional service and quality products.",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description:
        "Same-day delivery available with our efficient logistics network. Fresh groceries at your doorstep.",
    },
    {
      icon: Shield,
      title: "Quality Guaranteed",
      description:
        "100% satisfaction guarantee. If you're not happy, we'll make it right with our hassle-free return policy.",
    },
  ];

  return (
    <div className='about-container'>
        {/*About-hero-sectiom*/}
        <section className="about-hero-section">
            <h1>About FreshMart</h1>
            <p>Your trusted partner for fresh, quality groceries delivered with care since 2026</p>
        </section>

        {/*story-section*/}
        <section className="story-section">
            <div className="story-text">
                <h2>Our Story</h2>
                <p>FreshMart was founded in 2020 with a simple mission: to make fresh, quality groceries accessible to everyone. We started as a small local delivery service, partnering with nearby farms and suppliers who shared our commitment to quality and sustainability.</p>
                <p>Today, we've grown to serve thousands of happy customers across the region, but our core values remain the same. We believe in supporting local farmers, reducing food waste, and providing our customers with the freshest products possible.</p>
                <p>Every item in our catalog is carefully selected and inspected to meet our high standards. We work directly with farmers and suppliers to ensure fair prices, sustainable practices, and exceptional quality from farm to table.</p>
            </div>
            
            <div className="story-img">
                <img src={abboutstory} alt="about-story" />
            
            <div className="experience-box">
                <h2>6+ Years</h2>
                <p>Serving Fresh Groceries</p>
            </div>
            </div>
        </section>

        {/*Mission-section*/}
        <section className="mission-section">
            <h2>Our Mission</h2>
            <div className="mission-sub">
                <p>We're committed to revolutionizing the grocery shopping experience by combining convenience, quality, and sustainability.</p>
            </div>

            <div className="mission-grids">
                {values.map((value,index) =>{
                    const Icon = value.icon;
                    return(
                        <div className="card" key={index}>
                            <div className="icon-box">
                                <Icon/>
                            </div>
                            <h2>{value.title}</h2>
                            <p>{value.description}</p>
                        </div>
                    );
                })}
            </div>
        </section>

        {/*stats*/}
        <section className="stats">
            <div>
                <h3>10K+</h3>
                <p>Happy Customers</p>
            </div>
            <div>
                <h3>50+</h3>
                <p>Local Farm Partners</p>
            </div>
            <div>
                <h3>500+</h3>
                <p>Products Available</p>
            </div>
            <div>
                <h3>99%</h3>
                <p>Satisfaction Rate</p>
            </div>
      </section>

      {/* Contact */}
      <section className="contact">
        <h2>Get in Touch</h2>
        <p>Have questions? We'd love to hear from you.</p>

        <div className="contact-grid">
          <div>
            <Mail />
            <h3>Email</h3>
            <a href="mailto:hello@freshmart.com">hello@freshmart.com</a>
          </div>

          <div>
            <Phone />
            <h3>Phone</h3>
            <a href="tel:+15551234567">(555) 123-4567</a>
          </div>

          <div>
            <MapPin />
            <h3>Address</h3>
            <p>123 Market Street, NY</p>
          </div>
        </div>
      </section>

    </div>
  )
}

