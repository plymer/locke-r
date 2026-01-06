import { create } from "zustand";

interface SessionState {
  currentSessionId: string | null;
  sessionOwnerId: string | null;
  playerTwoId: string | null;
  playerThreeId: string | null;
  actions: {
    setCurrentSessionId: (id: string | null) => void;
    setPlayerTwoId: (id: string | null) => void;
    setPlayerThreeId: (id: string | null) => void;
  };
}

const useSessionStore = create<SessionState>((set) => ({
  currentSessionId: null,
  sessionOwnerId: null,
  playerTwoId: null,
  playerThreeId: null,
  actions: {
    setCurrentSessionId: (id) => set({ currentSessionId: id }),
    setPlayerTwoId: (id) => set({ playerTwoId: id }),
    setPlayerThreeId: (id) => set({ playerThreeId: id }),
  },
}));

export const useSessionId = () => useSessionStore((state) => state.currentSessionId);
export const useSessionOwner = () => useSessionStore((state) => state.sessionOwnerId);
export const usePlayerTwoId = () => useSessionStore((state) => state.playerTwoId);
export const usePlayerThreeId = () => useSessionStore((state) => state.playerThreeId);
export const useSessionActions = () => useSessionStore((state) => state.actions);
