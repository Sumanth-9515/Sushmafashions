import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Send,
  Heart,
  Scissors,
  Sparkles,
  Feather,
  Gem,
  Award,
  CheckCircle
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // Handle subscription logic here
      console.log('Subscribed:', email);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  // Quick links
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' }
  ];

  // Services list
  const services = [
    { name: 'Custom Blouse Stitching', icon: <Scissors className="w-4 h-4" /> },
    { name: 'Bridal Blouse Design', icon: <Gem className="w-4 h-4" /> },
    { name: 'Hand Embroidery Work', icon: <Feather className="w-4 h-4" /> },
    { name: 'Designer Blouse Collection', icon: <Sparkles className="w-4 h-4" /> },
    { name: 'Blouse Alterations', icon: <Award className="w-4 h-4" /> }
  ];

  // Social media links
  const socialLinks = [
    { 
      name: 'Instagram', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
        </svg>
      ),
      url: '#',
      color: 'hover:bg-pink-500'
    },
    { 
      name: 'Facebook', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
        </svg>
      ),
      url: '#',
      color: 'hover:bg-blue-600'
    },
    { 
      name: 'WhatsApp', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      ),
      url: '#',
      color: 'hover:bg-green-500'
    },
    { 
      name: 'Pinterest', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.174.271-.402.163-1.5-.698-2.438-2.888-2.438-4.649 0-3.788 2.748-7.268 7.94-7.268 4.167 0 7.413 2.972 7.413 6.945 0 4.143-2.612 7.478-6.234 7.478-1.216 0-2.361-.632-2.756-1.382 0 0-.603 2.299-.748 2.863-.271 1.043-1.002 2.349-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.627 0 11.985-5.373 11.985-11.987C23.999 5.367 18.641 0 12.017 0z" />
        </svg>
      ),
      url: '#',
      color: 'hover:bg-red-600'
    }
  ];

  return (
    <footer className="bg-gradient-to-b from-[#fff9f7] to-white font-['Poppins'] border-t border-gray-100">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Boutique Information */}
          <div className="space-y-4">
            <Link to="/" className="inline-block group">
              <h3 className="font-['Playfair_Display'] text-2xl font-light text-gray-800">
                Sushma<span className="text-amber-600"> Fashions</span>
              </h3>
              <span className="block w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300" />
            </Link>
            
            <p className="text-gray-500 text-sm leading-relaxed">
              Sushma Fashions specializes in beautifully designed women's blouses crafted with elegance, tradition, and modern style.
            </p>
            
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className={`w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 transition-all duration-300 hover:text-white ${social.color} hover:scale-110`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Awards/Badges */}
            <div className="flex items-center gap-2 pt-2">
              <div className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full">
                <Award className="w-3 h-3" />
                <span>Premium Quality</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-rose-600 bg-rose-50 px-3 py-1.5 rounded-full">
                <CheckCircle className="w-3 h-3" />
                <span>Trusted Since 2015</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-['Playfair_Display'] text-lg font-light text-gray-800 relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-amber-400" />
            </h4>
            
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-500 hover:text-amber-600 transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div className="space-y-4">
            <h4 className="font-['Playfair_Display'] text-lg font-light text-gray-800 relative inline-block">
              Our Services
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-amber-400" />
            </h4>
            
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    to="/services"
                    className="text-gray-500 hover:text-amber-600 transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="text-amber-400 group-hover:translate-x-1 transition-transform">
                      {service.icon}
                    </span>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="font-['Playfair_Display'] text-lg font-light text-gray-800 relative inline-block">
              Contact Us
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-amber-400" />
            </h4>
            
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-500 text-sm">
                <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <span>Hasanparthy 
Police station back side 
Near Saini gardens 
Fortune residency apartment 
5 floor 503</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500 text-sm group">
                <Phone className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <a href="tel:+919553791179" className="hover:text-amber-600 transition-colors">
                  +91 95537 91179
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-500 text-sm group">
                <Mail className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <a href="mailto:hello@sushmafashions.com" className="hover:text-amber-600 transition-colors">
                  hello@sushmafashions.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-500 text-sm">
                <Clock className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p>Monday – Saturday</p>
                  <p className="font-medium text-gray-700">10:00 AM – 8:00 PM</p>
                </div>
              </li>
            </ul>

            {/* Decorative element */}
            <div className="pt-2">
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                <span className="text-xs text-gray-400">We love our customers</span>
              </div>
            </div>
          </div>
        </div>


      </div>

      {/* Bottom Footer Bar */}
      <div className="border-t border-gray-100 bg-[#fff5f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-sm text-gray-500 order-2 md:order-1">
              © 2026 Sushma Fashions. All Rights Reserved.
            </div>

            {/* Bottom Links */}
            <div className="flex items-center gap-6 order-1 md:order-2">
              <Link 
                to="/privacy" 
                className="text-sm text-gray-500 hover:text-amber-600 transition-colors"
              >
                Privacy Policy
              </Link>
              <span className="text-gray-300">|</span>
              <Link 
                to="/terms" 
                className="text-sm text-gray-500 hover:text-amber-600 transition-colors"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;