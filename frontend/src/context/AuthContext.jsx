import { useEffect, useState } from "react";
import { getMe } from "../api/auth";
import { AuthContext } from "./auth-context";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const loadUser = async () => {
      if (!token) {
        if (!cancelled) setLoading(false);
        return;
      }
      try {
        const data = await getMe(token);
        if (!cancelled) setUser(data.user);
      } catch {
        if (!cancelled) {
          localStorage.removeItem("token");
          setToken(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadUser();

    return () => {
      cancelled = true;
    };
  }, [token]);

  const login = (newToken, userData) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
