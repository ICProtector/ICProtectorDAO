import { create } from "zustand";
import React from 'react';
const useFundPopup = create((set) => ({
  showFundPopup: false,
  setShowFundPopup: (condition) =>
    set((_) => ({ showFundPopup: condition })),
}));

export default useFundPopup;
