import React, { useState } from 'react';

import { retrieveEntropy } from 'src/onboarding/services/retrieveEntropy';

import { createCtx } from '.';
import { useSnackBar } from './snackBarContext';

// State variables only
interface WalletContextState {
  entropy?: string;
}

// This interface differentiates from State
// because it holds any other option or fx
// that handle the state in some way
interface WalletContext extends WalletContextState {
  getEntropy: () => void;
  setEntropy: (entropy: string) => void;
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

  return (
    <WalletContextProvider value={{ ...state, getEntropy, setEntropy }}>
      {children}
    </WalletContextProvider>
  );
};

export const useWalletContext = useContext;
