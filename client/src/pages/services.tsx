import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  Eye ,
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
  Shield,
  Ruler,
  Palette,
  Feather,
  Thread,
  ShoppingBag,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const SushmaFashionsServices = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentProcess, setCurrentProcess] = useState(0);
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

  // Services data
  const services = [
    {
      id: 1,
      icon: <Scissors className="w-8 h-8" />,
      title: 'Custom Blouse Stitching',
      description: 'Tailor-made blouses designed perfectly according to customer measurements and preferences.',
      features: ['Perfect fit guaranteed', 'Multiple neckline options', 'Free trial fitting'],
      color: 'from-amber-100 to-amber-50'
    },
    {
      id: 2,
      icon: <Gem className="w-8 h-8" />,
      title: 'Bridal Blouse Designing',
      description: 'Elegant and heavily designed blouses for bridal occasions with premium embroidery and detailing.',
      features: ['Heavy embroidery work', 'Premium fabrics', 'Stone & pearl work'],
      color: 'from-rose-100 to-rose-50'
    },
    {
      id: 3,
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Designer Blouse Collection',
      description: 'Ready-made designer blouses with modern and traditional styles for every occasion.',
      features: ['Latest trends', 'Multiple sizes', 'Ready to wear'],
      color: 'from-amber-100 to-amber-50'
    },
    {
      id: 4,
      icon: <Feather className="w-8 h-8" />,
      title: 'Hand Embroidery Work',
      description: 'Intricate handcrafted embroidery including zari, thread work, and stone work.',
      features: ['Zari work', 'Thread embroidery', 'Stone & sequin work'],
      color: 'from-purple-100 to-purple-50'
    },
    {
      id: 5,
      icon: <Ruler className="w-8 h-8" />,
      title: 'Blouse Alterations',
      description: 'Professional alteration services to ensure the perfect fitting for your existing blouses.',
      features: ['Size adjustments', 'Style modifications', 'Quick turnaround'],
      color: 'from-blue-100 to-blue-50'
    },
    {
      id: 6,
      icon: <Palette className="w-8 h-8" />,
      title: 'Fabric Selection Guidance',
      description: 'Assistance in choosing the best fabrics and patterns for your blouse design.',
      features: ['Fabric consultation', 'Pattern suggestions', 'Color matching'],
      color: 'from-green-100 to-green-50'
    }
  ];

  // Process steps
  const processSteps = [
    {
      step: 1,
      title: 'Choose Your Design',
      description: 'Browse our collection or share your inspiration',
      icon: <Heart className="w-6 h-6" />
    },
    {
      step: 2,
      title: 'Share Measurements',
      description: 'Provide your precise measurements for perfect fit',
      icon: <Ruler className="w-6 h-6" />
    },
    {
      step: 3,
      title: 'Select Fabric & Style',
      description: 'Choose from premium fabrics and design elements',
      icon: <Palette className="w-6 h-6" />
    },
    {
      step: 4,
      title: 'Get Your Blouse',
      description: 'Receive your perfectly tailored masterpiece',
      icon: <ShoppingBag className="w-6 h-6" />
    }
  ];



  // Why choose us features
  const features = [
    { icon: <Gem className="w-6 h-6" />, title: 'Premium Quality Fabrics', desc: 'Finest silks, cottons, and luxury materials' },
    { icon: <Scissors className="w-6 h-6" />, title: 'Expert Tailoring', desc: 'Master artisans with years of experience' },
    { icon: <Sparkles className="w-6 h-6" />, title: 'Unique Designer Patterns', desc: 'Exclusive designs you won\'t find elsewhere' },
    { icon: <Heart className="w-6 h-6" />, title: 'Comfortable Fit', desc: 'Perfectly tailored for all-day comfort' },
    { icon: <Eye className="w-6 h-6" />, title: 'Attention to Detail', desc: 'Meticulous craftsmanship in every piece' },
    { icon: <Users className="w-6 h-6" />, title: 'Customer Satisfaction', desc: '5000+ happy customers and counting' }
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: 'Anita Sharma',
      location: 'Mumbai',
      rating: 5,
      text: 'The custom stitching service at Sushma Fashions is exceptional. My bridal blouse was perfect in every way!',
      image: 'https://images.unsplash.com/photo-1494790108777-467efef853c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      service: 'Bridal Blouse'
    },
    {
      id: 2,
      name: 'Priya Desai',
      location: 'Delhi',
      rating: 5,
      text: 'I love their hand embroidery work. The attention to detail is amazing and the fit is always perfect.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      service: 'Hand Embroidery'
    },
    {
      id: 3,
      name: 'Meera Patel',
      location: 'Bangalore',
      rating: 5,
      text: 'Their fabric selection guidance helped me choose the perfect silk for my wedding blouse. Thank you Sushma Fashions!',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      service: 'Fabric Consultation'
    },
    {
      id: 4,
      name: 'Ritu Kapoor',
      location: 'Pune',
      rating: 5,
      text: 'The alteration service is a lifesaver! They fixed my grandmother\'s heirloom blouse perfectly.',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      service: 'Alterations'
    }
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
            src="https://static.vecteezy.com/system/resources/thumbnails/031/515/012/small_2x/beautiful-girl-in-fashion-wear-free-photo.jpg"
            alt="Boutique services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        </div>
        
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="text-white max-w-2xl">
            <span className="inline-block px-4 py-2 bg-amber-400/20 backdrop-blur-sm rounded-full text-sm font-light mb-6 animate-fade-in-up">
              Excellence in Every Stitch
            </span>
            <h1 className="font-['Playfair_Display'] text-5xl md:text-6xl lg:text-7xl font-light mb-4 leading-tight animate-fade-in-up animation-delay-200">
              Our Boutique Services
            </h1>
            <p className="text-xl md:text-2xl font-light mb-8 animate-fade-in-up animation-delay-400">
              Crafting Elegant Blouses with Style and Perfection
            </p>
            <button className="group bg-white text-gray-900 px-8 py-4 rounded-full font-medium hover:bg-amber-50 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 animate-fade-in-up animation-delay-600">
              Explore Our Designs
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Floating Stats Bar */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span className="text-sm text-gray-600">5000+ Happy Clients</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span className="text-sm text-gray-600">8+ Years Experience</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-amber-500" />
              <span className="text-sm text-gray-600">100% Satisfaction</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-amber-500" />
              <span className="text-sm text-gray-600">Handcrafted with Love</span>
            </div>
          </div>
        </div>
      </div>

      {/* Our Boutique Services */}
      <section 
        ref={el => sectionRefs.current[0] = el}
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto opacity-0"
      >
        <div className="text-center mb-12">
          <span className="text-amber-500 font-medium tracking-wider text-sm">WHAT WE OFFER</span>
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-light text-gray-800 mt-2">
            Our Boutique Services
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            From custom stitching to intricate embroidery, we offer complete blouse solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div 
              key={service.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-rose-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <div className="text-amber-600">
                    {service.icon}
                  </div>
                </div>
                
                <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2 text-gray-800">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-4 text-sm">
                  {service.description}
                </p>
                
                <ul className="space-y-2 mb-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-gray-500">
                      <CheckCircle className="w-4 h-4 text-amber-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button className="inline-flex items-center gap-1 text-amber-600 text-sm font-medium group-hover:gap-2 transition-all">
                  Learn More <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Custom Design Process */}
      <section 
        ref={el => sectionRefs.current[1] = el}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-[#fff5f0] opacity-0"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-amber-500 font-medium tracking-wider text-sm">HOW IT WORKS</span>
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-light text-gray-800 mt-2">
              Our Custom Design Process
            </h2>
            <p className="text-gray-500 mt-4">Four simple steps to your perfect blouse</p>
          </div>

          <div className="relative">
            {/* Desktop Process Steps */}
            <div className="hidden md:grid grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={step.step} className="relative">
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-rose-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform mx-auto">
                        <div className="text-amber-600">
                          {step.icon}
                        </div>
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center text-white font-bold">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-center">{step.title}</h3>
                    <p className="text-gray-500 text-sm text-center">{step.description}</p>
                  </div>
                  
                  {/* Connector line */}
                  {index < processSteps.length - 1 && (
                    <div className="absolute top-1/2 -right-4 w-8 h-0.5 bg-amber-200 hidden xl:block" />
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Process Slider */}
            <div className="md:hidden">
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentProcess * 100}%)` }}
                >
                  {processSteps.map((step) => (
                    <div key={step.step} className="w-full flex-shrink-0 px-4">
                      <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-rose-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                          <div className="text-amber-600">
                            {step.icon}
                          </div>
                        </div>
                        <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4">
                          {step.step}
                        </div>
                        <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
                        <p className="text-gray-500">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-center gap-2 mt-6">
                {processSteps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentProcess(index)}
                    className={`transition-all duration-300 ${
                      index === currentProcess 
                        ? 'w-8 h-2 bg-amber-400' 
                        : 'w-2 h-2 bg-gray-300'
                    } rounded-full`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Why Choose Sushma Fashions */}
      <section 
        ref={el => sectionRefs.current[3] = el}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white opacity-0"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-amber-500 font-medium tracking-wider text-sm">WHY US</span>
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-light text-gray-800 mt-2">
              Why Choose Sushma Fashions
            </h2>
            <p className="text-gray-500 mt-4">Experience the difference of true craftsmanship</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-6 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center"
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

      {/* Customer Testimonials */}
      <section 
        ref={el => sectionRefs.current[4] = el}
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
                          <p className="text-xs text-amber-600 mt-1">{testimonial.service}</p>
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-amber-100 via-rose-100 to-amber-100 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-white/20 rounded-full -translate-x-20 -translate-y-20" />
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/20 rounded-full translate-x-20 translate-y-20" />
          
          <div className="relative z-10">
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-light text-gray-800 mb-4">
              Design Your Perfect Blouse with Sushma Fashions
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Whether it's for a wedding, party, or everyday elegance, we create blouses that make you feel special
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="group bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
                View Exclusive Collection
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </button>
              <button className="group border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-full font-medium hover:bg-gray-900 hover:text-white transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
                Book Custom Stitching
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

export default SushmaFashionsServices;