import { create } from "zustand";

interface UserState {
  accessToken: string | null;
  displayName: string | null;
  userId: string | null;
  actions: {
    setAccessToken: (token: string | null) => void;
    setDisplayName: (name: string | null) => void;
    setUserId: (id: string | null) => void;
  };
}

const useUserStore = create<UserState>((set) => ({
  accessToken: null,
  displayName: null,
  userId: null,
  actions: {
    setAccessToken: (token) => set({ accessToken: token }),
    setDisplayName: (name) => set({ displayName: name }),
    setUserId: (id) => set({ userId: id }),
  },
}));

export const useAccessToken = () => useUserStore((state) => state.accessToken);
export const useDisplayName = () => useUserStore((state) => state.displayName);
export const useUserId = () => useUserStore((state) => state.userId);
export const useUserActions = () => useUserStore((state) => state.actions);
