import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Brain, Network } from 'lucide-react';

const HeroSection = ({ scrollYProgress, handleBuyNow, scrollToSection }) => {
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden neural-network">
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{ y }}
      >
        <div className="absolute top-20 left-10 w-2 h-2 bg-amber-400 rounded-full floating-animation"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-blue-400 rounded-full floating-animation" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-20 w-2 h-2 bg-purple-400 rounded-full floating-animation" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-20 right-10 w-3 h-3 bg-green-400 rounded-full floating-animation" style={{ animationDelay: '1s' }}></div>
      </motion.div>

      <div className="container-custom section-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="gradient-text">The Serpent's</span>
                <br />
                <span className="text-white">Sentence</span>
              </h1>
              <p className="text-xl md:text-2xl text-amber-300 font-medium">
                Language, Consciousness, and the Second Cambrian Mind
              </p>
            </div>

            <p className="text-lg text-white/80 leading-relaxed max-w-xl">
              A revolutionary exploration of consciousness through the lens of language, neuroscience, and artificial intelligence. Discover how the evolution of mind is entering a new phase with the emergence of AI consciousness.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleBuyNow}
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-semibold text-lg px-8 py-3 glow-effect"
              >
                Get the Book
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button
                onClick={() => scrollToSection('preview')}
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-3"
              >
                Read Preview
                <BookOpen className="ml-2" size={20} />
              </Button>
            </div>

            <div className="flex items-center space-x-6 text-sm text-white/60">
              <div className="flex items-center space-x-2">
                <BookOpen size={16} />
                <span>16+ Chapters</span>
              </div>
              <div className="flex items-center space-x-2">
                <Brain size={16} />
                <span>Neuroscience</span>
              </div>
              <div className="flex items-center space-x-2">
                <Network size={16} />
                <span>AI Philosophy</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-2xl blur-2xl"></div>
              <img
                src="https://horizons-cdn.hostinger.com/629d26fa-6e69-4a24-90e7-d7573d3db058/10174f0bc977358c5501ff6d585cbe6a.png"
                alt="The Serpent's Sentence book cover featuring golden serpentine neural network design"
                className="relative z-10 max-w-md w-full h-auto rounded-2xl shadow-2xl floating-animation"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;