import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Twitter, Linkedin, ExternalLink } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Footer = ({ scrollToSection }) => {
  return (
    <footer className="section-padding bg-slate-900/80 border-t border-white/10">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <span className="font-display text-2xl font-bold gradient-text">
              The Serpent's Sentence
            </span>
            <p className="text-white/70 leading-relaxed">
              Exploring consciousness through language, neuroscience, and AI philosophy.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => toast({ title: "🚧 Social links coming soon!", description: "Connect with us through other channels for now!" })}
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Twitter size={18} />
              </button>
              <button
                onClick={() => toast({ title: "🚧 Social links coming soon!", description: "Connect with us through other channels for now!" })}
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Linkedin size={18} />
              </button>
              <button
                onClick={() => toast({ title: "🚧 Contact feature coming soon!", description: "We'll have contact info available shortly!" })}
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Mail size={18} />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <span className="font-semibold text-white">Quick Links</span>
            <div className="space-y-2">
              <button
                onClick={() => scrollToSection('about')}
                className="block text-white/70 hover:text-white transition-colors"
              >
                About the Book
              </button>
              <button
                onClick={() => scrollToSection('preview')}
                className="block text-white/70 hover:text-white transition-colors"
              >
                Preview Chapters
              </button>
              <button
                onClick={() => scrollToSection('articles')}
                className="block text-white/70 hover:text-white transition-colors"
              >
                Philosophical Articles
              </button>
              <button
                onClick={() => scrollToSection('author')}
                className="block text-white/70 hover:text-white transition-colors"
              >
                About the Author
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <span className="font-semibold text-white">Contact</span>
            <div className="space-y-2 text-white/70">
              <p>For inquiries about the book, research collaborations, or speaking engagements.</p>
              <button
                onClick={() => toast({ title: "🚧 Contact feature coming soon!", description: "We'll have contact info available shortly!" })}
                className="flex items-center space-x-2 text-amber-300 hover:text-amber-200 transition-colors"
              >
                <Mail size={16} />
                <span>Contact Author</span>
                <ExternalLink size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-white/60">
            © 2024 Justin T. Bogner. All rights reserved. The Serpent's Sentence: Language, Consciousness, and the Second Cambrian Mind.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;