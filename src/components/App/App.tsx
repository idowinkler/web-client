import React from "react";
import { Routes, Route } from "react-router-dom";
import Style from "./App.module.css";
import { SelectedUserContextProvider } from "../SelectedUserContext/SelectedUserContext";
import Content from "../Content/Content";
import Register from "../../pages/Register";
import { AuthProvider } from "../AuthContext";
import Login from "../../pages/Login";
import ProtectedRoute from "../ProtectedRoute";
import Comments from "../Commnets/Comments";

export const App: React.FC = ({}) => {
  return (
    <AuthProvider>
      <SelectedUserContextProvider>
        <div className={Style.app}>
          <Routes>
            <Route element={<ProtectedRoute />}>
            <Route path="/comments/:postId" element={<Comments />} />
              <Route path="/" element={<Content />} />
              <Route path="*" element={<Content />} />
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </div>
      </SelectedUserContextProvider>
    </AuthProvider>
  );
};

export default App;
