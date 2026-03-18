import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Send,
  X,
  Instagram, 
  Facebook, 
  Twitter,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  AlertCircle,
  Calendar,
  Heart
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Define API URL
const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";


const SushmaFashionsContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Added for backend sync
  const [activeFaq, setActiveFaq] = useState(null);
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

  // Contact information
  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      label: 'Phone Number',
      value: '+91 98765 43210',
      subvalue: 'Mon-Sat, 10AM - 8PM',
      action: 'tel:+919876543210',
      color: 'from-green-100 to-green-50'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      label: 'Email Address',
      value: 'hello@sushmafashions.com',
      subvalue: 'We reply within 24 hours',
      action: 'mailto:hello@sushmafashions.com',
      color: 'from-blue-100 to-blue-50'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: 'Boutique Address',
      value: '123 Fashion Street, Andheri West',
      subvalue: 'Mumbai, Maharashtra 400053',
      action: 'https://maps.google.com/?q=123+Fashion+Street+Mumbai',
      color: 'from-amber-100 to-amber-50'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      label: 'Working Hours',
      value: 'Monday – Saturday',
      subvalue: '10:00 AM – 8:00 PM',
      color: 'from-rose-100 to-rose-50'
    }
  ];

  // Social media links
  const socialLinks = [
    { icon: <Instagram className="w-5 h-5" />, name: 'Instagram', url: '#', color: 'hover:bg-pink-500' },
    { icon: <Facebook className="w-5 h-5" />, name: 'Facebook', url: '#', color: 'hover:bg-blue-600' },
    { icon: <MessageCircle className="w-5 h-5" />, name: 'WhatsApp', url: '#', color: 'hover:bg-green-500' },
    { icon: <Twitter className="w-5 h-5" />, name: 'Twitter', url: '#', color: 'hover:bg-blue-400' }
  ];

  // FAQ data
  const faqs = [
    {
      question: 'How long does custom blouse stitching take?',
      answer: 'Typically, custom blouse stitching takes 7-10 business days. For intricate bridal designs with heavy embroidery, it may take 12-15 days. We recommend placing your order at least 3 weeks before your event.',
      icon: <Clock className="w-5 h-5" />
    },
    {
      question: 'Do you offer bridal blouse designs?',
      answer: 'Yes! We specialize in bridal blouses with heavy embroidery, stone work, and traditional designs. Our bridal collection includes everything from classic red silks to contemporary pastel designs.',
      icon: <Heart className="w-5 h-5" />
    },
    {
      question: 'Can I order a custom blouse online?',
      answer: 'Absolutely! We offer online consultation and ordering. You can share your measurements, design preferences, and fabric choices through our website or WhatsApp. We\'ll guide you through the entire process.',
      icon: <MessageCircle className="w-5 h-5" />
    },
    {
      question: 'Do you provide blouse alterations?',
      answer: 'Yes, we offer professional alteration services for blouses. Whether it\'s resizing, style modifications, or repairs, our expert tailors can help. Please visit our boutique for measurements.',
      icon: <Phone className="w-5 h-5" />
    }
  ];

  // Form validation
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      errors.phone = 'Phone number must be 10 digits';
    }
    
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }
    
    return errors;
  };

  // UPDATED: Logic to send to backend

