import { create } from 'zustand';
import { ZusComponentProps } from './interface';
import { ZusComponentInitList } from './type';

export const ZusComponentStore = create<ZusComponentProps>((set) => ({
  zusComponent: ZusComponentInitList,
  setZusComponent: (newZusComponent) =>
    set(() => ({
      zusComponent: { ...newZusComponent },
    })),
  delZusComponent: () =>
    set({
      zusComponent: ZusComponentInitList,
    }),
  zusComponents: [],
  plusZusComponents: (newZusComponent) =>
    set((prevState) => ({
      zusComponents: [...prevState.zusComponents, { ...newZusComponent }],
    })),
  swapZusComponents: (newZusComponents) =>
    set(() => ({
      zusComponents: [...newZusComponents],
    })),
  initZusComponents: () =>
    set(() => ({
      zusComponent: ZusComponentInitList,
      zusComponents: [],
    })),
}));
