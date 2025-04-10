import { json, type LoaderFunction, type MetaFunction } from "@remix-run/node"
import { Button } from "components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "components/ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "components/ui/accordion"

import { BlogPost } from "~/types/blogpost"
import { PostsContent } from "~/components/blogposts/blogpostslist"
import { useLoaderData } from "@remix-run/react"
import { getSupabaseWithSessionAndHeaders } from "~/utils/supabase.server"
import { getAllBlogPosts } from "~/utils/database.server"
import { convertDatabasePostToBlogPost } from "~/utils/utils"

interface LoaderData {
  recentPosts: BlogPost[]
  trendingPosts: BlogPost[]
}

export const loader: LoaderFunction = async ({request}) => {

  const { supabase, headers } = await getSupabaseWithSessionAndHeaders({
    request,
  });
  
  const { data, error } = await getAllBlogPosts({
    dbClient: supabase,
  });
  
  const posts = data?.map(convertDatabasePostToBlogPost)

  const postsWithDisplayDate = posts?.map(post => {
    const d = new Date(post.createdon);
    post.displayDate = `${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getDate().toString().padStart(2, '0')}/${d.getFullYear()}`;
  
    return {
      ...post};
  });


  const recentPosts = [...(postsWithDisplayDate||[])].sort((a, b) => 
    new Date(b.createdon).getTime() - new Date(a.createdon).getTime()
  )

  const trendingPosts = [...(postsWithDisplayDate||[])].sort((a, b) => 
    b.readCount - a.readCount
  )


  return json<LoaderData>({ recentPosts, trendingPosts }, 
    { headers })
}

export const meta: MetaFunction = () => {

  return [
    { title: "Caffeine Collective" },
    { name: "description", content: "Home for Coffee Enthusisasts!" },
  ]
}

export default function Index() {
  const { recentPosts, trendingPosts } = useLoaderData<LoaderData>()

  return (
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Main Content */}
        <main className="flex-1 p-6 max-w-3xl mx-auto">
        <PostsContent recentPosts={recentPosts } trendingPosts={trendingPosts} />
      </main>


        {/* Right Sidebar */}
        <aside className="lg:w-80 p-6 space-y-6 border-l">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Meetups</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex items-center justify-center">
            Coming Soon.
            {/*   <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <Users size={16} />
                  <span>Coffee Tasting Workshop - July 15</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Users size={16} />
                  <span>Latte Art Competition - July 22</span>
                </li>
              </ul> */}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Meetups</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Top Reddit Discussions</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex items-center justify-center">
              Coming Soon.
            </CardContent>

           {/*  <CardContent>
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
            </CardContent> */}
            <CardFooter>
              <Button variant="outline" className="w-full">Visit r/IndianCoffee</Button>
            </CardFooter>
          </Card>
        </aside>
      </div>
  )
}