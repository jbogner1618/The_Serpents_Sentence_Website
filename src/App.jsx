import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SupabaseProvider } from '@/integrations/supabase/SupabaseProvider';
import HomePage from '@/pages/HomePage';
import ArticlePage from '@/pages/ArticlePage';
import ScrollToTop from '@/components/utils/ScrollToTop';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <SupabaseProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/article/:slug" element={<ArticlePage />} />
      </Routes>
      <Toaster />
    </SupabaseProvider>
  );
}

export default App;