// import { IconDefinition } from "@fortawesome/pro-light-svg-icons";

export enum ModalType {
  WARNING,
  INFO,
}

export enum ModalActions {
  CLOSE,
  ACCEPT,
  CANCEL,
}

export interface ModalEnum {
  title: string;
  children: any;
  id?: string;
  type?: ModalType;
  icon?: any;
  needsAccept?: boolean;
  onAccept?: (accepted: boolean) => Promise<boolean>;
}