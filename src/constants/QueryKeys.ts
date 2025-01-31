export const QUERY_KEYS = {
    POSTS: 'posts',
    POSTS_BY_USER: (userId: string) => `posts-${userId}`,
    USER_BY_ID: (id: string) => `user-${id}`
} as const