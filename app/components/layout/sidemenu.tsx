import { Link } from "@remix-run/react"
import { Button } from "components/ui/button"
import { Coffee, Home, ShoppingBag, MapPin, BookOpen, Book } from "lucide-react"

export function SideMenu() {
  return (
    <nav className="space-y-2">
      <Link to="/posts">
      <Button variant="ghost" className="w-full justify-start">
        <BookOpen className="mr-2 h-4 w-4" />
        Posts
      </Button>
      </Link>
      <Link to="/products">
      <Button variant="ghost" className="w-full justify-start">
        <Coffee className="mr-2 h-4 w-4" />
        Coffee
      </Button>
      </Link>
      <Button variant="ghost" className="w-full justify-start">
        <ShoppingBag className="mr-2 h-4 w-4" />
        Products
      </Button>
      <Link to="/cafehome">
      <Button variant="ghost" className="w-full justify-start">
        <MapPin className="mr-2 h-4 w-4" />
        Cafes
      </Button>
      </Link>
      <Button variant="ghost" className="w-full justify-start">
        <Book className="mr-2 h-4 w-4" />
        Resources
      </Button>
    </nav>
  )
}