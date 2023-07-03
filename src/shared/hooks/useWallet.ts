import { useEffect } from 'react';
import { useWalletContext } from '../context/walletContext';
import { Wallet } from 'src/shared/types';

export const useWallet = (): Wallet | undefined => {
  const { wallet, getWallet } = useWalletContext();
  useEffect(() => {
    if (!wallet) {
      getWallet();
    }
  }, [wallet]);
  return wallet;
};

export const useWalletObject = () => {
  const { walletObject, getWallet } = useWalletContext();
  useEffect(() => {
    if (walletObject) {
      getWallet();
    }
  }, [walletObject]);
  return walletObject;
};
