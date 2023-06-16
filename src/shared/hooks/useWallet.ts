import { useEffect, useState } from 'react';
import { retrieveWallet } from '../services/retrieveWallet';
import { Wallet } from '../types';

export const useWallet = () => {
  const [wallet, setWallet] = useState<Wallet>();
  useEffect(() => {
    const retrieve = async () => {
      const retrievedWallet = await retrieveWallet();
      if (!retrievedWallet) {
        throw new Error('Wallet not found');
      }
      setWallet(retrievedWallet);
    };
    retrieve();
  }, []);
  return wallet;
};
