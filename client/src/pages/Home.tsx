import React, { useState, useEffect } from 'react';
import { 
  Heart, Search, ShoppingBag, User, Star, ChevronRight, ChevronLeft, 
  Instagram, Facebook, Twitter, Pinterest, Sparkles, Shield, Truck, 
  RotateCcw, Eye, Clock, Award, Gem, Loader2 
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const BoutiqueHomepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  // States for Backend Products
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- FETCH PRODUCTS FROM BACKEND ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products`);
        if (response.ok) {
          const data = await response.json();
          setFetchedProducts(data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Static Data
  const heroSlides = [
    {
      image: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/2cfd7f137173569.6206471181900.png',
      title: 'Timeless Designer Blouses',
      subtitle: 'Crafted for Elegance and Tradition',
      tagline: 'New Arrivals'
    },
    {
      image: 'https://static.vecteezy.com/system/resources/thumbnails/031/515/012/small_2x/beautiful-girl-in-fashion-wear-free-photo.jpg',
      title: 'Silk & Velvet Collection',
      subtitle: 'Luxury Redefined for Every Occasion',
      tagline: 'Premium Fabrics'
    },
    {
      image: 'https://i.pinimg.com/736x/9e/c5/cd/9ec5cdfe4d18f004394209d1fb0ddebb.jpg',
      title: 'Bridal Collection 2025',
      subtitle: 'Make Your Special Day Unforgettable',
      tagline: 'Exclusive Designs'
    },
    {
      image: 'http://zola.in/cdn/shop/articles/wear_banner_1200x1200.jpg?v=1686815762',
      title: 'Hand-Embroidered Masterpieces',
      subtitle: 'Where Tradition Meets Contemporary Style',
      tagline: 'Artisanal Craft'
    },
  ];

  const trendingStyles = [
    { name: 'Backless Designs', image: 'https://cdn0.weddingwire.in/article/8349/original/960/jpeg/99438-inverted-backless-blouse-design.jpeg', likes: '2.5k' },
    { name: 'High Neck', image:'https://baggout.com/wp-content/uploads/2022/08/Firefox_Screenshot_2022-08-05T09-47-16.594Z.png', likes: '1.8k' },
    { name: 'Cape Style', image: 'https://www.shaadidukaan.com/editor-img/image/dresses/sleeve-blouse/Cap-Sleeve-Blouse-Designs.jpg', likes: '3.2k' },
    { name: 'Boat Neck', image: 'https://stylesatlife.com/wp-content/uploads/2024/03/25-Boat-Neck-Blouse-Designs-We-Are-Totally-Crushing-On.jpg', likes: '2.1k' },
  ];

  const testimonials = [
    { id: 2, name: 'Anita Desai', rating: 5, text: 'The custom design service exceeded my expectations. My wedding blouse was a dream come true.', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', location: 'Delhi' },
    { id: 3, name: 'Meera Patel', rating: 4, text: 'Beautiful fabrics and attention to detail. Will definitely order again.', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', location: 'Bangalore' },
    { id: 4, name: 'Ritu Kapoor', rating: 5, text: 'The quality is unmatched. Every piece feels like wearable art.', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80', location: 'Pune' },
  ];

  const blogPosts = [
    { title: 'How to Choose the Perfect Blouse for Your Saree', image: 'https://www.beautyepic.com/wp-content/uploads/2017/08/6-19.jpg', date: 'Mar 15, 2026', readTime: '5 min read' },
    { title: 'Latest Blouse Neckline Trends for 2026', image: 'https://newsmeter.in/wp-content/uploads/2020/08/Trendy-One-Shoulder-Pattu-Saree-Blouse.jpg', date: 'Mar 10, 2025', readTime: '4 min read' },
    { title: 'A Guide to Different Blouse Fabrics', image: 'https://www.pinkvilla.com/images/2023-07/1690650797_shutterstock_1809513061-2.jpg', date: 'Mar 5, 2026', readTime: '6 min read' },
  ];

  const instagramPosts = [
    { id: 1, image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', likes: 1234, comments: 56 },
    { id: 2, image: 'https://images.unsplash.com/photo-1624104051668-73b2d3e5cb06?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', likes: 2345, comments: 89 },
    { id: 3, image: 'https://images.unsplash.com/photo-1618486019770-78c71c71e029?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', likes: 3456, comments: 102 },
    { id: 4, image: 'https://images.unsplash.com/photo-1622296089863-eb7fc530daa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', likes: 4567, comments: 134 },
    { id: 5, image: 'https://images.unsplash.com/photo-1617627143750-86f36c0b5eb8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', likes: 5678, comments: 156 },
    { id: 6, image: 'https://images.unsplash.com/photo-1617952276316-e8c9c6e1d756?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', likes: 6789, comments: 178 },
    { id: 7, image: 'https://images.unsplash.com/photo-1618354691229-88d47f285158?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', likes: 7890, comments: 190 },
    { id: 8, image: 'https://images.unsplash.com/photo-1624104051668-73b2d3e5cb06?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', likes: 8901, comments: 201 },
  ];

  const styleGuides = [
    { occasion: 'Wedding Guest', image: 'https://viaanadesignerstudio.com/wp-content/uploads/2024/07/aari-work-blouse-designs.png', tip: 'Opt for rich fabrics like silk with subtle embroidery' },
    { occasion: 'Office Wear', image: 'https://i.pinimg.com/736x/85/47/46/8547464a6c7bae90cfd927c91e29ccde.jpg', tip: 'Choose comfortable cottons with elegant cuts' },
    { occasion: 'Party Night', image: 'https://www.beautyepic.com/wp-content/uploads/2017/08/6-21.jpg', tip: 'Go for statement sleeves and back designs' },
    { occasion: 'Festival Special', image: 'https://i.pinimg.com/originals/b2/16/f3/b216f3c1f34313ef176ef10b88bae759.jpg', tip: 'Bright colors with traditional mirror work' },
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff9f7] to-white font-['Poppins']">
      <Navbar />
      
      {/* Hero Carousel */}
      <section className="relative h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
        <div className="relative h-full">
          {heroSlides.map((slide, index) => (
            <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
              <div className="relative h-full">
                <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
                <div className="absolute inset-0 flex items-center">
                  <div className="max-w-7xl mx-auto px-4 w-full text-white">
                    <span className="inline-block px-4 py-2 bg-amber-400/20 backdrop-blur-sm rounded-full text-sm font-light mb-6 animate-fade-in-up">{slide.tagline}</span>
                    <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl font-light mb-4 leading-tight animate-fade-in-up">{slide.title}</h1>
                    <p className="text-xl md:text-2xl mb-8 font-light tracking-wide animate-fade-in-up">{slide.subtitle}</p>
                    <button onClick={() => window.location.href='/products'} className="bg-white text-gray-900 px-8 py-4 rounded-full font-medium hover:bg-amber-50 transition-all">Shop Collection →</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Floating Features Bar */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap justify-between items-center text-sm gap-4">
            <div className="flex items-center gap-2 text-gray-600"><Truck className="w-4 h-4 text-amber-500" /><span>Free Shipping $100+</span></div>
            <div className="flex items-center gap-2 text-gray-600"><RotateCcw className="w-4 h-4 text-amber-500" /><span>Easy Returns</span></div>
            <div className="flex items-center gap-2 text-gray-600"><Shield className="w-4 h-4 text-amber-500" /><span>Secure Checkout</span></div>
            <div className="flex items-center gap-2 text-gray-600"><Clock className="w-4 h-4 text-amber-500" /><span>24/7 Support</span></div>
          </div>
        </div>
      </div>

      {/* Our Collection (4 Items from Backend) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#fff5f0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-amber-500 font-medium tracking-wider text-sm uppercase">Our Collection</span>
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-light text-gray-800 mt-2">Most Loved Designs</h2>
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-amber-500" /></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {fetchedProducts.slice(0, 4).map((product) => (
                <div key={product._id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-x-0 bottom-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/95 p-4">
                      <button onClick={() => window.location.href='/products'} className="w-full bg-gray-900 text-white py-2 rounded-full text-xs font-medium hover:bg-gray-800 flex items-center justify-center gap-2">
                        <Eye className="w-4 h-4" /> View More
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-lg mb-1 line-clamp-1">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-amber-600 font-semibold text-lg">₹{product.price?.toLocaleString()}</span>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <button onClick={() => window.location.href='/products'} className="group border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-900 hover:text-white transition-all">
              View All Products →
            </button>
          </div>
        </div>
      </section>

      {/* Trending Styles Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-center mb-12 font-light text-gray-800">Trending Styles This Week</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trendingStyles.map((style, index) => (
            <div key={index} className="relative group overflow-hidden rounded-2xl">
              <img src={style.image} alt={style.name} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-semibold">{style.name}</h3>
                <div className="flex items-center gap-1 text-sm"><Heart className="w-4 h-4 fill-white" /> {style.likes}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Custom Design Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-amber-50 to-rose-50 rounded-3xl overflow-hidden shadow-xl grid md:grid-cols-2">
          <div className="p-8 md:p-12">
            <span className="text-amber-500 font-medium text-sm tracking-wider uppercase">Bespoke Service</span>
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-light mb-4 text-gray-800">Design Your Dream Blouse</h2>
            <p className="text-gray-600 mb-8 text-lg">Work with our master designers to create a piece that's uniquely yours.</p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3"><Sparkles className="text-amber-600" /> <span className="text-sm font-semibold">Premium Fabrics</span></div>
              <div className="flex items-center gap-3"><Gem className="text-amber-600" /> <span className="text-sm font-semibold">Custom Work</span></div>
            </div>
            <button className="bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-all">Start Your Design →</button>
          </div>
          <img src="https://thechhavi.in/wp-content/uploads/2023/01/Untitled-design-2023-01-31T151755.985.jpg" className="w-full h-96 md:h-full object-cover" alt="Custom" />
        </div>
      </section>

      {/* Complete Your Look Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-amber-500 font-medium text-sm tracking-wider uppercase">Style Inspiration</span>
            <h2 className="font-['Playfair_Display'] text-4xl font-light text-gray-800">Complete Your Look</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {styleGuides.map((guide, index) => (
              <div key={index} className="group">
                <div className="overflow-hidden rounded-2xl mb-4"><img src={guide.image} className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500" /></div>
                <h3 className="font-semibold text-lg">{guide.occasion}</h3>
                <p className="text-gray-500 text-sm">{guide.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#fff5f0]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-['Playfair_Display'] text-4xl font-light text-gray-800 mb-12">Love From Our Customers</h2>
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <img src={testimonials[currentTestimonial].image} className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-amber-100" />
            <p className="text-gray-600 mb-4 italic text-lg">"{testimonials[currentTestimonial].text}"</p>
            <p className="font-semibold">{testimonials[currentTestimonial].name} - {testimonials[currentTestimonial].location}</p>
          </div>
        </div>
      </section>



      {/* The Elara Experience (Why Choose Us) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12"><h2 className="font-['Playfair_Display'] text-4xl font-light text-gray-800">The Elara Experience</h2></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: "✨", title: "Premium Fabrics", desc: "Finest materials sourced globally" },
            { icon: "✂️", title: "Custom Tailoring", desc: "Perfect fit with 3D measurements" },
            { icon: "🪡", title: "Handcrafted Designs", desc: "Crafted by master artisans" },
            { icon: "🚚", title: "Fast Delivery", desc: "Worldwide express shipping" },
          ].map((item, index) => (
            <div key={index} className="text-center p-6 rounded-2xl bg-white border border-gray-50 shadow-sm">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
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

      <Footer />
      
      <style jsx>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 1s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default BoutiqueHomepage;