import React, { useEffect, useState } from "react";
import Style from "./UpsertPostModal.module.css";
import Modal from "../Modal/Modal";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostMutations } from "../../utils/customHooks/mutations/usePostMutations";
import { PostEntity } from "../../types/entities/post";
import { getPostSuggestion } from "../../utils/api/post";
import { useUploadImage } from "../../utils/customHooks/mutations/useUploadImage";
import uploadImg from "../../assets/image-upload.svg";

interface UpsertPostModalProps {
  post?: PostEntity;
  isOpen: boolean;
  closeModal: () => void;
}

const schema = z.object({
  title: z.string().min(1, "כותרת היא שדה חובה"),
  content: z.string().min(1, "תוכן הוא שדה חובה"),
  image: z.any().optional(),
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
    watch,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [image] = watch(["image"]);
  const imageRef: { current: HTMLInputElement | null } = { current: null };
  const { ref, ...rest } = register("image", { required: true });

  useEffect(() => {
    if (image && image[0]) {
      const newUrl = URL.createObjectURL(image[0]);
      setPreviewImage(newUrl);
    }
  }, [image]);

  useEffect(() => {
    if (post) {
      setValue("title", post.title);
      setValue("content", post.content);
      setPreviewImage(post?.image ?? null);
    } else {
      reset();
    }
  }, [post, isOpen, setValue, reset]);

  const { addPostMutation, updatePostMutation } = usePostMutations();
  const { mutateAsync: uploadImageMutation } = useUploadImage();

  const onSubmit = async (data) => {
    let image = post?.image;

    if (previewImage !== post?.image) {
      image = await uploadImageMutation(data.image[0]);
    }

    if (post) {
      updatePostMutation.mutate({
        id: post._id,
        post: { ...data, image },
      });
    } else {
      addPostMutation.mutate({ ...data, image });
    }
    closeModal();
    reset();
  };

  const insertPostSuggestion = async () => {
    const suggestion = await getPostSuggestion();

    setValue("title", suggestion.title);
    setValue("content", suggestion.content);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => closeModal()}>
        {
          <div className={Style.modalHeader}>
            {`${post ? "עריכת" : "יצירת"} פוסט`}
            <button
              className={Style.button}
              onClick={() => insertPostSuggestion()}
            >
              תן לי רעיון
            </button>
          </div>
        }

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
          <div className={Style.inputGroup}>
            <label htmlFor="image">תמונה</label>
            {previewImage && (
              <img src={previewImage} alt="Preview" className={Style.image} />
            )}
            <img
              src={uploadImg}
              alt="upload"
              className={Style.upload}
              onClick={() => imageRef.current?.click()}
            />
            <input
              {...rest}
              ref={(e) => {
                ref(e);
                imageRef.current = e;
              }}
              type="file"
              name="image"
              id="image"
              style={{ display: "none" }}
            />
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
