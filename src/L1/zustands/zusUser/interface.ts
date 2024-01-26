import { ZusUserType } from './type';

export interface ZusUserProps {
  zusUser: ZusUserType;
  setZusUser: (set: ZusUserType) => void;
  delZusUser: () => void;
  zusUsers: ZusUserType[];
  plusZusUsers: (set: ZusUserType) => void;
  swapZusUsers: (set: ZusUserType[]) => void;
  initZusUsers: () => void;
}
