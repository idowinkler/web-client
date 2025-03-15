export interface PostEntity {
  _id: string;
  title: string;
  content: string;
  likes: string[];
  image?: string;
  user_id: {
    _id: string;
    image?: string;
  };
}
