import { Auth, getAuth, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

export type AuthUserContextType = {
  user: User | null;
  login: (user: User, callback: () => void) => void;
  logout: (callback: () => void) => void;
};

const AuthUserContext = createContext<AuthUserContextType>(
  {} as AuthUserContextType
);

export const useAuthUserContext = (): AuthUserContextType => {
  return useContext<AuthUserContextType>(AuthUserContext);
};

type AuthUserProviderProps = {
  children: React.ReactNode;
};

const AuthUserProvider: React.FC<AuthUserProviderProps> = ({ children }) => {
  const auth: Auth = getAuth();
  const [user, setUser] = useState<User | null>(null);
  const [initialize, setInitialize] = useState<boolean>(false);

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((user) => {
      console.log("onAuthStateChanged", user);
      setInitialize(true);
      setUser(user);
    });
    return () => {
      // cleanup
      unSubscribe();
    };
  }, []);

  const login = (user: User, callback: () => void) => {
    setUser(user);
    callback();
  };

  const logout = (callback: () => void) => {
    setUser(null);
    callback();
  };

  const value: AuthUserContextType = {
    user,
    login,
    logout,
  };

  return (
    <AuthUserContext.Provider value={value}>
      {initialize && children}
    </AuthUserContext.Provider>
  );
};

export default AuthUserProvider;
