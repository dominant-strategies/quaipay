import React, { useState } from 'react';

import { retrieveEntropy } from 'src/onboarding/services/retrieveEntropy';
import { retrieveWallet } from '../services/retrieveWallet';

import { createCtx } from '.';
import { useSnackBar } from './snackBarContext';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Wallet, Zone } from 'src/shared/types';

// State variables only
interface WalletContextState {
  entropy?: string;
  wallet?: Wallet;
  walletObject?: Record<Zone, Wallet>;
  zone: Zone;
}

// This interface differentiates from State
// because it holds any other option or fx
// that handle the state in some way
interface WalletContext extends WalletContextState {
  getEntropy: () => void;
  setEntropy: (entropy: string) => void;
  getWallet: () => void;
  setWallet: (wallet?: Wallet) => void;
  setWalletObject: (walletObject: Record<Zone, Wallet>) => void;
  getZone: () => void;
  setZone: (zone: Zone) => void;
}

const INITIAL_STATE: WalletContextState = {
  zone: Zone['zone-0-0'],
};

const [useContext, WalletContextProvider] =
  createCtx<WalletContext>('walletContext');

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { t } = useTranslation();
  const [state, setState] = useState<WalletContextState>(INITIAL_STATE);
  const { showSnackBar } = useSnackBar();

  const getEntropy = () => {
    retrieveEntropy()
      .then(setEntropy)
      .catch(() =>
        showSnackBar({
          message: t('common.error'),
          moreInfo: t('error.retrieve.entropy') ?? '',
          type: 'error',
        }),
      );
  };

  const setEntropy = (entropy: string) => {
    setState(prevState => ({ ...prevState, entropy }));
  };

  const getWallet = () => {
    retrieveWallet().then(wallet =>
      wallet
        ? setWallet(wallet)
        : showSnackBar({
            message: t('common.error'),
            moreInfo: t('error.retrieve.wallet') ?? '',
            type: 'error',
          }),
    );
  };

  const setWallet = (wallet?: Wallet) => {
    setState(prevState => ({ ...prevState, wallet }));
  };

  return (
    <WalletContextProvider
      value={{
        ...state,
        getEntropy,
        setEntropy,
        getWallet,
        setWallet,
        setWalletObject,
        getZone,
        setZone,
      }}
    >
      {children}
    </WalletContextProvider>
  );
};

export const useWalletContext = useContext;
