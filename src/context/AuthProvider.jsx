import { useState } from "react";
import { AuthContext } from "./auth-context";

const TOKEN_KEY = "token";
const USER_KEY = "auth_user";

function readStoredUser() {
  const storedUser = localStorage.getItem(USER_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
}

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(
    () =>
      readStoredUser() ?? {
        name: "Admin",
        role: "ADMIN",
      }
  );

  function login(nextToken, nextUser) {
    const safeUser = {
      name: nextUser?.name || nextUser?.username || "Admin",
      role: nextUser?.role || "ADMIN",
    };

    localStorage.setItem(TOKEN_KEY, nextToken);
    localStorage.setItem(USER_KEY, JSON.stringify(safeUser));

    setToken(nextToken);
    setUser(safeUser);
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: Boolean(token),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
