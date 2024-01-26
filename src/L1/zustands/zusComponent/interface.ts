import { ZusComponentType } from './type';

export interface ZusComponentProps {
  zusComponent: ZusComponentType;
  setZusComponent: (set: ZusComponentType) => void;
  delZusComponent: () => void;
  zusComponents: ZusComponentType[];
  plusZusComponents: (set: ZusComponentType) => void;
  swapZusComponents: (set: ZusComponentType[]) => void;
  initZusComponents: () => void;
}
