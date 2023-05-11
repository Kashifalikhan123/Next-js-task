
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useGlobals } from "./GlobalsProvider";
import { useRouter } from "next/router";

interface AuthContextProps {
  setUser: (user: UserModel) => void;
  removeUser: () => void;
  user: UserModel;
  isAuthenticating: boolean;
}

const AuthContext = React.createContext({
  setUser: null,
  removeUser: null,
  user: null,
  isAuthenticating: true,
} as AuthContextProps);

export default function AuthProvider({ children }) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  useEffect(() => {
    const getUser = async () => {
      try {
        const userString = await localStorage.getItem("user");
        debugger;
        if (!!userString) {
          console.log("Check token and fetch new user object");
          let user = JSON.parse(userString);
          console.log("user from authProvider ==" + JSON.stringify(userString));
          let newUser;

          newUser =//here you call api to update the user

          await setUser({ ...user, ...newUser });
        }
        debugger;
      } catch (err) {
      } finally {
        setIsAuthenticating(false);
      }
    };


    getUser();
  }, []);
  const setUser = async (user: UserModel) => {
    try {
      console.log(user);
      await localStorage.setItem("user", JSON.stringify(user));
      setCurrentUser(user);
    } catch (err) {
      console.error(err);
    }
    debugger;
  };
  const removeUser = async () => {

    localStorage.removeItem("user");
    localStorage.clear();
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ setUser, removeUser, user: currentUser, isAuthenticating }}
    >
      {isAuthenticating ? null : children}
    </AuthContext.Provider>
  );
}

export const useAuthentication = () => React.useContext(AuthContext);
