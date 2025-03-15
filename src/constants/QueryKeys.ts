export const QUERY_KEYS = {
  POSTS: "posts",
  COMMENTS: "comments",
  POSTS_BY_USER: (userId: string) => `posts-${userId}`,
  COMMENTS_BY_POST: (postId: string) => `comments-${postId}`,
  USER_BY_ID: (id: string) => `user-${id}`,
} as const;
