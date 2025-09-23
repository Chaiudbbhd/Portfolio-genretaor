import { createClient } from "@supabase/supabase-js";

// These come from your Supabase project settings → API
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Single Supabase client (browser-safe)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
