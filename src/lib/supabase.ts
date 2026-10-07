import { createClient } from '@supabase/supabase-js';

// The publishable key is safe to ship in the browser: every table is protected by row level security.
const url = import.meta.env.VITE_SUPABASE_URL || 'https://lrjyfsqvqddzgcugqidb.supabase.co';
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_iL0ZlmCo3OeMNsKMUiR0Fw_IyQcosDs';

export const supabase = createClient(url, key, {
  auth: { persistSession: true, autoRefreshToken: true },
});
