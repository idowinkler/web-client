import React, { useState } from "react";
import Style from "./AddPostButton.module.css";
import plusIcon from "../../assets/plus.svg";
import UpsertPostModal from "../UpsertPostModal/UpsertPostModal";

interface AddPostButtonProps {}

const AddPostButton: React.FC<AddPostButtonProps> = ({}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <img
        src={plusIcon}
        className={Style.icon}
        onClick={() => setIsOpen(true)}
      />
      <UpsertPostModal isOpen={isOpen} closeModal={() => setIsOpen(false)} />
    </>
  );
};

export default AddPostButton;
