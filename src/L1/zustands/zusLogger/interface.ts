import { ZusLoggerType } from './type';

export interface ZusLoggerProps {
  zusLogger: ZusLoggerType;
  setZusLogger: (set: ZusLoggerType) => void;
  delZusLogger: () => void;
  zusLoggers: ZusLoggerType[];
  plusZusLoggers: (set: ZusLoggerType) => void;
  swapZusLoggers: (set: ZusLoggerType[]) => void;
  initZusLoggers: () => void;
}
