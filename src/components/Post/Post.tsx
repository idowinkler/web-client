import React from "react";
import Style from "./Post.module.css";
import userIcon from "../../assets/user.svg";
import trashIcon from "../../assets/trash.svg";
import pencilIcon from "../../assets/pencil.svg";
import commentsIcon from "../../assets/comments.svg";
import heartIcon from "../../assets/heart.svg";
import fullHeartIcon from "../../assets/fullHeart.svg";
import { PostEntity } from "../../types/entities/post";
import { usePostMutations } from "../../utils/customHooks/mutations/usePostMutations";
import { useCommentsByPostId } from "../../utils/customHooks/queries/useCommentsByPostId";
import { useAuth } from "../AuthContext";
import { useSelectedUserId } from "../SelectedUserContext/SelectedUserContext";
import { useNavigate } from "react-router-dom";

interface PostProps extends PostEntity {
  setEditedPostId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const Post: React.FC<PostProps> = ({
  _id,
  title,
  content,
  user_id,
  setEditedPostId,
  likes,
  image,
}) => {
  const { setSelectedUserId } = useSelectedUserId();
  const { deletePostMutation, likePostMutation, unlikePostMutation } =
    usePostMutations();
  const { data: comments } = useCommentsByPostId(_id);
  const { user } = useAuth();
  const navigate = useNavigate();

  const isPostLiked = !!likes?.find((like) => like === user?._id);

  return (
    <div className={Style.post}>
      <div className={Style.iconsHeader}>
        {user?._id === user_id._id && (
          <>
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
          </>
        )}
        <div className={Style.iconTextContainer}>
          <img
            src={commentsIcon}
            className={Style.icon}
            onClick={() => {
              setSelectedUserId(undefined);
              navigate(`/comments/${_id}`);
            }}
          />
          {comments?.length}
        </div>
        <div className={Style.iconTextContainer}>
          <img
            src={isPostLiked ? fullHeartIcon : heartIcon}
            className={Style.icon}
            onClick={() =>
              isPostLiked
                ? unlikePostMutation.mutate(_id)
                : likePostMutation.mutate(_id)
            }
          />
          {likes?.length}
        </div>
      </div>
      <div className={Style.header}>
        <img
          src={user_id.image || userIcon}
          className={Style.icon}
          onClick={() => setSelectedUserId(user_id._id)}
        />
        <div className={Style.title}>{title}</div>
      </div>
      <div className={Style.content}>{content}</div>
      {image && <img src={image} alt="post" className={Style.image} />}
    </div>
  );
};

export default Post;
