import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

//Create the AuthContext [Creates the wrapper / provider]
const AuthContext = createContext();

//Create the AuthProvider, to allow access to context values [Defines the wrapper / provider]
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  let navigate = useNavigate();

  //Obtain current user Function
  const getCurrentUser = () => {
    try {
      const token = localStorage.getItem("token");
      const savedUser = jwtDecode(token);
      return savedUser;
    } catch (e) {
      return null;
    }
  };

  //User authenticator
  useEffect(() => {
    const userData = getCurrentUser();
    setUser(userData);
  }, []);

  //Register & Login
  const loginSaveUser = async (data) => {
    const { token } = data;
    localStorage.setItem("token", JSON.stringify(token));
    setUser(jwtDecode(token));
  };

  //Logout Function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  //"Exported" user props 'stores'
  const value = {
    user,
    loginSaveUser,
    getCurrentUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
