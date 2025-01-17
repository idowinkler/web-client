import React, { useState } from "react";
import Style from "./SideBarButton.module.css";

interface SideBarButtonProps {
  name?: string;
  iconSrc: string;
  onClick?: () => void;
}

const SideBarButton: React.FC<SideBarButtonProps> = ({
  name,
  iconSrc,
  onClick,
}) => {
  return (
    <div className={Style.button} onClick={onClick}>
      <img src={iconSrc} className={Style.icon} />
      {name}
    </div>
  );
};

export default SideBarButton;
