"use client";
import { twMerge } from "tailwind-merge";
import useWalletPopup from "../zustand/wallet_popup";
import useWalletAuth from "../zustand/wallet_auth";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Principal } from "@dfinity/principal";
import { useDialog } from "@connect2ic/react";
import './loader.css'
import {
  ConnectButton,
  ConnectDialog,
  Connect2ICProvider,
  useConnect,
} from "@connect2ic/react";

import ic from "ic0";
import Showfund from "./Showfund";
const ledger = ic("7wzen-oqaaa-aaaap-ahduq-cai");

function ButtonLogin({ className, ...props }) {
  const { setShowWalletPopup } = useWalletPopup();
  const { setId, setAccountBalance, setShowFund } = useWalletAuth();
  const [balanceICP, setBalance] = useState(0);
  const { isConnected, principal, activeProvider, connect } = useConnect({
    onConnect: () => {
      document.body.style.overflow = 'unset'; // Set overflow to unset
    },
    onDisconnect: () => {
      // Signed out
    },
  });
  const { open, close, isOpen } = useDialog();

  useEffect(() => {
    async function fetchBalance() {
      if (principal) {
        try {
          const store3 = await ledger.call("icrc1_balance_of", {
            owner: Principal.fromText(principal),
            subaccount: [],
          });
          setBalance(Number(Number(store3) / 100000000));
        } catch (error) {
          console.error("Error fetching balance:", error);
        }
      }
    }

    fetchBalance();
  }, [principal, setBalance]);

  function handleShowPopup() {
    setShowFund(true);
    setAccountBalance(balanceICP);
    setId(principal);
  }

  function setShowWalletC2IC() {
    console.log("why not here");
    open();
  }

  return (
    <>
      {!isConnected ? (
        // <button
        //   onClick={() => setShowWalletPopup(true)}
        //   {...props}
        //   className={`${twMerge(
        //     `uppercase text-black flex items-center space-x-3 bg-gray-100 rounded-lg p-3 px-5 h-[45px] hover:scale-[0.95] transition-all`,
        //     className
        //   )}`}
        // >
        //   {/* <IoWalletOutline /> */}
        //   <span className="wallet_div">
        //     <img src='./wallet_img.svg' alt='wallet_img' />
        //   </span>
        //   <div className="font-bold">Login</div>
        // </button>
        <>
          <button
            onClick={setShowWalletC2IC}
            {...props}
            className={`${twMerge(
              `uppercase text-black flex items-center space-x-3 bg-gray-100 rounded-lg p-3 px-5 h-[45px] hover:scale-[0.95] transition-all`,
              className
            )}`}
          >
            {/* <IoWalletOutline /> */}
           
            <div className="font-bold">Connect</div>
            <span className="wallet_div">
              <img src="./wallet_img.svg" alt="wallet_img" />
            </span>
          </button>
          <div style={{ position: "fixed", zIndex: 9999 }}>
            <ConnectDialog dark={false} />
          </div>{" "}
        </>
      ) : (
        // <>
        //   <ConnectButton />
        //   <ConnectDialog dark={false} />
        // </>
        <>
          <Showfund/>
          <button
            onClick={handleShowPopup}
            {...props}
            className={`${twMerge(
              `uppercase text-black flex items-center space-x-3 bg-gray-100 rounded-lg p-3 px-5 h-[45px] hover:scale-[0.95] transition-all border-dashed border-2 border-stroke`,
              className
            )}`}
          >
            {/* <ChipInfinity /> */}
            
            <div className="font-bold whitespace-nowrap">Points</div>
            <span className="wallet_div">
              <img src="./wallet_img.svg" alt="wallet_img" />
            </span>
          </button>
        </>
      )}
      </>
  );
}

export default ButtonLogin;
