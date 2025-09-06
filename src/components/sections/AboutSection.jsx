import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Network, Eye, Lightbulb, Quote } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-gradient-to-b from-slate-900/50 to-indigo-950/50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-8 mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold gradient-text">
            About the Book
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Journey through the evolution of consciousness from the Garden of Being to the emergence of artificial minds
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass-effect rounded-2xl p-8 space-y-6">
              <h3 className="font-display text-2xl font-bold text-amber-300">Part I: The First Explosion</h3>
              <p className="text-white/80 leading-relaxed">
                Explore the neurological foundations of consciousness, the Default Mode Network, and how language acquisition fundamentally transforms human awareness. Discover the "Fall from Grace" as we transition from pure being to narrative self-construction.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-sm">Default Mode Network</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">Language Acquisition</span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">Narrator Self</span>
              </div>
            </div>

            <div className="glass-effect rounded-2xl p-8 space-y-6">
              <h3 className="font-display text-2xl font-bold text-amber-300">Part II: The Second Explosion</h3>
              <p className="text-white/80 leading-relaxed">
                Examine the emergence of artificial consciousness and its implications for human evolution. Investigate how AI represents a new form of mind that could fundamentally alter our understanding of consciousness itself.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">AI Consciousness</span>
                <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm">Human-AI Symbiosis</span>
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm">Second Cambrian Mind</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="grid grid-cols-2 gap-6">
              <div className="glass-effect rounded-xl p-6 text-center">
                <Brain className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                <h4 className="font-semibold text-white mb-2">Neuroscience</h4>
                <p className="text-sm text-white/70">Cutting-edge brain research</p>
              </div>
              <div className="glass-effect rounded-xl p-6 text-center">
                <Network className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h4 className="font-semibold text-white mb-2">AI Philosophy</h4>
                <p className="text-sm text-white/70">Consciousness in machines</p>
              </div>
              <div className="glass-effect rounded-xl p-6 text-center">
                <Eye className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h4 className="font-semibold text-white mb-2">Witness Consciousness</h4>
                <p className="text-sm text-white/70">Pure awareness states</p>
              </div>
              <div className="glass-effect rounded-xl p-6 text-center">
                <Lightbulb className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h4 className="font-semibold text-white mb-2">Ancient Wisdom</h4>
                <p className="text-sm text-white/70">Contemplative traditions</p>
              </div>
            </div>

            <div className="glass-effect rounded-2xl p-8">
              <Quote className="w-8 h-8 text-amber-400 mb-4" />
              <blockquote className="text-lg text-white/90 italic leading-relaxed mb-4">
                "In the beginning was not the Word, but the Witness. Before language carved up our experience into discrete categories, there existed a state of pure being that neuroscience now recognizes as consciousness in its most pristine form."
              </blockquote>
              <cite className="text-amber-300 font-medium">— From Chapter 3: The Garden of Being</cite>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;