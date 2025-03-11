import React from "react";
import Style from "./Content.module.css";
import { PostEntity } from "../../types/entities/post";
import Post from "../Post/Post";
import { useSelectedUserId } from "../SelectedUserContext/SelectedUserContext";
import { usePosts } from "../../utils/customHooks/queries/usePosts";
import { useSelectedUser } from "../../utils/customHooks/queries/useSelectedUser";

interface ContentProps {}

const Content: React.FC<ContentProps> = ({}) => {
  const { selectedUserId } = useSelectedUserId();

  const { data: posts } = usePosts(selectedUserId);
  const { data: selectedUser} = useSelectedUser()

  return (
    <div className={Style.content}>
      <div className={Style.contentTitle}>
        {selectedUser ? `הפוסטים של ${selectedUser.firstName}` : "כל הפוסטים"}
      </div>
      <div className={Style.scrollContainer}>
        {" "}
        {posts &&
          posts.map((post) => (
            <Post
              title={post.title}
              content={post.title}
              user_id={post.user_id}
            />
          ))}
      </div>
    </div>
  );
};

export default Content;
