import React from "react";
import Style from "./App.module.css";
import { SelectedUserContextProvider } from "../SelectedUserContext/SelectedUserContext";
import SideBar from "../SideBar/SideBar";
import Content from "../Content/Content";

export const App: React.FC = ({}) => {
  return (
    <SelectedUserContextProvider>
      <div className={Style.app}>
        <SideBar />
        <Content />
      </div>
    </SelectedUserContextProvider>
  );
};

export default App;
