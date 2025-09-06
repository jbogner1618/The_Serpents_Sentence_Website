import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xepvuvjtdlzjktpmsnmh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlcHZ1dmp0ZGx6amt0cG1zbm1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4NTAyMjQsImV4cCI6MjA3MjQyNjIyNH0.59jnzWJX9qhHhuhMrJhe7dyGXcR5zGErWERAm61xbwE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);