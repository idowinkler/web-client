import React from "react";
import Style from "./ProfileField.module.css";
import userIcon from "../../assets/user.svg";
import { useSelectedUser } from "../../../utils/customHooks/queries/useSelectedUser";

interface ProfileFieldProps {
  propertyName: string,
  value: string;
}

const ProfileField: React.FC<ProfileFieldProps> = ({ propertyName, value }) => {

  return (
    <div className={Style.profileField}>
      <div className={Style.property}>{`${propertyName}:  `}</div>
      {value}
     
    </div>
  );
};

export default ProfileField;
