import { createContext, useContext, useState } from "react";

const initialState = {
  open: false,
  toggleModal: () => {},
};

const ModalContext = createContext(initialState);

export const useModalState = () => useContext(ModalContext);

const ModalState = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [openRegistration, setOpenRegistration] = useState(false);

  const toggleModal = () => {
    setOpen(!open);
  };

  const toggleRegistration = () => {
    setOpenRegistration(!openRegistration);
  };

  return (
    <ModalContext.Provider
      value={{ open, toggleModal, openRegistration, toggleRegistration }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalState;
