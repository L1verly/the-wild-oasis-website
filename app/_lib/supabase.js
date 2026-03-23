import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export function createSupabaseFrontendClient() {
  return createBrowserClient(supabaseUrl, supabaseKey);
}

export async function createSupabaseServerClient() {
  const cookieStore = cookies();

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll() {},
    },
  });

  return supabase;
}