// ... inside the component ...
const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      try {
        // FIXED URL: Added /api prefix to match your server.js
        const response = await fetch(`${API_URL}/api/contacts`, { 
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setFormSubmitted(true);
          setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
          setTimeout(() => setFormSubmitted(false), 5000);
        } else {
          const data = await response.json();
          alert(data.message || "Something went wrong");
        }
      } catch (error) {
        console.error("Connection Error:", error);
        alert("Failed to connect to server. Check if backend is running.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setFormErrors(errors);
    }
};

  const handleClear = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    setFormErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff9f7] to-white font-['Poppins']">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://static.vecteezy.com/system/resources/previews/005/263/636/non_2x/contact-us-concept-icons-such-as-mobile-phone-e-mail-address-chat-global-communication-on-dark-blue-background-for-presentation-web-banner-article-business-and-network-connection-and-company-free-vector.jpg"
            alt="Sushma Fashions boutique"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        </div>
        
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="text-white max-w-2xl">
            <span className="inline-block px-4 py-2 bg-amber-400/20 backdrop-blur-sm rounded-full text-sm font-light mb-6 animate-fade-in-up">
              We'd Love to Hear From You
            </span>
            <h1 className="font-['Playfair_Display'] text-5xl md:text-6xl lg:text-7xl font-light mb-4 leading-tight animate-fade-in-up animation-delay-200">
              Get in Touch with Sushma Fashions
            </h1>
            <p className="text-xl md:text-2xl font-light mb-8 animate-fade-in-up animation-delay-400">
              We are here to help you design your perfect blouse
            </p>
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Contact Information Section */}
      <section 
        ref={el => sectionRefs.current[0] = el}
        className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto opacity-0"
      >
        <div className="text-center mb-12">
          <span className="text-amber-500 font-medium tracking-wider text-sm">REACH OUT TO US</span>
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-light text-gray-800 mt-2">
            Contact Information
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            We're here to assist you with all your designer blouse needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => (
            <div 
              key={index}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${info.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <div className="text-amber-600">
                  {info.icon}
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-1">{info.label}</p>
              {info.action ? (
                <a 
                  href={info.action}
                  className="font-semibold text-gray-800 hover:text-amber-600 transition-colors block"
                >
                  {info.value}
                </a>
              ) : (
                <p className="font-semibold text-gray-800">{info.value}</p>
              )}
              <p className="text-sm text-gray-500 mt-2">{info.subvalue}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form and Map Section */}
      <section 
        ref={el => sectionRefs.current[1] = el}
        className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto opacity-0"
      >
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h3 className="font-['Playfair_Display'] text-3xl font-light text-gray-800 mb-2">
              Send Us a Message
            </h3>
            <p className="text-gray-500 mb-6">
              Fill out the form below and we'll get back to you within 24 hours
            </p>

            {formSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h4 className="font-semibold text-xl text-gray-800 mb-2">Message Sent Successfully!</h4>
                <p className="text-gray-600">Thank you for reaching out. We'll respond to your inquiry shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      disabled={isSubmitting}
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        formErrors.name ? 'border-red-300' : 'border-gray-200'
                      } focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors`}
                      placeholder="Enter your full name"
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {formErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      disabled={isSubmitting}
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        formErrors.email ? 'border-red-300' : 'border-gray-200'
                      } focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors`}
                      placeholder="Enter your email"
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {formErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    disabled={isSubmitting}
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      formErrors.phone ? 'border-red-300' : 'border-gray-200'
                    } focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors`}
                    placeholder="Enter 10-digit mobile number"
                  />
                  {formErrors.phone && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {formErrors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    disabled={isSubmitting}
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      formErrors.subject ? 'border-red-300' : 'border-gray-200'
                    } focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors`}
                    placeholder="What is this regarding?"
                  />
                  {formErrors.subject && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {formErrors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                  <textarea
                    name="message"
                    disabled={isSubmitting}
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className={`w-full px-4 py-3 rounded-xl border ${
                      formErrors.message ? 'border-red-300' : 'border-gray-200'
                    } focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors resize-none`}
                    placeholder="Tell us about your requirements..."
                  />
                  {formErrors.message && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {formErrors.message}
                    </p>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2 disabled:bg-gray-400"
                  >
                    <Send className="w-4 h-4" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                  <button
                    type="button"
                    onClick={handleClear}
                    disabled={isSubmitting}
                    className="px-6 py-3 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Clear
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Google Map */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h3 className="font-['Playfair_Display'] text-2xl font-light text-gray-800 mb-4">
                Visit Our Boutique
              </h3>
              <div className="aspect-video rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.747373958797!2d72.836944!3d19.113611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9c0a0a0a0a0%3A0x0!2zMTnCsDA2JzQ5LjAiTiA3MsKwNTAnMTMuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Sushma Fashions Location"
                  className="w-full h-full"
                />
              </div>
              <div className="mt-4 flex items-start gap-2 text-gray-600">
                <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                <p className="text-sm">
                  <span className="font-semibold">Sushma Fashions</span><br />
                  123 Fashion Street, Andheri West, Mumbai - 400053
                </p>
              </div>
            </div>

            {/* Social Media Section */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h3 className="font-['Playfair_Display'] text-2xl font-light text-gray-800 mb-4">
                Connect With Us
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                Follow us on social media for latest updates and design inspiration
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className={`w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center ${social.color} hover:text-white transition-all duration-300 hover:scale-110`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Inquiry / Appointment Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-amber-100 via-rose-100 to-amber-100 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-40 h-40 bg-white/20 rounded-full -translate-x-20 -translate-y-20" />
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/20 rounded-full translate-x-20 translate-y-20" />
          
          <div className="relative z-10">
            <Calendar className="w-16 h-16 text-amber-600 mx-auto mb-6" />
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-light text-gray-800 mb-4">
              Need a Custom Designer Blouse?
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Book a personal consultation with our designers to create your dream blouse
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="group bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
                Book Appointment
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </button>
              <button className="group border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-full font-medium hover:bg-gray-900 hover:text-white transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
                Explore Collection
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section 
        ref={el => sectionRefs.current[2] = el}
        className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto opacity-0"
      >
        <div className="text-center mb-12">
          <span className="text-amber-500 font-medium tracking-wider text-sm">FREQUENTLY ASKED QUESTIONS</span>
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-light text-gray-800 mt-2">
            Have Questions?
          </h2>
          <p className="text-gray-500 mt-4">Find answers to common queries about our services</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                    {faq.icon}
                  </div>
                  <span className="font-medium text-gray-800">{faq.question}</span>
                </div>
                {activeFaq === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  activeFaq === index ? 'max-h-48 pb-4' : 'max-h-0'
                }`}
              >
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </div>
            </div>
          ))}
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

export default SushmaFashionsContact;