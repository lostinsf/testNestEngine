import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ZusUserProps } from './interface';
import { ZusUserInitList } from './type';

export const ZusUserStore = create(
  persist<ZusUserProps>(
    (set) => ({
      zusUser: ZusUserInitList,
      setZusUser: (newZusUser) =>
        set(() => ({
          zusUser: {
            ...newZusUser,
          },
        })),
      delZusUser: () =>
        set({
          zusUser: ZusUserInitList,
        }),
      zusUsers: [],
      plusZusUsers: (newZusUser) =>
        set((prevState) => ({
          zusUsers: [
            ...prevState.zusUsers,
            {
              ...newZusUser,
            },
          ],
        })),
      swapZusUsers: (newZusUsers) =>
        set(() => ({
          zusUsers: [...newZusUsers],
        })),
      initZusUsers: () =>
        set(() => ({
          zusUser: ZusUserInitList,
          zusUsers: [],
        })),
    }),
    { name: 'ZusUserStore' },
  ),
);
