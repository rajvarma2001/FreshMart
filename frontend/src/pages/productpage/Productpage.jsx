import { useState , useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { ProductCard } from "../../component/productcard/ProductCard";
import { Filter, SlidersHorizontalIcon } from "lucide-react";
import { getAllProducts} from "../../services/productApi";
import { getAllCategories } from "../../services/categoryApi";
import "./Productpage.css"

export const Productpage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("popularity");
  const [showFilters, setShowFilters] = useState(false);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const searchParam = new URLSearchParams(location.search).get('search') || '';
 
  useEffect(() => {
  const fetchCategories = async () => {
    try {
          const data = await getAllCategories();

          console.log("Categories:", data);

          setCategories(data.categories || data);
           console.log("Categories Array:", data.categories);

      setCategories(data.categories || data);
        } catch (error) {
          console.log(error);
        }
      };

      fetchCategories();
    }, []);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        console.log(data);

        setProducts(data.products || data);
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false);
      }
    };
    fetchProducts();
    
  },[])

  const filteredProducts = products
    .filter((product) => {
      if (searchParam) {
        const q = searchParam.toLowerCase();
        if (!product.name?.toLowerCase().includes(q)) return false;
      }
      if (selectedCategory !== "All" && product.category !== selectedCategory) return false;
      if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
      if (product.rating < minRating) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
    console.log("Categories State:", categories);

    if (loading) {
      return <h2>Loading Products...</h2>;
    }

  return (
    <div className='product-category'>
      
      <section className="product-header-section">
        <h2>Our Products</h2>
        <p>Browse our fresh selection of quality groceries</p>
      </section>

      <div className="product-layout">
        <aside className="sidebar">
          <div className="filter-box">
            <div className="filter-title">
              <Filter />
              <h2>Filter</h2>
            </div>

            <div className="filter-section">
              <h3>Category</h3>
              {["All", ...categories.map((c) => c.name)].map((cat) => (
                
                <label key={cat}>
                  <input
                    type="radio"
                    checked={selectedCategory === cat}
                    onChange={() => setSelectedCategory(cat)}
                  />
                  {cat}
                </label>
              ))}
            </div>

            <div className="filter-section">
              <h3>price: ₹{priceRange[1]}</h3>
              <input
                type="range"
                min={0}
                max={1000}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
              />
            </div>

            <div className="filter-section">
              <h3>Min Rating</h3>
              {[4, 3, 2, 1, 0].map((r) => (
                <label key={r}>
                  <input
                    type='radio'
                    checked={minRating === r}
                    onChange={() => setMinRating(r)}
                  />
                  {r}+ Stars
                </label>
              ))}
            </div>
          </div>
        </aside>

        <div className="product-main">
          <div className="top-bar">
            <button
              className='filter-btn'
              onClick={() => setShowFilters(!showFilters)}>
              <SlidersHorizontalIcon />Filters
            </button>

            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="popularity">Popularity</option>
              <option value="price-low">Price: Low</option>
              <option value="price-high">Price: High</option>
              <option value="rating">Rating</option>
            </select>
          </div>

          {showFilters && (
            <div className="mobile-filter">
              <h2>Filters</h2>

              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="All">All</option>
                {categories.map((c) => (
                  <option key={c.name} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
          )}

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="empty">
              <p>No product found</p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setPriceRange([0, 20]);
                  setMinRating(0);
                }}
              >
                Clear Filter
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
