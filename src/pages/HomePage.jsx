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
        <meta property="og:title" content="The Serpent's Sentence - Language, Consciousness, and the Second Cambrian Mind" />
        <meta property="og:description" content="A revolutionary exploration of consciousness, language, and AI that bridges ancient wisdom with cutting-edge neuroscience." />
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