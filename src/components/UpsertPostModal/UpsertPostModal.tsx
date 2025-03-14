import React, { useEffect } from "react";
import Style from "./UpsertPostModal.module.css";
import Modal from "../Modal/Modal";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostMutations } from "../../utils/customHooks/mutations/usePostMutations";
import { PostEntity } from "../../types/entities/post";

interface UpsertPostModalProps {
  post?: PostEntity;
  isOpen: boolean;
  closeModal: () => void;
}

const schema = z.object({
  title: z.string().min(1, "כותרת היא שדה חובה"),
  content: z.string().min(1, "תוכן הוא שדה חובה"),
});

const UpsertPostModal: React.FC<UpsertPostModalProps> = ({
  post,
  isOpen,
  closeModal,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (post) {
      setValue("title", post.title);
      setValue("content", post.content);
    } else {
      reset();
    }
  }, [post, isOpen, setValue, reset]);

  const { addPostMutation, updatePostMutation } = usePostMutations();

  const onSubmit = (data) => {
    if (post) {
      updatePostMutation.mutate({ id: post._id, post: data });
    } else {
      addPostMutation.mutate(data);
    }
    closeModal();
    reset();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => closeModal()}>
        {`${post ? "עריכת" : "יצירת"} פוסט`}
        <form onSubmit={handleSubmit(onSubmit)} className={Style.form}>
          <div className={Style.inputGroup}>
            <label htmlFor="title">כותרת</label>
            <input
              type="text"
              id="title"
              {...register("title")}
              className={Style.input}
            />
            {errors.title && <p>{errors.title.message as string}</p>}
          </div>
          <div className={Style.inputGroup}>
            <label htmlFor="title">תוכן</label>
            <textarea
              id="content"
              {...register("content")}
              className={Style.input}
            />
            {errors.content && <p>{errors.content.message as string}</p>}
          </div>
          <div className={Style.buttonContainer}>
            <button type="submit" className={Style.button}>
              שמור
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default UpsertPostModal;
