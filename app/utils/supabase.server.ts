import { createServerClient, parseCookieHeader, serializeCookieHeader } from "@supabase/ssr";

export const getSupabaseEnv = () => ({
  SUPABASE_URL: process.env.SUPABASE_URL!,
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
});

export function getSupabaseWithHeaders({ request }: { request: Request }) {
  const headers = new Headers();

  const supabase = createServerClient(getSupabaseEnv().SUPABASE_URL, getSupabaseEnv().SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return parseCookieHeader(request.headers.get('Cookie') ?? '');
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          headers.append('Set-Cookie', serializeCookieHeader(name, value, options))
        );
      },
    },
  });

  return { supabase, headers }; // Return both supabase and headers
}

export async function getSupabaseWithSessionAndHeaders({ request }: { request: Request }) {
  const { supabase, headers } = getSupabaseWithHeaders({ request });
  const {
    data: { session: serverSession },
  } = await supabase.auth.getSession();

  return { serverSession, headers, supabase };
}
