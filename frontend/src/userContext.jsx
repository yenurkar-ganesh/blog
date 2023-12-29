import { createContext, useState } from "react";

export const UserContextProvider = ({ children }) => {
  const [userInfo, setUserinfo] = useState({});
  return (
    <UserContext.Provider value={{ userInfo, setUserinfo }}>
      {children}
    </UserContext.Provider>
  );
};
export const UserContext = createContext({});
