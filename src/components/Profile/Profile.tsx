import React, { useState } from "react";
import Style from "./Profile.module.css";
import userIcon from "../../assets/user.svg";
import pencilIcon from "../../assets/pencil.svg";
import checkIcon from "../../assets/check.svg";
import closeIcon from "../../assets/close.svg";
import { useSelectedUser } from "../../utils/customHooks/queries/useSelectedUser";
import { useUserMutations } from "../../utils/customHooks/mutations/useUserMutations";
import { useSelectedUserId } from "../SelectedUserContext/SelectedUserContext";
import { useAuth } from "../AuthContext";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface ProfileProps {
  isOpen: boolean;
}

const schema = z.object({
  userName: z.string().min(1, "שם משתמש הוא שדה חובה"),
});

const Profile: React.FC<ProfileProps> = ({ isOpen }) => {
  const [isInEditMode, setIsInEditMode] = useState<boolean>(false);
  const { data: selectedUser } = useSelectedUser();
  const { selectedUserId, setSelectedUserId } = useSelectedUserId();
  const { updateUserMutation } = useUserMutations();
  const { user } = useAuth();

  const { register, handleSubmit, setValue } = useForm({
    resolver: zodResolver(schema),
  });

  const closeProfile = () => {
    setSelectedUserId(undefined);
    setIsInEditMode(false);
  };

  const onSubmit = (data) => {
    updateUserMutation.mutate(data);
  };

  return (
    <div className={`${Style.profile} ${isOpen && Style.open}`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={Style.innerContainer}>
          <div className={Style.profileTitle}>
            <div className={Style.flex}>
              פרופיל
              {selectedUserId === user?._id &&
                (isInEditMode ? (
                  <img
                    src={checkIcon}
                    className={Style.icon}
                    onClick={() => {
                      handleSubmit(onSubmit)();

                      setIsInEditMode(false);
                    }}
                  />
                ) : (
                  <img
                    src={pencilIcon}
                    className={Style.icon}
                    onClick={() => {
                      setValue("userName", selectedUser?.userName);

                      setIsInEditMode(true);
                    }}
                  />
                ))}
            </div>
            <img
              src={closeIcon}
              className={Style.icon}
              onClick={closeProfile}
            />
          </div>

          <div className={Style.profileContent}>
            {selectedUser && (
              <>
                <img src={userIcon} className={Style.profilePicture} />
                <div className={Style.username}>
                  {isInEditMode ? (
                    <input
                      type="text"
                      id="userName"
                      {...register("userName")}
                      className={Style.input}
                    />
                  ) : (
                    selectedUser.userName
                  )}
                </div>

                {
                  <div>{`${selectedUser.firstName} ${selectedUser.lastName}`}</div>
                }
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
