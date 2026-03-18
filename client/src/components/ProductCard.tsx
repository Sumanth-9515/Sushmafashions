import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Star, 
  ChevronRight, 
  ChevronLeft,
  Eye,
  ShoppingBag,
  Filter,
  X,
  Sparkles,
  Award,
  Gem,
  Clock,
  TrendingUp,
  Loader2
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const SushmaFashionsProducts = () => {
  const [products, setProducts] = useState([]); // Dynamic products from DB
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Categories data - Hardcoded for UI filtering
  const categories = [
    { id: 'all', name: 'All Collection' },
    { id: 'Bridal', name: 'Bridal' },
    { id: 'Party', name: 'Party Wear' },
    { id: 'Silk', name: 'Silk Collection' },
    { id: 'Designer', name: 'Designer' },
  ];

  const fabrics = ['All', 'Silk', 'Velvet', 'Cotton', 'Georgette', 'Chiffon', 'Brocade'];

  // --- FETCH PRODUCTS FROM BACKEND ---
useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Construct the full URL clearly
        const requestUrl = `${API_URL}/api/products`; 
        console.log("Fetching from:", requestUrl); // Look at your console to verify this URL

        const response = await fetch(requestUrl);
        
        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }
        
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter products based on selected category (case-insensitive)
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());

  // Use a slice of real products for the "Customer Favorites" slider
  const bestSellers = products.slice(0, 6);

  const toggleWishlist = (productId) => {
    setWishlist(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  };

  // Featured product (Taking the first one from DB or a fallback)
  const featuredProduct = products[0] || {
    name: 'Loading Featured...',
    description: 'Our finest selection is being prepared for you.',
    price: 0,
    imageUrl: ''
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff9f7] to-white font-['Poppins']">
      
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Exclusive blouse collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
        </div>
        
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="text-white max-w-2xl">
            <span className="inline-block px-4 py-2 bg-amber-400/20 backdrop-blur-sm rounded-full text-sm font-light mb-6 animate-fade-in-up">
              Exclusive Collection 2025
            </span>
            <h1 className="font-['Playfair_Display'] text-5xl md:text-6xl lg:text-7xl font-light mb-4 leading-tight animate-fade-in-up animation-delay-200">
              Exclusive Blouse Collection
            </h1>
            <p className="text-xl md:text-2xl font-light mb-8 animate-fade-in-up animation-delay-400">
              Handcrafted Elegance for Every Occasion
            </p>
            <button className="group bg-white text-gray-900 px-8 py-4 rounded-full font-medium hover:bg-amber-50 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 animate-fade-in-up animation-delay-600">
              Shop Now
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Floating Stats Bar */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span className="text-sm text-gray-600">{products.length} Exclusive Designs</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span className="text-sm text-gray-600">Handcrafted in India</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-500" />
              <span className="text-sm text-gray-600">Free Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <Gem className="w-5 h-5 text-amber-500" />
              <span className="text-sm text-gray-600">Premium Quality</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Category Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden w-full mb-4 flex items-center justify-center gap-2 bg-amber-50 text-gray-800 px-4 py-3 rounded-full"
        >
          <Filter className="w-5 h-5" />
          Filter Products
        </button>

        <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 mb-3">CATEGORIES</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-amber-400 text-gray-900 shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-amber-50'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-gray-200">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-500">Fabric:</span>
              <div className="flex flex-wrap gap-2">
                {fabrics.map((fabric) => (
                  <button key={fabric} className="px-4 py-1.5 rounded-full text-xs bg-white border border-gray-200 hover:border-amber-400 transition-colors">
                    {fabric}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-500">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-amber-400"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Product Highlight */}
      {!loading && products.length > 0 && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-amber-50 via-rose-50 to-amber-50 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-6 h-6 text-amber-600" />
                  <span className="text-amber-600 font-medium tracking-wider">DESIGNER'S PICK</span>
                </div>
                <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-light text-gray-800 mb-4">{featuredProduct.name}</h2>
                <p className="text-gray-600 mb-6 text-lg">{featuredProduct.description}</p>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-3xl font-light text-gray-800">₹{featuredProduct.price?.toLocaleString()}</span>
                  <span className="bg-rose-500 text-white px-3 py-1 rounded-full text-sm">Save 20%</span>
                </div>
                <button className="group bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1">
                  Shop Designer Piece <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
              <div className="relative">
                <img src={featuredProduct.imageUrl} alt={featuredProduct.name} className="w-full h-[400px] object-cover rounded-2xl shadow-2xl" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Product Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-light text-gray-800">Our Collection</h2>
          <p className="text-gray-500">{filteredProducts.length} designs found</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-amber-500 mb-4" />
            <p className="text-gray-400">Fetching the latest collection...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div 
                key={product._id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                onMouseEnter={() => setHoveredProduct(product._id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="relative overflow-hidden">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110" />
                  
                  {product.stock <= 5 && product.stock > 0 && (
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium z-10 bg-amber-400 text-gray-900">
                      Only {product.stock} Left
                    </span>
                  )}

                  <button 
                    onClick={() => toggleWishlist(product._id)}
                    className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-rose-50 transition-colors z-10"
                  >
                    <Heart className={`w-5 h-5 ${wishlist.includes(product._id) ? 'fill-rose-500 text-rose-500' : 'text-gray-600'}`} />
                  </button>

                  <div className={`absolute inset-x-0 bottom-0 transform transition-transform duration-300 ${hoveredProduct === product._id ? 'translate-y-0' : 'translate-y-full'}`}>
                    <div className="bg-white/95 backdrop-blur-sm p-4 flex gap-2">
                      <button className="flex-1 flex items-center justify-center gap-1 bg-amber-50 text-gray-800 py-2 rounded-full text-sm font-medium hover:bg-amber-100 transition-colors">
                        <Eye className="w-4 h-4" /> View
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-1 bg-gray-900 text-white py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                        <ShoppingBag className="w-4 h-4" /> Add
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-2 line-clamp-1">{product.description}</p>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-amber-600 font-semibold text-lg">₹{product.price?.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < 4 ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">(4.5)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Customer Favorites Slider */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#fff5f0]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-amber-500 font-medium tracking-wider text-sm">TRENDING NOW</span>
              <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-light text-gray-800 mt-2">Customer Favorites</h2>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))} className="p-2 bg-white rounded-full shadow-md"><ChevronLeft className="w-5 h-5" /></button>
              <button onClick={() => setCurrentSlide(currentSlide + 1)} className="p-2 bg-white rounded-full shadow-md"><ChevronRight className="w-5 h-5" /></button>
            </div>
          </div>

          <div className="overflow-hidden">
            <div className="flex gap-6 transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 33.333}%)` }}>
              {bestSellers.map((product) => (
                <div key={product._id} className="min-w-[calc(33.333%-16px)] flex-shrink-0">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover" />
                    <div className="p-4">
                      <h3 className="font-semibold mb-1 truncate">{product.name}</h3>
                      <span className="text-amber-600 font-medium">₹{product.price?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Custom Design CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-amber-100 to-rose-100 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="relative z-10">
            <Gem className="w-16 h-16 text-amber-600 mx-auto mb-6" />
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-light text-gray-800 mb-4">Looking for a Custom Design?</h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">Work with our master designers to create a unique piece that perfectly matches your vision</p>
            <button className="group bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-all duration-300">
              Design Your Boutique Piece <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 1s ease-out forwards; }
        .animation-delay-200 { animation-delay: 200ms; opacity: 0; }
        .animation-delay-400 { animation-delay: 400ms; opacity: 0; }
        .animation-delay-600 { animation-delay: 600ms; opacity: 0; }
      `}</style>
    </div>
  );
};

export default SushmaFashionsProducts;