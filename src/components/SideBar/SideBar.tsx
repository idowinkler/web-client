import React, { useContext, useState } from "react";
import Style from "./SideBar.module.css";
import Profile from "../Profile/Profile";
import SideBarButton from "./SideBarButton/SideBarButton";
import postsIcon from "../../assets/post.svg";
import userIcon from "../../assets/user.svg";
import { useSelectedUserId } from "../SelectedUserContext/SelectedUserContext";
import { useSelectedUser } from "../../utils/customHooks/queries/useSelectedUser";

interface SideBarProps {}

const SideBar: React.FC<SideBarProps> = ({}) => {
  const { setSelectedUserId } = useSelectedUserId();
  const { data: selectedUser } = useSelectedUser();

  const isUserProfileOpen = !!selectedUser;

  return (
    <>
      <div className={Style.sidebar}>
        <SideBarButton name="פוסטים" iconSrc={postsIcon} />
        <SideBarButton
          iconSrc={userIcon}
          onClick={() =>
            setSelectedUserId(
              selectedUser ? undefined : "6787df26ec329cde4c991995"
            )
          }
        />
      </div>
      <Profile isOpen={isUserProfileOpen} />
    </>
  );
};

export default SideBar;
