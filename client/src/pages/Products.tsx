import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Filter,
  Sparkles,
  Award,
  Gem,
  Clock,
  Loader2,
  Search,
  MessageCircle
} from 'lucide-react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const SushmaFashionsProducts = () => {
  const [products, setProducts] = useState([]); 
  const [categories, setCategories] = useState([{ id: 'all', name: 'All Collection' }]); // Dynamic categories
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  
  // Search and Price Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(20000);
  const [maxProductPrice, setMaxProductPrice] = useState(20000); // Store max product price

  // --- FETCH PRODUCTS & DERIVE CATEGORIES FROM DB ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const requestUrl = `${API_URL}/api/products`; 
        const response = await fetch(requestUrl);
        
        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }
        
        const data = await response.json();
        setProducts(data);

        // Find max price from products
        const highestPrice = Math.max(...data.map(item => item.price), 0);
        setMaxProductPrice(highestPrice);
        setMaxPrice(highestPrice); // Set initial max price to highest product price

        // Extract unique categories from the fetched products
        const uniqueCategories = [...new Set(data.map(item => item.category))];
        const formattedCategories = [
          { id: 'all', name: 'All Collection' },
          ...uniqueCategories.filter(cat => cat).map(cat => ({
            id: cat.toLowerCase(),
            name: cat
          }))
        ];
        setCategories(formattedCategories);

      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter Logic: Category + Search + Price
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price <= maxPrice;
    return matchesCategory && matchesSearch && matchesPrice;
  });

  const toggleWishlist = (productId) => {
    setWishlist(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  };

  // WhatsApp Redirect Function
  const handleBuyNow = (product) => {
    const phoneNumber = "9515174064";
    const message = `Hi Iam interested in this product can i know more info.. on this \n\n*Product Name:* ${product.name}\n*Price:* ₹${product.price}\n*Image:* ${product.imageUrl}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/91${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff9f7] to-white font-['Poppins']">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://img.freepik.com/premium-photo/female-clothes-banner_78899-6456.jpg"
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
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span className="text-sm text-gray-600">{products.length} Designs</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span className="text-sm text-gray-600">Handcrafted</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-500" />
              <span className="text-sm text-gray-600">Free Shipping</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter, Search & Dynamic Categories */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-rose-100 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            
            {/* Search */}
            <div className="flex-1">
              <label className="block text-xs font-semibold text-rose-400 uppercase tracking-wider mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-300 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Find your style..."
                  className="w-full pl-10 pr-4 py-3 border-2 border-rose-100 rounded-xl focus:outline-none focus:border-rose-300 focus:ring-4 focus:ring-rose-50 bg-white placeholder:text-rose-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Price Range */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-rose-400 uppercase tracking-wider">Price</label>
                <span className="text-sm font-bold text-rose-500 bg-rose-50 px-3 py-1 rounded-full">₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min="0"
                max={maxProductPrice}
                step={Math.ceil(maxProductPrice / 40)} // Dynamic step based on max price
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-2 bg-rose-100 rounded-lg appearance-none cursor-pointer accent-rose-400"
              />
              <div className="flex justify-between text-xs text-rose-300 mt-1">
                <span>₹0</span>
                <span>₹{maxProductPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Categories */}
            <div className="flex-1">
              <label className="block text-xs font-semibold text-rose-400 uppercase tracking-wider mb-2">Category</label>
              <select
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
                className="w-full px-4 py-3 border-2 border-rose-100 rounded-xl focus:outline-none focus:border-rose-300 focus:ring-4 focus:ring-rose-50 bg-white text-gray-700"
              >
                <option value="">All Collections</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-['Playfair_Display'] text-3xl font-light text-gray-800">Our Collection</h2>
          <p className="text-gray-500">{filteredProducts.length} items</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-amber-500 mb-4" />
            <p className="text-gray-400">Loading your boutique...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product._id} className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all flex flex-col">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  
                  <button 
                    onClick={() => toggleWishlist(product._id)}
                    className="absolute top-4 right-4 p-2 bg-white/90 rounded-full z-10 shadow-sm"
                  >
                    <Heart className={`w-5 h-5 ${wishlist.includes(product._id) ? 'fill-rose-500 text-rose-500' : 'text-gray-600'}`} />
                  </button>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <div className="mb-4">
                    <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">{product.name}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2 h-10">{product.description}</p>
                    <span className="text-amber-600 font-bold text-xl block mt-2">₹{product.price?.toLocaleString()}</span>
                  </div>
                  
                  {/* WhatsApp Buy Now Button */}
                  <button 
                    onClick={() => handleBuyNow(product)}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition-all shadow-md active:scale-95"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
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

      {/* Footer & Styles */}
      <Footer />
      <style jsx>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 1s ease-out forwards; }
        .animation-delay-200 { animation-delay: 200ms; opacity: 0; }
        .animation-delay-400 { animation-delay: 400ms; opacity: 0; }
      `}</style>
    </div>
  );
};

export default SushmaFashionsProducts;