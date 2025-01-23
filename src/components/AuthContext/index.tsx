import { useContext, createContext, useState } from "react";
import { UserData } from "../../types/entities/user";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../../utils/customHooks/mutations/useRegister";
import { useLogin } from "../../utils/customHooks/mutations/useLogin";
import { useLogout } from "../../utils/customHooks/mutations/useLogout";

interface AuthContextType {
  user: UserData | null;
  token: string;
  register: (user: UserData) => void;
  login: (user: UserData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [token, setToken] = useState(localStorage.getItem("accessToken") || "");
  const navigate = useNavigate();
  const { mutate: registerMutation /*, isLoading, error*/ } = useRegister();
  const { mutate: loginMutation /*, isLoading, error*/ } = useLogin();
  const { mutate: logoutMutation /*, isLoading, error*/ } = useLogout();

  const register = (user: UserData) => {
    registerMutation(user, {
      onSuccess: ({ refreshTokens, ...userData }) => {
        console.log("register success", refreshTokens, userData);
        setUser(userData);
        navigate("/login");
      },
      onError: (err) => {
        console.error(err);
      },
    });
  };

  const login = (user: UserData) => {
    loginMutation(user, {
      onSuccess: ({ accessToken, refreshToken }) => {
        setToken(accessToken);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        navigate("/");
      },
      onError: (err) => {
        console.error(err);
      },
    });
  };

  const logout = () => {
    const refreshToken = localStorage.getItem("refreshToken") || "";
    logoutMutation(refreshToken, {
      onSuccess: () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/login");
      },
      onError: (err) => {
        console.error(err);
      },
    });
  };

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
