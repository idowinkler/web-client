import {
  useContext,
  createContext,
  useState,
  useLayoutEffect,
  useCallback,
  useEffect,
} from "react";
import { UserData, UserRegisterData } from "../../types/entities/user";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../../utils/customHooks/mutations/useRegister";
import { useLogin } from "../../utils/customHooks/mutations/useLogin";
import { useLogout } from "../../utils/customHooks/mutations/useLogout";
import { api } from "../../utils/fetch";
import { useRegisterGoogle } from "../../utils/customHooks/mutations/useRegisterGoogle";
import toast from "react-hot-toast";

interface AuthContextType {
  user: UserData | null;
  token: string;
  register: (user: UserRegisterData) => void;
  registerGoogle: (credential: string) => void;
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
  const { mutateAsync: registerMutation } = useRegister();
  const { mutate: registerGoogleMutation } = useRegisterGoogle();
  const { mutate: loginMutation } = useLogin();
  const { mutate: logoutMutation } = useLogout();

  const register = (user: UserRegisterData) => {
    registerMutation(user, {
      onSuccess: () => {
        navigate("/login");
      },
      onError: (err) => {
        console.error(err);
      },
    });
  };

  const registerGoogle = (credential: string) => {
    registerGoogleMutation(credential, {
      onSuccess: ({
        refreshTokens,
        accessToken,
        refreshToken,
        ...userData
      }) => {
        setUser(userData);
        setToken(accessToken);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/");
      },
      onError: (err) => {
        console.error(err);
      },
    });
  };

  const login = (user: UserData) => {
    loginMutation(user, {
      onSuccess: ({ accessToken, refreshToken, ...userData }) => {
        setToken(accessToken);
        setUser(userData);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/");
      },
      onError: (err) => {
        toast.error("פרטי ההתחברות שגויים");

        console.error(err);
      },
    });
  };

  const logout = useCallback(() => {
    const refreshToken = localStorage.getItem("refreshToken") || "";
    logoutMutation(refreshToken, {
      onSuccess: () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        navigate("/login");
      },
      onError: (err) => {
        console.error(err);
      },
    });
  }, [logoutMutation, navigate]);

  useLayoutEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
    };
  }, [token]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  useLayoutEffect(() => {
    const responseInterceptor = api.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        if (error?.response?.status === 403 && !originalRequest?._retry) {
          originalRequest._retry = true;
          try {
            const refreshToken = localStorage.getItem("refreshToken");
            const { data } = await api.post(`/auth/refresh-token`, {
              refreshToken,
            });
            const { accessToken, refreshToken: newRefreshToken } = data;
            setToken(accessToken);
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", newRefreshToken);
            api.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${accessToken}`;
            return api(originalRequest);
          } catch (err) {
            console.error("Refresh token request failed", err);
            logout();
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [logout]);

  return (
    <AuthContext.Provider
      value={{ user, token, register, registerGoogle, login, logout }}
    >
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
