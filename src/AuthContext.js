import { createContext, useContext, useState } from "react";

const initialData = {
  id: null,
  firstName: "",
  lastName: "",
};

const AuthContext = createContext(initialData);

export const useAuth = () => useContext(AuthContext);

const AuthState = ({ children }) => {
  const [authData, setAuthData] = useState(initialData);

  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
