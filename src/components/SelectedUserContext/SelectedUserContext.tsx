import React, { createContext, useState, ReactNode, useContext } from "react";
import { UserEntity } from "../../types/entities/user";

interface SelectedUserContextType {
  selectedUserId: UserEntity['_id'] | undefined;
  setSelectedUserId: React.Dispatch<React.SetStateAction<UserEntity['_id'] | undefined>>;
}

export const SelectedUserContext = createContext<
  SelectedUserContextType | undefined
>(undefined);

interface SelectedUserContextProviderProps {
  children: ReactNode;
}

export const SelectedUserContextProvider: React.FC<
  SelectedUserContextProviderProps
> = ({ children }) => {
  const [selectedUserId, setSelectedUserId] = useState<UserEntity['_id'] | undefined>(
    undefined
  );
  return (
    <SelectedUserContext.Provider value={{ selectedUserId, setSelectedUserId }}>
      {children}
    </SelectedUserContext.Provider>
  );
};

export const useSelectedUserId = (): SelectedUserContextType => {
  const context = useContext(SelectedUserContext);
  if (!context) {
    throw new Error("useSelectedUserId must be used within a StateProvider");
  }
  return context;
};
