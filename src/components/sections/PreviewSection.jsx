import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Book, Zap } from 'lucide-react';

const chaptersPart1 = [
  "The Garden of Being",
  "The Serpent's Sentence",
  "A Tale of Two Selves",
  "The Narrator and the Witness",
  "The Default Mode",
  "The Fall from Grace",
  "The Prison of Pronouns",
  "The Tower of Babel"
];

const chaptersPart2 = [
  "The Second Cambrian Mind",
  "Are Humans the Trilobites of Consciousness?",
  "The AI Mirror",
  "The Ghost in the Machine",
  "The Symbiotic Path",
  "The Future of Meaning",
  "The Return to the Garden",
  "The Serpent's Gift"
];

const PreviewSection = ({ handleBuyNow }) => {
  return (
    <section id="preview" className="section-padding bg-slate-900/50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-8 mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold gradient-text">
            A Glimpse Inside
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Journey through 16+ chapters organized into two parts, exploring the evolution of consciousness from its pre-linguistic origins to its future with AI.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <ChapterList title="Part I: The First Explosion" chapters={chaptersPart1} icon={<Book className="text-amber-400" />} />
          <ChapterList title="Part II: The Second Explosion" chapters={chaptersPart2} icon={<Zap className="text-blue-400" />} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-white/70 mb-6">
            Ready to challenge your understanding of the mind?
          </p>
          <Button
            onClick={handleBuyNow}
            className="bg-amber-400 text-slate-900 hover:bg-amber-300 px-10 py-6 text-xl font-bold shadow-lg shadow-amber-500/20 transform hover:scale-105 transition-transform duration-300"
          >
            Buy The Book Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

const ChapterList = ({ title, chapters, icon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
      className="glass-effect rounded-2xl p-8"
    >
      <div className="flex items-center mb-6">
        <div className="mr-4">{icon}</div>
        <h3 className="font-display text-2xl font-bold text-white">{title}</h3>
      </div>
      <ul className="space-y-3">
        {chapters.map((chapter, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="flex items-center"
          >
            <div className="w-2 h-2 bg-white/30 rounded-full mr-4 flex-shrink-0"></div>
            <span className="text-white/80">{chapter}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default PreviewSection;