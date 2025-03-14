export interface CommentEntity {
  _id: string;
  message: string;
  user_id: {
    userName: string;
  };
  post_id: string;
}
