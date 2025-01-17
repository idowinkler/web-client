import React, { useState } from "react";
import Style from "./Profile.module.css";
import userIcon from "../../assets/user.svg";
import pencilIcon from "../../assets/pencil.svg";
import checkIcon from "../../assets/check.svg";
import closeIcon from "../../assets/close.svg";
import { useSelectedUser } from "../../utils/customHooks/queries/useSelectedUser";
import { UserEntity } from "../../types/entities/user";
import { useUserMutations } from "../../utils/customHooks/mutations/useUserMutations";
import { useSelectedUserId } from "../SelectedUserContext/SelectedUserContext";

interface ProfileProps {
  isOpen: boolean;
}

const Profile: React.FC<ProfileProps> = ({ isOpen }) => {
  const [isInEditMode, setIsInEditMode] = useState<boolean>(false);
  const [editedUser, setEditedUser] = useState<UserEntity | undefined>(
    undefined
  );
  const { data: user } = useSelectedUser();

  const { selectedUserId, setSelectedUserId } = useSelectedUserId();
  const { updateUserMutation } = useUserMutations();
  console.log("selected user data", user);

  const saveUser = () => {
    if (editedUser) {
      updateUserMutation.mutate(editedUser);
    }
  };

  const onEditButtonClick = () => {
    if (!isInEditMode && user) {
      setEditedUser(user);
    }

    // todo save
    if (isInEditMode) {
      saveUser();
      // setEditedUser(undefined);
    }

    setIsInEditMode(!isInEditMode);
  };

  const onUsernameEdit: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (editedUser) {
      setEditedUser({ ...editedUser, userName: event.target.value });
    }
  };

  const closeProfile = () => {
    setSelectedUserId(undefined)
    setIsInEditMode(false)
    setEditedUser(undefined)
  }

  return (
    <div className={`${Style.profile} ${isOpen && Style.open}`}>
      <div className={Style.innerContainer}>
        <div className={Style.profileTitle}>
          <div className={Style.flex}>
            פרופיל
            {selectedUserId === "6787df26ec329cde4c991995" && (
              <img
                src={isInEditMode ? checkIcon : pencilIcon}
                className={Style.icon}
                onClick={() => onEditButtonClick()}
              />
            )}
          </div>
          <img src={closeIcon} className={Style.icon} onClick={closeProfile} />
        </div>

        <div className={Style.profileContent}>
          {user && (
            <>
              <img src={userIcon} className={Style.profilePicture} />
              <div className={Style.username}>
                {isInEditMode ? (
                  <input
                    value={editedUser?.userName}
                    className={Style.input}
                    onChange={onUsernameEdit}
                  />
                ) : (
                  editedUser?.userName || user.userName
                )}
              </div>
              {/* <div className={Style.propertiesContainer}>
                <ProfileField propertyName="שם פרטי" value={user.firstName} />
                <ProfileField propertyName="שם משפחה" value={user.lastName} />
              </div> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
