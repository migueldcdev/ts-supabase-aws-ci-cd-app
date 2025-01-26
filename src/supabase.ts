const supabaseUrl =
  typeof import.meta !== "undefined" && import.meta.env.VITE_SUPABASE_URL
    ? import.meta.env.VITE_SUPABASE_URL
    : process.env.VITE_SUPABASE_URL || "";

const supabaseAnonKey =
  typeof import.meta !== "undefined" && import.meta.env.VITE_SUPABASE_ANON_KEY
    ? import.meta.env.VITE_SUPABASE_ANON_KEY
    : process.env.VITE_SUPABASE_ANON_KEY || "";

// Import the Supabase client
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
