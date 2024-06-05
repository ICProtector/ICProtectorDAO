import { create } from "zustand";
import React from "react";
const useWalletAuth = create((set) => ({
  Id: "",
  setId: (condition) => set((_) => ({ Id: condition })),
  balance: 0,
  setAccountBalance: (amount) => set((_) => ({ balance: amount })),
  ShowFund: false,
  setShowFund: (condition) => set((_) => ({ ShowFund: condition })),
  total_balance: 0,
  setTotalBalanace: (amount) => set((_) => ({ total_balance: amount })),
  ShowUnlockdiv: false,
  setShowUnlock: (condition) => set((_) => ({ ShowUnlockdiv: condition })),
  var1: 0,
  setVar1: (value) => set((_) => ({ var1: value })),
  var2: 0,
  setVar2: (value) => set((_) => ({ var2: value })),
  lock: false,
  setLock: (value) => set((_) => ({ lock: value })),
  votes: 0,
  setVotes: (value) => set((_) => ({ votes: value })),
  totalICP: 0,
  setICP: (value) => set((_) => ({ totalICP: value })),
}));

export default useWalletAuth;
