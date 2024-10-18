import type { Session } from "@supabase/supabase-js";

export function getUserDataFromSession(session: Session) {
  const userId = session.user.id;
  const userAvatarUrl = session.user.user_metadata.avatar_url;
  const username = session.user.user_metadata.name;

  return { userId, userAvatarUrl, username };
}