import React from "react";
import Style from "./SideBar.module.css";
import Profile from "../Profile/Profile";
import SideBarButton from "./SideBarButton/SideBarButton";
import postsIcon from "../../assets/post.svg";
import userIcon from "../../assets/user.svg";
import logoutIcon from "../../assets/logout.svg";
import { useSelectedUserId } from "../SelectedUserContext/SelectedUserContext";
import { useSelectedUser } from "../../utils/customHooks/queries/useSelectedUser";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

interface SideBarProps {}

const SideBar: React.FC<SideBarProps> = ({}) => {
  const { setSelectedUserId } = useSelectedUserId();
  const { data: selectedUser } = useSelectedUser();
  const { logout } = useAuth();
  const { user } = useAuth();
  const navigate = useNavigate();

  const isUserProfileOpen = !!selectedUser;

  return (
    <>
      <div className={Style.sidebar}>
        <SideBarButton
          name="פוסטים"
          iconSrc={postsIcon}
          onClick={() => {
            setSelectedUserId(undefined);
            navigate("/");
          }}
        />
        <SideBarButton
          iconSrc={userIcon}
          onClick={() => {
            setSelectedUserId(user?._id);
            navigate("/");
          }}
        />
        <SideBarButton iconSrc={logoutIcon} onClick={logout} />
      </div>
      <Profile isOpen={isUserProfileOpen} />
    </>
  );
};

export default SideBar;
