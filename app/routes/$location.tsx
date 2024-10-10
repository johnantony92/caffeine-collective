import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData, Link, useParams } from "@remix-run/react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "components/ui/card"
import { Badge } from "components/ui/badge"
import { Button } from "components/ui/button"
import { ExternalLink, ArrowLeft } from "lucide-react"

interface Cafe {
  name: string;
  location: string;
  favoriteOrder: string;
  description: string;
  googleLink: string;
  imageUrl: string;
}

const cafeData: Record<string, Cafe[]> = {
  bengaluru: [
    {
        name: "Ainmane Cafe",
        location: "Bangalore, India",
        favoriteOrder: "Chikmagalur coffee",
        description: "First love for specialty coffee without sugar",
        googleLink: "https://www.google.com/maps/search/?api=1&query=Ainmane+Cafe+Bangalore",
        imageUrl: "/placeholder.svg?height=200&width=400"
      },
      {
        name: "Benki Coffee",
        location: "Bangalore, India",
        favoriteOrder: "Filter coffee",
        description: "Affordable and great quality before moving locations",
        googleLink: "https://www.google.com/maps/search/?api=1&query=Benki+Coffee+Bangalore",
        imageUrl: "/placeholder.svg?height=200&width=400"
      },
      {
        name: "Coffee Mechanics",
        location: "Bangalore, India",
        favoriteOrder: "Espresso-based drinks",
        description: "Consistent quality; best light-roast coffee",
        googleLink: "https://www.google.com/maps/search/?api=1&query=Coffee+Mechanics+Bangalore",
        imageUrl: "/placeholder.svg?height=200&width=400"
      },
      {
        name: "Maverick & Farmer Coffee",
        location: "Bangalore, India",
        favoriteOrder: "Clarified Cappuccino",
        description: "Great variety of coffee, unique ambiance inside a BMW showroom.",
        googleLink: "https://www.google.com/maps/search/?api=1&query=Maverick+%26+Farmer+Coffee+Bangalore",
        imageUrl: "/placeholder.svg?height=200&width=400"
      },
      {
        name: "Third Wave",
        location: "Bangalore, India",
        favoriteOrder: "V60",
        description: "Consistent quality and great setup",
        googleLink: "https://www.google.com/maps/search/?api=1&query=Third+Wave+Bangalore",
        imageUrl: "/placeholder.svg?height=200&width=400"
      },
      {
        name: "Trippy Goat",
        location: "Bangalore, India",
        favoriteOrder: "Not specified",
        description: "Chill vibes, great coffee, and good ambiance",
        googleLink: "https://www.google.com/maps/search/?api=1&query=Trippy+Goat+Bangalore",
        imageUrl: "/placeholder.svg?height=200&width=400"
      }
  ],
  chennai: [
    // Chennai cafes data
  ],
  // ... other locations
};

export const loader: LoaderFunction = async ({ params }) => {
  const location = params.location?.toLowerCase();
  const cafes = cafeData[location as keyof typeof cafeData] || [];
  return json({ cafes, location });
};

export default function CafeLocationPage() {
  const { cafes, location } = useLoaderData<typeof loader>();
  const params = useParams();

  if (cafes.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button asChild variant="ghost" className="mb-4">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Locations
          </Link>
        </Button>
        <h1 className="text-4xl font-bold mb-8 text-center">No Cafes Found</h1>
        <p className="text-center">Sorry, we couldn't find any cafes for {params.location}.</p>
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
      <h1 className="text-4xl font-bold mb-8 text-center">Cafes to Visit in {params.location} For a Great Coffee Experience</h1>
      <p className="text-lg text-center mb-4 text-muted-foreground">
        Discover these hidden gems for coffee enthusiasts in {params.location}.
      </p>
      <p className="text-sm text-center mb-12 text-muted-foreground">
        Author: Reddit Posts
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {cafes.map((cafe: Cafe, index: number ) => (
          <Card key={index} className="flex flex-col">
            <img src={cafe.imageUrl} alt={cafe.name} className="w-full h-48 object-cover" />
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {cafe.name}
                <Badge variant="outline">{cafe.location}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="font-semibold mb-2">Favorite Order: {cafe.favoriteOrder}</p>
              <p className="text-muted-foreground mb-4">{cafe.description}</p>
            </CardContent>
            <CardFooter>
              <a
                href={cafe.googleLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary hover:underline"
              >
                View on Google Maps
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}