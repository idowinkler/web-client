import React, { useState, useEffect } from "react";
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
import uploadImg from "../../assets/image-upload-white.svg";
import { useUploadImage } from "../../utils/customHooks/mutations/useUploadImage";

interface ProfileProps {
  isOpen: boolean;
}

const schema = z.object({
  userName: z.string().min(1, "שם משתמש הוא שדה חובה"),
  image: z.any().optional(),
});

const Profile: React.FC<ProfileProps> = ({ isOpen }) => {
  const [isInEditMode, setIsInEditMode] = useState<boolean>(false);
  const { data: selectedUser } = useSelectedUser();
  const { selectedUserId, setSelectedUserId } = useSelectedUserId();
  const { updateUserMutation } = useUserMutations();
  const { user } = useAuth();

  const { register, handleSubmit, setValue, watch } = useForm({
    resolver: zodResolver(schema),
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [image] = watch(["image"]);
  const imageRef: { current: HTMLInputElement | null } = { current: null };
  const { ref, ...rest } = register("image", { required: true });
  const { mutateAsync: uploadImageMutation } = useUploadImage();

  useEffect(() => {
    if (image && image[0]) {
      const newUrl = URL.createObjectURL(image[0]);
      setPreviewImage(newUrl);
    }
  }, [image]);

  useEffect(() => {
    setPreviewImage(selectedUser?.image || "");
  }, [selectedUser]);

  const closeProfile = () => {
    setIsInEditMode(false);
    setSelectedUserId(undefined);
  };

  const onSubmit = async (data) => {
    let image = selectedUser?.image;

    if (previewImage !== selectedUser?.image) {
      image = await uploadImageMutation(data.image[0]);
    }

    updateUserMutation.mutate({ ...data, image });
  };

  return (
    <div className={`${Style.profile} ${isOpen && Style.open}`}>
      {isOpen && (
        <div>
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
                          setPreviewImage(selectedUser?.image || null);
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
                    <img
                      src={previewImage || selectedUser.image || userIcon}
                      className={Style.profilePicture}
                    />
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
                    {isInEditMode && (
                      <>
                        <div
                          className={Style.uploadImage}
                          onClick={() => imageRef.current?.click()}
                        >
                          העלאת תמונה
                          <img
                            src={uploadImg}
                            alt="upload"
                            className={Style.uploadImageIcon}
                          />
                        </div>
                        <input
                          {...rest}
                          ref={(e) => {
                            ref(e);
                            imageRef.current = e;
                          }}
                          type="file"
                          name="image"
                          id="image"
                          style={{ display: "none" }}
                        />
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </form>
          {selectedUser && (
            <p className={Style.nameContainer}>
              <div className={Style.name}>שם:</div>
              {`${selectedUser.firstName} ${selectedUser.lastName}`}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
