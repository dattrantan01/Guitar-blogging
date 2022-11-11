import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase-blog/firebase-config";

const AuthContext = createContext();

const AuthProvider = (props) => {
  const [userInfo, setUserInfo] = useState({});
  const value = { userInfo, setUserInfo };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = query(
          collection(db, "users"),
          where("email", "==", user.email)
        );
        onSnapshot(docRef, (snapshot) => {
          snapshot.forEach((doc) => {
            setUserInfo({
              ...user,
              avatar: doc.data().avatar,
              role: doc.data().role,
              status: doc.data().status,
            });
          });
        });
      } else {
        setUserInfo(null);
      }
    });
  }, []);
  return <AuthContext.Provider {...props} value={value}></AuthContext.Provider>;
};
const useAuth = () => {
  const context = useContext(AuthContext);
  if (typeof context === "undefined")
    throw new Error("useAuth must be used within AuthProvider");
  return context;
};
export { AuthProvider, useAuth };
