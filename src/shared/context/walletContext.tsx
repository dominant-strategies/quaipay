import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { retrieveEntropy } from 'src/onboarding/services/retrieveEntropy';
import { retrieveWallet } from 'src/shared/services/retrieveWallet';
import { Wallet, Zone } from 'src/shared/types';
import { retrieveStoredItem, storeItem } from 'src/shared/services/keychain';
import { keychainKeys } from 'src/shared/constants/keychainKeys';
import { QuaiRate } from 'src/shared/hooks/useQuaiRate';
import { fetchBTCRate } from 'src/shared/services/coingecko';

import { createCtx } from '.';
import { useSnackBar } from './snackBarContext';

// State variables only
interface WalletContextState {
  entropy?: string;
  profilePicture?: string;
  quaiRate?: QuaiRate;
  username?: string;
  wallet?: Wallet;
  walletObject?: Record<Zone, Wallet>;
  zone: Zone;
}

// This interface differentiates from State
// because it holds any other option or fx
// that handle the state in some way
interface WalletContext extends WalletContextState {
  getEntropy: (showError?: boolean) => Promise<boolean>;
  setEntropy: (entropy: string) => void;
  getProfilePicture: () => Promise<boolean>;
  setProfilePicture: (profilePicture?: string) => Promise<void>;
  getQuaiRate: () => Promise<boolean>;
  getUsername: (showError?: boolean) => Promise<boolean>;
  setUsername: (username: string) => Promise<void>;
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
    try {
      const entropy = await retrieveEntropy();

      if (entropy) {
        setEntropy(entropy);
      }
      return !!entropy;
    } catch {
      showError &&
        showSnackBar({
          message: t('common.error'),
          moreInfo: t('error.retrieve.entropy') ?? '',
          type: 'error',
        });
      return false;
    }
  };

  const setEntropy = (entropy: string) => {
    setState(prevState => ({ ...prevState, entropy }));
  };

  const getProfilePicture = async () => {
    try {
      const profilePicture = await retrieveStoredItem(
        keychainKeys.profilePicture,
      );

      if (profilePicture) {
        setProfilePicture(profilePicture);
      }
      return !!profilePicture;
    } catch {
      return false;
    }
  };

  const setProfilePicture = async (profilePicture?: string) => {
    await storeItem({
      key: keychainKeys.profilePicture,
      value: profilePicture ?? '',
    });
    setState(prevState => ({ ...prevState, profilePicture }));
  };

  const getQuaiRate = async () => {
    try {
      // Mock using 1/BTC rate
      // TODO: replace with actual value
      const btcRate = await fetchBTCRate();
      const mockedRateValue = 1 / (btcRate ?? 1e-13);

      setState(prevState => ({
        ...prevState,
        quaiRate: {
          base: mockedRateValue,
          quote: parseFloat((1 / mockedRateValue).toFixed(6)),
        },
      }));
      return true;
    } catch {
      return false;
    }
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
      }
      return !!username;
    } catch {
      return false;
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
      }
      return !!wallet;
    } catch {
      showError &&
        showSnackBar({
          message: t('common.error'),
          moreInfo: t('error.retrieve.wallet') ?? '',
          type: 'error',
        });
      return false;
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
      return true;
    } catch {
      return false;
    }
  };

  const initNameAndProfileFromKeychain = async () => {
    try {
      const isPfpSuccessful = await getProfilePicture();

      if (isPfpSuccessful) {
        const usernameFetchStatus = await getUsername(false);
        return usernameFetchStatus;
      }
      return false;
    } catch {
      return false;
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
        getQuaiRate,
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
