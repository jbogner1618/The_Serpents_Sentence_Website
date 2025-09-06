import React from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = ({ scrollToSection, handleBuyNow, isMenuOpen, setIsMenuOpen }) => {
  return (
    <nav className="fixed top-0 w-full z-50 glass-effect">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <motion.div
            className="font-display text-xl font-bold gradient-text"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            The Serpent's Sentence
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('about')}
              className="text-white/80 hover:text-white transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('preview')}
              className="text-white/80 hover:text-white transition-colors"
            >
              Preview
            </button>
            <button
              onClick={() => scrollToSection('articles')}
              className="text-white/80 hover:text-white transition-colors"
            >
              Articles
            </button>
            <button
              onClick={() => scrollToSection('author')}
              className="text-white/80 hover:text-white transition-colors"
            >
              Author
            </button>
            <Button
              onClick={handleBuyNow}
              className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-semibold glow-effect"
            >
              Buy Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            className="md:hidden glass-effect mt-2 rounded-lg p-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('about')}
                className="text-white/80 hover:text-white transition-colors text-left"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('preview')}
                className="text-white/80 hover:text-white transition-colors text-left"
              >
                Preview
              </button>
              <button
                onClick={() => scrollToSection('articles')}
                className="text-white/80 hover:text-white transition-colors text-left"
              >
                Articles
              </button>
              <button
                onClick={() => scrollToSection('author')}
                className="text-white/80 hover:text-white transition-colors text-left"
              >
                Author
              </button>
              <Button
                onClick={handleBuyNow}
                className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-semibold w-full"
              >
                Buy Now
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;