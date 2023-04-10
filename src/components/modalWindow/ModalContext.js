import { createContext, useContext, useState } from "react";

const initialState = {
  open: false,
  toggleModal: () => {},
};

const ModalContext = createContext(initialState);

export const useModalState = () => useContext(ModalContext);

const ModalState = ({ children }) => {
  const [open, setOpen] = useState(false);

  const toggleModal = () => {
    setOpen(!open);
  };

  return (
    <ModalContext.Provider value={{ open, toggleModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalState;
