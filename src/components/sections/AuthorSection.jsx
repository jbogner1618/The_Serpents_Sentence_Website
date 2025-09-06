import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Network, Eye, Lightbulb } from 'lucide-react';

const AuthorSection = () => {
  return (
    <section id="author" className="section-padding bg-gradient-to-b from-indigo-950/50 to-slate-900/50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-8 mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold gradient-text">
            About the Author
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="text-center lg:text-left">
              <h3 className="font-display text-3xl font-bold text-white mb-2">Justin T. Bogner</h3>
              <p className="text-xl text-amber-300 mb-6">Consciousness Researcher & Author</p>
            </div>

            <div className="space-y-6">
              <p className="text-white/80 leading-relaxed">
                Justin T. Bogner is a researcher at the intersection of consciousness studies, neuroscience, and artificial intelligence. With an interdisciplinary background spanning cognitive science, philosophy of mind, and computational neuroscience, he brings a unique perspective to understanding the nature of consciousness.
              </p>

              <p className="text-white/80 leading-relaxed">
                His research focuses on the Default Mode Network, language acquisition's impact on consciousness, and the emerging field of AI consciousness. Bogner's work bridges ancient contemplative wisdom with cutting-edge neuroscience, offering new insights into the fundamental nature of mind and awareness.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-blue-500/20 rounded-2xl blur-2xl"></div>
              <img
                className="relative z-10 w-80 h-80 object-cover rounded-2xl shadow-2xl"
                alt="Justin T. Bogner"
                src="https://horizons-cdn.hostinger.com/629d26fa-6e69-4a24-90e7-d7573d3db058/b2d6c32609017b864434482b2cb5c362.png"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AuthorSection;