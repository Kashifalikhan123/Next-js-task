import styles from "./Modal.module.scss";
import React from "react";
export interface IProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export const Modal = ({ title, children, onClose }: IProps) => {
  // debugger;
  return (
    <div className={styles.Modal}>
      <div className={styles.background} onClick={onClose} />
      <div className={styles.container}>
        <div className={styles.header}>{title}</div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
