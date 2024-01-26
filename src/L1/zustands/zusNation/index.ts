import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ZusNationProps } from './interface';
import { ZusNationInitList } from './type';

export const ZusNationStore = create(
  persist<ZusNationProps>(
    (set) => ({
      zusNation: ZusNationInitList,
      setZusNation: (newZusNation) =>
        set(() => ({
          zusNation: {
            ...newZusNation,
          },
        })),
      delZusNation: () =>
        set({
          zusNation: ZusNationInitList,
        }),
      zusNations: [],
      plusZusNations: (newZusNation) =>
        set((prevState) => ({
          zusNations: [
            ...prevState.zusNations,
            {
              ...newZusNation,
            },
          ],
        })),
      swapZusNations: (newZusNations) =>
        set(() => ({
          zusNations: [...newZusNations],
        })),
      initZusNations: () =>
        set(() => ({
          zusNation: ZusNationInitList,
          zusNations: [],
        })),
    }),
    { name: 'ZusNationStore' },
  ),
);
