import { create } from 'zustand';
import { ZusLoggerProps } from './interface';
import { ZusLoggerInitList } from './type';

export const ZusLoggerStore = create<ZusLoggerProps>((set) => ({
  zusLogger: ZusLoggerInitList,
  setZusLogger: (newZusLogger) =>
    set(() => ({
      zusLogger: {
        ...newZusLogger,
      },
    })),
  delZusLogger: () =>
    set({
      zusLogger: ZusLoggerInitList,
    }),
  zusLoggers: [],
  plusZusLoggers: (newZusLogger) =>
    set((prevState) => ({
      zusLoggers: [
        ...prevState.zusLoggers,
        {
          ...newZusLogger,
        },
      ],
    })),
  swapZusLoggers: (newZusLoggers) =>
    set(() => ({
      zusLoggers: [...newZusLoggers],
    })),
  initZusLoggers: () =>
    set(() => ({
      zusLogger: ZusLoggerInitList,
      zusLoggers: [],
    })),
}));
