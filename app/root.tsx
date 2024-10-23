import {
  json,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";

import "./tailwind.css";
import { getSupabaseEnv, getSupabaseWithSessionAndHeaders } from "./utils/supabase.server";
import { useSupabase } from "./utils/supabase";
import { AppLayout } from "./components/layout/applayout";
import { UserDetails } from "./types/user";
import { getUserDataFromSession } from "./utils/utils";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export const loader: LoaderFunction = async ({ request }) => {
  const { serverSession, headers } = await getSupabaseWithSessionAndHeaders({
    request,
  });
  const domainUrl = process.env.DOMAIN_URL!;

  const env = getSupabaseEnv();

  const isAuthenticated = serverSession?true:false;

  const userDetails: UserDetails = serverSession
    ? getUserDataFromSession(serverSession)
    : { userId: null, userAvatarUrl: null, username: null };
    

  return json({ serverSession,userDetails,
    isAuthenticated ,env, domainUrl }, { headers });
};

export default function App() {
  const { env, serverSession,userDetails,
          isAuthenticated,domainUrl  } = useLoaderData<typeof loader>();
  const { supabase } = useSupabase({ env, serverSession });


  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
       <AppLayout
          isAuthenticated={isAuthenticated}
          userDetails={userDetails}
          supabase={supabase}
        >
        <Outlet context={{ supabase, domainUrl }} />
        </AppLayout>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
