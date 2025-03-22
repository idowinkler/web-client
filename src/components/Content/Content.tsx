import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Style from "./Content.module.css";
import Post from "../Post/Post";
import { useSelectedUserId } from "../SelectedUserContext/SelectedUserContext";
import { usePosts } from "../../utils/customHooks/queries/usePosts";
import { useSelectedUser } from "../../utils/customHooks/queries/useSelectedUser";
import AddPostButton from "../AddPostButton/AddPostButton";
import { PostEntity } from "../../types/entities/post";
import UpsertPostModal from "../UpsertPostModal/UpsertPostModal";

interface ContentProps {}

const Content: React.FC<ContentProps> = () => {
  const [editedPostId, setEditedPostId] = useState<
    PostEntity["_id"] | undefined
  >(undefined);
  const { selectedUserId } = useSelectedUserId();
  const { data, fetchNextPage, hasNextPage } = usePosts(selectedUserId);
  const { data: selectedUser } = useSelectedUser();

  // Flatten pages to a single array of posts
  const posts = data?.pages.flatMap((page) => page.posts) || [];

  return (
    <div className={Style.content}>
      <div className={Style.contentTitle}>
        {selectedUser ? `הפוסטים של ${selectedUser.firstName}` : "כל הפוסטים"}
        <AddPostButton />
      </div>

      <div className={Style.scrollContainer} id="scrollableDiv">
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchNextPage}
          hasMore={hasNextPage ?? false}
          loader={<h4>טוען עוד פוסטים...</h4>}
          scrollableTarget="scrollableDiv"
        >
          {posts.map((post) => (
            <Post
              key={post._id}
              _id={post._id}
              user_id={post.user_id}
              content={post.content}
              title={post.title}
              setEditedPostId={setEditedPostId}
              likes={post.likes}
              image={post.image}
            />
          ))}
        </InfiniteScroll>
      </div>

      <UpsertPostModal
        post={posts.find((post) => post._id === editedPostId)}
        isOpen={!!editedPostId}
        closeModal={() => setEditedPostId(undefined)}
      />
    </div>
  );
};

export default Content;
