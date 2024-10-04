import { Badge } from "components/ui/badge"
import { Button } from "components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "components/ui/card"

export function PostCard({
  title,
  description,
  badges = []
}: {
  title: string;
  description: string;
  badges?: string[];
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{title}</CardTitle>
          <div className="space-x-2">
            {badges.map((badge, index) => (
              <Badge key={index} variant={badge === "Top" ? "default" : "secondary"}>
                {badge}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button>Read More</Button>
      </CardFooter>
    </Card>
  )
}