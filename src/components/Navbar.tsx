import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const containerRef = useKeyboardNavigation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { title: 'Home', href: '#home' },
    { title: 'Sobre', href: '#about' },
    { title: 'Serviços', href: '#services' },
    { title: 'Portfólio', href: '#portfolio' },
    { title: 'Depoimentos', href: '#testimonials' },
    { title: 'Contato', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-epystemy-black/90 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-5'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <a 
            href="#" 
            className="flex items-center space-x-2"
            aria-label="Epystemy Home"
          >
            <svg 
              width="40" 
              height="40" 
              viewBox="0 0 40 40" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle cx="20" cy="20" r="18" stroke="white" strokeWidth="2" />
              <path d="M12 14L20 10L28 14L28 26L20 30L12 26L12 14Z" stroke="white" strokeWidth="2" />
              <line x1="20" y1="10" x2="20" y2="30" stroke="white" strokeWidth="2" />
              <line x1="12" y1="20" x2="28" y2="20" stroke="white" strokeWidth="2" />
            </svg>
            <span className="text-xl font-serif font-semibold">Epystemy</span>
          </a>

          {/* Desktop Navigation */}
          <div 
            className="hidden md:flex items-center space-x-8"
            ref={containerRef}
          >
            {navLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                className="text-sm font-medium hover:text-epystemy-gray transition-colors focus:outline-none focus:ring-2 focus:ring-epystemy-white focus:ring-offset-2 focus:ring-offset-epystemy-black"
                aria-current={link.href === window.location.hash ? 'page' : undefined}
              >
                {link.title}
              </a>
            ))}
            <a
              href="#contact"
              className="neon-button px-4 py-2 border border-epystemy-white text-sm font-medium transition-all hover:border-epystemy-gray focus:outline-none focus:ring-2 focus:ring-epystemy-white focus:ring-offset-2 focus:ring-offset-epystemy-black"
            >
              Solicite um Orçamento
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-epystemy-white focus:outline-none focus:ring-2 focus:ring-epystemy-white focus:ring-offset-2 focus:ring-offset-epystemy-black"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-epystemy-black/95 backdrop-blur-md px-4 pb-6 pt-2"
          id="mobile-menu"
          role="menu"
          aria-label="Mobile menu"
        >
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium py-2 hover:text-epystemy-gray transition-colors focus:outline-none focus:ring-2 focus:ring-epystemy-white focus:ring-offset-2 focus:ring-offset-epystemy-black"
                role="menuitem"
                aria-current={link.href === window.location.hash ? 'page' : undefined}
              >
                {link.title}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="neon-button px-4 py-2 border border-epystemy-white text-center text-sm font-medium transition-all hover:border-epystemy-gray focus:outline-none focus:ring-2 focus:ring-epystemy-white focus:ring-offset-2 focus:ring-offset-epystemy-black"
              role="menuitem"
            >
              Solicite um Orçamento
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;