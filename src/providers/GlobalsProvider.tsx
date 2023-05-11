import React, { useEffect, useState, useRef } from "react";
import NotifBar from "components/NotifBar";
import { NotificationProps } from "components/NotifBar/NotifBar";
import { ModalEnum } from "utils/models/ModalEnum";
import ModalManager from "components/ModalManager";
const Cookies = require("js-cookie");


interface GlobalVariablesProps {
  isMobile:boolean;
  hasCookies:boolean;

  addNotif: (notif: NotificationProps) => void;
  removeNotif: (id: string) => void;
  clearNotifs: () => void;

  addModal: (modal: ModalEnum) => void;
  removeModal: (id: string) => void;
  clearModals: () => void;
  getModals: () => void;
}

const defaults:GlobalVariablesProps = {
  isMobile: false,
  hasCookies: false,

  addNotif: null,
  removeNotif: null,
  clearNotifs: null,

  addModal: null,
  removeModal: null,
  clearModals: null,
  getModals: null,
};

export const GlobalsContext = React.createContext(defaults);

export default function GlobalsProvider({ children }) {
  const [globals, setGlobals] = useState(defaults);
  const notifs = useRef();
  const modalsManager = useRef();
  
  function onResize() {
    let newGlobals = Object.assign({}, globals);
    newGlobals.isMobile = window.innerWidth > 960 ? false : true;
		setGlobals(newGlobals);
		return;
	}


	useEffect(() => {
    setGlobals({...globals, hasCookies: !!Cookies.get("cookieCompliance")});

		window.addEventListener('resize', onResize);
    onResize();
    

		return () => {
			window.removeEventListener('resize', onResize);
		};
  }, []);
  

  const removeNotif = (id: string) =>  {
    // @ts-ignore
    if(notifs.current) notifs.current.removeNotif(id);
  };

  const addNotif = (notif: NotificationProps) =>  {
    // @ts-ignore
    if(notifs.current) notifs.current.addNotif(notif);
  };

  const addModal = (modal: ModalEnum):string =>  {
    // @ts-ignore
    if(modalsManager.current) return modalsManager.current.addModal(modal);
    else return null;
  };

  const removeModal = (id: string):boolean =>  {
    // @ts-ignore
    if(modalsManager.current) return modalsManager.current.removeModal(id);
    else return false;
  };

  const clearModals = () =>  {
    // @ts-ignore
    if(modalsManager.current) return modalsManager.current.clearModals();
  };

  const getModals = ():Array<ModalEnum> =>  {
    // @ts-ignore
    if(modalsManager.current) return modalsManager.current.getModals();
    else return [];
  };


  return (
    <GlobalsContext.Provider
      value={{
        ...globals,
        addNotif,
        removeNotif,
        addModal,
        removeModal,
        clearModals,
        getModals,
      }}
    >
      <NotifBar ref={notifs} allowCookies={(allow) => {
        let date = new Date();
        Cookies.set("cookieCompliance", date.getTime());
        setGlobals({...globals, hasCookies: allow});
      }} />
      {children}
      <ModalManager ref={modalsManager} />
    </GlobalsContext.Provider>
  );
}

export function GlobalsConsumer({ children }) {
  return (
    <GlobalsContext.Consumer>
      {children}
    </GlobalsContext.Consumer>
  );
}

export const useGlobals = () => React.useContext(GlobalsContext);