export interface PostEntity {
  _id: string;
  title: string;
  content: string;
  user_id: string;
  likes: string[];
  image?: string;
}
