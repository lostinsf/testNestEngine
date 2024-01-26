import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ZusGameProps } from './interface';
import { ZusGameInitList } from './type';

export const ZusGameStore = create(
  persist<ZusGameProps>(
    (set) => ({
      zusGame: ZusGameInitList,
      setZusGame: (newZusGame) =>
        set(() => ({
          zusGame: { ...newZusGame },
        })),
      delZusGame: () =>
        set({
          zusGame: ZusGameInitList,
        }),
      zusGames: [],
      plusZusGames: (newZusGame) =>
        set((prevState) => ({
          zusGames: [
            ...prevState.zusGames,
            {
              ...newZusGame,
            },
          ],
        })),
      swapZusGames: (newZusGames) =>
        set(() => ({
          zusGames: [...newZusGames],
        })),
      initZusGames: () =>
        set(() => ({
          zusGame: ZusGameInitList,
          zusGames: [],
        })),
    }),
    { name: 'ZusGameStore' },
  ),
);
