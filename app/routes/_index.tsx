import type { MetaFunction } from "@remix-run/node"
import { Button } from "components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "components/ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "components/ui/accordion"
import { Users, Menu } from "lucide-react"
import { PostCard } from "~/components/postcard"


export const meta: MetaFunction = () => {
  return [
    { title: "Caffeine Collective" },
    { name: "description", content: "Home for Coffee Enthusisasts!" },
  ]
}

export default function Index() {
  return (
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Main Content */}
        <main className="flex-1 p-6 max-w-3xl mx-auto">
          <Tabs defaultValue="posts" className="w-full">
            <TabsList>
              <TabsTrigger value="posts">Latest Posts</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
            </TabsList>
            <TabsContent value="posts" className="space-y-4">
              <PostCard
                title="The Art of Pour Over Coffee"
                description="Learn the techniques to perfect your pour over coffee at home. We'll cover everything from choosing the right beans to mastering the pour technique."
                badges={["Top", "Recent"]}
              />
              <PostCard
                title="Exploring Single Origin Beans"
                description="Discover the unique flavors of single origin coffee beans from around the world. From Ethiopian Yirgacheffe to Colombian Supremo, we'll take your taste buds on a global journey."
                badges={["Recent"]}
              />
            </TabsContent>
            <TabsContent value="trending" className="space-y-4">
              <PostCard
                title="Cold Brew vs. Iced Coffee"
                description="Understand the differences and find your perfect summer coffee. We'll compare brewing methods, flavor profiles, and even share some recipes to try at home."
                badges={["Trending"]}
              />
            </TabsContent>
          </Tabs>
        </main>

        {/* Right Sidebar */}
        <aside className="lg:w-80 p-6 space-y-6 border-l">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Meetups</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <Users size={16} />
                  <span>Coffee Tasting Workshop - July 15</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Users size={16} />
                  <span>Latte Art Competition - July 22</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Meetups</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Top Reddit Discussions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>1. Best budget espresso machines?</AccordionTrigger>
                  <AccordionContent>
                    Explore recommendations for affordable espresso machines that don't compromise on quality. From manual to semi-automatic options, find the perfect match for your home brewing needs.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>2. How to store coffee beans properly?</AccordionTrigger>
                  <AccordionContent>
                    Learn the best practices for storing coffee beans to maintain their freshness and flavor. Topics include ideal containers, temperature, and humidity considerations.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>3. Favorite coffee roasters?</AccordionTrigger>
                  <AccordionContent>
                    Discover new coffee roasters recommended by the community. From local hidden gems to internationally renowned brands, expand your coffee horizons.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Visit r/Coffee</Button>
            </CardFooter>
          </Card>
        </aside>
      </div>
  )
}