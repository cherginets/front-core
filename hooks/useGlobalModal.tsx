'use client';

// hooks/useGlobalModal.ts
import {createContext, ReactNode, useCallback, useContext, useState} from 'react';

type ModalState = {
  isOpen: boolean;
  content: ReactNode;
};

const GlobalModalContext = createContext<{
  open: (content: ReactNode) => void;
  onClose: () => any;
} | null>(null);

export const GlobalModalProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<ModalState>({ isOpen: false, content: null });

  const open = useCallback((content: ReactNode) => {
    setState({ isOpen: true, content });
  }, []);

  const onClose = useCallback(() => {
    setState({ isOpen: false, content: null });
  }, []);

  return (
    <GlobalModalContext.Provider value={{ open, onClose }}>
      {children}
      {state.isOpen && state.content}
    </GlobalModalContext.Provider>
  );
};

export const useGlobalModal = () => {
  const ctx = useContext(GlobalModalContext);
  if (!ctx) throw new Error('useGlobalModal must be used inside GlobalModalProvider');
  return ctx;
};