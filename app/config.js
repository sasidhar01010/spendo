// Spendo settings.
// Fill these in from Supabase → Project Settings → API (or "Connect" → App frameworks).
// The anon / publishable key is meant to be public: row-level security in
// supabase/schema.sql is what keeps each user's data private.
// NEVER put the service_role / secret key here.
window.SPENDO_CONFIG = {
  supabaseUrl: 'https://iifclfdohqszyjydplww.supabase.co',
  supabaseAnonKey: 'sb_publishable__CF43SZ_EoJD6DobsiNOGg_qV2FPPvq',
  // Set to true after turning on GitHub under Supabase → Authentication → Providers.
  githubLogin: false
};
