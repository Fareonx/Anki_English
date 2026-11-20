/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

/** When this version of the app was built (ISO date), shown in Settings. */
declare const __BUILD_TIME__: string;

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_PUBLISHABLE_KEY?: string;
}
