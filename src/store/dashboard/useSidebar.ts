import { create } from 'zustand';

interface State {
  isOpen: boolean;
  MenuIsOpen: () => void;
  MenuIsClose: () => void;
}

export const useSidebarState = create<State>()((set) => ({
  isOpen: true,
  MenuIsOpen: () => set({ isOpen: true }),
  MenuIsClose: () => set({ isOpen: false }),
}));
