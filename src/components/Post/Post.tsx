import React, { useState } from "react";
import Style from "./Post.module.css";
import userIcon from "../../assets/user.svg";
import { PostEntity } from "../../types/entities/post";
import { useSelectedUserId } from "../SelectedUserContext/SelectedUserContext";

interface PostProps extends PostEntity {}

const Post: React.FC<PostProps> = ({ title, content, user_id }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
