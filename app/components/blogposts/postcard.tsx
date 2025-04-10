import { Link } from "@remix-run/react"
import { Badge } from "components/ui/badge"
import { Card, CardHeader, CardTitle, CardFooter } from "components/ui/card"
import { PostType } from "~/types/blogpost"
import { getPostTypeLabel } from "~/utils/utils"

interface PostCardProps {
  title: string
  author: string
  createdAt: string
  postId: string
  postTypeId: PostType
}

export function PostCard({ title, author, createdAt, postId, postTypeId }: PostCardProps) {
  const postTypeLabel = getPostTypeLabel(postTypeId)

  return (
    <Link to={`/posts/${postId}`} className="block">
      <Card className="cursor-pointer hover:bg-accent transition-colors">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            <Badge 
              variant="secondary" 
              className="ml-2 text-xs font-normal bg-black text-white hover:bg-black/80"
            >
              {postTypeLabel}
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="pt-0">
          <p className="text-xs text-muted-foreground">
            By {author} | {createdAt}
          </p>
        </CardFooter>
      </Card>
    </Link>
  )
}