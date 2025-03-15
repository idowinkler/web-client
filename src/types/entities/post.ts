export interface PostEntity {
  _id: string;
  title: string;
  content: string;
  user_id: {
    _id: string;
    image?: string;
  };
  likes: string[];
}
