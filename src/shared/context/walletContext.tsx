import React, { useState } from 'react';

import { retrieveEntropy } from 'src/onboarding/services/retrieveEntropy';
import { retrieveWallet } from '../services/retrieveWallet';

import { createCtx } from '.';
import { useSnackBar } from './snackBarContext';
import { Wallet } from '../types';

// State variables only
interface WalletContextState {
  entropy?: string;
  wallet?: Wallet;
}

// This interface differentiates from State
// because it holds any other option or fx
// that handle the state in some way
interface WalletContext extends WalletContextState {
  getEntropy: () => void;
  setEntropy: (entropy: string) => void;
  getWallet: () => void;
  setWallet: (wallet?: Wallet) => void;
}

const INITIAL_STATE: WalletContextState = {};

const [useContext, WalletContextProvider] =
  createCtx<WalletContext>('walletContext');

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<WalletContextState>(INITIAL_STATE);
  const { showSnackBar } = useSnackBar();

  const getEntropy = () => {
    retrieveEntropy()
      .then(setEntropy)
      .catch(e => showSnackBar({ message: 'Error', moreInfo: e }));
  };

  const setEntropy = (entropy: string) => {
    setState(prevState => ({ ...prevState, entropy }));
  };

  const getWallet = () => {
    retrieveWallet().then(wallet =>
      wallet
        ? setWallet(wallet)
        : showSnackBar({
            message: 'Error',
            moreInfo: 'Could not retrieve wallet',
          }),
    );
  };

  const setWallet = (wallet?: Wallet) => {
    setState(prevState => ({ ...prevState, wallet }));
  };

  return (
    <WalletContextProvider
      value={{ ...state, getEntropy, setEntropy, getWallet, setWallet }}
    >
      {children}
    </WalletContextProvider>
  );
};

export const useWalletContext = useContext;
