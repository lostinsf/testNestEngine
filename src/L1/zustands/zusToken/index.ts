import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ZusTokenProps } from './interface';
import { ZusTokenInitList } from './type';

export const ZusTokenStore = create(
  persist<ZusTokenProps>(
    (set) => ({
      zusToken: ZusTokenInitList,
      setZusToken: (newZusToken) =>
        set(() => ({
          zusToken: {
            ...newZusToken,
          },
        })),
      delZusToken: () =>
        set({
          zusToken: ZusTokenInitList,
        }),
      zusTokens: [],
      plusZusTokens: (newZusToken) =>
        set((prevState) => ({
          zusTokens: [
            ...prevState.zusTokens,
            {
              ...newZusToken,
            },
          ],
        })),
      swapZusTokens: (newZusTokens) =>
        set(() => ({
          zusTokens: [...newZusTokens],
        })),
      initZusTokens: () =>
        set(() => ({
          zusToken: ZusTokenInitList,
          zusTokens: [],
        })),
    }),
    { name: 'ZusTokenStore' },
  ),
);
