// components/PostsContent.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs"

import { BlogPost } from "~/types/blogpost"
import { PostCard } from "./postcard"

interface PostsContentProps {
  recentPosts: BlogPost[]
  trendingPosts: BlogPost[]
}

export function PostsContent({ recentPosts, trendingPosts }: PostsContentProps) {
  return (
    <Tabs defaultValue="recent" className="w-full">
      <TabsList>
        <TabsTrigger value="recent">Recent Posts</TabsTrigger>
        <TabsTrigger value="trending">Trending</TabsTrigger>
      </TabsList>
      <TabsContent value="recent" className="space-y-4">
        {recentPosts.map((post) => (
          <PostCard
            key={post.id}
            title={post.header}
            author={post.createdbyusername}
            createdAt={post.createdon.toLocaleString()}
            postId={post.id}
            postTypeId={post.posttypeid}
          />
        ))}
      </TabsContent>
      <TabsContent value="trending" className="space-y-4">
        {trendingPosts.map((post) => (
          <PostCard
            key={post.id}
            title={post.header}
            author={post.createdbyusername}
            createdAt={post.createdon.toLocaleString()}
            postId={post.id}
            postTypeId={post.posttypeid}
          />
        ))}
      </TabsContent>
    </Tabs>
  )
}