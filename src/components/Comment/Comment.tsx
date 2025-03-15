import React from "react";
import Style from "./Comment.module.css";
import { CommentEntity } from "../../types/entities/comment";

interface CommentProps {
  comment: CommentEntity;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <p className={Style.container}>
      <div className={Style.user}>{`${comment.user_id.userName}:`}</div>
      {comment.message}
    </p>
  );
};

export default Comment;
