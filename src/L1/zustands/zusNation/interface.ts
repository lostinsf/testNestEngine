import { ZusNationType } from './type';

export interface ZusNationProps {
  zusNation: ZusNationType;
  setZusNation: (set: ZusNationType) => void;
  delZusNation: () => void;
  zusNations: ZusNationType[];
  plusZusNations: (set: ZusNationType) => void;
  swapZusNations: (set: ZusNationType[]) => void;
  initZusNations: () => void;
}
