import { useEffect } from 'react';
import { useWalletContext } from '../context/walletContext';
import { Wallet } from 'src/shared/types';

export const useWallet = (showError = true): Wallet | undefined => {
  const { wallet, getWallet } = useWalletContext();
  useEffect(() => {
    if (!wallet) {
      getWallet(showError);
    }
  }, [wallet]);
  return wallet;
};

export const useWalletObject = (showError = true) => {
  const { walletObject, getWallet } = useWalletContext();
  useEffect(() => {
    if (!walletObject) {
      getWallet(showError);
    }
  }, [walletObject]);
  return walletObject;
};
