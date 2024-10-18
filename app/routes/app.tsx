import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData, useOutletContext } from "@remix-run/react";
import { getSupabaseWithSessionAndHeaders } from "~/utils/supabase.server";
import { getUserDataFromSession } from "~/utils/getUserDataFromSession";
import { SupabaseOutletContext } from "~/utils/supabase";
import { AppLayout } from "~/components/layout/applayout";
import { UserDetails } from "~/types/user";

export let loader = async ({ request }: LoaderFunctionArgs) => {
  const { headers, serverSession } = await getSupabaseWithSessionAndHeaders({
    request,
  });

  const isAuthenticated = !!serverSession;
  const userDetails:UserDetails = serverSession
    ? getUserDataFromSession(serverSession)
    : { userId: null, userAvatarUrl: null, username: null };

  return json(
    { userDetails, isAuthenticated },
    { headers }
  );
};

export default function AppRoute() {
  const { userDetails, isAuthenticated } = useLoaderData<typeof loader>();
  const context = useOutletContext<SupabaseOutletContext>();

  return (
    <AppLayout
      isAuthenticated={isAuthenticated}
      userDetails={userDetails}
      supabase={context.supabase}
    >
      <Outlet context={context} />
    </AppLayout>
  );
}