import { Card, CardHeader, CardTitle } from "components/ui/card"
import { Button } from "components/ui/button"
import { json, Link, useLoaderData } from "@remix-run/react"
import { getSupabaseWithSessionAndHeaders } from "~/utils/supabase.server";
import { LoaderFunction } from "@remix-run/node";
import { getAllLocations } from "~/utils/database.server";
import { CafeLocations } from "~/types/cafe";

export const loader: LoaderFunction = async ({ request }) => {
  const { supabase, headers } = await getSupabaseWithSessionAndHeaders({
    request,
  });

  const {data } = await getAllLocations({
    dbClient: supabase
  });

  return json({ data }, { headers });

}

export default function Locations() {
  const {
    data:locations
  } = useLoaderData<typeof loader>();



  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Explore Cafes by Location</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {locations.map((location:CafeLocations) => (
          <Card key={location.locationname}>
            <CardHeader>
              <CardTitle className="text-center">
                <Button asChild variant="link" className="text-xl">
                <Link
                 to={`/cafes/${location.locationname.toLowerCase()}/${location.id}`}
                >
                {location?.locationname}
                  </Link>
                </Button>
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}