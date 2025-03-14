import React, { useEffect, useState } from "react";
import Style from "./CommentsModal.module.css";
import Modal from "../Modal/Modal";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostMutations } from "../../utils/customHooks/mutations/usePostMutations";
import { PostEntity } from "../../types/entities/post";
import { useCommentsByPostId } from "../../utils/customHooks/queries/useCommentsByPostId";
import { useCommentMutations } from "../../utils/customHooks/mutations/useCommentMutations";
import { useRefetchQueries } from "../../utils/customHooks/queries/useRefetchQueries";
import Comment from "../Comment/Comment";

interface CommentsModalProps {
  postId?: PostEntity["_id"];
  isOpen: boolean;
  closeModal: () => void;
}

const schema = z.object({
  message: z.string().min(1, "הודעה היא שדה חובה"),
});

const CommentsModal: React.FC<CommentsModalProps> = ({
  postId,
  isOpen,
  closeModal,
}) => {
  const { data: comments } = useCommentsByPostId(postId);
  const { addCommentMutation } = useCommentMutations();
  const { refetchCommentsByPostId } = useRefetchQueries();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
  });

  // useEffect(() => {
  //   if (post) {
  //     setValue("title", post.title);
  //     setValue("content", post.content);
  //   } else {
  //     reset();
  //   }
  // }, [post, isOpen, setValue, reset]);

  // const { addPostMutation, updatePostMutation } = usePostMutations();

  const onSubmit = async (data) => {
    if (postId) {
      console.log("mutating");
      addCommentMutation.mutate({ message: data.message, post_id: postId });
    }
    reset();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => closeModal()}>
        תגובות
        <div className={Style.commentsContainer}>
          {comments?.map((comment) => (
            <Comment comment={comment} />
          ))}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={Style.form}>
          <input
            type="text"
            id="message"
            {...register("message")}
            className={Style.input}
          />
          {errors.message && <p>{errors.message.message as string}</p>}

          <button type="submit" className={Style.button}>
            פרסום תגובה
          </button>
        </form>
      </Modal>
    </>
  );
};

export default CommentsModal;
