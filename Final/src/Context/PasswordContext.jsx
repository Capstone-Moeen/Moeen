import React, { createContext, useContext, useState } from "react";

const PasswordContext = createContext();

export const PasswordProvider = ({ children }) => {
  const [password, setPassword] = useState("");

  const updatePassword = (newPassword) => {
    setPassword(newPassword);
  };

  return (
    <PasswordContext.Provider value={{ password, updatePassword }}>
      {children}
    </PasswordContext.Provider>
  );
};

export const usePassword = () => {
  return useContext(PasswordContext);
};
