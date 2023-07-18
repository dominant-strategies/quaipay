import React, { useState } from 'react';

import { retrieveEntropy } from 'src/onboarding/services/retrieveEntropy';
import { retrieveWallet } from '../services/retrieveWallet';

import { createCtx } from '.';
import { useSnackBar } from './snackBarContext';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Wallet, Zone } from 'src/shared/types';
import { retrieveStoredItem, storeItem } from 'src/shared/services/keychain';
import { keychainKeys } from 'src/shared/constants/keychainKeys';

// State variables only
interface WalletContextState {
  entropy?: string;
  profilePicture?: string;
  username?: string;
  wallet?: Wallet;
  walletObject?: Record<Zone, Wallet>;
  zone: Zone;
}

// This interface differentiates from State
// because it holds any other option or fx
// that handle the state in some way
interface WalletContext extends WalletContextState {
  getEntropy: (showError?: boolean) => Promise<void>;
  setEntropy: (entropy: string) => void;
  getProfilePicture: () => Promise<boolean>;
  setProfilePicture: (profilePicture?: string) => void;
  getUsername: (showError?: boolean) => Promise<boolean>;
  setUsername: (username: string) => void;
  getWallet: (showError?: boolean) => Promise<boolean>;
  setWallet: (wallet?: Wallet) => void;
  setWalletObject: (walletObject: Record<Zone, Wallet>) => void;
  getZone: () => void;
  setZone: (zone: Zone) => void;
  initFromOnboarding: (info: OnboardingInfo) => void;
  initWalletFromKeychain: (entropy?: string) => Promise<boolean>;
  initNameAndProfileFromKeychain: () => Promise<boolean>;
}

const INITIAL_STATE: WalletContextState = {
  zone: Zone['zone-0-0'],
};

const [useContext, WalletContextProvider] =
  createCtx<WalletContext>('walletContext');

export interface OnboardingInfo {
  entropy: string;
  wallet?: Wallet;
  walletObject?: Record<Zone, Wallet>;
}

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { t } = useTranslation();
  const [state, setState] = useState<WalletContextState>(INITIAL_STATE);
  const { showSnackBar } = useSnackBar();

  const getEntropy = async (showError = true) => {
    retrieveEntropy()
      .then(setEntropy)
      .catch(() => {
        showError &&
          showSnackBar({
            message: t('common.error'),
            moreInfo: t('error.retrieve.entropy') ?? '',
            type: 'error',
          });
        return false;
      })
      .finally(() => true);
  };

  const setEntropy = (entropy: string) => {
    setState(prevState => ({ ...prevState, entropy }));
  };

  const getProfilePicture = async () => {
    try {
      await retrieveStoredItem(keychainKeys.profilePicture).then(
        profilePicture => {
          setProfilePicture(profilePicture ? profilePicture : undefined);
        },
      );
    } catch {
      return false;
    } finally {
      return true;
    }
  };

  const setProfilePicture = (profilePicture?: string) => {
    setState(prevState => ({ ...prevState, profilePicture }));
  };

  const getUsername = async (showError = true) => {
    try {
      const username = await retrieveStoredItem(keychainKeys.username);
      if (username) {
        setUsername(username);
      } else {
        showError &&
          showSnackBar({
            message: t('common.error'),
            moreInfo: t('error.retrieve.username') ?? '',
            type: 'error',
          });
        return false;
      }
    } catch {
      return false;
    } finally {
      return true;
    }
  };

  const setUsername = async (username: string) => {
    await storeItem({ key: keychainKeys.username, value: username });
    setState(prevState => ({ ...prevState, username }));
  };

  const getWallet = async (showError = true) => {
    const { zone } = state;
    try {
      const wallet = await retrieveWallet();
      if (wallet) {
        setWallet(wallet[zone as Zone]);
        setWalletObject(wallet);
        return true;
      } else {
        return false;
      }
    } catch {
      showError &&
        showSnackBar({
          message: t('common.error'),
          moreInfo: t('error.retrieve.wallet') ?? '',
          type: 'error',
        });
      return false;
    } finally {
      return true;
    }
  };

  const setWallet = (wallet?: Wallet) => {
    setState(prevState => ({ ...prevState, wallet }));
  };

  const setWalletObject = (walletObject?: Record<Zone, Wallet>) => {
    setState(prevState => ({ ...prevState, walletObject }));
  };

  const getZone = async () => {
    let zone: Zone;
    try {
      zone = (await AsyncStorage.getItem('zone')) as Zone;
      return zone;
    } catch (e) {
      console.log(e);
    }
  };

  const setZone = (zone: Zone) => {
    AsyncStorage.setItem('zone', zone).then(() => {
      setState(prevState => ({
        ...prevState,
        zone,
        wallet: prevState.walletObject![zone],
      }));
    });
  };

  const initFromOnboarding = (info: OnboardingInfo) => {
    setEntropy(info.entropy);
    setWallet(info.wallet);
    setWalletObject(info.walletObject);
  };

  const initWalletFromKeychain = async (entropy?: string) => {
    try {
      if (entropy) {
        setEntropy(entropy);
      } else {
        await getEntropy();
      }
      await getWallet(false);
    } catch {
      return false;
    } finally {
      return true;
    }
  };

  const initNameAndProfileFromKeychain = async () => {
    try {
      const pfpFetchStatus = await getProfilePicture();
      const usernameFetchStatus = await getUsername(false); // Setting showError snackbar as false
      if (!pfpFetchStatus || !usernameFetchStatus) {
        return false;
      }
    } catch {
      return false;
    } finally {
      return true;
    }
  };

  return (
    <WalletContextProvider
      value={{
        ...state,
        getEntropy,
        setEntropy,
        getWallet,
        setWallet,
        getProfilePicture,
        setProfilePicture,
        getUsername,
        setUsername,
        setWalletObject,
        getZone,
        setZone,
        initFromOnboarding,
        initWalletFromKeychain,
        initNameAndProfileFromKeychain,
      }}
    >
      {children}
    </WalletContextProvider>
  );
};

export const useWalletContext = useContext;
