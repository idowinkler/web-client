import React from "react";
import Style from "./App.module.css";
import { SelectedUserContextProvider } from "../SelectedUserContext/SelectedUserContext";
import SideBar from "../SideBar/SideBar";

export const App: React.FC = ({}) => {
  return (
    <SelectedUserContextProvider>
      <div className={Style.app}>
        <SideBar />
      </div>
    </SelectedUserContextProvider>
  );
};

export default App;
