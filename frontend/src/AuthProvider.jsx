import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const access = localStorage.getItem("access");
    setIsLoggedIn(!!access);
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
