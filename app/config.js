// Spendo settings.
// Fill these in from Supabase → Project Settings → API (or "Connect" → App frameworks).
// The anon / publishable key is meant to be public: row-level security in
// supabase/schema.sql is what keeps each user's data private.
// NEVER put the service_role / secret key here.
window.SPENDO_CONFIG = {
  supabaseUrl: '',      // e.g. 'https://abcdefghijkl.supabase.co'
  supabaseAnonKey: ''   // the long "anon" / "publishable" key
};
