import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { Button } from '@/components/ui/button';
import { Download, ArrowLeft, Loader2 } from 'lucide-react';
import { articles } from '@/data/articles';
import { toast } from '@/components/ui/use-toast';

const ArticlePage = () => {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);
  const articleContentRef = useRef(null);

  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (article) {
      article.contentModule()
        .then(module => {
          setContent(module.default);
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to load article content:", err);
          setLoading(false);
        });
    }
  }, [article]);

  const handleDownloadPDF = async () => {
    if (!articleContentRef.current || isDownloading) return;

    setIsDownloading(true);
    toast({
      title: "Generating PDF...",
      description: "Please wait while we prepare your download.",
    });

    try {
      const canvas = await html2canvas(articleContentRef.current, {
        scale: 2,
        backgroundColor: '#0f172a', 
        onclone: (document) => {
            const articleElement = document.querySelector('.prose-custom');
            if(articleElement) {
                articleElement.style.color = '#fff';
            }
        }
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`${article.slug}.pdf`);
      
      toast({
        title: "Download Started!",
        description: "Your PDF has been generated successfully.",
      });

    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Oh no! Something went wrong.",
        description: "We couldn't generate the PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };


  if (!article) {
    return <Navigate to="/" />;
  }

  const components = {
    h1: ({node, ...props}) => <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 mt-12 gradient-text" {...props} />,
    h2: ({node, ...props}) => <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 mt-10 border-l-4 border-amber-400 pl-4" {...props} />,
    h3: ({node, ...props}) => <h3 className="font-display text-2xl font-bold mb-4 mt-8 text-blue-300" {...props} />,
    p: ({node, ...props}) => <p className="leading-relaxed text-lg my-6" {...props} />,
    blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-blue-400 pl-6 my-8 italic text-xl text-white/90" {...props} />,
    hr: ({node, ...props}) => <hr className="my-12 border-white/20" {...props} />,
    li: ({node, ...props}) => <li className="my-3" {...props} />,
    a: ({node, ...props}) => <a className="text-amber-400 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
  };

  return (
    <>
      <Helmet>
        <title>{`${article.title} - The Serpent's Sentence`}</title>
        <meta name="description" content={article.summary} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://jbogner1618.github.io/ss_Websitte/article/${article.slug}`} />
        <meta property="og:title" content={`${article.title} - The Serpent's Sentence`} />
        <meta property="og:description" content={article.summary} />
        <meta property="og:site_name" content="The Serpent's Sentence" />
        <meta property="article:author" content="Justin T. Bogner" />
        <meta property="article:section" content="Philosophy" />
        {article.themes && article.themes.map((theme, index) => (
          <meta key={index} property="article:tag" content={theme} />
        ))}
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://jbogner1618.github.io/ss_Websitte/article/${article.slug}`} />
        <meta property="twitter:title" content={`${article.title} - The Serpent's Sentence`} />
        <meta property="twitter:description" content={article.summary} />
        
        {/* Additional SEO */}
        <link rel="canonical" href={`https://jbogner1618.github.io/ss_Websitte/article/${article.slug}`} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Justin T. Bogner" />
        <meta name="language" content="EN" />
        <meta name="keywords" content={`consciousness, philosophy, neuroscience, ${article.themes ? article.themes.join(', ') : ''}`} />
        
        {/* JSON-LD structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article.title,
            "description": article.summary,
            "author": {
              "@type": "Person",
              "name": "Justin T. Bogner",
              "description": "Researcher at the intersection of consciousness studies, neuroscience, and artificial intelligence"
            },
            "publisher": {
              "@type": "Person",
              "name": "Justin T. Bogner"
            },
            "datePublished": "2024-01-01", // You might want to add actual publish dates to articles
            "dateModified": "2024-01-01",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://jbogner1618.github.io/ss_Websitte/article/${article.slug}`
            },
            "url": `https://jbogner1618.github.io/ss_Websitte/article/${article.slug}`,
            "about": article.themes,
            "keywords": article.themes ? article.themes.join(', ') : '',
            "inLanguage": "en",
            "genre": "Philosophy"
          })}
        </script>
      </Helmet>
      <div className="min-h-screen bg-slate-900 text-white selection:bg-amber-500 selection:text-black">
        <div className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 to-blue-500 z-50"></div>
        
        <header className="py-6 container-custom">
            <Link to="/" className="inline-flex items-center text-amber-300 hover:text-amber-200 transition-colors">
                <ArrowLeft size={18} className="mr-2" />
                Back to Home
            </Link>
        </header>

        <main className="container-custom py-12">
            <motion.article 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="max-w-4xl mx-auto"
                ref={articleContentRef}
            >
                <motion.h1 
                    className="font-display text-4xl md:text-6xl font-bold mb-4 gradient-text"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    {article.title}
                </motion.h1>
                <motion.p 
                    className="text-xl text-white/80 mb-8 italic"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    {article.subtitle}
                </motion.p>
                
                <div className="flex flex-wrap gap-2 mb-12">
                  {article.themes.map((theme, themeIndex) => (
                    <motion.span
                      key={themeIndex}
                      className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + themeIndex * 0.1, duration: 0.5 }}
                    >
                      {theme}
                    </motion.span>
                  ))}
                </div>
                
                {loading ? (
                    <div className="space-y-6">
                        <div className="w-full h-8 bg-slate-700 rounded animate-pulse"></div>
                        <div className="w-3/4 h-8 bg-slate-700 rounded animate-pulse"></div>
                        <div className="w-full h-24 bg-slate-700 rounded animate-pulse mt-4"></div>
                    </div>
                ) : (
                    <div className="prose-custom text-white">
                        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>{content}</ReactMarkdown>
                    </div>
                )}


                <motion.div 
                    className="mt-16 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                >
                    <Button 
                        onClick={handleDownloadPDF}
                        disabled={isDownloading}
                        className="bg-amber-400 text-slate-900 hover:bg-amber-300 px-8 py-3 text-lg"
                    >
                        {isDownloading ? (
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        ) : (
                          <Download className="mr-2" size={20} />
                        )}
                        {isDownloading ? 'Generating...' : 'Download as PDF'}
                    </Button>
                </motion.div>
            </motion.article>
        </main>
        
        <footer className="py-8 mt-16 border-t border-white/10">
            <div className="container-custom text-center text-white/50">
                <p>&copy; {new Date().getFullYear()} Justin T. Bogner. All rights reserved.</p>
                <p>Return to <Link to="/" className="text-amber-400 hover:underline">main page</Link>.</p>
            </div>
        </footer>
      </div>
    </>
  );
};

export default ArticlePage;