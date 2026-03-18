import React, { useEffect, useRef, useState } from 'react';
import { 
  Heart, 
  Star, 
  ChevronRight, 
  ChevronLeft,
  Instagram, 
  Facebook, 
  Twitter, 
  MapPin,
  Phone,
  Mail,
  Clock,
  Sparkles,
  Scissors,
  Gem,
  Award,
  Users,
  Shield
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const SushmaFashionsAbout = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const sectionRefs = useRef([]);

  // Add scroll animation observer
  useEffect(() => {
    const observers = sectionRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-fade-in-up');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: 'Anita Sharma',
      location: 'Mumbai',
      rating: 5,
      text: 'The craftsmanship at Sushma Fashions is exceptional. My wedding blouse was a masterpiece that everyone admired!',
      image: 'https://images.unsplash.com/photo-1494790108777-467efef853c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    },
    {
      id: 2,
      name: 'Priya Desai',
      location: 'Delhi',
      rating: 5,
      text: 'I love how they understand exactly what you want. The custom design service is simply amazing!',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    },
    {
      id: 3,
      name: 'Meera Patel',
      location: 'Bangalore',
      rating: 5,
      text: 'The attention to detail and quality of fabrics is unmatched. My go-to place for all special occasions.',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
    }
  ];

  // Gallery images
  const galleryImages = [
    { id: 1, image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', title: 'Bridal Silk Blouse' },
    { id: 2, image: 'https://images.unsplash.com/photo-1624104051668-73b2d3e5cb06?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', title: 'Hand Embroidered' },
    { id: 3, image: 'https://images.unsplash.com/photo-1618486019770-78c71c71e029?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', title: 'Gold Zari Work' },
    { id: 4, image: 'https://images.unsplash.com/photo-1622296089863-eb7fc530daa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', title: 'Contemporary Design' },
    { id: 5, image: 'https://images.unsplash.com/photo-1617627143750-86f36c0b5eb8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', title: 'Traditional Motifs' },
    { id: 6, image: 'https://images.unsplash.com/photo-1617952276316-e8c9c6e1d756?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', title: 'Modern Elegance' }
  ];

  // Features data
  const features = [
    { icon: <Gem className="w-6 h-6" />, title: 'Premium Quality Fabrics', desc: 'Finest silks, cottons, and luxury materials sourced globally' },
    { icon: <Scissors className="w-6 h-6" />, title: 'Custom Tailoring', desc: 'Perfect fit guaranteed with precise measurements' },
    { icon: <Sparkles className="w-6 h-6" />, title: 'Handcrafted Embroidery', desc: 'Intricate handwork by master artisans' },
    { icon: <Heart className="w-6 h-6" />, title: 'Unique Designer Patterns', desc: 'Exclusive designs you won\'t find elsewhere' }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff9f7] to-white font-['Poppins']">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://blogproxy.andaazfashion.com/wp-content/uploads/2019/02/Indian-Ethnic-Fashion.jpg"
            alt="Elegant blouse craftsmanship"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        </div>
        
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="text-white max-w-2xl">
            <span className="inline-block px-4 py-2 bg-amber-400/20 backdrop-blur-sm rounded-full text-sm font-light mb-6 animate-fade-in-up">
              Since 2015
            </span>
            <h1 className="font-['Playfair_Display'] text-5xl md:text-6xl lg:text-7xl font-light mb-4 leading-tight animate-fade-in-up animation-delay-200">
              About Sushma Fashions
            </h1>
            <p className="text-2xl md:text-3xl font-light mb-4 animate-fade-in-up animation-delay-400">
              Where Tradition Meets Modern Elegance
            </p>
            <p className="text-lg md:text-xl opacity-90 max-w-xl animate-fade-in-up animation-delay-600">
              Creating beautiful designer blouses that celebrate the grace of Indian women
            </p>
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

          <section 
        ref={el => sectionRefs.current[3] = el}
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto opacity-0"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 md:order-1">
            <div className="relative z-10">
              <span className="text-amber-500 font-medium tracking-wider text-sm">MEET THE FOUNDER</span>
              <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-light text-gray-800 mt-2 mb-6">
                Sushma
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                "Fashion is not just about clothing; it's about expressing your inner self. Every blouse I design is a labor of love, combining traditional techniques with contemporary aesthetics."
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                With over 15 years of experience in textile design and a deep appreciation for Indian craftsmanship, Sushma has created a space where women can find blouses that make them feel confident and beautiful.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center border-2 border-white">
                    <Award className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center border-2 border-white">
                    <Users className="w-5 h-5 text-rose-600" />
                  </div>
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center border-2 border-white">
                    <Heart className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <span className="text-sm text-gray-500">Award-winning designer</span>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-100 rounded-full -z-10" />
          </div>
          
          <div className="relative order-1 md:order-2">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://image2url.com/r2/default/images/1773594470427-67404d5c-eed2-4adb-888a-605b7272ff91.blob"
                alt="Sushma Agarwal - Founder"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-amber-300 rounded-full -z-10" />
          </div>
        </div>
      </section>


      {/* Vision & Mission Cards */}
      <section 
        ref={el => sectionRefs.current[1] = el}
        className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto opacity-0"
      >
        <div className="grid md:grid-cols-2 gap-8">
          {/* Vision Card */}
          <div className="group bg-gradient-to-br from-amber-50 to-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Heart className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="font-['Playfair_Display'] text-3xl font-light mb-4 text-gray-800">Our Vision</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              To bring timeless elegance to every woman's wardrobe through beautifully crafted blouses that celebrate her unique style and heritage.
            </p>
            <div className="mt-6 w-20 h-1 bg-amber-300 rounded-full" />
          </div>

          {/* Mission Card */}
          <div className="group bg-gradient-to-br from-rose-50 to-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Award className="w-8 h-8 text-rose-600" />
            </div>
            <h3 className="font-['Playfair_Display'] text-3xl font-light mb-4 text-gray-800">Our Mission</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              To provide high-quality custom-designed blouses that blend tradition, comfort, and modern style, ensuring every piece brings joy to our customers.
            </p>
            <div className="mt-6 w-20 h-1 bg-rose-300 rounded-full" />
          </div>
        </div>
      </section>

      {/* What Makes Us Special */}
      <section 
        ref={el => sectionRefs.current[2] = el}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-[#fff5f0] opacity-0"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-amber-500 font-medium tracking-wider text-sm">WHY CHOOSE US</span>
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-light text-gray-800 mt-2">
              What Makes Us Special
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Experience the difference of true craftsmanship and attention to detail
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center"
              >
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-100 to-rose-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform group-hover:rotate-3">
                  <div className="text-amber-600">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

       {/* Our Story Section */}
      <section 
        ref={el => sectionRefs.current[0] = el}
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto opacity-0"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/afc580168797461.6440e48791cf8.jpg"
                alt="Sushma Fashions boutique work"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-100 rounded-full -z-10" />
            <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-amber-200 rounded-full -z-10" />
          </div>
          
          <div className="space-y-6">
            <span className="text-amber-500 font-medium tracking-wider text-sm">OUR STORY</span>
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-light text-gray-800">
              Crafting Dreams in Every Thread
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Sushma Fashions began in 2015 with a simple vision: to create designer blouses that make every woman feel special. What started as a small home-based venture has grown into a beloved boutique, known for our exceptional craftsmanship and attention to detail.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our journey is woven with passion for traditional Indian textiles and contemporary design. Each blouse we create tells a story – of heritage, of artistry, and of the women who wear them with pride.
            </p>
            <div className="flex items-center gap-6 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600">5000+</div>
                <div className="text-sm text-gray-500">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600">8+</div>
                <div className="text-sm text-gray-500">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600">1000+</div>
                <div className="text-sm text-gray-500">Unique Designs</div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Customer Love Section */}
      <section 
        ref={el => sectionRefs.current[5] = el}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-[#fff5f0] opacity-0"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-amber-500 font-medium tracking-wider text-sm">TESTIMONIALS</span>
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-light text-gray-800 mt-2">
              What Our Customers Say
            </h2>
          </div>

          <div className="relative">
            <button 
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all z-10"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all z-10"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>

            <div className="overflow-hidden px-4">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white p-8 rounded-3xl shadow-xl">
                      <div className="flex items-center gap-4 mb-6">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-amber-200"
                        />
                        <div>
                          <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                          <p className="text-gray-500 text-sm">{testimonial.location}</p>
                        </div>
                      </div>
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <p className="text-gray-600 text-lg italic">"{testimonial.text}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'w-8 h-2 bg-amber-400' 
                      : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                  } rounded-full`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-amber-100 via-rose-100 to-amber-100 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-white/20 rounded-full -translate-x-20 -translate-y-20" />
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/20 rounded-full translate-x-20 translate-y-20" />
          
          <div className="relative z-10">
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-light text-gray-800 mb-4">
              Ready to Find Your Perfect Blouse?
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Explore our collection of designer blouses or create your own unique design
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="group bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
                Explore Our Collection
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </button>
              <button className="group border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-full font-medium hover:bg-gray-900 hover:text-white transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
                Design Your Blouse
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

   <Footer />

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
          opacity: 0;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
          opacity: 0;
        }

        .animation-delay-600 {
          animation-delay: 600ms;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default SushmaFashionsAbout;