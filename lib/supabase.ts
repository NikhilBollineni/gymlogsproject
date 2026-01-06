import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// Debug logging (only in server-side context)
if (typeof window === 'undefined') {
  console.log('Supabase Config Check:', {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseAnonKey,
    urlSource: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'NEXT_PUBLIC' : (process.env.EXPO_PUBLIC_SUPABASE_URL ? 'EXPO_PUBLIC' : 'MISSING'),
    keySource: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'NEXT_PUBLIC' : (process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ? 'EXPO_PUBLIC' : 'MISSING'),
    urlLength: supabaseUrl?.length || 0,
    keyLength: supabaseAnonKey?.length || 0,
  });
}

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Test user signups will not be saved.');
  console.warn('Supabase URL:', supabaseUrl ? 'Set' : 'Missing');
  console.warn('Supabase Key:', supabaseAnonKey ? 'Set' : 'Missing');
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;

