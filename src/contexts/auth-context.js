import { createContext, useContext } from "react";

const AuthContext = createContext();

const AuthProvider = (props) => {
  const value = {};
  return <AuthContext.Provider {...props} value={value}></AuthContext.Provider>;
};
const useAuth = () => {
  const context = useContext(AuthContext);
  if (typeof context === "undefined")
    throw new Error("useAuth must be used within AuthProvider");
  return context;
};
export { AuthProvider, useAuth };
