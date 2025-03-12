import React from "react";
import Style from "./Post.module.css";
import userIcon from "../../assets/user.svg";
import trashIcon from "../../assets/trash.svg";
import pencilIcon from "../../assets/pencil.svg";
import { PostEntity } from "../../types/entities/post";
import { useSelectedUserId } from "../SelectedUserContext/SelectedUserContext";
import { usePostMutations } from "../../utils/customHooks/mutations/usePostMutations";

interface PostProps extends PostEntity {
  setEditedPostId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const Post: React.FC<PostProps> = ({
  _id,
  title,
  content,
  user_id,
  setEditedPostId,
}) => {
  const { setSelectedUserId } = useSelectedUserId();
  const { deletePostMutation } = usePostMutations();

  return (
    <div className={Style.post}>
      <div className={Style.iconsHeader}>
        {/* TODO: WHEN AUTH CONTEXT RETURN USER ID CONDITIONAL RENDER THIS */}
        <img
          src={trashIcon}
          className={Style.icon}
          onClick={() => deletePostMutation.mutate(_id)}
        />
        <img
          src={pencilIcon}
          className={Style.icon}
          onClick={() => setEditedPostId(_id)}
        />
      </div>
      <div className={Style.header}>
        <img
          src={userIcon}
          className={Style.icon}
          onClick={() => setSelectedUserId(user_id)}
        />
        <div className={Style.title}>{title}</div>
      </div>

      <div className={Style.content}>{content}</div>
    </div>
  );
};

export default Post;
