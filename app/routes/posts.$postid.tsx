import { json, LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { Card, CardHeader, CardTitle, CardContent } from "components/ui/card"
import ReactMarkdown, { Components } from 'react-markdown'
import { BlogPost } from "~/types/blogpost"
import { getBlogPostsDetails } from "~/utils/database.server"
import { getSupabaseWithSessionAndHeaders } from "~/utils/supabase.server"
import { convertDatabasePostToBlogPost } from "~/utils/utils"


export const loader: LoaderFunction = async ({ request, params }) => {
    const { supabase, headers } = await getSupabaseWithSessionAndHeaders({
        request,
      });

      const blogPostid = params.postid??"";

      const { data, error } = await getBlogPostsDetails({
        dbClient: supabase,
        blogPostId:blogPostid
      });
      
      const post = data?.[0] ? convertDatabasePostToBlogPost(data[0]) : null;

  
  if (!data) {
    throw new Response("Not Found", { status: 404 })
  }

  return json({ post }, { headers });
}

export default function PostDetails() {
  const {
    post
  } = useLoaderData<typeof loader>();

const components: Components = {
    h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
    h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />,
    h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-4 mb-2" {...props} />,
    p: ({node, ...props}) => <p className="mb-4 leading-relaxed" {...props} />,
    ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4" {...props} />,
    ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-4" {...props} />,
    li: ({node, ...props}) => <li className="mb-2" {...props} />,
    blockquote: ({node, ...props}) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props} />
    ),
    a: ({node, ...props}) => <a className="text-blue-600 hover:underline" {...props} />,
    img: ({node, ...props}) => <img className="my-4 rounded-lg shadow-md" {...props} />,
  };

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <header className="mb-8">
      <h1 className="text-4xl font-bold mb-2">{post.header}</h1>
      <div className="flex items-center text-sm text-gray-500">
  
        <div>
          <p className="font-medium">{post.createdbyusername}</p>
          <p>{new Date(post.createdon).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
        </div>
      </div>
    </header>
    <div className="prose prose-lg max-w-none">
      <ReactMarkdown components={components}>
        {post.content}
      </ReactMarkdown>
    </div>
  </article>
  
  )
}