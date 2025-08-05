import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Para desenvolvimento, usar valores padrão se não estiverem definidos
const defaultUrl = 'https://your-project.supabase.co';
const defaultKey = 'your-anon-key';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase env vars are missing. Using default values for development.');
}

export const supabase = createClient(
  supabaseUrl || defaultUrl, 
  supabaseAnonKey || defaultKey
);
