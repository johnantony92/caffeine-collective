import type { Session } from "@supabase/supabase-js";
import { Database } from "database.types";
import { BlogPost, POST_TYPE_LABELS, PostType } from "~/types/blogpost";

type BlogPostFromDb = Database['dbo']['Tables']['blogposts']['Row']


export function getUserDataFromSession(session: Session) {
  const userId = session.user.id;
  const userAvatarUrl = session.user.user_metadata.avatar_url;
  const username = session.user.user_metadata.name;

  return { userId, userAvatarUrl, username };
}

export function getPostTypeLabel(postTypeId: PostType): string {
  return POST_TYPE_LABELS[postTypeId] || "Unknown"
}

export function convertDatabasePostToBlogPost(dbPost: BlogPostFromDb): BlogPost {
  return {
    id: dbPost.id,
    header: dbPost.header,
    createdbyusername: dbPost.createdbyusername || 'Anonymous',
    createdon: dbPost.createdon,
    readCount: dbPost.readcount || 0,
    posttypeid: dbPost.posttype as PostType,
    content:dbPost.content,
    createdby:dbPost.createdby||""
  }
}