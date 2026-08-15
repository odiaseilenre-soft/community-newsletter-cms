import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  refreshAccessToken,
  logoutUser,
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);

  const hasRestoredSession = useRef(false);

  // Store/remove access token in localStorage
  useEffect(() => {
    console.log("TOKEN STATE CHANGED:", !!token);

    if (token) {
      console.log("Saving token to localStorage");
      localStorage.setItem("token", token);
    } else {
      console.log("Removing token from localStorage");
      localStorage.removeItem("token");
    }
  }, [token]);

  // Restore session when the application starts
  useEffect(() => {
    if (hasRestoredSession.current) {
      return;
    }

    hasRestoredSession.current = true;

    const restoreSession = async () => {
      try {
        console.log("RESTORING SESSION...");

        const response = await refreshAccessToken();

        console.log(
          "REFRESH SUCCESS:",
          !!response.accessToken
        );

        setToken(response.accessToken);
        setUser(response.user);
      } catch (error) {
        console.log(
          "REFRESH FAILED:",
          error.response?.status
        );

        setToken("");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  const login = (userData, accessToken) => {
    console.log("LOGIN CALLED");
    console.log(
      "Access token received:",
      !!accessToken
    );

    setUser(userData);
    setToken(accessToken);
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
      setToken("");
      localStorage.removeItem("token");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        loading,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);