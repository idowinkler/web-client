import React from "react";
import Style from "./Comments.module.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCommentsByPostId } from "../../utils/customHooks/queries/useCommentsByPostId";
import { useCommentMutations } from "../../utils/customHooks/mutations/useCommentMutations";
import Comment from "../Comment/Comment";
import { useNavigate, useParams } from "react-router-dom";
import closeIcon from "../../assets/circleClose.svg";

interface CommentsProps {}

const schema = z.object({
  message: z.string().min(1, "הודעה היא שדה חובה"),
});

const Comments: React.FC<CommentsProps> = ({}) => {
  const { postId } = useParams();
  const { data: comments } = useCommentsByPostId(postId);
  const { addCommentMutation } = useCommentMutations();
  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (postId) {
      addCommentMutation.mutate({ message: data.message, post_id: postId });
    }
    reset();
  };

  return (
    <div className={Style.comments}>
      <div className={Style.header}>
        תגובות
        <img
          src={closeIcon}
          className={Style.icon}
          onClick={() => navigate("/")}
        />
      </div>
      <div className={Style.container}>
        <form onSubmit={handleSubmit(onSubmit)} className={Style.form}>
          <input
            type="text"
            id="message"
            {...register("message")}
            className={Style.input}
          />

          <button type="submit" className={Style.button}>
            פרסום תגובה
          </button>
        </form>
        <div className={Style.commentsContainer}>
          {comments?.map((comment) => (
            <Comment comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comments;
