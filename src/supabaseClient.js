import { createClient } from '@supabase/supabase-js';

// GANTI DENGAN URL DAN KUNCI DARI LANGKAH 5

// (Saran: Sebaiknya Anda simpan ini di file .env.local)
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
