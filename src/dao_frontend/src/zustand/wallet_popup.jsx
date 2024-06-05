import { create } from "zustand";
import React from 'react';
const useWalletPopup = create((set) => ({
  showWalletPopup: false,
  setShowWalletPopup: (condition) =>
    set((_) => ({ showWalletPopup: condition })),
}));

export default useWalletPopup;
