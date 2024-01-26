import { ZusGameType } from './type';

export interface ZusGameProps {
  zusGame: ZusGameType;
  setZusGame: (set: ZusGameType) => void;
  delZusGame: () => void;
  zusGames: ZusGameType[];
  plusZusGames: (set: ZusGameType) => void;
  swapZusGames: (set: ZusGameType[]) => void;
  initZusGames: () => void;
}
