import { Link } from "@remix-run/react"

export function Logo() {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <img src="/logo-light.jpeg" width={45} height={32} alt="Coffee Lovers Logo" />
      <span className="text-xl font-bold">Caffeine Collective</span>
    </Link>
  )
}