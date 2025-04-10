import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData, Link, useParams, MetaFunction } from "@remix-run/react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "components/ui/card"
import { Badge } from "components/ui/badge"
import { Button } from "components/ui/button"
import { ExternalLink, ArrowLeft, Coffee } from "lucide-react"
import { getSupabaseWithSessionAndHeaders } from "~/utils/supabase.server";
import { getAllLocations, getCafesForLocation } from "~/utils/database.server";
import { Cafe } from "~/types/cafe";


interface LoaderData {
  data: Cafe[];
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {

  const title = "Top Cafes In Each Locations"; 

  return [
    { title: title },
    { name: "description", content: "Top Cafes" }, 
  ];
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const { supabase, headers } = await getSupabaseWithSessionAndHeaders({
    request,
  });

  const locationId = params.id;
  
  if (!locationId) {
    throw new Response("Location ID is required", { status: 400 });
  }


  const { data, error } = await getCafesForLocation({
    dbClient: supabase,
    locationId: Number(locationId)
  });

  if (error) {
    console.error("Error fetching cafes:", error);
    throw new Response("Error fetching cafes", { status: 500 });
  }

  return json({ data }, { headers });

};

export default function CafeLocationPage() {
  const { data: cafes } = useLoaderData<LoaderData>();
  const params = useParams();



  if (!cafes || cafes.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button asChild variant="ghost" className="mb-4">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Locations
          </Link>
        </Button>
        <h1 className="text-4xl font-bold mb-8 text-center">No Cafes Found</h1>
        <p className="text-center">Sorry, we couldn't find any cafes for {params.locationname}.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button asChild variant="ghost" className="mb-4">
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Locations
        </Link>
      </Button>
      <h1 className="text-4xl font-bold mb-8 text-center">
        Cafes to Visit in {params.locationname} For a Great Coffee Experience
      </h1>
      <p className="text-lg text-center mb-4 text-muted-foreground">
        Discover these hidden gems for coffee enthusiasts in {params.locationname}.
      </p>
      <p className="text-sm text-center mb-12 text-muted-foreground">
        Author: Reddit Posts
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {cafes.map((cafe: Cafe) => (
          <Card key={ cafe.name} className="flex flex-col">
            <img 
              src={cafe.imageUrl || ""} 
              alt={cafe.name} 
              className="w-full h-48 object-cover" 
            />
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {cafe.name}
{/*                 <Badge variant="outline">{params.locationname}</Badge>
 */}              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
            <div className="flex items-center mb-2">
              <Coffee className="mr-1" /> 
              <p className="font-semibold mr-2">Favorite Order:</p>
              <span>{cafe.favoriteorder}</span>
            </div>
            <p className="text-muted-foreground mb-4">{cafe.description}</p>
          </CardContent>
            <CardFooter>
              {cafe.googlelink && (
                <a
                  href={cafe.googlelink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:underline"
                >
                  View on Google Maps
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}