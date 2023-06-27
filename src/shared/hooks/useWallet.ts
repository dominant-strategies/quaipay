import { useEffect } from 'react';
import { useWalletContext } from '../context/walletContext';

export const useWallet = () => {
  const { wallet, getWallet } = useWalletContext();
  useEffect(() => {
    if (!wallet) {
      getWallet();
    }
  }, [wallet]);
  return wallet;
};
