import React, { useState } from 'react';

import { createCtx } from '.';

// State variables only
interface WalletContextState {}

// This interface differentiates from State
// because it holds any other option or fx
// that handle the state in some way
interface WalletContext extends WalletContextState {}

const INITIAL_STATE: WalletContextState = {};

const [useContext, WalletContextProvider] =
  createCtx<WalletContext>('walletContext');

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, _] = useState<WalletContextState>(INITIAL_STATE);

  return (
    <WalletContextProvider value={state}>{children}</WalletContextProvider>
  );
};

export const useWalletContext = useContext;
