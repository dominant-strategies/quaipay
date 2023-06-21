import React, { useEffect, useState } from 'react';

import { retrieveEntropy } from 'src/onboarding/services/retrieveEntropy';

import { createCtx } from '.';

// State variables only
interface WalletContextState {
  entropy?: Uint8Array;
}

// This interface differentiates from State
// because it holds any other option or fx
// that handle the state in some way
interface WalletContext extends WalletContextState {
  setEntropy: (entropy: Uint8Array) => void;
}

const INITIAL_STATE: WalletContextState = {
  entropy: undefined,
};

const [useContext, WalletContextProvider] =
  createCtx<WalletContext>('walletContext');

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<WalletContextState>(INITIAL_STATE);

  // Fetch entropy from keychain at start up
  useEffect(() => {
    const initEntropy = async () => {
      if (!state.entropy) {
        retrieveEntropy().then(setEntropy).catch(console.error);
      }
      return;
    };

    initEntropy();
  }, []);

  // Exposing setter for onboarding flow to use after flow is finished
  const setEntropy = (entropy: Uint8Array) =>
    setState(prevState => ({ ...prevState, entropy }));

  return (
    <WalletContextProvider value={{ ...state, setEntropy }}>
      {children}
    </WalletContextProvider>
  );
};

export const useWalletContext = useContext;
