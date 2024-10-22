import { useSearchParams } from "@remix-run/react"
import { Button } from "components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function ComingSoon() {
 

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">Coming Soon</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-lg text-muted-foreground">Feature will be available soon!</p>
          <div className="flex justify-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-sm text-muted-foreground">We're working hard to bring you something amazing. Stay tuned!</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="outline" asChild>
            <a href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}