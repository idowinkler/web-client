import React, { useState } from "react";
import Style from "./Content.module.css";
import Post from "../Post/Post";
import { useSelectedUserId } from "../SelectedUserContext/SelectedUserContext";
import { usePosts } from "../../utils/customHooks/queries/usePosts";
import { useSelectedUser } from "../../utils/customHooks/queries/useSelectedUser";
import AddPostButton from "../AddPostButton/AddPostButton";
import { PostEntity } from "../../types/entities/post";
import UpsertPostModal from "../UpsertPostModal/UpsertPostModal";
import CommentsModal from "../CommnetsModal/CommentsModal";

interface ContentProps {}

const Content: React.FC<ContentProps> = ({}) => {
  const [editedPostId, setEditedPostId] = useState<
    PostEntity["_id"] | undefined
  >(undefined);
  const [commentsPostId, setCommentsPostId] = useState<
    PostEntity["_id"] | undefined
  >(undefined);
  const { selectedUserId } = useSelectedUserId();
  const { data: posts } = usePosts(selectedUserId);
  const { data: selectedUser } = useSelectedUser();

  console.log(posts)

  return (
    <div className={Style.content}>
      <div className={Style.contentTitle}>
        {selectedUser ? `הפוסטים של ${selectedUser.firstName}` : "כל הפוסטים"}
        <AddPostButton />
      </div>
      <div className={Style.scrollContainer}>
        {posts &&
          posts.map((post) => (
            <Post
              _id={post._id}
              key={post._id}
              user_id={post.user_id}
              content={post.content}
              title={post.title}
              setEditedPostId={setEditedPostId}
              setCommentsPostId={setCommentsPostId}
              likes={post.likes}
            />
          ))}
      </div>
      <UpsertPostModal
        post={posts?.find((post) => post._id === editedPostId)}
        isOpen={!!editedPostId}
        closeModal={() => setEditedPostId(undefined)}
      />
      <CommentsModal
        postId={commentsPostId}
        isOpen={!!commentsPostId}
        closeModal={() => setCommentsPostId(undefined)}
      />
    </div>
  );
};

export default Content;
