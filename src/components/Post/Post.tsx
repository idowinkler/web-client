import React from "react";
import Style from "./Post.module.css";
import userIcon from "../../assets/user.svg";
import { PostEntity } from "../../types/entities/post";
import { useSelectedUserId } from "../SelectedUserContext/SelectedUserContext";

interface PostProps extends Pick<PostEntity, "content" | "title" | "user_id"> {}

const Post: React.FC<PostProps> = ({ title, content, user_id }) => {
  const { setSelectedUserId } = useSelectedUserId();

  return (
    <div className={Style.post}>
      <img
        src={userIcon}
        className={Style.userIcon}
        onClick={() => setSelectedUserId(user_id)}
      />
      <div className={Style.title}>{title}</div>
      <div>{content}</div>
    </div>
  );
};

export default Post;
