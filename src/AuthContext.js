import { createContext, useContext, useEffect, useState } from "react";

const initialData = {
  id: null,
  firstName: "",
  lastName: "",
  fatherName: "",
  role: "",
  group: "",
};

const AuthContext = createContext(initialData);

export const useAuth = () => useContext(AuthContext);

const AuthState = ({ children }) => {
  const [authData, setAuthData] = useState(initialData);

  useEffect(() => {
    if (!window) {
      return;
    }

    const dataFromStorage = sessionStorage.getItem("login");

    if (dataFromStorage) {
      setAuthData(JSON.parse(dataFromStorage));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
