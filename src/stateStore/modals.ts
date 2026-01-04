import { create } from "zustand";

interface ModalsState {
  showDisplayNameModal: boolean;
  actions: {
    toggleDisplayNameModal: () => void;
  };
}

const useModalsStore = create<ModalsState>((set) => ({
  showDisplayNameModal: false,
  actions: {
    toggleDisplayNameModal: () =>
      set((state) => ({
        showDisplayNameModal: !state.showDisplayNameModal,
      })),
  },
}));

export const useShowDisplayNameModal = () => useModalsStore((state) => state.showDisplayNameModal);
export const useModalsActions = () => useModalsStore((state) => state.actions);
