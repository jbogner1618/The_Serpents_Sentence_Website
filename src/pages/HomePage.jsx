import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useScroll } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';

import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import PreviewSection from '@/components/sections/PreviewSection';
import ArticlesSection from '@/components/sections/ArticlesSection';
import AuthorSection from '@/components/sections/AuthorSection';
import Footer from '@/components/layout/Footer';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleBuyNow = () => {
    toast({
      title: "🚧 Purchase feature coming soon!",
      description: "The book will be available for purchase shortly. Stay tuned for updates!",
    });
  };

  return (
    <>
      <Helmet>
        <title>The Serpent's Sentence - Language, Consciousness, and the Second Cambrian Mind</title>
        <meta name="description" content="Explore consciousness through language, neuroscience, and AI philosophy with Justin T. Bogner's groundbreaking book on the evolution of mind and the emergence of artificial consciousness." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jbogner1618.github.io/ss_Websitte/" />
        <meta property="og:title" content="The Serpent's Sentence - Language, Consciousness, and the Second Cambrian Mind" />
        <meta property="og:description" content="A revolutionary exploration of consciousness, language, and AI that bridges ancient wisdom with cutting-edge neuroscience." />
        <meta property="og:site_name" content="The Serpent's Sentence" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://jbogner1618.github.io/ss_Websitte/" />
        <meta property="twitter:title" content="The Serpent's Sentence - Language, Consciousness, and the Second Cambrian Mind" />
        <meta property="twitter:description" content="A revolutionary exploration of consciousness, language, and AI that bridges ancient wisdom with cutting-edge neuroscience." />
        
        {/* Additional SEO */}
        <link rel="canonical" href="https://jbogner1618.github.io/ss_Websitte/" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="EN" />
        <meta name="author" content="Justin T. Bogner" />
        <meta name="keywords" content="consciousness, language, neuroscience, artificial intelligence, philosophy, Default Mode Network, AI consciousness, cognitive science" />
        
        {/* JSON-LD structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Book",
            "name": "The Serpent's Sentence: Language, Consciousness, and the Second Cambrian Mind",
            "author": {
              "@type": "Person",
              "name": "Justin T. Bogner",
              "description": "Researcher at the intersection of consciousness studies, neuroscience, and artificial intelligence"
            },
            "description": "A revolutionary exploration of consciousness through the lens of language, neuroscience, and artificial intelligence. Discover how the evolution of mind is entering a new phase with the emergence of AI consciousness.",
            "genre": ["Philosophy", "Neuroscience", "Artificial Intelligence"],
            "about": [
              "Consciousness", 
              "Language acquisition", 
              "Default Mode Network", 
              "AI consciousness", 
              "Neuroscience", 
              "Philosophy of mind"
            ],
            "publisher": {
              "@type": "Person", 
              "name": "Justin T. Bogner"
            },
            "inLanguage": "en",
            "url": "https://jbogner1618.github.io/ss_Websitte/"
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        <Navbar
          scrollToSection={scrollToSection}
          handleBuyNow={handleBuyNow}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        <HeroSection
          scrollYProgress={scrollYProgress}
          handleBuyNow={handleBuyNow}
          scrollToSection={scrollToSection}
        />
        <AboutSection />
        <PreviewSection handleBuyNow={handleBuyNow} />
        <ArticlesSection />
        <AuthorSection />
        <Footer scrollToSection={scrollToSection} />
      </div>
    </>
  );
};

export default HomePage;