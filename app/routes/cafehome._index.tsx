import { Card, CardHeader, CardTitle } from "components/ui/card"
import { Button } from "components/ui/button"
import { Link } from "@remix-run/react"

const locations = [
  "Bengaluru",
  "Chennai",
  "Goa",
  "Hanoi",
  "Pune",
  "Mumbai",
  "Delhi"
]

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Explore Cafes by Location</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {locations.map((location) => (
          <Card key={location}>
            <CardHeader>
              <CardTitle className="text-center">
                <Button asChild variant="link" className="text-xl">
                <Link to={`/${location.toLowerCase()}`}>
                {location}
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