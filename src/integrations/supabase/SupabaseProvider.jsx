import React, { createContext, useContext } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { toast } from '@/components/ui/use-toast';

const SupabaseContext = createContext(null);

export const SupabaseProvider = ({ children }) => {
  const value = { supabase };

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }

  if (!context.supabase) {
    const triggerToast = () => {
        toast({
            title: "Supabase Not Connected",
            description: "Please connect the Supabase integration to enable database functionality.",
            variant: "destructive",
        });
    }
    return { supabase: null, triggerToast };
  }
  
  return context;
};