import { Link } from "@remix-run/react"
import { Button } from "components/ui/button"
import { Coffee, Home, ShoppingBag, MapPin } from "lucide-react"

export function SideMenu() {
  return (
    <nav className="space-y-2">
      <Button variant="ghost" className="w-full justify-start">
        <Home className="mr-2 h-4 w-4" />
        Guides
      </Button>
      <Button variant="ghost" className="w-full justify-start">
      <Link to="/products">
        <Coffee className="mr-2 h-4 w-4" />
        Coffee
        </Link>
      </Button>
      <Button variant="ghost" className="w-full justify-start">
        <ShoppingBag className="mr-2 h-4 w-4" />
        Products
      </Button>
      <Button variant="ghost" className="w-full justify-start">
        <MapPin className="mr-2 h-4 w-4" />
        Cafes
      </Button>
    </nav>
  )
}