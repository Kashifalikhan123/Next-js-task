import Modal from "components/Modal";
import React from "react";

interface ModalContextProps {
  showModal: (title: string, content: React.ReactNode) => void;
  closeModal: () => void;
}

const ModalContext = React.createContext({
  showModal: null,
  closeModal: null,
  content: null,
} as ModalContextProps);

export default function ModalProvider({ children }) {
  const [modal, setModal] = React.useState(null);

  const showModal = (title: string, content: React.ReactNode) => {
    const modal = {
      title,
      content,
    };
    setModal(modal);
  };

  const closeModal = () => {
    setModal(null);
  };

  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
      {children}
      {!!modal && (
        <Modal title={modal.title} onClose={closeModal}>
          {modal.content}
        </Modal>
      )}
    </ModalContext.Provider>
  );
}

export const useModal = () => React.useContext(ModalContext);
