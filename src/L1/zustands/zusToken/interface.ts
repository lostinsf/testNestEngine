import { ZusTokenType } from './type';

export interface ZusTokenProps {
  zusToken: ZusTokenType;
  setZusToken: (set: ZusTokenType) => void;
  delZusToken: () => void;
  zusTokens: ZusTokenType[];
  plusZusTokens: (set: ZusTokenType) => void;
  swapZusTokens: (set: ZusTokenType[]) => void;
  initZusTokens: () => void;
}
