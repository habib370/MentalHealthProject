import { createContext, useContext } from "react";

const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  return (
    <AccountContext.Provider value={{}}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => useContext(AccountContext);