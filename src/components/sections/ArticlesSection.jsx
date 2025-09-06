import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';
import { articles } from '@/data/articles';
import { Link } from 'react-router-dom';

const ArticlesSection = () => {
  return (
    <section id="articles" className="section-padding bg-gradient-to-b from-slate-900/50 to-indigo-950/50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-8 mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold gradient-text">
            Philosophical Articles
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Deep dives into consciousness, language, and AI through philosophical exploration
          </p>
        </motion.div>

        <div className="grid gap-8">
          {articles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-effect rounded-2xl p-8 hover:bg-white/15 transition-all duration-300"
            >
              <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-amber-300 mb-2">
                      {article.title}
                    </h3>
                    <p className="text-lg text-white/80 mb-4">{article.subtitle}</p>
                    <p className="text-white/70 leading-relaxed">{article.summary}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-3">Key Themes:</h4>
                    <div className="flex flex-wrap gap-2">
                      {article.themes.map((theme, themeIndex) => (
                        <span
                          key={themeIndex}
                          className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                        >
                          {theme}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6 lg:pt-4 flex flex-col items-center lg:items-end">
                  <div className="glass-effect rounded-xl p-6 w-full max-w-sm">
                    <h4 className="font-semibold text-white mb-3">Key Takeaways</h4>
                    <ul className="space-y-2 mb-6">
                      {article.keyTakeaways.slice(0, 2).map((takeaway, takeawayIndex) => (
                        <li key={takeawayIndex} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-white/80 text-sm">{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to={`/article/${article.slug}`} className="w-full">
                      <Button
                        variant="outline"
                        className="w-full border-amber-400/30 text-amber-300 hover:bg-amber-400/10 hover:text-amber-200"
                      >
                        <BookOpen className="mr-2" size={16} />
                        Read Full Article
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;