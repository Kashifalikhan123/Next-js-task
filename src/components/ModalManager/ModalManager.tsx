import styles from "./ModalManager.module.scss";
import { ModalEnum } from "utils/models/ModalEnum";
import { useState, forwardRef, useImperativeHandle } from "react";
import FaTimes from "fontawesome/faTimes.svg";
import Button from "components/Button";

export const ModalManager = forwardRef(({}, ref) => {
  const [activeModals, setActiveModals] = useState([] as Array<ModalEnum>);

  const modalRem = (id: string): boolean => {
    let current = [...activeModals];
    let i = current.findIndex((m) => m.id === id);

    if (i >= 0) {
      current.splice(i, 1);
      setActiveModals(current);
      return true;
    } else {
      return false;
      debugger;
    }
  };

  const modalClear = async () => {
    setActiveModals([]);
  };

  useImperativeHandle(ref, () => ({
    addModal({
      title,
      children,
      id = null,
      needsAccept = false,
      onAccept = async (accepted: boolean) => {
        debugger;
        return true;
      },
    }: ModalEnum): string {
      let current = [...activeModals];

      if (!id || current.some((m) => m.id === id)) {
        let date = new Date();
        id = btoa(date.getTime() + title);
      }

      current.push({
        title,
        children,
        id,
        needsAccept,
        onAccept,
      });
      setActiveModals(current);
      return id;
    },

    removeModal(id: string): boolean {
      return modalRem(id);
    },

    clearModals() {
      setActiveModals([]);
    },

    getModals(): Array<ModalEnum> {
      return activeModals;
    },
  }));

  const backgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      modalRem(activeModals[activeModals.length - 1].id);
    }
  };

  return (
    <div
      className={`${styles.ModalManager} ${
        activeModals.length > 0 ? null : styles.ModalManagerHide
      }`}
      onClick={backgroundClick}
    >
      {activeModals.map((modal, i) => (
        <Modal data={modal} key={i} remove={() => modalRem(modal.id)} />
      ))}
    </div>
  );
});

export default ModalManager;

export function Modal({ data, remove }) {
  const [isCanceling, setCanceling] = useState(false);
  const [isAccepting, setAccepting] = useState(false);

  const keyDown = (e) => {
    if (e.key === "Enter") {
      if (e.currentTarget) {
        e.currentTarget.click();
      }
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.title}>
        <span className={styles.titleInner}>{data.title}</span>
        {!data.needsAccept ? (
          <span
            className={styles.close}
            onClick={remove}
            tabIndex={0}
            onKeyDown={keyDown}
          >
            <FaTimes />
          </span>
        ) : (
          <></>
        )}
      </div>

      <div className={styles.body}>{data.children}</div>

      {data.needsAccept ? (
        <>
          <hr />
          <div className={styles.actions}>
            <Button
              label="Cancel"
              appearance="tertiary"
              disabled={isCanceling || isAccepting}
              loading={isCanceling}
              onClick={async () => {
                setCanceling(true);
                let success = await data.onAccept(false);
                if (success) {
                  remove();
                } else {
                  setCanceling(false);
                }
              }}
            />
            <Button
              label="Accept"
              appearance="primary"
              disabled={isCanceling || isAccepting}
              loading={isAccepting}
              onClick={async () => {
                setAccepting(true);
                let success = await data.onAccept(true);
                if (success) {
                  remove();
                } else {
                  setAccepting(false);
                }
              }}
            />
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
